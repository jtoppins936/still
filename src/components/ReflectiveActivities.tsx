
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollText } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { usePaywall } from "./PaywallProvider";
import { PaywallModal } from "./PaywallModal";
import { MeditationActivities } from "./reflective-activities/MeditationActivities";
import { CenteringPrayerActivities } from "./reflective-activities/CenteringPrayerActivities";
import { GratitudePractice } from "./reflective-activities/GratitudePractice";
import { OtherActivities } from "./reflective-activities/OtherActivities";
import { ActivityLoader } from "./reflective-activities/ActivityLoader";
import { isPremiumActivity } from "./reflective-activities/helpers";

export const ReflectiveActivities = () => {
  const { session } = useAuth();
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
        .not("title", "ilike", "%sacred music%")
        .not("title", "ilike", "%nature walk%")
        .not("title", "ilike", "%nature walk journal%");

      if (error) throw error;
      
      return data.sort((a, b) => {
        if (a.title.toLowerCase().includes('meditation')) return -1;
        if (b.title.toLowerCase().includes('meditation')) return 1;
        return 0;
      });
    },
  });

  if (isLoading) {
    return <ActivityLoader />;
  }

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
    activity.title.toLowerCase() !== 'reading reflection' &&
    !activity.title.toLowerCase().includes('nature walk')
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
          
          <MeditationActivities activities={meditationActivities} />
          <CenteringPrayerActivities activities={centeringPrayerActivities} />
          <GratitudePractice />
          <OtherActivities 
            activities={otherActivities} 
            isPremiumActivity={isPremiumActivity} 
          />
        </CardContent>
      </Card>

      <PaywallModal 
        isOpen={showPaywall} 
        onClose={() => setShowPaywall(false)} 
      />
    </>
  );
};
