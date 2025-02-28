
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Book, PenLine } from "lucide-react";
import type { JournalingPromptType } from "@/types/journaling";

interface JournalingPromptProps {
  day: number;
}

export const JournalingPrompt = ({ day }: JournalingPromptProps) => {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const { session } = useAuth();
  const { toast } = useToast();

  const { data: prompt, isLoading } = useQuery({
    queryKey: ["journaling-prompt", day],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("journaling_prompts")
        .select("*")
        .eq("day_number", day)
        .single();

      if (error) throw error;
      return data as JournalingPromptType;
    },
  });

  const saveJournalEntry = async () => {
    if (!session || !prompt) return;

    setSaving(true);
    try {
      // First save the journal entry
      const { error: entryError } = await supabase
        .from("journal_entries")
        .insert({
          user_id: session.user.id,
          entry_type: "prompt_response",
          content: content,
          prompt_id: prompt.id
        });

      if (entryError) throw entryError;

      // Update user progress to next day
      await supabase
        .from("user_journaling_progress")
        .update({ 
          current_day: day + 1,
          last_completed_at: new Date().toISOString()
        })
        .eq("user_id", session.user.id);

      toast({
        title: "Journal entry saved",
        description: "Your journey continues tomorrow.",
      });

      setContent("");
    } catch (error) {
      toast({
        title: "Error saving journal entry",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (!prompt) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-600">
            No prompt found for this day. You've completed the journaling program!
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
            Day {day} – {prompt.title}
          </h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Book className="w-4 h-4 text-purple-600" />
            <h4 className="font-medium">Today's Prompt</h4>
          </div>
          <p className="text-gray-600 pl-6">
            {prompt.prompt_text}
          </p>
          {prompt.supporting_text && (
            <p className="text-gray-500 pl-6 text-sm italic mt-2">
              {prompt.supporting_text}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <PenLine className="w-4 h-4 text-purple-600" />
            <h4 className="font-medium">Your Response</h4>
          </div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your journal entry here..."
            className="min-h-[300px]"
          />
          <Button 
            onClick={saveJournalEntry}
            disabled={saving || !content.trim()}
            className="w-full md:w-auto"
          >
            {saving ? "Saving..." : "Complete Today's Journal"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
