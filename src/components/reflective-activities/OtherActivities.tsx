
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/components/ui/use-toast";

interface Activity {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
}

interface OtherActivitiesProps {
  activities: Activity[];
  isPremiumActivity: (title: string) => boolean;
}

export const OtherActivities = ({ activities, isPremiumActivity }: OtherActivitiesProps) => {
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

    if (activityType.toLowerCase() === 'reading reflection') {
      navigate(`/reading-reflection`);
    } else {
      navigate(`/journal/${activityType.toLowerCase()}`);
    }
  };

  if (!activities.length) return null;

  return (
    <div className="grid gap-4">
      {activities.map((activity) => {
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
  );
};
