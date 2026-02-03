// WelcomeCarousel - Magical Toybox Design
// 3 slides: Logo/Welcome, Empathy, Discovery Lab

import React from 'react';
import { MASCOTS, LOGO_URL } from '../../constants';

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
  teal: '#20B2AA',
};

// ============================================================
// SLIDE 1: Welcome / Logo
// ============================================================
const Slide1Content = () => {
  const floatingActivities = [
    {
      title: 'Magic Color Mixing',
      duration: '10 min',
      topic: 'Science',
      topicColor: '#20B2AA',
      emoji: '🎨',
      position: { top: '50px', left: '10px' },
      rotation: '-5deg'
    },
    {
      title: 'Frozen Treasure Hunt',
      duration: '15 min',
      topic: 'Adventure',
      topicColor: COLORS.gold,
      emoji: '🧊',
      position: { top: '130px', right: '8px' },
      rotation: '4deg'
    },
    {
      title: 'Pillow Fort Castle',
      duration: '20 min',
      topic: 'Imagination',
      topicColor: COLORS.coral,
      emoji: '🏰',
      position: { bottom: '175px', left: '6px' },
      rotation: '-3deg'
    },
  ];

  return (
    <div style={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: `linear-gradient(180deg, ${COLORS.purple} 0%, #4A2270 50%, ${COLORS.purpleDark} 100%)`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative stars */}
      <div style={{ position: 'absolute', top: '40px', left: '48%', fontSize: '10px', opacity: 0.35 }}>⭐</div>
      <div style={{ position: 'absolute', top: '95px', right: '25%', fontSize: '7px', opacity: 0.25 }}>✨</div>
      <div style={{ position: 'absolute', top: '190px', left: '40%', fontSize: '5px', opacity: 0.2 }}>⭐</div>
      <div style={{ position: 'absolute', top: '70px', left: '25%', fontSize: '6px', opacity: 0.2 }}>✨</div>
      
      {/* Floating Activity Cards */}
      {floatingActivities.map((activity, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            ...activity.position,
            background: 'white',
            borderRadius: '12px',
            padding: '8px 10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            transform: `rotate(${activity.rotation})`,
            zIndex: 5,
            border: `2px solid ${activity.topicColor}`,
            maxWidth: '125px'
          }}
        >
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '10px',
            background: `${activity.topicColor}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            marginBottom: '5px'
          }}>
            {activity.emoji}
          </div>
          
          <p style={{ 
            fontSize: '10px', 
            fontWeight: 800, 
            color: COLORS.purple, 
            margin: 0,
            lineHeight: 1.2
          }}>
            {activity.title}
          </p>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px', 
            marginTop: '4px' 
          }}>
            <span style={{
              padding: '2px 5px',
              borderRadius: '6px',
              fontSize: '7px',
              fontWeight: 700,
              background: `${activity.topicColor}20`,
              color: activity.topicColor
            }}>
              {activity.topic}
            </span>
            <span style={{
              fontSize: '7px',
              fontWeight: 600,
              color: COLORS.textLight
            }}>
              {activity.duration}
            </span>
          </div>
        </div>
      ))}
      
      {/* Logo / Mascot Area */}
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 20px 0',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Logo - larger size, no text needed since logo includes branding */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 12px 30px rgba(0,0,0,0.35))'
        }}>
          <img 
            src={LOGO_URL}
            alt="Mooshie Moments"
            style={{ height: '280px', objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SLIDE 2: Empathy / "We get it"
// ============================================================
const Slide2Content = () => {
  const proofCards = [
    {
      title: 'Bubble Volcano',
      type: 'Guided',
      typeIcon: '👀',
      duration: '10 min',
      emoji: '🌋',
      position: { top: '25px', left: '10px' },
      rotation: '-4deg',
      color: COLORS.coral
    },
    {
      title: 'Indoor Camping',
      type: 'Solo',
      typeIcon: '🎨',
      duration: '20 min',
      emoji: '⛺',
      position: { top: '65px', right: '8px' },
      rotation: '5deg',
      color: COLORS.teal
    },
  ];

  return (
    <div style={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: `linear-gradient(180deg, ${COLORS.coral}15 0%, ${COLORS.purple} 25%, ${COLORS.purpleDark} 100%)`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative elements */}
      <div style={{ position: 'absolute', top: '55px', left: '48%', fontSize: '8px', opacity: 0.25 }}>💜</div>
      <div style={{ position: 'absolute', top: '130px', left: '40%', fontSize: '6px', opacity: 0.2 }}>✨</div>
      
      {/* Floating Proof Cards */}
      {proofCards.map((card, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            ...card.position,
            background: 'white',
            borderRadius: '14px',
            padding: '10px 12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transform: `rotate(${card.rotation})`,
            zIndex: 5,
            border: `2px solid ${card.color}`,
            minWidth: '115px'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '6px'
          }}>
            <span style={{
              background: `${card.color}20`,
              padding: '2px 6px',
              borderRadius: '6px',
              fontSize: '8px',
              fontWeight: 800,
              color: card.color
            }}>
              {card.typeIcon} {card.type}
            </span>
          </div>
          
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: `${card.color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            marginBottom: '6px'
          }}>
            {card.emoji}
          </div>
          
          <p style={{ 
            fontSize: '11px', 
            fontWeight: 800, 
            color: COLORS.purple, 
            margin: 0,
            lineHeight: 1.2
          }}>
            {card.title}
          </p>
          
          <p style={{
            fontSize: '9px',
            fontWeight: 600,
            color: COLORS.textLight,
            margin: '4px 0 0'
          }}>
            ⏱ {card.duration}
          </p>
        </div>
      ))}
      
      {/* Quote + Mascot Section - Leave space for floating cards at top */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '120px 20px 280px',
        paddingBottom: '300px'
      }}>
        {/* Quote Card */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '16px 20px',
          border: '1px solid rgba(255,255,255,0.15)',
          position: 'relative',
          maxWidth: '280px'
        }}>
          <span style={{
            position: 'absolute',
            top: '-12px',
            left: '16px',
            fontSize: '40px',
            color: COLORS.gold,
            opacity: 0.7,
            lineHeight: 1
          }}>"</span>
          
          <p style={{
            color: 'white',
            fontSize: '16px',
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.5,
            textAlign: 'center'
          }}>
            It's 5pm. I'm <span style={{ color: COLORS.coral }}>exhausted</span>. And they want to play.
          </p>
        </div>
        
        {/* Mascot + Response - positioned with more space */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginTop: '20px'
        }}>
          <img
            src={MASCOTS.togetherHugging}
            alt="Mooshie mascots hugging"
            style={{
              height: '220px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 12px 30px rgba(0,0,0,0.35))'
            }}
            onError={(e) => { e.target.outerHTML = '<span style="font-size: 140px; filter: drop-shadow(0 12px 30px rgba(0,0,0,0.35)); line-height: 1;">🤗</span>'; }}
          />
          
          {/* Speech bubble response */}
          <div style={{
            background: COLORS.gold,
            borderRadius: '16px',
            padding: '10px 14px',
            boxShadow: `4px 4px 0 ${COLORS.coral}`,
            position: 'relative',
            maxWidth: '160px'
          }}>
            <div style={{
              position: 'absolute',
              left: '-8px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 0,
              height: 0,
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              borderRight: `10px solid ${COLORS.gold}`
            }} />
            
            <p style={{ 
              fontSize: '14px', 
              fontWeight: 900, 
              color: COLORS.purple, 
              margin: '0 0 2px' 
            }}>
              We get it. 💜
            </p>
            <p style={{ 
              fontSize: '10px', 
              fontWeight: 600, 
              color: COLORS.purpleDark, 
              margin: 0,
              lineHeight: 1.4
            }}>
              That's exactly why we built this.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SLIDE 3: Discovery Lab / Inventory
// ============================================================
const Slide3Content = () => {
  const inventoryItems = [
    { 
      emoji: '🥄',
      position: { top: '50px', left: '18px' },
      rotation: '-8deg',
      color: COLORS.coral,
      selected: true
    },
    { 
      emoji: '📦',
      position: { top: '45px', right: '20px' },
      rotation: '6deg',
      color: COLORS.teal,
      selected: true
    },
    { 
      emoji: '🧦',
      position: { top: '140px', left: '10px' },
      rotation: '5deg',
      color: COLORS.purple,
      selected: false
    },
    { 
      emoji: '📄',
      position: { top: '150px', right: '12px' },
      rotation: '-4deg',
      color: COLORS.gold,
      selected: false
    },
  ];

  return (
    <div style={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: `linear-gradient(180deg, ${COLORS.teal}15 0%, ${COLORS.purple} 28%, ${COLORS.purpleDark} 100%)`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative stars */}
      <div style={{ position: 'absolute', top: '70px', left: '48%', fontSize: '8px', opacity: 0.25 }}>✨</div>
      <div style={{ position: 'absolute', top: '120px', left: '42%', fontSize: '6px', opacity: 0.2 }}>⭐</div>
      
      {/* Floating Inventory Items */}
      {inventoryItems.map((item, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            ...item.position,
            background: 'white',
            borderRadius: '16px',
            width: '52px',
            height: '52px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transform: `rotate(${item.rotation})`,
            zIndex: 5,
            border: item.selected ? `3px solid ${COLORS.gold}` : `2px solid #E0E0E0`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            opacity: item.selected ? 1 : 0.6
          }}
        >
          {item.emoji}
          {item.selected && (
            <div style={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: COLORS.gold,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              color: 'white',
              fontWeight: 800,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              ✓
            </div>
          )}
        </div>
      ))}
      
      {/* Mascot Area - positioned higher to avoid being cut off */}
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '60px',
        paddingBottom: '300px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Mascot with result bubble integrated */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          filter: 'drop-shadow(0 12px 30px rgba(0,0,0,0.35))'
        }}>
          <img
            src={MASCOTS.childReading}
            alt="Mooshie child reading"
            style={{ height: '240px', objectFit: 'contain' }}
            onError={(e) => { e.target.outerHTML = '<span style="font-size: 160px; line-height: 1;">📚</span>'; }}
          />
        </div>
        
        {/* Result Bubble - closer to mascot */}
        <div style={{
          marginTop: '8px',
          background: COLORS.gold,
          borderRadius: '16px',
          padding: '8px 16px',
          boxShadow: `3px 3px 0 ${COLORS.coral}`,
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '-7px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderBottom: `8px solid ${COLORS.gold}`
          }} />
          
          <p style={{
            fontSize: '10px',
            fontWeight: 700,
            color: COLORS.purpleDark,
            margin: '0 0 1px',
            textAlign: 'center'
          }}>
            🥄 + 📦 selected
          </p>
          <p style={{
            fontSize: '16px',
            fontWeight: 900,
            color: COLORS.purple,
            margin: 0,
            textAlign: 'center'
          }}>
            47 activities! ✨
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SLIDE CONTENT CARDS (bottom section)
// ============================================================
const slideContent = [
  {
    tagline: '✨ PLAY. LEARN. GROW. ✨',
    headline: <>2,000+ play ideas.<br/>Zero prep needed.</>,
    description: <>Developed by <strong style={{ color: COLORS.purple }}>child psychologists</strong> & <strong style={{ color: COLORS.purple }}>parents</strong> using stuff you already have at home.</>,
    tags: [
      { text: '🏠 Household items', bg: COLORS.purplePale, color: COLORS.purple },
      { text: '⏱ 5-20 min', bg: COLORS.goldLight, color: '#92400E' },
      { text: '💜 No guilt', bg: COLORS.coralLight, color: COLORS.coral },
    ],
    cta: "Let's Get Started ✨"
  },
  {
    headline: <>5 minutes. Zero guilt.</>,
    description: <>Whether you're playing together or they're exploring solo — every activity is designed for <strong style={{ color: COLORS.purple }}>real life</strong>.</>,
    tags: [
      { text: '⏱ 5–20 min', bg: COLORS.goldLight, color: '#92400E' },
      { text: '👀 Guided', bg: COLORS.coralLight, color: COLORS.coral },
      { text: '🎨 Solo Play', bg: `${COLORS.teal}20`, color: COLORS.teal },
      { text: '🧠 Science-backed', bg: COLORS.purplePale, color: COLORS.purple },
    ],
    cta: 'Next →'
  },
  {
    headline: <>Your home is a<br/>discovery lab.</>,
    description: <>Tap what's nearby. We'll find the perfect activities — <strong style={{ color: COLORS.coral }}>no toys or prep required</strong>.</>,
    tags: [
      { text: '🏠 Stuff you have', bg: COLORS.purplePale, color: COLORS.purple },
      { text: '⚡ Match your energy', bg: COLORS.goldLight, color: '#92400E' },
      { text: '💸 $0 spent', bg: COLORS.coralLight, color: COLORS.coral },
    ],
    cta: "Let's Get Started ✨"
  },
];

// ============================================================
// MAIN CAROUSEL COMPONENT
// ============================================================
export default function WelcomeCarousel({
  currentSlide = 0,
  onSlideChange,
  onSkip,
  onComplete,
}) {
  const content = slideContent[currentSlide];
  
  const handleNext = () => {
    if (currentSlide < 2) {
      onSlideChange(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const SlideComponents = [Slide1Content, Slide2Content, Slide3Content];
  const CurrentSlide = SlideComponents[currentSlide];

  return (
    <div style={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Skip button */}
      <div style={{ 
        position: 'absolute', 
        top: '16px', 
        right: '16px', 
        zIndex: 20 
      }}>
        <button 
          onClick={onSkip}
          style={{
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 600,
            color: COLORS.purple,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
        >
          Skip
        </button>
      </div>

      {/* Slide Content (top section) */}
      <div style={{ flex: 1, position: 'relative' }}>
        <CurrentSlide />
      </div>

      {/* Content Card (bottom section) */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        margin: '14px',
        background: 'rgba(255,255,255,0.97)',
        borderRadius: '24px',
        padding: '20px',
        border: `3px solid ${COLORS.gold}`,
        boxShadow: `0 6px 0 ${COLORS.coral}, 0 20px 40px rgba(0,0,0,0.2)`,
        zIndex: 10
      }}>
        {/* Tagline (only on slide 1) */}
        {content.tagline && (
          <p style={{
            fontSize: '10px', 
            fontWeight: 800, 
            color: COLORS.gold,
            textAlign: 'center', 
            margin: '0 0 6px', 
            letterSpacing: '0.5px'
          }}>
            {content.tagline}
          </p>
        )}
        
        <h1 style={{
          fontSize: '21px', 
          fontWeight: 900, 
          color: COLORS.purple,
          margin: '0 0 8px 0', 
          lineHeight: 1.2, 
          textAlign: 'center'
        }}>
          {content.headline}
        </h1>
        
        <p style={{
          fontSize: '12px', 
          color: COLORS.text, 
          margin: '0 0 14px 0',
          lineHeight: 1.5, 
          textAlign: 'center'
        }}>
          {content.description}
        </p>
        
        {/* Tags */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '6px', 
          marginBottom: '14px' 
        }}>
          {content.tags.map((tag, i) => (
            <span 
              key={i}
              style={{
                padding: '6px 10px', 
                borderRadius: '12px', 
                fontSize: '10px',
                fontWeight: 700, 
                background: tag.bg, 
                color: tag.color
              }}
            >
              {tag.text}
            </span>
          ))}
        </div>
        
        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
          {[0, 1, 2].map(i => (
            <button
              key={i}
              onClick={() => onSlideChange(i)}
              style={{ 
                width: i === currentSlide ? '24px' : '8px', 
                height: '8px', 
                borderRadius: '4px', 
                background: i === currentSlide ? COLORS.purple : '#E5E5E5',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }} 
            />
          ))}
        </div>
        
        {/* CTA */}
        <button 
          onClick={handleNext}
          style={{
            width: '100%', 
            padding: '14px', 
            borderRadius: '14px', 
            border: 'none',
            background: COLORS.gold, 
            color: COLORS.purple, 
            fontSize: '16px',
            fontWeight: 900, 
            cursor: 'pointer', 
            boxShadow: `0 4px 0 ${COLORS.coral}`
          }}
        >
          {content.cta}
        </button>
        
        <p style={{ 
          fontSize: '9px', 
          color: COLORS.textLight, 
          textAlign: 'center', 
          marginTop: '8px' 
        }}>
          No account needed • 100% free to start
        </p>
      </div>
    </div>
  );
}

// Also export as named export
export { WelcomeCarousel };
