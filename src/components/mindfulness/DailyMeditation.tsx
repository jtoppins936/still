
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/components/AuthProvider";
import { Book, Clock, PenLine } from "lucide-react";
import type { MindfulnessProgram } from "@/types/mindfulness";

interface DailyMeditationProps {
  day: number;
  category: 'faith_based' | 'spiritual' | 'neutral';
}

export const DailyMeditation = ({ day, category }: DailyMeditationProps) => {
  const [reflection, setReflection] = useState("");
  const { session } = useAuth();
  const { toast } = useToast();

  const { data: meditation, isLoading } = useQuery({
    queryKey: ["mindfulness-day", day, category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mindfulness_program")
        .select("*")
        .eq("day_number", day)
        .eq("category", category)
        .single();

      if (error) throw error;
      return data as MindfulnessProgram;
    },
  });

  const saveReflection = async () => {
    if (!session || !meditation) return;

    try {
      const { error } = await supabase
        .from("mindfulness_reflections")
        .insert({
          user_id: session.user.id,
          program_day_id: meditation.id,
          reflection_content: reflection,
        });

      if (error) throw error;

      // Update user progress to next day
      await supabase
        .from("user_mindfulness_progress")
        .update({ 
          current_day: day + 1,
          last_completed_at: new Date().toISOString()
        })
        .eq("user_id", session.user.id);

      toast({
        title: "Reflection saved",
        description: "Your journey continues tomorrow.",
      });

      setReflection("");
    } catch (error) {
      toast({
        title: "Error saving reflection",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (!meditation) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-600">
            No meditation found for this day.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="space-y-2">
          <h3 className="text-xl font-medium">
            Day {day} – {meditation.theme}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {meditation.duration_minutes} minutes
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Book className="w-4 h-4 text-purple-600" />
            <h4 className="font-medium">Scripture & Wisdom</h4>
          </div>
          <p className="text-gray-600 pl-6">
            {meditation.scripture}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <PenLine className="w-4 h-4 text-purple-600" />
            <h4 className="font-medium">Practice</h4>
          </div>
          <p className="text-gray-600 pl-6">
            {meditation.practice}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <PenLine className="w-4 h-4 text-purple-600" />
            <h4 className="font-medium">Reflection</h4>
          </div>
          <p className="text-gray-600 pl-6 mb-2">
            {meditation.reflection_prompt}
          </p>
          <Textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Write your reflection here..."
            className="min-h-[150px]"
          />
          <Button 
            onClick={saveReflection}
            disabled={!reflection.trim()}
            className="w-full md:w-auto"
          >
            Complete Today's Practice
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
