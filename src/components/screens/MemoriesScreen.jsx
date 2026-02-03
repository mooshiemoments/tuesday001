// MemoriesScreen - Final with "Do Again" Section
// Favorites at top, Journal progress, Timeline

import React, { useState } from 'react';
import { 
  BookOpen,
  ChevronRight,
  Sparkles,
  Calendar,
  MessageCircle,
  Heart,
  Trophy,
  Gift,
  PartyPopper,
  Clock,
  RotateCcw,
  Play
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

// Reaction options
const REACTIONS = {
  loved: { emoji: '😍', label: 'Loved it!', color: COLORS.coral },
  liked: { emoji: '😊', label: 'Liked it', color: COLORS.gold },
  meh: { emoji: '😐', label: 'Meh', color: COLORS.textLight },
  tough: { emoji: '🥴', label: 'Tough day', color: COLORS.purple },
};

// Topic colors
const TOPIC_COLORS = {
  'Sensory Play': '#20B2AA',
  'Fine Motor': COLORS.gold,
  'Gross Motor': COLORS.green,
  'Social & Emotional': '#5B8DEF',
  'Science': COLORS.purple,
  'Art': COLORS.coral,
  'Movement': COLORS.green,
  'Imagination': COLORS.purpleLight,
  'Life Skills': COLORS.coral,
};

// Sample journal entries
const SAMPLE_ENTRIES = [
  {
    id: '1',
    activityTitle: 'Rainbow Rice Sensory Bin',
    topic: 'Sensory Play',
    date: '2026-01-27',
    duration: '15 min',
    reaction: 'loved',
    reflection: 'She spent 30 minutes just pouring and scooping! Asked to do it again before bed. Pure concentration on her face.',
    doAgain: true,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300&h=200&fit=crop',
  },
  {
    id: '2',
    activityTitle: 'Paper Plate Masks',
    topic: 'Fine Motor',
    date: '2026-01-25',
    duration: '20 min',
    reaction: 'liked',
    reflection: 'Made a lion mask and roared at daddy when he came home! Didn\'t expect her to get so into character.',
    doAgain: true,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300&h=200&fit=crop',
  },
  {
    id: '3',
    activityTitle: 'Ball Rolling Fun',
    topic: 'Gross Motor',
    date: '2026-01-23',
    duration: '10 min',
    reaction: 'loved',
    reflection: 'Giggled non-stop. We\'re definitely doing this every day now.',
    doAgain: true,
    image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=300&h=200&fit=crop',
  },
  {
    id: '4',
    activityTitle: 'Mirror Faces',
    topic: 'Social & Emotional',
    date: '2026-01-20',
    duration: '10 min',
    reaction: 'liked',
    reflection: 'Laughed so hard at her silly faces. The way her eyes lit up seeing herself.',
    doAgain: false,
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=200&fit=crop',
  },
  {
    id: '5',
    activityTitle: 'Sorting Laundry',
    topic: 'Life Skills',
    date: '2026-01-18',
    duration: '15 min',
    reaction: 'meh',
    reflection: 'She was more interested in wearing the socks as gloves. Still cute though!',
    doAgain: false,
    image: 'https://images.unsplash.com/photo-1517697471339-4aa32003c11a?w=300&h=200&fit=crop',
  },
];

// Sample stats
const SAMPLE_STATS = {
  totalEntries: 12,
  topicsExplored: ['Sensory Play', 'Fine Motor', 'Gross Motor', 'Social & Emotional'],
};

// Reflection Journal requirements
const JOURNAL_REQUIREMENTS = {
  minActivities: 20,
  minTopics: 4,
};


// ============================================================
// MAIN MEMORIES SCREEN
// ============================================================

const MemoriesScreen = ({ 
  entries = SAMPLE_ENTRIES,
  stats = SAMPLE_STATS,
  childName = 'Your little one',
  profile = {},
  memories = {},
  activityData = { completed: [], favorites: [] },
  activitiesData = [],
  isPremium = false,
  onShowPaywall,
  onSelectActivity,
  allActivities = [],
}) => {
  // Use real child name from profile
  const displayName = profile.childName || childName;
  
  // Transform memories object to entries array format
  const realEntries = Object.values(memories || {}).map(m => ({
    id: m.activityId,
    activityTitle: m.activityTitle || 'Activity',
    topic: m.topic || 'Activity',
    date: m.date || new Date().toISOString(),
    rating: m.reaction === '😍' ? 5 : m.reaction === '😊' ? 4 : m.reaction === '😐' ? 3 : m.reaction === '😫' ? 2 : 4,
    note: m.memory || m.note,
    photo: m.photo,
    doAgain: m.reaction === '😍' || m.reaction === '😊',
    duration: '15 min',
    messLevel: 'Low',
  }));
  
  // Use real entries if available, otherwise sample
  const displayEntries = realEntries.length > 0 ? realEntries : entries;
  
  // Calculate real stats
  const realStats = {
    totalEntries: realEntries.length || stats.totalEntries,
    topicsExplored: [...new Set(realEntries.map(e => e.topic))],
    currentStreak: stats.currentStreak || 3,
    longestStreak: stats.longestStreak || 5,
  };
  
  const displayStats = realEntries.length > 0 ? realStats : stats;

  const [expandedEntry, setExpandedEntry] = useState(null);
  const [favorites, setFavorites] = useState(
    displayEntries.filter(e => e.doAgain).map(e => e.id)
  );

  // Toggle favorite
  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Get favorited activities
  const favoritedActivities = displayEntries.filter(e => favorites.includes(e.id));

  // Progress calculations
  const activitiesProgress = Math.min(100, (displayStats.totalEntries / JOURNAL_REQUIREMENTS.minActivities) * 100);
  const topicsProgress = Math.min(100, (displayStats.topicsExplored.length / JOURNAL_REQUIREMENTS.minTopics) * 100);
  const journalReady = displayStats.totalEntries >= JOURNAL_REQUIREMENTS.minActivities && 
                       displayStats.topicsExplored.length >= JOURNAL_REQUIREMENTS.minTopics;

  // Group entries by date
  const groupedEntries = displayEntries.reduce((groups, entry) => {
    const date = new Date(entry.date);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    let group;
    if (diffDays === 0) group = 'Today';
    else if (diffDays === 1) group = 'Yesterday';
    else if (diffDays < 7) group = 'This Week';
    else if (diffDays < 30) group = 'This Month';
    else group = 'Earlier';
    
    if (!groups[group]) groups[group] = [];
    groups[group].push(entry);
    return groups;
  }, {});

  return (
    <div 
      className="min-h-screen pb-24"
      style={{ 
        background: `linear-gradient(180deg, ${COLORS.cream} 0%, #FFF5E6 100%)`,
        fontFamily: "system-ui, -apple-system, sans-serif"
      }}
    >
      {/* ===== HEADER ===== */}
      <div className="px-5 pt-4 pb-2">
        <h1 className="text-2xl font-black mb-1" style={{ color: COLORS.purple }}>
          Memories
        </h1>
        <p className="text-sm" style={{ color: COLORS.textLight }}>
          {displayName}'s journey so far
        </p>
      </div>

      {/* ===== DO AGAIN SECTION ===== */}
      {favoritedActivities.length > 0 && (
        <div className="py-4">
          <div className="px-5 flex items-center gap-2 mb-3">
            <RotateCcw size={18} style={{ color: COLORS.coral }} />
            <h2 className="text-lg font-black" style={{ color: COLORS.text }}>
              Do Again
            </h2>
            <span 
              className="ml-auto text-xs font-bold px-2 py-1 rounded-full"
              style={{ background: COLORS.coralLight, color: COLORS.coral }}
            >
              {favoritedActivities.length} saved
            </span>
          </div>

          {/* Horizontal scroll of favorites */}
          <div
            className="flex gap-3 overflow-x-auto px-5 pb-2"
            style={{ scrollbarWidth: 'none' }}
          >
            {favoritedActivities.map((activity) => {
              // Find the full activity data from allActivities if available
              const fullActivity = allActivities.find(a => a.id === activity.id);
              // Build a complete activity object with all required fields
              const completeActivity = fullActivity || {
                id: activity.id,
                title: activity.activityTitle || activity.title || 'Activity',
                topic: activity.topic || 'Activity',
                duration: activity.duration || '15 min',
                activity_time: activity.duration || '15 min',
                what_to_do: activity.description || 'Complete this activity with your child.',
                household_items: activity.materials || [],
                mess_level: activity.messLevel || 'Low',
                supervision_level: 'with-me',
                age_band: profile.ageBand || '1-2 years',
              };
              return (
                <DoAgainCard
                  key={activity.id}
                  activity={activity}
                  onClick={() => onSelectActivity && onSelectActivity(completeActivity)}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* ===== REFLECTION JOURNAL CARD ===== */}
      <div className="px-5 py-4">
        <div 
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{ 
            background: journalReady 
              ? `linear-gradient(135deg, ${COLORS.gold}20 0%, ${COLORS.coral}20 100%)`
              : '#fff',
            border: `4px solid ${journalReady ? COLORS.gold : COLORS.purple}`,
          }}
        >
          {/* Stacked effect */}
          <div 
            className="absolute -bottom-2 left-2 right-2 h-full rounded-3xl -z-10"
            style={{ background: journalReady ? COLORS.coral : COLORS.purplePale }}
          />

          {/* Decorative sparkles */}
          <Sparkles 
            className="absolute top-4 right-4 opacity-20" 
            size={32} 
            style={{ color: journalReady ? COLORS.gold : COLORS.purple }}
          />

          {/* Icon + Title */}
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
              style={{ 
                background: journalReady ? COLORS.gold : COLORS.purplePale,
                border: `3px solid ${journalReady ? COLORS.coral : COLORS.purple}`
              }}
            >
              {journalReady ? (
                <PartyPopper size={28} style={{ color: COLORS.purple }} />
              ) : (
                <BookOpen size={28} style={{ color: COLORS.purple }} />
              )}
            </div>
            <div>
              <h3 className="text-lg font-black" style={{ color: COLORS.purple }}>
                {journalReady ? 'Reflection Journal Ready!' : 'Building Your Story'}
              </h3>
              <p className="text-sm" style={{ color: COLORS.textLight }}>
                {journalReady 
                  ? 'A beautiful keepsake of your journey'
                  : 'Every moment adds a new chapter'
                }
              </p>
            </div>
          </div>

          {/* Progress Section (when not ready) */}
          {!journalReady && (
            <div className="space-y-4">
              <p className="text-sm" style={{ color: COLORS.text }}>
                After <strong>{JOURNAL_REQUIREMENTS.minActivities} reflections</strong> across{' '}
                <strong>{JOURNAL_REQUIREMENTS.minTopics} topics</strong>, we'll create a special 
                keepsake of your journey together.
              </p>

              {/* Activities progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold" style={{ color: COLORS.text }}>
                    Reflections
                  </span>
                  <span className="text-xs font-bold" style={{ color: COLORS.purple }}>
                    {displayStats.totalEntries || 0} of {JOURNAL_REQUIREMENTS.minActivities}
                  </span>
                </div>
                <div 
                  className="h-3 rounded-full overflow-hidden"
                  style={{ background: COLORS.purplePale }}
                >
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${activitiesProgress}%`, background: COLORS.purple }}
                  />
                </div>
              </div>

              {/* Topics progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold" style={{ color: COLORS.text }}>
                    Topics explored
                  </span>
                  <span className="text-xs font-bold" style={{ color: COLORS.coral }}>
                    {(displayStats.topicsExplored || []).length} of {JOURNAL_REQUIREMENTS.minTopics}
                  </span>
                </div>
                <div 
                  className="h-3 rounded-full overflow-hidden"
                  style={{ background: COLORS.coralLight }}
                >
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${topicsProgress}%`, background: COLORS.coral }}
                  />
                </div>
              </div>

              {/* Topic badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {(displayStats.topicsExplored || []).map((topic) => (
                  <span 
                    key={topic}
                    className="px-2 py-1 rounded-full text-xs font-bold"
                    style={{ 
                      background: `${TOPIC_COLORS[topic] || COLORS.purple}20`,
                      color: TOPIC_COLORS[topic] || COLORS.purple
                    }}
                  >
                    ✓ {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Create Button (when ready) */}
          {journalReady && (
            <button 
              className="w-full py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-lg"
              style={{ background: COLORS.gold, color: COLORS.purple }}
            >
              <Gift size={20} />
              Create Your Reflection Journal
            </button>
          )}
        </div>
      </div>

      {/* ===== TIMELINE ===== */}
      <div className="px-5">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={18} style={{ color: COLORS.purple }} />
          <h2 className="text-lg font-black" style={{ color: COLORS.text }}>
            Your Reflections
          </h2>
        </div>

        {/* Grouped entries */}
        {Object.entries(groupedEntries).map(([group, groupEntries]) => (
          <div key={group} className="mb-6">
            {/* Group label */}
            <p 
              className="text-xs font-bold uppercase tracking-wide mb-3 pl-1"
              style={{ color: COLORS.textLight }}
            >
              {group}
            </p>

            {/* Entry cards */}
            <div className="space-y-3">
              {groupEntries.map((entry) => (
                <JournalEntryCard 
                  key={entry.id}
                  entry={entry}
                  isExpanded={expandedEntry === entry.id}
                  isFavorited={favorites.includes(entry.id)}
                  onToggle={() => setExpandedEntry(
                    expandedEntry === entry.id ? null : entry.id
                  )}
                  onToggleFavorite={() => toggleFavorite(entry.id)}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Empty state */}
        {entries.length === 0 && (
          <div 
            className="text-center py-12 rounded-3xl"
            style={{ background: '#fff', border: `3px dashed ${COLORS.purple}30` }}
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: COLORS.purplePale }}
            >
              <MessageCircle size={32} style={{ color: COLORS.purple }} />
            </div>
            <h3 className="font-black text-lg mb-2" style={{ color: COLORS.purple }}>
              Start Your Story
            </h3>
            <p className="text-sm px-8" style={{ color: COLORS.textLight }}>
              Complete an activity and share your reflections to begin building precious memories.
            </p>
          </div>
        )}
      </div>

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};


// ============================================================
// DO AGAIN CARD (Horizontal scroll item)
// ============================================================

const DoAgainCard = ({ activity, onClick }) => {
  const topicColor = TOPIC_COLORS[activity.topic] || COLORS.purple;

  return (
    <button 
      onClick={onClick}
      className="flex-shrink-0 w-36 rounded-2xl overflow-hidden shadow-lg text-left transition-transform active:scale-95"
      style={{ background: '#fff', border: `3px solid ${topicColor}` }}
    >
      {/* Color accent bar */}
      <div className="h-1.5" style={{ background: topicColor }} />
      
      {/* Image */}
      <div className="relative h-20 overflow-hidden">
        <img 
          src={activity.image} 
          alt={activity.activityTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Play icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: COLORS.coral }}
          >
            <Play size={18} fill="#fff" style={{ color: '#fff', marginLeft: 2 }} />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2">
          <span 
            className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-bold"
            style={{ background: 'rgba(255,255,255,0.95)', color: COLORS.text }}
          >
            <Clock size={8} /> {activity.duration}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-2.5">
        <p 
          className="text-xs font-bold mb-0.5"
          style={{ color: topicColor }}
        >
          {activity.topic}
        </p>
        <p 
          className="text-sm font-black leading-tight line-clamp-2"
          style={{ color: COLORS.text }}
        >
          {activity.activityTitle}
        </p>
      </div>
    </button>
  );
};


// ============================================================
// JOURNAL ENTRY CARD
// ============================================================

const JournalEntryCard = ({ entry, isExpanded, isFavorited, onToggle, onToggleFavorite }) => {
  // Handle both reaction keys ('loved', 'liked') and emoji strings ('😍', '😊')
  const getReaction = (reactionValue) => {
    if (!reactionValue) return REACTIONS.liked; // default
    // If it's a key in REACTIONS, use it directly
    if (REACTIONS[reactionValue]) return REACTIONS[reactionValue];
    // If it's an emoji, find the matching reaction
    const emojiMap = { '😍': 'loved', '😊': 'liked', '😐': 'meh', '🥴': 'tough', '😫': 'tough' };
    const key = emojiMap[reactionValue];
    return REACTIONS[key] || REACTIONS.liked;
  };
  const reaction = getReaction(entry.reaction);
  const topicColor = TOPIC_COLORS[entry.topic] || COLORS.purple;

  return (
    <div 
      className="rounded-2xl overflow-hidden transition-all"
      style={{ 
        background: '#fff', 
        border: `3px solid ${isExpanded ? topicColor : '#F0F0F0'}`,
        boxShadow: isExpanded ? `0 4px 20px ${topicColor}20` : 'none'
      }}
    >
      {/* Color accent bar */}
      <div className="h-1.5" style={{ background: topicColor }} />

      {/* Main content - clickable area */}
      <button 
        onClick={onToggle}
        className="w-full p-4 text-left"
      >
        {/* Header row */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            {/* Topic badge */}
            <span 
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold mb-1"
              style={{ background: `${topicColor}15`, color: topicColor }}
            >
              {entry.topic}
            </span>
            
            {/* Activity title */}
            <h4 className="font-black" style={{ color: COLORS.text }}>
              {entry.activityTitle}
            </h4>
            
            {/* Date */}
            <p className="text-xs mt-0.5" style={{ color: COLORS.textLight }}>
              {new Date(entry.date).toLocaleDateString('en-US', { 
                weekday: 'short', month: 'short', day: 'numeric' 
              })}
            </p>
          </div>

          {/* Right side: Reaction + Favorite */}
          <div className="flex items-start gap-2">
            {/* Reaction */}
            <div className="flex flex-col items-center">
              <span className="text-2xl">{reaction.emoji}</span>
            </div>

            {/* Favorite button */}
            <button
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90"
              style={{ 
                background: isFavorited ? COLORS.coralLight : '#F5F5F5',
                border: `2px solid ${isFavorited ? COLORS.coral : '#E5E5E5'}`
              }}
            >
              <Heart 
                size={16} 
                style={{ color: COLORS.coral }}
                fill={isFavorited ? COLORS.coral : 'none'}
              />
            </button>
          </div>
        </div>

        {/* Reflection text */}
        {entry.reflection && (
          <p 
            className={`text-sm italic mt-2 ${!isExpanded ? 'line-clamp-2' : ''}`}
            style={{ color: COLORS.text }}
          >
            "{entry.reflection}"
          </p>
        )}

        {/* Expand indicator */}
        {entry.reflection && entry.reflection.length > 80 && (
          <div className="flex justify-center mt-2">
            <ChevronRight 
              size={16} 
              style={{ 
                color: COLORS.textLight,
                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }} 
            />
          </div>
        )}
      </button>
    </div>
  );
};


// ============================================================
// PREVIEW CONTAINER
// ============================================================

const MemoriesPreview = () => {
  const [showReady, setShowReady] = useState(false);

  // Stats for "ready" state
  const readyStats = {
    totalEntries: 22,
    topicsExplored: ['Sensory Play', 'Fine Motor', 'Gross Motor', 'Social & Emotional'],
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-8 min-h-screen" style={{ background: '#0F0F1A' }}>
      <h1 className="text-xl md:text-2xl font-bold text-white mb-2 text-center">Memories Screen - Final</h1>
      <p className="text-gray-400 mb-4 text-sm text-center">"Do Again" section + Journal + Timeline</p>
      
      {/* State toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowReady(false)}
          className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
            !showReady ? 'bg-white text-gray-900 shadow-lg' : 'bg-white/10 text-white/70'
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setShowReady(true)}
          className={`px-4 py-2 rounded-full font-medium transition-all text-sm flex items-center gap-2 ${
            showReady ? 'bg-yellow-400 text-gray-900 shadow-lg' : 'bg-white/10 text-white/70'
          }`}
        >
          <Trophy size={16} /> Journal Ready
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
            <MemoriesScreen 
              stats={showReady ? readyStats : SAMPLE_STATS}
            />
          </div>
        </div>
      </div>

      {/* Structure */}
      <div className="mt-6 max-w-md w-full">
        <p className="text-white/60 text-xs text-center mb-3">Page structure:</p>
        <div className="bg-white/5 rounded-lg p-3 text-xs space-y-1">
          <p className="text-green-400">1. "Do Again" section (tap → ActivityDetail)</p>
          <p className="text-white/70">2. Reflection Journal progress</p>
          <p className="text-white/70">3. Timeline grouped by date</p>
          <p className="text-white/50 pl-3">└─ Journal cards with ❤️ toggle</p>
        </div>
      </div>
    </div>
  );
};

export default MemoriesScreen;
