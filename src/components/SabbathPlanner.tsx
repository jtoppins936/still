
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, ScrollText, Timer } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { ReflectiveActivities } from "./ReflectiveActivities";
import { BlockingStats } from "./BlockingStats";
import { BlockingSchedule } from "./BlockingSchedule";

export const SabbathPlanner = () => {
  const [isBlocking, setIsBlocking] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);
  const { session } = useAuth();
  const { toast } = useToast();

  const { data: preferences, isLoading } = useQuery({
    queryKey: ["sabbath-preferences"],
    queryFn: async () => {
      if (!session?.user) return null;
      
      const { data, error } = await supabase
        .from("sabbath_preferences")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
    enabled: !!session?.user,
  });

  useEffect(() => {
    let intervalId: number;

    if (preferences?.is_active) {
      const updateCountdown = () => {
        // Get the end time from the schedule
        const schedule = localStorage.getItem('sabbath_schedule');
        if (!schedule) return;
        
        const { end_time, end_date } = JSON.parse(schedule);
        const endDateTime = new Date(end_date + 'T' + end_time);
        const now = new Date();
        const diff = endDateTime.getTime() - now.getTime();

        if (diff <= 0) {
          setTimeRemaining(null);
          // Automatically disable blocking when time is up
          toggleAppBlocking();
          return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeRemaining(`${hours}h ${minutes}m`);
      };

      updateCountdown();
      intervalId = setInterval(updateCountdown, 60000); // Update every minute
    } else {
      setTimeRemaining(null);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [preferences?.is_active]);

  const toggleAppBlocking = async () => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to use the Sabbath Planner",
        variant: "destructive",
      });
      return;
    }

    setIsBlocking(true);
    try {
      const { error } = await supabase
        .from("sabbath_preferences")
        .upsert({
          user_id: session.user.id,
          is_active: !preferences?.is_active,
        });

      if (error) throw error;

      toast({
        title: preferences?.is_active ? "App blocking disabled" : "App blocking enabled",
        description: preferences?.is_active 
          ? "Your apps will no longer be blocked during Sabbath"
          : "Your apps will be blocked during Sabbath hours",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsBlocking(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-sand-100">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Moon className="w-5 h-5 text-sage-600" />
            <h3 className="text-xl font-medium">Digital Sabbath</h3>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Set aside time weekly for rest and reflection by automatically blocking work-related apps.
          </p>
          <Button 
            onClick={toggleAppBlocking}
            disabled={isBlocking}
            className={`w-full ${
              preferences?.is_active 
                ? "bg-[#8E9196] hover:bg-[#8A898C]" 
                : "bg-sage-600 hover:bg-sage-700"
            } text-white`}
          >
            <Timer className="w-4 h-4 mr-2" />
            {isBlocking ? "Updating..." : preferences?.is_active ? "Disable App Blocking" : "Enable App Blocking"}
          </Button>
          {timeRemaining && (
            <div className="mt-4 text-center text-sm text-gray-600">
              Time remaining: {timeRemaining}
            </div>
          )}
        </CardContent>
      </Card>
      
      <BlockingSchedule />
      <BlockingStats />
      <ReflectiveActivities />
    </div>
  );
};
