
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/components/ui/use-toast";

export const GratitudePractice = () => {
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

    navigate(`/gratitude-practice`);
  };

  return (
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
              onClick={handleActivityClick}
              variant="secondary"
              className="bg-blue-100 hover:bg-blue-200 text-blue-700"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
