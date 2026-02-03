import React, { useState } from 'react';
import { X, Share2, Camera } from 'lucide-react';
import { COLORS } from '../../constants';

/**
 * EinsteinShareCard - Shareable progress report card
 * 
 * Props:
 * - profile: { childName, ageBand }
 * - stats: { topicProgress, totalMoments }
 * - activityData: { completed: [] }
 * - onClose: function to close the card
 * - onFinishCompletionFlow: function to finish completion flow (if in completion flow)
 * - completedActivity: current completed activity (if in completion flow)
 */
const EinsteinShareCard = ({ 
  profile, 
  stats, 
  activityData,
  onClose,
  onFinishCompletionFlow,
  completedActivity
}) => {
  const [photo, setPhoto] = useState(null);
  const [stickers, setStickers] = useState([]);
  const [activeSticker, setActiveSticker] = useState(null);

  const topicShortNames = {
    'Science & Physics': 'Science',
    'Math & Logic': 'Math',
    'Gross Motor': 'Movement',
    'Fine Motor': 'Art',
    'Music & Rhythm': 'Music',
    'Social & Emotional': 'Social',
    'Sensory Exploration': 'Sensory',
    'Language & Storytelling': 'Language',
  };

  const handlePhotoUpload = (e) => { 
    const file = e.target.files?.[0]; 
    if (file) { 
      const reader = new FileReader(); 
      reader.onload = (event) => setPhoto(event.target?.result); 
      reader.readAsDataURL(file); 
    } 
  };
  
  const addSticker = (type) => { 
    setStickers([...stickers, { id: Date.now(), type, x: 20, y: 20, scale: 1 }]); 
  };
  
  const resizeSticker = (id, delta) => { 
    setStickers(stickers.map(s => s.id === id ? { ...s, scale: Math.max(0.5, Math.min(s.scale + delta, 2)) } : s)); 
  };
  
  const removeSticker = (id) => { 
    setStickers(stickers.filter(s => s.id !== id)); 
    setActiveSticker(null); 
  };

  // Calculate grades based on progress
  const getGrade = (count) => {
    if (count >= 5) return { grade: 'A+', color: '#2EAD6D' };
    if (count >= 3) return { grade: 'A', color: '#2EAD6D' };
    if (count >= 2) return { grade: 'B+', color: COLORS.purple };
    if (count >= 1) return { grade: 'B', color: COLORS.purple };
    return { grade: '—', color: '#9CA3AF' };
  };

  const subjects = [
    { name: 'Science', key: 'Science & Physics', emoji: '🔬' },
    { name: 'Mathematics', key: 'Math & Logic', emoji: '🔢' },
    { name: 'Physical Ed', key: 'Gross Motor', emoji: '🏃' },
    { name: 'Art & Craft', key: 'Fine Motor', emoji: '✂️' },
    { name: 'Music', key: 'Music & Rhythm', emoji: '🎵' },
    { name: 'Social Skills', key: 'Social & Emotional', emoji: '💙' },
  ];

  const comments = [
    "Shows exceptional curiosity and enthusiasm!",
    "A natural explorer with a brilliant mind!",
    "Approaches learning with joy and wonder!",
    "Outstanding progress! Future genius! ⭐",
  ];
  
  const [comment] = useState(comments[Math.floor(Math.random() * comments.length)]);
  const totalActivities = activityData?.completed?.length || 0;
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const handleShare = async () => {
    const topTopics = Object.entries(stats?.topicProgress || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([topic]) => topicShortNames[topic] || topic);
    
    const caption = `📋 ${profile.childName}'s Progress Report just dropped!\n\n✅ ${totalActivities} brain-building activities completed\n🎯 Top subjects: ${topTopics.join(', ') || 'All-rounder!'}\n💰 Tuition: $0\n\nWho needs expensive toys? 🧠✨\n\n#MooshieMoments #JunkDrawerGenius #ParentingWin`;
    
    if (navigator.share) { 
      try { 
        await navigator.share({ title: 'Progress Report', text: caption }); 
      } catch {} 
    } else { 
      navigator.clipboard?.writeText(caption); 
      alert('Caption copied to clipboard!'); 
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
    // Only run full completion flow cleanup if we were in completion flow
    if (completedActivity && onFinishCompletionFlow) {
      onFinishCompletionFlow();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto" style={{ background: `linear-gradient(135deg, ${COLORS.purple} 0%, #4A4252 100%)` }}>
      <div className="min-h-screen flex flex-col items-center py-6 px-4">
        {/* Header buttons */}
        <div className="w-full max-w-sm flex justify-between items-center mb-6">
          <button onClick={handleClose} className="text-white/80 flex items-center gap-2 hover:text-white">
            <X className="w-6 h-6" /> Close
          </button>
          <button 
            onClick={handleShare} 
            className="px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg" 
            style={{ backgroundColor: COLORS.gold, color: COLORS.purple }}
          >
            <Share2 className="w-5 h-5" /> Share
          </button>
        </div>

        {/* THE REPORT CARD */}
        <div className="rounded-3xl overflow-hidden shadow-2xl relative" style={{ width: '320px', backgroundColor: COLORS.cream }}>
          
          {/* Decorative top border */}
          <div className="h-3" style={{ background: `linear-gradient(90deg, ${COLORS.purple} 0%, ${COLORS.coral} 50%, ${COLORS.gold} 100%)` }} />
          
          {/* Header */}
          <div className="text-center py-4 bg-white/50">
            <div className="flex justify-center items-center gap-2 mb-1">
              <span className="text-2xl">🎓</span>
              <h1 className="text-xl font-black tracking-tight" style={{ color: COLORS.purple }}>PROGRESS REPORT</h1>
              <span className="text-2xl">🎓</span>
            </div>
            <p className="text-sm font-medium" style={{ color: COLORS.coral }}>Mooshie Academy</p>
            <p className="text-xs mt-1" style={{ color: COLORS.text }}>{today}</p>
          </div>

          {/* Student Card */}
          <div className="mx-4 mb-4 bg-white rounded-2xl p-4 shadow-md border border-amber-200">
            <div className="flex gap-4">
              {/* Photo */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl overflow-hidden shadow-inner border-2 border-amber-300">
                  {photo ? (
                    <img src={photo} alt="Student" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-amber-400">
                      <Camera className="w-8 h-8" />
                    </div>
                  )}
                  {stickers.map(sticker => (
                    <div 
                      key={sticker.id} 
                      className={`absolute cursor-pointer ${activeSticker === sticker.id ? 'ring-2 ring-blue-400 ring-offset-1' : ''}`} 
                      style={{ left: sticker.x, top: sticker.y, transform: `scale(${sticker.scale})`, transformOrigin: 'top left' }} 
                      onClick={() => setActiveSticker(sticker.id)}
                    >
                      {sticker.type === 'star' && <span className="text-2xl drop-shadow-md">⭐</span>}
                      {sticker.type === 'glasses' && <span className="text-2xl drop-shadow-md">🤓</span>}
                      {sticker.type === 'heart' && <span className="text-2xl drop-shadow-md">💜</span>}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Student Details */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-amber-600 font-medium">STUDENT</p>
                <p className="font-black text-slate-800 text-xl truncate">{profile.childName}</p>
                <p className="text-amber-700 text-sm mt-1">{profile.ageBand}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-yellow-500">★★★★★</span>
                </div>
              </div>
            </div>
            
            {/* Photo Controls */}
            <div className="flex justify-center gap-2 mt-3 pt-3 border-t border-amber-100">
              <label className="bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs cursor-pointer flex items-center gap-1 font-semibold shadow-sm">
                <Camera className="w-4 h-4" /> Add Photo
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
              <button onClick={() => addSticker('star')} className="bg-yellow-400 px-2.5 py-1.5 rounded-lg text-sm shadow-sm">⭐</button>
              <button onClick={() => addSticker('glasses')} className="bg-purple-200 px-2.5 py-1.5 rounded-lg text-sm shadow-sm">🤓</button>
              <button onClick={() => addSticker('heart')} className="bg-pink-200 px-2.5 py-1.5 rounded-lg text-sm shadow-sm">💜</button>
              {activeSticker && (
                <>
                  <button onClick={() => resizeSticker(activeSticker, 0.3)} className="bg-slate-200 px-2 py-1.5 rounded-lg text-xs font-bold">+</button>
                  <button onClick={() => resizeSticker(activeSticker, -0.3)} className="bg-slate-200 px-2 py-1.5 rounded-lg text-xs font-bold">−</button>
                  <button onClick={() => removeSticker(activeSticker)} className="bg-red-400 text-white px-2 py-1.5 rounded-lg text-xs">✕</button>
                </>
              )}
            </div>
          </div>

          {/* Grades */}
          <div className="mx-4 mb-4 bg-white rounded-2xl overflow-hidden shadow-md border border-amber-200">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white text-sm font-bold py-2 px-4 flex">
              <span className="flex-1">SUBJECT</span>
              <span className="w-14 text-center">GRADE</span>
            </div>
            {subjects.map((subject, i) => {
              const progress = stats?.topicProgress?.[subject.key] || 0;
              const { grade, color } = getGrade(progress);
              return (
                <div key={subject.key} className={`flex items-center py-2.5 px-4 ${i % 2 === 0 ? 'bg-amber-50/50' : 'bg-white'}`}>
                  <span className="text-lg mr-2">{subject.emoji}</span>
                  <span className="flex-1 text-slate-700 font-medium">{subject.name}</span>
                  <span className="w-14 text-center font-black text-xl" style={{ color }}>{grade}</span>
                </div>
              );
            })}
          </div>

          {/* Teacher Comment */}
          <div className="mx-4 mb-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-dashed border-purple-300">
            <p className="text-purple-700 font-bold text-sm mb-1">📝 Teacher's Note:</p>
            <p className="text-slate-700 italic">"{comment}"</p>
          </div>

          {/* Stats Footer */}
          <div className="mx-4 mb-4 flex justify-between items-center">
            <div className="text-center bg-white rounded-xl px-4 py-3 shadow-sm border border-amber-200">
              <p className="text-3xl font-black text-amber-600">{totalActivities}</p>
              <p className="text-xs text-amber-700 font-medium">Activities</p>
            </div>
            
            <div className="text-center bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl px-5 py-3 shadow-sm border-2 border-green-400">
              <p className="text-xs font-bold text-green-700">💰 TUITION</p>
              <p className="text-3xl font-black text-green-600">$0</p>
            </div>
            
            <div className="text-center bg-white rounded-xl px-4 py-3 shadow-sm border border-amber-200">
              <p className="text-3xl font-black text-amber-600">
                {Object.values(stats?.topicProgress || {}).filter(v => v > 0).length || 1}
              </p>
              <p className="text-xs text-amber-700 font-medium">Subjects</p>
            </div>
          </div>

          {/* Certified Stamp */}
          <div className="absolute top-32 right-4 transform rotate-12">
            <div className="bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg" style={{ border: '3px solid #991B1B' }}>
              <p className="text-xs font-black tracking-wide">✓ GENIUS</p>
              <p className="text-xs font-black tracking-wide">CERTIFIED</p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-center py-2">
            <p className="text-white/90 text-xs font-medium">mooshiemoments.app ✨</p>
          </div>
        </div>

        {/* Call to action below card */}
        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm mb-3">Tap Share to brag (you've earned it!)</p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={handleShare}
              className="px-8 py-3 rounded-xl font-bold shadow-lg"
              style={{ backgroundColor: COLORS.gold, color: COLORS.purple }}
            >
              📸 Share Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EinsteinShareCard;
