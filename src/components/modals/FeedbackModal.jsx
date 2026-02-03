import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { COLORS, MASCOTS } from '../../constants';

const CHILD_MASCOT_URL = MASCOTS.childWaving;

/**
 * FeedbackModal - Capture reaction after completing an activity
 * 
 * Props:
 * - profile: Object containing childName
 * - activity: The completed activity
 * - onSubmit: Function to save feedback ({ emoji, difficulty, length, repeat })
 * - onClose: Function to close/skip feedback
 */
const FeedbackModal = ({ profile, activity, onSubmit, onClose }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [length, setLength] = useState(null);
  const [wantRepeat, setWantRepeat] = useState(false);
  const [childMascotError, setChildMascotError] = useState(false);

  const emojis = [
    { emoji: '😍', label: 'LOVED IT', color: '#2EAD6D', bg: '#ECFDF5', message: 'Amazing! Building brilliant minds!' },
    { emoji: '😊', label: 'LIKED IT', color: COLORS.purple, bg: `${COLORS.purple}15`, message: 'Wonderful bonding time!' },
    { emoji: '😐', label: 'MEH', color: '#9CA3AF', bg: '#F3F4F6', message: 'No worries, every moment counts!' },
    { emoji: '😫', label: 'TOUGH DAY', color: COLORS.coral, bg: `${COLORS.coral}15`, message: 'You showed up. That matters most. 💜' },
  ];
  
  const selectedEmojiData = emojis.find(e => e.emoji === selectedEmoji);

  const handleContinue = () => {
    if (onSubmit) {
      onSubmit({
        emoji: selectedEmoji,
        difficulty,
        length,
        repeat: wantRepeat
      });
    }
  };

  const handleSkip = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="rounded-3xl w-full max-w-md overflow-hidden shadow-2xl" style={{ backgroundColor: COLORS.cream }}>
        
        {/* Celebration Header */}
        <div className="relative p-6 pb-8 text-center" style={{ 
          background: `linear-gradient(135deg, ${COLORS.purple} 0%, #9B5BC0 100%)`
        }}>
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 text-2xl opacity-50">✨</div>
          <div className="absolute top-6 right-6 text-xl opacity-50">🌟</div>
          <div className="absolute bottom-4 left-8 text-lg opacity-40">💜</div>
          <div className="absolute bottom-6 right-4 text-xl opacity-50">⭐</div>
          
          {/* Mascot */}
          <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg overflow-hidden" style={{ backgroundColor: 'white' }}>
            {!childMascotError ? (
              <img 
                src={CHILD_MASCOT_URL} 
                alt="Little Mooshie celebrating!" 
                className="w-20 h-20 object-cover"
                onError={() => setChildMascotError(true)}
              />
            ) : (
              <span className="text-5xl">🎉</span>
            )}
          </div>
          
          <h2 className="text-2xl font-black text-white mb-1">Spark Complete! 🎉</h2>
          <p className="text-white/80 text-sm">
            {profile?.childName || 'Your little one'} just built more neural pathways!
          </p>
        </div>
        
        {/* Content */}
        <div className="p-6">
          
          {/* Emoji Selection */}
          <p className="text-sm font-semibold mb-3 text-center" style={{ color: COLORS.text }}>
            How did it go?
          </p>
          
          <div className="grid grid-cols-4 gap-3 mb-4">
            {emojis.map(({ emoji, label, color, bg }) => (
              <button
                key={emoji}
                onClick={() => { setSelectedEmoji(emoji); setShowDetails(true); }}
                className="p-3 rounded-2xl transition-all"
                style={{ 
                  backgroundColor: selectedEmoji === emoji ? bg : 'white',
                  border: `2px solid ${selectedEmoji === emoji ? color : '#F0F0F0'}`,
                  transform: selectedEmoji === emoji ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: selectedEmoji === emoji ? `0 4px 12px ${color}30` : 'none'
                }}
              >
                <span className="text-3xl block mb-1">{emoji}</span>
                <span className="text-xs font-bold block" style={{ color: selectedEmoji === emoji ? color : COLORS.text }}>{label}</span>
              </button>
            ))}
          </div>
          
          {/* Response message based on emoji */}
          {selectedEmojiData && (
            <div className="text-center p-3 rounded-xl mb-4" style={{ backgroundColor: selectedEmojiData.bg }}>
              <p className="text-sm font-medium" style={{ color: selectedEmojiData.color }}>
                {selectedEmojiData.message}
              </p>
            </div>
          )}

          {/* Expanded Details (optional, shown after emoji selection) */}
          {showDetails && selectedEmoji && (
            <div className="space-y-4 mb-4">
              
              {/* Quick feedback - simplified */}
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border" style={{ borderColor: '#F0F0F0' }}>
                <span className="text-sm" style={{ color: COLORS.text }}>Want to do this again?</span>
                <button
                  onClick={() => setWantRepeat(!wantRepeat)}
                  className="w-14 h-8 rounded-full transition-all flex items-center px-1"
                  style={{ backgroundColor: wantRepeat ? COLORS.gold : '#E5E5E5' }}
                >
                  <div 
                    className="w-6 h-6 bg-white rounded-full shadow transition-all"
                    style={{ marginLeft: wantRepeat ? 'auto' : '0' }}
                  />
                </button>
              </div>
              
              {/* Optional: More details expandable */}
              <details className="bg-white rounded-xl border" style={{ borderColor: '#F0F0F0' }}>
                <summary className="p-3 cursor-pointer text-sm font-medium flex items-center justify-between" style={{ color: COLORS.text }}>
                  <span>More feedback (optional)</span>
                  <ChevronRight className="w-4 h-4" />
                </summary>
                <div className="px-3 pb-3 space-y-3">
                  {/* Difficulty */}
                  <div>
                    <p className="text-xs mb-2" style={{ color: COLORS.text }}>Difficulty</p>
                    <div className="flex gap-2">
                      {[
                        { id: 'easy', label: 'Easy' },
                        { id: 'perfect', label: 'Perfect' },
                        { id: 'hard', label: 'Hard' },
                      ].map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setDifficulty(opt.id)}
                          className="flex-1 py-2 rounded-lg text-xs font-medium"
                          style={{
                            backgroundColor: difficulty === opt.id ? `${COLORS.purple}15` : '#F5F5F5',
                            color: difficulty === opt.id ? COLORS.purple : COLORS.text
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Length */}
                  <div>
                    <p className="text-xs mb-2" style={{ color: COLORS.text }}>Length</p>
                    <div className="flex gap-2">
                      {[
                        { id: 'short', label: 'Short' },
                        { id: 'right', label: 'Just Right' },
                        { id: 'long', label: 'Long' },
                      ].map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setLength(opt.id)}
                          className="flex-1 py-2 rounded-lg text-xs font-medium"
                          style={{
                            backgroundColor: length === opt.id ? `${COLORS.purple}15` : '#F5F5F5',
                            color: length === opt.id ? COLORS.purple : COLORS.text
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </details>
            </div>
          )}

          {/* Actions */}
          <button
            onClick={handleContinue}
            disabled={!selectedEmoji}
            className="w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-md"
            style={{
              backgroundColor: selectedEmoji ? COLORS.gold : '#E5E5E5',
              color: selectedEmoji ? COLORS.purple : '#999'
            }}
          >
            {selectedEmoji ? 'Continue ✨' : 'How did it go?'}
          </button>
          
          <button
            onClick={handleSkip}
            className="w-full py-3 mt-2 text-sm"
            style={{ color: COLORS.text, opacity: 0.6 }}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
