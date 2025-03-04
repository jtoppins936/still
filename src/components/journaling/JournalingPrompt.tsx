
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Book, PenLine, Footprints, Trees } from "lucide-react";
import { JOURNALING_PROMPTS, NATURE_WALK_PROMPTS } from "@/types/journaling";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface JournalingPromptProps {
  day: number;
  journalType: "regular" | "nature_walk";
  onComplete: () => void;
}

export const JournalingPrompt = ({ day, journalType, onComplete }: JournalingPromptProps) => {
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get prompt for the current day based on journal type
  const prompts = journalType === "regular" ? JOURNALING_PROMPTS : NATURE_WALK_PROMPTS;
  const prompt = prompts.find(p => p.day_number === day) || prompts[0];

  const saveJournalEntry = async () => {
    if (!session || !prompt || !content.trim()) return;

    setSaving(true);
    try {
      // Prepare the content with location for nature walks
      const fullContent = journalType === "nature_walk" && location
        ? `Location: ${location}\n\n${content}`
        : content;

      // Save the journal entry to the existing journal_entries table
      const { error: entryError } = await supabase
        .from("journal_entries")
        .insert({
          user_id: session.user.id,
          entry_type: journalType === "regular" ? "prompt_response" : "nature_walk",
          content: fullContent,
          // Store the prompt info in the content for now
          prompt_info: JSON.stringify({
            day_number: prompt.day_number,
            title: prompt.title,
            prompt_text: prompt.prompt_text,
            journal_type: journalType
          })
        });

      if (entryError) throw entryError;

      toast({
        title: journalType === "regular" 
          ? "Journal entry saved" 
          : "Nature walk reflection saved",
        description: "Your journey continues tomorrow.",
      });

      setContent("");
      setLocation("");
      
      // Update the local progress state
      onComplete();
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["journaling-progress"] });
    } catch (error) {
      console.error("Error saving journal entry:", error);
      toast({
        title: "Error saving journal entry",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

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
    <Card className={journalType === "nature_walk" ? "border-green-200" : ""}>
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium flex items-center gap-2">
              {journalType === "nature_walk" ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Footprints className="w-3 h-3 mr-1" /> 
                  Day {day}
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  <Book className="w-3 h-3 mr-1" /> 
                  Day {day}
                </Badge>
              )}
              <span className="ml-2">{prompt.title}</span>
            </h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            {journalType === "regular" ? (
              <Book className="w-4 h-4 text-purple-600" />
            ) : (
              <Trees className="w-4 h-4 text-green-600" />
            )}
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
            <PenLine className={`w-4 h-4 ${journalType === "nature_walk" ? "text-green-600" : "text-purple-600"}`} />
            <h4 className="font-medium">Your Response</h4>
          </div>

          {journalType === "nature_walk" && (
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm text-gray-600">Where did you walk today? (optional)</label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Local park, forest trail, neighborhood..."
                className="w-full"
              />
            </div>
          )}

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={journalType === "regular" 
              ? "Write your journal entry here..." 
              : "Describe what you noticed and experienced on your nature walk today..."}
            className="min-h-[300px]"
          />
          <Button 
            onClick={saveJournalEntry}
            disabled={saving || !content.trim()}
            className={`w-full md:w-auto ${journalType === "nature_walk" ? "bg-green-600 hover:bg-green-700" : ""}`}
          >
            {saving ? "Saving..." : (journalType === "regular" ? "Complete Today's Journal" : "Save Nature Walk Reflection")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
