
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/components/ui/use-toast";

interface MeditationActivity {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
}

interface MeditationActivitiesProps {
  activities: MeditationActivity[];
}

export const MeditationActivities = ({ activities }: MeditationActivitiesProps) => {
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

    if (activityType.toLowerCase() === 'mindfulness') {
      navigate(`/mindfulness`);
    } else {
      navigate(`/journal/${activityType.toLowerCase()}`);
    }
  };

  if (!activities.length) return null;

  return (
    <div className="mb-6">
      <h4 className="font-medium text-lg mb-3 text-purple-700">Meditation</h4>
      <div className="grid gap-4">
        {activities.map((activity) => (
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
  );
};
