
export interface JournalingPromptType {
  id: string;
  day_number: number;
  title: string;
  prompt_text: string;
  supporting_text?: string;
  category?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserJournalingProgress {
  id: string;
  user_id: string;
  current_day: number;
  last_completed_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  entry_type: string;
  content: string;
  prompt_id?: string;
  prompt_info?: string;
  created_at?: string;
  updated_at?: string;
}

// Hardcoded prompts until we create the database tables
export const JOURNALING_PROMPTS: JournalingPromptType[] = [
  {
    id: "1",
    day_number: 1,
    title: "Gratitude",
    prompt_text: "List three things you're grateful for today and explain why.",
    supporting_text: "Gratitude helps shift our focus from what we lack to the abundance that is present.",
    category: "mindfulness"
  },
  {
    id: "2",
    day_number: 2,
    title: "Morning Reflection",
    prompt_text: "How do you want to feel at the end of today? What can you do to create that feeling?",
    category: "intention"
  },
  {
    id: "3",
    day_number: 3,
    title: "Challenges as Teachers",
    prompt_text: "Describe a recent challenge and what it taught you about yourself.",
    supporting_text: "Our difficulties often contain our greatest lessons.",
    category: "growth"
  },
  {
    id: "4",
    day_number: 4,
    title: "Values Exploration",
    prompt_text: "What are three core values that guide your life? Provide examples of how you live these values.",
    category: "purpose"
  },
  {
    id: "5",
    day_number: 5,
    title: "Joy Inventory",
    prompt_text: "Make a list of 10 simple things that bring you joy. When was the last time you did each one?",
    category: "joy"
  },
  {
    id: "6",
    day_number: 6,
    title: "Letter to Your Future Self",
    prompt_text: "Write a letter to yourself one year from now. What do you hope to have accomplished or experienced?",
    category: "vision"
  },
  {
    id: "7",
    day_number: 7,
    title: "Mindful Moment",
    prompt_text: "Describe your surroundings right now using all five senses. What do you notice that you normally wouldn't?",
    supporting_text: "This exercise grounds you in the present moment and develops awareness.",
    category: "mindfulness"
  },
  {
    id: "8",
    day_number: 8,
    title: "Limiting Beliefs",
    prompt_text: "Identify a limiting belief you hold about yourself. Where did it come from? How can you challenge it?",
    category: "growth"
  },
  {
    id: "9",
    day_number: 9,
    title: "Digital Detox Reflection",
    prompt_text: "How does technology affect your daily life? Identify ways to create healthier boundaries with digital devices.",
    category: "balance"
  },
  {
    id: "10",
    day_number: 10,
    title: "Relationship Reflection",
    prompt_text: "Choose an important relationship in your life. What do you value most about this person? How can you nurture this relationship?",
    category: "connection"
  },
  {
    id: "11",
    day_number: 11,
    title: "Body Appreciation",
    prompt_text: "Write about three things your body has done for you recently that you're thankful for.",
    supporting_text: "Our bodies serve us faithfully every day in countless ways we often take for granted.",
    category: "gratitude"
  },
  {
    id: "12",
    day_number: 12,
    title: "Stress Inventory",
    prompt_text: "What are your current sources of stress? Which ones can you eliminate, reduce, or better manage?",
    category: "self-care"
  },
  {
    id: "13",
    day_number: 13,
    title: "Childhood Joy",
    prompt_text: "Recall an activity you loved as a child. How might you incorporate elements of this joy into your adult life?",
    category: "play"
  },
  {
    id: "14",
    day_number: 14,
    title: "Forgiveness Practice",
    prompt_text: "Is there someone you need to forgive (including yourself)? Write about what happened and how forgiveness might transform the situation.",
    category: "healing"
  },
  {
    id: "15",
    day_number: 15,
    title: "Mid-Month Review",
    prompt_text: "Reflect on the past two weeks of journaling. What insights or patterns have you noticed? What has surprised you?",
    category: "reflection"
  },
  {
    id: "16",
    day_number: 16,
    title: "Fear Exploration",
    prompt_text: "What is something you're afraid of? How does this fear affect your choices? What would you do if you weren't afraid?",
    category: "courage"
  },
  {
    id: "17",
    day_number: 17,
    title: "Nature Connection",
    prompt_text: "Describe a place in nature that makes you feel peaceful. What elements of this place could you bring into your daily environment?",
    category: "environment"
  },
  {
    id: "18",
    day_number: 18,
    title: "Habit Reflection",
    prompt_text: "Examine one habit you'd like to change. What triggers this habit? What needs is it meeting? How could you meet those needs differently?",
    category: "growth"
  },
  {
    id: "19",
    day_number: 19,
    title: "Creative Expression",
    prompt_text: "How do you express your creativity? If you feel you've lost touch with your creative side, how might you reconnect with it?",
    category: "creativity"
  },
  {
    id: "20",
    day_number: 20,
    title: "Compassionate Observer",
    prompt_text: "Describe a current challenge from the perspective of a compassionate observer. What wisdom or advice would they offer?",
    category: "perspective"
  },
  {
    id: "21",
    day_number: 21,
    title: "Digital Sabbath",
    prompt_text: "Plan a day without digital devices. How will you spend this time? What do you anticipate might be challenging or rewarding?",
    category: "presence"
  },
  {
    id: "22",
    day_number: 22,
    title: "Celebration of Progress",
    prompt_text: "What progress have you made in an important area of your life recently? Take time to acknowledge and celebrate this growth.",
    category: "achievement"
  },
  {
    id: "23",
    day_number: 23,
    title: "Wisdom From Challenges",
    prompt_text: "Reflect on a significant challenge you've overcome. What wisdom did you gain that might help others facing similar situations?",
    category: "resilience"
  },
  {
    id: "24",
    day_number: 24,
    title: "Energy Audit",
    prompt_text: "Make two lists: things that drain your energy and things that restore it. How might you adjust your life to include more of what restores you?",
    category: "vitality"
  },
  {
    id: "25",
    day_number: 25,
    title: "Future Self Vision",
    prompt_text: "Imagine yourself 5 years from now living your ideal life. Describe a day in this life in vivid detail.",
    category: "vision"
  },
  {
    id: "26",
    day_number: 26,
    title: "Comparing Inner & Outer Worlds",
    prompt_text: "How aligned is your external life with your internal values? In what areas might you create greater alignment?",
    category: "authenticity"
  },
  {
    id: "27",
    day_number: 27,
    title: "Letting Go Practice",
    prompt_text: "What do you need to let go of to move forward? This could be a belief, relationship, goal, possession, or expectation.",
    category: "release"
  },
  {
    id: "28",
    day_number: 28,
    title: "Unexpected Joy",
    prompt_text: "Describe an unexpected moment of joy you experienced recently. What made it special?",
    category: "presence"
  },
  {
    id: "29",
    day_number: 29,
    title: "Meaningful Work",
    prompt_text: "What does meaningful work mean to you? In what ways is your current work meaningful, and how might you bring more meaning to it?",
    category: "purpose"
  },
  {
    id: "30",
    day_number: 30,
    title: "Journaling Journey",
    prompt_text: "Reflect on your 30-day journaling journey. What have you learned about yourself? How has the practice of regular reflection affected you?",
    supporting_text: "Consider continuing this practice in a way that feels supportive and sustainable for you.",
    category: "reflection"
  }
];
