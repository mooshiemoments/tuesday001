import React from 'react';
import { COLORS, AGE_PROGRESSION } from '../../constants';

/**
 * AgeProgressionModal - Prompts user to update child's age band
 * 
 * Props:
 * - profile: { childName, ageBand }
 * - activitiesData: array of activities (to count activities per age band)
 * - onUpdateAge: function(nextBand) called when user confirms age update
 * - onDismiss: function called when user wants to stay on current age band
 * - onClose: function called to close the modal
 */
const AgeProgressionModal = ({ 
  profile, 
  activitiesData = [], 
  onUpdateAge, 
  onDismiss,
  onClose 
}) => {
  const currentBand = profile.ageBand;
  const nextBand = AGE_PROGRESSION?.[currentBand]?.next;
  const nextBandCount = nextBand ? activitiesData.filter(a => a.age_band === nextBand).length : 0;
  const currentCount = activitiesData.filter(a => a.age_band === currentBand).length;
  
  const handleUpdateAge = () => {
    if (onUpdateAge) onUpdateAge(nextBand);
    if (onClose) onClose();
  };
  
  const handleDismiss = () => {
    if (onDismiss) onDismiss();
    if (onClose) onClose();
  };
  
  if (!nextBand) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="rounded-2xl p-6 w-full max-w-md" style={{ backgroundColor: COLORS.cream }}>
        <div className="text-center mb-6">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" 
            style={{ background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.coral} 100%)` }}
          >
            <span className="text-4xl">🎂</span>
          </div>
          <h2 className="text-2xl font-black mb-2" style={{ color: COLORS.purple }}>
            {profile.childName} is Growing Up!
          </h2>
          <p style={{ color: COLORS.text }}>
            Ready to move from <span className="font-bold">{currentBand}</span> to{' '}
            <span className="font-bold" style={{ color: COLORS.coral }}>{nextBand}</span>?
          </p>
        </div>
        
        {/* What changes */}
        <div className="bg-white rounded-xl p-4 mb-4">
          <h3 className="font-bold mb-3" style={{ color: COLORS.purple }}>What's new:</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xl">📚</span>
              <span style={{ color: COLORS.text }}>
                <strong>{nextBandCount}</strong> NEW activities unlocked
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">🧠</span>
              <span style={{ color: COLORS.text }}>Age-appropriate cognitive challenges</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">💪</span>
              <span style={{ color: COLORS.text }}>More advanced skills to develop</span>
            </div>
          </div>
        </div>
        
        {/* Reassurance */}
        <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: `${COLORS.purple}10` }}>
          <p className="text-sm" style={{ color: COLORS.text }}>
            <strong style={{ color: COLORS.purple }}>Don't worry!</strong> You can still access your 
            favorites from {currentBand} in your saved activities. This just updates your Daily Sparks.
          </p>
        </div>
        
        <button 
          onClick={handleUpdateAge}
          className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 mb-3"
          style={{ backgroundColor: COLORS.gold, color: COLORS.purple }}
        >
          🎉 Yes, Update to {nextBand}!
        </button>
        <button 
          onClick={handleDismiss}
          className="w-full py-3 rounded-xl"
          style={{ backgroundColor: 'white', color: COLORS.text }}
        >
          Not yet, stay on {currentBand}
        </button>
      </div>
    </div>
  );
};

export default AgeProgressionModal;
