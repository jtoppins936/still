
import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { seedCenteringPrayer } from "@/data/seed-centering-prayer";

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        console.log("Initializing auth session...");
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error.message);
          setLoading(false);
          return;
        }
        
        console.log("Initial auth session:", data.session?.user?.id || "No session");
        setSession(data.session);
        
        // Seed centering prayer data when user is logged in - catch error but don't fail
        if (data.session) {
          try {
            await seedCenteringPrayer();
          } catch (error) {
            console.error("Error seeding centering prayer data:", error);
            // Don't throw the error further, just log it
          }
        }
      } catch (err) {
        console.error("Unexpected error in auth initialization:", err);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session?.user?.id || "No session");
      setSession(session);
      
      // Seed centering prayer data on sign in - catch error but don't fail
      if (session && _event === 'SIGNED_IN') {
        try {
          seedCenteringPrayer().catch(error => {
            console.error("Error seeding centering prayer data:", error);
            // Don't throw the error further, just log it
          });
        } catch (error) {
          console.error("Error seeding centering prayer data:", error);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      console.log("Signing out...");
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
