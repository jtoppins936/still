
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/components/ui/use-toast";

interface PaywallContextType {
  isSubscribed: boolean;
  isLoading: boolean;
  handleSubscribe: () => Promise<void>;
  price: string;
}

const PaywallContext = createContext<PaywallContextType>({
  isSubscribed: false, // Default to false - not subscribed
  isLoading: false, 
  handleSubscribe: async () => {},
  price: "$2.99/month"
});

export const usePaywall = () => useContext(PaywallContext);

const stripePromise = loadStripe("your-publishable-key"); // Replace with your Stripe publishable key

export function PaywallProvider({ children }: { children: React.ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();
  const { toast } = useToast();
  const price = "$2.99/month";

  useEffect(() => {
    if (session?.user) {
      console.log("User is authenticated:", session.user.id);
      checkSubscription();
    } else {
      console.log("No authenticated user");
      setIsLoading(false);
      setIsSubscribed(false);
    }
  }, [session?.user]);

  const checkSubscription = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", session?.user?.id)
        .eq("status", "active")
        .maybeSingle();

      if (error) throw error;
      
      // Set subscription status based on actual database result
      setIsSubscribed(!!data);
      console.log("Subscription check:", data ? "Active subscription found" : "No active subscription");
    } catch (error) {
      console.error("Error checking subscription:", error);
      setIsSubscribed(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // In a real production app, this would redirect to Stripe for payment
      // For now, we'll simulate subscription by creating a record
      const { error } = await supabase
        .from("subscriptions")
        .insert([{
          user_id: session.user.id,
          status: "active",
          tier: "premium",
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year subscription
        }]);

      if (error) throw error;
      
      toast({
        title: "Subscription successful",
        description: "You now have access to premium features",
      });
      
      setIsSubscribed(true);
    } catch (error) {
      console.error("Error creating subscription:", error);
      toast({
        title: "Subscription failed",
        description: "There was an error processing your subscription",
        variant: "destructive",
      });
    }
  };

  return (
    <PaywallContext.Provider value={{ isSubscribed, isLoading, handleSubscribe, price }}>
      {children}
    </PaywallContext.Provider>
  );
}
