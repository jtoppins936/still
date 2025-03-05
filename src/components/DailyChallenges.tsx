
import { useQuery } from "@tanstack/react-query";
import { ChallengeCard } from "./ChallengeCard";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

// Define our 30 daily slowness activities
const SLOWNESS_ACTIVITIES = [
  {
    id: "slow-01",
    title: "Mindful Tea Ceremony",
    description: "Prepare and drink a cup of tea with complete attention. Notice the aroma, warmth, and taste without rushing or multitasking.",
    duration_minutes: 15,
    category: "mindfulness"
  },
  {
    id: "slow-02",
    title: "Analog Morning",
    description: "Spend the first hour of your day without digital devices. Instead, read from a physical book, journal, or simply enjoy the quiet.",
    duration_minutes: 60,
    category: "digital_detox"
  },
  {
    id: "slow-03",
    title: "Contemplative Walk",
    description: "Take a slow, deliberate walk focusing on each step. Notice the sensation of your feet meeting the ground and the rhythm of your breath.",
    duration_minutes: 20,
    category: "mindfulness"
  },
  {
    id: "slow-04",
    title: "Deep Listening",
    description: "Choose a piece of music and listen with complete attention. Notice the instruments, rhythm, and how the music makes you feel.",
    duration_minutes: 15,
    category: "mindfulness"
  },
  {
    id: "slow-05",
    title: "Mindful Meal",
    description: "Eat one meal today with no distractions. Notice the textures, flavors, and sensations of each bite without rushing.",
    duration_minutes: 30,
    category: "mindfulness"
  },
  {
    id: "slow-06",
    title: "Hand-Write a Letter",
    description: "Write a physical letter to someone you care about. Feel the pen on paper and the deliberate formation of your words.",
    duration_minutes: 30,
    category: "connection"
  },
  {
    id: "slow-07",
    title: "Cloud Watching",
    description: "Spend time looking at the sky and watching clouds move and transform. Let your mind wander with no agenda.",
    duration_minutes: 15,
    category: "rest"
  },
  {
    id: "slow-08",
    title: "Single-Tasking",
    description: "Choose one task today and do it with complete focus. Notice when your mind wants to multitask and gently return to single-focus.",
    duration_minutes: 45,
    category: "mindfulness"
  },
  {
    id: "slow-09",
    title: "Technology Sunset",
    description: "Turn off all screens at least one hour before bedtime. Notice how this affects your evening and sleep quality.",
    duration_minutes: 60,
    category: "digital_detox"
  },
  {
    id: "slow-10",
    title: "Breath Awareness",
    description: "Set aside time to simply notice your breath without changing it. Feel the natural rhythm of your inhales and exhales.",
    duration_minutes: 10,
    category: "mindfulness"
  },
  {
    id: "slow-11",
    title: "Nature Connection",
    description: "Spend time with a plant, tree, or natural element. Observe it closely as if seeing it for the first time.",
    duration_minutes: 20,
    category: "mindfulness"
  },
  {
    id: "slow-12",
    title: "Slow Reading",
    description: "Read a small passage from a book with complete attention, allowing yourself to pause and reflect between paragraphs.",
    duration_minutes: 20,
    category: "mindfulness"
  },
  {
    id: "slow-13",
    title: "Creative Pause",
    description: "Take three deliberate 5-minute breaks today. During each pause, do nothing but notice your surroundings and thoughts.",
    duration_minutes: 15,
    category: "rest"
  },
  {
    id: "slow-14",
    title: "Mindful Cleaning",
    description: "Clean one small area of your home with complete attention to the process rather than rushing to finish.",
    duration_minutes: 20,
    category: "mindfulness"
  },
  {
    id: "slow-15",
    title: "Silent Meal",
    description: "Eat one meal in complete silence, focusing only on the experience of eating and the flavors present.",
    duration_minutes: 30,
    category: "mindfulness"
  },
  {
    id: "slow-16",
    title: "Worry Box",
    description: "Write down your worries on paper and place them in a box. Set them aside for later, allowing your mind to rest.",
    duration_minutes: 15,
    category: "mental_health"
  },
  {
    id: "slow-17",
    title: "Body Scan",
    description: "Lie down and slowly bring awareness to each part of your body from toes to head, noticing sensations without judgment.",
    duration_minutes: 15,
    category: "mindfulness"
  },
  {
    id: "slow-18",
    title: "Phone-Free Meal",
    description: "Have at least one meal today without your phone present. Notice how this changes your experience of eating.",
    duration_minutes: 30,
    category: "digital_detox"
  },
  {
    id: "slow-19",
    title: "Gratitude Ritual",
    description: "Take time to write down three things you're grateful for, allowing yourself to fully feel appreciation for each one.",
    duration_minutes: 10,
    category: "mental_health"
  },
  {
    id: "slow-20",
    title: "Sensory Garden",
    description: "Spend time in a garden or with houseplants using all five senses to experience the plants fully.",
    duration_minutes: 20,
    category: "mindfulness"
  },
  {
    id: "slow-21",
    title: "Social Media Fast",
    description: "Take a complete break from social media for the day. Notice urges to check and how you feel throughout the day.",
    duration_minutes: 180,
    category: "digital_detox"
  },
  {
    id: "slow-22",
    title: "Sunset/Sunrise Observation",
    description: "Watch a full sunset or sunrise from beginning to end without distraction. Notice the changing colors and light.",
    duration_minutes: 20,
    category: "mindfulness"
  },
  {
    id: "slow-23",
    title: "Slow Crafting",
    description: "Engage in a simple craft project (knitting, coloring, etc.) with no rush to complete it. Focus on the process, not the outcome.",
    duration_minutes: 30,
    category: "creativity"
  },
  {
    id: "slow-24",
    title: "Mindful Listening",
    description: "In your next conversation, practice truly listening without planning your response while the other person speaks.",
    duration_minutes: 20,
    category: "connection"
  },
  {
    id: "slow-25",
    title: "Candlelight Evening",
    description: "Spend an evening by candlelight instead of electric lighting. Notice how this changes the pace and feel of your evening.",
    duration_minutes: 60,
    category: "rest"
  },
  {
    id: "slow-26",
    title: "Savoring Practice",
    description: "Choose something you usually rush through and deliberately slow down to savor the experience fully.",
    duration_minutes: 15,
    category: "mindfulness"
  },
  {
    id: "slow-27",
    title: "Idle Time",
    description: "Schedule 20 minutes of purposeful 'doing nothing' today. Just be, without filling the time with productivity.",
    duration_minutes: 20,
    category: "rest"
  },
  {
    id: "slow-28",
    title: "Digital Simplification",
    description: "Remove one app from your phone that tends to consume your attention unnecessarily.",
    duration_minutes: 15,
    category: "digital_detox"
  },
  {
    id: "slow-29",
    title: "Window Meditation",
    description: "Sit by a window for 15 minutes and simply observe what you see outside, without narration or judgment.",
    duration_minutes: 15,
    category: "mindfulness"
  },
  {
    id: "slow-30",
    title: "Deep Reading",
    description: "Read just one page of a book very slowly, allowing yourself to fully absorb the meaning and nuance of the text.",
    duration_minutes: 15,
    category: "mindfulness"
  },
];

export const DailyChallenges = () => {
  const { data: challenges, isLoading, refetch } = useQuery({
    queryKey: ["daily-challenges"],
    queryFn: async () => {
      // Calculate which activity to show based on the current date
      const today = new Date();
      // Use the day of the year to determine which activity to show (0-364)
      const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      
      // Get the activity for today (cycle through the 30 activities)
      const todayIndex = dayOfYear % SLOWNESS_ACTIVITIES.length;
      const todayActivity = SLOWNESS_ACTIVITIES[todayIndex];
      
      // Still query the database for any user-specific data or to maintain existing functionality
      try {
        const { data, error } = await supabase
          .from("daily_challenges")
          .select("*")
          .limit(1)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // If we found a challenge in the database, use it; otherwise use our predefined activity
        if (data && data.length > 0) {
          return data;
        } else {
          // Return the activity in a format compatible with the existing code
          return [todayActivity];
        }
      } catch (error) {
        console.error("Error fetching challenges:", error);
        // Fallback to our predefined activity on error
        return [todayActivity];
      }
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
