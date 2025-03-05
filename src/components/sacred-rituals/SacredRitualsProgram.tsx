
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { SacredRitualsPrompt } from "./SacredRitualsPrompt";
import { ProgressTracker } from "../centering-prayer/ProgressTracker";
import { Sparkles, ArrowLeft, ArrowRight } from "lucide-react";

export const SacredRitualsProgram = () => {
  const { session } = useAuth();
  const [currentDay, setCurrentDay] = useState(1);
  const [reflection, setReflection] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Fetch user's progress
  const { data: userProgress, isLoading: progressLoading } = useQuery({
    queryKey: ["sacred-rituals-progress", session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      if (!session?.user?.id) return null;

      const { data: entries, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("entry_type", "sacred_rituals")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      // Set the current day based on entries count
      const day = entries && entries.length > 0 ? Math.min(entries.length + 1, 30) : 1;
      setCurrentDay(day);
      
      return { 
        current_day: day,
        entries
      };
    },
  });

  // Fetch sacred rituals activities
  const { data: sacredRituals, isLoading: activitiesLoading } = useQuery({
    queryKey: ["sacred-rituals-activities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reflective_activities")
        .select("*")
        .eq("category", "sacred_rituals")
        .order("id");

      if (error) throw error;
      return data;
    },
  });

  const handleSubmitReflection = async () => {
    if (!session?.user?.id || !reflection.trim()) return;

    try {
      const currentActivity = sacredRituals?.find((_, index) => index + 1 === currentDay);
      
      if (!currentActivity) return;
      
      // Save journal entry
      await supabase.from("journal_entries").insert({
        user_id: session.user.id,
        content: reflection,
        entry_type: "sacred_rituals",
        prompt_info: JSON.stringify({
          day: currentDay,
          title: currentActivity.title,
          description: currentActivity.description
        })
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error saving reflection:", error);
    }
  };

  const handleNextDay = () => {
    if (currentDay < 30) {
      setCurrentDay(currentDay + 1);
      setReflection("");
      setSubmitted(false);
    }
  };

  const handlePreviousDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
      setReflection("");
      setSubmitted(false);
    }
  };

  if (!session) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-600">
            Please sign in to start your Sacred Rituals journey.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (progressLoading || activitiesLoading) {
    return <Skeleton className="h-48 w-full" />;
  }

  // Get the current day's activity
  const currentActivity = sacredRituals?.find((_, index) => index + 1 === currentDay);

  return (
    <div className="space-y-6">
      <Card className="border-sage-100">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-sage-600" />
            <h2 className="text-2xl font-medium">30-Day Sacred Rituals Journey</h2>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            This 30-day program guides you through a journey of sacred rituals, 
            helping you slow down, connect with the present moment, and cultivate mindfulness.
          </p>
          
          <ProgressTracker 
            currentDay={currentDay} 
            totalDays={30} 
            variant="default" 
          />
          
          <div className="flex justify-between items-center mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePreviousDay} 
              disabled={currentDay <= 1}
              className="text-sage-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <span className="text-lg font-medium text-sage-800">Day {currentDay}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNextDay} 
              disabled={currentDay >= 30 || !submitted}
              className="text-sage-700"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {currentActivity && (
        <SacredRitualsPrompt
          activity={currentActivity}
          day={currentDay}
          reflection={reflection}
          onReflectionChange={setReflection}
          onSubmit={handleSubmitReflection}
          submitted={submitted}
        />
      )}
    </div>
  );
};
