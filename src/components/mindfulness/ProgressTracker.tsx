
import { Card } from "@/components/ui/card";

interface ProgressTrackerProps {
  currentDay: number;
  category: 'faith_based' | 'spiritual' | 'neutral' | 'centering-prayer';
}

export const ProgressTracker = ({ currentDay, category }: ProgressTrackerProps) => {
  const totalDays = 30;
  const progress = (currentDay / totalDays) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>Day {currentDay} of {totalDays}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-purple-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
