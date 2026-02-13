import React from 'react';
import { Trash2 } from 'lucide-react';
import { COLORS } from '../../constants';

/**
 * ResetConfirmModal - Confirmation dialog for resetting all app data
 * 
 * Props:
 * - onConfirm: function called when user confirms reset
 * - onCancel: function called when user cancels
 */
const ResetConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="rounded-2xl p-6 w-full max-w-md text-center" style={{ backgroundColor: COLORS.cream }}>
        <Trash2 className="w-12 h-12 mx-auto mb-4" style={{ color: '#EF4444' }} />
        <h2 className="text-xl font-black mb-2" style={{ color: COLORS.purple }}>Reset All Data?</h2>
        <p className="mb-6" style={{ color: COLORS.text }}>This cannot be undone.</p>
        <button 
          onClick={onConfirm} 
          className="w-full py-4 rounded-xl font-bold mb-2" 
          style={{ backgroundColor: '#EF4444', color: 'white' }}
        >
          Reset Everything
        </button>
        <button 
          onClick={onCancel} 
          className="w-full py-4 rounded-xl" 
          style={{ backgroundColor: 'white', color: COLORS.text }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ResetConfirmModal;
