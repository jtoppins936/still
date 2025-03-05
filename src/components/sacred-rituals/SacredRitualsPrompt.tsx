
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

        <div className="mt-4 bg-sage-50 p-4 rounded-md border border-sage-100">
          <h4 className="font-medium text-sage-800 mb-2">How to Practice Today's Ritual:</h4>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Find a quiet space where you won't be disturbed for {prompt.duration_minutes} minutes.</li>
            <li>Take a few deep breaths to center yourself before beginning.</li>
            <li>Follow the guidance in the description above.</li>
            <li>When you've completed the ritual, take a moment to reflect on your experience.</li>
            <li>Write your thoughts in the reflection area below.</li>
          </ol>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-sage-800 mb-2">Your Reflection</h3>
          <Textarea
            placeholder="Write your reflections here... Consider: How did this ritual make you feel? What insights arose? How might you incorporate elements of this practice into your daily life?"
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
