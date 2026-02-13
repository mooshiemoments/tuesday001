// ParentalGate - Simple math challenge for Kids Category compliance
// Only appears before purchase actions

import React, { useState, useMemo } from 'react';
import { X, Lock } from 'lucide-react';

const COLORS = {
  purple: '#7A3E9D',
  purplePale: '#F3E8FF',
  gold: '#FDC22D',
  cream: '#FFF9F0',
  text: '#4A4252',
  textLight: '#6B5B73',
  red: '#E53935',
};

const ParentalGate = ({ onPass, onClose, title = 'Grown-ups only' }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  // Generate a simple math problem
  const problem = useMemo(() => {
    const a = Math.floor(Math.random() * 20) + 5;
    const b = Math.floor(Math.random() * 15) + 3;
    return { a, b, answer: a + b };
  }, []);

  const handleSubmit = () => {
    if (parseInt(answer) === problem.answer) {
      onPass();
    } else {
      setError(true);
      setAnswer('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="mx-6 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative"
        style={{ background: COLORS.cream, border: `4px solid ${COLORS.purple}` }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: '#f0f0f0' }}
        >
          <X size={16} style={{ color: COLORS.textLight }} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: COLORS.purplePale }}
          >
            <Lock size={28} style={{ color: COLORS.purple }} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-center mb-1" style={{ color: COLORS.purple }}>
          {title}
        </h3>
        <p className="text-sm text-center mb-5" style={{ color: COLORS.textLight }}>
          Please solve this to continue
        </p>

        {/* Math problem */}
        <div
          className="text-center py-4 px-6 rounded-2xl mb-4"
          style={{ background: '#fff', border: `3px solid ${error ? COLORS.red : COLORS.gold}` }}
        >
          <p className="text-3xl font-black" style={{ color: COLORS.text }}>
            {problem.a} + {problem.b} = ?
          </p>
        </div>

        {/* Input */}
        <input
          type="number"
          inputMode="numeric"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Your answer"
          className="w-full p-4 rounded-2xl text-center text-xl font-bold mb-4 outline-none"
          style={{
            background: '#fff',
            border: `3px solid ${error ? COLORS.red : '#E5E5E5'}`,
            color: COLORS.text,
          }}
          autoFocus
        />

        {/* Error message */}
        {error && (
          <p className="text-center text-sm font-bold mb-3" style={{ color: COLORS.red }}>
            That's not quite right — try again!
          </p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!answer}
          className="w-full py-4 rounded-2xl font-black text-lg transition-all active:scale-95"
          style={{
            background: answer ? COLORS.gold : '#E5E5E5',
            color: answer ? COLORS.purple : COLORS.textLight,
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ParentalGate;
