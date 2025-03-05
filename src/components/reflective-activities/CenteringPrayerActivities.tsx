
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/components/ui/use-toast";

interface CenteringPrayerActivity {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
}

interface CenteringPrayerActivitiesProps {
  activities: CenteringPrayerActivity[];
}

export const CenteringPrayerActivities = ({ activities }: CenteringPrayerActivitiesProps) => {
  const { session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleActivityClick = (activityType: string) => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to access activities",
        variant: "destructive",
      });
      return;
    }

    navigate(`/centering-prayer`);
  };

  if (!activities.length) return null;

  return (
    <div className="mb-6">
      <h4 className="font-medium text-lg mb-3 text-rose-700">Centering Prayer</h4>
      <div className="grid gap-4">
        {activities.map((activity) => (
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
  );
};
