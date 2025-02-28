
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  currentDay: number;
}

export const ProgressTracker = ({ currentDay }: ProgressTrackerProps) => {
  const totalDays = 30;
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
