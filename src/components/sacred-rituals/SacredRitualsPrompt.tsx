
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Clock } from "lucide-react";

interface SacredRitualActivity {
  id: string;
  category: string;
  title: string;
  description: string;
  duration_minutes: number;
  created_at: string | null;
  day: number;
}

interface SacredRitualsPromptProps {
  prompt: SacredRitualActivity;
  day: number;
  reflection: string;
  onReflectionChange: (value: string) => void;
  onSubmit: () => void;
  submitted: boolean;
}

export const SacredRitualsPrompt = ({
  prompt,
  day,
  reflection,
  onReflectionChange,
  onSubmit,
  submitted,
}: SacredRitualsPromptProps) => {
  return (
    <Card className="border-sage-100">
      <CardHeader className="bg-sage-50 border-b border-sage-100">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sage-800">{prompt.title}</CardTitle>
          <div className="flex items-center text-sage-600 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>{prompt.duration_minutes} minutes</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="prose max-w-none">
          <p className="text-gray-700">{prompt.description}</p>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-sage-800 mb-2">Your Reflection</h3>
          <Textarea
            placeholder="Write your reflections here..."
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
              Submit Reflection
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
