
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { StoreKitService } from "@/services/StoreKitService";

interface PaywallContextType {
  isSubscribed: boolean;
  isLoading: boolean;
  handleSubscribe: () => Promise<void>;
  price: string;
}

const PaywallContext = createContext<PaywallContextType>({
  isSubscribed: false,
  isLoading: false, 
  handleSubscribe: async () => {},
  price: "$2.99/month"
});

export const usePaywall = () => useContext(PaywallContext);

export function PaywallProvider({ children }: { children: React.ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();
  const { toast } = useToast();
  const price = "$2.99/month";

  const isCapacitorEnabled = (): boolean => {
    return typeof window !== 'undefined' && 
           typeof window.Capacitor !== 'undefined' && 
           window.Capacitor.isNativePlatform();
  };

  useEffect(() => {
    if (session?.user) {
      console.log("User is authenticated:", session.user.id);
      checkSubscription();
      
      // Initialize StoreKit if on iOS
      if (isCapacitorEnabled()) {
        StoreKitService.initialize().catch(console.error);
      }
    } else {
      console.log("No authenticated user");
      setIsLoading(false);
      setIsSubscribed(false);
    }
  }, [session?.user]);

  const checkSubscription = async () => {
    try {
      setIsLoading(true);
      
      // If on iOS, check subscription through StoreKit
      if (isCapacitorEnabled()) {
        const hasActiveSubscription = await StoreKitService.checkActiveSubscription();
        setIsSubscribed(hasActiveSubscription);
        
        if (hasActiveSubscription) {
          console.log("Active StoreKit subscription found");
          return;
        }
      }
      
      // Fall back to database check
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", session?.user?.id)
        .eq("status", "active")
        .maybeSingle();

      if (error) throw error;
      
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
      // For iOS, use StoreKit
      if (isCapacitorEnabled()) {
        const success = await StoreKitService.purchaseSubscription("premium_monthly");
        
        if (success) {
          toast({
            title: "Subscription successful",
            description: "You now have access to premium features",
          });
          setIsSubscribed(true);
          return;
        } else {
          throw new Error("Purchase was not completed");
        }
      }
      
      // Web fallback - simulate subscription by creating a database record
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
