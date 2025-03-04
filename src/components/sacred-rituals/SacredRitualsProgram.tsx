
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ProgressTracker } from "@/components/journaling/ProgressTracker";
import { SacredRitualsPrompt } from "./SacredRitualsPrompt";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const SacredRitualsProgram = () => {
  const { session } = useAuth();
  const { toast } = useToast();
  const [currentDay, setCurrentDay] = useState(1);
  const [reflection, setReflection] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Fetch sacred rituals program data
  const { data: programData, isLoading: programLoading } = useQuery({
    queryKey: ["sacred-rituals-program"],
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

  // Fetch user's progress
  const { data: userProgress, isLoading: progressLoading } = useQuery({
    queryKey: ["sacred-rituals-progress", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;

      const { data: existingProgress, error } = await supabase
        .from("user_activities")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("activity_id", programData?.[0]?.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;

      if (existingProgress) {
        setCurrentDay(existingProgress.completed ? 30 : Math.min(30, existingProgress.scheduled_for ? new Date(existingProgress.scheduled_for).getDate() : 1));
        return existingProgress;
      }

      return null;
    },
    enabled: !!programData && !!session?.user?.id,
  });

  const handleSubmitReflection = async () => {
    if (!session?.user?.id || !programData || reflection.trim() === "") return;

    try {
      const activityId = programData[0].id;
      
      // Save journal entry
      await supabase.from("journal_entries").insert({
        user_id: session.user.id,
        content: reflection,
        entry_type: "sacred_rituals"
      });

      // Update user progress
      if (userProgress) {
        await supabase
          .from("user_activities")
          .update({
            scheduled_for: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
            completed: currentDay >= 30
          })
          .eq("id", userProgress.id);
      } else {
        await supabase.from("user_activities").insert({
          user_id: session.user.id,
          activity_id: activityId,
          scheduled_for: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
          completed: currentDay >= 30
        });
      }

      setSubmitted(true);
      toast({
        title: "Reflection submitted",
        description: "Your sacred ritual reflection has been saved.",
      });
    } catch (error) {
      console.error("Error saving reflection:", error);
      toast({
        title: "Error",
        description: "Failed to save your reflection. Please try again.",
        variant: "destructive",
      });
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

  const isLoading = programLoading || progressLoading;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  const currentPrompt = programData?.[currentDay - 1];

  return (
    <div className="space-y-6">
      <Card className="border-sage-100">
        <CardContent className="pt-6">
          <ProgressTracker totalDays={30} currentDay={currentDay} />
          
          <div className="flex justify-between items-center mt-4 mb-6">
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

      {currentPrompt && (
        <SacredRitualsPrompt
          prompt={currentPrompt}
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
