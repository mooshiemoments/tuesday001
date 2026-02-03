import React from 'react';
import { Share2 } from 'lucide-react';
import { COLORS } from '../../constants';

/**
 * MilestoneModal - Celebrate milestone achievements
 * 
 * Props:
 * - profile: Object containing childName
 * - milestoneType: String ('milestone5', 'milestone10', 'reportUnlock', 'milestone25', 'milestone50')
 * - onShare: Function to handle share action (for reportUnlock)
 * - onClose: Function to close the modal
 */
const MilestoneModal = ({ profile, milestoneType, onShare, onClose }) => {
  const childName = profile?.childName || 'Your little one';
  
  const milestoneContent = {
    milestone5: {
      emoji: '🔥',
      title: '5 Sparks!',
      subtitle: "You're on fire!",
      message: "You're building something beautiful together. Keep going!",
      showShare: false
    },
    milestone10: {
      emoji: '⭐',
      title: '10 Sparks!',
      subtitle: 'Double digits!',
      message: "You're officially a Mooshie Master. Amazing commitment!",
      showShare: false
    },
    reportUnlock: {
      emoji: '🎉',
      title: 'Report Unlocked!',
      subtitle: "You've earned it!",
      message: `${childName}'s Progress Report is ready! Share your learning journey with friends and family.`,
      showShare: true
    },
    milestone25: {
      emoji: '🏆',
      title: '25 Sparks!',
      subtitle: 'Quarter century!',
      message: "You're in the top tier of engaged parents. Incredible!",
      showShare: false
    },
    milestone50: {
      emoji: '👑',
      title: '50 Sparks!',
      subtitle: 'Legendary!',
      message: `${childName} has a truly dedicated parent. You're making a real difference.`,
      showShare: false
    }
  };

  const content = milestoneContent[milestoneType] || milestoneContent.milestone5;

  const handleShare = () => {
    if (onShare) {
      onShare();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
      <div className="rounded-3xl p-8 w-full max-w-md text-center overflow-hidden relative" style={{ backgroundColor: COLORS.cream }}>
        {/* Confetti background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-3 h-3 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: [COLORS.gold, COLORS.coral, COLORS.purple][i % 3],
                opacity: 0.3,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.coral} 100%)` }}
          >
            <span className="text-5xl">{content.emoji}</span>
          </div>
          
          <h2 className="text-3xl font-black mb-1" style={{ color: COLORS.purple }}>{content.title}</h2>
          <p className="text-lg font-bold mb-4" style={{ color: COLORS.coral }}>{content.subtitle}</p>
          <p className="mb-6" style={{ color: COLORS.text }}>{content.message}</p>

          {content.showShare ? (
            <>
              <button 
                onClick={handleShare}
                className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 mb-3 shadow-lg"
                style={{ backgroundColor: COLORS.gold, color: COLORS.purple }}
              >
                <Share2 className="w-5 h-5" />
                See My Report! 📋
              </button>
              <button 
                onClick={handleClose}
                className="w-full py-3 rounded-xl font-medium"
                style={{ color: COLORS.text }}
              >
                Maybe Later
              </button>
            </>
          ) : (
            <button 
              onClick={handleClose}
              className="w-full py-4 rounded-xl font-bold text-lg shadow-lg"
              style={{ backgroundColor: COLORS.gold, color: COLORS.purple }}
            >
              Keep Going! ✨
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MilestoneModal;
