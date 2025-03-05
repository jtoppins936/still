
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
          practice: "Find a quiet place and sit comfortably with your back straight. Close your eyes and take several deep breaths. Use today's sacred phrase 'Be still' as a symbol of your intention to consent to God's presence. Introduce this phrase gently at the beginning, and whenever thoughts arise, gently return to the sacred phrase. Sit in silence for 10 minutes.",
          reflection_prompt: "What was your experience of silence like today? How did the sacred phrase 'Be still' help you return to presence?",
          duration_minutes: 10,
          focus_phrase: "Be still"
        },
        {
          category: "centering-prayer",
          day_number: 2,
          theme: "Deepening Stillness",
          scripture: "The Lord is in his holy temple; let all the earth be silent before him. (Habakkuk 2:20)",
          practice: "Begin as yesterday, finding a comfortable posture. Today, use the focus phrase 'Holy Presence'. Before entering silence, spend a minute becoming aware of your body—feet on the floor, weight in the chair, the rhythm of your breath. Then enter into 12 minutes of silent prayer, returning to your sacred phrase when distracted.",
          reflection_prompt: "How did the phrase 'Holy Presence' affect your prayer experience? Were you able to rest more deeply in stillness today?",
          duration_minutes: 12,
          focus_phrase: "Holy Presence"
        },
        {
          category: "centering-prayer",
          day_number: 3,
          theme: "The Gift of Presence",
          scripture: "The kingdom of God is within you. (Luke 17:21)",
          practice: "Begin with your sacred phrase 'Kingdom within'. When thoughts come, gently let them go without judgment or analysis. Return to your sacred phrase as a gesture of consent to God's presence. Remember that the goal is not to have no thoughts, but to continuously return to openness. Practice for 15 minutes today.",
          reflection_prompt: "What kinds of thoughts seemed most persistent during today's practice? How did the phrase 'Kingdom within' help you return to center?",
          duration_minutes: 15,
          focus_phrase: "Kingdom within"
        },
        {
          category: "centering-prayer",
          day_number: 4,
          theme: "Letting Go",
          scripture: "Cast all your anxiety on him because he cares for you. (1 Peter 5:7)",
          practice: "Begin with 3 deep breaths, settling into your body. Introduce your sacred phrase 'I release'. Today, practice noticing any tension you're holding in your body. As you notice tension, gently release it while returning to your sacred phrase. Continue for 15 minutes.",
          reflection_prompt: "Where do you notice yourself holding onto tension, both physically and spiritually? How did the phrase 'I release' aid in letting go?",
          duration_minutes: 15,
          focus_phrase: "I release"
        },
        {
          category: "centering-prayer",
          day_number: 5,
          theme: "Divine Indwelling",
          scripture: "Do you not know that your body is a temple of the Holy Spirit within you? (1 Corinthians 6:19)",
          practice: "Begin with your sacred phrase 'Temple of Spirit'. Today, hold a gentle awareness that God is already present within you. There is no distance to travel, no gap to cross. Simply rest in this presence for 15 minutes, returning to your sacred phrase when needed.",
          reflection_prompt: "How does it feel to consider that God's presence is already within you? Did the phrase 'Temple of Spirit' help deepen this awareness?",
          duration_minutes: 15,
          focus_phrase: "Temple of Spirit"
        },
        {
          category: "centering-prayer",
          day_number: 6,
          theme: "Consent to God's Presence",
          scripture: "Here I am, Lord. (1 Samuel 3:4)",
          practice: "Begin with your sacred phrase 'Here I am'. Today, focus on your practice as an act of consent to God's presence and action within you. Each time you return to your sacred phrase, it is a 'yes' to God. Sit for 15 minutes in this posture of openness.",
          reflection_prompt: "What does it mean to you to give consent to God's presence and action in your life? How did 'Here I am' express this consent?",
          duration_minutes: 15,
          focus_phrase: "Here I am"
        },
        {
          category: "centering-prayer",
          day_number: 7,
          theme: "Rest in Silence",
          scripture: "My soul finds rest in God alone. (Psalm 62:1)",
          practice: "Begin with your sacred phrase 'Rest in God'. Today, allow yourself to simply rest in the silence. There is nothing to accomplish, nothing to achieve. Just be. When thoughts arise, gently return to your sacred phrase. Sit for 15 minutes.",
          reflection_prompt: "What is your relationship with silence? How did the phrase 'Rest in God' help you find comfort in simply being?",
          duration_minutes: 15,
          focus_phrase: "Rest in God"
        },
        {
          category: "centering-prayer",
          day_number: 8,
          theme: "Beyond Words",
          scripture: "We do not know what we ought to pray for, but the Spirit himself intercedes for us through wordless groans. (Romans 8:26)",
          practice: "Begin with your sacred phrase 'Spirit intercedes'. Today, notice how centering prayer moves beyond words and concepts. Allow the prayer to simply be an experience of presence. When thoughts arise, gently return to your sacred phrase. Practice for 15 minutes.",
          reflection_prompt: "How does prayer without words differ from your other experiences of prayer? How did 'Spirit intercedes' help you enter wordless communion?",
          duration_minutes: 15,
          focus_phrase: "Spirit intercedes"
        },
        {
          category: "centering-prayer",
          day_number: 9,
          theme: "Resting in Love",
          scripture: "As the Father has loved me, so have I loved you. Now remain in my love. (John 15:9)",
          practice: "Begin with your sacred phrase 'Remain in love'. Today, allow yourself to rest in the awareness of being loved. You don't need to generate feelings or try to love God back. Simply be receptive to the love that is already present. Sit for 15 minutes.",
          reflection_prompt: "What is it like to simply receive love without trying to earn it or return it? How did 'Remain in love' help you rest in divine affection?",
          duration_minutes: 15,
          focus_phrase: "Remain in love"
        },
        {
          category: "centering-prayer",
          day_number: 10,
          theme: "Welcoming Distractions",
          scripture: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. (Philippians 4:6)",
          practice: "Begin with your sacred phrase 'Be not anxious'. Today, practice welcoming distractions rather than fighting them. Each distraction is an opportunity to return to your sacred phrase with gentleness. Don't judge yourself for being distracted. Sit for 20 minutes.",
          reflection_prompt: "What kinds of distractions arose during your prayer today? How did it feel to welcome them with 'Be not anxious' rather than resist them?",
          duration_minutes: 20,
          focus_phrase: "Be not anxious"
        },
        {
          category: "centering-prayer",
          day_number: 11,
          theme: "The Breath of God",
          scripture: "The Lord God formed the man from the dust of the ground and breathed into his nostrils the breath of life. (Genesis 2:7)",
          practice: "Begin with your sacred phrase 'Breath of life'. Today, bring gentle awareness to your breath as a symbol of God's life-giving presence. Your breath happens without your control, much like God's presence. Don't manipulate your breath, just notice it. Sit for 20 minutes.",
          reflection_prompt: "How did awareness of your breath influence your prayer experience today? How did 'Breath of life' connect you to divine sustenance?",
          duration_minutes: 20,
          focus_phrase: "Breath of life"
        },
        {
          category: "centering-prayer",
          day_number: 12,
          theme: "Spiritual Senses",
          scripture: "Taste and see that the Lord is good. (Psalm 34:8)",
          practice: "Begin with your sacred phrase 'Taste and see'. Today, be open to how God might be experienced through your spiritual senses. Perhaps there is a feeling, an image, a sense of presence. Don't seek experiences, but be open to what arises. Sit for 20 minutes.",
          reflection_prompt: "Did you notice any sensory dimensions to your prayer experience today? How did 'Taste and see' invite you into sensory awareness?",
          duration_minutes: 20,
          focus_phrase: "Taste and see"
        },
        {
          category: "centering-prayer",
          day_number: 13,
          theme: "Expanding Awareness",
          scripture: "In him we live and move and have our being. (Acts 17:28)",
          practice: "Begin with your sacred phrase 'In Him I live'. Today, gradually expand your awareness to include your body, the room, and beyond—all while maintaining your center in the presence of God. When thoughts arise, gently return to your sacred phrase. Sit for a total of 20 minutes.",
          reflection_prompt: "What was it like to expand your awareness while maintaining your center? How did 'In Him I live' help you hold this expanded consciousness?",
          duration_minutes: 20,
          focus_phrase: "In Him I live"
        },
        {
          category: "centering-prayer",
          day_number: 14,
          theme: "Midpoint Reflection",
          scripture: "Search me, God, and know my heart; test me and know my anxious thoughts. (Psalm 139:23)",
          practice: "Begin with your sacred phrase 'Search my heart'. Today, as you reach the midpoint of this program, sit in silence for 20 minutes. Allow this to be a time of simple presence with God, returning to your phrase whenever you become distracted.",
          reflection_prompt: "Looking back on your first two weeks of centering prayer, what changes have you noticed in yourself? How has 'Search my heart' invited deeper self-awareness?",
          duration_minutes: 20,
          focus_phrase: "Search my heart"
        },
        {
          category: "centering-prayer",
          day_number: 15,
          theme: "Darkness and Light",
          scripture: "Even the darkness will not be dark to you; the night will shine like the day, for darkness is as light to you. (Psalm 139:12)",
          practice: "Begin with your sacred phrase 'Darkness and light'. Today, notice if there are places of darkness or light in your prayer—feelings of absence or presence. Welcome both as part of the journey. When thoughts arise, return to your sacred phrase. Sit for 20 minutes.",
          reflection_prompt: "What was your experience of darkness or light in today's prayer? How did 'Darkness and light' help you welcome both experiences?",
          duration_minutes: 20,
          focus_phrase: "Darkness and light"
        },
        {
          category: "centering-prayer",
          day_number: 16,
          theme: "The Cloud of Unknowing",
          scripture: "Now we see only a reflection as in a mirror; then we shall see face to face. (1 Corinthians 13:12)",
          practice: "Begin with your sacred phrase 'Beyond knowing'. Today, reflect briefly on how centering prayer invites us into the 'cloud of unknowing'—beyond concepts and images of God. Consent to God's presence in this unknowing. Sit for 20 minutes.",
          reflection_prompt: "What is your relationship with 'not knowing' God intellectually but experiencing God directly? How did 'Beyond knowing' help you embrace mystery?",
          duration_minutes: 20,
          focus_phrase: "Beyond knowing"
        },
        {
          category: "centering-prayer",
          day_number: 17,
          theme: "The Paschal Mystery",
          scripture: "Very truly I tell you, unless a kernel of wheat falls to the ground and dies, it remains only a single seed. But if it dies, it produces many seeds. (John 12:24)",
          practice: "Begin with your sacred phrase 'Die to live'. Today, consider how centering prayer participates in the paschal mystery—letting go (death) leads to new life. Each return to your sacred phrase is a small 'dying to self.' Sit for 20 minutes.",
          reflection_prompt: "What are you being invited to let go of in your spiritual journey? How might this letting go, reflected in 'Die to live', lead to new life?",
          duration_minutes: 20,
          focus_phrase: "Die to live"
        },
        {
          category: "centering-prayer",
          day_number: 18,
          theme: "Resting in Community",
          scripture: "For where two or three gather in my name, there am I with them. (Matthew 18:20)",
          practice: "Begin with your sacred phrase 'Together in Christ'. Today, even though you may be practicing alone, hold an awareness of being connected to others who practice centering prayer around the world. We rest in God together. Sit for 20 minutes.",
          reflection_prompt: "How does the knowledge that you are not alone in this practice affect your experience? How did 'Together in Christ' change your sense of communion?",
          duration_minutes: 20,
          focus_phrase: "Together in Christ"
        },
        {
          category: "centering-prayer",
          day_number: 19,
          theme: "Subtle Attachment",
          scripture: "Set your minds on things above, not on earthly things. (Colossians 3:2)",
          practice: "Begin with your sacred phrase 'Things above'. Today, notice any subtle attachments that arise during prayer—perhaps attachment to having a 'good' prayer time or special experiences. When these arise, gently return to your sacred phrase. Sit for 20 minutes.",
          reflection_prompt: "What attachments did you notice in your prayer today? How might 'Things above' be teaching you about non-attachment and freedom?",
          duration_minutes: 20,
          focus_phrase: "Things above"
        },
        {
          category: "centering-prayer",
          day_number: 20,
          theme: "Transformed Consciousness",
          scripture: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. (Romans 12:2)",
          practice: "Begin with your sacred phrase 'Renew my mind'. Today, reflect briefly on how regular centering prayer gradually transforms your consciousness—not through effort but through consistent consent to God's presence. Sit for 20 minutes.",
          reflection_prompt: "What subtle shifts in consciousness or awareness have you noticed since beginning this practice? How has 'Renew my mind' contributed to this transformation?",
          duration_minutes: 20,
          focus_phrase: "Renew my mind"
        },
        {
          category: "centering-prayer",
          day_number: 21,
          theme: "Fruits of the Spirit",
          scripture: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. (Galatians 5:22-23)",
          practice: "Begin with your sacred phrase 'Fruits of Spirit'. Today, as you enter the third week of practice, reflect briefly on how centering prayer is not about achieving experiences during prayer but bearing fruit in daily life. Sit for 20 minutes.",
          reflection_prompt: "Have you noticed any of the fruits of the Spirit emerging more prominently in your life since beginning this practice? How has 'Fruits of Spirit' reminded you of the purpose of contemplation?",
          duration_minutes: 20,
          focus_phrase: "Fruits of Spirit"
        },
        {
          category: "centering-prayer",
          day_number: 22,
          theme: "Purification",
          scripture: "Create in me a pure heart, O God, and renew a steadfast spirit within me. (Psalm 51:10)",
          practice: "Begin with your sacred phrase 'Pure heart'. Today, understand that one effect of centering prayer is purification—bringing unconscious material to awareness for healing. If difficult emotions arise, simply return to your sacred phrase. Sit for 20 minutes.",
          reflection_prompt: "Have you experienced any emotional purification since beginning this practice? How has 'Pure heart' supported your emotional healing?",
          duration_minutes: 20,
          focus_phrase: "Pure heart"
        },
        {
          category: "centering-prayer",
          day_number: 23,
          theme: "Union with God",
          scripture: "Whoever is united with the Lord is one with him in spirit. (1 Corinthians 6:17)",
          practice: "Begin with your sacred phrase 'One in spirit'. Today, reflect briefly on how centering prayer fosters union with God—not as an achievement but as a revelation of what already is. Sit for 25 minutes in this awareness.",
          reflection_prompt: "What does union with God mean to you? How does 'One in spirit' express this mysterious reality in your prayer and life?",
          duration_minutes: 25,
          focus_phrase: "One in spirit"
        },
        {
          category: "centering-prayer",
          day_number: 24,
          theme: "Service Flowing from Silence",
          scripture: "Whoever wants to become great among you must be your servant. (Matthew 20:26)",
          practice: "Begin with your sacred phrase 'To serve all'. Today, reflect briefly on how centering prayer leads naturally to service—being filled with God's love naturally overflows into loving action. Sit for 25 minutes.",
          reflection_prompt: "How has your centering prayer practice affected how you relate to and serve others? How does 'To serve all' connect contemplation and action?",
          duration_minutes: 25,
          focus_phrase: "To serve all"
        },
        {
          category: "centering-prayer",
          day_number: 25,
          theme: "Continuous Prayer",
          scripture: "Pray continually. (1 Thessalonians 5:17)",
          practice: "Begin with your sacred phrase 'Pray always'. Today, as you sit for 25 minutes, consider how centering prayer can extend beyond formal sitting times into a continuous awareness of God's presence throughout your day.",
          reflection_prompt: "Have you noticed God's presence at unexpected moments in your day? How might your formal practice with 'Pray always' extend into continuous prayer?",
          duration_minutes: 25,
          focus_phrase: "Pray always"
        },
        {
          category: "centering-prayer",
          day_number: 26,
          theme: "The Divine Therapy",
          scripture: "He heals the brokenhearted and binds up their wounds. (Psalm 147:3)",
          practice: "Begin with your sacred phrase 'Divine healing'. Today, understand centering prayer as a 'divine therapy'—allowing God's healing presence to touch wounded places within. Sit for 25 minutes in this healing presence.",
          reflection_prompt: "What healing have you experienced through this practice? How has 'Divine healing' invited God's touch to places still needing wholeness?",
          duration_minutes: 25,
          focus_phrase: "Divine healing"
        },
        {
          category: "centering-prayer",
          day_number: 27,
          theme: "Surrendered Will",
          scripture: "Not my will, but yours be done. (Luke 22:42)",
          practice: "Begin with your sacred phrase 'Your will be done'. Today, reflect briefly on how centering prayer is an exercise in surrender—letting go of your agenda and opening to God's. Sit for 25 minutes in this posture of surrender.",
          reflection_prompt: "What is your experience of surrender in prayer? How does 'Your will be done' extend into your daily decisions and actions?",
          duration_minutes: 25,
          focus_phrase: "Your will be done"
        },
        {
          category: "centering-prayer",
          day_number: 28,
          theme: "Love as the Measure",
          scripture: "And over all these virtues put on love, which binds them all together in perfect unity. (Colossians 3:14)",
          practice: "Begin with your sacred phrase 'Love binds all'. Today, reflect briefly on how love is the ultimate measure of spiritual growth—not experiences, insights, or abilities. Sit for a total of 25 minutes in this love.",
          reflection_prompt: "How has your capacity to give and receive love been affected by your centering prayer practice? How has 'Love binds all' revealed this as the true measure of growth?",
          duration_minutes: 25,
          focus_phrase: "Love binds all"
        },
        {
          category: "centering-prayer",
          day_number: 29,
          theme: "A Lifelong Journey",
          scripture: "Being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus. (Philippians 1:6)",
          practice: "Begin with your sacred phrase 'Good work continues'. Today, as you near the end of this 30-day program, reflect briefly on centering prayer as a lifelong journey rather than a destination. Sit for 25 minutes.",
          reflection_prompt: "How do you envision centering prayer as part of your spiritual journey going forward? How does 'Good work continues' speak to your ongoing practice?",
          duration_minutes: 25,
          focus_phrase: "Good work continues"
        },
        {
          category: "centering-prayer",
          day_number: 30,
          theme: "Integration and Continuation",
          scripture: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit. (Romans 15:13)",
          practice: "Begin with your sacred phrase 'Overflow with hope'. Today, as you complete this 30-day program, sit for 30 minutes in centering prayer, allowing everything you've learned to integrate naturally.",
          reflection_prompt: "As you complete this program, what gifts have you received? How might 'Overflow with hope' characterize your contemplative journey going forward?",
          duration_minutes: 30,
          focus_phrase: "Overflow with hope"
        }
      ]
    );
  
  if (error) {
    console.error("Error seeding centering prayer data:", error);
    return;
  }

  console.log("Successfully seeded centering prayer program data");
};
