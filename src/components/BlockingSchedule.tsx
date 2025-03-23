
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Calendar, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Add Chrome extension types
declare global {
  interface Window {
    chrome?: {
      runtime?: {
        sendMessage: (
          message: any,
          callback?: (response: any) => void
        ) => void;
      };
    };
  }
}

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const BlockingSchedule = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { session } = useAuth();

  // Update query to only fetch user's schedules
  const { data: schedules, isLoading } = useQuery({
    queryKey: ["blocking-schedules", session?.user.id],
    queryFn: async () => {
      if (!session?.user?.id) return [];
      
      const { data, error } = await supabase
        .from("blocking_schedules")
        .select("*")
        .eq("user_id", session.user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user.id,
  });

  // Sync schedules with extension when they change
  useEffect(() => {
    if (!schedules || !window.chrome?.runtime) return;
    
    // Send updated schedules to extension
    try {
      window.chrome?.runtime.sendMessage({
        action: "updateBlockingSchedules",
        schedules: schedules
      });
    } catch (error) {
      console.log("Extension communication not available");
    }
  }, [schedules]);

  const createSchedule = useMutation({
    mutationFn: async () => {
      if (!session?.user?.id) {
        throw new Error("You must be logged in to create a schedule");
      }

      if (selectedDays.length === 0) {
        throw new Error("Please select at least one day");
      }

      if (startTime >= endTime) {
        throw new Error("End time must be after start time");
      }

      const { error } = await supabase
        .from("blocking_schedules")
        .insert({
          user_id: session.user.id,
          days_of_week: selectedDays,
          start_time: startTime,
          end_time: endTime,
          is_active: true
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocking-schedules", session?.user.id] });
      toast({
        title: "Schedule created",
        description: "Your blocking schedule has been saved",
      });
      setSelectedDays([]);
      setStartTime("09:00");
      setEndTime("17:00");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteSchedule = useMutation({
    mutationFn: async (scheduleId: string) => { // Change parameter type to string
      if (!session?.user?.id) {
        throw new Error("You must be logged in to delete a schedule");
      }

      const { error } = await supabase
        .from("blocking_schedules")
        .delete()
        .eq("id", scheduleId)
        .eq("user_id", session.user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocking-schedules", session?.user.id] });
      toast({
        title: "Schedule deleted",
        description: "Your blocking schedule has been removed",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (!session) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Blocking Schedule</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Please sign in to manage your blocking schedules.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-sage-600" />
          <h3 className="text-lg font-medium">Blocking Schedule</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert className="bg-sage-50 border-sage-200">
            <AlertCircle className="h-4 w-4 text-sage-600" />
            <AlertDescription>
              Create scheduled times for your digital sabbath. During these times, distracting websites will be blocked and you'll receive reminders when using apps.
            </AlertDescription>
          </Alert>

          <div>
            <label className="block text-sm font-medium mb-1">Days of Week</label>
            <Select 
              value={selectedDays.join(",")} 
              onValueChange={(value) => setSelectedDays(value ? value.split(",") : [])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select days" />
              </SelectTrigger>
              <SelectContent>
                {DAYS_OF_WEEK.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <Button 
            onClick={() => createSchedule.mutate()}
            disabled={createSchedule.isPending}
            className="bg-sage-600 hover:bg-sage-700 text-white w-full"
          >
            Save Schedule
          </Button>

          {schedules && schedules.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Current Schedules</h4>
              {schedules.map((schedule) => (
                <div 
                  key={schedule.id}
                  className="p-3 bg-gray-50 rounded mb-2 flex justify-between items-center"
                >
                  <div>
                    <span className="font-medium">{schedule.days_of_week.join(", ")}</span> • {schedule.start_time} to {schedule.end_time}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => deleteSchedule.mutate(schedule.id.toString())} // Convert id to string
                    disabled={deleteSchedule.isPending}
                    className="text-gray-500 hover:text-red-500"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
