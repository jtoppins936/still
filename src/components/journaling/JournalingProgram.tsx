
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

  const { data: userProgress, isLoading: progressLoading } = useQuery({
    queryKey: ["journaling-progress", session?.user.id],
    enabled: !!session,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_journaling_progress")
        .select("*")
        .eq("user_id", session?.user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      
      if (!data) {
        // Initialize progress if not found
        const { data: newProgress, error: insertError } = await supabase
          .from("user_journaling_progress")
          .insert({
            user_id: session?.user.id,
            current_day: 1
          })
          .select("*")
          .single();
          
        if (insertError) throw insertError;
        return newProgress;
      }
      
      return data as UserJournalingProgress;
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
          {userProgress && (
            <ProgressTracker 
              currentDay={userProgress.current_day} 
            />
          )}
        </CardContent>
      </Card>

      {userProgress && (
        <JournalingPrompt 
          day={userProgress.current_day}
        />
      )}
    </div>
  );
};
