
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  category: string;
}

interface ChallengeCardProps {
  challenge: Challenge;
  onComplete?: () => void;
}

export const ChallengeCard = ({ challenge, onComplete }: ChallengeCardProps) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { session } = useAuth();
  const { toast } = useToast();

  const handleComplete = async () => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to track your progress",
        variant: "destructive",
      });
      return;
    }

    setIsCompleting(true);
    try {
      const { error } = await supabase
        .from("user_challenges")
        .insert({
          challenge_id: challenge.id,
          user_id: session.user.id,
          completed_at: new Date().toISOString(),
        });

      if (error) throw error;

      setIsCompleted(true);
      toast({
        title: "Challenge completed!",
        description: "Great job taking time to slow down.",
      });
      onComplete?.();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-medium text-gray-900">{challenge.title}</h3>
          <span className="flex items-center text-gray-600 text-sm">
            <Timer className="w-4 h-4 mr-1" />
            {challenge.duration_minutes} min
          </span>
        </div>
        <p className="text-gray-600 leading-relaxed">{challenge.description}</p>
        <div className="pt-4">
          <Button 
            onClick={handleComplete}
            disabled={isCompleting || isCompleted}
            className={`w-full ${
              isCompleted 
                ? "bg-green-500 hover:bg-green-600" 
                : "bg-[#8E9196] hover:bg-[#8A898C]"
            }`}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {isCompleting ? "Completing..." : isCompleted ? "Completed!" : "Complete Challenge"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
