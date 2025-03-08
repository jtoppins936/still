
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/components/ui/use-toast";
import { usePaywall } from "@/components/PaywallProvider";
import { useState } from "react";
import { PaywallModal } from "@/components/PaywallModal";

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
  const { isSubscribed } = usePaywall();
  const [showPaywall, setShowPaywall] = useState(false);

  const handleActivityClick = () => {
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

    navigate("/sacred-rituals");
  };

  return (
    <div className="mb-6">
      <h4 className="font-medium text-lg mb-3 text-sage-700">Sacred Rituals</h4>
      <div className="grid gap-4">
        <div
          className="p-4 rounded-lg border transition-colors border-purple-200 bg-purple-50 hover:border-purple-300 cursor-pointer"
          onClick={handleActivityClick}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-purple-900">
                30-Day Sacred Rituals Journey
                <span className="ml-2 inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                  Premium
                </span>
              </h4>
              <p className="text-sm mt-1 text-purple-700">
                Follow a 30-day program of mindful rituals to help you slow down, 
                connect with the present moment, and cultivate mindfulness in your daily life.
              </p>
              <span className="inline-block text-sm mt-2 text-purple-600">
                5-10 minutes daily
              </span>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleActivityClick();
              }}
              variant="secondary"
              className="bg-purple-100 hover:bg-purple-200 text-purple-700"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <PaywallModal 
        isOpen={showPaywall} 
        onClose={() => setShowPaywall(false)} 
      />
    </div>
  );
};
