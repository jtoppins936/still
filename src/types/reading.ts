
export interface ReadingPrompt {
  day: number;
  title: string;
  prompt: string;
  supportingText?: string;
}

export const READING_PROMPTS: ReadingPrompt[] = [
  {
    day: 1,
    title: "First Impressions",
    prompt: "What were your initial thoughts or feelings when you began reading? Did anything immediately stand out to you?",
    supportingText: "First impressions often reveal our unconscious biases and expectations."
  },
  {
    day: 2,
    title: "Character Connections",
    prompt: "Which character (if applicable) do you most relate to and why? What aspects of their journey or personality resonate with you?",
    supportingText: "Our connection to characters often reveals something about our own self-understanding."
  },
  {
    day: 3,
    title: "Passage Reflection",
    prompt: "Select a passage that stood out to you. Write it down and reflect on why it captured your attention.",
    supportingText: "The passages that stand out often speak to something meaningful in our own lives."
  },
  {
    day: 4,
    title: "Challenging Ideas",
    prompt: "What idea or concept in your reading challenged your thinking or made you uncomfortable? Why do you think you had this reaction?",
    supportingText: "Our discomfort often points to areas where growth is possible."
  },
  {
    day: 5,
    title: "Author's Intention",
    prompt: "What do you think the author was trying to accomplish with this text? How effective were they in achieving this goal?",
    supportingText: "Consider both the explicit and implicit messages in the text."
  },
  {
    day: 6,
    title: "Personal Connection",
    prompt: "How does this reading connect to your own life experiences or current situation?",
    supportingText: "Even in texts far removed from our own context, we can often find meaningful connections."
  },
  {
    day: 7,
    title: "Emotional Response",
    prompt: "What emotions did this reading evoke in you? Was there a particular moment that triggered a strong emotional response?",
    supportingText: "Our emotional responses can be windows into our deeper values and concerns."
  },
  {
    day: 8,
    title: "Key Insights",
    prompt: "What are the three most important insights you've gained from this reading so far?",
    supportingText: "Try to articulate these insights in your own words rather than quoting directly."
  },
  {
    day: 9,
    title: "Questions Raised",
    prompt: "What questions has this reading raised for you that remain unanswered?",
    supportingText: "Good reading often raises as many questions as it answers."
  },
  {
    day: 10,
    title: "Connecting Texts",
    prompt: "How does this reading connect to other texts you've read or media you've consumed?",
    supportingText: "Identifying connections between texts can deepen your understanding of both."
  },
  {
    day: 11,
    title: "Symbolism and Metaphor",
    prompt: "Identify a symbol or metaphor in your reading. What deeper meaning does it convey?",
    supportingText: "Symbols and metaphors often communicate complex ideas in accessible ways."
  },
  {
    day: 12,
    title: "Context Matters",
    prompt: "How does understanding the historical, cultural, or social context of this text enhance your understanding of it?",
    supportingText: "No text exists in a vacuum; context always shapes meaning."
  },
  {
    day: 13,
    title: "Growth and Change",
    prompt: "How has a character or idea evolved throughout the text? What caused this evolution?",
    supportingText: "Tracking development over time can reveal important themes and messages."
  },
  {
    day: 14,
    title: "Perspectives and Viewpoints",
    prompt: "Consider a perspective in the text different from your own. How does seeing through this lens change your understanding?",
    supportingText: "Engaging with diverse perspectives expands our capacity for empathy and understanding."
  },
  {
    day: 15,
    title: "Mid-Point Reflection",
    prompt: "Now that you're halfway through the 30-day reflection journey, what has surprised you most about this practice? How has it affected your reading?",
    supportingText: "Taking time to reflect on the reflection process itself can deepen its benefits."
  },
  {
    day: 16,
    title: "Language and Style",
    prompt: "How does the author's writing style and use of language contribute to the overall effect of the text?",
    supportingText: "Form and content are inseparable; how something is said shapes what is being said."
  },
  {
    day: 17,
    title: "Conflicts and Tensions",
    prompt: "Identify a significant conflict or tension in your reading. What deeper issues does this conflict represent?",
    supportingText: "Conflicts often embody the central concerns and themes of a text."
  },
  {
    day: 18,
    title: "Life Application",
    prompt: "What practical wisdom or guidance can you apply to your life from this reading?",
    supportingText: "Reading becomes transformative when we allow it to shape our actions and decisions."
  },
  {
    day: 19,
    title: "Memorable Moments",
    prompt: "What scene, image, or moment from your reading do you think will stay with you longest? Why?",
    supportingText: "The parts of a text that linger in our memory often touch something significant in our psyche."
  },
  {
    day: 20,
    title: "Truth and Meaning",
    prompt: "What truth about human experience does this reading reveal or illuminate?",
    supportingText: "Great texts often help us see universal aspects of the human condition more clearly."
  },
  {
    day: 21,
    title: "Author Dialogue",
    prompt: "If you could have a conversation with the author, what would you want to ask or discuss?",
    supportingText: "Imagining dialogue with the author can help surface your deeper questions and responses."
  },
  {
    day: 22,
    title: "Spiritual Dimensions",
    prompt: "What spiritual themes or questions does this reading raise for you?",
    supportingText: "Even seemingly secular texts often engage with profound questions of meaning and purpose."
  },
  {
    day: 23,
    title: "Beautiful Passages",
    prompt: "Find a passage you consider beautifully written. What makes it beautiful to you?",
    supportingText: "Attending to beauty in language cultivates our appreciation for the artistry of writing."
  },
  {
    day: 24,
    title: "Identifying Themes",
    prompt: "What recurring themes have you noticed in your reading? How do these themes develop throughout the text?",
    supportingText: "Themes often emerge through repetition, variation, and development over the course of a text."
  },
  {
    day: 25,
    title: "Critical Perspective",
    prompt: "What aspects of this text do you find problematic or disagree with? Why?",
    supportingText: "Thoughtful critique is an important part of engaged reading."
  },
  {
    day: 26,
    title: "Reading as Journey",
    prompt: "How has your understanding of or relationship to this text changed since you began reading it?",
    supportingText: "Reading itself is a journey, with its own turning points and discoveries."
  },
  {
    day: 27,
    title: "Cultural Significance",
    prompt: "Why might this text be important in our broader culture or society?",
    supportingText: "Considering a text's wider significance helps connect our individual reading to larger conversations."
  },
  {
    day: 28,
    title: "Personal Transformation",
    prompt: "How has this reading changed you? Have any of your beliefs, perspectives, or attitudes shifted?",
    supportingText: "The most meaningful reading experiences often leave us slightly different than we were before."
  },
  {
    day: 29,
    title: "Lingering Questions",
    prompt: "What questions are you still sitting with as you approach the end of your reading or reflection?",
    supportingText: "Some of the most important questions don't have easy answers."
  },
  {
    day: 30,
    title: "Final Reflection",
    prompt: "Looking back over your 30 days of reading reflection, what have you learned about yourself as a reader? How has this practice enriched your reading experience?",
    supportingText: "This final reflection is an opportunity to integrate what you've learned and consider how you might carry this practice forward."
  }
];
