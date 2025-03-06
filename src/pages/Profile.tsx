
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollText, Box, BarChart2, Target } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { BlockingStats } from "@/components/BlockingStats";
import { usePaywall } from "@/components/PaywallProvider";
import { PaywallModal } from "@/components/PaywallModal";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const { session } = useAuth();
  const { isSubscribed, price } = usePaywall();
  const [showPaywall, setShowPaywall] = useState(false);

  const { data: journalEntries, isLoading: isLoadingJournal } = useQuery({
    queryKey: ["journal-entries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", session?.user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user,
  });

  const { data: declutterItems, isLoading: isLoadingDeclutter } = useQuery({
    queryKey: ["declutter-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("declutter_items")
        .select("*")
        .eq("user_id", session?.user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user,
  });

  if (!session) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-medium text-center">Please sign in to view your profile</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-medium mb-8">Your Mindful Journey</h1>

      {/* Blocking Statistics Section */}
      <div className="grid gap-6 grid-cols-1">
        {!isSubscribed ? (
          <Card className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BarChart2 className="w-5 h-5 text-sage-600" />
                <h3 className="text-xl font-medium">Blocking Statistics</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <p className="text-gray-600 mb-4">
                  Upgrade to premium ({price}) to access detailed statistics about your digital sabbath journey.
                </p>
                <button
                  onClick={() => setShowPaywall(true)}
                  className="bg-sage-600 hover:bg-sage-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Unlock Premium Features
                </button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <BlockingStats />
        )}
      </div>

      {/* Journal Entries Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <ScrollText className="w-5 h-5 text-sage-600" />
            <h3 className="text-xl font-medium">Recent Journal Entries</h3>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingJournal ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : journalEntries?.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No journal entries yet</p>
          ) : (
            <div className="space-y-4">
              {journalEntries?.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-lg border border-gray-100"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </p>
                      <p className="mt-2">{entry.content.substring(0, 200)}...</p>
                    </div>
                    <span className="text-sm text-sage-600">{entry.entry_type}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Declutter Challenge Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Box className="w-5 h-5 text-sage-600" />
            <h3 className="text-xl font-medium">Declutter Progress</h3>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingDeclutter ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : declutterItems?.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No items decluttered yet</p>
          ) : (
            <div className="space-y-4">
              {declutterItems?.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg border border-gray-100"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{item.item_name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.category}</p>
                      {item.reflection && (
                        <p className="text-sm text-gray-600 mt-2">{item.reflection}</p>
                      )}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} />
    </div>
  );
};

export default Profile;
