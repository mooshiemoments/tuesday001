// Screen 4: Name + DOB - Magical Toybox Design
import React, { useState, useEffect } from 'react';
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

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const MONTHS = [
  { value: 0, label: 'January' }, { value: 1, label: 'February' },
  { value: 2, label: 'March' }, { value: 3, label: 'April' },
  { value: 4, label: 'May' }, { value: 5, label: 'June' },
  { value: 6, label: 'July' }, { value: 7, label: 'August' },
  { value: 8, label: 'September' }, { value: 9, label: 'October' },
  { value: 10, label: 'November' }, { value: 11, label: 'December' },
];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 6 }, (_, i) => currentYear - i);

// Calculate age band from birthday
const calculateAgeBand = (day, month, year) => {
  if (!day || month === '' || !year) return null;
  const birthDate = new Date(year, month, day);
  const today = new Date();
  const ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth());
  if (ageInMonths < 12) return '6-12 months';
  if (ageInMonths < 24) return '1-2 years';
  if (ageInMonths < 36) return '2-3 years';
  return '3-4 years';
};

export default function NameDOBScreen({
  name = '',
  day = '',
  month = '',
  year = '',
  onNameChange,
  onDayChange,
  onMonthChange,
  onYearChange,
  onBack,
  onContinue,
}) {
  const [localName, setLocalName] = useState(name);
  
  // Debounce name changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localName !== name && onNameChange) {
        onNameChange(localName);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localName, name, onNameChange]);

  const isComplete = localName && day && month !== '' && year;
  const ageBand = calculateAgeBand(day, month, year);

  const handleContinue = () => {
    if (isComplete && onContinue) {
      onNameChange(localName);
      onContinue(ageBand);
    }
  };

  return (
    <div style={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: COLORS.cream,
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Header with back button */}
      <div style={{ 
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
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
            color: COLORS.purple
          }}
        >
          ←
        </button>
      </div>

      {/* Mascot - positioned top right */}
      <div style={{
        position: 'absolute',
        top: '50px',
        right: '5px',
        zIndex: 5
      }}>
        <div style={{ filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.25))' }}>
          <img
            src={MASCOTS.adultThinking}
            alt="Mooshie thinking"
            style={{ height: '140px', objectFit: 'contain' }}
            onError={(e) => { e.target.outerHTML = '<span style="font-size: 100px;">🤔</span>'; }}
          />
        </div>
      </div>

      {/* Title section */}
      <div style={{ padding: '0 20px', marginBottom: '20px' }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 900,
          color: COLORS.purple,
          margin: '0 0 6px',
          lineHeight: 1.2,
          maxWidth: '200px'
        }}>
          Let's meet your little one
        </h1>
        <p style={{
          fontSize: '14px',
          color: COLORS.textLight,
          margin: 0,
          maxWidth: '180px'
        }}>
          We'll personalize everything just for them ✨
        </p>
      </div>

      {/* Form Card */}
      <div style={{
        flex: 1,
        margin: '0 14px',
        background: 'white',
        borderRadius: '24px',
        padding: '20px',
        border: `3px solid ${COLORS.purple}`,
        boxShadow: `0 6px 0 ${COLORS.purpleDark}, 0 12px 24px rgba(0,0,0,0.1)`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* Name Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: 700,
            color: COLORS.purple,
            marginBottom: '8px'
          }}>
            👶 Child's name
          </label>
          <input
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            onBlur={() => onNameChange && onNameChange(localName)}
            placeholder="Enter their name..."
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '14px',
              border: `2px solid ${localName ? COLORS.gold : '#E5E5E5'}`,
              fontSize: '16px',
              fontWeight: 600,
              color: COLORS.text,
              outline: 'none',
              background: localName ? `${COLORS.goldLight}50` : 'white',
              boxSizing: 'border-box',
              transition: 'all 0.2s ease'
            }}
          />
        </div>

        {/* Birthday Section */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: 700,
            color: COLORS.purple,
            marginBottom: '8px'
          }}>
            🎂 Birthday
          </label>
          
          {/* Date selectors */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {/* Day */}
            <select
              value={day}
              onChange={(e) => onDayChange && onDayChange(e.target.value)}
              style={{
                flex: '0.8',
                padding: '14px 8px',
                borderRadius: '14px',
                border: `2px solid ${day ? COLORS.gold : '#E5E5E5'}`,
                fontSize: '14px',
                fontWeight: 600,
                color: day ? COLORS.text : COLORS.textLight,
                outline: 'none',
                background: day ? `${COLORS.goldLight}50` : 'white',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <option value="">Day</option>
              {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            {/* Month */}
            <select
              value={month}
              onChange={(e) => onMonthChange && onMonthChange(e.target.value)}
              style={{
                flex: '1.4',
                padding: '14px 8px',
                borderRadius: '14px',
                border: `2px solid ${month !== '' ? COLORS.gold : '#E5E5E5'}`,
                fontSize: '14px',
                fontWeight: 600,
                color: month !== '' ? COLORS.text : COLORS.textLight,
                outline: 'none',
                background: month !== '' ? `${COLORS.goldLight}50` : 'white',
                cursor: 'pointer'
              }}
            >
              <option value="">Month</option>
              {MONTHS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>

            {/* Year */}
            <select
              value={year}
              onChange={(e) => onYearChange && onYearChange(e.target.value)}
              style={{
                flex: '1',
                padding: '14px 8px',
                borderRadius: '14px',
                border: `2px solid ${year ? COLORS.gold : '#E5E5E5'}`,
                fontSize: '14px',
                fontWeight: 600,
                color: year ? COLORS.text : COLORS.textLight,
                outline: 'none',
                background: year ? `${COLORS.goldLight}50` : 'white',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <option value="">Year</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        {/* Age band result */}
        {isComplete && ageBand && (
          <div style={{
            background: `linear-gradient(135deg, ${COLORS.gold}30 0%, ${COLORS.coral}20 100%)`,
            borderRadius: '16px',
            padding: '14px 16px',
            marginBottom: '16px',
            border: `2px solid ${COLORS.gold}`,
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '14px',
              fontWeight: 700,
              color: COLORS.text,
              margin: 0
            }}>
              🎉 <span style={{ color: COLORS.purple, fontWeight: 800 }}>{localName}</span> is in the{' '}
              <span style={{ 
                background: COLORS.purple,
                color: 'white',
                padding: '2px 8px',
                borderRadius: '8px',
                fontWeight: 800
              }}>
                {ageBand}
              </span>{' '}
              stage!
            </p>
          </div>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Privacy note */}
        <p style={{
          fontSize: '11px',
          color: COLORS.textLight,
          textAlign: 'center',
          margin: '0 0 12px'
        }}>
          🔒 This stays private on your device
        </p>

        {/* CTA Button */}
        <button 
          onClick={handleContinue}
          disabled={!isComplete}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '16px',
            border: 'none',
            background: isComplete ? COLORS.gold : '#E5E5E5',
            color: isComplete ? COLORS.purple : '#999',
            fontSize: '17px',
            fontWeight: 900,
            cursor: isComplete ? 'pointer' : 'not-allowed',
            boxShadow: isComplete ? `0 4px 0 ${COLORS.coral}` : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          {isComplete ? 'Continue →' : 'Fill in the details above'}
        </button>
      </div>

      {/* Bottom padding */}
      <div style={{ height: '14px' }} />
    </div>
  );
}

// Also export as PersonalizeScreen for backward compatibility
export { NameDOBScreen as PersonalizeScreen };
