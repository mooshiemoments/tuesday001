// =====================================================
// MOOSHIE MOMENTS - CONSTANTS
// =====================================================

// Brand Colors
export const COLORS = {
  purple: '#7A3E9D',
  gold: '#FDC22D',
  coral: '#F47C47',
  cream: '#FFF9F0',
  text: '#4A4252',
  border: '#E8E0D5',
  background: '#FDF8F3',
};

// Mascot URLs
export const LOGO_URL = 'https://i.postimg.cc/B86wN2nX/logo.png';

export const MASCOTS = {
  adultWaving: 'https://i.postimg.cc/fJVy4rqR/mascot-adult-waving.png',
  adultThinking: 'https://i.postimg.cc/dLh3MxN1/mascot-adult-thinking.png',
  adultQuestion: 'https://i.postimg.cc/dDH3xY6q/mascot-adult-question.png',
  adultSearching: 'https://i.postimg.cc/4nLySgPY/mascot-adult-searching.png',
  adultCelebrating: 'https://i.postimg.cc/grSjTWs2/mascot-adult-celebrating.png',
  adultThumbsup: 'https://i.postimg.cc/KR1jXHpv/mascot-adult-thumbsup.png',
  adultBell: 'https://i.postimg.cc/w1Ssbp6c/mascot-adult-bell.png',
  adultCrown: 'https://i.postimg.cc/z3tvcr7f/mascot-adult-crown.png',
  childWaving: 'https://i.postimg.cc/QHFCLyY9/mascot-child-waving.png',
  childReading: 'https://i.postimg.cc/1f8Xxj78/mascot-child-reading.png',
  childSleeping: 'https://i.postimg.cc/LnJ5dbQZ/mascot-child-sleeping.png',
  togetherHighfive: 'https://i.postimg.cc/4mYyCS2H/mascot-together-highfive.png',
  togetherHugging: 'https://i.postimg.cc/PPCJGRV1/mascot-together-hugging.png',
};

export const MASCOT_FALLBACKS = {
  adultWaving: '👋', adultThinking: '🤔', adultQuestion: '❓', adultSearching: '🔍',
  adultCelebrating: '🎉', adultThumbsup: '👍', adultBell: '🔔', adultCrown: '👑',
  childWaving: '👶', childReading: '📖', childSleeping: '😴',
  togetherHighfive: '🙌', togetherHugging: '🤗',
};

export const MOOSHIE_LABS_HERO = 'https://i.postimg.cc/GHnkhMVY/mooshielabshero.png';
export const FINAL_LOGO_URL = 'https://i.postimg.cc/67Z5N7w0/Final-Logo-(1).png';

export const ADULT_MASCOT_URL = MASCOTS.adultThumbsup;
export const CHILD_MASCOT_URL = MASCOTS.childWaving;
export const MASCOT_URL = LOGO_URL;

// Storage Keys
export const STORAGE_KEY = 'mooshie-moments-data';
export const COMMUNITY_KEY = 'mooshie-community-ideas';
export const MISSION_KEY = 'mooshie-mission-data';

// Social Links
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/mooshiemoments',
  tiktok: 'https://www.tiktok.com/@mooshiemoments',
  facebook: 'https://www.facebook.com/profile.php?id=61586858073521'
};

// Age Bands
export const AGE_BANDS = ['6-12 months', '1-2 years', '2-3 years', '3-4 years'];

// Topic Icons
export const TOPIC_ICONS = {
  'Science & Physics': { icon: '🔬', color: '#7A3E9D', premium: false },
  'Math & Logic': { icon: '🔢', color: '#E85A4F', premium: false },
  'Gross Motor': { icon: '🏃', color: '#2EAD6D', premium: false },
  'Fine Motor': { icon: '🤲', color: '#FDC22D', premium: false },
  'Music & Rhythm': { icon: '🎵', color: '#E87FA0', premium: false },
  'Social & Emotional': { icon: '💙', color: '#5B8DEF', premium: false },
  'Sensory Exploration': { icon: '✨', color: '#20B2AA', premium: false },
  'Language & Storytelling': { icon: '📖', color: '#F47C47', premium: false },
  'Toys': { icon: '🧸', color: '#9B5BC0', premium: true },
  'Crafts': { icon: '🎨', color: '#EC4899', premium: true },
  'Outdoor': { icon: '🌳', color: '#22C55E', premium: true },
  'DIY Toy Lab': { icon: '🔧', color: '#FF6B35', premium: true },
  'Seasonal': { icon: '🍂', color: '#8BC34A', premium: true },
  'Tiny Fixer': { icon: '🛠️', color: '#6B7280', premium: true },
  'Sensory Scientist': { icon: '🧪', color: '#06B6D4', premium: true },
  'Regulation Station': { icon: '🧘', color: '#8B5CF6', premium: true },
  'Speech Spark': { icon: '🗣️', color: '#F59E0B', premium: true },
  'Heuristic Hamper': { icon: '🧺', color: '#D97706', premium: true },
  'Kindness Pack': { icon: '🤗', color: '#EC4899', premium: 'mission' },
  'Manners Pack': { icon: '🙏', color: '#8B5CF6', premium: 'mission' },
  'Sharing & Turns Pack': { icon: '🤝', color: '#3B82F6', premium: 'mission' },
  'Little Helper Pack': { icon: '🧹', color: '#10B981', premium: 'mission' },
  'Gratitude Pack': { icon: '💜', color: '#7A3E9D', premium: 'mission' },
};

export const SEASON_ICONS = {
  'Winter': { icon: '❄️', color: '#60A5FA' },
  'Spring': { icon: '🌸', color: '#F472B6' },
  'Summer': { icon: '☀️', color: '#FDC22D' },
  'Autumn': { icon: '🍁', color: '#F47C47' },
};

// Mission Packs
export const MISSION_PACKS = [
  { id: 'kindness', name: 'Kindness Pack', icon: '🤗', topic: 'Kindness Pack', sharesRequired: 3, socialRequired: null, description: 'Gentle hands, caring for others, empathy activities' },
  { id: 'manners', name: 'Manners Pack', icon: '🙏', topic: 'Manners Pack', sharesRequired: 5, socialRequired: null, description: 'Please, thank you, greetings, table manners' },
  { id: 'sharing', name: 'Sharing & Turns Pack', icon: '🤝', topic: 'Sharing & Turns Pack', sharesRequired: 7, socialRequired: 'instagram', description: 'Taking turns, sharing, cooperative play' },
  { id: 'helper', name: 'Little Helper Pack', icon: '🧹', topic: 'Little Helper Pack', sharesRequired: 10, socialRequired: 'tiktok', description: 'Age-appropriate chores, being helpful' },
  { id: 'gratitude', name: 'Gratitude Pack', icon: '💜', topic: 'Gratitude Pack', sharesRequired: 12, socialRequired: 'facebook', description: 'Thankfulness, appreciation, giving back' }
];

// Gating Rules
export const GATING_RULES = {
  'Household Items': { freeLimit: 8 },
  'Materials': { freeLimit: 8 },
  'Skills': { freeLimit: 8 },
  'Seasonal': { freeLimit: 4 },
  'Fundamentals': { freeLimit: 4 },
  'Life Skills': { freeLimit: 4 },
  'Conversations': { freeLimit: 4 },
  'Verbal Games': { freeLimit: 4 },
  'Crafts': { freeLimit: 2 },
  'Outdoor': { freeLimit: 2 },
  'default': { freeLimit: 2 },
};

// Discovery Sections
export const DISCOVERY_SECTIONS = [
  { id: 'materials', name: 'Materials', icon: 'Package', premium: false, items: [
    { name: 'Cardboard', image: 'https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=300&h=200&fit=crop', keyword: 'cardboard' },
    { name: 'Paper', image: 'https://images.unsplash.com/photo-1517697471339-4aa32003c11a?w=300&h=200&fit=crop', keyword: 'paper' },
    { name: 'Spoons', image: 'https://images.unsplash.com/photo-1592914610354-fd354ea45e48?w=300&h=200&fit=crop', keyword: 'spoon' },
    { name: 'Bottles', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop', keyword: 'bottle' },
    { name: 'Socks', image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=300&h=200&fit=crop', keyword: 'sock' },
    { name: 'Cups', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300&h=200&fit=crop', keyword: 'cup' },
  ]},
  { id: 'skills', name: 'Skills', icon: 'Brain', premium: false, items: [
    { name: 'Gross Motor', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300&h=200&fit=crop', keyword: 'gross motor' },
    { name: 'Fine Motor', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300&h=200&fit=crop', keyword: 'fine motor' },
    { name: 'Language', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=200&fit=crop', keyword: 'language' },
    { name: 'Sensory', image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=300&h=200&fit=crop', keyword: 'sensory' },
    { name: 'Science', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&h=200&fit=crop', keyword: 'science' },
    { name: 'Music', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=200&fit=crop', keyword: 'music' },
  ]},
  { id: 'fundamentals', name: 'Fundamentals', icon: 'Target', premium: false, items: [
    { name: 'Colors', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=200&fit=crop', keyword: 'color' },
    { name: 'Numbers', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop', keyword: 'number' },
    { name: 'Letters', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop', keyword: 'letter' },
    { name: 'Shapes', image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=300&h=200&fit=crop', keyword: 'shape' },
    { name: 'Emotions', image: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=300&h=200&fit=crop', keyword: 'emotion' },
  ]},
  { id: 'lifeskills', name: 'Life Skills', icon: 'Handshake', premium: false, items: [
    { name: 'Dressing', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=200&fit=crop', keyword: 'dressing' },
    { name: 'Tidying', image: 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=300&h=200&fit=crop', keyword: 'tidy' },
    { name: 'Cooking', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop', keyword: 'cooking' },
    { name: 'Hygiene', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=300&h=200&fit=crop', keyword: 'hygiene' },
  ]},
  { id: 'crafts', name: 'Crafts', icon: 'Palette', premium: true, items: [
    { name: 'Paper Crafts', image: 'https://images.unsplash.com/photo-1560421683-6856ea585c78?w=300&h=200&fit=crop', keyword: 'paper craft' },
    { name: 'Painting', image: 'https://images.unsplash.com/photo-1596309631022-cbcb7a8a43e5?w=300&h=200&fit=crop', keyword: 'painting' },
    { name: 'Collage', image: 'https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=300&h=200&fit=crop', keyword: 'collage' },
    { name: 'Playdough', image: 'https://images.unsplash.com/photo-1594806476168-2c9a61dc7e3e?w=300&h=200&fit=crop', keyword: 'playdough' },
  ]},
  { id: 'outdoor', name: 'Outdoor', icon: 'Tree', premium: true, items: [
    { name: 'Garden', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop', keyword: 'garden' },
    { name: 'Park', image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=300&h=200&fit=crop', keyword: 'park' },
    { name: 'Water Play', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop', keyword: 'water play' },
    { name: 'Nature Walk', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop', keyword: 'nature walk' },
  ]},
  { id: 'seasonal', name: 'Seasonal', icon: 'Leaf', premium: false, items: [
    { name: 'Winter', image: 'https://images.unsplash.com/photo-1457269449834-928af64c684d?w=300&h=200&fit=crop', keyword: 'winter' },
    { name: 'Spring', image: 'https://images.unsplash.com/photo-1462275646964-a0e3571f4f83?w=300&h=200&fit=crop', keyword: 'spring' },
    { name: 'Summer', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop', keyword: 'summer' },
    { name: 'Autumn', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop', keyword: 'autumn' },
  ]},
  { id: 'conversations', name: 'Conversations', icon: 'ChatCircle', premium: false, items: [
    { name: 'Would You Rather', image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=300&h=200&fit=crop', keyword: 'would you rather' },
    { name: 'Feelings Talk', image: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=300&h=200&fit=crop', keyword: 'feelings' },
    { name: 'Silly Questions', image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=300&h=200&fit=crop', keyword: 'silly' },
  ]},
  { id: 'verbal', name: 'Verbal Games', icon: 'Microphone', premium: false, items: [
    { name: 'Rhyming', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=200&fit=crop', keyword: 'rhyming' },
    { name: 'I Spy', image: 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?w=300&h=200&fit=crop', keyword: 'i spy' },
    { name: 'Word Games', image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=300&h=200&fit=crop', keyword: 'word' },
    { name: 'Story Making', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=200&fit=crop', keyword: 'story' },
  ]},
];

// Filter Options
export const FILTER_OPTIONS = {
  time: [
    { label: 'Any time', value: 'any', icon: 'Timer' },
    { label: '5 min or less', value: '5', icon: 'Lightning' },
    { label: '10 min', value: '10', icon: 'Timer' },
    { label: '15 min', value: '15', icon: 'Timer' },
    { label: '20+ min', value: '20+', icon: 'Clock' },
  ],
  mess: [
    { label: 'Any mess level', value: 'any', icon: 'Palette' },
    { label: 'Clean play', value: 'clean', icon: 'Sparkle', desc: 'No cleanup needed' },
    { label: 'Low mess', value: 'low', icon: 'Broom', desc: 'Quick wipe down' },
    { label: 'Messy fun', value: 'messy', icon: 'Palette', desc: 'Worth the mess!' },
  ],
  supervision: [
    { label: 'Any level', value: 'any', icon: 'Eye' },
    { label: 'Independent', value: 'independent', icon: 'Target', desc: 'Child plays solo after setup' },
    { label: 'Guided', value: 'guided', icon: 'Eye', desc: 'You nearby, occasional help' },
    { label: 'Hands-on', value: 'hands-on', icon: 'Handshake', desc: 'Play together time' },
  ],
};

export const MATERIALS_FILTER = [
  { label: 'Paper', value: 'paper', image: 'https://images.unsplash.com/photo-1517697471339-4aa32003c11a?w=100&h=100&fit=crop' },
  { label: 'Cardboard', value: 'cardboard', image: 'https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=100&h=100&fit=crop' },
  { label: 'Spoons', value: 'spoons', image: 'https://images.unsplash.com/photo-1592914610354-fd354ea45e48?w=100&h=100&fit=crop' },
  { label: 'Bottles', value: 'bottles', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop' },
  { label: 'Cups', value: 'cups', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&h=100&fit=crop' },
  { label: 'Socks', value: 'socks', image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=100&h=100&fit=crop' },
  { label: 'Boxes', value: 'boxes', image: 'https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=100&h=100&fit=crop' },
  { label: 'Fabric', value: 'fabric', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=100&h=100&fit=crop' },
];

// Onboarding
export const CAROUSEL_SLIDES = [
  { id: 1, mascot: 'adultWaving', headline: 'Turn Your Junk Drawer into a Playground', subtext: 'Tape, spoons, cardboard boxes — everything you need is already in your home.' },
  { id: 2, mascot: 'childReading', headline: 'Expert-Backed Development', subtext: 'Every activity is designed to build real skills — motor, language, logic, and more.' },
  { id: 3, mascot: 'togetherHugging', headline: 'More Than Just Play', subtext: 'Create meaningful moments that help your child grow — and remind you that you\'re doing great.' },
];

export const PLAY_PULSE_QUESTIONS = {
  '6-12 months': [
    { id: 1, pillar: '🦵', pillarName: 'Physical', question: 'Is [NAME] sitting up on their own yet?' },
    { id: 2, pillar: '💬', pillarName: 'Communication', question: 'Are they making "babbling" sounds (ba-ba, da-da)?' },
    { id: 3, pillar: '🧠', pillarName: 'Logic', question: 'Can they pick up small items with their thumb and finger?' },
  ],
  '1-2 years': [
    { id: 1, pillar: '🦵', pillarName: 'Physical', question: 'Is [NAME] a confident walker?' },
    { id: 2, pillar: '💬', pillarName: 'Communication', question: 'Can they point to a body part when you name it?' },
    { id: 3, pillar: '🧠', pillarName: 'Logic', question: 'If you hide a toy under a cloth, do they know it\'s still there?' },
  ],
  '2-3 years': [
    { id: 1, pillar: '🦵', pillarName: 'Physical', question: 'Can [NAME] kick a ball without losing balance?' },
    { id: 2, pillar: '💬', pillarName: 'Communication', question: 'Are they using simple 2-word sentences?' },
    { id: 3, pillar: '🧠', pillarName: 'Logic', question: 'Can they sort items by color or size?' },
  ],
  '3-4 years': [
    { id: 1, pillar: '🦵', pillarName: 'Physical', question: 'Can [NAME] jump forward with both feet?' },
    { id: 2, pillar: '💬', pillarName: 'Communication', question: 'Do they enjoy "pretend play" (acting like an animal/doctor)?' },
    { id: 3, pillar: '🧠', pillarName: 'Logic', question: 'Can they follow a 2-step instruction without help?' },
  ],
};

export const AFFIRMATIONS = {
  general: [
    { text: "You're doing an amazing job. Seriously. 💜", subtext: "The fact that you're here shows how much you care." },
    { text: "This moment matters more than you know.", subtext: "You're building memories that last a lifetime." },
    { text: "No screen can replace what you're giving.", subtext: "Your presence is the greatest gift." },
    { text: "Small moments, big impact.", subtext: "Every spark lights up their world." },
    { text: "You showed up today. That's everything.", subtext: "Consistency beats perfection." },
  ],
  morning: [
    { text: "Starting the day with connection. ☀️", subtext: "That's what great parenting looks like." },
    { text: "Morning magic in the making!", subtext: "The best way to start any day." },
  ],
  evening: [
    { text: "Ending the day with love. 🌙", subtext: "These quiet moments matter most." },
    { text: "You made today count.", subtext: "Rest well - you've earned it." },
  ],
};

// Defaults
export const defaultProfile = { 
  childName: '', 
  ageBand: '',
  birthday: null,
  playPulseAnswers: [],
  skillLevel: 'explorer',
  checkInDate: null,
  sparkSchedule: { selectedDays: [5, 6], weekdayTime: '5:30 PM - After nursery', weekendTime: '9:00 AM - After breakfast' },
  values: [],
  ageBandSetDate: null,
  dismissedAgePrompt: false,
  notifications: { enabled: false, days: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: true, sun: true }, weekdayTime: '17:30', weekendTime: '09:00', pausedUntil: null }
};

export const defaultActivityData = {
  completed: [],
  skipped: [],
  favorites: [],
  communityFavorites: [],
  reactions: {},
  completionHistory: {},
  // Daily limit tracking for free users
  dailyCompleted: [],      // Activity IDs completed today
  lastRefreshDate: null,   // Date string 'YYYY-MM-DD' of last refresh
  dailyShownIds: [],       // Activity IDs shown today (to maintain consistency)
};

// Daily free activity limit
export const DAILY_FREE_LIMIT = 3;
export const defaultMemories = {};
export const defaultStats = { totalMoments: 0, streak: 0, lastActivityDate: null, topicProgress: {}, topicReactions: {}, topicsExplored: [] };
export const defaultMission = { shareCount: 0, socialFollows: { instagram: false, tiktok: false, facebook: false }, unlockedPacks: [], lastShareDate: null };

// Date helpers
export const DAYS_IN_MONTH = Array.from({ length: 31 }, (_, i) => i + 1);
export const MONTHS = [
  { value: 0, label: 'January' }, { value: 1, label: 'February' }, { value: 2, label: 'March' },
  { value: 3, label: 'April' }, { value: 4, label: 'May' }, { value: 5, label: 'June' },
  { value: 6, label: 'July' }, { value: 7, label: 'August' }, { value: 8, label: 'September' },
  { value: 9, label: 'October' }, { value: 10, label: 'November' }, { value: 11, label: 'December' },
];
export const YEARS_FOR_BIRTHDAY = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

// Report requirements
export const REPORT_REQUIREMENTS = { minActivities: 15, minTopics: 5 };
export const REPEAT_AFTER_DAYS = 90;

// Age progression
export const AGE_PROGRESSION = {
  '6-12 months': { next: '1-2 years', monthsInBand: 6 },
  '1-2 years': { next: '2-3 years', monthsInBand: 12 },
  '2-3 years': { next: '3-4 years', monthsInBand: 12 },
  '3-4 years': { next: null, monthsInBand: 12 }
};
