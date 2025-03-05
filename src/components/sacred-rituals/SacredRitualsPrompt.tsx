
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Sparkles } from "lucide-react";

interface SacredRitualsPromptProps {
  activity: {
    id: string;
    title: string;
    description: string;
    duration_minutes: number;
  };
  day: number;
  reflection: string;
  onReflectionChange: (value: string) => void;
  onSubmit: () => void;
  submitted: boolean;
}

export const SacredRitualsPrompt = ({
  activity,
  day,
  reflection,
  onReflectionChange,
  onSubmit,
  submitted,
}: SacredRitualsPromptProps) => {
  // Extract ritual name without the "Sacred Rituals: " prefix
  const ritualName = activity.title.replace('Sacred Rituals: ', '');
  
  return (
    <Card className="border-sage-100">
      <CardHeader className="bg-sage-50 border-b border-sage-100">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sage-800">{ritualName}</CardTitle>
          <div className="flex items-center text-sage-600 text-sm">
            <Sparkles className="h-4 w-4 mr-1" />
            <span>Day {day}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="prose max-w-none">
          <p className="text-gray-700">{activity.description}</p>
          
          <div className="mt-4 p-4 bg-sage-50 rounded-md">
            <h4 className="text-sage-700 font-medium mb-2">Practice</h4>
            <p className="text-gray-600">
              Find a quiet moment to engage in this ritual. Focus on being fully present 
              with each aspect of the experience. Notice the sensations, emotions, and 
              thoughts that arise without judgment.
            </p>
            
            <h4 className="text-sage-700 font-medium mt-4 mb-2">Reflection Question</h4>
            <p className="text-gray-600">
              How did this ritual create a sense of presence for you? What did you notice 
              that you might normally overlook? How might this practice enrich your daily life?
            </p>
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="reflection" className="block text-sm font-medium text-gray-700 mb-1">
            Your Reflection
          </label>
          <Textarea
            id="reflection"
            placeholder="Write your reflection here..."
            className="min-h-[200px] border-sage-200 focus:border-sage-300"
            value={reflection}
            onChange={(e) => onReflectionChange(e.target.value)}
            disabled={submitted}
          />
        </div>

        <div className="flex justify-end mt-4">
          {submitted ? (
            <Button disabled className="bg-sage-600 text-white">
              <Check className="mr-2 h-4 w-4" /> Submitted
            </Button>
          ) : (
            <Button 
              onClick={onSubmit} 
              disabled={reflection.trim() === ""}
              className="bg-sage-600 hover:bg-sage-700 text-white"
            >
              Complete Today's Ritual
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
