
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { loadStripe } from "@stripe/stripe-js";

interface PaywallContextType {
  isSubscribed: boolean;
  isLoading: boolean;
  handleSubscribe: () => Promise<void>;
}

const PaywallContext = createContext<PaywallContextType>({
  isSubscribed: false,
  isLoading: true,
  handleSubscribe: async () => {},
});

export const usePaywall = () => useContext(PaywallContext);

const stripePromise = loadStripe("your-publishable-key"); // Replace with your Stripe publishable key

export function PaywallProvider({ children }: { children: React.ReactNode }) {
  // For testing purposes, set isSubscribed to true by default
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();

  useEffect(() => {
    if (session?.user) {
      checkSubscription();
    } else {
      setIsLoading(false);
      setIsSubscribed(false);
    }
  }, [session?.user]);

  const checkSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", session?.user?.id)
        .eq("status", "active")
        .maybeSingle();

      if (error) throw error;
      // For testing, we don't change isSubscribed here
    } catch (error) {
      console.error("Error checking subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!session?.user?.id) return;
    
    try {
      const { error } = await supabase
        .from("subscriptions")
        .insert([{
          user_id: session.user.id,
          status: "active",
          tier: "premium",
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // Convert Date to ISO string
        }]);

      if (error) throw error;
      
      setIsSubscribed(true);
    } catch (error) {
      console.error("Error creating subscription:", error);
    }
  };

  return (
    <PaywallContext.Provider value={{ isSubscribed, isLoading, handleSubscribe }}>
      {children}
    </PaywallContext.Provider>
  );
}
