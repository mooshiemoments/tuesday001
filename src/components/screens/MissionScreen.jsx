import React, { useState } from 'react';
import { ChevronLeft, Share2, X } from 'lucide-react';

// =====================================================
// MISSION SCREEN - Share & Unlock Values Packs
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

const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/mooshiemoments',
  tiktok: 'https://www.tiktok.com/@mooshiemoments',
  facebook: 'https://www.facebook.com/people/Mooshie-Moments/61586858073521/'
};

const MISSION_PACKS = [
  { id: 'kindness', name: 'Kindness Pack', icon: '🤗', topic: 'Kindness Pack', sharesRequired: 3, socialRequired: null, description: 'Gentle hands, caring for others, empathy activities' },
  { id: 'manners', name: 'Manners Pack', icon: '🙏', topic: 'Manners Pack', sharesRequired: 5, socialRequired: null, description: 'Please, thank you, greetings, table manners' },
  { id: 'sharing', name: 'Sharing & Turns Pack', icon: '🤝', topic: 'Sharing & Turns Pack', sharesRequired: 7, socialRequired: 'instagram', description: 'Taking turns, sharing, cooperative play' },
  { id: 'helper', name: 'Little Helper Pack', icon: '🧹', topic: 'Little Helper Pack', sharesRequired: 10, socialRequired: 'tiktok', description: 'Age-appropriate chores, being helpful' },
  { id: 'gratitude', name: 'Gratitude Pack', icon: '💜', topic: 'Gratitude Pack', sharesRequired: 12, socialRequired: 'facebook', description: 'Thankfulness, appreciation, giving back' }
];

// =====================================================
// SHARE MODAL COMPONENT
// =====================================================
const ShareModal = ({ onClose, onShare }) => {
  const shareText = "I found this really cool app 'Mooshie Moments' - gives you 5 minute activities to do with your lil ones just from stuff in your home. Thought you might want to check it out, its so much fun 💜";
  const shareUrl = "https://mooshiemoments.com";
  
  const shareOptions = [
    { name: 'WhatsApp', icon: '💬', color: '#25D366', url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}` },
    { name: 'Facebook', icon: '👍', color: '#1877F2', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}` },
    { name: 'Twitter/X', icon: '🐦', color: '#1DA1F2', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText + ' ' + shareUrl)}` },
    { name: 'Email', icon: '📧', color: '#EA4335', url: `mailto:?subject=${encodeURIComponent("Check out this app!")}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}` },
    { name: 'Copy Link', icon: '📋', color: COLORS.purple, action: 'copy' },
  ];

  const handleShareOption = (option) => {
    if (option.action === 'copy') {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText + ' ' + shareUrl);
      }
    } else if (option.url) {
      window.open(option.url, '_blank');
    }
    onShare(option.name);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className="rounded-t-3xl p-6 w-full max-w-md" style={{ backgroundColor: COLORS.cream }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-black" style={{ color: COLORS.purple }}>Share Mooshie 💜</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" style={{ color: COLORS.text }} />
          </button>
        </div>
        
        <p className="text-sm mb-4" style={{ color: COLORS.text }}>
          Choose how you'd like to share and help us reach 1 million parents!
        </p>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          {shareOptions.map(option => (
            <button
              key={option.name}
              onClick={() => handleShareOption(option)}
              className="flex flex-col items-center p-4 rounded-xl bg-white border transition-all hover:shadow-md"
              style={{ borderColor: '#E5E7EB' }}
            >
              <span className="text-2xl mb-1">{option.icon}</span>
              <span className="text-xs font-medium" style={{ color: COLORS.text }}>{option.name}</span>
            </button>
          ))}
        </div>
        
        <div className="bg-white rounded-xl p-3 mb-4 border" style={{ borderColor: '#E5E7EB' }}>
          <p className="text-xs" style={{ color: COLORS.text, opacity: 0.7 }}>
            "{shareText}"
          </p>
        </div>
        
        <p className="text-xs text-center" style={{ color: COLORS.text, opacity: 0.6 }}>
          Every share counts toward unlocking Values Packs! 🎉
        </p>
      </div>
    </div>
  );
};

// =====================================================
// VALUE PACK CARD COMPONENT
// =====================================================
const ValuePackCard = ({ 
  pack, 
  isUnlocked, 
  progress, 
  onSocialFollow 
}) => (
  <div 
    className="bg-white rounded-xl p-4 border-2 transition-all"
    style={{ 
      borderColor: isUnlocked ? '#2EAD6D' : '#E5E7EB',
      opacity: isUnlocked ? 1 : 0.9
    }}
  >
    <div className="flex items-center gap-3">
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
        style={{ backgroundColor: isUnlocked ? '#ECFDF5' : '#F3F4F6' }}
      >
        {isUnlocked ? '✅' : pack.icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span 
            className="font-bold" 
            style={{ color: isUnlocked ? '#2EAD6D' : COLORS.text }}
          >
            {pack.name}
          </span>
          {isUnlocked && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
              UNLOCKED
            </span>
          )}
        </div>
        <p className="text-xs" style={{ color: COLORS.text, opacity: 0.6 }}>
          {pack.description}
        </p>
        
        {!isUnlocked && (
          <div className="flex items-center gap-2 mt-2">
            <span 
              className={`text-xs px-2 py-0.5 rounded-full ${
                progress.sharesMet ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {progress.sharesMet ? '✓' : ''} {pack.sharesRequired} shares
            </span>
            {pack.socialRequired && (
              <button
                onClick={() => onSocialFollow(pack.socialRequired)}
                className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  progress.socialMet ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}
              >
                {progress.socialMet ? '✓' : '+'} Follow {
                  pack.socialRequired === 'instagram' ? 'Instagram' : 
                  pack.socialRequired === 'tiktok' ? 'TikTok' : 'Facebook'
                }
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

// =====================================================
// MAIN MISSION SCREEN
// =====================================================
export default function MissionScreen({
  // Data props
  mission = { shareCount: 0, socialFollows: {}, unlockedPacks: [] },
  isPremium = false,
  // Callbacks
  onShare,
  onSocialFollow,
  onBack,
  onShowConfetti,
}) {
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Stats
  const totalParents = 124; // Current Mooshie parents
  const goalParents = 1000000;
  const progressPercent = Math.max(0.5, (totalParents / goalParents) * 100);

  // Check if pack is unlocked
  const isPackUnlocked = (packId) => {
    if (isPremium) return true;
    return mission.unlockedPacks?.includes(packId) || false;
  };

  // Get pack progress
  const getPackProgress = (pack) => {
    const sharesNeeded = pack.sharesRequired;
    const sharesMet = (mission.shareCount || 0) >= sharesNeeded;
    const socialMet = !pack.socialRequired || mission.socialFollows?.[pack.socialRequired];
    return { sharesNeeded, sharesMet, socialMet, isUnlocked: sharesMet && socialMet };
  };

  // Handle share button click
  const handleShareClick = () => {
    setShowShareModal(true);
  };

  // Handle completing a share
  const handleCompleteShare = (method) => {
    if (onShare) {
      onShare(method);
    }
    setShowShareModal(false);
    
    // Trigger confetti
    if (onShowConfetti) {
      onShowConfetti();
    }
  };

  // Handle social follow
  const handleSocialFollow = (platform) => {
    // Open social link
    window.open(SOCIAL_LINKS[platform], '_blank');
    
    // Notify parent after delay (honor system)
    setTimeout(() => {
      if (onSocialFollow) {
        onSocialFollow(platform);
      }
    }, 3000);
  };

  // Handle back navigation
  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: COLORS.cream }}>
      <div className="p-6">
        {/* Back Button */}
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 mb-4"
          style={{ color: COLORS.purple }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back to Profile</span>
        </button>
        
        {/* Mission Header */}
        <div className="text-center mb-6">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" 
            style={{ background: `linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.coral} 100%)` }}
          >
            <span className="text-4xl">🌍</span>
          </div>
          <h1 className="text-2xl font-black mb-2" style={{ color: COLORS.purple }}>
            Join the Mission
          </h1>
          <p className="text-sm" style={{ color: COLORS.text }}>
            Help us reach <strong>1,000,000 parents</strong> worldwide
          </p>
        </div>

        {/* Emotional Message */}
        <div 
          className="bg-white rounded-xl p-5 mb-6 shadow-sm border" 
          style={{ borderColor: '#F0F0F0' }}
        >
          <p className="text-sm leading-relaxed" style={{ color: COLORS.text }}>
            We want to help <strong style={{ color: COLORS.purple }}>1 million parents</strong> put down screens and pick up moments.
          </p>
          <p className="text-sm leading-relaxed mt-3" style={{ color: COLORS.text }}>
            We're not backed by big tech. We don't have Zuckerberg's billions. We're <strong>parents, just like you</strong> — building this because we believe every child deserves present, playful parents.
          </p>
          <p className="text-sm leading-relaxed mt-3 font-semibold" style={{ color: COLORS.purple }}>
            We need YOUR help to spread the word. 💜
          </p>
        </div>

        {/* Progress Bar */}
        <div 
          className="bg-white rounded-xl p-4 mb-6 shadow-sm border" 
          style={{ borderColor: '#F0F0F0' }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold" style={{ color: COLORS.text }}>
              🌍 Parents in Mooshie
            </span>
            <span className="text-sm" style={{ color: COLORS.text }}>
              {totalParents.toLocaleString()} / 1M
            </span>
          </div>
          <div 
            className="w-full h-3 rounded-full overflow-hidden" 
            style={{ backgroundColor: '#E5E7EB' }}
          >
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${progressPercent}%`, 
                minWidth: '8px',
                background: `linear-gradient(90deg, ${COLORS.purple} 0%, ${COLORS.coral} 100%)`
              }}
            />
          </div>
          <p 
            className="text-xs text-center mt-2" 
            style={{ color: COLORS.text, opacity: 0.6 }}
          >
            Every share brings us closer to changing a million childhoods
          </p>
        </div>

        {/* Your Contribution */}
        <div 
          className="bg-white rounded-xl p-4 mb-6 shadow-sm border" 
          style={{ borderColor: COLORS.gold }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold" style={{ color: COLORS.text }}>You've shared</p>
              <p className="text-3xl font-black" style={{ color: COLORS.purple }}>
                {mission.shareCount || 0} times
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm" style={{ color: COLORS.text, opacity: 0.6 }}>
                Families you've reached
              </p>
              <p className="text-xl font-bold" style={{ color: COLORS.coral }}>
                ~{(mission.shareCount || 0) * 3}
              </p>
            </div>
          </div>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShareClick}
          className="w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 mb-6"
          style={{ backgroundColor: COLORS.purple, color: 'white' }}
        >
          <Share2 className="w-5 h-5" />
          Share Mooshie 💜
        </button>

        {/* Unlock Packs Section */}
        <div className="mb-4">
          <h2 className="text-lg font-black mb-1" style={{ color: COLORS.purple }}>
            Unlock Value Packs
          </h2>
          <p className="text-sm mb-4" style={{ color: COLORS.text, opacity: 0.7 }}>
            Share & follow to unlock activities about kindness, manners, gratitude & more
          </p>
        </div>

        {/* Value Packs List */}
        <div className="space-y-3">
          {MISSION_PACKS.map(pack => (
            <ValuePackCard
              key={pack.id}
              pack={pack}
              isUnlocked={isPackUnlocked(pack.id)}
              progress={getPackProgress(pack)}
              onSocialFollow={handleSocialFollow}
            />
          ))}
        </div>

        {/* Social Follow Section */}
        <div className="mt-6 mb-4">
          <h3 className="text-sm font-bold mb-3" style={{ color: COLORS.purple }}>
            Follow us for tips & activities
          </h3>
          <div className="flex gap-3">
            <button
              onClick={() => handleSocialFollow('instagram')}
              className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium"
              style={{ 
                backgroundColor: mission.socialFollows?.instagram ? '#ECFDF5' : '#F3F4F6',
                color: mission.socialFollows?.instagram ? '#2EAD6D' : COLORS.text
              }}
            >
              {mission.socialFollows?.instagram ? '✓' : '📸'} Instagram
            </button>
            <button
              onClick={() => handleSocialFollow('tiktok')}
              className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium"
              style={{ 
                backgroundColor: mission.socialFollows?.tiktok ? '#ECFDF5' : '#F3F4F6',
                color: mission.socialFollows?.tiktok ? '#2EAD6D' : COLORS.text
              }}
            >
              {mission.socialFollows?.tiktok ? '✓' : '🎵'} TikTok
            </button>
            <button
              onClick={() => handleSocialFollow('facebook')}
              className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium"
              style={{ 
                backgroundColor: mission.socialFollows?.facebook ? '#ECFDF5' : '#F3F4F6',
                color: mission.socialFollows?.facebook ? '#2EAD6D' : COLORS.text
              }}
            >
              {mission.socialFollows?.facebook ? '✓' : '👍'} Facebook
            </button>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-8 pb-4">
          <p className="text-sm italic" style={{ color: COLORS.text, opacity: 0.7 }}>
            "We don't have billions.<br/>We have <strong>YOU</strong>. Thank you." 💜
          </p>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal 
          onClose={() => setShowShareModal(false)}
          onShare={handleCompleteShare}
        />
      )}
    </div>
  );
}

// =====================================================
// HOW TO USE IN App.jsx:
// 
// 1. Save this file as src/components/screens/MissionScreen.jsx
// 
// 2. Import at top of App.jsx:
//    import MissionScreen from './components/screens/MissionScreen';
// 
// 3. Replace the MissionScreen usage in render:
//    {screen === 'mission' && (
//      <>
//        <MissionScreen 
//          mission={mission}
//          isPremium={isPremium}
//          onShare={(method) => completeShare(method)}
//          onSocialFollow={(platform) => handleSocialFollow(platform)}
//          onBack={() => { setScreen('profile'); setActiveTab('profile'); }}
//          onShowConfetti={() => { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 1500); }}
//        />
//        <TabNav />
//      </>
//    )}
// 
// 4. You can remove from App.jsx:
//    - MissionScreen component (lines ~5412-5606)
//    - ShareModal component (lines ~5620-5684) - only the one used by MissionScreen
//    
// 5. Keep these functions in App.jsx (they manage global state):
//    - completeShare (updates mission state)
//    - handleSocialFollow (updates mission state)
//    - isPackUnlocked (used elsewhere)
//    - getPackProgress (used elsewhere)
// =====================================================
