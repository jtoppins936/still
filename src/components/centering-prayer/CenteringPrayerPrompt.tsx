
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

interface CenteringPrayerPromptProps {
  prompt: string;
  dayId: string;
}

export const CenteringPrayerPrompt = ({ prompt, dayId }: CenteringPrayerPromptProps) => {
  const [reflection, setReflection] = useState("");
  const { session } = useAuth();
  const { toast } = useToast();

  const saveReflection = useMutation({
    mutationFn: async () => {
      if (!session?.user) {
        throw new Error("You must be logged in to save a reflection");
      }

      const { error } = await supabase
        .from("mindfulness_reflections")
        .insert({
          user_id: session.user.id,
          program_day_id: dayId,
          reflection_content: reflection
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Reflection saved",
        description: "Your reflection has been saved successfully."
      });
      setReflection("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return (
    <div className="space-y-6">
      <div className="bg-rose-50 p-4 rounded-md border border-rose-100">
        <h3 className="text-lg font-medium text-rose-800 mb-2">Today's Reflection</h3>
        <p className="text-gray-700">{prompt}</p>
      </div>
      
      <div className="space-y-4">
        <Textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write your reflection here..."
          className="min-h-[200px]"
        />
        
        <Button
          onClick={() => saveReflection.mutate()}
          disabled={!reflection.trim() || saveReflection.isPending}
        >
          {saveReflection.isPending ? "Saving..." : "Save Reflection"}
        </Button>
      </div>
    </div>
  );
};
