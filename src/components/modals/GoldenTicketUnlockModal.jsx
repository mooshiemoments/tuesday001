import React from 'react';
import { COLORS } from '../../constants';

/**
 * GoldenTicketUnlockModal - Shown when user becomes premium, unlocking 3 golden tickets
 * 
 * Props:
 * - goldenTickets: array of ticket objects
 * - onShareTicket: function to open the share ticket modal
 * - onClose: function to close this modal
 */
const GoldenTicketUnlockModal = ({ goldenTickets = [], onShareTicket, onClose }) => {
  const availableTickets = goldenTickets.filter(t => t.status === 'available').length;
  
  const handleShareTicket = () => {
    if (onClose) onClose();
    if (onShareTicket) onShareTicket();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center relative overflow-hidden">
        {/* Golden sparkle background */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            background: `radial-gradient(circle at 30% 20%, ${COLORS.gold} 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${COLORS.gold} 0%, transparent 50%)`
          }} 
        />
        
        <div className="relative">
          {/* Ticket icons */}
          <div className="flex justify-center gap-2 mb-4">
            <span className="text-5xl">🎫</span>
            <span className="text-5xl">🎫</span>
            <span className="text-5xl">🎫</span>
          </div>
          
          <h2 className="text-2xl font-black mb-2" style={{ color: COLORS.purple }}>
            You've Unlocked 3 Golden Tickets!
          </h2>
          
          <p className="text-sm mb-6" style={{ color: COLORS.text }}>
            Give a friend <span className="font-bold" style={{ color: COLORS.gold }}>1 month of Premium free</span>. 
            Because parenting is better together. 💜
          </p>
          
          <button
            onClick={handleShareTicket}
            className="w-full py-4 rounded-xl font-bold text-lg mb-3 shadow-lg"
            style={{ backgroundColor: COLORS.gold, color: COLORS.purple }}
          >
            🎫 Share a Ticket
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-medium"
            style={{ backgroundColor: '#F5F5F5', color: COLORS.text }}
          >
            Maybe Later
          </button>
          
          <p className="text-xs mt-4" style={{ color: COLORS.text, opacity: 0.5 }}>
            You can always find your tickets in Profile
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoldenTicketUnlockModal;
