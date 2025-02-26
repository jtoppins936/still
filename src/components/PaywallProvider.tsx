
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
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
      setIsSubscribed(!!data);
    } catch (error) {
      console.error("Error checking subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async () => {
    // Here we would integrate with Stripe to handle the payment
    // For now, we'll just create a subscription record
    try {
      const { error } = await supabase
        .from("subscriptions")
        .insert({
          user_id: session?.user?.id,
          status: "active",
          tier: "premium",
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        });

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
