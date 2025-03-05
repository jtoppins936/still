
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Check, BookOpen } from "lucide-react";

interface ReadingReflectionPromptProps {
  prompt: {
    day: number;
    title: string;
    prompt: string;
    supportingText?: string;
  };
  day: number;
  bookTitle: string;
  onBookTitleChange: (value: string) => void;
  reflection: string;
  onReflectionChange: (value: string) => void;
  onSubmit: () => void;
  submitted: boolean;
}

export const ReadingReflectionPrompt = ({
  prompt,
  day,
  bookTitle,
  onBookTitleChange,
  reflection,
  onReflectionChange,
  onSubmit,
  submitted,
}: ReadingReflectionPromptProps) => {
  return (
    <Card className="border-amber-100">
      <CardHeader className="bg-amber-50 border-b border-amber-100">
        <div className="flex justify-between items-center">
          <CardTitle className="text-amber-800">{prompt.title}</CardTitle>
          <div className="flex items-center text-amber-600 text-sm">
            <BookOpen className="h-4 w-4 mr-1" />
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

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="book-title" className="block text-sm font-medium text-gray-700 mb-1">
              What are you reading? (optional)
            </label>
            <Input
              id="book-title"
              placeholder="Enter book title, article, or text name"
              value={bookTitle}
              onChange={(e) => onBookTitleChange(e.target.value)}
              className="border-amber-200 focus:border-amber-300"
              disabled={submitted}
            />
          </div>

          <div>
            <label htmlFor="reflection" className="block text-sm font-medium text-gray-700 mb-1">
              Your Reflection
            </label>
            <Textarea
              id="reflection"
              placeholder="Write your reflection here..."
              className="min-h-[200px] border-amber-200 focus:border-amber-300"
              value={reflection}
              onChange={(e) => onReflectionChange(e.target.value)}
              disabled={submitted}
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          {submitted ? (
            <Button disabled className="bg-amber-600 text-white">
              <Check className="mr-2 h-4 w-4" /> Submitted
            </Button>
          ) : (
            <Button 
              onClick={onSubmit} 
              disabled={reflection.trim() === ""}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Submit Reflection
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
