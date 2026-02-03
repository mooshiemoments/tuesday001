// Screen 6: Personalizing - Category Loading Animation
import React, { useState, useEffect } from 'react';
import { MASCOTS } from '../../constants';

const COLORS = {
  purple: '#7A3E9D',
  purpleDark: '#5D2D7A',
  gold: '#FDC22D',
  coral: '#F47C47',
};

const categories = [
  { emoji: '🧠', name: 'Life Skills', count: '150+' },
  { emoji: '🌈', name: 'Sensory Play', count: '200+' },
  { emoji: '✋', name: 'Fine Motor', count: '175+' },
  { emoji: '🎵', name: 'Music & Movement', count: '120+' },
  { emoji: '🎨', name: 'Creative Play', count: '180+' },
];

export default function PersonalizingScreen({
  name = 'Your child',
  ageBand = '1-2 years',
  onComplete,
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const isComplete = currentStep >= categories.length;
  const progress = (currentStep / categories.length) * 100;

  // Auto-advance animation
  useEffect(() => {
    if (currentStep < categories.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div style={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: `linear-gradient(180deg, ${COLORS.purple} 0%, ${COLORS.purpleDark} 100%)`,
      padding: '24px 16px 16px'
    }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <img 
          src={MASCOTS.adultSearching}
          alt="Mooshie searching"
          style={{ height: '90px', objectFit: 'contain', marginBottom: '8px' }}
          onError={(e) => { e.target.outerHTML = '<div style="font-size: 70px; margin-bottom: 8px;">🤔</div>'; }}
        />
        <h2 style={{ 
          color: 'white', 
          fontSize: '20px', 
          fontWeight: 900, 
          margin: '0 0 6px' 
        }}>
          Personalizing for {name}
        </h2>
        <span style={{
          background: 'rgba(255,255,255,0.15)',
          padding: '5px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 700,
          color: COLORS.gold
        }}>
          👶 {ageBand} stage
        </span>
      </div>

      {/* Categories */}
      <div style={{ flex: 1 }}>
        {categories.map((cat, i) => {
          const isLoaded = i < currentStep;
          const isLoading = i === currentStep && !isComplete;

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                marginBottom: '6px',
                borderRadius: '12px',
                background: isLoaded ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                opacity: isLoaded ? 1 : isLoading ? 0.8 : 0.3,
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isLoaded ? COLORS.gold : 'rgba(255,255,255,0.1)'
                }}>
                  {isLoaded ? (
                    <span style={{ fontSize: '13px', color: COLORS.purple }}>✓</span>
                  ) : (
                    <span style={{ fontSize: '13px' }}>{cat.emoji}</span>
                  )}
                </div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>
                  {cat.name}
                </span>
              </div>
              {isLoaded && (
                <span style={{ fontSize: '14px', fontWeight: 800, color: COLORS.gold }}>
                  {cat.count}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom: Progress or Complete */}
      <div style={{ marginTop: '16px' }}>
        {!isComplete ? (
          <div style={{
            height: '8px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: COLORS.gold,
              transition: 'width 0.4s ease'
            }} />
          </div>
        ) : (
          <div>
            {/* Stats */}
            <div style={{
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '14px',
              padding: '14px',
              textAlign: 'center',
              marginBottom: '12px'
            }}>
              <p style={{ fontSize: '28px', fontWeight: 900, color: COLORS.gold, margin: 0 }}>
                2,000+
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: '4px 0 0' }}>
                activities unlocked for {name} 🎉
              </p>
            </div>

            {/* CTA Button */}
            <button 
              onClick={onComplete}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                border: 'none',
                background: COLORS.gold,
                color: COLORS.purple,
                fontSize: '16px',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: `0 4px 0 ${COLORS.coral}`
              }}
            >
              See {name}'s First Activity →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
