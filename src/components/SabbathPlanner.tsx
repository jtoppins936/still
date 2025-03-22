
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, ScrollText, Timer, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { ReflectiveActivities } from "./ReflectiveActivities";
import { BlockingSchedule } from "./BlockingSchedule";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Capacitor } from '@capacitor/core';

export const SabbathPlanner = () => {
  const [isBlocking, setIsBlocking] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
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
    let intervalId: NodeJS.Timeout | null = null;

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

  // Listen for mobile app focus to show reminder
  useEffect(() => {
    if (!Capacitor.isNativePlatform() || !preferences?.is_active) return;

    const handleAppFocus = () => {
      // Show reminder when app becomes active during digital sabbath
      if (preferences?.is_active) {
        setShowReminderDialog(true);
      }
    };

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        handleAppFocus();
      }
    });

    // Check and show initially if we're in a digital sabbath
    if (preferences?.is_active) {
      setTimeout(() => {
        setShowReminderDialog(true);
      }, 1000);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleAppFocus);
    };
  }, [preferences?.is_active]);

  // Check blocking schedules on app load and set timer for next check
  useEffect(() => {
    const checkScheduledBlocking = async () => {
      if (!session?.user) return;

      try {
        const { data: schedules } = await supabase
          .from("blocking_schedules")
          .select("*")
          .eq("user_id", session.user.id)
          .eq("is_active", true);

        if (!schedules || schedules.length === 0) return;

        const now = new Date();
        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
        const currentTime = now.toTimeString().substring(0, 5); // Format: "HH:MM"

        // Check if current time falls within any scheduled blocks
        for (const schedule of schedules) {
          if (schedule.days_of_week.includes(dayOfWeek)) {
            if (schedule.start_time <= currentTime && currentTime <= schedule.end_time) {
              if (!preferences?.is_active) {
                // Enable sabbath mode via backend
                await supabase
                  .from("sabbath_preferences")
                  .upsert({
                    user_id: session.user.id,
                    is_active: true,
                  });

                // Store end information in local storage
                const endDateTime = new Date();
                const [endHours, endMinutes] = schedule.end_time.split(':').map(Number);
                endDateTime.setHours(endHours, endMinutes, 0, 0);
                
                localStorage.setItem('sabbath_schedule', JSON.stringify({
                  end_time: schedule.end_time,
                  end_date: endDateTime.toISOString().split('T')[0]
                }));

                // Show toast notification
                toast({
                  title: "Digital Sabbath Activated",
                  description: "Your scheduled digital sabbath period has begun.",
                });

                // If on mobile, show reminder dialog
                if (Capacitor.isNativePlatform()) {
                  setShowReminderDialog(true);
                }
              }
              break;
            }
          }
        }
      } catch (error) {
        console.error('Error checking scheduled blocking:', error);
      }
    };

    checkScheduledBlocking();
    const intervalId = setInterval(checkScheduledBlocking, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(intervalId);
  }, [session?.user]);

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

      if (!preferences?.is_active) {
        // Set 24 hour block period
        const endTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
        localStorage.setItem('sabbath_schedule', JSON.stringify({
          end_time: endTime.toTimeString().substring(0, 5),
          end_date: endTime.toISOString().split('T')[0]
        }));

        // Show guidance toast when enabling
        toast({
          title: "Digital Sabbath Enabled",
          description: "Browser extension will block distracting sites. For mobile apps, we'll remind you when you open them during your sabbath time.",
        });

        // If on mobile, show the reminder immediately
        if (Capacitor.isNativePlatform()) {
          setShowReminderDialog(true);
        }
      } else {
        localStorage.removeItem('sabbath_schedule');
        toast({
          title: "Digital Sabbath Disabled",
          description: "Website and app blocking has been turned off.",
        });
      }
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Moon className="w-5 h-5 text-sage-600" />
              <h3 className="text-xl font-medium">Digital Sabbath</h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowInfoDialog(true)}
              className="rounded-full"
            >
              <Info className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Set aside time weekly for rest and reflection by blocking distracting websites and getting reminders for mobile apps.
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
            {isBlocking ? "Updating..." : preferences?.is_active ? "Disable Digital Sabbath" : "Enable Digital Sabbath"}
          </Button>
          {timeRemaining && (
            <div className="mt-4 text-center text-sm text-gray-600">
              Time remaining: {timeRemaining}
            </div>
          )}
          {preferences?.is_active && (
            <div className="mt-4 p-3 bg-sage-50 border border-sage-200 rounded-md text-sm text-gray-700">
              <p className="font-medium mb-1">Digital Sabbath Active</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Our browser extension is blocking distracting websites</li>
                <li>When using mobile apps, remember to honor your commitment to presence</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
      
      <BlockingSchedule />
      <ReflectiveActivities />

      {/* Info Dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>About Digital Sabbath</DialogTitle>
          </DialogHeader>
          <DialogDescription className="space-y-4">
            <p>
              The Digital Sabbath feature helps you disconnect from technology during your scheduled rest periods:
            </p>
            <div className="space-y-2">
              <h4 className="font-medium">Browser Extension:</h4>
              <p>Our Chrome extension will automatically block distracting websites during your scheduled sabbath time.</p>
              
              <h4 className="font-medium">Mobile Apps:</h4>
              <p>For mobile apps, we provide a gentle reminder system. When you enable Digital Sabbath:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Set your intention to avoid distracting apps</li>
                <li>Consider placing reminder notes on your devices</li>
                <li>Use your phone's built-in screen time or focus mode features</li>
              </ol>
              
              <p className="text-sm italic mt-2">
                For full mobile app blocking, we recommend using your device's built-in digital wellbeing tools alongside our sabbath scheduler.
              </p>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      {/* Reminder Dialog for Mobile Apps */}
      <Dialog open={showReminderDialog} onOpenChange={setShowReminderDialog}>
        <DialogContent className="bg-sage-50 border-sage-200">
          <DialogHeader>
            <DialogTitle className="text-center text-sage-800">Digital Sabbath Reminder</DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center">
            <Moon className="w-16 h-16 text-sage-600 mx-auto mb-4" />
            <DialogDescription className="text-center text-base text-gray-700 mb-4">
              <p className="font-medium text-lg mb-3">You are currently on a Digital Sabbath</p>
              <p className="mb-2">Remember your intention to disconnect from digital distractions.</p>
              <p>Is this app essential right now, or can it wait until after your sabbath period?</p>
            </DialogDescription>
            <div className="text-xs text-gray-500 mt-4">
              <p>Note: Phone calls and text messages are always available for essential communication.</p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={() => setShowReminderDialog(false)}
              className="bg-sage-600 hover:bg-sage-700 text-white"
            >
              I understand
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
