
import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  currentDay: number;
  totalDays: number;
}

export const ProgressTracker = ({ currentDay, totalDays }: ProgressTrackerProps) => {
  const progressPercentage = Math.round((currentDay / totalDays) * 100);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Day {currentDay} of {totalDays}</span>
        <span>{progressPercentage}% complete</span>
      </div>
      <Progress value={progressPercentage} className="h-2 bg-rose-100" indicatorClassName="bg-rose-600" />
    </div>
  );
};
