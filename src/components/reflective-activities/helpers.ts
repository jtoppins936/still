
export const isPremiumActivity = (title: string) => 
  title.toLowerCase().includes('meditation') || 
  title.toLowerCase().includes('journaling') ||
  title.toLowerCase() === 'centering prayer' ||
  title.toLowerCase() === 'gratitude practice' ||
  title.toLowerCase() === 'sacred rituals' ||
  title.toLowerCase().includes('sacred rituals');
