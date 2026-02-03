import React from 'react';
import { X } from 'lucide-react';
import { COLORS } from '../../constants';

/**
 * ShareModal - Share app with others via various platforms
 * 
 * Props:
 * - onClose: Function to close the modal
 * - onShareComplete: Function called after sharing (optionally receives platform name)
 */
const ShareModal = ({ onClose, onShareComplete }) => {
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
      // Try to copy to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText + ' ' + shareUrl);
      }
    } else if (option.url) {
      window.open(option.url, '_blank');
    }
    
    if (onShareComplete) {
      onShareComplete(option.name);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className="rounded-t-3xl p-6 w-full max-w-md" style={{ backgroundColor: COLORS.cream }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-black" style={{ color: COLORS.purple }}>Share Mooshie 💜</h2>
          <button onClick={handleClose}>
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

export default ShareModal;
