// TopicBrowseScreen - Magical Toybox Style (Updated)
// Better back button + interleaved open/locked pattern

import React, { useState } from 'react';
import { 
  ChevronLeft,
  Clock,
  Droplets,
  Crown,
  Lock,
  Heart,
  Sparkles,
  FileText,
  Users,
  User
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

// Sample activities - INTERLEAVED pattern (Open, Open, Open+Locked, Open+Locked)
const SAMPLE_ACTIVITIES = [
  // Row 1: Open, Open
  {
    id: '1',
    title: 'Rainbow Rice Sensory Bin',
    topic: 'Sensory Play',
    duration: '15 min',
    mess: 'Messy',
    supervision: 'with-me',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=300&fit=crop',
    isPremium: false,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Paper Plate Masks',
    topic: 'Fine Motor',
    duration: '20 min',
    mess: 'Low',
    supervision: 'with-me',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=300&fit=crop',
    isPremium: false,
  },
  {
    id: '3',
    title: 'Crumple & Throw',
    topic: 'Gross Motor',
    duration: '10 min',
    mess: 'Clean',
    supervision: 'independent',
    image: 'https://images.unsplash.com/photo-1517697471339-4aa32003c11a?w=400&h=300&fit=crop',
    isPremium: false,
  },
  // Row 2: Open, Locked
  {
    id: '4',
    title: 'Paper Airplane Fun',
    topic: 'Science',
    duration: '15 min',
    mess: 'Clean',
    supervision: 'with-me',
    image: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?w=400&h=300&fit=crop',
    isPremium: true,
  },
  {
    id: '5',
    title: 'Paper Tearing Art',
    topic: 'Fine Motor',
    duration: '15 min',
    mess: 'Low',
    supervision: 'independent',
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=300&fit=crop',
    isPremium: false,
  },
  // Row 3: Open, Locked
  {
    id: '6',
    title: 'Tissue Paper Collage',
    topic: 'Art',
    duration: '20 min',
    mess: 'Messy',
    supervision: 'with-me',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop',
    isPremium: true,
  },
  {
    id: '7',
    title: 'Confetti Shaker',
    topic: 'Sensory Play',
    duration: '10 min',
    mess: 'Low',
    supervision: 'independent',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop',
    isPremium: false,
  },
  // Row 4: Open, Locked
  {
    id: '8',
    title: 'Paper Ball Basketball',
    topic: 'Gross Motor',
    duration: '10 min',
    mess: 'Clean',
    supervision: 'with-me',
    image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=400&h=300&fit=crop',
    isPremium: true,
  },
];

// Category data
const CATEGORY_INFO = {
  name: 'Paper',
  parentCategory: 'Everyday Items', // For back button
  icon: FileText,
  color: COLORS.purple,
  description: 'Simple activities using paper you have at home',
};


// ============================================================
// MAIN TOPIC BROWSE SCREEN
// ============================================================

// Activity images by topic (fallback) - expanded
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
  'default': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=400&fit=crop',
};

// Get image for activity - uses generated SVG illustrations
const getActivityImage = (activity) => {
  // Use generated illustration based on activity ID
  if (activity.id) {
    return `/illustrations/${activity.id}.svg`;
  }

  // Fallback to topic-based images if no ID
  if (TOPIC_IMAGES[activity.topic]) return TOPIC_IMAGES[activity.topic];
  return TOPIC_IMAGES['default'];
};

// Transform activity to add missing fields
const transformActivity = (activity) => ({
  ...activity,
  image: getActivityImage(activity),
  mess_level: activity.mess_level || 'Low mess',
  duration: activity.duration || activity.activity_time || '15 min',
  materials: activity.materials || activity.household_items || [],
});

const TopicBrowseScreen = ({ 
  category = CATEGORY_INFO, 
  activities = SAMPLE_ACTIVITIES,
  isPremium = false,
  selectedTopic,
  profile = {},
  activitiesData = [],
  allActivities = [],
  activityData = { favorites: [] },
  onSelectActivity,
  onBack,
  onShowPaywall,
  onToggleFavorite,
}) => {
  // Use real favorites from activityData
  const favorites = activityData.favorites || [];
  
  // Dynamic category based on selectedTopic
  const dynamicCategory = selectedTopic ? {
    ...category,
    name: selectedTopic.startsWith('material:') 
      ? selectedTopic.replace('material:', '') 
      : selectedTopic.startsWith('category:')
        ? selectedTopic.replace('category:', '').replace(/-/g, ' ')
        : selectedTopic,
    description: `Activities for ${profile.childName || 'your little one'}`,
    parentCategory: 'Discover',
  } : category;
  
  const CategoryIcon = dynamicCategory.icon;

  const toggleFavorite = (id) => {
    if (onToggleFavorite) onToggleFavorite(id);
  };

  const handleActivityClick = (activity) => {
    if (onSelectActivity) onSelectActivity(activity);
  };

  const handleBack = () => {
    if (onBack) onBack();
  };

  // Mapping from category IDs to search criteria
  const CATEGORY_SEARCH_MAP = {
    // Everyday Items - search in household_items and title
    'everyday': { searchFields: ['household_items', 'title'], keywords: ['paper', 'water', 'cup', 'box', 'spoon', 'bowl', 'towel', 'container'] },
    // Skills - search by topic
    'skills': { topics: ['Gross Motor', 'Fine Motor', 'Language & Storytelling', 'Music & Rhythm', 'Social & Emotional'] },
    // Fundamentals - search by topic or keywords
    'fundamentals': { topics: ['Math & Logic', 'Science & Physics'], keywords: ['color', 'number', 'letter', 'shape', 'count'] },
    // Toys - search by section
    'toys': { sections: ['Toys (Premium)'] },
    // Crafts
    'crafts': { sections: ['Crafts (Premium)'] },
    // DIY
    'diy': { topics: ['DIY Toy Lab'] },
    // Seasonal
    'seasonal': { topics: ['Seasonal'] },
    // Sensory
    'sensory': { topics: ['Sensory Exploration', 'Sensory Scientist'] },
    // Outdoor
    'outdoor': { sections: ['Outdoor (Premium)'] },
    // Family
    'family': { topics: ['Social & Emotional'] },
    // Montessori
    'montessori': { searchFields: ['title', 'what_to_do'], keywords: ['montessori'] },
    // Imagination
    'imagination': { topics: ['Social & Emotional'], keywords: ['pretend', 'imagination', 'creative'] },
  };

  // FREE_ACTIVITY_LIMIT per age group per category
  const FREE_ACTIVITY_LIMIT = 8;

  // Filter activities by selectedTopic if provided - use allActivities
  const rawFilteredActivities = selectedTopic && allActivities.length > 0
    ? allActivities.filter(a => {
        // Must match age band
        if (a.age_band !== profile.ageBand) return false;

        if (selectedTopic.startsWith('material:')) {
          const materialName = selectedTopic.replace('material:', '').toLowerCase();
          return (
            a.household_items?.some(h => h.toLowerCase().includes(materialName)) ||
            a.title?.toLowerCase().includes(materialName)
          );
        }

        if (selectedTopic.startsWith('keyword:')) {
          // Keyword search - search in title, what_to_do, and household_items
          const keyword = selectedTopic.replace('keyword:', '').toLowerCase();
          return (
            a.title?.toLowerCase().includes(keyword) ||
            a.what_to_do?.toLowerCase().includes(keyword) ||
            a.topic?.toLowerCase().includes(keyword) ||
            a.household_items?.some(h => h.toLowerCase().includes(keyword))
          );
        }

        if (selectedTopic.startsWith('category:')) {
          const catId = selectedTopic.replace('category:', '');
          const searchCriteria = CATEGORY_SEARCH_MAP[catId];

          if (!searchCriteria) {
            // Fallback: try to match topic name
            return a.topic?.toLowerCase().includes(catId);
          }

          // Check topics
          if (searchCriteria.topics && searchCriteria.topics.includes(a.topic)) {
            return true;
          }

          // Check sections
          if (searchCriteria.sections && searchCriteria.sections.some(s => a.section?.includes(s))) {
            return true;
          }

          // Check keywords in specified fields
          if (searchCriteria.keywords) {
            const fields = searchCriteria.searchFields || ['household_items', 'title', 'what_to_do'];
            for (const keyword of searchCriteria.keywords) {
              for (const field of fields) {
                const value = a[field];
                if (Array.isArray(value)) {
                  if (value.some(v => v.toLowerCase().includes(keyword))) return true;
                } else if (typeof value === 'string') {
                  if (value.toLowerCase().includes(keyword)) return true;
                }
              }
            }
          }

          return false;
        }

        // Direct topic match
        return a.topic === selectedTopic;
      })
    : activities;

  // Apply 8 activity limit - mark activities beyond limit as locked for free users
  const limitedActivities = rawFilteredActivities.map((activity, index) => {
    // If user is not premium and this is beyond the 8 free activities, mark as locked
    if (!isPremium && index >= FREE_ACTIVITY_LIMIT && !activity.isPremium && activity.tier !== 'premium') {
      return { ...activity, isOverLimit: true };
    }
    return activity;
  });

  // Transform activities to add missing fields
  const filteredActivities = limitedActivities.map(transformActivity);

  // Separate featured activity
  const featuredActivity = filteredActivities.find(a => a.isFeatured) || filteredActivities[0];
  const regularActivities = filteredActivities.filter(a => a.id !== featuredActivity?.id);

  return (
    <div 
      className="min-h-screen pb-24"
      style={{ 
        background: `linear-gradient(180deg, ${COLORS.cream} 0%, #FFF5E6 100%)`,
        fontFamily: "system-ui, -apple-system, sans-serif"
      }}
    >
      {/* ===== HEADER ===== */}
      <div 
        className="px-5 pt-4 pb-5 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${dynamicCategory.color}15 0%, ${dynamicCategory.color}05 100%)` }}
      >
        {/* Back Button - Shows parent category */}
        <button 
          onClick={handleBack}
          className="flex items-center gap-1 mb-4 font-bold text-sm"
          style={{ color: dynamicCategory.color }}
        >
          <ChevronLeft size={20} />
          {dynamicCategory.parentCategory || 'Back'}
        </button>

        {/* Category Info */}
        <div className="flex items-center gap-3">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
            style={{ background: '#fff', border: `3px solid ${dynamicCategory.color}` }}
          >
            <CategoryIcon size={28} style={{ color: dynamicCategory.color }} />
          </div>
          <div>
            <h1 className="text-2xl font-black" style={{ color: COLORS.text }}>
              {dynamicCategory.name}
            </h1>
            <p className="text-sm" style={{ color: COLORS.textLight }}>
              {dynamicCategory.description}
            </p>
          </div>
        </div>

        {/* Decorative element */}
        <div 
          className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10"
          style={{ background: dynamicCategory.color }}
        />
      </div>

      {/* ===== FEATURED ACTIVITY ===== */}
      {featuredActivity && (
        <div className="px-5 py-4">
          <FeaturedActivityCard 
            activity={featuredActivity}
            categoryColor={dynamicCategory.color}
            isPremium={isPremium}
            isFavorited={favorites.includes(featuredActivity.id)}
            onToggleFavorite={() => toggleFavorite(featuredActivity.id)}
          />
        </div>
      )}

      {/* ===== ACTIVITY GRID ===== */}
      <div className="px-5">
        <div className="grid grid-cols-2 gap-3">
          {regularActivities.map((activity) => {
            // Lock if premium activity OR if over the 8 free limit
            const isLocked = ((activity.isPremium || activity.tier === 'premium') && !isPremium) || activity.isOverLimit;
            const isFavorited = favorites.includes(activity.id);

            return (
              <ActivityCard
                key={activity.id}
                activity={activity}
                categoryColor={dynamicCategory.color}
                isLocked={isLocked}
                isOverLimit={activity.isOverLimit}
                isFavorited={isFavorited}
                onToggleFavorite={() => toggleFavorite(activity.id)}
                onClick={handleActivityClick}
                onShowPaywall={onShowPaywall}
              />
            );
          })}
        </div>
      </div>

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};


// ============================================================
// FEATURED ACTIVITY CARD (Larger, hero style)
// ============================================================

const FeaturedActivityCard = ({ 
  activity, 
  categoryColor, 
  isPremium,
  isFavorited, 
  onToggleFavorite,
  onClick,
  onShowPaywall,
}) => {
  const isLocked = (activity?.isPremium || activity?.tier === 'premium') && !isPremium;

  const handleClick = () => {
    if (isLocked) {
      if (onShowPaywall) onShowPaywall();
    } else {
      if (onClick) onClick(activity);
    }
  };

  if (!activity) return null;

  return (
    <button 
      onClick={handleClick}
      className="w-full rounded-3xl overflow-hidden shadow-xl relative text-left"
      style={{ background: '#fff', border: `4px solid ${isLocked ? '#E5E5E5' : categoryColor}` }}
    >
      {/* Stacked effect */}
      <div 
        className="absolute -bottom-2 left-2 right-2 h-full rounded-3xl -z-10"
        style={{ background: COLORS.coral }}
      />

      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img 
          src={activity.image} 
          alt={activity.title}
          className="w-full h-full object-cover"
          style={{ filter: isLocked ? 'blur(3px) grayscale(50%)' : 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Favorite button */}
        {!isLocked && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
            className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90"
            style={{ background: '#fff' }}
          >
            <Heart 
              size={20} 
              style={{ color: COLORS.coral }}
              fill={isFavorited ? COLORS.coral : 'none'}
            />
          </button>
        )}

        {/* Featured badge */}
        <div className="absolute top-3 left-3">
          <span 
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold"
            style={{ background: COLORS.gold, color: COLORS.purple }}
          >
            <Sparkles size={10} />
            Featured
          </span>
        </div>

        {/* Premium badge */}
        {activity.isPremium && (
          <div className="absolute top-3 right-16">
            <Crown size={18} style={{ color: COLORS.gold }} fill={COLORS.gold} />
          </div>
        )}

        {/* Lock overlay */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: COLORS.gold }}
            >
              <Lock size={28} style={{ color: COLORS.purple }} />
            </div>
          </div>
        )}

        {/* Title + badges overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-xs font-bold text-white/80 mb-1">{activity.topic}</p>
          <h2 className="text-xl font-black text-white drop-shadow-lg mb-2">
            {activity.title}
          </h2>
          <div className="flex gap-2">
            <span 
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold"
              style={{ background: 'rgba(255,255,255,0.95)', color: COLORS.text }}
            >
              <Clock size={10} /> {activity.duration}
            </span>
            <span 
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold"
              style={{ background: 'rgba(255,255,255,0.95)', color: COLORS.text }}
            >
              <Droplets size={10} /> {activity.mess}
            </span>
            <span 
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold"
              style={{ background: 'rgba(255,255,255,0.95)', color: COLORS.text }}
            >
              {activity.supervision === 'independent' ? <User size={10} /> : <Users size={10} />}
              {activity.supervision === 'independent' ? 'Solo' : 'With Me'}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};


// ============================================================
// ACTIVITY CARD (Grid item)
// ============================================================

const ActivityCard = ({
  activity,
  categoryColor,
  isLocked,
  isOverLimit = false,
  isFavorited,
  onToggleFavorite,
  onClick,
  onShowPaywall,
}) => {
  const handleClick = () => {
    if (isLocked) {
      if (onShowPaywall) onShowPaywall();
    } else {
      if (onClick) onClick(activity);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-2xl overflow-hidden shadow-lg text-left relative transition-transform active:scale-95"
      style={{
        background: '#fff',
        border: `3px solid ${isLocked ? '#E5E5E5' : categoryColor}`,
      }}
    >
      {/* Color accent bar */}
      <div
        className="h-1.5"
        style={{ background: isLocked ? '#E5E5E5' : categoryColor }}
      />

      {/* Image */}
      <div className="relative h-24 overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover"
          style={{ filter: isLocked ? 'blur(4px) grayscale(50%)' : 'none' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: isLocked ? 'rgba(0,0,0,0.4)' : 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)' }}
        />

        {/* Favorite button */}
        {!isLocked && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
            className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow transition-transform active:scale-90"
            style={{ background: '#fff' }}
          >
            <Heart
              size={14}
              style={{ color: COLORS.coral }}
              fill={isFavorited ? COLORS.coral : 'none'}
            />
          </button>
        )}

        {/* Premium crown */}
        {(activity.isPremium || activity.tier === 'premium') && (
          <div className="absolute top-2 left-2">
            <Crown size={14} style={{ color: COLORS.gold }} fill={COLORS.gold} />
          </div>
        )}

        {/* Lock overlay */}
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

        {/* Duration badge */}
        {!isLocked && (
          <div className="absolute bottom-2 right-2">
            <span
              className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-bold"
              style={{ background: 'rgba(255,255,255,0.95)', color: COLORS.text }}
            >
              <Clock size={8} /> {activity.duration}
            </span>
          </div>
        )}
      </div>

      {/* Content - always show title even when locked */}
      <div className="p-2.5">
        <p
          className="text-xs font-bold mb-0.5"
          style={{ color: isLocked ? '#999' : categoryColor }}
        >
          {activity.topic}
        </p>
        <p
          className="text-sm font-black leading-tight mb-1.5"
          style={{ color: isLocked ? '#666' : COLORS.text }}
        >
          {activity.title}
        </p>

        {/* Premium upgrade prompt for over-limit activities */}
        {isOverLimit && (
          <div className="flex items-center gap-1 mt-1">
            <Crown size={10} style={{ color: COLORS.gold }} fill={COLORS.gold} />
            <span className="text-xs font-bold" style={{ color: COLORS.gold }}>
              Upgrade to unlock
            </span>
          </div>
        )}

        {/* Meta badges - hide when locked */}
        {!isLocked && (
          <div className="flex gap-1.5">
            <span
              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium"
              style={{ background: `${categoryColor}15`, color: categoryColor }}
            >
              <Droplets size={8} /> {activity.mess}
            </span>
            <span
              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium"
              style={{ background: `${COLORS.coral}15`, color: COLORS.coral }}
            >
              {activity.supervision === 'independent' ? <User size={8} /> : <Users size={8} />}
              {activity.supervision === 'independent' ? 'Solo' : 'With Me'}
            </span>
          </div>
        )}
      </div>
    </button>
  );
};


// ============================================================
// PREVIEW CONTAINER
// ============================================================

const TopicBrowsePreview = () => {
  const [isPremium, setIsPremium] = useState(false);

  return (
    <div className="flex flex-col items-center p-4 md:p-8 min-h-screen" style={{ background: '#0F0F1A' }}>
      <h1 className="text-xl md:text-2xl font-bold text-white mb-2 text-center">Topic Browse - Updated</h1>
      <p className="text-gray-400 mb-4 text-sm text-center">Better back button + interleaved locks</p>
      
      {/* Premium toggle */}
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

      {/* Phone mockup */}
      <div 
        className="relative rounded-[2rem] md:rounded-[3rem] p-2 md:p-3 shadow-2xl w-full max-w-[340px] md:max-w-[390px]"
        style={{ background: 'linear-gradient(145deg, #2d2d3a 0%, #1a1a2e 100%)' }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-5 md:h-7 bg-black rounded-b-xl md:rounded-b-2xl z-20"></div>
        
        <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-white" style={{ height: '700px' }}>
          <div className="h-full overflow-y-auto">
            <TopicBrowseScreen isPremium={isPremium} />
          </div>
        </div>
      </div>

      {/* Updates */}
      <div className="mt-6 max-w-md w-full">
        <p className="text-white/60 text-xs text-center mb-3">Updates:</p>
        <div className="bg-white/5 rounded-lg p-3 text-xs space-y-2">
          <div className="flex items-center gap-2 text-green-400">
            <span>✓</span>
            <span>Back button shows parent: "← Everyday Items"</span>
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <span>✓</span>
            <span>Interleaved pattern: Open, Open, Open+Lock, Open+Lock</span>
          </div>
          <div className="flex items-center gap-2 text-white/50">
            <span>→</span>
            <span>No "wall of locks" - premium sprinkled throughout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicBrowseScreen;
