
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
        },
        {
          category: "centering-prayer",
          day_number: 6,
          theme: "Beyond Words",
          scripture: "We do not know what we ought to pray for, but the Spirit himself intercedes for us through wordless groans. (Romans 8:26)",
          practice: "Begin with your sacred word, remembering that even this word is just a pointer. Today, rest in the awareness that true prayer happens beyond concepts and language. Simply be present for 15 minutes, returning to your sacred word when thoughts arise.",
          reflection_prompt: "How does it feel to pray without trying to say or think anything in particular? What challenges or insights emerged?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 7,
          theme: "Weekly Integration",
          scripture: "For where two or three gather in my name, there am I with them. (Matthew 18:20)",
          practice: "Today, practice for 20 minutes. Begin with your sacred word. After your sitting practice, review your experiences from the first week. Notice any patterns, challenges, or insights that have emerged.",
          reflection_prompt: "Looking back on your first week of centering prayer, what have you learned? What challenges have you faced? How might you deepen your practice in the coming week?",
          duration_minutes: 20
        },
        {
          category: "centering-prayer",
          day_number: 8,
          theme: "Open Mind",
          scripture: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. (Romans 12:2)",
          practice: "Begin with 3 deep breaths and your sacred word. Today, when thoughts arise, imagine them as boats passing on a river—you notice them, but don't get on board. Return to your sacred word and continue for 15 minutes.",
          reflection_prompt: "What kind of thoughts are most likely to 'hook' you and pull you away from presence? How might you hold these thoughts more lightly?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 9,
          theme: "Open Heart",
          scripture: "Create in me a pure heart, O God, and renew a steadfast spirit within me. (Psalm 51:10)",
          practice: "Begin with your sacred word. Today, bring awareness to your heart center. Without analyzing, simply notice any emotions that arise during your 15 minutes of silence. When you notice emotion, gently return to your sacred word.",
          reflection_prompt: "What emotions surfaced during today's practice? How does centering prayer help you relate differently to your emotional life?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 10,
          theme: "Open Will",
          scripture: "Not my will, but yours be done. (Luke 22:42)",
          practice: "Begin with your sacred word. Today, hold the intention of surrendering your own agenda and opening to God's will. Practice for 15 minutes, gently returning to your sacred word when thoughts arise.",
          reflection_prompt: "Where in your life do you sense resistance to God's will? What would deeper surrender look like in your daily life?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 11,
          theme: "Divine Darkness",
          scripture: "He made darkness his covering, his canopy around him. (Psalm 18:11)",
          practice: "Begin with your sacred word. Today, embrace the 'unknowing' that is part of contemplative prayer. When you want certainty or answers, simply return to your sacred word and rest in trusting presence for 15 minutes.",
          reflection_prompt: "How comfortable are you with not knowing? Where in your spiritual life do you seek certainty, and how might releasing that deepen your relationship with God?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 12,
          theme: "Divine Therapy",
          scripture: "Search me, God, and know my heart; test me and know my anxious thoughts. (Psalm 139:23)",
          practice: "Begin with your sacred word. Today, understand that as you sit in silence, unprocessed emotions and thoughts naturally surface from your unconscious to be healed. Simply notice this happening, and return to your sacred word for 15 minutes.",
          reflection_prompt: "What difficult emotions or memories surfaced during today's practice? How does the concept of 'divine therapy' help you understand what happens in centering prayer?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 13,
          theme: "Resting in Love",
          scripture: "As the Father has loved me, so have I loved you. Now remain in my love. (John 15:9)",
          practice: "Begin with your sacred word. Today, hold the intention of resting in divine love. When thoughts arise, imagine them dissolving in this love as you return to your sacred word. Practice for 15 minutes.",
          reflection_prompt: "How does it feel to be loved completely, just as you are? How might this awareness transform your daily interactions?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 14,
          theme: "Weekly Integration",
          scripture: "Be transformed by the renewing of your mind. (Romans 12:2)",
          practice: "Today, practice for 20 minutes. Begin with your sacred word. After your sitting practice, review your experiences from the second week. Notice how the practice is beginning to affect your daily life.",
          reflection_prompt: "How has your practice evolved over these two weeks? Are you noticing any effects of centering prayer in your daily life and relationships?",
          duration_minutes: 20
        },
        {
          category: "centering-prayer",
          day_number: 15,
          theme: "Divine Compassion",
          scripture: "The Lord is compassionate and gracious, slow to anger, abounding in love. (Psalm 103:8)",
          practice: "Begin with your sacred word. Today, hold an awareness of divine compassion. When you notice judgments toward yourself or others, gently return to your sacred word and rest in compassion for 15 minutes.",
          reflection_prompt: "Where do you need more compassion in your life? How does centering prayer help you connect with divine compassion?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 16,
          theme: "Divine Patience",
          scripture: "But if we hope for what we do not yet have, we wait for it patiently. (Romans 8:25)",
          practice: "Begin with your sacred word. Notice any impatience that arises during your 15-minute practice—wanting experiences, insights, or progress. Gently return to your sacred word and the simple act of waiting.",
          reflection_prompt: "Where do you experience impatience in your spiritual life? How is God inviting you into a more patient relationship with your spiritual journey?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 17,
          theme: "Divine Wisdom",
          scripture: "If any of you lacks wisdom, you should ask God, who gives generously to all. (James 1:5)",
          practice: "Begin with your sacred word. Today, release the need to figure things out with your intellect. Simply rest in the awareness that divine wisdom operates beyond your thinking mind. Practice for 15 minutes.",
          reflection_prompt: "How do you typically seek wisdom? What would it mean to trust divine wisdom that operates beyond your analytical thinking?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 18,
          theme: "Kenosis (Self-Emptying)",
          scripture: "He emptied himself, by taking the form of a servant. (Philippians 2:7)",
          practice: "Begin with your sacred word. Today, embrace the path of self-emptying, releasing your attachments to identity, status, and control. When these concerns arise, gently return to your sacred word for 15 minutes.",
          reflection_prompt: "What aspects of your identity or status do you find hardest to release? What freedoms might come with this emptying?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 19,
          theme: "Sacred Ordinary",
          scripture: "Whatever you do, whether in word or deed, do it all in the name of the Lord Jesus. (Colossians 3:17)",
          practice: "Begin with your sacred word. Today, understand that centering prayer is training you to be present to the sacred in ordinary moments. Simply be present for 15 minutes, returning to your sacred word when needed.",
          reflection_prompt: "How might centering prayer be preparing you to recognize God's presence in your everyday activities? Where do you glimpse the sacred in the ordinary?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 20,
          theme: "Divine Healing",
          scripture: "He heals the brokenhearted and binds up their wounds. (Psalm 147:3)",
          practice: "Begin with your sacred word. Today, hold an awareness that divine healing is happening as you rest in silence. When you notice areas of pain or woundedness, gently return to your sacred word for 15 minutes.",
          reflection_prompt: "What parts of yourself are in need of healing? How does the silent practice of centering prayer contribute to healing?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 21,
          theme: "Weekly Integration",
          scripture: "Now we see only a reflection as in a mirror; then we shall see face to face. (1 Corinthians 13:12)",
          practice: "Today, practice for a full 20 minutes. Begin with your sacred word. After your sitting practice, review the past three weeks of your centering prayer journey. Notice how the practice has evolved for you.",
          reflection_prompt: "What has been most challenging about maintaining a centering prayer practice? What has been most rewarding? How has your understanding of prayer changed?",
          duration_minutes: 20
        },
        {
          category: "centering-prayer",
          day_number: 22,
          theme: "Deepening Trust",
          scripture: "Trust in the Lord with all your heart and lean not on your own understanding. (Proverbs 3:5)",
          practice: "Begin with your sacred word. Today, practice deepening trust when uncertainties, doubts, or fears arise. Gently return to your sacred word as an act of trust for 15 minutes.",
          reflection_prompt: "Where in your life is God inviting you to deeper trust? How does centering prayer help cultivate trust in your relationship with God?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 23,
          theme: "Divine Freedom",
          scripture: "It is for freedom that Christ has set us free. (Galatians 5:1)",
          practice: "Begin with your sacred word. Today, notice any sense of constriction or bondage in body, mind, or spirit during your practice. Return to your sacred word as a movement toward freedom for 15 minutes.",
          reflection_prompt: "What patterns or attachments limit your freedom? How is God inviting you into greater spiritual freedom through centering prayer?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 24,
          theme: "Unity in Christ",
          scripture: "I in them and you in me—so that they may be brought to complete unity. (John 17:23)",
          practice: "Begin with your sacred word. Today, hold an awareness of your union with Christ as you sit in silence. When thoughts of separation arise, gently return to your sacred word for 15 minutes.",
          reflection_prompt: "How does the experience of union in centering prayer differ from your regular experience of self? What might this teach you about your true identity in Christ?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 25,
          theme: "Fruits of the Spirit",
          scripture: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. (Galatians 5:22-23)",
          practice: "Begin with your sacred word. Today, hold an awareness that the fruits of the Spirit naturally emerge from sustained contemplative practice. Simply be present for 15 minutes, returning to your sacred word when needed.",
          reflection_prompt: "Which fruits of the Spirit do you notice beginning to manifest more in your life? How might centering prayer be cultivating these qualities?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 26,
          theme: "Listening Heart",
          scripture: "Speak, Lord, for your servant is listening. (1 Samuel 3:9)",
          practice: "Begin with your sacred word. Today, cultivate a listening heart as you sit in silence. Not listening for words or guidance, but a deeper listening with your whole being. Practice for 15 minutes.",
          reflection_prompt: "What difference do you notice between 'listening for' something specific and simply being receptive? How might this deeper listening transform your everyday awareness?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 27,
          theme: "Contemplative Service",
          scripture: "Each of you should use whatever gift you have received to serve others. (1 Peter 4:10)",
          practice: "Begin with your sacred word. Today, understand that centering prayer strengthens your capacity to serve from a place of divine connection rather than ego. Practice for 15 minutes.",
          reflection_prompt: "How might your centering prayer practice be preparing you for more authentic service in the world? What connections do you see between contemplation and action?",
          duration_minutes: 15
        },
        {
          category: "centering-prayer",
          day_number: 28,
          theme: "Weekly Integration",
          scripture: "I have fought the good fight, I have finished the race, I have kept the faith. (2 Timothy 4:7)",
          practice: "Today, practice for a full 20 minutes. Begin with your sacred word. After your practice, reflect on your entire four-week journey with centering prayer. Notice how your relationship with silence has evolved.",
          reflection_prompt: "As you approach the end of this structured program, how do you plan to continue your centering prayer practice? What supports will you need to maintain this discipline?",
          duration_minutes: 20
        },
        {
          category: "centering-prayer",
          day_number: 29,
          theme: "Living the Mystery",
          scripture: "Now we see only a reflection as in a mirror; then we shall see face to face. (1 Corinthians 13:12)",
          practice: "Begin with your sacred word. Today, embrace the mystery of faith—not as a puzzle to solve, but as a reality to live. Practice for 20 minutes, gently returning to your sacred word when needed.",
          reflection_prompt: "How has centering prayer changed your relationship with mystery and not-knowing? Where do you experience the holy mystery in your daily life?",
          duration_minutes: 20
        },
        {
          category: "centering-prayer",
          day_number: 30,
          theme: "Completion and Beginning",
          scripture: "Being confident of this, that he who began a good work in you will carry it on to completion. (Philippians 1:6)",
          practice: "Begin with your sacred word. Today, understand that this 30-day program is both a completion and a beginning. Practice for 20 minutes, allowing yourself to rest deeply in divine presence.",
          reflection_prompt: "As you complete this 30-day journey, reflect on what has changed in your relationship with God, yourself, and your prayer life. How will you continue to nurture this contemplative dimension of your spiritual life?",
          duration_minutes: 20
        }
      ]
    );

  if (error) {
    console.error("Error seeding centering prayer data:", error);
    return;
  }

  console.log("Successfully seeded centering prayer program data");
};
