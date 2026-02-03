import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { COLORS } from '../../constants';

/**
 * MemoryModal - Capture memory text after activity completion
 * 
 * Props:
 * - profile: Object containing childName
 * - activity: The completed activity object (with title)
 * - reactionEmoji: The emoji selected in feedback (optional)
 * - onSave: Function to save memory text (memoryText) => void
 * - onSkip: Function to skip memory capture
 */
const MemoryModal = ({ profile, activity, reactionEmoji, onSave, onSkip }) => {
  const [mem, setMem] = useState('');
  
  const handleSave = () => {
    if (onSave) {
      onSave(mem);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="rounded-2xl p-6 w-full max-w-md" style={{ backgroundColor: COLORS.cream }}>
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${COLORS.purple}15` }}>
            <span className="text-3xl">{reactionEmoji || '📝'}</span>
          </div>
          <h2 className="text-xl font-black" style={{ color: COLORS.purple }}>Capture the Moment</h2>
          <p className="text-sm mt-1" style={{ color: COLORS.text }}>{activity?.title}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" style={{ color: COLORS.text }}>
            Add to {profile?.childName || "your child"}'s timeline:
          </label>
          <textarea 
            value={mem} 
            onChange={e => setMem(e.target.value)} 
            placeholder="What happened? What did they say? Any funny moments?" 
            className="w-full p-4 rounded-xl border-2 focus:outline-none resize-none h-28"
            style={{ borderColor: '#E5E5E5', backgroundColor: 'white' }}
          />
        </div>
        <button 
          onClick={handleSave} 
          className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 mb-2"
          style={{ backgroundColor: COLORS.gold, color: COLORS.purple }}
        >
          <BookOpen className="w-5 h-5" />Save to Timeline
        </button>
        <button 
          onClick={handleSkip} 
          className="w-full py-2" 
          style={{ color: COLORS.text }}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default MemoryModal;
