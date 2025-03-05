
import { supabase } from "@/integrations/supabase/client";

export const seedSacredRituals = async () => {
  // First, check if data already exists to avoid duplicates
  const { data: existingData } = await supabase
    .from("reflective_activities")
    .select("id")
    .eq("category", "sacred_rituals")
    .limit(1);

  if (existingData && existingData.length > 0) {
    console.log("Sacred rituals data already exists, skipping seed");
    return;
  }

  // Insert the 30 days of sacred rituals program data
  const { error } = await supabase
    .from("reflective_activities")
    .insert([
      {
        category: "sacred_rituals",
        title: "Day 1: Morning Tea Ritual",
        description: "Begin your journey with a simple morning tea ceremony. Choose a special cup and your favorite tea. As you prepare it, focus entirely on each step: the sound of water heating, the aroma as it steeps, the warmth of the cup in your hands. Sit in a quiet space, sip slowly, and notice everything about the experience with all your senses.",
        duration_minutes: 15
      },
      {
        category: "sacred_rituals",
        title: "Day 2: Mindful Hand Washing",
        description: "Transform a daily necessity into a moment of presence. As you wash your hands today, turn it into a ritual of care. Feel the temperature of the water, the texture of soap, the sensation on your skin. Breathe deeply and imagine washing away hurry and distraction along with physical impurities.",
        duration_minutes: 5
      },
      {
        category: "sacred_rituals",
        title: "Day 3: Evening Candle Lighting",
        description: "Create a transition ritual for the end of your day. In the evening, light a candle with intention. Watch the flame come to life and take three deep breaths. Let the gentle light remind you to slow down. Sit quietly for a few minutes, allowing the day's events to settle as you watch the flame dance.",
        duration_minutes: 10
      },
      {
        category: "sacred_rituals",
        title: "Day 4: Sacred Space Creation",
        description: "Designate a small area in your home as a sacred space. It could be a corner, a shelf, or even a windowsill. Thoughtfully place a few meaningful objects there—perhaps a stone, a photo, a plant, or something that represents peace to you. This space will serve as an anchor for future rituals.",
        duration_minutes: 20
      },
      {
        category: "sacred_rituals",
        title: "Day 5: Mindful Walking",
        description: "Take a short, silent walk with no destination. Move slowly and deliberately, feeling each step as your foot touches and leaves the ground. Notice the sensation of air on your skin, the sounds around you, and the rhythm of your breathing. Walk as if each step is a prayer.",
        duration_minutes: 15
      },
      {
        category: "sacred_rituals",
        title: "Day 6: Gratitude Bowl",
        description: "Find a special bowl to serve as your gratitude vessel. Each morning or evening, write one thing you're grateful for on a small slip of paper and place it in the bowl. Today, begin the practice by adding your first gratitude note. Touch the bowl gently, acknowledging that you're creating a physical repository of blessings.",
        duration_minutes: 5
      },
      {
        category: "sacred_rituals",
        title: "Day 7: Sound Bath",
        description: "Create a simple sound ritual using a bell, singing bowl, or even a glass with water that you can rim with your finger. Close your eyes and make a single sound, listening intently until the vibration completely fades away. Notice how the sound creates space in your mind.",
        duration_minutes: 10
      },
      {
        category: "sacred_rituals",
        title: "Day 8: Threshold Blessing",
        description: "Choose a doorway you frequently use. Create a small gesture or word that you'll use each time you pass through it today. It might be touching the frame, a small bow, or silently saying 'peace.' This transforms an ordinary transition into a moment of awareness.",
        duration_minutes: 5
      },
      {
        category: "sacred_rituals",
        title: "Day 9: Sacred Reading",
        description: "Select a short poem, passage, or quote that inspires you. Read it aloud slowly three times. First for basic understanding, second for deeper meaning, and third as a prayer or meditation. Allow the words to resonate in the silence after you finish.",
        duration_minutes: 10
      },
      {
        category: "sacred_rituals",
        title: "Day 10: Water Offering",
        description: "Fill a special cup with fresh water and place it in your sacred space as an offering. This ancient practice acknowledges water as the source of life. As you place it, express gratitude for the gift of clean water and set an intention for the day ahead.",
        duration_minutes: 5
      },
      {
        category: "sacred_rituals",
        title: "Day 11: Mindful Dishwashing",
        description: "Transform a household chore into a meditation. Wash dishes by hand with complete attention, noticing the temperature of the water, the weight of each dish, the sensation of soap, and the satisfaction of creating cleanliness. Move slowly and make each movement deliberate.",
        duration_minutes: 15
      },
      {
        category: "sacred_rituals",
        title: "Day 12: Morning Sun Greeting",
        description: "Rise early enough to witness daybreak. Face the direction of the rising sun, even if you can't directly see it. Stretch your arms upward in a gesture of welcome and take three deep breaths. Feel the connection between the sun's daily rebirth and your own renewal.",
        duration_minutes: 10
      },
      {
        category: "sacred_rituals",
        title: "Day 13: Artistic Expression",
        description: "Set aside time for simple creativity without judgment. Draw, color, or doodle intuitively, letting your hand move without planning. Focus on the process rather than the result, allowing shapes and colors to emerge naturally as a form of moving meditation.",
        duration_minutes: 20
      },
      {
        category: "sacred_rituals",
        title: "Day 14: Bedtime Unwinding",
        description: "Create an intentional ritual to signal to your body and mind that it's time to rest. Perhaps light a specific scent, play gentle music, or slowly massage your hands with lotion. Perform these actions mindfully, allowing tension to dissolve with each movement.",
        duration_minutes: 15
      },
      {
        category: "sacred_rituals",
        title: "Day 15: Midday Pause",
        description: "Set an alarm for midday. When it sounds, stop whatever you're doing for just one minute. Close your eyes, take three deep breaths, and fully inhabit the present moment. Notice how this brief pause resets your attention and energy for the rest of the day.",
        duration_minutes: 5
      },
      {
        category: "sacred_rituals",
        title: "Day 16: Nature Communion",
        description: "Find a natural object—a leaf, stone, flower, or shell—and spend time examining it closely. Notice its unique details, texture, color variations, and form. Recognize it as a small miracle of creation and consider placing it in your sacred space afterward.",
        duration_minutes: 10
      },
      {
        category: "sacred_rituals",
        title: "Day 17: Eating With Awareness",
        description: "Choose one meal today to eat in complete silence and awareness. Before beginning, pause to acknowledge everyone and everything that brought this food to you. Eat slowly, noticing flavors, textures, and your body's responses. Express gratitude when finished.",
        duration_minutes: 20
      },
      {
        category: "sacred_rituals",
        title: "Day 18: Listening Circle",
        description: "Create a ritual of deep listening. Sit in a comfortable position and spend 10 minutes simply listening to all sounds near and far without labeling or judging them. Notice how sounds arise and fade, creating a constantly changing symphony of the present moment.",
        duration_minutes: 10
      },
      {
        category: "sacred_rituals",
        title: "Day 19: Evening Review",
        description: "Before sleep, take time to review your day as if watching a gentle film. Without judgment, notice moments of connection, challenge, and growth. Acknowledge three things you're grateful for and one thing you'd like to approach differently tomorrow.",
        duration_minutes: 10
      },
      {
        category: "sacred_rituals",
        title: "Day 20: Breath Awareness",
        description: "Set aside time to focus exclusively on your breath. Find a comfortable seated position and simply observe your natural breathing for 10 minutes. Notice the sensation of air entering and leaving your body, the rise and fall of your chest, and the rhythm unique to this moment.",
        duration_minutes: 10
      },
      {
        category: "sacred_rituals",
        title: "Day 21: Sacred Movement",
        description: "Create a sequence of three simple movements that feel good in your body. Perhaps a gentle stretch, a heart-opening gesture, and a grounding pose. Perform this sequence three times with complete attention to the sensations, treating each movement as a form of embodied prayer.",
        duration_minutes: 15
      },
      {
        category: "sacred_rituals",
        title: "Day 22: Digital Sunset",
        description: "Establish a ritual to end your engagement with screens each day. At least one hour before bed, consciously turn off or put away all devices. Perhaps mark this transition by lighting a candle, making a cup of tea, or speaking a simple phrase of completion.",
        duration_minutes: 5
      },
      {
        category: "sacred_rituals",
        title: "Day 23: Forgiveness Practice",
        description: "Create a simple ritual for releasing resentment. Write down something you're holding against yourself or another on a small piece of paper. Read it aloud, acknowledge the pain, then safely burn or dissolve the paper in water as a symbol of letting go.",
        duration_minutes: 15
      },
      {
        category: "sacred_rituals",
        title: "Day 24: Music Meditation",
        description: "Choose a piece of music that moves you deeply. Create a space free from distractions, close your eyes, and listen with your entire being. Notice how the music affects your body, emotions, and thoughts, becoming fully present to the experience.",
        duration_minutes: 15
      },
      {
        category: "sacred_rituals",
        title: "Day 25: Blessing Your Day",
        description: "Begin your morning by consciously blessing the day ahead. Place your hands over your heart and set three specific intentions—perhaps for how you'll approach challenges, how you'll care for yourself, and how you'll connect with others.",
        duration_minutes: 5
      },
      {
        category: "sacred_rituals",
        title: "Day 26: Full Moon Observation",
        description: "Regardless of the current moon phase, take time to connect with lunar energy. If possible, view the moon directly, or simply face its direction. Acknowledge how the moon has guided humans for millennia, regulating tides and marking time in a cosmic dance.",
        duration_minutes: 10
      },
      {
        category: "sacred_rituals",
        title: "Day 27: Handwritten Note",
        description: "In our digital age, handwriting has become a sacred act. Write a short note of appreciation to someone (or to yourself). Focus on the physical sensation of pen on paper, the formation of each letter, and the meaning behind your words. Send the note or keep it in your sacred space.",
        duration_minutes: 15
      },
      {
        category: "sacred_rituals",
        title: "Day 28: Worry Release",
        description: "Create a ritual for releasing anxiety. Write your current worries on strips of paper. Hold each one, acknowledge its presence without judgment, then place it in a container. Close the lid as a symbol of entrusting these concerns to something greater than yourself.",
        duration_minutes: 15
      },
      {
        category: "sacred_rituals",
        title: "Day 29: Sacred Bath",
        description: "Transform bathing into a ritual of purification and renewal. Add natural elements like salt, herbs, or a few drops of essential oil to your bath. As you immerse yourself, imagine both body and mind being cleansed, allowing worries to dissolve in the water.",
        duration_minutes: 30
      },
      {
        category: "sacred_rituals",
        title: "Day 30: Integration Circle",
        description: "Create a ritual to honor your 30-day journey. Return to your sacred space and spend time reflecting on what you've learned. Perhaps light a candle, review your journal entries, or select one practice to continue regularly. Acknowledge your commitment to creating sacred moments in everyday life.",
        duration_minutes: 20
      }
    ]);
  
  if (error) {
    console.error("Error seeding sacred rituals data:", error);
    return;
  }

  console.log("Successfully seeded sacred rituals program data");
};
