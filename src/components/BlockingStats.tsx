
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export const BlockingStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["blocking-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blocking_statistics")
        .select("*")
        .order("blocked_count", { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <Skeleton className="h-64 w-full" />;
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">Blocking Statistics</h3>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats}>
              <XAxis dataKey="site_domain" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="blocked_count" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
