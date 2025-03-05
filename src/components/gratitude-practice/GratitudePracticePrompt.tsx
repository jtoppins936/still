
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Heart } from "lucide-react";
import { GratitudePrompt } from "@/types/gratitude";

interface GratitudePracticePromptProps {
  prompt: GratitudePrompt;
  day: number;
  reflection: string;
  onReflectionChange: (value: string) => void;
  onSubmit: () => void;
  submitted: boolean;
}

export const GratitudePracticePrompt = ({
  prompt,
  day,
  reflection,
  onReflectionChange,
  onSubmit,
  submitted,
}: GratitudePracticePromptProps) => {
  return (
    <Card className="border-blue-100">
      <CardHeader className="bg-blue-50 border-b border-blue-100">
        <div className="flex justify-between items-center">
          <CardTitle className="text-blue-800">{prompt.title}</CardTitle>
          <div className="flex items-center text-blue-600 text-sm">
            <Heart className="h-4 w-4 mr-1" />
            <span>Day {day}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="prose max-w-none">
          <p className="text-gray-700">{prompt.prompt}</p>
          {prompt.supportingText && (
            <p className="text-gray-500 text-sm italic mt-2">{prompt.supportingText}</p>
          )}
        </div>

        <div className="mt-6">
          <label htmlFor="reflection" className="block text-sm font-medium text-gray-700 mb-1">
            Your Gratitude Reflection
          </label>
          <Textarea
            id="reflection"
            placeholder="Write your gratitude reflection here..."
            className="min-h-[200px] border-blue-200 focus:border-blue-300"
            value={reflection}
            onChange={(e) => onReflectionChange(e.target.value)}
            disabled={submitted}
          />
        </div>

        <div className="flex justify-end mt-4">
          {submitted ? (
            <Button disabled className="bg-blue-600 text-white">
              <Check className="mr-2 h-4 w-4" /> Submitted
            </Button>
          ) : (
            <Button 
              onClick={onSubmit} 
              disabled={reflection.trim() === ""}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit Reflection
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
