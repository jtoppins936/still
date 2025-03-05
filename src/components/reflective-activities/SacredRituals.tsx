
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  
  // Group activities by their theme based on title prefixes
  const groupedActivities = activities.reduce((acc, activity) => {
    const title = activity.title.replace('Sacred Rituals: ', '');
    const theme = determineTheme(title);
    
    if (!acc[theme]) {
      acc[theme] = [];
    }
    
    acc[theme].push({
      ...activity,
      simplifiedTitle: title
    });
    
    return acc;
  }, {} as Record<string, Array<Activity & { simplifiedTitle: string }>>);
  
  // Convert to array for easier rendering
  const themes = Object.keys(groupedActivities).map(theme => ({
    name: theme,
    activities: groupedActivities[theme]
  }));
  
  // Sort themes alphabetically
  themes.sort((a, b) => a.name.localeCompare(b.name));
  
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
          onClick={() => setIsExpanded(!isExpanded)}
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
          
          {themes.map((theme) => (
            <div key={theme.name} className="mt-4">
              <h5 className="font-medium text-sage-600 mb-3">{theme.name}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {theme.activities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="p-4 border border-sand-200 rounded-md hover:border-sage-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h6 className="font-medium">{activity.simplifiedTitle}</h6>
                      <Badge variant="outline" className="bg-sand-50">
                        {activity.duration_minutes} min
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{activity.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper function to categorize activities into themes
function determineTheme(title: string): string {
  if (title.includes('Nature') || title.includes('Plant') || title.includes('Star') || title.includes('Sunset')) {
    return 'Nature Connection';
  } else if (title.includes('Space') || title.includes('Altar') || title.includes('Arrangement') || title.includes('Threshold') || title.includes('Light Ritual')) {
    return 'Space & Environment';
  } else if (title.includes('Sound') || title.includes('Music') || title.includes('Voice') || title.includes('Listening') || title.includes('Silence')) {
    return 'Sound & Silence';
  } else if (title.includes('Tea') || title.includes('Meal') || title.includes('Bread') || title.includes('Water') || title.includes('Harvest')) {
    return 'Food & Nourishment';
  } else if (title.includes('Hand') || title.includes('Movement') || title.includes('Walking') || title.includes('Rest') || title.includes('Body')) {
    return 'Body Practices';
  } else if (title.includes('Intention') || title.includes('Gratitude') || title.includes('Letter') || title.includes('Art') || title.includes('Integration')) {
    return 'Integration Practices';
  } else {
    return 'Other Rituals';
  }
}
