
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChallengeCard } from "./ChallengeCard";
import { Skeleton } from "@/components/ui/skeleton";

export const DailyChallenges = () => {
  const { data: challenges, isLoading, refetch } = useQuery({
    queryKey: ["daily-challenges"],
    queryFn: async () => {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      
      const { data, error } = await supabase
        .from("daily_challenges")
        .select("*")
        .limit(1)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  const challenge = challenges?.[0];

  if (!challenge) {
    return null;
  }

  return <ChallengeCard challenge={challenge} onComplete={refetch} />;
};
