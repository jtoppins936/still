
import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  currentDay: number;
  totalDays?: number;
}

export const ProgressTracker = ({ currentDay, totalDays = 30 }: ProgressTrackerProps) => {
  const progressPercentage = Math.min((currentDay - 1) / totalDays * 100, 100);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>Day {currentDay} of {totalDays}</span>
        <span>{Math.round(progressPercentage)}% complete</span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};
