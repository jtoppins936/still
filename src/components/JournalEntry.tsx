
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

export interface JournalEntryProps {
  type: string;
  title: string;
}

export function JournalEntry({ type, title }: JournalEntryProps) {
  const [content, setContent] = useState("");
  const [isSaving, setSaving] = useState(false);
  const { session } = useAuth();
  const { toast } = useToast();

  const handleSave = async () => {
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to save journal entries",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from("journal_entries").insert({
        user_id: session.user.id,
        entry_type: type,
        content,
      });

      if (error) throw error;

      toast({
        title: "Entry saved",
        description: "Your journal entry has been saved successfully",
      });
      setContent("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your journal entry",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-medium">{title}</h2>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}
        </p>
      </CardHeader>
      <CardContent>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts here..."
          className="min-h-[300px] mb-4"
        />
        <Button onClick={handleSave} disabled={isSaving || !content.trim()}>
          {isSaving ? "Saving..." : "Save Entry"}
        </Button>
      </CardContent>
    </Card>
  );
}
