
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ProgressTracker } from "@/components/journaling/ProgressTracker";
import { SacredRitualsPrompt } from "./SacredRitualsPrompt";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePaywall } from "@/components/PaywallProvider";
import { PaywallModal } from "@/components/PaywallModal";
import { useNavigate } from "react-router-dom";

// Define a type for the sacred rituals data
interface SacredRitualActivity {
  id: string;
  category: string;
  title: string;
  description: string;
  duration_minutes: number;
  created_at: string | null;
  day: number;
}

// Define a type for user progress
interface UserProgress {
  id: string;
  user_id: string;
  activity_id: string;
  scheduled_for: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export const SacredRitualsProgram = () => {
  const { session } = useAuth();
  const { isSubscribed } = usePaywall();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentDay, setCurrentDay] = useState(1); // Set to Day 1 by default
  const [reflection, setReflection] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    // Redirect to auth if not logged in
    if (!session) {
      navigate('/auth');
      return;
    }
    
    // Show paywall if not subscribed
    if (!isSubscribed) {
      setShowPaywall(true);
    }
  }, [session, isSubscribed, navigate]);

  // Fetch sacred rituals program data
  const programQuery = useQuery({
    queryKey: ["sacred-rituals-program"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reflective_activities")
        .select("*")
        .eq("category", "sacred_rituals")
        .order("day");  // Order by day to ensure correct sequence

      if (error) throw error;
      return data as SacredRitualActivity[];
    },
  });

  // Fetch user's progress
  const progressQuery = useQuery({
    queryKey: ["sacred-rituals-progress", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;

      const { data: activities } = await supabase
        .from("reflective_activities")
        .select("id")
        .eq("category", "sacred_rituals")
        .eq("day", 1)  // Get the Day 1 activity specifically
        .limit(1);
        
      if (!activities || activities.length === 0) return null;

      const { data: existingProgress, error } = await supabase
        .from("user_activities")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("activity_id", activities[0].id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") throw error;

      if (existingProgress) {
        // Start from day 1 for new users, otherwise use the stored progress (up to day 30)
        setCurrentDay(existingProgress.completed ? 30 : Math.min(30, existingProgress.scheduled_for ? new Date(existingProgress.scheduled_for).getDate() : 1));
        return existingProgress;
      }

      return null;
    },
    enabled: !!session?.user?.id,
  });

  const programData = programQuery.data;
  const userProgress = progressQuery.data;
  const isLoading = programQuery.isLoading || progressQuery.isLoading;

  const handleSubmitReflection = async () => {
    if (!session?.user?.id || !programData || reflection.trim() === "") return;

    try {
      const activityId = programData.find(activity => activity.day === currentDay)?.id;
      
      if (!activityId) {
        toast({
          title: "Error",
          description: "Could not find the activity for the current day.",
          variant: "destructive",
        });
        return;
      }
      
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

  // Hide content when user is not subscribed
  if (!isSubscribed) {
    return <PaywallModal isOpen={showPaywall} onClose={() => navigate('/')} />;
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  // If we have the program data, find the current day's prompt by looking for the matching day number
  const currentPrompt = programData?.find(prompt => prompt.day === currentDay);

  return (
    <div className="space-y-6">
      <Card className="border-sage-100">
        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-sage-800 mb-2">Sacred Rituals Program</h3>
            <p className="text-sm text-gray-600 mb-4">
              This 30-day program guides you through simple sacred rituals to integrate mindfulness into your daily life.
              Each day presents a new ritual practice along with a reflection prompt. Complete each day's ritual, then
              journal about your experience before moving to the next day.
            </p>
          </div>
          
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
