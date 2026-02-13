import React, { useState } from 'react';
import { Beaker, Plus, Lock, Crown, Star, ThumbsUp, Heart, Users, X, Send, Check, ChevronLeft } from 'lucide-react';

// =====================================================
// MOOSHIE LABS SCREEN - Community Ideas
// Extracted from App.jsx for better maintainability
// =====================================================

// Constants (import from '../../constants' when integrated)
const COLORS = {
  purple: '#7A3E9D',
  gold: '#FDC22D',
  coral: '#F47C47',
  cream: '#FFF9F0',
  text: '#4A4252',
};

const AGE_BANDS = ['6-12 months', '1-2 years', '2-3 years', '3-4 years'];

// =====================================================
// SUBMIT IDEA FORM MODAL
// =====================================================
const SubmitIdeaForm = ({ 
  profile, 
  onSubmit, 
  onClose 
}) => {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState('');
  const [steps, setSteps] = useState(['', '', '']);
  const [einsteinSkill, setEinsteinSkill] = useState('');
  const [ageBand, setAgeBand] = useState(profile?.ageBand || '2-3 years');

  const updateStep = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const addStep = () => {
    if (steps.length < 6) setSteps([...steps, '']);
  };

  const isValid = title && items && steps[0] && einsteinSkill;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit({
      title,
      items: items.split(',').map(i => i.trim()).filter(Boolean),
      steps: steps.filter(Boolean),
      einstein_skill: einsteinSkill,
      age_band: ageBand
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen p-4 flex items-start justify-center">
        <div className="rounded-2xl w-full max-w-md my-8" style={{ backgroundColor: COLORS.cream }}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black" style={{ color: COLORS.purple }}>Share Your Idea</h2>
              <button onClick={onClose}>
                <X className="w-6 h-6" style={{ color: COLORS.text }} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: COLORS.text }}>
                  Activity Title *
                </label>
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g., Kitchen Band Conductor"
                  className="w-full p-3 rounded-xl border-2 focus:outline-none"
                  style={{ borderColor: title ? COLORS.purple : '#E5E5E5', backgroundColor: 'white' }}
                />
              </div>

              {/* Age Band */}
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: COLORS.text }}>
                  Best For Age
                </label>
                <select 
                  value={ageBand}
                  onChange={e => setAgeBand(e.target.value)}
                  className="w-full p-3 rounded-xl border-2"
                  style={{ borderColor: '#E5E5E5', backgroundColor: 'white', color: COLORS.text }}
                >
                  {AGE_BANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* Items */}
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: COLORS.text }}>
                  Household Items Needed *
                </label>
                <input 
                  type="text"
                  value={items}
                  onChange={e => setItems(e.target.value)}
                  placeholder="e.g., pots, wooden spoons, blankets"
                  className="w-full p-3 rounded-xl border-2 focus:outline-none"
                  style={{ borderColor: items ? COLORS.purple : '#E5E5E5', backgroundColor: 'white' }}
                />
                <p className="text-xs mt-1" style={{ color: COLORS.text, opacity: 0.6 }}>
                  Separate with commas
                </p>
              </div>

              {/* Steps */}
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: COLORS.text }}>
                  Steps *
                </label>
                <div className="space-y-2">
                  {steps.map((step, i) => (
                    <div key={i} className="flex gap-2">
                      <span 
                        className="w-6 h-10 flex items-center justify-center text-sm" 
                        style={{ color: COLORS.purple }}
                      >
                        {i + 1}.
                      </span>
                      <input 
                        type="text"
                        value={step}
                        onChange={e => updateStep(i, e.target.value)}
                        placeholder={`Step ${i + 1}`}
                        className="flex-1 p-2 rounded-lg border focus:outline-none text-sm"
                        style={{ borderColor: step ? COLORS.purple : '#E5E5E5', backgroundColor: 'white' }}
                      />
                    </div>
                  ))}
                </div>
                {steps.length < 6 && (
                  <button 
                    onClick={addStep} 
                    className="text-sm mt-2 font-medium" 
                    style={{ color: COLORS.coral }}
                  >
                    + Add step
                  </button>
                )}
              </div>

              {/* Spark Secret */}
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: COLORS.text }}>
                  <Star className="w-4 h-4 inline mr-1" style={{ color: COLORS.gold }} fill={COLORS.gold} />
                  The Spark Secret *
                </label>
                <textarea 
                  value={einsteinSkill}
                  onChange={e => setEinsteinSkill(e.target.value)}
                  placeholder="How can you extend this activity to make it cognitively harder? (Using the SAME materials!)"
                  className="w-full p-3 rounded-xl border-2 focus:outline-none resize-none h-24"
                  style={{ borderColor: einsteinSkill ? COLORS.purple : '#E5E5E5', backgroundColor: 'white' }}
                />
                <p className="text-xs mt-1" style={{ color: COLORS.text, opacity: 0.6 }}>
                  Make it a cognitive challenge using the same items!
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button 
                onClick={handleSubmit}
                disabled={!isValid}
                className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                style={{ 
                  backgroundColor: isValid ? COLORS.gold : '#E5E5E5', 
                  color: isValid ? COLORS.purple : '#999' 
                }}
              >
                <Send className="w-5 h-5" />
                Share with Community
              </button>
              <button 
                onClick={onClose} 
                className="w-full py-3" 
                style={{ color: COLORS.text }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// SUCCESS TOAST
// =====================================================
const SubmitSuccessToast = () => (
  <div className="fixed top-4 left-4 right-4 z-50">
    <div 
      className="p-4 rounded-xl shadow-lg flex items-center gap-3 max-w-md mx-auto" 
      style={{ backgroundColor: '#2EAD6D' }}
    >
      <Check className="w-6 h-6 text-white" />
      <div>
        <p className="font-bold text-white">Idea Submitted!</p>
        <p className="text-sm text-white/80">Thanks for contributing to Mooshie Labs!</p>
      </div>
    </div>
  </div>
);

// =====================================================
// IDEA CARD COMPONENT
// =====================================================
const IdeaCard = ({ 
  idea, 
  isFavorited, 
  isPremium, 
  onLike, 
  onFavorite 
}) => (
  <div 
    className="bg-white rounded-xl p-4 shadow-sm border" 
    style={{ borderColor: '#F0F0F0' }}
  >
    {/* Attribution Badge */}
    <div className="flex items-center gap-2 mb-3">
      <span className="text-lg">💡</span>
      <span 
        className="text-xs font-medium px-2 py-1 rounded-full" 
        style={{ backgroundColor: `${COLORS.purple}15`, color: COLORS.purple }}
      >
        Community Genius: {idea.author}
      </span>
      <span className="text-xs ml-auto" style={{ color: COLORS.text }}>
        {idea.age_band}
      </span>
    </div>

    <h3 className="text-lg font-bold mb-2" style={{ color: COLORS.text }}>
      {idea.title}
    </h3>
    
    {/* Items */}
    <div className="flex flex-wrap gap-1 mb-3">
      {idea.items.map((item, i) => (
        <span 
          key={i} 
          className="text-xs px-2 py-1 rounded-full" 
          style={{ backgroundColor: `${COLORS.gold}20`, color: COLORS.text }}
        >
          {item}
        </span>
      ))}
    </div>

    {/* Steps Preview */}
    <div className="rounded-lg p-3 mb-3" style={{ backgroundColor: COLORS.cream }}>
      <p className="text-sm" style={{ color: COLORS.text }}>{idea.steps[0]}</p>
      {idea.steps.length > 1 && (
        <p className="text-xs mt-1" style={{ color: COLORS.text, opacity: 0.6 }}>
          +{idea.steps.length - 1} more steps
        </p>
      )}
    </div>

    {/* Spark Secret */}
    <div 
      className="rounded-lg p-3 mb-3 border" 
      style={{ backgroundColor: `${COLORS.gold}10`, borderColor: COLORS.gold }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Star className="w-4 h-4" style={{ color: COLORS.gold }} fill={COLORS.gold} />
        <span className="text-xs font-bold" style={{ color: COLORS.purple }}>
          The Spark Secret
        </span>
      </div>
      <p className="text-sm" style={{ color: COLORS.text }}>{idea.einstein_skill}</p>
    </div>

    {/* Actions */}
    <div 
      className="flex items-center justify-between pt-2 border-t" 
      style={{ borderColor: '#F0F0F0' }}
    >
      <button 
        onClick={() => onLike(idea.id)}
        className="flex items-center gap-1 transition-colors"
        style={{ color: COLORS.purple }}
      >
        <ThumbsUp className="w-5 h-5" />
        <span className="text-sm font-medium">{idea.likes}</span>
      </button>
      
      <button 
        onClick={() => onFavorite(idea.id)}
        className="flex items-center gap-1"
        style={{ color: isFavorited ? COLORS.coral : COLORS.text }}
      >
        <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
        <span className="text-sm">{isFavorited ? 'Saved' : 'Save'}</span>
        {!isPremium && <Lock className="w-3 h-3 ml-1" />}
      </button>
    </div>
  </div>
);

// =====================================================
// MAIN MOOSHIE LABS SCREEN
// =====================================================
export default function MooshieLabsScreen({
  // Data props
  communityIdeas = [],
  profile = {},
  activityData = {},
  isPremium = false,
  // Callbacks
  onLikeIdea,
  onFavoriteIdea,
  onSubmitIdea,
  onShowPaywall,
  onBack,
}) {
  const [filter, setFilter] = useState('all');
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);
  
  // Filter ideas by age band
  const filteredIdeas = filter === 'all' 
    ? communityIdeas 
    : communityIdeas.filter(i => i.age_band === filter);
  
  // Sort by likes (most popular first)
  const sortedIdeas = [...filteredIdeas].sort((a, b) => b.likes - a.likes);

  // Handle submit
  const handleSubmit = (idea) => {
    if (onSubmitIdea) {
      onSubmitIdea(idea);
    }
    setShowSubmitForm(false);
    setShowSubmitSuccess(true);
    setTimeout(() => setShowSubmitSuccess(false), 3000);
  };

  // Handle like (with premium check)
  const handleLike = (ideaId) => {
    if (!isPremium) {
      if (onShowPaywall) onShowPaywall();
      return;
    }
    if (onLikeIdea) onLikeIdea(ideaId);
  };

  // Handle favorite (with premium check)
  const handleFavorite = (ideaId) => {
    if (!isPremium) {
      if (onShowPaywall) onShowPaywall();
      return;
    }
    if (onFavoriteIdea) onFavoriteIdea(ideaId);
  };

  return (
    <div 
      className="min-h-screen pb-24" 
      style={{ background: `linear-gradient(180deg, ${COLORS.purple}10 0%, ${COLORS.cream} 30%)` }}
    >
      <div className="p-6">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-1 mb-4 font-bold text-sm"
          style={{ color: COLORS.purple }}
        >
          <ChevronLeft size={20} />
          Back
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Beaker className="w-6 h-6" style={{ color: COLORS.purple }} />
              <h1 className="text-2xl font-black" style={{ color: COLORS.purple }}>
                Mooshie Labs
              </h1>
            </div>
            <p className="text-sm" style={{ color: COLORS.text }}>
              Community activity ideas
            </p>
          </div>
          
          {isPremium ? (
            <button 
              onClick={() => setShowSubmitForm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold"
              style={{ backgroundColor: COLORS.gold, color: COLORS.purple }}
            >
              <Plus className="w-5 h-5" />
              Submit
            </button>
          ) : (
            <button 
              onClick={() => onShowPaywall?.()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold"
              style={{ backgroundColor: '#E5E5E5', color: '#999' }}
            >
              <Lock className="w-4 h-4" />
              Submit
            </button>
          )}
        </div>

        {/* Premium Banner for non-premium users */}
        {!isPremium && (
          <div 
            className="rounded-xl p-4 mb-6 text-white" 
            style={{ background: `linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.coral} 100%)` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5" style={{ color: COLORS.gold }} />
              <p className="font-bold">Premium Feature</p>
            </div>
            <p className="text-white/80 text-sm mb-3">
              Submit your own ideas and save community favorites!
            </p>
            <button 
              onClick={() => onShowPaywall?.()}
              className="px-4 py-2 rounded-lg font-bold text-sm" 
              style={{ backgroundColor: COLORS.gold, color: COLORS.purple }}
            >
              Unlock Premium ✨
            </button>
          </div>
        )}

        {/* Age Filter */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          <button 
            onClick={() => setFilter('all')}
            className="flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ 
              backgroundColor: filter === 'all' ? COLORS.purple : 'white', 
              color: filter === 'all' ? 'white' : COLORS.text 
            }}
          >
            All Ages
          </button>
          {AGE_BANDS.map(band => (
            <button 
              key={band}
              onClick={() => setFilter(band)}
              className="flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ 
                backgroundColor: filter === band ? COLORS.purple : 'white', 
                color: filter === band ? 'white' : COLORS.text 
              }}
            >
              {band}
            </button>
          ))}
        </div>

        {/* Ideas List */}
        <div className="space-y-4">
          {sortedIdeas.map(idea => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              isFavorited={activityData.communityFavorites?.includes(idea.id)}
              isPremium={isPremium}
              onLike={handleLike}
              onFavorite={handleFavorite}
            />
          ))}
        </div>

        {/* Empty State */}
        {sortedIdeas.length === 0 && (
          <div className="text-center py-12">
            <Users 
              className="w-12 h-12 mx-auto mb-4" 
              style={{ color: COLORS.purple, opacity: 0.3 }} 
            />
            <p style={{ color: COLORS.text }}>No ideas yet for this age group</p>
            {isPremium && (
              <p className="text-sm mt-2" style={{ color: COLORS.coral }}>
                Be the first to share!
              </p>
            )}
          </div>
        )}
      </div>

      {/* Submit Form Modal */}
      {showSubmitForm && (
        <SubmitIdeaForm
          profile={profile}
          onSubmit={handleSubmit}
          onClose={() => setShowSubmitForm(false)}
        />
      )}

      {/* Success Toast */}
      {showSubmitSuccess && <SubmitSuccessToast />}

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

// =====================================================
// HOW TO USE IN App.jsx:
// 
// 1. Save this file as src/components/screens/MooshieLabsScreen.jsx
// 
// 2. Import at top of App.jsx:
//    import MooshieLabsScreen from './components/screens/MooshieLabsScreen';
// 
// 3. Replace the MooshieLabs usage in render:
//    {screen === 'labs' && (
//      <>
//        <MooshieLabsScreen 
//          communityIdeas={communityIdeas}
//          profile={profile}
//          activityData={activityData}
//          isPremium={isPremium}
//          onLikeIdea={handleLikeIdea}
//          onFavoriteIdea={handleFavoriteCommunityIdea}
//          onSubmitIdea={handleSubmitIdea}
//          onShowPaywall={() => setShowPaywall(true)}
//        />
//        <TabNav />
//      </>
//    )}
// 
// 4. You can also remove the following from App.jsx:
//    - MooshieLabs component (lines ~3325-3482)
//    - SubmitIdeaForm component (lines ~3485-3621)
//    - SubmitSuccessToast component (lines ~3624-3634)
//    - showSubmitForm state and setShowSubmitForm
//    - showSubmitSuccess state and setShowSubmitSuccess
// 
// 5. Keep these functions in App.jsx (they manage global state):
//    - handleSubmitIdea (modify to just update communityIdeas)
//    - handleLikeIdea
//    - handleFavoriteCommunityIdea
// =====================================================
