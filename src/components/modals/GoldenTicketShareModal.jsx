import React from 'react';
import { X } from 'lucide-react';
import { COLORS } from '../../constants';

/**
 * GoldenTicketShareModal - Share a golden ticket with a friend
 * 
 * Props:
 * - profile: { childName }
 * - goldenTickets: array of ticket objects
 * - setGoldenTickets: function to update tickets
 * - onClose: function to close the modal
 */
const GoldenTicketShareModal = ({ profile, goldenTickets = [], setGoldenTickets, onClose }) => {
  const ticketCode = `MOOSHIE-${profile?.childName?.toUpperCase().slice(0,4) || 'GOLD'}-${Date.now().toString(36).toUpperCase().slice(-4)}`;
  const shareUrl = `https://mooshiemoments.com/golden-ticket/${ticketCode}`;
  const shareText = `I got you a Golden Ticket to Mooshie 🎫 1 month Premium free - no catch. My kids love it.`;
  
  const shareOptions = [
    { 
      name: 'WhatsApp', 
      icon: '💬', 
      color: '#25D366', 
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank')
    },
    { 
      name: 'Text', 
      icon: '📱', 
      color: COLORS.purple, 
      action: () => window.open(`sms:?body=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank')
    },
    { 
      name: 'Copy Link', 
      icon: '📋', 
      color: COLORS.coral, 
      action: () => {
        navigator.clipboard?.writeText(shareText + ' ' + shareUrl);
        alert('Copied to clipboard!');
      }
    },
  ];
  
  const handleShare = (option) => {
    option.action();
    
    // Mark one ticket as "shared"
    if (setGoldenTickets) {
      const updatedTickets = [...goldenTickets];
      const availableIndex = updatedTickets.findIndex(t => t.status === 'available');
      if (availableIndex !== -1) {
        updatedTickets[availableIndex] = { 
          ...updatedTickets[availableIndex], 
          status: 'shared',
          sharedDate: Date.now()
        };
        setGoldenTickets(updatedTickets);
      }
    }
    
    if (onClose) onClose();
  };
  
  const availableTickets = goldenTickets.filter(t => t.status === 'available').length;
  
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-white rounded-t-3xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: COLORS.purple }}>🎫 Share a Golden Ticket</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" style={{ color: COLORS.text }} />
          </button>
        </div>
        
        {/* Ticket preview */}
        <div 
          className="rounded-xl p-4 mb-4 border-2 border-dashed" 
          style={{ backgroundColor: `${COLORS.gold}10`, borderColor: COLORS.gold }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎫</span>
            <div>
              <p className="font-bold text-sm" style={{ color: COLORS.purple }}>Golden Ticket</p>
              <p className="text-xs" style={{ color: COLORS.text }}>1 Month Premium Free</p>
            </div>
          </div>
        </div>
        
        {/* Message preview */}
        <div className="bg-gray-50 rounded-xl p-3 mb-4">
          <p className="text-sm italic" style={{ color: COLORS.text }}>
            "{shareText}"
          </p>
        </div>
        
        {/* Share options */}
        <div className="flex gap-3 mb-4">
          {shareOptions.map(option => (
            <button
              key={option.name}
              onClick={() => handleShare(option)}
              className="flex-1 flex flex-col items-center p-4 rounded-xl border transition-all hover:shadow-md"
              style={{ borderColor: '#E5E7EB' }}
            >
              <span className="text-2xl mb-1">{option.icon}</span>
              <span className="text-xs font-medium" style={{ color: COLORS.text }}>{option.name}</span>
            </button>
          ))}
        </div>
        
        <p className="text-xs text-center" style={{ color: COLORS.text, opacity: 0.5 }}>
          {availableTickets} ticket{availableTickets !== 1 ? 's' : ''} remaining
        </p>
      </div>
    </div>
  );
};

export default GoldenTicketShareModal;
