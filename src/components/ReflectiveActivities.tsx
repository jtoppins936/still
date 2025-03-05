import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollText, Check, Heart, BookOpen } from "lucide-react";
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
        .select("*")
        .not("category", "eq", "sacred_rituals")
        .not("title", "ilike", "%art & expression%")
        .not("title", "ilike", "%tea ceremony%")
        .not("title", "ilike", "%sacred music%");

      if (error) throw error;
      
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

    if (activityType.toLowerCase() === 'centering prayer') {
      navigate(`/centering-prayer`);
    } else if (activityType.toLowerCase() === 'reading reflection') {
      navigate(`/reading-reflection`);
    } else if (activityType.toLowerCase() === 'gratitude practice') {
      navigate(`/gratitude-practice`);
    } else if (activityType.toLowerCase() === 'mindfulness') {
      navigate(`/mindfulness`);
    } else {
      navigate(`/journal/${activityType.toLowerCase()}`);
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

  const isPremiumActivity = (title: string) => 
    title.toLowerCase().includes('meditation') || 
    title.toLowerCase().includes('journaling') ||
    title.toLowerCase() === 'centering prayer' ||
    title.toLowerCase() === 'gratitude practice';

  const meditationActivities = activities?.filter(activity => 
    activity.title.toLowerCase().includes('meditation')
  ) || [];

  const centeringPrayerActivities = activities?.filter(activity => 
    activity.title.toLowerCase() === 'centering prayer'
  ) || [];

  const otherActivities = activities?.filter(activity => 
    !activity.title.toLowerCase().includes('meditation') &&
    activity.title.toLowerCase() !== 'centering prayer' &&
    activity.title.toLowerCase() !== 'gratitude practice' &&
    activity.title.toLowerCase() !== 'reading reflection'
  ) || [];

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
          
          {meditationActivities.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-lg mb-3 text-purple-700">Meditation</h4>
              <div className="grid gap-4">
                {meditationActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-4 rounded-lg border transition-colors border-purple-200 bg-purple-50 hover:border-purple-300"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-purple-900">
                          {activity.title}
                          <span className="ml-2 inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                            Premium
                          </span>
                        </h4>
                        <p className="text-sm mt-1 text-purple-700">
                          {activity.description}
                        </p>
                        <span className="inline-block text-sm mt-2 text-purple-600">
                          {activity.duration_minutes} minutes
                        </span>
                      </div>
                      <Button
                        onClick={() => handleActivityClick(activity.title)}
                        variant="secondary"
                        className="bg-purple-100 hover:bg-purple-200 text-purple-700"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {centeringPrayerActivities.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-lg mb-3 text-rose-700">Centering Prayer</h4>
              <div className="grid gap-4">
                {centeringPrayerActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-4 rounded-lg border transition-colors border-rose-200 bg-rose-50 hover:border-rose-300"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-rose-900">
                          {activity.title}
                          <span className="ml-2 inline-block px-2 py-1 text-xs font-medium bg-rose-100 text-rose-700 rounded-full">
                            Premium
                          </span>
                        </h4>
                        <p className="text-sm mt-1 text-rose-700">
                          {activity.description}
                        </p>
                        <span className="inline-block text-sm mt-2 text-rose-600">
                          {activity.duration_minutes} minutes
                        </span>
                      </div>
                      <Button
                        onClick={() => handleActivityClick(activity.title)}
                        variant="secondary"
                        className="bg-rose-100 hover:bg-rose-200 text-rose-700"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h4 className="font-medium text-lg mb-3 text-blue-700">Gratitude Practice</h4>
            <div className="grid gap-4">
              <div
                className="p-4 rounded-lg border transition-colors border-blue-200 bg-blue-50 hover:border-blue-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-blue-900">
                      Gratitude Practice
                    </h4>
                    <p className="text-sm mt-1 text-blue-700">
                      A 30-day program to cultivate an attitude of gratitude through 
                      daily reflection prompts that help you recognize life's gifts.
                    </p>
                    <span className="inline-block text-sm mt-2 text-blue-600">
                      10-15 minutes
                    </span>
                  </div>
                  <Button
                    onClick={() => handleActivityClick("Gratitude Practice")}
                    variant="secondary"
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {otherActivities.length > 0 && (
            <div className="grid gap-4">
              {otherActivities.map((activity) => {
                const isPremium = isPremiumActivity(activity.title);
                return (
                  <div
                    key={activity.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      isPremium 
                        ? 'border-purple-200 bg-purple-50 hover:border-purple-300' 
                        : 'border-gray-100 hover:border-sage-100'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`font-medium ${
                          isPremium ? 'text-purple-900' : 'text-gray-900'
                        }`}>
                          {activity.title}
                          {isPremium && (
                            <span className="ml-2 inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                              Premium
                            </span>
                          )}
                        </h4>
                        <p className={`text-sm mt-1 ${
                          isPremium ? 'text-purple-700' : 'text-gray-600'
                        }`}>
                          {activity.description}
                        </p>
                        <span className={`inline-block text-sm mt-2 ${
                          isPremium ? 'text-purple-600' : 'text-sage-600'
                        }`}>
                          {activity.duration_minutes} minutes
                        </span>
                      </div>
                      <Button
                        onClick={() => handleActivityClick(activity.title)}
                        variant={isPremium ? "secondary" : "outline"}
                        className={isPremium ? "bg-purple-100 hover:bg-purple-200 text-purple-700" : "ml-4"}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <PaywallModal 
        isOpen={showPaywall} 
        onClose={() => setShowPaywall(false)} 
      />
    </>
  );
};
