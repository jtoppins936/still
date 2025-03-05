
import { Card, CardContent } from "@/components/ui/card";
import { ProgressTracker } from "@/components/journaling/ProgressTracker";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface SacredRitualsHeaderProps {
  currentDay: number;
  onPreviousDay: () => void;
  onNextDay: () => void;
  submitted: boolean;
}

export const SacredRitualsHeader = ({
  currentDay,
  onPreviousDay,
  onNextDay,
  submitted,
}: SacredRitualsHeaderProps) => {
  return (
    <Card className="border-sage-100">
      <CardContent className="pt-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-sage-800 mb-2">Sacred Rituals Program</h3>
          <p className="text-sm text-gray-600 mb-4">
            This 30-day program guides you through simple sacred rituals to integrate mindfulness into your daily life.
            Each day presents a new ritual practice along with a reflection prompt. Complete each day's ritual, then
            journal about your experience before moving to the next day.
          </p>
        </div>
        
        <ProgressTracker totalDays={30} currentDay={currentDay} />
        
        <div className="flex justify-between items-center mt-4 mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onPreviousDay} 
            disabled={currentDay <= 1}
            className="text-sage-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <span className="text-lg font-medium text-sage-800">Day {currentDay}</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onNextDay} 
            disabled={currentDay >= 30 || !submitted}
            className="text-sage-700"
          >
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
