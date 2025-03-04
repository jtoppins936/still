
import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  currentDay: number;
  totalDays: number;
  variant?: "default" | "nature";
}

export const ProgressTracker = ({ 
  currentDay, 
  totalDays, 
  variant = "default" 
}: ProgressTrackerProps) => {
  const progressPercentage = (currentDay / totalDays) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">
          Day {currentDay} of {totalDays}
        </h3>
        <span className="text-sm text-gray-500">
          {progressPercentage.toFixed(0)}% complete
        </span>
      </div>
      <Progress 
        value={progressPercentage} 
        className={`h-2 ${variant === "nature" ? "bg-green-100" : "bg-rose-100"}`} 
      />
    </div>
  );
};
