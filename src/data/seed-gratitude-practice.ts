
import { supabase } from "@/integrations/supabase/client";

export const seedGratitudePractice = async () => {
  // First, check if data already exists to avoid duplicates
  const { data: existingData } = await supabase
    .from("reflective_activities")
    .select("id")
    .eq("title", "Gratitude Practice")
    .limit(1);

  if (existingData && existingData.length > 0) {
    console.log("Gratitude practice data already exists, skipping seed");
    return;
  }

  // Insert the gratitude practice activity
  const { error } = await supabase
    .from("reflective_activities")
    .insert({
      title: "Gratitude Practice",
      description: "Cultivate an attitude of gratitude through 30 days of guided reflection prompts that help you recognize life's gifts.",
      category: "gratitude_practice",
      duration_minutes: 15
    });

  if (error) {
    console.error("Error seeding gratitude practice data:", error);
    return;
  }

  console.log("Successfully seeded gratitude practice data");
};
