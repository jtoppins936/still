
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollText, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export const ReflectiveActivities = () => {
  const { session } = useAuth();
  const { toast } = useToast();

  const { data: activities, isLoading } = useQuery({
    queryKey: ["reflective-activities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reflective_activities")
        .select("*");

      if (error) throw error;
      return data;
    },
  });

  const selectActivity = async (activityId: string) => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to select activities",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("user_activities")
        .insert({
          user_id: session.user.id,
          activity_id: activityId,
        });

      if (error) throw error;

      toast({
        title: "Activity selected",
        description: "This activity has been added to your Sabbath plan",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <Card className="border-sand-100">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <ScrollText className="w-5 h-5 text-sage-600" />
          <h3 className="text-xl font-medium">Reflective Activities</h3>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6">
          Choose from these mindful activities to enrich your Sabbath experience.
        </p>
        <div className="grid gap-4">
          {activities?.map((activity) => (
            <div
              key={activity.id}
              className="p-4 rounded-lg border border-gray-100 hover:border-sage-100 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{activity.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  <span className="inline-block text-sm text-sage-600 mt-2">
                    {activity.duration_minutes} minutes
                  </span>
                </div>
                <Button
                  onClick={() => selectActivity(activity.id)}
                  variant="outline"
                  className="ml-4"
                >
                  <Check className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
