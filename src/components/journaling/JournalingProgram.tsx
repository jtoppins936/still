
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { JournalingPrompt } from "./JournalingPrompt";
import { ProgressTracker } from "../centering-prayer/ProgressTracker";
import { Book, ScrollText, Footprints, Trees } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import type { UserJournalingProgress } from "@/types/journaling";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <Tabs 
        defaultValue={journalType} 
        onValueChange={(value) => setJournalType(value as "regular" | "nature_walk")}
        className="w-full"
      >
        <div className="mb-6">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="regular" className="flex items-center gap-2">
              <Book className="w-4 h-4" />
              <span>Mindful Journal</span>
            </TabsTrigger>
            <TabsTrigger value="nature_walk" className="flex items-center gap-2">
              <Footprints className="w-4 h-4" />
              <span>Nature Walk Journal</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="regular">
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
              <ProgressTracker currentDay={currentDay} totalDays={30} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nature_walk">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Trees className="w-5 h-5 text-green-600" />
                <h2 className="text-2xl font-medium">30-Day Nature Walk Journal</h2>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Connect with the natural world through this 30-day guided nature walk journal. 
                Each prompt will help you notice different aspects of nature and deepen your 
                connection to the environment around you.
              </p>
              <ProgressTracker 
                currentDay={currentDay} 
                totalDays={30} 
                variant="nature" 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <JournalingPrompt 
        day={currentDay} 
        journalType={journalType}
        onComplete={() => setCurrentDay(prev => Math.min(prev + 1, 30))} 
      />
    </div>
  );
};
