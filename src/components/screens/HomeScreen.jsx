// HomeScreen - Final Design (Option B: Storybook Cards)
// With parent encouragement and age-based developmental tips

import React, { useState } from 'react';
import { 
  Heart,
  Droplets,
  Sparkles,
  Star,
  ChevronRight,
  ChevronDown,
  Clock,
  Sun,
  Moon,
  CloudSun,
  Flame,
  Settings,
  Play,
  Crown,
  Lock,
  Plus,
  Gift,
  Footprints,
  Zap,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  ThumbsUp,
  Baby,
  Brain,
  AlertCircle,
  Smile
} from 'lucide-react';
import { MASCOTS } from '../../constants';

// MOOSHIE BRAND COLORS
const COLORS = {
  purple: '#7A3E9D',
  purpleLight: '#9B59B6',
  purplePale: '#F3E8FF',
  gold: '#FDC22D',
  goldLight: '#FEF3C7',
  coral: '#F47C47',
  coralLight: '#FFEBE5',
  cream: '#FFF9F0',
  text: '#4A4252',
  textLight: '#6B5B73',
};

// Default profile fallback (only used if profile prop is missing)
const DEFAULT_PROFILE = {
  childName: 'Your little one',
  ageBand: '1-2 years',
  streak: 0,
};

const SAMPLE_ACTIVITIES = [
  {
    id: '1',
    title: 'Rainbow Rice Sensory Bin',
    topic: 'Sensory Exploration',
    duration: '15 min',
    prep_time: '5 min',
    mess_level: 'Messy',
    reason: 'Perfect for curious explorers',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=400&fit=crop'
  },
  {
    id: '2', 
    title: 'Mirror Faces Game',
    topic: 'Social & Emotional',
    duration: '10 min',
    prep_time: 'No prep',
    mess_level: 'Clean',
    reason: 'Great for building connection',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'Ball Rolling Adventure',
    topic: 'Gross Motor', 
    duration: '15 min',
    prep_time: '2 min',
    mess_level: 'Clean',
    reason: 'Great for active play',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=400&fit=crop'
  },
  {
    id: '4',
    title: 'Bubble Painting Magic',
    topic: 'Creative Arts',
    duration: '20 min',
    prep_time: '5 min',
    mess_level: 'Messy',
    reason: 'Unlock to discover',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop',
    isPremium: true,
  },
];

// Parent encouragement messages (rotate daily)
const ENCOURAGEMENT_MESSAGES = [
  {
    title: "You're doing amazing!",
    message: "The fact that you're here shows how much you care. Small moments create big memories.",
    icon: HeartHandshake,
  },
  {
    title: "Progress, not perfection",
    message: "Some days are harder than others. You're exactly the parent your child needs.",
    icon: ThumbsUp,
  },
  {
    title: "You've got this!",
    message: "Every activity you do together builds their brain and your bond.",
    icon: Sparkles,
  },
];

// Age-based tips (would be dynamic based on child's age)
const AGE_TIPS = {
  '18-24 months': [
    {
      id: '1',
      title: 'Big Feelings, Little Words',
      description: "Your toddler feels emotions intensely but can't express them yet. Name their feelings: \"You're feeling frustrated.\" This builds emotional vocabulary.",
      icon: MessageCircle,
      category: 'Emotional Development',
    },
    {
      id: '2', 
      title: 'The Power of "No"',
      description: "Saying \"no\" constantly? It's actually healthy! They're learning independence and testing boundaries. Stay calm and consistent.",
      icon: AlertCircle,
      category: 'Behavior',
    },
    {
      id: '3',
      title: 'Parallel Play is Normal',
      description: "Playing beside other kids but not with them? That's developmentally perfect for this age. True cooperative play comes later.",
      icon: Baby,
      category: 'Social Skills',
    },
  ],
};

// Custom lists for premium users - function to personalize with child name
const getCustomLists = (childName) => [
  {
    id: 'toys',
    name: 'Daily Toy Activity',
    icon: Gift,
    color: COLORS.coral,
    activity: {
      title: 'Teddy Bear Tea Party',
      duration: '20 min',
      image: 'https://images.unsplash.com/photo-1558637845-c8b7ead71a3e?w=600&h=400&fit=crop'
    }
  },
  {
    id: 'movement',
    name: `${childName}'s Movement Time`,
    icon: Footprints,
    color: COLORS.purple,
    activity: {
      title: 'Animal Walk Parade',
      duration: '10 min',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=400&fit=crop'
    }
  },
];


// ============================================================
// HOME SCREEN - OPTION B FINAL
// ============================================================

// Activity images by topic (fallback) - expanded for variety
const TOPIC_IMAGES = {
  'Sensory Exploration': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=400&fit=crop',
  'Sensory Play': 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=600&h=400&fit=crop',
  'Social & Emotional': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop',
  'Gross Motor': 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=400&fit=crop',
  'Fine Motor': 'https://images.unsplash.com/photo-1560421683-6856ea585c78?w=600&h=400&fit=crop',
  'Science & Physics': 'https://images.unsplash.com/photo-1567168544230-6b6e9c0f1b1f?w=600&h=400&fit=crop',
  'Music & Rhythm': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop',
  'Music & Movement': 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop',
  'Language & Storytelling': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop',
  'Creative Arts': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop',
  'DIY Toy Lab': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
  'Toys': 'https://images.unsplash.com/photo-1558637845-c8b7ead71a3e?w=600&h=400&fit=crop',
  'Crafts': 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=400&fit=crop',
  'Outdoor': 'https://images.unsplash.com/photo-1476234251651-f353703a034d?w=600&h=400&fit=crop',
  'Seasonal': 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&h=400&fit=crop',
  'Math & Logic': 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&h=400&fit=crop',
  'default': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=400&fit=crop',
};

// Get image for activity - uses generated SVG illustrations
const getActivityImage = (activity, index) => {
  // Use generated illustration based on activity ID
  if (activity.id) {
    return `/illustrations/${activity.id}.svg`;
  }

  // Fallback to topic-based images if no ID
  if (TOPIC_IMAGES[activity.topic]) return TOPIC_IMAGES[activity.topic];

  return TOPIC_IMAGES['default'];
};

const ACTIVITY_REASONS = [
  'Perfect for curious explorers',
  'Great for building connection',
  'Loved by toddlers everywhere',
  'Simple setup, big fun',
  'Builds important skills',
];

const HomeScreenFinal = ({
  profile = DEFAULT_PROFILE,
  activities = [],
  isPremium = false,
  activityData = { favorites: [], completed: [], dailyCompleted: [], lastRefreshDate: null },
  onSelectActivity,
  onNavigate,
  onShowPaywall,
  onToggleFavorite,
  onNavigateToMilestones,
  stats = {},
}) => {
  const [expandedTip, setExpandedTip] = useState(null);
  
  // Use real favorites from activityData
  const favorites = activityData.favorites || [];
  
  // Transform activities to add missing fields with variety
  const transformedActivities = activities.map((a, i) => ({
    ...a,
    image: getActivityImage(a, i),
    reason: a.reason || ACTIVITY_REASONS[i % ACTIVITY_REASONS.length],
    mess_level: a.mess_level || 'Low mess',
    duration: a.duration || a.activity_time || '15 min',
  }));
  
  const toggleFavorite = (id) => {
    if (onToggleFavorite) onToggleFavorite(id);
  };
  
  const handleSelectActivity = (activity) => {
    if (onSelectActivity) onSelectActivity(activity);
  };
  
  const getTimeContext = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { greeting: 'Good morning', icon: Sun, color: COLORS.gold };
    if (hour < 17) return { greeting: 'Good afternoon', icon: CloudSun, color: COLORS.coral };
    return { greeting: 'Good evening', icon: Moon, color: COLORS.purple };
  };
  const timeContext = getTimeContext();
  const TimeIcon = timeContext.icon;

  const freeActivities = transformedActivities.filter(a => !a.isPremium && a.category !== 'premium');
  const premiumActivity = transformedActivities.find(a => a.isPremium || a.category === 'premium');
  const cardColors = [COLORS.coral, COLORS.purple, COLORS.gold];
  
  // Get today's encouragement (would rotate in real app)
  const todayEncouragement = ENCOURAGEMENT_MESSAGES[0];
  const EncouragementIcon = todayEncouragement.icon;
  
  // Calculate streak from stats
  const calculateStreak = () => {
    const totalMoments = stats.totalMoments || 0;
    if (totalMoments === 0) return 0;
    // Simple streak: if they completed an activity today or yesterday, they have a streak
    const lastDate = stats.lastActivityDate;
    if (!lastDate) return 0;
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
    if (lastDate === todayStr || lastDate === yesterdayStr) {
      return Math.max(1, totalMoments);
    }
    return 0;
  };
  const currentStreak = calculateStreak();

  // Get tips for child's age
  const ageTips = AGE_TIPS[profile.ageBand] || AGE_TIPS['18-24 months'];

  return (
    <div className="min-h-screen pb-8" style={{ 
      background: `linear-gradient(180deg, ${COLORS.cream} 0%, #FFF5E6 100%)`,
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden pointer-events-none">
        <div className="absolute top-6 left-6 w-8 h-8 rounded-full opacity-20" style={{ background: COLORS.coral }}></div>
        <div className="absolute top-16 right-10 w-6 h-6 rounded-lg opacity-15 transform rotate-12" style={{ background: COLORS.purple }}></div>
        <Star className="absolute top-10 right-20 opacity-30" size={20} fill={COLORS.gold} style={{ color: COLORS.gold }} />
      </div>

      {/* Header */}
      <div className="relative px-5 pt-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-2xl shadow-md"
            style={{ background: '#fff', border: `3px solid ${COLORS.gold}` }}
          >
            <Flame size={18} style={{ color: COLORS.coral }} fill={COLORS.coral} />
            <span className="font-black text-sm" style={{ color: COLORS.purple }}>{currentStreak || 1} day streak!</span>
          </div>

          {/* Settings gear removed - users access profile via bottom nav */}
          <Star size={24} style={{ color: COLORS.gold }} fill={COLORS.gold} />
        </div>

        {/* Greeting Card */}
        <div 
          className="rounded-3xl p-5 shadow-lg mb-2"
          style={{ background: '#fff', border: `4px solid ${COLORS.purple}` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TimeIcon size={18} style={{ color: timeContext.color }} />
                <span className="text-sm" style={{ color: COLORS.textLight }}>{timeContext.greeting}</span>
              </div>
              <h1 className="text-xl font-black" style={{ color: COLORS.purple }}>
                {profile.childName}'s Day
              </h1>
              <p className="text-xs" style={{ color: COLORS.textLight }}>
                {freeActivities.length > 0
                  ? `${freeActivities.length} ${freeActivities.length === 1 ? 'activity' : 'activities'} picked just for you`
                  : 'All activities completed for today!'
                }
              </p>
            </div>
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner"
              style={{ background: COLORS.goldLight }}
            >
              <Sparkles size={32} style={{ color: COLORS.gold }} />
            </div>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="px-5 space-y-4">

        {/* ===== EMPTY STATE - All free activities completed ===== */}
        {freeActivities.length === 0 && !isPremium && (
          <div
            className="rounded-3xl p-6 text-center shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${COLORS.goldLight} 0%, ${COLORS.gold}30 100%)`,
              border: `4px solid ${COLORS.gold}`
            }}
          >
            <div
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: '#fff' }}
            >
              <Crown size={40} style={{ color: COLORS.gold }} fill={COLORS.gold} />
            </div>
            <h2 className="text-xl font-black mb-2" style={{ color: COLORS.purple }}>
              Amazing work today! 🎉
            </h2>
            <p className="text-sm mb-4" style={{ color: COLORS.text }}>
              You've completed all your free activities for today. Come back tomorrow for more, or unlock unlimited access!
            </p>
            <button
              onClick={() => onShowPaywall && onShowPaywall()}
              className="px-6 py-3 rounded-2xl font-black text-lg shadow-lg"
              style={{ background: COLORS.purple, color: '#fff' }}
            >
              <Sparkles size={20} className="inline mr-2" />
              Unlock Premium
            </button>
            <p className="text-xs mt-3" style={{ color: COLORS.textLight }}>
              ✨ New free activities refresh tomorrow at midnight
            </p>
          </div>
        )}

        {/* ===== HERO - Today's Star Activity ===== */}
        {freeActivities.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: COLORS.goldLight }}
            >
              <Star size={18} style={{ color: COLORS.gold }} fill={COLORS.gold} />
            </div>
            <h2 className="text-base font-black" style={{ color: COLORS.purple }}>Today's Recommended Activity for {profile.childName}</h2>
          </div>

          <div className="relative">
            {/* Stacked blocks */}
            <div 
              className="absolute -bottom-2 left-2 right-2 h-full rounded-3xl"
              style={{ background: COLORS.coral }}
            />
            <div 
              className="absolute -bottom-1 left-1 right-1 h-full rounded-3xl"
              style={{ background: COLORS.gold }}
            />
            
            <div 
              className="relative rounded-3xl overflow-hidden shadow-xl"
              style={{ background: '#fff', border: `4px solid ${COLORS.purple}` }}
            >
              {/* Rainbow bar */}
              <div className="h-2 flex">
                <div className="flex-1" style={{ background: COLORS.purple }}></div>
                <div className="flex-1" style={{ background: COLORS.coral }}></div>
                <div className="flex-1" style={{ background: COLORS.gold }}></div>
                <div className="flex-1" style={{ background: COLORS.purpleLight }}></div>
                <div className="flex-1" style={{ background: COLORS.coral }}></div>
              </div>

              {/* Landscape Image */}
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={freeActivities[0]?.image} 
                  alt={freeActivities[0]?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Personalization badge */}
                <div className="absolute top-3 left-3">
                  <span 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg"
                    style={{ background: COLORS.gold, color: COLORS.purple }}
                  >
                    <Sparkles size={14} />
                    Perfect for {profile.childName}
                  </span>
                </div>

                {/* Favorite */}
                <button 
                  onClick={() => toggleFavorite(freeActivities[0]?.id)}
                  className="absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform active:scale-90"
                  style={{ background: '#fff' }}
                >
                  <Heart 
                    size={22} 
                    style={{ color: COLORS.coral }}
                    fill={favorites.includes(freeActivities[0]?.id) ? COLORS.coral : 'transparent'}
                  />
                </button>

                {/* Info badges */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span 
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md"
                    style={{ background: COLORS.purple, color: '#fff' }}
                  >
                    <Clock size={14} /> {freeActivities[0]?.duration}
                  </span>
                  <span 
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md"
                    style={{ background: COLORS.coral, color: '#fff' }}
                  >
                    <Droplets size={14} /> {freeActivities[0]?.mess_level}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: COLORS.coral }}>
                  {freeActivities[0]?.topic}
                </p>
                <h2 className="text-xl font-black mb-3" style={{ color: COLORS.purple }}>
                  {freeActivities[0]?.title}
                </h2>
                
                <button 
                  onClick={() => handleSelectActivity(freeActivities[0])}
                  className="w-full py-4 rounded-2xl font-black text-lg shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  style={{ 
                    background: `linear-gradient(135deg, ${COLORS.gold} 0%, #E5B000 100%)`,
                    color: COLORS.purple,
                    border: `4px solid ${COLORS.gold}`,
                  }}
                >
                  <Play size={24} fill={COLORS.purple} />
                  Let's Go!
                </button>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* ===== MORE ACTIVITIES ===== */}
        {freeActivities.length > 1 && (
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: COLORS.coralLight }}
            >
              <Sparkles size={18} style={{ color: COLORS.coral }} />
            </div>
            <h2 className="text-base font-black" style={{ color: COLORS.purple }}>Also for Today</h2>
          </div>

          <div className="space-y-3">
            {freeActivities.slice(1).map((activity, i) => {
              const borderColor = cardColors[i % cardColors.length];
              return (
                <button 
                  key={activity.id}
                  onClick={() => handleSelectActivity(activity)}
                  className="w-full rounded-3xl overflow-hidden shadow-lg text-left relative"
                  style={{ background: '#fff', border: `4px solid ${borderColor}` }}
                >
                  {/* Mini color bar */}
                  <div className="h-1.5 flex">
                    <div className="flex-1" style={{ background: borderColor }}></div>
                    <div className="flex-1" style={{ background: COLORS.gold }}></div>
                    <div className="flex-1" style={{ background: borderColor }}></div>
                  </div>
                  
                  <div className="flex">
                    {/* Image */}
                    <div className="w-28 h-24 flex-shrink-0 overflow-hidden">
                      <img 
                        src={activity.image} 
                        alt={activity.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 p-3">
                      <div className="flex items-center gap-1 mb-1">
                        <Sparkles size={12} style={{ color: borderColor }} />
                        <span className="text-xs font-bold" style={{ color: borderColor }}>
                          {activity.reason}
                        </span>
                      </div>
                      <h3 className="text-sm font-black mb-1 leading-tight" style={{ color: COLORS.text }}>
                        {activity.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium" style={{ color: COLORS.textLight }}>
                          <Clock size={11} className="inline mr-1" />{activity.duration}
                        </span>
                        <span className="text-xs font-medium" style={{ color: COLORS.textLight }}>
                          <Droplets size={11} className="inline mr-1" />{activity.mess_level}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center pr-3">
                      <div 
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ background: `${borderColor}15` }}
                      >
                        <Play size={16} style={{ color: borderColor }} fill={borderColor} />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        )}

        {/* ===== PREMIUM LOCKED ACTIVITY ===== */}
        {premiumActivity && !isPremium && (
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: COLORS.goldLight }}
              >
                <Crown size={18} style={{ color: COLORS.gold }} fill={COLORS.gold} />
              </div>
              <h2 className="text-base font-black" style={{ color: COLORS.purple }}>Unlock More Magic</h2>
            </div>

            <div 
              className="rounded-3xl overflow-hidden shadow-lg relative"
              style={{ background: '#fff', border: `4px solid ${COLORS.gold}` }}
            >
              {/* Gold shimmer bar */}
              <div 
                className="h-2"
                style={{ background: `linear-gradient(90deg, ${COLORS.gold}, #FFE082, ${COLORS.gold})` }}
              />
              
              <div className="flex">
                {/* Blurred image */}
                <div className="w-32 h-28 flex-shrink-0 overflow-hidden relative">
                  <img 
                    src={premiumActivity.image} 
                    alt={premiumActivity.title}
                    className="w-full h-full object-cover"
                    style={{ filter: 'blur(5px) saturate(0.5)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/50 flex items-center justify-center">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ background: COLORS.gold }}
                    >
                      <Lock size={24} style={{ color: COLORS.purple }} />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 p-4">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Crown size={14} style={{ color: COLORS.gold }} fill={COLORS.gold} />
                    <span className="text-xs font-bold" style={{ color: COLORS.gold }}>
                      Premium Activity
                    </span>
                  </div>
                  <h3 className="text-base font-black mb-2" style={{ color: COLORS.text }}>
                    {premiumActivity.title}
                  </h3>
                  <button 
                    onClick={() => onShowPaywall && onShowPaywall()}
                    className="px-4 py-2 rounded-xl text-sm font-black flex items-center gap-2"
                    style={{ background: COLORS.gold, color: COLORS.purple }}
                  >
                    <Sparkles size={16} />
                    Unlock 2,000+ Activities
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== PREMIUM: CUSTOM LISTS ===== */}
        {isPremium && (
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: COLORS.purplePale }}
                >
                  <Zap size={18} style={{ color: COLORS.purple }} />
                </div>
                <h2 className="text-base font-black" style={{ color: COLORS.purple }}>Your Lists</h2>
              </div>
              <button 
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm"
                style={{ background: '#fff', border: `2px solid ${COLORS.purple}`, color: COLORS.purple }}
              >
                <Plus size={14} /> New List
              </button>
            </div>

            <div className="space-y-3">
              {getCustomLists(profile.childName).map((list) => {
                const ListIcon = list.icon;
                return (
                  <button 
                    key={list.id}
                    className="w-full rounded-2xl overflow-hidden shadow-md text-left"
                    style={{ background: '#fff', border: `3px solid ${list.color}` }}
                  >
                    <div className="flex">
                      <div className="w-24 h-20 flex-shrink-0 overflow-hidden">
                        <img 
                          src={list.activity.image} 
                          alt={list.activity.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <ListIcon size={14} style={{ color: list.color }} />
                          <span className="text-xs font-bold" style={{ color: list.color }}>
                            {list.name}
                          </span>
                        </div>
                        <h3 className="text-sm font-black" style={{ color: COLORS.text }}>
                          {list.activity.title}
                        </h3>
                      </div>
                      <div className="flex items-center pr-3">
                        <ChevronRight size={20} style={{ color: list.color }} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== PARENT ENCOURAGEMENT ===== */}
        <div className="pt-4">
          <div 
            className="rounded-3xl p-5 shadow-lg relative overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, ${COLORS.coralLight} 0%, #FFE4E1 100%)`,
              border: `4px solid ${COLORS.coral}`
            }}
          >
            {/* Decorative hearts */}
            <Heart 
              className="absolute top-3 right-3 opacity-20" 
              size={32} 
              fill={COLORS.coral}
              style={{ color: COLORS.coral }}
            />
            <Heart 
              className="absolute bottom-3 right-8 opacity-10" 
              size={24} 
              fill={COLORS.coral}
              style={{ color: COLORS.coral }}
            />
            
            <div className="relative z-10 flex items-start gap-4">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0"
                style={{ background: '#fff' }}
              >
                <EncouragementIcon size={28} style={{ color: COLORS.coral }} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-black mb-1" style={{ color: COLORS.coral }}>
                  {todayEncouragement.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: COLORS.text }}>
                  {todayEncouragement.message}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== DEVELOPMENT MILESTONES CARD ===== */}
        <div className="pt-4 pb-2">
          <button
            onClick={onNavigateToMilestones}
            className="w-full rounded-2xl p-4 shadow-md flex items-center gap-3 transition-all active:scale-98"
            style={{
              background: 'linear-gradient(135deg, #F3E8FF 0%, #FEF3C7 100%)',
              border: `3px solid ${COLORS.purple}`,
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: COLORS.purple }}
            >
              <span className="text-2xl">📊</span>
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-black text-sm" style={{ color: COLORS.purple }}>
                {profile.childName}'s Development
              </h3>
              <p className="text-xs" style={{ color: COLORS.textLight }}>
                Track milestones for {profile.ageBand}
              </p>
            </div>
            <ChevronRight size={20} style={{ color: COLORS.purple }} />
          </button>
        </div>

        {/* ===== AGE-BASED TIPS ===== */}
        <div className="pt-4 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: COLORS.purplePale }}
            >
              <Lightbulb size={18} style={{ color: COLORS.purple }} />
            </div>
            <div>
              <h2 className="text-base font-black" style={{ color: COLORS.purple }}>Tips for {profile.ageBand}</h2>
              <p className="text-xs" style={{ color: COLORS.textLight }}>What {profile.childName} might be experiencing</p>
            </div>
          </div>

          <div className="space-y-3">
            {ageTips.map((tip) => {
              const TipIcon = tip.icon;
              const isExpanded = expandedTip === tip.id;
              
              return (
                <div 
                  key={tip.id}
                  className="rounded-2xl overflow-hidden shadow-md"
                  style={{ background: '#fff', border: `3px solid ${COLORS.purple}30` }}
                >
                  <button 
                    onClick={() => setExpandedTip(isExpanded ? null : tip.id)}
                    className="w-full p-4 flex items-center gap-3 text-left"
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: COLORS.purplePale }}
                    >
                      <TipIcon size={20} style={{ color: COLORS.purple }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: COLORS.purple }}>
                        {tip.category}
                      </p>
                      <h3 className="text-sm font-black" style={{ color: COLORS.text }}>
                        {tip.title}
                      </h3>
                    </div>
                    <ChevronDown 
                      size={20} 
                      className="transition-transform"
                      style={{ 
                        color: COLORS.purple,
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}
                    />
                  </button>
                  
                  {isExpanded && (
                    <div 
                      className="px-4 pb-4 pt-0"
                      style={{ borderTop: `2px dashed ${COLORS.purple}20` }}
                    >
                      <p className="text-sm leading-relaxed pt-3" style={{ color: COLORS.textLight }}>
                        {tip.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};


// ============================================================
// PREVIEW CONTAINER
// ============================================================

const HomeScreenPreview = () => {
  const [isPremium, setIsPremium] = useState(false);

  return (
    <div className="flex flex-col items-center p-4 md:p-8 min-h-screen" style={{ background: '#0F0F1A' }}>
      <h1 className="text-xl md:text-2xl font-bold text-white mb-2 text-center">HomeScreen - Final Design</h1>
      <p className="text-gray-400 mb-4 text-sm text-center">Option B with encouragement & age tips</p>
      
      {/* Premium toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setIsPremium(false)}
          className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
            !isPremium 
              ? 'bg-white text-gray-900 shadow-lg' 
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          Free User
        </button>
        <button
          onClick={() => setIsPremium(true)}
          className={`px-4 py-2 rounded-full font-medium transition-all text-sm flex items-center gap-2 ${
            isPremium 
              ? 'bg-yellow-400 text-gray-900 shadow-lg' 
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          <Crown size={16} /> Premium User
        </button>
      </div>

      {/* Phone mockup */}
      <div 
        className="relative rounded-[2rem] md:rounded-[3rem] p-2 md:p-3 shadow-2xl w-full max-w-[340px] md:max-w-[390px]"
        style={{ background: 'linear-gradient(145deg, #2d2d3a 0%, #1a1a2e 100%)' }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-5 md:h-7 bg-black rounded-b-xl md:rounded-b-2xl z-20"></div>
        
        <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-white" style={{ height: '700px' }}>
          <div className="h-full overflow-y-auto overflow-x-hidden">
            <HomeScreenFinal isPremium={isPremium} />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 max-w-md">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-white/80 font-bold mb-1">Sections:</p>
            <ul className="text-white/50 space-y-0.5">
              <li>• Hero Activity (large)</li>
              <li>• 2 More Activities</li>
              <li>• Premium Upsell / Custom Lists</li>
              <li>• Parent Encouragement</li>
              <li>• Age-Based Tips (expandable)</li>
            </ul>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-white/80 font-bold mb-1">Personalization:</p>
            <ul className="text-white/50 space-y-0.5">
              <li>• "Perfect for {childName}" badges</li>
              <li>• Age-specific tips</li>
              <li>• Activity reasons</li>
              <li>• Custom lists (premium)</li>
              <li>• Rotating encouragement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreenFinal;
