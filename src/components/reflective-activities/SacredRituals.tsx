
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  
  // Find first activity to display as preview
  const firstActivity = activities[0];
  
  return (
    <div className="mt-8">
      <div 
        className="flex items-center justify-between cursor-pointer mb-4" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className="text-lg font-medium text-sage-700">Sacred Rituals</h4>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="space-y-6">
          <p className="text-gray-600">
            Discover daily rituals designed to help you slow down, connect with the present moment, 
            and cultivate mindfulness. Each practice offers a way to bring intention and awareness 
            to your day.
          </p>
          
          <div 
            className="p-4 border border-sage-200 rounded-md hover:border-sage-300 transition-colors cursor-pointer"
            onClick={() => navigate('/sacred-rituals')}
          >
            <div className="flex justify-between items-start mb-2">
              <h6 className="font-medium">30-Day Sacred Rituals Journey</h6>
              <Badge variant="outline" className="bg-sage-50">
                30 days
              </Badge>
            </div>
            <p className="text-gray-600 text-sm">
              Follow a 30-day program of mindful rituals to help you slow down, 
              connect with the present moment, and cultivate mindfulness in your daily life.
            </p>
            <Button 
              variant="outline" 
              className="mt-4 text-sage-700"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/sacred-rituals');
              }}
            >
              Start Program
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
