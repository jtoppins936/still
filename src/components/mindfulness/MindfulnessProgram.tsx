
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { CategorySelector } from "./CategorySelector";
import { DailyMeditation } from "./DailyMeditation";
import { ProgressTracker } from "./ProgressTracker";
import { ScrollText } from "lucide-react";

type MindfulnessCategory = 'faith_based' | 'spiritual' | 'neutral';

export const MindfulnessProgram = () => {
  const { session } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<MindfulnessCategory | null>(null);

  const { data: userProgress, isLoading: progressLoading } = useQuery({
    queryKey: ["mindfulness-progress", session?.user.id],
    enabled: !!session,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_mindfulness_progress")
        .select("*")
        .eq("user_id", session?.user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
  });

  const initializeProgress = async (category: MindfulnessCategory) => {
    if (!session) return;

    await supabase
      .from("user_mindfulness_progress")
      .insert({
        user_id: session.user.id,
        selected_category: category,
        current_day: 1
      });

    setSelectedCategory(category);
  };

  if (!session) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-600">
            Please sign in to start your mindfulness journey.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (progressLoading) {
    return <Skeleton className="h-48 w-full" />;
  }

  if (!userProgress && !selectedCategory) {
    return <CategorySelector onSelectCategory={initializeProgress} />;
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <ScrollText className="w-5 h-5 text-purple-600" />
            <h2 className="text-2xl font-medium">30-Day Mindfulness Journey</h2>
          </div>
        </CardHeader>
        <CardContent>
          <ProgressTracker 
            currentDay={userProgress?.current_day || 1} 
            category={userProgress?.selected_category || selectedCategory!}
          />
        </CardContent>
      </Card>

      <DailyMeditation 
        day={userProgress?.current_day || 1}
        category={userProgress?.selected_category || selectedCategory!}
      />
    </div>
  );
};
