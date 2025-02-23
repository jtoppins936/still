
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

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

  const createSchedule = useMutation({
    mutationFn: async () => {
      if (!session?.user?.id) {
        throw new Error("You must be logged in to create a schedule");
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
        <h3 className="text-lg font-medium">Blocking Schedule</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Select 
              value={selectedDays.join(",")} 
              onValueChange={(value) => setSelectedDays(value.split(","))}
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
          >
            Save Schedule
          </Button>

          {schedules && schedules.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Current Schedules</h4>
              {schedules.map((schedule) => (
                <div 
                  key={schedule.id}
                  className="p-2 bg-gray-50 rounded mb-2"
                >
                  {schedule.days_of_week.join(", ")} - {schedule.start_time} to {schedule.end_time}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
