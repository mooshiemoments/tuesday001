// Screen 5: Play Pulse Questions - Magical Toybox Design
// Goes BETWEEN Name+DOB and Personalizing
// Mascot: Adult Searching

import React from 'react';
import { MASCOTS } from '../../constants';

const COLORS = {
  purple: '#7A3E9D',
  purpleDark: '#5D2D7A',
  gold: '#FDC22D',
  goldLight: '#FEF3C7',
  coral: '#F47C47',
  coralLight: '#FFEBE5',
  purplePale: '#F3E8FF',
  cream: '#FFF9F0',
  text: '#4A4252',
  textLight: '#6B5B73',
};

// ============================================================
// PLAY PULSE QUESTIONS BY AGE BAND
// ============================================================
export const PLAY_PULSE_QUESTIONS = {
  '6-12 months': [
    { question: 'Does [NAME] reach for toys?', key: 'reachForToys' },
    { question: 'Does [NAME] respond to their name?', key: 'respondsToName' },
    { question: 'Does [NAME] enjoy tummy time?', key: 'tummyTime' },
  ],
  '1-2 years': [
    { question: 'Does [NAME] walk independently?', key: 'walks' },
    { question: 'Does [NAME] say any words?', key: 'saysWords' },
    { question: 'Does [NAME] stack blocks?', key: 'stacksBlocks' },
  ],
  '2-3 years': [
    { question: 'Does [NAME] run confidently?', key: 'runs' },
    { question: 'Does [NAME] speak in sentences?', key: 'sentences' },
    { question: 'Does [NAME] pretend play?', key: 'pretendPlay' },
  ],
  '3-4 years': [
    { question: 'Does [NAME] pedal a tricycle?', key: 'pedals' },
    { question: 'Does [NAME] tell simple stories?', key: 'tellsStories' },
    { question: 'Does [NAME] play with other kids?', key: 'playsWith' },
  ],
};

// ============================================================
// PLAY PULSE SCREEN COMPONENT
// ============================================================
export default function PlayPulseScreen({
  name = 'Your child',
  ageBand = '1-2 years',
  currentQuestion = 0,
  onAnswer,
  onBack,
}) {
  const questions = PLAY_PULSE_QUESTIONS[ageBand] || PLAY_PULSE_QUESTIONS['1-2 years'];
  const totalQuestions = questions.length;
  const question = questions[currentQuestion];
  const questionText = question?.question.replace('[NAME]', name);

  return (
    <div style={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: `linear-gradient(180deg, ${COLORS.cream} 0%, ${COLORS.purplePale}40 100%)`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Decorative elements */}
      <div style={{ position: 'absolute', top: '15%', left: '8%', fontSize: '24px', opacity: 0.08 }}>❓</div>
      <div style={{ position: 'absolute', top: '25%', right: '5%', fontSize: '16px', opacity: 0.06 }}>✨</div>
      <div style={{ position: 'absolute', bottom: '30%', left: '5%', fontSize: '20px', opacity: 0.06 }}>🧩</div>

      {/* Header with back + progress */}
      <div style={{ padding: '16px 20px' }}>
        {/* Back button */}
        {currentQuestion === 0 && (
          <button 
            onClick={onBack}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              border: 'none',
              background: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: COLORS.purple,
              marginBottom: '12px'
            }}
          >
            ←
          </button>
        )}

        {/* Progress bar */}
        <div style={{ 
          display: 'flex', 
          gap: '6px', 
          marginBottom: '8px' 
        }}>
          {questions.map((_, i) => (
            <div 
              key={i} 
              style={{ 
                flex: 1, 
                height: '6px', 
                borderRadius: '3px', 
                background: i <= currentQuestion ? COLORS.purple : '#E5E5E5',
                transition: 'all 0.3s ease'
              }} 
            />
          ))}
        </div>
        <p style={{ 
          fontSize: '13px', 
          color: COLORS.textLight,
          margin: 0
        }}>
          Quick check {currentQuestion + 1} of {totalQuestions}
        </p>
      </div>

      {/* Mascot - Adult Searching */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <img
          src={MASCOTS.adultSearching}
          alt="Mooshie searching"
          style={{
            height: '240px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.2))'
          }}
          onError={(e) => { e.target.outerHTML = '<span style="font-size: 150px; line-height: 1;">🔍</span>'; }}
        />
      </div>

      {/* Question Card */}
      <div style={{
        margin: '0 16px 16px',
        background: 'white',
        borderRadius: '24px',
        padding: '24px 20px',
        border: `3px solid ${COLORS.purple}`,
        boxShadow: `0 6px 0 ${COLORS.purpleDark}, 0 12px 24px rgba(0,0,0,0.1)`,
      }}>
        {/* Question text */}
        <h1 style={{
          fontSize: '22px',
          fontWeight: 900,
          color: COLORS.purple,
          margin: '0 0 20px',
          lineHeight: 1.3,
          textAlign: 'center'
        }}>
          {questionText}
        </h1>
        
        {/* Answer buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={() => onAnswer('yes', question.key)}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '16px',
              border: `3px solid ${COLORS.gold}`,
              background: `linear-gradient(135deg, ${COLORS.goldLight} 0%, ${COLORS.gold}30 100%)`,
              color: COLORS.text,
              fontSize: '17px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: `0 4px 0 ${COLORS.coral}`,
              transition: 'transform 0.1s ease'
            }}
          >
            Yes ✓
          </button>
          <button
            onClick={() => onAnswer('notyet', question.key)}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '16px',
              border: '2px solid #E5E5E5',
              background: 'white',
              color: COLORS.textLight,
              fontSize: '17px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Not yet
          </button>
        </div>

        {/* Reassurance text */}
        <p style={{
          fontSize: '12px',
          color: COLORS.textLight,
          textAlign: 'center',
          margin: '16px 0 0',
          opacity: 0.7
        }}>
          No right or wrong — just helps us personalize! 💜
        </p>
      </div>
    </div>
  );
}
