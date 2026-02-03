// Screen 8: Paywall V4 - Ultra compact with all benefits visible
import React from 'react';

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

export default function PaywallScreen({
  name = 'Your child',
  onPurchase,
  onSkip,
  onBack,
}) {
  const benefits = [
    { icon: '🛋️', text: 'No more "5pm panic"' },
    { icon: '🏠', text: 'Stuff you already have' },
    { icon: '👶', text: `Made for ${name}'s stage` },
    { icon: '♾️', text: 'Lifetime access, no ads' },
  ];

  return (
    <div style={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: `linear-gradient(180deg, ${COLORS.purple} 0%, ${COLORS.purpleDark} 100%)`,
      position: 'relative'
    }}>
      {/* Decorative circles */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        right: '-40px',
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)'
      }} />

      <div style={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Header */}
        <div style={{
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button 
            onClick={onBack}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 10px',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            ← Back
          </button>
          
          <button 
            onClick={onSkip}
            style={{
              background: 'none',
              border: 'none',
              padding: '6px',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Skip
          </button>
        </div>

        {/* Headline */}
        <div style={{ textAlign: 'center', padding: '4px 20px 12px' }}>
          <h1 style={{
            fontSize: '26px',
            fontWeight: 900,
            color: 'white',
            margin: '0',
            lineHeight: 1.2
          }}>
            One Payment.
          </h1>
          <h2 style={{
            fontSize: '26px',
            fontWeight: 900,
            color: COLORS.gold,
            margin: '0 0 8px',
            lineHeight: 1.2
          }}>
            A Lifetime of Play.
          </h2>
          
          {/* Urgency badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255,255,255,0.1)',
            padding: '6px 12px',
            borderRadius: '16px'
          }}>
            <span style={{ fontSize: '12px' }}>👑</span>
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'white'
            }}>
              Founding Member — first 1,000 only
            </span>
          </div>
        </div>

        {/* Pricing Card */}
        <div style={{
          margin: '0 12px',
          background: 'white',
          borderRadius: '20px',
          padding: '14px',
          border: `3px solid ${COLORS.gold}`,
          boxShadow: `0 5px 0 ${COLORS.coral}`,
          position: 'relative'
        }}>
          {/* Discount badge */}
          <div style={{
            position: 'absolute',
            top: '-1px',
            right: '-1px',
            background: COLORS.coral,
            color: 'white',
            padding: '4px 10px',
            borderRadius: '0 17px 0 12px',
            fontSize: '10px',
            fontWeight: 800
          }}>
            75% OFF
          </div>

          {/* Price */}
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '8px'
            }}>
              <span style={{ 
                fontSize: '16px', 
                color: COLORS.textLight, 
                textDecoration: 'line-through' 
              }}>
                $199
              </span>
              <span style={{ fontSize: '42px', fontWeight: 900, color: COLORS.purple }}>
                $49
              </span>
            </div>
            <p style={{
              fontSize: '13px',
              fontWeight: 700,
              color: COLORS.coral,
              margin: '2px 0 0'
            }}>
              That's just $4/month for the first year
            </p>
          </div>

          {/* Benefits - 2x2 grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            marginBottom: '10px'
          }}>
            {benefits.map((benefit, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 10px',
                background: COLORS.purplePale,
                borderRadius: '10px'
              }}>
                <span style={{ fontSize: '14px' }}>{benefit.icon}</span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: COLORS.purple
                }}>
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>

          {/* What's included */}
          <div style={{
            padding: '8px 10px',
            background: COLORS.goldLight,
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '11px',
              fontWeight: 700,
              color: COLORS.text,
              margin: 0
            }}>
              2,000+ activities • All future updates • Memory book
            </p>
          </div>
        </div>

        {/* Guarantee */}
        <div style={{
          margin: '12px 12px 0',
          padding: '10px 14px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '16px' }}>💯</span>
          <p style={{
            fontSize: '12px',
            fontWeight: 700,
            color: 'white',
            margin: 0
          }}>
            30-day money-back guarantee
          </p>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Bottom CTAs */}
        <div style={{ padding: '12px 14px 14px' }}>
          {/* Primary CTA */}
          <button 
            onClick={onPurchase}
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
              boxShadow: `0 4px 0 ${COLORS.coral}`,
              marginBottom: '8px'
            }}
          >
            Unlock Lifetime Access — $49
          </button>

          {/* Trust badges */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '6px'
          }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>🔒 Secure</span>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>❌ No subscription</span>
          </div>

          {/* Free option */}
          <button 
            onClick={onSkip}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '10px',
              border: 'none',
              background: 'transparent',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Start with 5 free activities →
          </button>
        </div>
      </div>
    </div>
  );
}
