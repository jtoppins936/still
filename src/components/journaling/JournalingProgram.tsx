
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { JournalingPrompt } from "./JournalingPrompt";
import { ProgressTracker } from "./ProgressTracker";
import { Book, ScrollText, Footprints, Trees } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import type { UserJournalingProgress } from "@/types/journaling";

export const JournalingProgram = () => {
  const { session } = useAuth();
  const [currentDay, setCurrentDay] = useState(1);
  const [journalType, setJournalType] = useState<"regular" | "nature_walk">("regular");

  // Use existing journal_entries table to determine progress
  const { data: userProgress, isLoading: progressLoading } = useQuery({
    queryKey: ["journaling-progress", session?.user.id, journalType],
    enabled: !!session,
    queryFn: async () => {
      // Check if the user has any journal entries to determine progress
      const { data: entries, error: entriesError } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", session?.user.id)
        .eq("entry_type", journalType === "regular" ? "prompt_response" : "nature_walk")
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
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center space-x-2">
              {journalType === "regular" ? (
                <Book className="w-5 h-5 text-purple-600" />
              ) : (
                <Trees className="w-5 h-5 text-green-600" />
              )}
              <h2 className="text-2xl font-medium">
                {journalType === "regular" 
                  ? "30-Day Journaling Journey" 
                  : "30-Day Nature Walk Journal"}
              </h2>
            </div>
            <Select
              value={journalType}
              onValueChange={(value: "regular" | "nature_walk") => {
                setJournalType(value);
                setCurrentDay(1); // Reset to day 1 when changing journal type
              }}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Journal Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular">
                  <div className="flex items-center space-x-2">
                    <Book className="w-4 h-4" />
                    <span>Regular Journal</span>
                  </div>
                </SelectItem>
                <SelectItem value="nature_walk">
                  <div className="flex items-center space-x-2">
                    <Footprints className="w-4 h-4" />
                    <span>Nature Walk</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            {journalType === "regular" ? (
              "This 30-day journaling program guides you through a journey of self-discovery, mindfulness, and reflection. Each day offers a unique prompt to inspire your writing."
            ) : (
              "This 30-day nature walk journal guides your attention during walks in natural settings. Each prompt helps you notice different aspects of nature and your connection to the environment."
            )}
          </p>
          <ProgressTracker currentDay={currentDay} />
        </CardContent>
      </Card>

      <JournalingPrompt 
        day={currentDay} 
        journalType={journalType}
        onComplete={() => setCurrentDay(prev => Math.min(prev + 1, 30))} 
      />
    </div>
  );
};
