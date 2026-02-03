import React, { useState, useMemo } from 'react';
import { Home, Compass, Sparkles, BookOpen, User } from 'lucide-react';
import { COLORS, MASCOTS, MASCOT_FALLBACKS } from '../../constants';

// =====================================================
// COMMON COMPONENTS
// Extracted from App.jsx for reusability
// =====================================================

// =====================================================
// TAB NAVIGATION
// Bottom navigation bar with 5 tabs
// =====================================================

const TAB_CONFIG = [
  { id: 'home', icon: Home, label: 'Home', screen: 'main' },
  { id: 'discover', icon: Compass, label: 'Discover', screen: 'main' },
  { id: 'play', icon: Sparkles, label: 'Play', screen: 'main' },
  { id: 'memories', icon: BookOpen, label: 'Memories', screen: 'main' },
  { id: 'profile', icon: User, label: 'Profile', screen: 'main' },
];

export function TabNav({ 
  activeTab = 'home', 
  onNavigate 
}) {
  const handleTabClick = (tab) => {
    if (onNavigate) {
      onNavigate(tab.id, tab.screen);
    }
  };

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 bg-white border-t px-4 py-2 z-40 shadow-lg rounded-b-[2.5rem]" 
      style={{ borderColor: '#F0F0F0' }}
    >
      <div className="flex justify-around max-w-md mx-auto pb-4">
        {TAB_CONFIG.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button 
              key={tab.id} 
              onClick={() => handleTabClick(tab)} 
              className="flex flex-col items-center py-2 px-4" 
              style={{ 
                color: isActive ? COLORS.purple : COLORS.text, 
                opacity: isActive ? 1 : 0.5 
              }}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// =====================================================
// CONFETTI
// Celebration animation with colorful bouncing dots
// =====================================================

export function Confetti({ 
  particleCount = 30,
  colors = [COLORS.purple, COLORS.gold, COLORS.coral, '#2EAD6D']
}) {
  // Generate particles with stable random values using useMemo
  const particles = useMemo(() => {
    return [...Array(particleCount)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: colors[i % colors.length],
      isRound: Math.random() > 0.5,
      delay: `${Math.random() * 0.5}s`,
    }));
  }, [particleCount, colors]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <div 
          key={particle.id} 
          className="absolute w-3 h-3 animate-bounce" 
          style={{
            left: particle.left,
            top: particle.top,
            backgroundColor: particle.color,
            borderRadius: particle.isRound ? '50%' : '0',
            animationDelay: particle.delay,
          }} 
        />
      ))}
    </div>
  );
}

// Simple version matching original exactly (for drop-in replacement)
export function ConfettiSimple() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(30)].map((_, i) => (
        <div 
          key={i} 
          className="absolute w-3 h-3 animate-bounce" 
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: [COLORS.purple, COLORS.gold, COLORS.coral, '#2EAD6D'][i % 4],
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            animationDelay: `${Math.random() * 0.5}s`,
          }} 
        />
      ))}
    </div>
  );
}

// =====================================================
// MASCOT IMAGE
// Image with fallback emoji on load error
// =====================================================

// Standalone component with internal state
export function MascotImage({ 
  type, 
  size = 'w-20 h-20', 
  className = '',
  fallbackSize = 'text-4xl',
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !MASCOTS[type]) {
    return (
      <span className={fallbackSize}>
        {MASCOT_FALLBACKS[type] || '🦉'}
      </span>
    );
  }

  return (
    <img 
      src={MASCOTS[type]} 
      alt={`Mooshie ${type}`}
      className={`${size} object-contain ${className}`}
      style={{ imageRendering: '-webkit-optimize-contrast' }}
      onError={() => setHasError(true)}
    />
  );
}

// Version that uses shared error state (for App.jsx integration)
export function MascotImageWithSharedState({ 
  type, 
  size = 'w-20 h-20', 
  className = '',
  fallbackSize = 'text-4xl',
  mascotErrors = {},
  onError,
}) {
  if (mascotErrors[type]) {
    return (
      <span className={fallbackSize}>
        {MASCOT_FALLBACKS[type] || '🦉'}
      </span>
    );
  }

  return (
    <img 
      src={MASCOTS[type]} 
      alt={`Mooshie ${type}`}
      className={`${size} object-contain ${className}`}
      style={{ imageRendering: '-webkit-optimize-contrast' }}
      onError={() => {
        if (onError) {
          onError(type);
        }
      }}
    />
  );
}

// =====================================================
// LOADING SPINNER
// Simple loading indicator
// =====================================================

export function LoadingSpinner({ 
  size = 'w-8 h-8',
  color = COLORS.purple,
  text = 'Loading...',
  showText = true,
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`${size} animate-spin rounded-full border-4 border-t-transparent`}
        style={{ borderColor: `${color}30`, borderTopColor: color }}
      />
      {showText && (
        <p className="mt-3 text-sm" style={{ color: COLORS.text }}>
          {text}
        </p>
      )}
    </div>
  );
}

// =====================================================
// BADGE
// Small label component
// =====================================================

export function Badge({ 
  children, 
  variant = 'default', // 'default' | 'premium' | 'success' | 'warning'
  size = 'sm', // 'xs' | 'sm' | 'md'
}) {
  const variants = {
    default: { bg: `${COLORS.purple}15`, color: COLORS.purple },
    premium: { bg: `${COLORS.gold}20`, color: '#A89060' },
    success: { bg: '#ECFDF5', color: '#2EAD6D' },
    warning: { bg: `${COLORS.coral}15`, color: COLORS.coral },
  };

  const sizes = {
    xs: 'text-xs px-1.5 py-0.5',
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
  };

  const style = variants[variant] || variants.default;
  const sizeClass = sizes[size] || sizes.sm;

  return (
    <span 
      className={`${sizeClass} rounded-full font-medium`}
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {children}
    </span>
  );
}

// =====================================================
// CARD
// Reusable card container
// =====================================================

export function Card({ 
  children, 
  className = '',
  padding = 'p-4',
  rounded = 'rounded-xl',
  border = true,
  shadow = true,
  onClick,
}) {
  const baseClasses = `bg-white ${padding} ${rounded}`;
  const borderClass = border ? 'border' : '';
  const shadowClass = shadow ? 'shadow-sm' : '';
  const clickableClass = onClick ? 'cursor-pointer transition-all hover:shadow-md active:scale-98' : '';

  return (
    <div 
      className={`${baseClasses} ${borderClass} ${shadowClass} ${clickableClass} ${className}`}
      style={{ borderColor: border ? '#F0F0F0' : 'transparent' }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// =====================================================
// BUTTON
// Reusable button component
// =====================================================

export function Button({ 
  children, 
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
}) {
  const variants = {
    primary: { 
      bg: COLORS.purple, 
      color: 'white',
      hover: 'hover:opacity-90',
    },
    secondary: { 
      bg: COLORS.gold, 
      color: COLORS.purple,
      hover: 'hover:opacity-90',
    },
    outline: { 
      bg: 'transparent', 
      color: COLORS.purple,
      border: `2px solid ${COLORS.purple}`,
      hover: 'hover:bg-purple-50',
    },
    ghost: { 
      bg: 'transparent', 
      color: COLORS.text,
      hover: 'hover:bg-gray-100',
    },
  };

  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  };

  const style = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClass} 
        ${fullWidth ? 'w-full' : ''} 
        rounded-xl font-bold 
        flex items-center justify-center gap-2
        transition-all active:scale-98
        ${disabled ? 'opacity-50 cursor-not-allowed' : style.hover}
        ${className}
      `}
      style={{ 
        backgroundColor: style.bg, 
        color: style.color,
        border: style.border || 'none',
      }}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
}

// =====================================================
// EXPORTS
// =====================================================

export default {
  TabNav,
  Confetti,
  ConfettiSimple,
  MascotImage,
  MascotImageWithSharedState,
  LoadingSpinner,
  Badge,
  Card,
  Button,
};
