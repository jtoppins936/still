
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CenteringPrayerPrompt } from "./CenteringPrayerPrompt";
import { ProgressTracker } from "./ProgressTracker";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

export const CenteringPrayerProgram = () => {
  const { session } = useAuth();
  const [currentDay, setCurrentDay] = useState(1);
  const userId = session?.user?.id;

  const { data: progress, isLoading: isLoadingProgress } = useQuery({
    queryKey: ["centering-prayer-progress", userId],
    queryFn: async () => {
      if (!userId) return { current_day: 1 };
      
      const { data, error } = await supabase
        .from("user_centering_prayer_progress")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      
      if (error) throw error;
      
      if (!data) {
        // Create a new progress record if one doesn't exist
        const { data: newProgress, error: insertError } = await supabase
          .from("user_centering_prayer_progress")
          .insert([{
            user_id: userId,
            current_day: 1,
          }])
          .select()
          .single();
        
        if (insertError) throw insertError;
        return newProgress;
      }
      
      return data;
    },
    enabled: !!userId,
  });

  const { data: program, isLoading: isLoadingProgram } = useQuery({
    queryKey: ["centering-prayer-program"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("centering_prayer_program")
        .select("*")
        .order("day_number", { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });

  const handleUpdateProgress = async () => {
    if (!userId || !progress) return;
    
    const nextDay = currentDay + 1;
    
    await supabase
      .from("user_centering_prayer_progress")
      .update({ 
        current_day: nextDay,
        last_completed_at: new Date().toISOString()
      })
      .eq("user_id", userId);
    
    setCurrentDay(nextDay);
  };

  if (isLoadingProgress || isLoadingProgram) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[200px] w-full rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  // Set currentDay based on user progress
  if (progress && currentDay !== progress.current_day) {
    setCurrentDay(progress.current_day);
  }

  const currentPrayer = program?.find(day => day.day_number === currentDay);
  const totalDays = program?.length || 30;
  const isLastDay = currentDay >= totalDays;

  return (
    <div className="space-y-8">
      <ProgressTracker currentDay={currentDay} totalDays={totalDays} />
      
      <Tabs defaultValue="practice">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="practice">Today's Practice</TabsTrigger>
          <TabsTrigger value="reflection">Journal & Reflect</TabsTrigger>
        </TabsList>
        
        <TabsContent value="practice" className="p-4 border rounded-md mt-2">
          {currentPrayer ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-rose-700">
                Day {currentPrayer.day_number}: {currentPrayer.theme}
              </h2>
              
              <div className="bg-rose-50 p-4 rounded-md border border-rose-100">
                <h3 className="text-lg font-medium text-rose-800 mb-2">Scripture Focus</h3>
                <p className="italic text-gray-700">{currentPrayer.scripture}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-rose-800 mb-2">Prayer Practice</h3>
                <div className="prose text-gray-700">
                  <p>{currentPrayer.practice}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-500 text-sm">
                  {currentPrayer.duration_minutes} minutes
                </p>
              </div>
            </div>
          ) : (
            <p>No prayer practice available for today.</p>
          )}
        </TabsContent>
        
        <TabsContent value="reflection" className="p-4 border rounded-md mt-2">
          {currentPrayer && (
            <CenteringPrayerPrompt 
              prompt={currentPrayer.reflection_prompt}
              dayId={currentPrayer.id}
            />
          )}
        </TabsContent>
      </Tabs>
      
      <div className="pt-6 border-t border-gray-200">
        <Button 
          onClick={handleUpdateProgress}
          disabled={isLastDay}
          className="bg-rose-600 hover:bg-rose-700"
        >
          {isLastDay ? "Program Completed" : "Complete & Continue to Next Day"}
        </Button>
        
        {isLastDay && (
          <p className="mt-4 text-rose-700">
            Congratulations! You've completed the full 30-day Centering Prayer program.
          </p>
        )}
      </div>
    </div>
  );
};
