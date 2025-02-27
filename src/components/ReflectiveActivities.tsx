
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollText, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { usePaywall } from "./PaywallProvider";
import { PaywallModal } from "./PaywallModal";

export const ReflectiveActivities = () => {
  const { session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isSubscribed } = usePaywall();
  const [showPaywall, setShowPaywall] = useState(false);

  const { data: activities, isLoading } = useQuery({
    queryKey: ["reflective-activities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reflective_activities")
        .select("*");

      if (error) throw error;
      
      // Sort activities to put meditation first
      return data.sort((a, b) => {
        if (a.title.toLowerCase().includes('meditation')) return -1;
        if (b.title.toLowerCase().includes('meditation')) return 1;
        return 0;
      });
    },
  });

  const handleActivityClick = (activityType: string) => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to access activities",
        variant: "destructive",
      });
      return;
    }

    if (!isSubscribed) {
      setShowPaywall(true);
      return;
    }

    navigate(`/journal/${activityType.toLowerCase()}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  const isMeditationActivity = (title: string) => 
    title.toLowerCase().includes('meditation');

  return (
    <>
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
            {activities?.map((activity) => {
              const isMeditation = isMeditationActivity(activity.title);
              return (
                <div
                  key={activity.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    isMeditation 
                      ? 'border-purple-200 bg-purple-50 hover:border-purple-300' 
                      : 'border-gray-100 hover:border-sage-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={`font-medium ${
                        isMeditation ? 'text-purple-900' : 'text-gray-900'
                      }`}>
                        {activity.title}
                        {isMeditation && (
                          <span className="ml-2 inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                            Premium
                          </span>
                        )}
                      </h4>
                      <p className={`text-sm mt-1 ${
                        isMeditation ? 'text-purple-700' : 'text-gray-600'
                      }`}>
                        {activity.description}
                      </p>
                      <span className={`inline-block text-sm mt-2 ${
                        isMeditation ? 'text-purple-600' : 'text-sage-600'
                      }`}>
                        {activity.duration_minutes} minutes
                      </span>
                    </div>
                    <Button
                      onClick={() => handleActivityClick(activity.title)}
                      variant={isMeditation ? "secondary" : "outline"}
                      className={isMeditation ? "bg-purple-100 hover:bg-purple-200 text-purple-700" : "ml-4"}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <PaywallModal 
        isOpen={showPaywall} 
        onClose={() => setShowPaywall(false)} 
      />
    </>
  );
};
