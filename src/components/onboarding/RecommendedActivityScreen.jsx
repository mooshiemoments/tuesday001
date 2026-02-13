// Screen 7: Recommended Activity - V2 with social proof
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

// Age-specific impressive activities for onboarding
const ACTIVITIES_BY_AGE = {
  '6-12 months': {
    title: 'Water Splash Discovery',
    emoji: '💦',
    description: 'Watch their eyes light up with safe water play! Splashing builds cause-and-effect understanding.',
    duration: '10 min',
    topic: 'Science & Discovery',
    topicColor: '#4ECDC4',
    items: ['Shallow container', 'Warm water', 'Floating toys'],
    rating: '4.9',
    parentQuote: 'Mesmerized for 20 minutes straight!',
    parentName: 'Jessica'
  },
  '1-2 years': {
    title: 'Color Sorting Adventure',
    emoji: '🌈',
    description: 'Transform snack time into learning! Sorting by color builds early math skills.',
    duration: '10 min',
    topic: 'Early Learning',
    topicColor: COLORS.purple,
    items: ['Colored cups', 'Pom poms or snacks'],
    rating: '4.8',
    parentQuote: 'Learned colors so fast with this!',
    parentName: 'Michael'
  },
  '2-3 years': {
    title: 'Magic Color Mixing',
    emoji: '🎨',
    description: 'Create "magic" by mixing colors! Watch red + yellow become orange before their eyes.',
    duration: '15 min',
    topic: 'Science & Art',
    topicColor: COLORS.coral,
    items: ['Food coloring', 'Clear cups', 'Water'],
    rating: '4.9',
    parentQuote: 'Thought I was a wizard!',
    parentName: 'Emma'
  },
  '3-4 years': {
    title: 'Frozen Treasure Rescue',
    emoji: '🧊',
    description: 'Freeze small toys in ice and let them "rescue" with warm water and tools!',
    duration: '20 min',
    topic: 'Science Adventure',
    topicColor: '#4ECDC4',
    items: ['Ice cube tray', 'Small toys', 'Warm water'],
    rating: '4.9',
    parentQuote: 'Kept the little one busy for an hour!',
    parentName: 'David'
  }
};

const DEFAULT_ACTIVITY = ACTIVITIES_BY_AGE['1-2 years'];

export default function RecommendedActivityScreen({
  name = 'Your child',
  ageBand = '1-2 years',
  activity,
  onStartActivity,
  onSkip,
}) {
  // Get age-appropriate activity or use provided one
  const ageActivity = ACTIVITIES_BY_AGE[ageBand] || DEFAULT_ACTIVITY;
  const displayActivity = activity ? { ...ageActivity, ...activity } : ageActivity;

  return (
    <div style={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: COLORS.cream,
      position: 'relative'
    }}>
      {/* Subtle sparkles in background */}
      <div style={{ position: 'absolute', top: '60px', left: '10%', fontSize: '14px', opacity: 0.15 }}>✨</div>
      <div style={{ position: 'absolute', top: '120px', right: '8%', fontSize: '10px', opacity: 0.12 }}>⭐</div>
      <div style={{ position: 'absolute', top: '200px', left: '5%', fontSize: '8px', opacity: 0.1 }}>✨</div>
      <div style={{ position: 'absolute', bottom: '180px', right: '12%', fontSize: '12px', opacity: 0.1 }}>🎉</div>

      <div style={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Compact Header */}
        <div style={{
          padding: '20px 20px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          {/* Mascot - smaller */}
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.purpleDark} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(122,62,157,0.3)',
            overflow: 'hidden'
          }}>
            <img 
              src={MASCOTS.adultCelebrating}
              alt="Mooshie celebrating"
              style={{ height: '50px', objectFit: 'contain' }}
              onError={(e) => { e.target.outerHTML = '<span style="font-size: 32px;">🎉</span>'; }}
            />
          </div>

          <div>
            <h1 style={{
              fontSize: '20px',
              fontWeight: 900,
              color: COLORS.purple,
              margin: '0 0 2px'
            }}>
              {name}'s first quick win
            </h1>
            <p style={{
              fontSize: '13px',
              color: COLORS.textLight,
              margin: 0
            }}>
              Zero prep • Ready in seconds
            </p>
          </div>
        </div>

        {/* Activity Card */}
        <div style={{
          margin: '0 16px',
          background: 'white',
          borderRadius: '24px',
          padding: '20px',
          border: `3px solid ${COLORS.gold}`,
          boxShadow: `0 6px 0 ${COLORS.coral}, 0 12px 24px rgba(0,0,0,0.08)`
        }}>
          
          {/* Activity Header */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            marginBottom: '12px'
          }}>
            {/* Emoji */}
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: `${displayActivity.topicColor}15`,
              border: `2px solid ${displayActivity.topicColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              flexShrink: 0
            }}>
              {displayActivity.emoji}
            </div>

            <div style={{ flex: 1 }}>
              <h2 style={{
                fontSize: '19px',
                fontWeight: 900,
                color: COLORS.purple,
                margin: '0 0 8px',
                lineHeight: 1.2
              }}>
                {displayActivity.title}
              </h2>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{
                  padding: '5px 10px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: 700,
                  background: COLORS.goldLight,
                  color: '#92400E'
                }}>
                  ⏱ {displayActivity.duration}
                </span>
                <span style={{
                  padding: '5px 10px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: 700,
                  background: `${displayActivity.topicColor}20`,
                  color: displayActivity.topicColor
                }}>
                  🎵 {displayActivity.topic}
                </span>
              </div>
            </div>
          </div>

          {/* Short description */}
          <p style={{
            fontSize: '14px',
            color: COLORS.text,
            lineHeight: 1.5,
            margin: '0 0 14px'
          }}>
            {displayActivity.description}
          </p>

          {/* What you need */}
          <div style={{
            background: COLORS.purplePale,
            borderRadius: '14px',
            padding: '12px 14px',
            marginBottom: '14px'
          }}>
            <p style={{
              fontSize: '11px',
              fontWeight: 800,
              color: COLORS.purple,
              margin: '0 0 8px'
            }}>
              💡 STUFF YOU HAVE
            </p>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {displayActivity.items.map((item, i) => (
                <span
                  key={i}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    fontWeight: 700,
                    background: 'white',
                    color: COLORS.text,
                    border: `2px solid ${COLORS.gold}`
                  }}
                >
                  {i === 0 ? '🥄' : '🥣'} {item}
                </span>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div style={{
            background: COLORS.goldLight,
            borderRadius: '12px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            {/* Rating */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'white',
              padding: '6px 10px',
              borderRadius: '10px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
            }}>
              <span style={{ color: COLORS.gold, fontSize: '14px' }}>★</span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: COLORS.text }}>
                {displayActivity.rating}
              </span>
            </div>

            {/* Quote */}
            <p style={{
              fontSize: '12px',
              color: COLORS.text,
              margin: 0,
              fontStyle: 'italic',
              flex: 1
            }}>
              "{displayActivity.parentQuote}" — <span style={{ fontWeight: 700 }}>{displayActivity.parentName}</span>
            </p>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Bottom CTAs */}
        <div style={{ padding: '16px' }}>
          {/* Primary CTA */}
          <button 
            onClick={onStartActivity}
            style={{
              width: '100%',
              padding: '18px',
              borderRadius: '18px',
              border: 'none',
              background: COLORS.gold,
              color: COLORS.purple,
              fontSize: '17px',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: `0 5px 0 ${COLORS.coral}`,
              marginBottom: '10px'
            }}
          >
            Let's Try It! ✨
          </button>

          {/* Secondary */}
          <button 
            onClick={onSkip}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '14px',
              border: 'none',
              background: 'transparent',
              color: COLORS.textLight,
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
