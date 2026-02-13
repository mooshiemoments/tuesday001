// ProfileScreen - Magical Toybox Style
// Child profile, Account access, Golden Tickets, Share to Unlock, Mission, Settings, Social

import React, { useState } from 'react';
import { 
  Crown,
  Users,
  Plus,
  Gift,
  Share2,
  Heart,
  Bell,
  Edit3,
  LogOut,
  Trash2,
  ChevronRight,
  Check,
  Clock,
  Lock,
  Sparkles,
  Target,
  ExternalLink
} from 'lucide-react';

// MOOSHIE BRAND COLORS
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
  red: '#E53935',
};

// Default profile fallback
const DEFAULT_PROFILE = {
  childName: 'Your little one',
  ageBand: '1-2 years',
};

const SAMPLE_CAREGIVERS = [
  { id: '1', name: 'Sarah', email: 'sarah@email.com', status: 'active', isOwner: true },
  { id: '2', name: 'Dad', email: 'dad@email.com', status: 'active', isOwner: false },
  { id: '3', name: 'Grandma', email: 'gran@email.com', status: 'pending', isOwner: false },
];

const SAMPLE_GOLDEN_TICKETS = [
  { id: '1', status: 'available' },
  { id: '2', status: 'shared', sharedWith: 'Mike' },
  { id: '3', status: 'claimed', claimedBy: 'Sarah' },
];

// Topics that can be unlocked by sharing (for free users)
const UNLOCK_TOPICS = [
  { id: 'car', name: 'Car Activities', icon: '🚗', unlocked: true },
  { id: 'kindness', name: 'Kindness', icon: '💝', unlocked: false },
  { id: 'gratitude', name: 'Gratitude', icon: '🙏', unlocked: false },
];


// ============================================================
// MAIN PROFILE SCREEN
// ============================================================

const ProfileScreen = ({
  profile = DEFAULT_PROFILE,
  caregivers = SAMPLE_CAREGIVERS,
  goldenTickets = SAMPLE_GOLDEN_TICKETS,
  isPremium = true,
  setProfile,
  stats = {},
  activityData = { completed: [], favorites: [] },
  activitiesData = [],
  memoriesCount = 0,
  onShowPaywall,
  onShowResetConfirm,
  onNavigateToMission,
  onNavigateToLabs,
  onNavigateToNotifications,
  onNavigateToEditProfile,
  onShowGoldenTicketShare,
  onShowInviteModal,
  onShowShareModal,
  onLogout,
}) => {
  const availableTickets = goldenTickets.filter(t => t.status === 'available').length;
  const unlockedTopics = UNLOCK_TOPICS.filter(t => t.unlocked).length;

  // Use real stats
  const completedCount = activityData.completed?.length || 0;
  const favoritesCount = activityData.favorites?.length || 0;

  return (
    <div 
      className="min-h-screen pb-24"
      style={{ 
        background: `linear-gradient(180deg, ${COLORS.cream} 0%, #FFF5E6 100%)`,
        fontFamily: "system-ui, -apple-system, sans-serif"
      }}
    >
      {/* ===== HEADER ===== */}
      <div className="px-5 pt-4 pb-2">
        <h1 className="text-2xl font-black" style={{ color: COLORS.purple }}>
          Profile
        </h1>
      </div>

      {/* ===== 1. CHILD PROFILE ===== */}
      <div className="px-5 py-4">
        <div 
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{ 
            background: '#fff',
            border: `4px solid ${COLORS.purple}`,
          }}
        >
          {/* Stacked effect */}
          <div 
            className="absolute -bottom-2 left-2 right-2 h-full rounded-3xl -z-10"
            style={{ background: COLORS.coral }}
          />

          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md text-2xl font-black"
              style={{ 
                background: COLORS.purplePale,
                border: `3px solid ${COLORS.purple}`,
                color: COLORS.purple
              }}
            >
              {profile.childName.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-xl font-black" style={{ color: COLORS.text }}>
                {profile.childName}
              </h2>
              <p className="text-sm" style={{ color: COLORS.textLight }}>
                {profile.ageBand}
              </p>
            </div>

            {/* Premium badge */}
            {isPremium && (
              <div 
                className="px-3 py-2 rounded-xl flex items-center gap-1.5"
                style={{ background: COLORS.gold, border: `2px solid ${COLORS.purple}` }}
              >
                <Crown size={16} style={{ color: COLORS.purple }} fill={COLORS.purple} />
                <span className="text-xs font-black" style={{ color: COLORS.purple }}>
                  PREMIUM
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== 2. ACCOUNT ACCESS ===== */}
      <div className="px-5 py-2">
        <div 
          className="rounded-2xl overflow-hidden"
          style={{ background: '#fff', border: `3px solid ${isPremium ? '#F0F0F0' : COLORS.purple}` }}
        >
          {/* Header */}
          <div className="p-4 flex items-center justify-between" style={{ borderBottom: `2px solid #F0F0F0` }}>
            <div className="flex items-center gap-2">
              <Users size={20} style={{ color: COLORS.purple }} />
              <h3 className="font-black" style={{ color: COLORS.text }}>Account Access</h3>
            </div>
            {isPremium && (
              <button
                onClick={onShowInviteModal}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-sm transition-all active:scale-95"
                style={{ background: COLORS.purplePale, color: COLORS.purple }}
              >
                <Plus size={16} />
                Invite
              </button>
            )}
          </div>

          {/* Premium: Full caregiver list */}
          {isPremium && (
            <div className="divide-y" style={{ borderColor: '#F0F0F0' }}>
              {caregivers.map((caregiver) => (
                <div key={caregiver.id} className="p-4 flex items-center gap-3">
                  {/* Avatar */}
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ 
                      background: caregiver.isOwner ? COLORS.gold : COLORS.purplePale,
                      color: COLORS.purple
                    }}
                  >
                    {caregiver.name.charAt(0)}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold" style={{ color: COLORS.text }}>
                        {caregiver.name}
                      </p>
                      {caregiver.isOwner && (
                        <span 
                          className="text-xs px-1.5 py-0.5 rounded font-bold"
                          style={{ background: COLORS.goldLight, color: '#92400E' }}
                        >
                          Owner
                        </span>
                      )}
                    </div>
                    <p className="text-xs" style={{ color: COLORS.textLight }}>
                      {caregiver.email}
                    </p>
                  </div>

                  {/* Status */}
                  {caregiver.status === 'pending' ? (
                    <span 
                      className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full"
                      style={{ background: COLORS.coralLight, color: COLORS.coral }}
                    >
                      <Clock size={12} />
                      Pending
                    </span>
                  ) : (
                    <span 
                      className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full"
                      style={{ background: `${COLORS.green}15`, color: COLORS.green }}
                    >
                      <Check size={12} />
                      Active
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Free: Just owner + upgrade prompt */}
          {!isPremium && (
            <div>
              {/* Owner only */}
              <div className="p-4 flex items-center gap-3" style={{ borderBottom: `2px solid #F0F0F0` }}>
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: COLORS.gold, color: COLORS.purple }}
                >
                  {caregivers[0]?.name.charAt(0) || 'Y'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold" style={{ color: COLORS.text }}>
                      {caregivers[0]?.name || 'You'}
                    </p>
                    <span 
                      className="text-xs px-1.5 py-0.5 rounded font-bold"
                      style={{ background: COLORS.goldLight, color: '#92400E' }}
                    >
                      Owner
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: COLORS.textLight }}>
                    {caregivers[0]?.email || 'your@email.com'}
                  </p>
                </div>
              </div>

              {/* Upgrade prompt */}
              <div className="p-4" style={{ background: COLORS.purplePale }}>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: COLORS.purple }}
                  >
                    <Crown size={20} style={{ color: '#fff' }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm" style={{ color: COLORS.purple }}>
                      Want to add caregivers?
                    </p>
                    <p className="text-xs" style={{ color: COLORS.textLight }}>
                      Upgrade to share with family & nannies
                    </p>
                  </div>
                  <ChevronRight size={20} style={{ color: COLORS.purple }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== 3. GOLDEN TICKETS (Premium only) ===== */}
      {isPremium && (
        <div className="px-5 py-4">
          <div 
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, ${COLORS.gold}15 0%, ${COLORS.coral}10 100%)`,
              border: `3px solid ${COLORS.gold}`,
            }}
          >
            {/* Sparkles decoration */}
            <Sparkles 
              className="absolute top-3 right-3 opacity-30" 
              size={24} 
              style={{ color: COLORS.gold }}
            />

            <div className="flex items-center gap-2 mb-3">
              <Gift size={20} style={{ color: COLORS.gold }} />
              <h3 className="font-black" style={{ color: COLORS.purple }}>Golden Tickets</h3>
              <span 
                className="ml-auto text-xs font-bold px-2 py-1 rounded-full"
                style={{ background: COLORS.gold, color: COLORS.purple }}
              >
                {availableTickets} left
              </span>
            </div>

            <p className="text-sm mb-4" style={{ color: COLORS.text }}>
              Give friends <strong>1 month Premium free!</strong>
            </p>

            {/* Ticket display */}
            <div className="flex justify-center gap-4 mb-4">
              {goldenTickets.map((ticket) => (
                <div key={ticket.id} className="flex flex-col items-center">
                  <span 
                    className="text-4xl mb-1"
                    style={{ 
                      opacity: ticket.status === 'available' ? 1 : 0.4,
                      filter: ticket.status === 'available' ? 'none' : 'grayscale(80%)'
                    }}
                  >
                    🎫
                  </span>
                  <span className="text-xs" style={{ color: COLORS.textLight }}>
                    {ticket.status === 'available' && 'Ready'}
                    {ticket.status === 'shared' && `→ ${ticket.sharedWith}`}
                    {ticket.status === 'claimed' && `✓ ${ticket.claimedBy}`}
                  </span>
                </div>
              ))}
            </div>

            <button 
              onClick={onShowGoldenTicketShare}
              className="w-full py-3 rounded-xl font-black flex items-center justify-center gap-2"
              style={{ background: COLORS.gold, color: COLORS.purple }}
              disabled={availableTickets === 0}
            >
              <Share2 size={18} />
              Share a Ticket
            </button>
          </div>
        </div>
      )}

      {/* ===== 4. HELP SPREAD THE MISSION (Combined - Free users get unlock incentive) ===== */}
      <div className="px-5 py-4">
        <div 
          className="rounded-2xl p-4 relative overflow-hidden"
          style={{ 
            background: isPremium 
              ? `linear-gradient(135deg, ${COLORS.purple}10 0%, ${COLORS.purplePale} 100%)`
              : '#fff',
            border: `3px solid ${isPremium ? COLORS.purple : COLORS.coral}`,
          }}
        >
          {/* Sparkles decoration */}
          <Sparkles 
            className="absolute top-3 right-3 opacity-20" 
            size={24} 
            style={{ color: isPremium ? COLORS.purple : COLORS.coral }}
          />

          <div className="flex items-center gap-2 mb-2">
            <Target size={20} style={{ color: isPremium ? COLORS.purple : COLORS.coral }} />
            <h3 className="font-black" style={{ color: COLORS.purple }}>
              Help Spread the Mission
            </h3>
          </div>

          <p className="text-sm mb-4" style={{ color: COLORS.text }}>
            We're on a mission to inspire <strong>1 million parents</strong> to play more with their little ones. Help us get there!
          </p>

          {/* Free users: Show unlockable topics */}
          {!isPremium && (
            <>
              <div 
                className="rounded-xl p-3 mb-4"
                style={{ background: COLORS.coralLight }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold" style={{ color: COLORS.coral }}>
                    🎁 Share to unlock premium topics!
                  </span>
                  <span 
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: COLORS.coral, color: '#fff' }}
                  >
                    {unlockedTopics}/{UNLOCK_TOPICS.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {UNLOCK_TOPICS.map((topic) => (
                    <div 
                      key={topic.id}
                      className="flex items-center gap-2 p-2 rounded-lg"
                      style={{ 
                        background: '#fff',
                        border: `2px solid ${topic.unlocked ? COLORS.green : '#E5E5E5'}`
                      }}
                    >
                      <span className="text-lg">{topic.icon}</span>
                      <span 
                        className="flex-1 font-bold text-sm"
                        style={{ color: topic.unlocked ? COLORS.green : COLORS.text }}
                      >
                        {topic.name}
                      </span>
                      {topic.unlocked ? (
                        <span 
                          className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ background: `${COLORS.green}15`, color: COLORS.green }}
                        >
                          <Check size={10} />
                          Unlocked
                        </span>
                      ) : (
                        <Lock size={14} style={{ color: COLORS.textLight }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onShowShareModal}
                className="w-full py-3 rounded-xl font-black flex items-center justify-center gap-2 transition-all active:scale-98"
                style={{ background: COLORS.coral, color: '#fff' }}
              >
                <Share2 size={18} />
                Share & Unlock
              </button>
            </>
          )}

          {/* Premium users: Just share button */}
          {isPremium && (
            <button
              onClick={onShowShareModal}
              className="w-full py-3 rounded-xl font-black flex items-center justify-center gap-2 transition-all active:scale-98"
              style={{ background: COLORS.purple, color: '#fff' }}
            >
              <Heart size={18} />
              Share Mooshie
            </button>
          )}
        </div>
      </div>

      {/* ===== 6. SETTINGS ===== */}
      <div className="px-5 py-2">
        <div 
          className="rounded-2xl overflow-hidden"
          style={{ background: '#fff', border: `3px solid #F0F0F0` }}
        >
          {/* Notifications */}
          <button 
            onClick={onNavigateToNotifications}
            className="w-full p-4 flex items-center gap-3" 
            style={{ borderBottom: `2px solid #F0F0F0` }}
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: COLORS.purplePale }}
            >
              <Bell size={20} style={{ color: COLORS.purple }} />
            </div>
            <span className="flex-1 text-left font-bold" style={{ color: COLORS.text }}>
              Notification Settings
            </span>
            <ChevronRight size={20} style={{ color: COLORS.textLight }} />
          </button>

          {/* Edit Child Profile */}
          <button 
            onClick={onNavigateToEditProfile}
            className="w-full p-4 flex items-center gap-3" 
            style={{ borderBottom: `2px solid #F0F0F0` }}
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: COLORS.purplePale }}
            >
              <Edit3 size={20} style={{ color: COLORS.purple }} />
            </div>
            <span className="flex-1 text-left font-bold" style={{ color: COLORS.text }}>
              Edit Child Profile
            </span>
            <ChevronRight size={20} style={{ color: COLORS.textLight }} />
          </button>

          {/* Premium Upsell (Free users only) */}
          {!isPremium && (
            <button 
              onClick={onShowPaywall}
              className="w-full p-4 flex items-center gap-3"
              style={{ borderBottom: `2px solid #F0F0F0`, background: COLORS.goldLight }}
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: COLORS.gold }}
              >
                <Crown size={20} style={{ color: COLORS.purple }} />
              </div>
              <span className="flex-1 text-left font-black" style={{ color: COLORS.purple }}>
                Upgrade to Premium
              </span>
              <ChevronRight size={20} style={{ color: COLORS.purple }} />
            </button>
          )}

          {/* Log Out */}
          <button
            onClick={onLogout}
            className="w-full p-4 flex items-center gap-3"
            style={{ borderBottom: `2px solid #F0F0F0` }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: '#F5F5F5' }}
            >
              <LogOut size={20} style={{ color: COLORS.textLight }} />
            </div>
            <span className="flex-1 text-left font-bold" style={{ color: COLORS.text }}>
              Log Out
            </span>
            <ChevronRight size={20} style={{ color: COLORS.textLight }} />
          </button>

          {/* Reset Data */}
          <button 
            onClick={onShowResetConfirm}
            className="w-full p-4 flex items-center gap-3"
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${COLORS.red}10` }}
            >
              <Trash2 size={20} style={{ color: COLORS.red }} />
            </div>
            <span className="flex-1 text-left font-bold" style={{ color: COLORS.red }}>
              Reset All Data
            </span>
            <ChevronRight size={20} style={{ color: COLORS.red }} />
          </button>
        </div>
      </div>

      {/* ===== 7. SOCIAL LINKS ===== */}
      <div className="px-5 py-6">
        <p className="text-xs text-center mb-3 font-bold" style={{ color: COLORS.textLight }}>
          Follow us for daily inspiration
        </p>
        <div className="flex justify-center gap-4">
          {/* Facebook */}
          <button 
            onClick={() => window.open('https://www.facebook.com/profile.php?id=61586858073521', '_blank')}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
            style={{ background: '#1877F2' }}
          >
            <span className="text-white text-lg font-bold">f</span>
          </button>

          {/* TikTok */}
          <button 
            onClick={() => window.open('https://www.tiktok.com/@mooshiemoments', '_blank')}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
            style={{ background: '#000' }}
          >
            <span className="text-white text-lg">♪</span>
          </button>

          {/* Instagram */}
          <button 
            onClick={() => window.open('https://www.instagram.com/mooshiemoments', '_blank')}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
            style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
          >
            <span className="text-white text-lg">📷</span>
          </button>
        </div>
      </div>

      {/* App version */}
      <p className="text-center text-xs pb-4" style={{ color: COLORS.textLight }}>
        Mooshie v1.0.0
      </p>

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};


// ============================================================
// PREVIEW CONTAINER
// ============================================================

const ProfilePreview = () => {
  const [isPremium, setIsPremium] = useState(true);

  return (
    <div className="flex flex-col items-center p-4 md:p-8 min-h-screen" style={{ background: '#0F0F1A' }}>
      <h1 className="text-xl md:text-2xl font-bold text-white mb-2 text-center">Profile Screen</h1>
      <p className="text-gray-400 mb-4 text-sm text-center">Settings, sharing, account management</p>
      
      {/* Premium toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setIsPremium(false)}
          className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
            !isPremium ? 'bg-white text-gray-900 shadow-lg' : 'bg-white/10 text-white/70'
          }`}
        >
          Free User
        </button>
        <button
          onClick={() => setIsPremium(true)}
          className={`px-4 py-2 rounded-full font-medium transition-all text-sm flex items-center gap-2 ${
            isPremium ? 'bg-yellow-400 text-gray-900 shadow-lg' : 'bg-white/10 text-white/70'
          }`}
        >
          <Crown size={16} /> Premium
        </button>
      </div>

      {/* Phone mockup */}
      <div 
        className="relative rounded-[2rem] md:rounded-[3rem] p-2 md:p-3 shadow-2xl w-full max-w-[340px] md:max-w-[390px]"
        style={{ background: 'linear-gradient(145deg, #2d2d3a 0%, #1a1a2e 100%)' }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-5 md:h-7 bg-black rounded-b-xl md:rounded-b-2xl z-20"></div>
        
        <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-white" style={{ height: '700px' }}>
          <div className="h-full overflow-y-auto">
            <ProfileScreen isPremium={isPremium} />
          </div>
        </div>
      </div>

      {/* Structure */}
      <div className="mt-6 max-w-md w-full">
        <p className="text-white/60 text-xs text-center mb-3">Structure:</p>
        <div className="bg-white/5 rounded-lg p-3 text-xs space-y-1">
          <p className="text-white/70">1. Child Profile (name, age, premium badge)</p>
          <p className="text-white/70">2. Account Access (unlimited for premium, 1 for free)</p>
          <p className="text-yellow-400">3. Golden Tickets (premium only)</p>
          <p className="text-white/70">4. Help Spread the Mission (+ unlock topics for free)</p>
          <p className="text-white/70">5. Settings (notifications, edit, logout, reset)</p>
          <p className="text-white/70">6. Social Links (FB, TikTok, Insta)</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
