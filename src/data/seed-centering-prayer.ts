
import { supabase } from "@/integrations/supabase/client";

export const seedCenteringPrayer = async () => {
  // First, check if data already exists to avoid duplicates
  const { data: existingData } = await supabase
    .from("mindfulness_program")
    .select("id")
    .eq("category", "centering-prayer")
    .limit(1);

  if (existingData && existingData.length > 0) {
    console.log("Centering prayer data already exists, skipping seed");
    return;
  }

  // Insert the 30 days of centering prayer program data
  const { error } = await supabase
    .from("mindfulness_program")
    .insert(
      [
        {
          category: "centering-prayer",
          day_number: 1,
          theme: "Introduction to Silence",
          scripture: "Be still, and know that I am God. (Psalm 46:10)",
          practice: "Find a quiet place and sit comfortably with your back straight. Close your eyes and take several deep breaths. Choose a sacred word (like 'Peace', 'Love', or 'God') as a symbol of your intention to consent to God's presence. Introduce this word gently at the beginning, and whenever thoughts arise, gently return to the sacred word. Sit in silence for 10 minutes.",
          reflection_prompt: "What was your experience of silence like today? What emotions or thoughts arose, and how did you respond to them?",
          duration_minutes: 10
        },
        {
          category: "centering-prayer",
          day_number: 2,
          theme: "Deepening Stillness",
          scripture: "The Lord is in his holy temple; let all the earth be silent before him. (Habakkuk 2:20)",
          practice: "Begin as yesterday, finding a comfortable posture. Choose your sacred word. Today, before entering silence, spend a minute becoming aware of your body—feet on the floor, weight in the chair, the rhythm of your breath. Then enter into 12 minutes of silent prayer with your sacred word.",
          reflection_prompt: "How did the brief body awareness practice affect your prayer experience? Were you able to rest more deeply in stillness today?",
          duration_minutes: 12
        },
        {
          category: "centering-prayer",
          day_number: 3,
          theme: "The Gift of Presence",
          scripture: "The kingdom of God is within you. (Luke 17:21)",
          practice: "Begin with your sacred word. When thoughts come, gently let them go without judgment or analysis. Return to your sacred word as a gesture of consent to God's presence. Remember that the goal is not to have no thoughts, but to continuously return to openness. Practice for 15 minutes today.",
          reflection_prompt: "What kinds of thoughts seemed most persistent during today's practice? Can you notice any patterns in your thinking?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 4,
          theme: "Letting Go",
          scripture: "Cast all your anxiety on him because he cares for you. (1 Peter 5:7)",
          practice: "Begin with 3 deep breaths, settling into your body. Introduce your sacred word. Today, practice noticing any tension you're holding in your body. As you notice tension, gently release it while returning to your sacred word. Continue for 15 minutes.",
          reflection_prompt: "Where do you notice yourself holding onto tension, both physically and spiritually? What would it mean to truly let go?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 5,
          theme: "Divine Indwelling",
          scripture: "Do you not know that your body is a temple of the Holy Spirit within you? (1 Corinthians 6:19)",
          practice: "Begin with your sacred word. Today, hold a gentle awareness that God is already present within you. There is no distance to travel, no gap to cross. Simply rest in this presence for 15 minutes, returning to your sacred word when needed.",
          reflection_prompt: "How does it feel to consider that God's presence is already within you? Does this change your approach to prayer?",
          duration_minutes: 15
        }
      ]
    );

  if (error) {
    console.error("Error seeding centering prayer data:", error);
    return;
  }

  console.log("Successfully seeded centering prayer program data");
};
