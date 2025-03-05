
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/components/ui/use-toast";

type Activity = {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  category: string;
};

interface SacredRitualsProps {
  activities: Activity[];
}

export const SacredRituals = ({ activities }: SacredRitualsProps) => {
  const { session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleActivityClick = () => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to access activities",
        variant: "destructive",
      });
      return;
    }

    navigate(`/sacred-rituals`);
  };

  return (
    <div className="mb-6">
      <h4 className="font-medium text-lg mb-3 text-sage-700">Sacred Rituals</h4>
      <div className="grid gap-4">
        <div
          className="p-4 rounded-lg border transition-colors border-sage-200 bg-sage-50 hover:border-sage-300"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-sage-900">
                30-Day Sacred Rituals Journey
              </h4>
              <p className="text-sm mt-1 text-sage-700">
                Follow a 30-day program of mindful rituals to help you slow down, 
                connect with the present moment, and cultivate mindfulness in your daily life.
              </p>
              <span className="inline-block text-sm mt-2 text-sage-600">
                5-10 minutes daily
              </span>
            </div>
            <Button
              onClick={handleActivityClick}
              variant="secondary"
              className="bg-sage-100 hover:bg-sage-200 text-sage-700"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
