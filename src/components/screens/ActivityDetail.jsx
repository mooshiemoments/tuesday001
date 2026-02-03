// ActivityDetail - Magical Toybox Design (Production Ready)
// Using Mooshie Brand Colors

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart,
  Droplets,
  Backpack,
  BookOpen,
  MessageCircle,
  Sparkles,
  Star,
  ChevronDown,
  Package,
  Brain,
  Shield,
  Baby,
  Timer,
  Palette,
  Box,
  UtensilsCrossed,
  Gift,
  Wand2,
  HeartHandshake,
  Rocket,
  Check
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
};

const SAMPLE_ACTIVITY = {
  title: "Rainbow Rice Sensory Bin",
  topic: "Sensory Exploration",
  age_band: "18-24 months",
  duration: "15 min",
  prep_time: "5 min prep",
  mess_level: "Messy",
  what_to_do: "Fill a large container with colored rice and let your little one explore with cups, spoons, and their hands. Hide small toys for them to discover!",
  household_items: [
    "Large container or bin",
    "2 cups of rice",
    "Food coloring",
    "Measuring cups",
    "Spoons",
    "Small toys to hide"
  ],
  steps: [
    "Color rice by mixing with a few drops of food coloring in a zip bag",
    "Let dry for 30 minutes (or use dry rice for instant play)",
    "Pour into a large container",
    "Add cups, spoons and hide small toys",
    "Let your child explore freely!"
  ],
  genius_script: [
    "What does it feel like? Is it bumpy or smooth?",
    "Can you pour it from high up? What sound does it make?",
    "I wonder what's hiding under there..."
  ],
  bonding_cues: "Get down to their level and play alongside them. Mirror their expressions of wonder and discovery.",
  why_it_matters: "Sensory play builds neural pathways and helps toddlers process information about their world through touch, sight, and sound.",
  safety_note: "Always supervise - rice can be a choking hazard. Not suitable for children who still put everything in their mouths."
};

const getMaterialIcon = (item) => {
  const lower = item.toLowerCase();
  if (lower.includes('container') || lower.includes('bin')) return Package;
  if (lower.includes('rice')) return Box;
  if (lower.includes('color')) return Palette;
  if (lower.includes('cup')) return UtensilsCrossed;
  if (lower.includes('spoon')) return UtensilsCrossed;
  if (lower.includes('toy')) return Gift;
  return Sparkles;
};

// Heart button with animation
const FavoriteButton = ({ isFavorite, onToggle }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (onToggle) onToggle();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button 
      onClick={handleClick}
      className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform"
      style={{ 
        background: '#fff', 
        border: `3px solid ${COLORS.coral}`,
        transform: isAnimating ? 'scale(1.2)' : 'scale(1)',
      }}
    >
      <Heart 
        size={24} 
        className="transition-all"
        style={{ 
          color: COLORS.coral,
          fill: isFavorite ? COLORS.coral : 'transparent',
          transform: isAnimating ? 'scale(1.3)' : 'scale(1)',
        }} 
      />
    </button>
  );
};

const ActivityDetailMooshie = ({ 
  activity = SAMPLE_ACTIVITY,
  profile,
  isPremium,
  isFavorite,
  onBack,
  onComplete,
  onToggleFavorite,
  onShowPaywall,
  repeatInfo,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedSection, setExpandedSection] = useState('overview');

  // Early return if no activity
  if (!activity) return null;

  // Use activity data with fallbacks
  const displayActivity = {
    ...SAMPLE_ACTIVITY,
    ...activity,
    household_items: activity.household_items || activity.items_required || SAMPLE_ACTIVITY.household_items,
    genius_script: activity.genius_script || activity.magic_words?.split(' | ') || SAMPLE_ACTIVITY.genius_script,
    extended_play: activity.extended_play || (activity.infinite_star ? activity.infinite_star.split(' | ').map(s => s.trim()) : []),
    parental_coaching: activity.parental_coaching || '',
    mooshie_moment: activity.mooshie_moment || activity.bonding_cues || '',
    tags: activity.tags || [],
  };

  // Step colors using brand palette
  const stepColors = [
    COLORS.purple,
    COLORS.coral,
    COLORS.gold,
    COLORS.purpleLight,
    COLORS.coral,
    COLORS.purple,
  ];

  // Material chip colors using brand palette
  const materialColors = [
    { bg: COLORS.purplePale, border: COLORS.purple, text: COLORS.purple },
    { bg: COLORS.goldLight, border: COLORS.gold, text: '#92400E' },
    { bg: COLORS.coralLight, border: COLORS.coral, text: '#9A3412' },
    { bg: COLORS.purplePale, border: COLORS.purpleLight, text: COLORS.purple },
    { bg: COLORS.goldLight, border: COLORS.gold, text: '#92400E' },
    { bg: COLORS.coralLight, border: COLORS.coral, text: '#9A3412' },
  ];

  return (
    <div className="min-h-screen pb-28" style={{ 
      background: `linear-gradient(180deg, ${COLORS.cream} 0%, #FFF5E6 50%, ${COLORS.goldLight} 100%)`,
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 right-0 h-64 overflow-hidden pointer-events-none">
        <div className="absolute top-8 left-6 w-12 h-12 rounded-full opacity-20" style={{ background: COLORS.coral }}></div>
        <div className="absolute top-20 right-8 w-8 h-8 rounded-lg opacity-20 transform rotate-12" style={{ background: COLORS.purple }}></div>
        <div className="absolute top-32 left-16 w-6 h-6 rounded-full opacity-15" style={{ background: COLORS.gold }}></div>
        <Star className="absolute top-12 right-20 opacity-40" size={24} fill={COLORS.gold} style={{ color: COLORS.gold }} />
      </div>

      {/* Header */}
      <div className="relative px-4 pt-4">
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 z-10 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ background: '#fff', border: `3px solid ${COLORS.purple}` }}
        >
          <ArrowLeft size={24} style={{ color: COLORS.purple }} />
        </button>
        <div className="absolute top-4 right-4 z-10">
          <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
        </div>
      </div>

      {/* Hero - Toy Block Style */}
      <div className="px-5 pt-14 pb-6">
        <div className="relative max-w-sm mx-auto">
          {/* Stacked blocks effect */}
          <div 
            className="absolute -bottom-2 left-2 right-2 h-full rounded-3xl"
            style={{ background: COLORS.coral, transform: 'rotate(-1deg)' }}
          />
          <div 
            className="absolute -bottom-1 left-1 right-1 h-full rounded-3xl"
            style={{ background: COLORS.gold, transform: 'rotate(0.5deg)' }}
          />
          
          <div 
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: '#fff', border: `4px solid ${COLORS.purple}` }}
          >
            {/* Brand color top bar */}
            <div className="h-3 flex">
              <div className="flex-1" style={{ background: COLORS.purple }}></div>
              <div className="flex-1" style={{ background: COLORS.coral }}></div>
              <div className="flex-1" style={{ background: COLORS.gold }}></div>
              <div className="flex-1" style={{ background: COLORS.purpleLight }}></div>
              <div className="flex-1" style={{ background: COLORS.coral }}></div>
              <div className="flex-1" style={{ background: COLORS.purple }}></div>
            </div>

            <div className="p-6 text-center">
              {/* Activity icon */}
              <div className="relative mb-4">
                <div 
                  className="w-32 h-32 mx-auto rounded-3xl flex items-center justify-center shadow-lg transform -rotate-3"
                  style={{ 
                    background: `linear-gradient(145deg, ${COLORS.goldLight} 0%, ${COLORS.gold} 100%)`,
                    border: `4px solid ${COLORS.gold}`
                  }}
                >
                  <Palette size={64} style={{ color: '#92400E' }} />
                </div>
                <Sparkles 
                  className="absolute -top-2 -right-2" 
                  size={32} 
                  style={{ color: COLORS.purple }} 
                />
                <Star 
                  className="absolute -bottom-1 -left-1" 
                  size={28} 
                  fill={COLORS.coral} 
                  style={{ color: COLORS.coral }} 
                />
              </div>

              <h1 
                className="text-2xl font-black mb-4 leading-tight" 
                style={{ color: COLORS.purple }}
              >
                {displayActivity.title}
              </h1>

              {/* Main Tags */}
              <div className="flex flex-wrap justify-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold shadow-md"
                  style={{ background: COLORS.purple, color: '#fff' }}
                >
                  <Baby size={18} />
                  {displayActivity.age_band}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold shadow-md"
                  style={{ background: COLORS.gold, color: COLORS.purple }}
                >
                  <Timer size={18} />
                  {displayActivity.duration}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold shadow-md"
                  style={{ background: COLORS.coral, color: '#fff' }}
                >
                  <Droplets size={18} />
                  {displayActivity.mess_level}
                </span>
              </div>

              {/* Activity Tags */}
              {displayActivity.tags && displayActivity.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                  {displayActivity.tags.slice(0, 5).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{ background: COLORS.cream, color: COLORS.textLight, border: `1px solid ${COLORS.purplePale}` }}
                    >
                      {tag.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 space-y-4">
        
        {/* Let's Play! - What To Do */}
        <div 
          className="rounded-3xl p-5 shadow-lg"
          style={{ background: '#fff', border: `4px solid ${COLORS.gold}` }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
              style={{ background: COLORS.goldLight }}
            >
              <Rocket size={28} style={{ color: '#92400E' }} />
            </div>
            <h2 className="text-xl font-black" style={{ color: '#92400E' }}>Let's Play!</h2>
          </div>
          <p className="leading-relaxed text-base" style={{ color: COLORS.text }}>{displayActivity.what_to_do}</p>
        </div>

        {/* Grab These! - Materials */}
        <div 
          className="rounded-3xl overflow-hidden shadow-lg"
          style={{ background: '#fff', border: `4px solid ${COLORS.purple}` }}
        >
          <button 
            onClick={() => setExpandedSection(expandedSection === 'materials' ? '' : 'materials')}
            className="w-full p-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
                style={{ background: COLORS.purplePale }}
              >
                <Backpack size={28} style={{ color: COLORS.purple }} />
              </div>
              <h2 className="text-xl font-black" style={{ color: COLORS.purple }}>Grab These!</h2>
            </div>
            <ChevronDown 
              size={28} 
              className="transition-transform"
              style={{ 
                color: COLORS.purple,
                transform: expandedSection === 'materials' ? 'rotate(180deg)' : 'rotate(0deg)' 
              }}
            />
          </button>
          
          {expandedSection === 'materials' && (
            <div className="px-5 pb-5 grid grid-cols-2 gap-3">
              {displayActivity.household_items?.map((item, i) => {
                const IconComponent = getMaterialIcon(item);
                const color = materialColors[i % materialColors.length];
                return (
                  <div 
                    key={i}
                    className="flex items-center gap-2 p-3 rounded-2xl font-semibold shadow-sm"
                    style={{ background: color.bg, border: `3px solid ${color.border}` }}
                  >
                    <IconComponent size={22} style={{ color: color.text }} />
                    <span className="text-sm" style={{ color: color.text }}>{item}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Safety Note - Positioned after Materials */}
        {displayActivity.safety_note && (
          <div 
            className="rounded-2xl p-4 flex items-start gap-3"
            style={{ background: '#FEF2F2', border: '3px dashed #F87171' }}
          >
            <Shield size={26} className="text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm font-medium">{displayActivity.safety_note}</p>
          </div>
        )}

        {/* How To Do It - Steps */}
        <div 
          className="rounded-3xl overflow-hidden shadow-lg"
          style={{ background: '#fff', border: `4px solid ${COLORS.coral}` }}
        >
          <button 
            onClick={() => setExpandedSection(expandedSection === 'steps' ? '' : 'steps')}
            className="w-full p-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
                style={{ background: COLORS.coralLight }}
              >
                <Wand2 size={28} style={{ color: COLORS.coral }} />
              </div>
              <h2 className="text-xl font-black" style={{ color: COLORS.coral }}>How To Do It</h2>
            </div>
            <ChevronDown 
              size={28} 
              className="transition-transform"
              style={{ 
                color: COLORS.coral,
                transform: expandedSection === 'steps' ? 'rotate(180deg)' : 'rotate(0deg)' 
              }}
            />
          </button>

          {expandedSection === 'steps' && (
            <div className="px-5 pb-5 space-y-3">
              {displayActivity.steps?.map((step, i) => {
                return (
                  <div 
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className="flex gap-4 items-start p-4 rounded-2xl cursor-pointer transition-all"
                    style={{ 
                      background: activeStep === i ? COLORS.coralLight : '#FAFAFA',
                      border: activeStep === i ? `3px solid ${COLORS.coral}` : '3px solid #E5E7EB',
                      transform: activeStep === i ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0 shadow-md"
                      style={{ background: stepColors[i % stepColors.length], color: '#fff' }}
                    >
                      {i + 1}
                    </div>
                    <p className="pt-2 leading-relaxed font-medium" style={{ color: COLORS.text }}>{step}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Say These Words! - Magic Words */}
        <div 
          className="rounded-3xl p-5 shadow-lg"
          style={{ 
            background: `linear-gradient(135deg, ${COLORS.goldLight} 0%, ${COLORS.gold}40 100%)`,
            border: `4px solid ${COLORS.gold}`
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
              style={{ background: '#fff' }}
            >
              <MessageCircle size={28} style={{ color: '#92400E' }} />
            </div>
            <h2 className="text-xl font-black" style={{ color: '#92400E' }}>Say These Words!</h2>
          </div>
          <div className="space-y-3">
            {displayActivity.genius_script?.map((script, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl p-4 shadow-md relative"
                style={{ border: `3px solid ${COLORS.gold}` }}
              >
                <div 
                  className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: COLORS.gold }}
                >
                  <MessageCircle size={14} className="text-white" />
                </div>
                <p className="italic font-semibold pl-2" style={{ color: '#92400E' }}>"{script}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mooshie Moment! */}
        <div 
          className="rounded-3xl p-6 shadow-xl relative overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${COLORS.coralLight} 0%, ${COLORS.coral}30 50%, ${COLORS.coral}50 100%)`,
            border: `4px solid ${COLORS.coral}`
          }}
        >
          <Star 
            className="absolute top-4 right-4 opacity-30" 
            size={40} 
            fill={COLORS.coral}
            style={{ color: COLORS.coral }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ background: '#fff' }}
              >
                <HeartHandshake size={32} style={{ color: COLORS.coral }} />
              </div>
              <h2 className="text-2xl font-black" style={{ color: '#9A3412' }}>Mooshie Moment!</h2>
            </div>
            <div className="bg-white/90 rounded-2xl p-4 shadow-md">
              <p className="leading-relaxed font-medium" style={{ color: COLORS.text }}>{displayActivity.bonding_cues}</p>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Star size={20} fill={COLORS.coral} style={{ color: COLORS.coral }} />
              <span className="font-bold" style={{ color: '#9A3412' }}>Magic connection time!</span>
              <Star size={20} fill={COLORS.coral} style={{ color: COLORS.coral }} />
            </div>
          </div>
        </div>

        {/* Super Brain Facts - Why It Matters */}
        <div
          className="rounded-3xl overflow-hidden shadow-lg"
          style={{ background: COLORS.purplePale, border: `4px solid ${COLORS.purple}` }}
        >
          <button
            onClick={() => setExpandedSection(expandedSection === 'why' ? '' : 'why')}
            className="w-full p-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
                style={{ background: '#fff' }}
              >
                <Brain size={28} style={{ color: COLORS.purple }} />
              </div>
              <h2 className="text-xl font-black" style={{ color: COLORS.purple }}>Super Brain Facts</h2>
            </div>
            <ChevronDown
              size={28}
              className="transition-transform"
              style={{
                color: COLORS.purple,
                transform: expandedSection === 'why' ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>

          {expandedSection === 'why' && (
            <div className="px-5 pb-5">
              <p className="leading-relaxed font-medium" style={{ color: COLORS.purple }}>{displayActivity.why_it_matters}</p>
            </div>
          )}
        </div>

        {/* Extended Play - Premium Feature */}
        {displayActivity.extended_play && displayActivity.extended_play.length > 0 && (
          <div
            className="rounded-3xl overflow-hidden shadow-lg relative"
            style={{
              background: isPremium ? `linear-gradient(135deg, ${COLORS.goldLight} 0%, #FFF8E1 100%)` : '#F5F5F5',
              border: `4px solid ${isPremium ? COLORS.gold : '#E0E0E0'}`
            }}
          >
            {!isPremium && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                <button
                  onClick={onShowPaywall}
                  className="px-6 py-3 rounded-2xl font-bold text-white shadow-lg flex items-center gap-2"
                  style={{ background: COLORS.purple }}
                >
                  <Star size={20} fill="#FDC22D" style={{ color: '#FDC22D' }} />
                  Unlock Extended Play
                </button>
              </div>
            )}
            <button
              onClick={() => isPremium && setExpandedSection(expandedSection === 'extended' ? '' : 'extended')}
              className="w-full p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
                  style={{ background: '#fff' }}
                >
                  <Rocket size={28} style={{ color: COLORS.gold }} />
                </div>
                <div>
                  <h2 className="text-xl font-black" style={{ color: '#92400E' }}>Extended Play</h2>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: COLORS.gold, color: '#92400E' }}>
                    Premium
                  </span>
                </div>
              </div>
              {isPremium && (
                <ChevronDown
                  size={28}
                  className="transition-transform"
                  style={{
                    color: '#92400E',
                    transform: expandedSection === 'extended' ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                />
              )}
            </button>

            {isPremium && expandedSection === 'extended' && (
              <div className="px-5 pb-5 space-y-3">
                {displayActivity.extended_play.map((extension, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3"
                    style={{ border: `2px solid ${COLORS.gold}` }}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: COLORS.gold }}
                    >
                      <Star size={16} className="text-white" fill="#fff" />
                    </div>
                    <p className="font-medium pt-1" style={{ color: COLORS.text }}>{extension}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Parental Coaching - Expert Tips */}
        {displayActivity.parental_coaching && (
          <div
            className="rounded-3xl overflow-hidden shadow-lg"
            style={{ background: '#E8F5E9', border: '4px solid #4CAF50' }}
          >
            <button
              onClick={() => setExpandedSection(expandedSection === 'coaching' ? '' : 'coaching')}
              className="w-full p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
                  style={{ background: '#fff' }}
                >
                  <BookOpen size={28} style={{ color: '#4CAF50' }} />
                </div>
                <div>
                  <h2 className="text-xl font-black" style={{ color: '#2E7D32' }}>Parent Coaching</h2>
                  <span className="text-xs text-green-600">Expert guidance</span>
                </div>
              </div>
              <ChevronDown
                size={28}
                className="transition-transform"
                style={{
                  color: '#4CAF50',
                  transform: expandedSection === 'coaching' ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              />
            </button>

            {expandedSection === 'coaching' && (
              <div className="px-5 pb-5">
                <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border: '2px solid #4CAF50' }}>
                  <p className="leading-relaxed font-medium" style={{ color: COLORS.text }}>
                    {displayActivity.parental_coaching}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 mt-3 text-sm text-green-700">
                  <Shield size={16} />
                  <span className="font-medium">Reviewed by child development experts</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Complete Button - Fixed at bottom of content */}
      <div className="px-5 pb-8 pt-4">
        <button
          onClick={() => onComplete && onComplete({ reaction: '😊' })}
          className="w-full py-4 rounded-2xl font-black text-xl shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
          style={{
            background: `linear-gradient(135deg, ${COLORS.gold} 0%, #E5B000 100%)`,
            color: COLORS.purple,
            border: `4px solid ${COLORS.gold}`,
            boxShadow: `0 8px 30px ${COLORS.gold}80`
          }}
        >
          <Check size={28} strokeWidth={3} />
          Complete
        </button>
      </div>
    </div>
  );
};


// ============================================================
// PREVIEW WRAPPER
// ============================================================

const ActivityDetailPreview = () => {
  return (
    <div className="flex flex-col items-center p-4 md:p-8 min-h-screen" style={{ background: '#1a1a2e' }}>
      <h1 className="text-xl md:text-2xl font-bold text-white mb-2 text-center">Mooshie Moments - Activity Detail</h1>
      <p className="text-gray-400 mb-4 md:mb-6 text-sm">Magical Toybox Design (Production Ready)</p>
      
      {/* Phone mockup */}
      <div 
        className="relative rounded-[2rem] md:rounded-[3rem] p-2 md:p-3 shadow-2xl w-full max-w-[340px] md:max-w-[390px]"
        style={{ background: 'linear-gradient(145deg, #2d2d3a 0%, #1a1a2e 100%)' }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-5 md:h-7 bg-black rounded-b-xl md:rounded-b-2xl z-20"></div>
        
        <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-white" style={{ height: '700px' }}>
          <div className="h-full overflow-y-auto overflow-x-hidden">
            <ActivityDetailMooshie activity={SAMPLE_ACTIVITY} />
          </div>
        </div>
      </div>

      {/* Brand colors reference */}
      <div className="mt-6 flex gap-3">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full shadow-md" style={{ background: '#7A3E9D' }}></div>
          <span className="text-white/50 text-xs mt-1">Purple</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full shadow-md" style={{ background: '#FDC22D' }}></div>
          <span className="text-white/50 text-xs mt-1">Gold</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full shadow-md" style={{ background: '#F47C47' }}></div>
          <span className="text-white/50 text-xs mt-1">Coral</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full shadow-md" style={{ background: '#FFF9F0' }}></div>
          <span className="text-white/50 text-xs mt-1">Cream</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailMooshie;
