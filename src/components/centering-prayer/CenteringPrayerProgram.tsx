
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CenteringPrayerPrompt } from "./CenteringPrayerPrompt";
import { ProgressTracker } from "./ProgressTracker";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { MindfulnessProgram } from "@/types/mindfulness";

export const CenteringPrayerProgram = () => {
  const { session } = useAuth();
  const [currentDay, setCurrentDay] = useState(1);
  const userId = session?.user?.id;
  const { toast } = useToast();

  // Use mindfulness_program table as a temporary solution
  const { data: progress, isLoading: isLoadingProgress } = useQuery({
    queryKey: ["centering-prayer-progress", userId],
    queryFn: async () => {
      if (!userId) return { current_day: 1 };
      
      // Use user_mindfulness_progress as a temporary solution
      const { data, error } = await supabase
        .from("user_mindfulness_progress")
        .select("*")
        .eq("user_id", userId)
        .eq("selected_category", "centering-prayer")
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching progress:", error);
        return { current_day: 1 };
      }
      
      if (!data) {
        // Create a new progress record if one doesn't exist
        const { data: newProgress, error: insertError } = await supabase
          .from("user_mindfulness_progress")
          .insert([{
            user_id: userId,
            current_day: 1,
            selected_category: "centering-prayer"
          }])
          .select()
          .single();
        
        if (insertError) {
          console.error("Error creating progress:", insertError);
          return { current_day: 1 };
        }
        return newProgress;
      }
      
      return data;
    },
    enabled: !!userId,
  });

  // Use mindfulness_program table as a temporary solution
  const { data: program, isLoading: isLoadingProgram } = useQuery({
    queryKey: ["centering-prayer-program"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mindfulness_program")
        .select("*")
        .eq("category", "centering-prayer")
        .order("day_number", { ascending: true });
      
      if (error) {
        console.error("Error fetching program:", error);
        return [];
      }
      
      console.log("Fetched program data:", data);
      return data || [];
    },
  });

  const handleUpdateProgress = async () => {
    if (!userId || !progress) return;
    
    const nextDay = currentDay + 1;
    
    try {
      await supabase
        .from("user_mindfulness_progress")
        .update({ 
          current_day: nextDay,
          last_completed_at: new Date().toISOString()
        })
        .eq("user_id", userId)
        .eq("selected_category", "centering-prayer");
      
      setCurrentDay(nextDay);
      
      toast({
        title: "Progress updated",
        description: "You've moved to the next day in your centering prayer journey.",
      });
    } catch (error) {
      console.error("Error updating progress:", error);
      toast({
        title: "Error updating progress",
        description: "There was a problem updating your progress. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Set currentDay based on user progress
  if (progress && progress.current_day && currentDay !== progress.current_day) {
    setCurrentDay(progress.current_day);
  }

  // Define default prayer content for fallback
  const defaultPrayer: MindfulnessProgram = {
    id: "default",
    day_number: 1,
    theme: "Introduction to Silence",
    scripture: "Be still, and know that I am God. (Psalm 46:10)",
    practice: "Find a quiet place and sit comfortably with your back straight. Close your eyes and take several deep breaths. Use today's sacred word as a symbol of your intention to consent to God's presence. Introduce this word gently at the beginning, and whenever thoughts arise, gently return to the sacred word. Sit in silence for 10 minutes.",
    reflection_prompt: "What was your experience of silence like today? How did the sacred word help you return to presence?",
    duration_minutes: 10,
    category: "centering-prayer",
    focus_phrase: "Be still"
  };

  const currentPrayer = program?.find(day => day.day_number === currentDay) || defaultPrayer;
  console.log("Current prayer:", currentPrayer);
  
  const totalDays = program?.length || 30;
  const isLastDay = currentDay >= totalDays;

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

  return (
    <div className="space-y-8">
      <ProgressTracker currentDay={currentDay} totalDays={totalDays} />
      
      <Tabs defaultValue="practice">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="practice">Today's Practice</TabsTrigger>
          <TabsTrigger value="reflection">Journal & Reflect</TabsTrigger>
        </TabsList>
        
        <TabsContent value="practice" className="p-4 border rounded-md mt-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-rose-700">
              Day {currentPrayer.day_number}: {currentPrayer.theme}
            </h2>
            
            <div className="bg-rose-50 p-4 rounded-md border border-rose-100">
              <h3 className="text-lg font-medium text-rose-800 mb-2">Scripture Focus</h3>
              <p className="italic text-gray-700">{currentPrayer.scripture}</p>
            </div>
            
            {/* Sacred Word or Phrase Section */}
            <div className="bg-rose-100 p-4 rounded-md border border-rose-200 text-center">
              <h3 className="text-lg font-medium text-rose-800 mb-2">Today's Sacred Word</h3>
              <p className="text-xl font-semibold text-rose-700">
                "{currentPrayer.focus_phrase || "Be present"}"
              </p>
              <p className="mt-2 text-rose-600 text-sm">
                Repeat this sacred word gently whenever your thoughts wander during prayer
              </p>
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
        </TabsContent>
        
        <TabsContent value="reflection" className="p-4 border rounded-md mt-2">
          <CenteringPrayerPrompt 
            prompt={currentPrayer.reflection_prompt}
            dayId={currentPrayer.id}
          />
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
