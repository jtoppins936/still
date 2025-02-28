
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { JournalingPrompt } from "./JournalingPrompt";
import { ProgressTracker } from "./ProgressTracker";
import { Book, ScrollText } from "lucide-react";
import type { UserJournalingProgress } from "@/types/journaling";

export const JournalingProgram = () => {
  const { session } = useAuth();
  const [currentDay, setCurrentDay] = useState(1);

  // Simulating user progress since we don't have the table yet
  const { data: userProgress, isLoading: progressLoading } = useQuery({
    queryKey: ["journaling-progress", session?.user.id],
    enabled: !!session,
    queryFn: async () => {
      // First check if the user has any journal entries to determine progress
      const { data: entries, error: entriesError } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", session?.user.id)
        .eq("entry_type", "prompt_response")
        .order("created_at", { ascending: false });
      
      if (entriesError) throw entriesError;
      
      // Create a progress object based on entries count
      const day = entries && entries.length > 0 ? Math.min(entries.length + 1, 30) : 1;
      
      setCurrentDay(day);
      
      return {
        id: session?.user.id || "",
        user_id: session?.user.id || "",
        current_day: day,
        last_completed_at: entries && entries.length > 0 ? entries[0].created_at : null
      } as UserJournalingProgress;
    },
  });

  if (!session) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-600">
            Please sign in to start your journaling journey.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (progressLoading) {
    return <Skeleton className="h-48 w-full" />;
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Book className="w-5 h-5 text-purple-600" />
            <h2 className="text-2xl font-medium">30-Day Journaling Journey</h2>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            This 30-day journaling program guides you through a journey of self-discovery, 
            mindfulness, and reflection. Each day offers a unique prompt to inspire your writing.
          </p>
          <ProgressTracker currentDay={currentDay} />
        </CardContent>
      </Card>

      <JournalingPrompt day={currentDay} onComplete={() => setCurrentDay(prev => Math.min(prev + 1, 30))} />
    </div>
  );
};
