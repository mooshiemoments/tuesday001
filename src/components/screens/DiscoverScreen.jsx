
// DiscoverScreen - Final Clean Version
// No counts, no badges, 4 collections only

import React, { useState } from 'react';
import { 
  Search,
  ChevronRight,
  Crown,
  Lock,
  FlaskConical,
  Package,
  Brain,
  Gift,
  Scissors,
  MessageCircle,
  Sparkles,
  Star,
  BookOpen,
  X,
  Calendar,
  Clock,
  Heart,
  Sun,
  Box,
  Lightbulb,
  Plane,
  Gamepad2
} from 'lucide-react';

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
  green: '#2EAD6D',
};

// ============================================================
// DATA
// ============================================================

// CORE FREE CATEGORIES (8 free per category)
// Note: Everyday Items removed - now part of shuffle feature
const CORE_CATEGORIES = [
  {
    id: 'skills',
    name: 'Skills',
    icon: Brain,
    color: COLORS.coral,
    freeCount: 8,
    items: [
      { name: 'Movement', topic: 'Gross Motor', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300&h=200&fit=crop' },
      { name: 'Hand Skills', topic: 'Fine Motor', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300&h=200&fit=crop' },
      { name: 'Talking', topic: 'Language & Storytelling', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=200&fit=crop' },
      { name: 'Music', topic: 'Music & Rhythm', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=200&fit=crop' },
      { name: 'Social', topic: 'Social & Emotional', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=200&fit=crop' },
    ]
  },
  {
    id: 'fundamentals',
    name: 'Fundamentals',
    icon: BookOpen,
    color: COLORS.green,
    freeCount: 8,
    items: [
      { name: 'Colors', keyword: 'color', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=200&fit=crop' },
      { name: 'Numbers', keyword: 'number', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop' },
      { name: 'Letters', keyword: 'letter', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop' },
      { name: 'Shapes', keyword: 'shape', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop' },
    ]
  },
  {
    id: 'science',
    name: 'Science & Discovery',
    icon: FlaskConical,
    color: COLORS.purple,
    freeCount: 8,
    items: [
      { name: 'Sensory Play', topic: 'Sensory Exploration', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300&h=200&fit=crop' },
      { name: 'Experiments', topic: 'Science & Physics', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=200&fit=crop' },
      { name: 'Nature', keyword: 'nature', image: 'https://images.unsplash.com/photo-1476234251651-f353703a034d?w=300&h=200&fit=crop' },
    ]
  },
];

// PREMIUM CATEGORIES (2 free)
const PREMIUM_CATEGORIES = [
  { 
    id: 'toys', 
    name: 'Toys', 
    icon: Gift, 
    color: COLORS.gold,
    freeCount: 2,
    items: [
      { name: 'Stuffed Animals', image: 'https://images.unsplash.com/photo-1535572290543-960a8046f5af?w=300&h=200&fit=crop' },
      { name: 'Blocks', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300&h=200&fit=crop' },
      { name: 'Balls', image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=300&h=200&fit=crop' },
      { name: 'Play Dough', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300&h=200&fit=crop' },
    ]
  },
  { 
    id: 'making', 
    name: 'Making Things', 
    icon: Scissors, 
    color: COLORS.coral,
    freeCount: 2,
    items: [
      { name: 'Crafts', image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=300&h=200&fit=crop' },
      { name: 'DIY Toys', image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&h=200&fit=crop' },
      { name: 'Art Projects', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=200&fit=crop' },
    ]
  },
  { 
    id: 'verbalgames', 
    name: 'Verbal Games', 
    icon: Gamepad2, 
    color: COLORS.purple,
    freeCount: 2,
    items: [
      { name: 'Word Play', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=200&fit=crop' },
      { name: 'Rhyming', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=200&fit=crop' },
      { name: 'Storytelling', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=200&fit=crop' },
    ]
  },
  { 
    id: 'conversations', 
    name: 'Conversations', 
    icon: MessageCircle, 
    color: COLORS.green,
    freeCount: 2,
    items: [
      { name: 'Question Games', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=200&fit=crop' },
      { name: 'Feelings Talk', image: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=300&h=200&fit=crop' },
      { name: 'Imagination', image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=300&h=200&fit=crop' },
    ]
  },
  { 
    id: 'travel', 
    name: 'Travel Pack', 
    icon: Plane, 
    color: COLORS.coral,
    freeCount: 2,
    items: [
      { name: 'Airplane', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&h=200&fit=crop' },
      { name: 'Car', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop' },
      { name: 'Restaurant', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop' },
    ]
  },
];

// NEW THIS MONTH
const NEW_THIS_MONTH = [
  {
    id: 'new1',
    title: 'Spaghetti Tower',
    topic: 'Building',
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=300&fit=crop',
    isPremium: true,
  },
  {
    id: 'new2',
    title: 'Frozen Toy Rescue',
    topic: 'Sensory Play',
    duration: '20 min',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop',
    isPremium: false,
  },
  {
    id: 'new3',
    title: 'Shadow Puppets',
    topic: 'Imagination',
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop',
    isPremium: false,
  },
  {
    id: 'new4',
    title: 'Nature Collage',
    topic: 'Art',
    duration: '20 min',
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=300&fit=crop',
    isPremium: true,
  },
];

// LIFESAVERS - Age-appropriate pain point solutions
// These topics help parents through common challenges at each developmental stage
const LIFESAVERS_BY_AGE = {
  '6-12 months': [
    { id: 'teething', name: 'Teething Relief', topic: 'Teething Relief', description: 'Soothing activities for sore gums', icon: Heart, color: COLORS.coral, emoji: '🦷' },
    { id: 'sleep', name: 'Bedtime Routines', topic: 'Bedtime Routines', description: 'Calm wind-down activities', icon: Sun, color: COLORS.purple, emoji: '😴' },
    { id: 'separation', name: 'Separation Anxiety', topic: 'Separation Anxiety', description: 'Building secure attachment', icon: Heart, color: COLORS.green, emoji: '🤗' },
    { id: 'caregiver', name: 'Caregiver Wellbeing', topic: 'Caregiver Wellbeing', description: 'Self-care for exhausted parents', icon: Heart, color: COLORS.gold, emoji: '💪' },
  ],
  '1-2 years': [
    { id: 'tantrum', name: 'Tantrum Taming', topic: 'Tantrum Taming', description: 'Managing big emotions', icon: Heart, color: COLORS.coral, emoji: '😤' },
    { id: 'picky', name: 'Picky Eating', topic: 'Picky Eating Solutions', description: 'Making mealtimes easier', icon: Heart, color: COLORS.green, emoji: '🥦' },
    { id: 'sleep', name: 'Sleep Transitions', topic: 'Sleep Transition Support', description: 'Nap & bedtime help', icon: Sun, color: COLORS.purple, emoji: '😴' },
    { id: 'independent', name: 'Independent Play', topic: 'Independent Play Building', description: 'Building solo play skills', icon: Lightbulb, color: COLORS.gold, emoji: '🧸' },
  ],
  '2-3 years': [
    { id: 'tantrum', name: 'Meltdown Recovery', topic: 'Tantrum & Meltdown Recovery', description: 'Calming strategies that work', icon: Heart, color: COLORS.coral, emoji: '😤' },
    { id: 'potty', name: 'Potty Training', topic: 'Potty Training Support', description: 'Gentle, child-led approach', icon: Star, color: COLORS.green, emoji: '🚽' },
    { id: 'power', name: 'Power Struggles', topic: 'Power Struggle Solutions', description: 'Navigating the "no" phase', icon: Heart, color: COLORS.purple, emoji: '💪' },
    { id: 'fear', name: 'Fears & Anxiety', topic: 'Fear & Anxiety Support', description: 'Helping with new fears', icon: Heart, color: COLORS.gold, emoji: '🫂' },
  ],
  '3-4 years': [
    { id: 'preschool', name: 'Preschool Prep', topic: 'Preschool Transition Support', description: 'Getting ready for school', icon: BookOpen, color: COLORS.purple, emoji: '🎒' },
    { id: 'whining', name: 'Whining & Negotiating', topic: 'Whining & Negotiation Fatigue', description: 'Breaking the cycle', icon: Heart, color: COLORS.coral, emoji: '😩' },
    { id: 'fear', name: 'Fears & Nightmares', topic: 'Fear & Nightmare Management', description: 'Managing big imaginations', icon: Sun, color: COLORS.gold, emoji: '👻' },
    { id: 'sibling', name: 'Sibling Conflicts', topic: 'Sibling Conflict Resolution', description: 'Peace in the family', icon: Heart, color: COLORS.green, emoji: '👫' },
  ],
};

// Fallback for unknown age bands
const DEFAULT_LIFESAVERS = LIFESAVERS_BY_AGE['1-2 years'];

const RECENT_SEARCHES = ['sensory play', 'paper crafts', 'fine motor'];


// ============================================================
// CATEGORY SECTION COMPONENT
// ============================================================

const CategorySection = ({ category, isPremium, showPremiumBadge = false, onItemClick, onSeeAll, onShowPaywall }) => {
  const SectionIcon = category.icon;
  
  const handleItemClick = (item, index) => {
    const itemLocked = !isPremium && index >= category.freeCount;
    if (itemLocked) {
      if (onShowPaywall) onShowPaywall();
    } else {
      if (onItemClick) onItemClick(category, item);
    }
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
            style={{ background: `${category.color}15` }}
          >
            <SectionIcon size={22} style={{ color: category.color }} />
          </div>
          <h3 className="text-lg font-black" style={{ color: COLORS.text }}>{category.name}</h3>
          {showPremiumBadge && (
            <span 
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold"
              style={{ background: COLORS.goldLight, color: '#92400E' }}
            >
              <Crown size={12} fill="#92400E" />
            </span>
          )}
        </div>
        <button 
          onClick={() => onSeeAll && onSeeAll(category)}
          className="flex items-center gap-1 text-sm font-bold"
          style={{ color: category.color }}
        >
          See all <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {category.items.map((item, i) => {
          const itemLocked = !isPremium && i >= category.freeCount;
          return (
            <button 
              key={item.name}
              onClick={() => handleItemClick(item, i)}
              className="flex-shrink-0 w-32 rounded-2xl overflow-hidden shadow-lg transition-transform active:scale-95"
              style={{ 
                background: '#fff', 
                border: `3px solid ${itemLocked ? '#E5E5E5' : category.color}`,
                opacity: itemLocked ? 0.8 : 1
              }}
            >
              <div className="h-1.5" style={{ background: itemLocked ? '#E5E5E5' : category.color }} />
              
              <div className="relative h-20 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                  style={{ filter: itemLocked ? 'blur(3px) grayscale(50%)' : 'none' }}
                />
                {itemLocked && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: COLORS.gold }}
                    >
                      <Lock size={18} style={{ color: COLORS.purple }} />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-2.5">
                <p 
                  className="text-sm font-bold text-center"
                  style={{ color: itemLocked ? '#999' : COLORS.text }}
                >
                  {item.name}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};


// ============================================================
// MAIN DISCOVER SCREEN
// ============================================================

const DiscoverScreen = ({ 
  isPremium = false,
  profile = {},
  activitiesData = [],
  allActivities = [],
  onSelectTopic,
  onSelectActivity,
  onShowPaywall,
  onNavigateToLabs,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryClick = (section, item) => {
    if (onSelectTopic) {
      // Route based on what type of filter the item needs
      if (item.topic) {
        // Direct topic match (Skills category items)
        onSelectTopic(item.topic);
      } else if (item.keyword) {
        // Keyword search (Fundamentals category items like Colors, Numbers)
        onSelectTopic(`keyword:${item.keyword}`);
      } else {
        // Fallback to material search (for Everyday Items if re-added)
        onSelectTopic(`material:${item.name}`);
      }
    }
  };

  const handleLabsClick = () => {
    if (onNavigateToLabs) {
      onNavigateToLabs();
    }
  };

  // Search functionality - filter activities based on query
  const searchResults = searchQuery.length >= 2 ? allActivities.filter(a => {
    const query = searchQuery.toLowerCase();
    // Match age band first
    if (a.age_band !== profile.ageBand) return false;
    // Search in title, topic, household_items, what_to_do
    return (
      a.title?.toLowerCase().includes(query) ||
      a.topic?.toLowerCase().includes(query) ||
      a.household_items?.some(h => h.toLowerCase().includes(query)) ||
      a.what_to_do?.toLowerCase().includes(query)
    );
  }).slice(0, 12) : [];

  const handleSearchResultClick = (activity) => {
    if ((activity.tier === 'premium' || activity.isPremium) && !isPremium) {
      onShowPaywall?.();
    } else {
      onSelectActivity?.(activity);
    }
  };

  return (
    <div 
      className="min-h-screen pb-24"
      style={{ 
        background: `linear-gradient(180deg, ${COLORS.cream} 0%, #FFF5E6 100%)`,
        fontFamily: "system-ui, -apple-system, sans-serif"
      }}
    >
      {/* HEADER */}
      <div className="px-5 pt-4 pb-2">
        <h1 className="text-2xl font-black mb-4" style={{ color: COLORS.purple }}>Discover</h1>

        <div 
          className="flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-md"
          style={{ background: '#fff', border: `3px solid ${COLORS.purple}40` }}
        >
          <Search size={22} style={{ color: COLORS.purple }} />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activities, materials, skills..."
            className="flex-1 outline-none text-base"
            style={{ color: COLORS.text }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')}>
              <X size={20} style={{ color: COLORS.textLight }} />
            </button>
          )}
        </div>

        {!searchQuery && (
          <div className="flex gap-2 mt-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            <span className="text-xs font-medium py-1 flex-shrink-0" style={{ color: COLORS.textLight }}>Recent:</span>
            {RECENT_SEARCHES.map((term) => (
              <button 
                key={term}
                onClick={() => setSearchQuery(term)}
                className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                style={{ background: COLORS.purplePale, color: COLORS.purple }}
              >
                {term}
              </button>
            ))}
          </div>
        )}

        {/* Search Results */}
        {searchQuery.length >= 2 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-3" style={{ color: COLORS.textLight }}>
              {searchResults.length} results for "{searchQuery}"
            </p>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {searchResults.map((activity) => {
                  const isLocked = (activity.tier === 'premium' || activity.isPremium) && !isPremium;
                  return (
                    <button 
                      key={activity.id}
                      onClick={() => handleSearchResultClick(activity)}
                      className="rounded-xl overflow-hidden shadow-md text-left"
                      style={{ background: '#fff', border: `2px solid ${isLocked ? '#E5E5E5' : COLORS.purple}` }}
                    >
                      <div className="h-20 bg-gray-100 relative">
                        <img 
                          src={`https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300&h=200&fit=crop`}
                          alt={activity.title}
                          className="w-full h-full object-cover"
                          style={{ filter: isLocked ? 'blur(2px) grayscale(30%)' : 'none' }}
                        />
                        {isLocked && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <Lock size={20} style={{ color: '#fff' }} />
                          </div>
                        )}
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-medium truncate" style={{ color: COLORS.purple }}>{activity.topic}</p>
                        <p className="text-sm font-bold truncate" style={{ color: COLORS.text }}>{activity.title}</p>
                        <p className="text-xs" style={{ color: COLORS.textLight }}>{activity.duration}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-4xl mb-2">🔍</p>
                <p className="font-medium" style={{ color: COLORS.text }}>No activities found</p>
                <p className="text-sm" style={{ color: COLORS.textLight }}>Try a different search term</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Only show rest of content when not searching */}
      {searchQuery.length < 2 && (
        <>
      {/* MOOSHIE LABS */}
      <div className="px-5 py-4">
        <button 
          onClick={handleLabsClick}
          className="w-full rounded-3xl overflow-hidden shadow-xl relative"
          style={{ border: `4px solid ${COLORS.gold}` }}
        >
          <div 
            className="absolute -bottom-2 left-2 right-2 h-full rounded-3xl -z-10"
            style={{ background: COLORS.purple }}
          />
          
          <div 
            className="h-28 flex items-center px-5 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.purpleLight} 100%)` }}
          >
            <Sparkles className="absolute top-4 right-4 opacity-20 text-white" size={40} />
            <Star className="absolute bottom-4 right-12 opacity-15 text-white" size={24} fill="white" />
            
            <div className="flex-1 relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <FlaskConical size={18} className="text-white" />
                <span 
                  className="px-2 py-0.5 rounded text-xs font-bold"
                  style={{ background: COLORS.gold, color: COLORS.purple }}
                >
                  Premium
                </span>
              </div>
              <h3 className="text-white text-lg font-black mb-0.5">Mooshie Labs</h3>
              <p className="text-white/70 text-xs">Parent-submitted ideas</p>
            </div>
            
            <ChevronRight size={28} className="text-white/70" />
          </div>
        </button>
      </div>

      {/* CORE CATEGORIES */}
      <div className="px-5 space-y-6">
        {CORE_CATEGORIES.map((category) => (
          <CategorySection 
            key={category.id} 
            category={category} 
            isPremium={isPremium}
            showPremiumBadge={false}
            onItemClick={handleCategoryClick}
            onSeeAll={(cat) => onSelectTopic && onSelectTopic(`category:${cat.id}`)}
            onShowPaywall={onShowPaywall}
          />
        ))}
      </div>

      {/* NEW THIS MONTH */}
      <div className="px-5 py-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
              style={{ background: COLORS.coralLight }}
            >
              <Calendar size={22} style={{ color: COLORS.coral }} />
            </div>
            <h2 className="text-lg font-black" style={{ color: COLORS.text }}>New This Month</h2>
          </div>
          <button 
            className="flex items-center gap-1 text-sm font-bold"
            style={{ color: COLORS.coral }}
          >
            See all <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {NEW_THIS_MONTH.map((activity) => {
            const isLocked = activity.isPremium && !isPremium;
            
            return (
              <button 
                key={activity.id}
                className="rounded-2xl overflow-hidden shadow-lg text-left relative"
                style={{ background: '#fff', border: `3px solid ${isLocked ? '#E5E5E5' : COLORS.coral}` }}
              >
                <div className="relative h-24 overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full h-full object-cover"
                    style={{ filter: isLocked ? 'blur(3px) grayscale(50%)' : 'none' }}
                  />
                  <div 
                    className="absolute inset-0"
                    style={{ background: isLocked ? 'rgba(0,0,0,0.4)' : 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }}
                  />
                  
                  <div className="absolute top-2 left-2">
                    <span 
                      className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-bold"
                      style={{ background: isLocked ? '#999' : COLORS.coral, color: '#fff' }}
                    >
                      <Sparkles size={8} />
                      NEW
                    </span>
                  </div>
                  
                  {activity.isPremium && (
                    <div className="absolute top-2 right-2">
                      <Crown size={14} style={{ color: COLORS.gold }} fill={COLORS.gold} />
                    </div>
                  )}
                  
                  {isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: COLORS.gold }}
                      >
                        <Lock size={18} style={{ color: COLORS.purple }} />
                      </div>
                    </div>
                  )}
                  
                  {!isLocked && (
                    <div className="absolute bottom-2 right-2">
                      <span 
                        className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-bold"
                        style={{ background: 'rgba(255,255,255,0.95)', color: COLORS.text }}
                      >
                        <Clock size={8} />
                        {activity.duration}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-2.5">
                  <p className="text-xs font-bold mb-0.5" style={{ color: isLocked ? '#999' : COLORS.coral }}>
                    {activity.topic}
                  </p>
                  <p className="text-sm font-black leading-tight" style={{ color: isLocked ? '#999' : COLORS.text }}>
                    {activity.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* LIFESAVERS - Age-Appropriate Parent Support */}
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
              style={{ background: '#FEE2E2' }}
            >
              <Heart size={22} style={{ color: '#EF4444' }} fill="#EF4444" />
            </div>
            <div>
              <h2 className="text-lg font-black" style={{ color: COLORS.text }}>Lifesavers</h2>
              <p className="text-xs" style={{ color: COLORS.textLight }}>Help for tough moments</p>
            </div>
          </div>
          <button
            className="flex items-center gap-1 text-sm font-bold"
            style={{ color: '#EF4444' }}
          >
            See all <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {(LIFESAVERS_BY_AGE[profile?.ageBand] || DEFAULT_LIFESAVERS).map((lifesaver) => {
            const LifesaverIcon = lifesaver.icon;

            return (
              <button
                key={lifesaver.id}
                onClick={() => onSelectTopic && onSelectTopic(lifesaver.topic)}
                className="rounded-2xl overflow-hidden shadow-lg text-left relative transition-transform active:scale-95"
                style={{ background: '#fff', border: `3px solid ${lifesaver.color}` }}
              >
                <div
                  className="h-16 flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${lifesaver.color}20 0%, ${lifesaver.color}40 100%)` }}
                >
                  <span className="text-3xl">{lifesaver.emoji}</span>
                </div>

                <div className="p-2.5">
                  <p className="text-sm font-black mb-0.5" style={{ color: COLORS.text }}>
                    {lifesaver.name}
                  </p>
                  <p className="text-xs leading-tight" style={{ color: COLORS.textLight }}>
                    {lifesaver.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* PREMIUM CATEGORIES */}
      <div className="px-5 space-y-6">
        {PREMIUM_CATEGORIES.map((category) => (
          <CategorySection 
            key={category.id} 
            category={category} 
            isPremium={isPremium}
            showPremiumBadge={true}
            onItemClick={handleCategoryClick}
            onSeeAll={(cat) => onSelectTopic && onSelectTopic(`category:${cat.id}`)}
            onShowPaywall={onShowPaywall}
          />
        ))}
      </div>
        </>
      )}

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};


// ============================================================
// PREVIEW
// ============================================================

const DiscoverPreview = () => {
  const [isPremium, setIsPremium] = useState(false);

  return (
    <div className="flex flex-col items-center p-4 md:p-8 min-h-screen" style={{ background: '#0F0F1A' }}>
      <h1 className="text-xl md:text-2xl font-bold text-white mb-2 text-center">Discover - Final</h1>
      <p className="text-gray-400 mb-4 text-sm text-center">Clean: no counts, 4 collections</p>
      
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setIsPremium(false)}
          className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
            !isPremium ? 'bg-white text-gray-900 shadow-lg' : 'bg-white/10 text-white/70'
          }`}
        >
          Free User
        </button>
        <button
          onClick={() => setIsPremium(true)}
          className={`px-4 py-2 rounded-full font-medium transition-all text-sm flex items-center gap-2 ${
            isPremium ? 'bg-yellow-400 text-gray-900 shadow-lg' : 'bg-white/10 text-white/70'
          }`}
        >
          <Crown size={16} /> Premium
        </button>
      </div>

      <div 
        className="relative rounded-[2rem] md:rounded-[3rem] p-2 md:p-3 shadow-2xl w-full max-w-[340px] md:max-w-[390px]"
        style={{ background: 'linear-gradient(145deg, #2d2d3a 0%, #1a1a2e 100%)' }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-5 md:h-7 bg-black rounded-b-xl md:rounded-b-2xl z-20"></div>
        
        <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-white" style={{ height: '700px' }}>
          <div className="h-full overflow-y-auto">
            <DiscoverScreen isPremium={isPremium} />
          </div>
        </div>
      </div>

      <div className="mt-6 max-w-md w-full">
        <p className="text-white/60 text-xs text-center mb-3">Structure:</p>
        <div className="bg-white/5 rounded-lg p-3 text-xs space-y-1">
          <p className="text-white/70">1. Search</p>
          <p className="text-white/70">2. Mooshie Labs</p>
          <p className="text-white/70">3. Everyday Items</p>
          <p className="text-white/70">4. Skills</p>
          <p className="text-white/70">5. Fundamentals</p>
          <p className="text-white/70">6. New This Month</p>
          <p className="text-white/70">7. Collections (Kindness, Summer, Montessori, Imagination)</p>
          <p className="text-white/70">8. Toys → Making Things → Verbal Games → Conversations → Travel Pack</p>
        </div>
      </div>
    </div>
  );
};

export default DiscoverScreen;
