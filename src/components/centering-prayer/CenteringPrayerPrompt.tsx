
import { useState, useRef } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface CenteringPrayerPromptProps {
  prompt: string;
  dayId: string;
}

export const CenteringPrayerPrompt = ({ prompt, dayId }: CenteringPrayerPromptProps) => {
  const [reflection, setReflection] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { session } = useAuth();
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const userId = session?.user?.id;

  const handleSaveReflection = async () => {
    if (!reflection.trim() || !userId) return;
    
    setIsSaving(true);
    
    try {
      // Use mindfulness_reflections as a temporary solution
      const { data: existingReflection } = await supabase
        .from("mindfulness_reflections")
        .select("*")
        .eq("program_day_id", dayId)
        .eq("user_id", userId)
        .maybeSingle();

      if (existingReflection) {
        // Update existing reflection
        await supabase
          .from("mindfulness_reflections")
          .update({ reflection_content: reflection })
          .eq("id", existingReflection.id);
      } else {
        // Create new reflection
        await supabase
          .from("mindfulness_reflections")
          .insert({
            program_day_id: dayId,
            user_id: userId,
            reflection_content: reflection
          });
      }
      
      toast({
        title: "Reflection saved",
        description: "Your reflection has been saved successfully.",
      });
      
      setIsComplete(true);
    } catch (error) {
      console.error("Error saving reflection:", error);
      toast({
        title: "Error saving reflection",
        description: "There was a problem saving your reflection. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-rose-50 p-4 rounded-md border border-rose-100">
        <h3 className="text-lg font-medium text-rose-700 mb-2">Reflection Prompt</h3>
        <p className="text-gray-700">{prompt}</p>
      </div>
      
      <div>
        <Textarea
          ref={textareaRef}
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write your reflection here..."
          className="min-h-[200px] w-full p-4"
        />
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveReflection}
          disabled={!reflection.trim() || isSaving}
          className={isComplete ? "bg-green-600 hover:bg-green-700" : "bg-rose-600 hover:bg-rose-700"}
        >
          {isSaving ? "Saving..." : isComplete ? "Saved" : "Save Reflection"}
        </Button>
      </div>
    </div>
  );
};
