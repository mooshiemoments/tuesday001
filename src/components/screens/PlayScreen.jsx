// PlayScreen - Final Version
// Gear/More filters moved below "What's the vibe"

import React, { useState } from 'react';
import { 
  Clock,
  Sparkles,
  Flame,
  Moon,
  Package,
  Scissors,
  User,
  Users,
  Droplets,
  Crown,
  Play,
  Shuffle,
  SlidersHorizontal,
  X,
  Heart,
  ChevronRight,
  Baby
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

// Rotating taglines
const TAGLINES = [
  "Boring to adults. Gold to toddlers.",
  "Trust us—they'll love this.",
  "Simple setup. Big smiles.",
  "Less Pinterest, more play.",
  "Looks basic? It's a hit.",
];

// Sample activities
const SAMPLE_ACTIVITIES = [
  {
    id: '1',
    title: 'Rainbow Rice Sensory Bin',
    topic: 'Sensory Play',
    duration: '15 min',
    mess: 'Messy',
    energy: 'calm',
    materials: ['Rice', 'Food coloring', 'Container', 'Spoons'],
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=400&fit=crop',
  },
  {
    id: '2',
    title: 'Pouring Station',
    topic: 'Water Play',
    duration: '10 min',
    mess: 'Low',
    energy: 'calm',
    materials: ['Cups', 'Water', 'Towel'],
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=400&fit=crop',
  },
  {
    id: '3',
    title: 'Paper Plate Dancing',
    topic: 'Movement',
    duration: '10 min',
    mess: 'Clean',
    energy: 'burn',
    materials: ['Paper plates', 'Music'],
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=400&fit=crop',
  },
  {
    id: '4',
    title: 'Cardboard Box Fort',
    topic: 'Imagination',
    duration: '20 min',
    mess: 'Clean',
    energy: 'calm',
    materials: ['Large box', 'Markers', 'Tape'],
    image: 'https://images.unsplash.com/photo-1607166452427-7e4477079cb9?w=600&h=400&fit=crop',
  },
  {
    id: '5',
    title: 'Dance Party Freeze',
    topic: 'Movement',
    duration: '10 min',
    mess: 'Clean',
    energy: 'burn',
    materials: ['Music', 'Space to move'],
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=400&fit=crop',
  },
];

// Child profile - removed hardcoded values, now uses profile prop


// ============================================================
// MAIN PLAY SCREEN
// ============================================================

// Activity images by topic (fallback)
const TOPIC_IMAGES = {
  'Sensory Exploration': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=400&fit=crop',
  'Social & Emotional': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop',
  'Gross Motor': 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=400&fit=crop',
  'Fine Motor': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=400&fit=crop',
  'Science & Physics': 'https://images.unsplash.com/photo-1567168544230-6b6e9c0f1b1f?w=600&h=400&fit=crop',
  'Music & Rhythm': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop',
  'Language & Storytelling': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop',
  'default': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=400&fit=crop',
};

// Transform real activity data to PlayScreen format
const transformActivity = (activity) => ({
  ...activity,
  image: activity.id ? `/illustrations/${activity.id}.svg` : (TOPIC_IMAGES[activity.topic] || TOPIC_IMAGES.default),
  mess: activity.mess || activity.mess_level?.split(' ')[0] || 'Low',
  energy: activity.topic?.includes('Gross Motor') ? 'burn' : 'calm',
  materials: activity.materials || activity.household_items || [],
  duration: activity.duration || activity.activity_time || '15 min',
});

const PlayScreen = ({ 
  isPremium = false,
  profile = {},
  activitiesData = [],
  allActivities = [],
  onSelectActivity,
  onShowPaywall,
}) => {
  // Filter states
  const [time, setTime] = useState(null);
  const [energy, setEnergy] = useState(null);
  
  // Advanced filters (in bottom sheet)
  const [materials, setMaterials] = useState('everyday');
  const [supervision, setSupervision] = useState('with-me');
  const [mess, setMess] = useState(null);
  const [showFiltersSheet, setShowFiltersSheet] = useState(false);
  
  // Transform and use real activities or fall back to sample
  const rawActivities = activitiesData.length > 0 
    ? activitiesData.filter(a => a.age_band === profile.ageBand)
    : SAMPLE_ACTIVITIES;
  
  const availableActivities = rawActivities.map(transformActivity);
  
  // Activity state
  const [currentActivity, setCurrentActivity] = useState(availableActivities[0] || SAMPLE_ACTIVITIES[0]);
  const [shufflesLeft, setShufflesLeft] = useState(3);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentTagline, setCurrentTagline] = useState(0);
  const [bounceCard, setBounceCard] = useState(false);

  // Count active advanced filters
  const advancedFilterCount = [
    materials !== 'everyday' ? 1 : 0,
    supervision !== 'with-me' ? 1 : 0,
    mess ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  // Build active filters display
  const getActiveFiltersText = () => {
    const filters = [];
    if (time) filters.push(`${time} min`);
    if (energy === 'burn') filters.push('Active');
    if (energy === 'calm') filters.push('Calm');
    if (mess) filters.push(mess.charAt(0).toUpperCase() + mess.slice(1));
    if (materials === 'crafts') filters.push('Crafts');
    if (supervision === 'independent') filters.push('Solo');
    
    return filters.length > 0 ? filters.join(' • ') : null;
  };

  // Handle shuffle
  const handleShuffle = () => {
    if (!isPremium && shufflesLeft <= 0) {
      if (onShowPaywall) onShowPaywall();
      return;
    }
    
    setIsShuffling(true);
    setIsFavorited(false);
    
    setTimeout(() => {
      const otherActivities = availableActivities.filter(a => a.id !== currentActivity.id);
      if (otherActivities.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherActivities.length);
        setCurrentActivity(otherActivities[randomIndex]);
      }
      setCurrentTagline((prev) => (prev + 1) % TAGLINES.length);
      setIsShuffling(false);
      setBounceCard(true);
      setTimeout(() => setBounceCard(false), 500);
      
      if (!isPremium) {
        setShufflesLeft(prev => Math.max(0, prev - 1));
      }
    }, 500);
  };

  // Handle starting activity
  const handleStartActivity = () => {
    if (onSelectActivity && currentActivity) {
      onSelectActivity(currentActivity);
    }
  };

  const activeFiltersText = getActiveFiltersText();

  return (
    <div 
      className="min-h-screen pb-6 relative"
      style={{ 
        background: `linear-gradient(180deg, ${COLORS.cream} 0%, #FFF5E6 100%)`,
        fontFamily: "system-ui, -apple-system, sans-serif"
      }}
    >
      {/* ===== HEADER (Clean - no gear) ===== */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <h1 className="text-2xl font-black" style={{ color: COLORS.purple }}>Quick Play</h1>
        
        {/* Premium badge only */}
        {isPremium && (
          <div 
            className="px-3 py-2 rounded-xl flex items-center gap-1.5"
            style={{ background: COLORS.goldLight, border: `2px solid ${COLORS.gold}` }}
          >
            <Crown size={16} style={{ color: COLORS.gold }} fill={COLORS.gold} />
            <span className="text-xs font-bold" style={{ color: '#92400E' }}>Premium</span>
          </div>
        )}
      </div>

      {/* ===== FILTER FEEDBACK ===== */}
      {activeFiltersText && (
        <div className="px-5 pb-2">
          <div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: COLORS.purplePale }}
          >
            <Sparkles size={12} style={{ color: COLORS.purple }} />
            <span className="text-xs font-medium" style={{ color: COLORS.purple }}>
              Showing: {activeFiltersText}
            </span>
          </div>
        </div>
      )}

      {/* ===== ACTIVITY CARD ===== */}
      <div className="px-5 pb-4">
        <div 
          className={`rounded-3xl overflow-hidden shadow-xl relative transition-all duration-300 ${
            isShuffling ? 'scale-95 opacity-50' : bounceCard ? 'animate-bounce-once' : 'scale-100 opacity-100'
          }`}
          style={{ background: '#fff', border: `4px solid ${COLORS.purple}` }}
        >
          {/* Stacked effect */}
          <div 
            className="absolute -bottom-2 left-2 right-2 h-full rounded-3xl -z-10"
            style={{ background: COLORS.coral }}
          />
          <div 
            className="absolute -bottom-4 left-4 right-4 h-full rounded-3xl -z-20"
            style={{ background: COLORS.gold }}
          />

          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={currentActivity.image} 
              alt={currentActivity.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Favorite button */}
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90"
              style={{ background: '#fff' }}
            >
              <Heart 
                size={20} 
                style={{ color: COLORS.coral }}
                fill={isFavorited ? COLORS.coral : 'none'}
              />
            </button>

            {/* Topic badge */}
            <div className="absolute top-3 left-3">
              <span 
                className="px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ background: COLORS.purple, color: '#fff' }}
              >
                {currentActivity.topic}
              </span>
            </div>

            {/* Personalization badge */}
            <div className="absolute top-14 left-3">
              <span 
                className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                style={{ background: 'rgba(255,255,255,0.95)', color: COLORS.purple }}
              >
                <Baby size={12} />
                Picked for {profile?.childName || 'your little one'}, {profile?.ageBand || ''}
              </span>
            </div>

            {/* Title + badges */}
            <div className="absolute bottom-3 left-3 right-3">
              <h2 className="text-xl font-black text-white drop-shadow-lg mb-2">
                {currentActivity.title}
              </h2>
              <div className="flex gap-2">
                <span 
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold"
                  style={{ background: 'rgba(255,255,255,0.95)', color: COLORS.text }}
                >
                  <Clock size={12} /> {currentActivity.duration}
                </span>
                <span 
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold"
                  style={{ background: 'rgba(255,255,255,0.95)', color: COLORS.text }}
                >
                  <Droplets size={12} /> {currentActivity.mess}
                </span>
              </div>
            </div>
          </div>

          {/* Materials + Tagline */}
          <div className="p-4">
            <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: COLORS.textLight }}>
              You'll need
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {currentActivity.materials.map((item) => (
                <span 
                  key={item}
                  className="px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: COLORS.purplePale, color: COLORS.purple }}
                >
                  {item}
                </span>
              ))}
            </div>
            
            {/* Rotating Tagline */}
            <p 
              className="text-center text-sm italic pt-2"
              style={{ color: COLORS.textLight, borderTop: `2px dashed ${COLORS.purple}20` }}
            >
              ✨ {TAGLINES[currentTagline]}
            </p>
          </div>
        </div>
      </div>

      {/* ===== ACTION BUTTONS ===== */}
      <div className="px-5 pb-2 flex gap-3">
        {/* Shuffle Button */}
        <button
          onClick={handleShuffle}
          disabled={!isPremium && shufflesLeft <= 0}
          className="flex-1 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
          style={{ 
            background: (!isPremium && shufflesLeft <= 0) ? '#E5E5E5' : '#fff',
            color: (!isPremium && shufflesLeft <= 0) ? '#999' : COLORS.purple,
            border: `3px solid ${(!isPremium && shufflesLeft <= 0) ? '#D5D5D5' : COLORS.purple}`,
          }}
        >
          <Shuffle size={22} />
          Shuffle
        </button>

        {/* Let's Play Button */}
        <button
          onClick={handleStartActivity}
          className="flex-1 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
          style={{ 
            background: COLORS.gold,
            color: COLORS.purple,
            border: `3px solid ${COLORS.purple}`,
          }}
        >
          <Play size={22} fill={COLORS.purple} />
          Let's Play!
        </button>
      </div>

      {/* ===== SHUFFLE DOTS (Free users only) ===== */}
      {!isPremium && (
        <div className="flex items-center justify-center gap-2 py-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full transition-all"
              style={{ 
                background: i <= shufflesLeft ? COLORS.purple : '#E5E5E5',
              }}
            />
          ))}
          <span className="text-xs ml-1" style={{ color: COLORS.textLight }}>
            {shufflesLeft} shuffle{shufflesLeft !== 1 ? 's' : ''} left today
          </span>
        </div>
      )}

      {/* ===== OUT OF SHUFFLES PROMPT ===== */}
      {!isPremium && shufflesLeft <= 0 && (
        <div className="px-5 pb-4">
          <button
            onClick={() => onShowPaywall && onShowPaywall()}
            className="w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2"
            style={{ 
              background: `linear-gradient(135deg, ${COLORS.gold}30 0%, ${COLORS.coral}30 100%)`,
              border: `3px solid ${COLORS.gold}`,
              color: COLORS.text
            }}
          >
            <Crown size={18} style={{ color: COLORS.gold }} fill={COLORS.gold} />
            Get Unlimited Shuffles
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* ===== CUSTOMIZE FILTERS ===== */}
      <div className="px-5 pt-2">
        <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: COLORS.textLight }}>
          Customize your shuffle
        </p>
        
        {/* Time */}
        <div className="mb-4">
          <p className="text-sm font-bold mb-2" style={{ color: COLORS.text }}>
            How long do you have?
          </p>
          <div className="flex gap-2">
            {[
              { value: '5', label: '5 min' },
              { value: '10', label: '10 min' },
              { value: '15', label: '15+ min' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTime(time === opt.value ? null : opt.value)}
                className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: time === opt.value ? COLORS.purple : '#fff',
                  color: time === opt.value ? '#fff' : COLORS.text,
                  border: `3px solid ${time === opt.value ? COLORS.purple : '#E5E5E5'}`,
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Energy */}
        <div className="mb-4">
          <p className="text-sm font-bold mb-2" style={{ color: COLORS.text }}>
            What's the vibe?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setEnergy(energy === 'burn' ? null : 'burn')}
              className="flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              style={{
                background: energy === 'burn' ? COLORS.coral : '#fff',
                color: energy === 'burn' ? '#fff' : COLORS.coral,
                border: `3px solid ${energy === 'burn' ? COLORS.coral : '#E5E5E5'}`,
              }}
            >
              <Flame size={18} />
              Burn Energy
            </button>
            <button
              onClick={() => setEnergy(energy === 'calm' ? null : 'calm')}
              className="flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              style={{
                background: energy === 'calm' ? COLORS.purple : '#fff',
                color: energy === 'calm' ? '#fff' : COLORS.purple,
                border: `3px solid ${energy === 'calm' ? COLORS.purple : '#E5E5E5'}`,
              }}
            >
              <Moon size={18} />
              Calm Down
            </button>
          </div>
        </div>

        {/* ===== MORE FILTERS BUTTON (Moved here) ===== */}
        <button
          onClick={() => setShowFiltersSheet(true)}
          className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
          style={{ 
            background: '#fff',
            color: COLORS.textLight,
            border: `2px dashed ${advancedFilterCount > 0 ? COLORS.purple : '#E5E5E5'}`,
          }}
        >
          <SlidersHorizontal size={18} style={{ color: advancedFilterCount > 0 ? COLORS.purple : COLORS.textLight }} />
          <span style={{ color: advancedFilterCount > 0 ? COLORS.purple : COLORS.textLight }}>
            More filters
          </span>
          {advancedFilterCount > 0 && (
            <span 
              className="ml-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: COLORS.coral }}
            >
              {advancedFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* ===== FILTERS BOTTOM SHEET ===== */}
      {showFiltersSheet && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowFiltersSheet(false)}
          />
          
          {/* Sheet */}
          <div 
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl p-5 pb-8"
            style={{ background: COLORS.cream }}
          >
            {/* Handle */}
            <div className="w-12 h-1.5 rounded-full bg-gray-300 mx-auto mb-4" />
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black" style={{ color: COLORS.purple }}>More Filters</h3>
              <button
                onClick={() => setShowFiltersSheet(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: '#fff', border: '2px solid #E5E5E5' }}
              >
                <X size={20} style={{ color: COLORS.textLight }} />
              </button>
            </div>

            {/* Materials */}
            <div className="mb-5">
              <p className="text-sm font-bold mb-2" style={{ color: COLORS.text }}>
                Materials
              </p>
              <div 
                className="flex rounded-xl overflow-hidden"
                style={{ border: `3px solid ${COLORS.purple}` }}
              >
                <button
                  onClick={() => setMaterials('everyday')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all"
                  style={{
                    background: materials === 'everyday' ? COLORS.purple : '#fff',
                    color: materials === 'everyday' ? '#fff' : COLORS.purple,
                  }}
                >
                  <Package size={18} />
                  Everyday Items
                </button>
                <button
                  onClick={() => setMaterials('crafts')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all"
                  style={{
                    background: materials === 'crafts' ? COLORS.purple : '#fff',
                    color: materials === 'crafts' ? '#fff' : COLORS.purple,
                  }}
                >
                  <Scissors size={18} />
                  Crafts
                </button>
              </div>
            </div>

            {/* Supervision */}
            <div className="mb-5">
              <p className="text-sm font-bold mb-2" style={{ color: COLORS.text }}>
                Supervision
              </p>
              <div 
                className="flex rounded-xl overflow-hidden"
                style={{ border: `3px solid ${COLORS.coral}` }}
              >
                <button
                  onClick={() => setSupervision('independent')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all"
                  style={{
                    background: supervision === 'independent' ? COLORS.coral : '#fff',
                    color: supervision === 'independent' ? '#fff' : COLORS.coral,
                  }}
                >
                  <User size={18} />
                  Independent
                </button>
                <button
                  onClick={() => setSupervision('with-me')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold transition-all"
                  style={{
                    background: supervision === 'with-me' ? COLORS.coral : '#fff',
                    color: supervision === 'with-me' ? '#fff' : COLORS.coral,
                  }}
                >
                  <Users size={18} />
                  With Me
                </button>
              </div>
            </div>

            {/* Mess */}
            <div className="mb-6">
              <p className="text-sm font-bold mb-2" style={{ color: COLORS.text }}>
                Mess Tolerance
              </p>
              <div className="flex gap-2">
                {[
                  { value: 'clean', label: 'Clean', icon: '✨' },
                  { value: 'low', label: 'Low', icon: '👍' },
                  { value: 'messy', label: 'Messy', icon: '🎨' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setMess(mess === opt.value ? null : opt.value)}
                    className="flex-1 flex items-center justify-center gap-1 py-3 rounded-xl text-sm font-bold transition-all"
                    style={{
                      background: mess === opt.value ? COLORS.green : '#fff',
                      color: mess === opt.value ? '#fff' : COLORS.text,
                      border: `3px solid ${mess === opt.value ? COLORS.green : '#E5E5E5'}`,
                    }}
                  >
                    <span>{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => setShowFiltersSheet(false)}
              className="w-full py-4 rounded-2xl font-black text-base"
              style={{ background: COLORS.purple, color: '#fff' }}
            >
              Apply Filters
            </button>
          </div>
        </>
      )}

      {/* ===== ANIMATIONS ===== */}
      <style>{`
        @keyframes bounce-once {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-bounce-once {
          animation: bounce-once 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};


// ============================================================
// PREVIEW CONTAINER
// ============================================================

const PlayScreenPreview = () => {
  const [isPremium, setIsPremium] = useState(false);

  return (
    <div className="flex flex-col items-center p-4 md:p-8 min-h-screen" style={{ background: '#0F0F1A' }}>
      <h1 className="text-xl md:text-2xl font-bold text-white mb-2 text-center">Play Screen - Final</h1>
      <p className="text-gray-400 mb-4 text-sm text-center">More filters moved below "What's the vibe"</p>
      
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
            <PlayScreen isPremium={isPremium} />
          </div>
        </div>
      </div>

      {/* Layout breakdown */}
      <div className="mt-6 max-w-md w-full">
        <p className="text-white/60 text-xs text-center mb-3">Page structure:</p>
        <div className="bg-white/5 rounded-lg p-3 text-xs space-y-1">
          <p className="text-white/70">1. Header (Quick Play + Premium badge)</p>
          <p className="text-white/70">2. Filter feedback (when active)</p>
          <p className="text-white/70">3. Activity card with personalization</p>
          <p className="text-white/70">4. Shuffle / Let's Play buttons</p>
          <p className="text-white/70">5. Shuffle dots (free users)</p>
          <p className="text-white/70">6. "Customize your shuffle" section</p>
          <p className="text-white/70">   └─ Time filters</p>
          <p className="text-white/70">   └─ Energy filters</p>
          <p className="text-white/70">   └─ <span className="text-green-400">More filters button ← moved here</span></p>
        </div>
      </div>
    </div>
  );
};

export default PlayScreen;
