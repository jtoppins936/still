
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ReadingReflectionPrompt } from "./ReadingReflectionPrompt";
import { ProgressTracker } from "../centering-prayer/ProgressTracker";
import { BookOpen, ArrowLeft, ArrowRight } from "lucide-react";
import { READING_PROMPTS } from "@/types/reading";

export const ReadingReflectionProgram = () => {
  const { session } = useAuth();
  const [currentDay, setCurrentDay] = useState(1);
  const [reflection, setReflection] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Fetch user's progress
  const { data: userProgress, isLoading: progressLoading } = useQuery({
    queryKey: ["reading-reflection-progress", session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      if (!session?.user?.id) return null;

      const { data: entries, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("entry_type", "reading_reflection")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      // Set the current day based on entries count
      const day = entries && entries.length > 0 ? Math.min(entries.length + 1, 30) : 1;
      setCurrentDay(day);
      
      return { 
        current_day: day,
        entries
      };
    },
  });

  const handleSubmitReflection = async () => {
    if (!session?.user?.id || !reflection.trim()) return;

    try {
      const currentPrompt = READING_PROMPTS.find(p => p.day === currentDay) || READING_PROMPTS[0];
      
      // Create the full content with book title
      const fullContent = bookTitle 
        ? `Book: ${bookTitle}\n\n${reflection}`
        : reflection;

      // Save journal entry
      await supabase.from("journal_entries").insert({
        user_id: session.user.id,
        content: fullContent,
        entry_type: "reading_reflection",
        prompt_info: JSON.stringify({
          day: currentDay,
          title: currentPrompt.title,
          prompt: currentPrompt.prompt
        })
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error saving reflection:", error);
    }
  };

  const handleNextDay = () => {
    if (currentDay < 30) {
      setCurrentDay(currentDay + 1);
      setReflection("");
      setBookTitle("");
      setSubmitted(false);
    }
  };

  const handlePreviousDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
      setReflection("");
      setBookTitle("");
      setSubmitted(false);
    }
  };

  if (!session) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-600">
            Please sign in to start your reading reflection journey.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (progressLoading) {
    return <Skeleton className="h-48 w-full" />;
  }

  // Get the current day's prompt
  const currentPrompt = READING_PROMPTS.find(p => p.day === currentDay) || READING_PROMPTS[0];

  return (
    <div className="space-y-6">
      <Card className="border-amber-100">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <h2 className="text-2xl font-medium">30-Day Reading Reflection Journey</h2>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            This 30-day program guides you through a journey of thoughtful reflection on your reading, 
            helping you extract deeper meaning and personal insights from the texts you engage with.
          </p>
          
          <ProgressTracker 
            currentDay={currentDay} 
            totalDays={30} 
            variant="default" 
          />
          
          <div className="flex justify-between items-center mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePreviousDay} 
              disabled={currentDay <= 1}
              className="text-amber-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <span className="text-lg font-medium text-amber-800">Day {currentDay}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNextDay} 
              disabled={currentDay >= 30 || !submitted}
              className="text-amber-700"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {currentPrompt && (
        <ReadingReflectionPrompt
          prompt={currentPrompt}
          day={currentDay}
          bookTitle={bookTitle}
          onBookTitleChange={setBookTitle}
          reflection={reflection}
          onReflectionChange={setReflection}
          onSubmit={handleSubmitReflection}
          submitted={submitted}
        />
      )}
    </div>
  );
};
