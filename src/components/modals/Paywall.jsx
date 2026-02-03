import React from 'react';
import { X, Star, Beaker } from 'lucide-react';
import { COLORS } from '../../constants';

/**
 * Paywall - Premium subscription upsell modal
 * 
 * Props:
 * - onClose: Function to close the modal
 * - onSubscribe: Function called when user subscribes (triggers premium activation)
 */
const Paywall = ({ onClose, onSubscribe, onPurchase, profile }) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSubscribe = () => {
    // Support both prop names for compatibility
    if (onPurchase) {
      onPurchase();
    } else if (onSubscribe) {
      onSubscribe();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end z-50">
      <div className="rounded-t-3xl p-6 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto relative" style={{ backgroundColor: COLORS.cream }}>
        <button onClick={handleClose} className="absolute top-4 right-4">
          <X className="w-6 h-6" style={{ color: COLORS.text }} />
        </button>
        
        <div className="text-center mb-6 pt-2">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.coral} 100%)` }}>
            <Star className="w-10 h-10 text-white" fill="white" />
          </div>
          <h2 className="text-2xl font-black" style={{ color: COLORS.purple }}>Mooshie Premium ⭐</h2>
          <p className="text-sm mt-1" style={{ color: COLORS.text }}>Unlock the full Mooshie experience</p>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="bg-white rounded-xl p-4 border-2" style={{ borderColor: COLORS.gold }}>
            <h3 className="font-bold flex items-center gap-2 mb-2" style={{ color: COLORS.purple }}>
              <Star className="w-5 h-5" style={{ color: COLORS.gold }} fill={COLORS.gold} />
              The Infinite Star
            </h3>
            <p className="text-sm" style={{ color: COLORS.text }}>Take every activity to the next level—same materials, deeper learning!</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 border" style={{ borderColor: `${COLORS.coral}50` }}>
            <h3 className="font-bold flex items-center gap-2 mb-2" style={{ color: COLORS.coral }}>🧸 Toys & 🍂 Seasonal</h3>
            <p className="text-sm" style={{ color: COLORS.text }}>Exclusive activity collections for every season!</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 border" style={{ borderColor: `${COLORS.purple}30` }}>
            <h3 className="font-bold flex items-center gap-2 mb-2" style={{ color: COLORS.purple }}>
              <Beaker className="w-5 h-5" />
              Mooshie Labs
            </h3>
            <p className="text-sm" style={{ color: COLORS.text }}>Submit your own ideas and save community favorites!</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 mb-6 text-center border" style={{ borderColor: '#E5E5E5' }}>
          <p className="text-3xl font-black" style={{ color: COLORS.purple }}>
            $39.99<span className="text-lg font-normal" style={{ color: COLORS.text }}>/year</span>
          </p>
          <p className="text-xs mt-1" style={{ color: COLORS.coral }}>That's just $3.33/month!</p>
        </div>
        
        <button 
          onClick={handleSubscribe} 
          className="w-full py-4 rounded-xl font-bold text-lg shadow-lg" 
          style={{ backgroundColor: COLORS.gold, color: COLORS.purple }}
        >
          ✨ Start 7-Day Free Trial
        </button>
        
        <p className="text-center text-xs mt-3" style={{ color: COLORS.text }}>
          Cancel anytime. No commitment.
        </p>
      </div>
    </div>
  );
};

export default Paywall;
