// MilestonesScreen - Development Milestones Chart
// Shows what kids at each age should be able to do across developmental domains

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Check,
  Footprints,
  Hand,
  MessageCircle,
  Brain,
  Heart,
  Baby,
  Sparkles,
  Star,
  Info,
} from 'lucide-react';

const COLORS = {
  purple: '#7A3E9D',
  purpleLight: '#9B59B6',
  purplePale: '#F3E8FF',
  gold: '#FDC22D',
  goldLight: '#FEF3C7',
  coral: '#F47C47',
  coralLight: '#FFEBE5',
  cream: '#FFF9F0',
  text: '#4A4252',
  textLight: '#6B5B73',
  green: '#2EAD6D',
  greenLight: '#ECFDF5',
  blue: '#3B82F6',
  blueLight: '#EFF6FF',
};

// Developmental milestone data organized by age band and domain
const MILESTONES = {
  '6-12 months': {
    label: '6–12 months',
    emoji: '👶',
    domains: [
      {
        name: 'Gross Motor',
        icon: Footprints,
        color: COLORS.coral,
        bgColor: COLORS.coralLight,
        milestones: [
          { text: 'Sits without support', typical: '6-7 months' },
          { text: 'Pulls to standing', typical: '8-10 months' },
          { text: 'Crawls on hands and knees', typical: '7-10 months' },
          { text: 'Cruises along furniture', typical: '9-12 months' },
          { text: 'May take first steps', typical: '10-12 months' },
        ],
      },
      {
        name: 'Fine Motor',
        icon: Hand,
        color: COLORS.purple,
        bgColor: COLORS.purplePale,
        milestones: [
          { text: 'Passes objects hand to hand', typical: '6-7 months' },
          { text: 'Uses pincer grasp (thumb + finger)', typical: '9-10 months' },
          { text: 'Picks up small objects', typical: '8-10 months' },
          { text: 'Bangs two objects together', typical: '8-10 months' },
          { text: 'Points at things', typical: '9-12 months' },
        ],
      },
      {
        name: 'Language',
        icon: MessageCircle,
        color: COLORS.blue,
        bgColor: COLORS.blueLight,
        milestones: [
          { text: 'Babbles (ba-ba, da-da)', typical: '6-8 months' },
          { text: 'Responds to own name', typical: '6-7 months' },
          { text: 'Understands "no"', typical: '8-10 months' },
          { text: 'Waves bye-bye', typical: '9-11 months' },
          { text: 'Says first word (mama/dada)', typical: '10-12 months' },
        ],
      },
      {
        name: 'Cognitive',
        icon: Brain,
        color: COLORS.gold,
        bgColor: COLORS.goldLight,
        milestones: [
          { text: 'Looks for hidden objects (object permanence)', typical: '8-10 months' },
          { text: 'Explores objects by shaking, banging', typical: '6-9 months' },
          { text: 'Imitates simple actions', typical: '9-12 months' },
          { text: 'Understands cause and effect', typical: '8-11 months' },
          { text: 'Shows interest in pictures', typical: '9-12 months' },
        ],
      },
      {
        name: 'Social & Emotional',
        icon: Heart,
        color: '#E91E63',
        bgColor: '#FCE4EC',
        milestones: [
          { text: 'Shows stranger anxiety', typical: '7-9 months' },
          { text: 'Has favourite toys', typical: '8-10 months' },
          { text: 'Shows separation anxiety', typical: '8-12 months' },
          { text: 'Enjoys peek-a-boo', typical: '6-9 months' },
          { text: 'Gives affection (hugs, cuddles)', typical: '10-12 months' },
        ],
      },
    ],
  },
  '1-2 years': {
    label: '1–2 years',
    emoji: '🧒',
    domains: [
      {
        name: 'Gross Motor',
        icon: Footprints,
        color: COLORS.coral,
        bgColor: COLORS.coralLight,
        milestones: [
          { text: 'Walks independently', typical: '12-15 months' },
          { text: 'Climbs onto furniture', typical: '14-18 months' },
          { text: 'Kicks a ball', typical: '18-24 months' },
          { text: 'Runs (may be unsteady)', typical: '16-20 months' },
          { text: 'Walks up stairs with help', typical: '18-24 months' },
        ],
      },
      {
        name: 'Fine Motor',
        icon: Hand,
        color: COLORS.purple,
        bgColor: COLORS.purplePale,
        milestones: [
          { text: 'Stacks 2-4 blocks', typical: '12-18 months' },
          { text: 'Scribbles with crayon', typical: '12-15 months' },
          { text: 'Turns pages of a book', typical: '15-18 months' },
          { text: 'Uses spoon (messily!)', typical: '15-18 months' },
          { text: 'Stacks 4-6 blocks', typical: '18-24 months' },
        ],
      },
      {
        name: 'Language',
        icon: MessageCircle,
        color: COLORS.blue,
        bgColor: COLORS.blueLight,
        milestones: [
          { text: 'Says several single words', typical: '12-15 months' },
          { text: 'Points to show you things', typical: '12-14 months' },
          { text: 'Follows simple directions', typical: '14-18 months' },
          { text: 'Uses 10-25 words', typical: '18 months' },
          { text: 'Starts combining 2 words', typical: '18-24 months' },
        ],
      },
      {
        name: 'Cognitive',
        icon: Brain,
        color: COLORS.gold,
        bgColor: COLORS.goldLight,
        milestones: [
          { text: 'Knows what ordinary objects are for (phone, cup)', typical: '12-15 months' },
          { text: 'Points to body parts when asked', typical: '15-18 months' },
          { text: 'Sorts shapes and colours', typical: '18-24 months' },
          { text: 'Completes simple puzzles (2-3 pieces)', typical: '18-24 months' },
          { text: 'Engages in pretend play', typical: '18-24 months' },
        ],
      },
      {
        name: 'Social & Emotional',
        icon: Heart,
        color: '#E91E63',
        bgColor: '#FCE4EC',
        milestones: [
          { text: 'Plays alongside other children', typical: '12-18 months' },
          { text: 'Shows defiant behaviour ("No!")', typical: '15-18 months' },
          { text: 'Imitates adults and older children', typical: '12-18 months' },
          { text: 'Shows ownership (says "mine")', typical: '18-24 months' },
          { text: 'Shows empathy (concerned when someone cries)', typical: '18-24 months' },
        ],
      },
    ],
  },
  '2-3 years': {
    label: '2–3 years',
    emoji: '👧',
    domains: [
      {
        name: 'Gross Motor',
        icon: Footprints,
        color: COLORS.coral,
        bgColor: COLORS.coralLight,
        milestones: [
          { text: 'Runs confidently', typical: '24-30 months' },
          { text: 'Jumps with both feet off ground', typical: '24-30 months' },
          { text: 'Pedals a tricycle', typical: '30-36 months' },
          { text: 'Walks up and down stairs (alternating feet)', typical: '30-36 months' },
          { text: 'Catches a large ball', typical: '30-36 months' },
        ],
      },
      {
        name: 'Fine Motor',
        icon: Hand,
        color: COLORS.purple,
        bgColor: COLORS.purplePale,
        milestones: [
          { text: 'Draws circles and lines', typical: '24-30 months' },
          { text: 'Uses scissors with help', typical: '30-36 months' },
          { text: 'Strings large beads', typical: '24-30 months' },
          { text: 'Stacks 6+ blocks', typical: '24-30 months' },
          { text: 'Turns door handles', typical: '24-30 months' },
        ],
      },
      {
        name: 'Language',
        icon: MessageCircle,
        color: COLORS.blue,
        bgColor: COLORS.blueLight,
        milestones: [
          { text: 'Uses 2-3 word sentences', typical: '24-27 months' },
          { text: 'Knows about 200-1000 words', typical: '24-36 months' },
          { text: 'Asks "why?" questions', typical: '30-36 months' },
          { text: 'Strangers can understand most words', typical: '30-36 months' },
          { text: 'Names familiar objects in pictures', typical: '24-30 months' },
        ],
      },
      {
        name: 'Cognitive',
        icon: Brain,
        color: COLORS.gold,
        bgColor: COLORS.goldLight,
        milestones: [
          { text: 'Sorts objects by shape and colour', typical: '24-30 months' },
          { text: 'Completes 3-4 piece puzzles', typical: '24-36 months' },
          { text: 'Understands concept of "two"', typical: '30-36 months' },
          { text: 'Plays make-believe with dolls and animals', typical: '24-30 months' },
          { text: 'Matches objects to pictures', typical: '24-30 months' },
        ],
      },
      {
        name: 'Social & Emotional',
        icon: Heart,
        color: '#E91E63',
        bgColor: '#FCE4EC',
        milestones: [
          { text: 'Takes turns in games', typical: '30-36 months' },
          { text: 'Expresses a wide range of emotions', typical: '24-30 months' },
          { text: 'Shows concern for crying friend', typical: '24-30 months' },
          { text: 'Begins cooperative play', typical: '30-36 months' },
          { text: 'Separates easily from parents', typical: '30-36 months' },
        ],
      },
    ],
  },
  '3-4 years': {
    label: '3–4 years',
    emoji: '🧒',
    domains: [
      {
        name: 'Gross Motor',
        icon: Footprints,
        color: COLORS.coral,
        bgColor: COLORS.coralLight,
        milestones: [
          { text: 'Hops on one foot', typical: '36-42 months' },
          { text: 'Catches a bounced ball most of the time', typical: '36-42 months' },
          { text: 'Moves forward and backward with agility', typical: '36-42 months' },
          { text: 'Climbs well', typical: '36-42 months' },
          { text: 'Kicks ball forward with power', typical: '36-48 months' },
        ],
      },
      {
        name: 'Fine Motor',
        icon: Hand,
        color: COLORS.purple,
        bgColor: COLORS.purplePale,
        milestones: [
          { text: 'Draws a person with 2-4 body parts', typical: '36-42 months' },
          { text: 'Uses scissors independently', typical: '36-42 months' },
          { text: 'Copies some capital letters', typical: '42-48 months' },
          { text: 'Buttons and unbuttons', typical: '36-42 months' },
          { text: 'Holds pencil with proper grip', typical: '36-48 months' },
        ],
      },
      {
        name: 'Language',
        icon: MessageCircle,
        color: COLORS.blue,
        bgColor: COLORS.blueLight,
        milestones: [
          { text: 'Speaks in 4-5 word sentences', typical: '36-42 months' },
          { text: 'Tells stories', typical: '42-48 months' },
          { text: 'Understands "same" and "different"', typical: '36-42 months' },
          { text: 'Uses basic grammar correctly', typical: '36-48 months' },
          { text: 'Knows some basic rules of grammar', typical: '42-48 months' },
        ],
      },
      {
        name: 'Cognitive',
        icon: Brain,
        color: COLORS.gold,
        bgColor: COLORS.goldLight,
        milestones: [
          { text: 'Names some colours and numbers', typical: '36-42 months' },
          { text: 'Understands counting concept', typical: '36-42 months' },
          { text: 'Begins to understand time', typical: '42-48 months' },
          { text: 'Follows 3-part instructions', typical: '36-42 months' },
          { text: 'Recalls parts of a story', typical: '42-48 months' },
        ],
      },
      {
        name: 'Social & Emotional',
        icon: Heart,
        color: '#E91E63',
        bgColor: '#FCE4EC',
        milestones: [
          { text: 'Cooperates with other children', typical: '36-42 months' },
          { text: 'Plays "Mum" and "Dad" (role play)', typical: '36-42 months' },
          { text: 'Negotiates solutions to conflicts', typical: '42-48 months' },
          { text: 'Increasingly creative in make-believe play', typical: '36-48 months' },
          { text: 'Expresses likes and dislikes', typical: '36-42 months' },
        ],
      },
    ],
  },
};

const MilestonesScreen = ({ profile, checkedMilestones = {}, onToggleMilestone, onBack }) => {
  const [expandedDomain, setExpandedDomain] = useState(null);
  const ageBand = profile?.ageBand || '1-2 years';
  const ageData = MILESTONES[ageBand] || MILESTONES['1-2 years'];
  const childName = profile?.childName || 'Your child';

  // Count checked milestones for this age band
  const totalMilestones = ageData.domains.reduce((sum, d) => sum + d.milestones.length, 0);
  const checkedCount = Object.keys(checkedMilestones).filter(k =>
    checkedMilestones[k] && k.startsWith(ageBand)
  ).length;
  const progressPercent = totalMilestones > 0 ? Math.round((checkedCount / totalMilestones) * 100) : 0;

  return (
    <div
      className="min-h-screen pb-24"
      style={{
        background: `linear-gradient(180deg, ${COLORS.cream} 0%, #FFF5E6 100%)`,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1 mb-3 text-sm font-bold"
          style={{ color: COLORS.purple }}
        >
          <ChevronLeft size={20} />
          Back
        </button>
        <h1 className="text-2xl font-black" style={{ color: COLORS.purple }}>
          {childName}'s Milestones
        </h1>
        <p className="text-sm mt-1" style={{ color: COLORS.textLight }}>
          Developmental guide for {ageData.label} {ageData.emoji}
        </p>
      </div>

      {/* Progress overview */}
      <div className="px-5 py-3">
        <div
          className="rounded-2xl p-4"
          style={{ background: '#fff', border: `3px solid ${COLORS.purple}` }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-black text-sm" style={{ color: COLORS.text }}>
              Progress Tracker
            </span>
            <span className="font-black text-sm" style={{ color: COLORS.purple }}>
              {checkedCount}/{totalMilestones}
            </span>
          </div>
          <div
            className="w-full h-3 rounded-full overflow-hidden"
            style={{ background: '#F0F0F0' }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPercent}%`,
                background: `linear-gradient(90deg, ${COLORS.purple}, ${COLORS.gold})`,
              }}
            />
          </div>
          <p className="text-xs mt-2" style={{ color: COLORS.textLight }}>
            Tap milestones as {childName} achieves them — every child develops at their own pace!
          </p>
        </div>
      </div>

      {/* Info note */}
      <div className="px-5 py-2">
        <div
          className="rounded-xl p-3 flex items-start gap-2"
          style={{ background: COLORS.blueLight, border: `2px solid ${COLORS.blue}30` }}
        >
          <Info size={16} style={{ color: COLORS.blue, flexShrink: 0, marginTop: 2 }} />
          <p className="text-xs" style={{ color: COLORS.text }}>
            These milestones are general guidelines based on typical development. Every child develops differently — if you have concerns, speak with your health visitor or GP.
          </p>
        </div>
      </div>

      {/* Domain sections */}
      <div className="px-5 py-2 space-y-3">
        {ageData.domains.map((domain) => {
          const DomainIcon = domain.icon;
          const isExpanded = expandedDomain === domain.name;
          const domainChecked = domain.milestones.filter(
            (m) => checkedMilestones[`${ageBand}:${domain.name}:${m.text}`]
          ).length;

          return (
            <div
              key={domain.name}
              className="rounded-2xl overflow-hidden"
              style={{ background: '#fff', border: `3px solid ${domain.color}30` }}
            >
              {/* Domain header */}
              <button
                onClick={() => setExpandedDomain(isExpanded ? null : domain.name)}
                className="w-full p-4 flex items-center gap-3"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: domain.bgColor }}
                >
                  <DomainIcon size={20} style={{ color: domain.color }} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-black text-sm" style={{ color: COLORS.text }}>
                    {domain.name}
                  </h3>
                  <p className="text-xs" style={{ color: COLORS.textLight }}>
                    {domainChecked}/{domain.milestones.length} achieved
                  </p>
                </div>
                {/* Mini progress */}
                <div className="flex gap-1 mr-2">
                  {domain.milestones.map((m, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: checkedMilestones[`${ageBand}:${domain.name}:${m.text}`]
                          ? domain.color
                          : '#E5E5E5',
                      }}
                    />
                  ))}
                </div>
                {isExpanded ? (
                  <ChevronUp size={20} style={{ color: COLORS.textLight }} />
                ) : (
                  <ChevronDown size={20} style={{ color: COLORS.textLight }} />
                )}
              </button>

              {/* Milestones list */}
              {isExpanded && (
                <div style={{ borderTop: `2px solid ${domain.color}15` }}>
                  {domain.milestones.map((milestone, idx) => {
                    const key = `${ageBand}:${domain.name}:${milestone.text}`;
                    const isChecked = !!checkedMilestones[key];

                    return (
                      <button
                        key={idx}
                        onClick={() => onToggleMilestone && onToggleMilestone(key)}
                        className="w-full p-4 flex items-start gap-3 transition-all"
                        style={{
                          borderBottom:
                            idx < domain.milestones.length - 1 ? `1px solid #F5F5F5` : 'none',
                          background: isChecked ? `${domain.color}08` : 'transparent',
                        }}
                      >
                        {/* Checkbox */}
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                          style={{
                            background: isChecked ? domain.color : '#F0F0F0',
                            border: isChecked ? 'none' : `2px solid #D0D0D0`,
                          }}
                        >
                          {isChecked && <Check size={16} style={{ color: '#fff' }} />}
                        </div>

                        {/* Text */}
                        <div className="flex-1 text-left">
                          <p
                            className="text-sm font-bold"
                            style={{
                              color: isChecked ? domain.color : COLORS.text,
                              textDecoration: isChecked ? 'none' : 'none',
                            }}
                          >
                            {milestone.text}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: COLORS.textLight }}>
                            Typical: {milestone.typical}
                          </p>
                        </div>

                        {isChecked && (
                          <Star size={16} fill={COLORS.gold} style={{ color: COLORS.gold, flexShrink: 0 }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default MilestonesScreen;
