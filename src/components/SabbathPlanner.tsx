
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, ScrollText, Timer, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
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

export const SabbathPlanner = () => {
  const [isBlocking, setIsBlocking] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
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
        // Show guidance toast when enabling
        toast({
          title: "Digital Sabbath Enabled",
          description: "Browser extension will block distracting sites. For mobile apps, we'll remind you when you open them during your sabbath time.",
        });
      } else {
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
    </div>
  );
};
