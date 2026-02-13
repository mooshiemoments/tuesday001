import React, { useState, useEffect } from 'react';
import { Loader2, ChevronLeft, Check } from 'lucide-react';

// =====================================================
// MOOSHIE MOMENTS - Complete App.jsx
// =====================================================

// Import constants
import {
  COLORS,
  MASCOTS,
  MASCOT_FALLBACKS,
  LOGO_URL,
  AFFIRMATIONS,
  PLAY_PULSE_QUESTIONS,
  DISCOVERY_SECTIONS,
  TOPIC_ICONS,
  REPORT_REQUIREMENTS,
  AGE_PROGRESSION,
  MISSION_PACKS,
  SOCIAL_LINKS,
  STORAGE_KEY,
  COMMUNITY_KEY,
  MISSION_KEY,
  DAILY_FREE_LIMIT,
  defaultProfile,
  defaultActivityData,
  defaultMemories,
  defaultStats,
  defaultMission,
} from './constants';

// Import hooks
import { useActivities, loadActivitiesFromJSON } from './hooks/useActivities';

// Import screen components - New onboarding flow
import { 
  WelcomeCarousel, 
  NameDOBScreen, 
  PlayPulseScreen,
  PersonalizingScreen, 
  RecommendedActivityScreen, 
  PaywallScreen 
} from './components/onboarding';
import HomeScreen from './components/screens/HomeScreen';
import DiscoverScreen from './components/screens/DiscoverScreen';
import PlayScreen from './components/screens/PlayScreen';
import ActivityDetail from './components/screens/ActivityDetail';
import ProfileScreen from './components/screens/ProfileScreen';
import MemoriesScreen from './components/screens/MemoriesScreen';
import MissionScreen from './components/screens/MissionScreen';
import MooshieLabsScreen from './components/screens/MooshieLabsScreen';
import TopicBrowseScreen from './components/screens/TopicBrowseScreen';
import NotificationSettings from './components/screens/NotificationSettings';
import EditChildProfile from './components/screens/EditChildProfile';
import MilestonesScreen from './components/screens/MilestonesScreen';

// Import common components
import { TabNav, Confetti, MascotImage } from './components/common';

// Import modals
import {
  Paywall,
  FeedbackModal,
  MemoryModal,
  MilestoneModal,
  ShareModal,
  ResetConfirmModal,
  AgeProgressionModal,
  EinsteinShareCard,
  GoldenTicketUnlockModal,
  GoldenTicketShareModal,
  InviteCaregiverModal,
  ParentalGate,
} from './components/modals';

// =====================================================
// MAIN APP COMPONENT
// =====================================================

export default function MooshieMomentsApp() {
  // =====================================================
  // STATE
  // =====================================================
  const [isLoading, setIsLoading] = useState(true);
  const [activitiesLoaded, setActivitiesLoaded] = useState(false);
  const [screen, setScreen] = useState('welcome');
  const [activeTab, setActiveTab] = useState('home');
  
  // Selection
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  
  // Modals
  const [showMemoryModal, setShowMemoryModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [showAgeProgressionModal, setShowAgeProgressionModal] = useState(false);
  const [showGoldenTicketUnlock, setShowGoldenTicketUnlock] = useState(false);
  const [showGoldenTicketShare, setShowGoldenTicketShare] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showParentalGate, setShowParentalGate] = useState(false);
  const [checkedMilestones, setCheckedMilestones] = useState({});
  
  // Completion Flow
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [completedActivity, setCompletedActivity] = useState(null);
  const [milestoneType, setMilestoneType] = useState(null);
  
  // Onboarding - flow: carousel → nameDOB → playPulse → personalizing → recommended → paywall
  const [onboardingPhase, setOnboardingPhase] = useState('carousel');
  const [onboardingSlide, setOnboardingSlide] = useState(0);
  const [onboardingName, setOnboardingName] = useState('');
  const [onboardingDay, setOnboardingDay] = useState('');
  const [onboardingMonth, setOnboardingMonth] = useState('');
  const [onboardingYear, setOnboardingYear] = useState('');
  const [onboardingAge, setOnboardingAge] = useState('');
  const [playPulseQuestion, setPlayPulseQuestion] = useState(0);
  const [playPulseAnswers, setPlayPulseAnswers] = useState({});
  
  // Data
  const [profile, setProfile] = useState(defaultProfile);
  const [activityData, setActivityData] = useState(defaultActivityData);
  const [memories, setMemories] = useState(defaultMemories);
  const [stats, setStats] = useState(defaultStats);
  const [isPremium, setIsPremium] = useState(false);
  const [mission, setMission] = useState(defaultMission);
  const [goldenTickets, setGoldenTickets] = useState([
    { id: 1, status: 'available' },
    { id: 2, status: 'available' },
    { id: 3, status: 'available' },
  ]);
  const [caregivers, setCaregivers] = useState([
    { id: '1', name: 'You', email: '', status: 'active', isOwner: true },
  ]);
  
  // Get activities from hook
  const { 
    activitiesData, 
    allActivities,
    toysActivities, 
    diyToyLabActivities, 
    seasonalActivities,
    craftsActivities,
    outdoorActivities,
  } = useActivities();

  // =====================================================
  // DAILY ACTIVITY HELPERS
  // =====================================================

  // Get today's date string for comparison
  const getTodayDateString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  // Check if we need to refresh daily activities (new day)
  const checkDailyRefresh = (currentActivityData) => {
    const today = getTodayDateString();
    if (currentActivityData.lastRefreshDate !== today) {
      // New day - calculate how many activities to replenish
      const completedYesterday = currentActivityData.dailyCompleted?.length || 0;
      return {
        needsRefresh: true,
        replenishCount: Math.min(completedYesterday, DAILY_FREE_LIMIT),
        today,
      };
    }
    return { needsRefresh: false };
  };

  // Get activities for HomeScreen with hero prioritization and daily limits
  const getHomeActivities = (activities, ageBand, currentActivityData, userIsPremium) => {
    if (!activities || activities.length === 0) return [];

    // Filter by age band
    const ageFiltered = activities.filter(a => a.age_band === ageBand);
    if (ageFiltered.length === 0) return [];

    // Separate heroes and regular activities (excluding already completed today)
    const dailyCompletedIds = currentActivityData.dailyCompleted || [];
    const allCompleted = currentActivityData.completed || [];

    // Filter out activities completed today
    const available = ageFiltered.filter(a => !dailyCompletedIds.includes(a.id));

    // Separate by type
    const heroes = available.filter(a => a.is_hero || a.isHero);
    const regular = available.filter(a => !a.is_hero && !a.isHero && !a.isPremium && a.tier !== 'premium');
    const premium = available.filter(a => a.isPremium || a.tier === 'premium');

    // Calculate remaining free activities for today
    const completedTodayCount = dailyCompletedIds.length;
    const remainingFreeCount = Math.max(0, DAILY_FREE_LIMIT - completedTodayCount);

    // If all free activities used up, return empty + premium teaser
    if (remainingFreeCount === 0 && !userIsPremium) {
      return premium.length > 0 ? [{ ...premium[0], isLockedPremium: true }] : [];
    }

    // Select activities: prioritize heroes, then regular
    let selected = [];

    // First hero (if available)
    if (heroes.length > 0) {
      selected.push(heroes[0]);
    }

    // Fill with regular activities
    const neededRegular = remainingFreeCount - selected.length;
    if (neededRegular > 0 && regular.length > 0) {
      // Prioritize activities not completed before, then others
      const notCompletedBefore = regular.filter(a => !allCompleted.includes(a.id));
      const completedBefore = regular.filter(a => allCompleted.includes(a.id));
      const sortedRegular = [...notCompletedBefore, ...completedBefore];
      selected = selected.concat(sortedRegular.slice(0, neededRegular));
    }

    // If still need more, add from heroes
    if (selected.length < remainingFreeCount && heroes.length > 1) {
      selected = selected.concat(heroes.slice(1, 1 + (remainingFreeCount - selected.length)));
    }

    // Limit to remaining free count
    selected = selected.slice(0, remainingFreeCount);

    // Add premium teaser (always show 1 locked premium for non-premium users)
    if (!userIsPremium && premium.length > 0) {
      selected.push({ ...premium[0], isPremium: true, isLockedPremium: true });
    }

    return selected;
  };

  // =====================================================
  // INITIALIZATION
  // =====================================================
  useEffect(() => {
    const init = async () => {
      try {
        await loadActivitiesFromJSON();
        setActivitiesLoaded(true);
        
        // Load saved data
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          if (data.profile) setProfile(data.profile);
          if (data.memories) setMemories(data.memories);
          if (data.stats) setStats(data.stats);
          if (data.isPremium) setIsPremium(data.isPremium);
          if (data.goldenTickets) setGoldenTickets(data.goldenTickets);
          if (data.caregivers) setCaregivers(data.caregivers);
          if (data.checkedMilestones) setCheckedMilestones(data.checkedMilestones);

          // Handle activity data with daily refresh check
          if (data.activityData) {
            const today = new Date();
            const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

            // Check if it's a new day - reset daily tracking
            if (data.activityData.lastRefreshDate !== todayStr) {
              setActivityData({
                ...data.activityData,
                dailyCompleted: [],     // Reset daily completions
                lastRefreshDate: todayStr,
                dailyShownIds: [],      // Reset shown IDs for new day
              });
            } else {
              setActivityData(data.activityData);
            }
          }

          // Skip onboarding if profile exists
          if (data.profile?.childName && data.profile?.ageBand) {
            setScreen('main');
          }
        }
        
        const missionSaved = localStorage.getItem(MISSION_KEY);
        if (missionSaved) setMission(JSON.parse(missionSaved));
        
      } catch (e) {
        console.error('Init error:', e);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  // Save data when it changes
  useEffect(() => {
    if (!isLoading && profile.childName) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile, activityData, memories, stats, isPremium, goldenTickets, caregivers, checkedMilestones }));
    }
  }, [profile, activityData, memories, stats, isPremium, goldenTickets, caregivers, checkedMilestones, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(MISSION_KEY, JSON.stringify(mission));
    }
  }, [mission, isLoading]);

  // =====================================================
  // HANDLERS
  // =====================================================
  const finishOnboarding = () => {
    setProfile(p => ({
      ...p,
      childName: onboardingName || p.childName || 'Little One',
      ageBand: onboardingAge || p.ageBand || '6-12 months',
      birthday: onboardingDay && onboardingMonth !== '' && onboardingYear ? { day: onboardingDay, month: onboardingMonth, year: onboardingYear } : p.birthday || null,
      ageBandSetDate: new Date().toISOString(),
      onboardingComplete: true,
    }));
    setScreen('main');
  };

  const handlePurchase = () => {
    setIsPremium(true);
    setShowGoldenTicketUnlock(true);
    finishOnboarding();
  };

  const finishCompletionFlow = () => { 
    setCompletedActivity(null); 
    setCurrentFeedback(null); 
    setSelectedActivity(null); 
    setScreen('main'); 
  };

  const handleSelectActivity = (a) => { 
    setSelectedActivity(a); 
    setScreen('activity'); 
  };

  const handleTabNavigate = (tabId, screenName) => { 
    setActiveTab(tabId); 
    setScreen(screenName); 
  };

  const handleBack = () => { 
    setScreen('main'); 
    setActiveTab('home'); 
  };

  const handleResetData = () => { 
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(MISSION_KEY);
    setProfile(defaultProfile); 
    setActivityData(defaultActivityData); 
    setMemories(defaultMemories); 
    setStats(defaultStats); 
    setIsPremium(false); 
    setMission(defaultMission); 
    setOnboardingPhase('carousel');
    setScreen('welcome'); 
    setShowResetConfirm(false); 
  };

  const handleActivityComplete = (activity, feedback) => {
    setCompletedActivity(activity);
    setCurrentFeedback(feedback);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    const today = getTodayDateString();

    // Update stats and daily tracking
    setActivityData(prev => {
      // Check if this is a free activity (not premium)
      const isFreeActivity = !activity.isPremium && activity.tier !== 'premium';

      return {
        ...prev,
        completed: [...(prev.completed || []), activity.id],
        // Track daily completions for free activities
        dailyCompleted: isFreeActivity
          ? [...(prev.dailyCompleted || []), activity.id]
          : prev.dailyCompleted || [],
        lastRefreshDate: today,
      };
    });

    setStats(prev => ({
      ...prev,
      totalMoments: (prev.totalMoments || 0) + 1,
      lastActivityDate: today,
    }));

    // Show memory modal after feedback is submitted
    setTimeout(() => {
      setShowMemoryModal(true);
    }, 500);
  };

  // Called when Complete button is clicked on ActivityDetail
  const handleActivityCompleteStart = (activity) => {
    setCompletedActivity(activity);
    setShowFeedbackModal(true);
  };

  // =====================================================
  // LOADING SCREEN
  // =====================================================
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: COLORS.cream }}>
        <img src={LOGO_URL} alt="Mooshie" className="w-24 h-24 mb-4" onError={(e) => e.target.style.display = 'none'} />
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: COLORS.purple }} />
        <p className="mt-4 text-sm" style={{ color: COLORS.text }}>Loading activities...</p>
      </div>
    );
  }

  // =====================================================
  // ONBOARDING FLOW - New simplified version
  // Flow: Carousel → NameDOB → Personalizing → Recommended → Paywall → Home
  // =====================================================
  if (screen === 'welcome') {
    
    // Phase 1: Carousel (3 slides)
    if (onboardingPhase === 'carousel') {
      return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl" style={{ width: '100%', maxWidth: '430px', height: '932px', maxHeight: '95vh' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50" />
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
              <WelcomeCarousel
                currentSlide={onboardingSlide}
                onSlideChange={setOnboardingSlide}
                onSkip={() => setOnboardingPhase('nameDOB')}
                onComplete={() => setOnboardingPhase('nameDOB')}
              />
            </div>
          </div>
        </div>
      );
    }
    
    // Phase 2: Name + DOB
    if (onboardingPhase === 'nameDOB') {
      return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl" style={{ width: '100%', maxWidth: '430px', height: '932px', maxHeight: '95vh' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50" />
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
              <NameDOBScreen
                name={onboardingName}
                day={onboardingDay}
                month={onboardingMonth}
                year={onboardingYear}
                onNameChange={setOnboardingName}
                onDayChange={setOnboardingDay}
                onMonthChange={setOnboardingMonth}
                onYearChange={setOnboardingYear}
                onBack={() => setOnboardingPhase('carousel')}
                onContinue={(ageBand) => { 
                  setOnboardingAge(ageBand);
                  setPlayPulseQuestion(0);
                  setPlayPulseAnswers({});
                  setOnboardingPhase('playPulse'); 
                }}
              />
            </div>
          </div>
        </div>
      );
    }
    
    // Phase 3: Play Pulse Questions
    if (onboardingPhase === 'playPulse') {
      // Get number of questions for this age band
      const PLAY_PULSE_QUESTIONS = {
        '6-12 months': 3,
        '1-2 years': 3,
        '2-3 years': 3,
        '3-4 years': 3,
      };
      const totalQuestions = PLAY_PULSE_QUESTIONS[onboardingAge] || 3;
      
      return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl" style={{ width: '100%', maxWidth: '430px', height: '932px', maxHeight: '95vh' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50" />
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
              <PlayPulseScreen
                name={onboardingName}
                ageBand={onboardingAge}
                currentQuestion={playPulseQuestion}
                onAnswer={(answer, key) => {
                  setPlayPulseAnswers(prev => ({ ...prev, [key]: answer }));
                  if (playPulseQuestion < totalQuestions - 1) {
                    setPlayPulseQuestion(playPulseQuestion + 1);
                  } else {
                    setOnboardingPhase('personalizing');
                  }
                }}
                onBack={() => setOnboardingPhase('nameDOB')}
              />
            </div>
          </div>
        </div>
      );
    }
    
    // Phase 4: Personalizing Animation
    if (onboardingPhase === 'personalizing') {
      return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl" style={{ width: '100%', maxWidth: '430px', height: '932px', maxHeight: '95vh' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50" />
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
              <PersonalizingScreen
                name={onboardingName}
                ageBand={onboardingAge}
                onComplete={() => setOnboardingPhase('recommended')}
              />
            </div>
          </div>
        </div>
      );
    }
    
    // Phase 5: Recommended Activity
    if (onboardingPhase === 'recommended') {
      return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl" style={{ width: '100%', maxWidth: '430px', height: '932px', maxHeight: '95vh' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50" />
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
              <RecommendedActivityScreen
                name={onboardingName}
                ageBand={onboardingAge}
                onStartActivity={() => setOnboardingPhase('paywall')}
                onSkip={() => setOnboardingPhase('paywall')}
              />
            </div>
          </div>
        </div>
      );
    }
    
    // Phase 6: Paywall
    if (onboardingPhase === 'paywall') {
      return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl" style={{ width: '100%', maxWidth: '430px', height: '932px', maxHeight: '95vh' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50" />
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
              <PaywallScreen
                name={onboardingName}
                onPurchase={handlePurchase}
                onSkip={finishOnboarding}
                onBack={() => setOnboardingPhase('recommended')}
              />
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  }

  // =====================================================
  // MAIN APP SCREENS
  // =====================================================
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#1a1a2e' }}>
      {/* Mobile Phone Frame */}
      <div 
        className="relative bg-black rounded-[3rem] p-3 shadow-2xl"
        style={{ 
          width: '100%',
          maxWidth: '430px',
          height: '932px',
          maxHeight: '95vh',
        }}
      >
        {/* Phone notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50" />
        
        {/* Screen area */}
        <div 
          className="relative w-full h-full rounded-[2.5rem] overflow-hidden"
          style={{ backgroundColor: COLORS.cream }}
        >
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 z-40" style={{ paddingTop: '8px' }}>
            <span className="text-xs font-semibold" style={{ color: COLORS.text }}>9:41</span>
            <div className="flex items-center gap-1">
              <span className="text-xs" style={{ color: COLORS.text }}>📶</span>
              <span className="text-xs" style={{ color: COLORS.text }}>🔋</span>
            </div>
          </div>
          
          {/* App content - scrollable */}
          <div className="h-full overflow-y-auto overflow-x-hidden pt-8 pb-24" style={{ scrollbarWidth: 'none' }}>
            {showConfetti && <Confetti />}
      
            {/* Main Screen */}
            {screen === 'main' && activeTab === 'home' && (
              <HomeScreen
                profile={profile}
                activities={getHomeActivities(activitiesData, profile.ageBand, activityData, isPremium)}
                activityData={activityData}
                isPremium={isPremium}
                stats={stats}
                onSelectActivity={handleSelectActivity}
                onShowPaywall={() => setShowParentalGate(true)}
                onNavigateToMilestones={() => setScreen('milestones')}
                onToggleFavorite={(id) => {
                  setActivityData(prev => ({
                    ...prev,
                    favorites: prev.favorites?.includes(id)
                      ? prev.favorites.filter(fid => fid !== id)
                      : [...(prev.favorites || []), id]
                  }));
                }}
              />
            )}
      
            {/* Discover Screen */}
            {screen === 'main' && activeTab === 'discover' && (
              <DiscoverScreen
                profile={profile}
                isPremium={isPremium}
                activitiesData={activitiesData}
                allActivities={allActivities}
                onSelectTopic={(topic) => { 
                  if (topic === 'MooshieLabs') {
                    setScreen('labs');
                  } else {
                    setSelectedTopic(topic); 
                    setScreen('topicBrowse'); 
                  }
                }}
                onSelectSeason={(season) => {
                  setSelectedTopic('Seasonal');
                  setSelectedSeason(season);
                  setScreen('topicBrowse');
                }}
                onSelectActivity={handleSelectActivity}
                onShowPaywall={() => setShowParentalGate(true)}
                onNavigateToLabs={() => setScreen('labs')}
              />
            )}
      
            {/* Play Screen */}
            {screen === 'main' && activeTab === 'play' && (
              <PlayScreen
                profile={profile}
                isPremium={isPremium}
                activitiesData={activitiesData}
                allActivities={allActivities}
                onSelectActivity={handleSelectActivity}
                onShowPaywall={() => setShowParentalGate(true)}
              />
            )}
      
            {/* Topic Browse */}
            {screen === 'topicBrowse' && (
              <TopicBrowseScreen
                selectedTopic={selectedTopic}
                selectedSeason={selectedSeason}
                profile={profile}
                isPremium={isPremium}
                activitiesData={activitiesData}
                allActivities={allActivities}
                activityData={activityData}
                onSelectActivity={handleSelectActivity}
                onBack={() => { setScreen('main'); setActiveTab('discover'); setSelectedTopic(null); }}
                onShowPaywall={() => setShowParentalGate(true)}
                onToggleFavorite={(id) => {
                  setActivityData(prev => ({
                    ...prev,
                    favorites: prev.favorites?.includes(id)
                      ? prev.favorites.filter(fid => fid !== id)
                      : [...(prev.favorites || []), id]
                  }));
                }}
              />
            )}
      
            {/* Activity Detail */}
            {screen === 'activity' && selectedActivity && (
              <ActivityDetail
                activity={selectedActivity}
                profile={profile}
                isPremium={isPremium}
                isFavorite={activityData.favorites?.includes(selectedActivity.id)}
                repeatInfo={activityData.completed?.includes(selectedActivity.id) ? {
                  isRepeatReady: true,
                  daysSince: 7,
                  lastReaction: activityData.reactions?.[selectedActivity.id],
                  lastMemory: memories?.[selectedActivity.id]?.note
                } : null}
                onBack={handleBack}
                onComplete={() => handleActivityCompleteStart(selectedActivity)}
                onToggleFavorite={() => {
                  setActivityData(prev => ({
                    ...prev,
                    favorites: prev.favorites?.includes(selectedActivity.id)
                      ? prev.favorites.filter(id => id !== selectedActivity.id)
                      : [...(prev.favorites || []), selectedActivity.id]
                  }));
                }}
                onShowPaywall={() => setShowParentalGate(true)}
              />
            )}
      
            {/* Memories Screen */}
            {screen === 'main' && activeTab === 'memories' && (
              <MemoriesScreen
                profile={profile}
                memories={memories}
                stats={stats}
                activityData={activityData}
                activitiesData={activitiesData}
                allActivities={allActivities}
                isPremium={isPremium}
                onShowPaywall={() => setShowParentalGate(true)}
                onSelectActivity={handleSelectActivity}
              />
            )}
      
            {/* Profile Screen */}
            {screen === 'main' && activeTab === 'profile' && (
              <ProfileScreen
                profile={profile}
                setProfile={setProfile}
                stats={stats}
                isPremium={isPremium}
                goldenTickets={goldenTickets}
                caregivers={caregivers}
                activityData={activityData}
                activitiesData={activitiesData}
                onNavigateToMission={() => setScreen('mission')}
                onNavigateToLabs={() => setScreen('labs')}
                onNavigateToNotifications={() => setScreen('notificationSettings')}
                onNavigateToEditProfile={() => setScreen('editProfile')}
                onShowPaywall={() => setShowParentalGate(true)}
                onShowResetConfirm={() => setShowResetConfirm(true)}
                onShowGoldenTicketShare={() => setShowGoldenTicketShare(true)}
                onShowInviteModal={() => setShowInviteModal(true)}
                onShowShareModal={() => setShowShareModal(true)}
                onLogout={() => {
                  // Return to welcome screen (keeps data, just shows onboarding)
                  setScreen('welcome');
                  setOnboardingPhase('carousel');
                }}
              />
            )}
      
            {/* Mission Screen */}
            {screen === 'mission' && (
              <MissionScreen
                profile={profile}
                mission={mission}
                setMission={setMission}
                isPremium={isPremium}
                activitiesData={activitiesData}
                onBack={() => { setScreen('main'); setActiveTab('profile'); }}
                onShowPaywall={() => setShowParentalGate(true)}
              />
            )}
      
            {/* Labs Screen */}
            {screen === 'labs' && (
              <MooshieLabsScreen
                profile={profile}
                isPremium={isPremium}
                onBack={() => { setScreen('main'); setActiveTab('profile'); }}
                onShowPaywall={() => setShowParentalGate(true)}
              />
            )}
      
            {/* Notification Settings */}
            {screen === 'notificationSettings' && (
              <NotificationSettings
                profile={profile}
                setProfile={setProfile}
                onBack={() => { setScreen('main'); setActiveTab('profile'); }}
              />
            )}

            {/* Milestones Screen */}
            {screen === 'milestones' && (
              <MilestonesScreen
                profile={profile}
                checkedMilestones={checkedMilestones}
                onToggleMilestone={(key) => {
                  setCheckedMilestones(prev => ({
                    ...prev,
                    [key]: !prev[key]
                  }));
                }}
                onBack={() => { setScreen('main'); setActiveTab('home'); }}
              />
            )}

            {/* Edit Child Profile */}
            {screen === 'editProfile' && (
              <EditChildProfile
                profile={profile}
                setProfile={setProfile}
                onBack={() => { setScreen('main'); setActiveTab('profile'); }}
              />
            )}
      
          </div>
          
          {/* Tab Navigation - fixed at bottom of phone */}
          {screen === 'main' && (
            <TabNav activeTab={activeTab} onNavigate={handleTabNavigate} />
          )}
          
          {/* ==================== MODALS (outside scrollable area) ==================== */}
      
          {showParentalGate && (
            <ParentalGate
              onPass={() => { setShowParentalGate(false); setShowPaywall(true); }}
              onClose={() => setShowParentalGate(false)}
            />
          )}

          {showPaywall && (
            <Paywall
              profile={profile}
              onPurchase={() => { setIsPremium(true); setShowPaywall(false); setShowGoldenTicketUnlock(true); }}
              onClose={() => setShowPaywall(false)}
            />
          )}
      
          {showFeedbackModal && (
            <FeedbackModal
              profile={profile}
              activity={selectedActivity}
              onSubmit={(feedback) => { handleActivityComplete(selectedActivity, feedback); setShowFeedbackModal(false); }}
              onClose={() => setShowFeedbackModal(false)}
            />
          )}
      
          {showMemoryModal && completedActivity && (
            <MemoryModal
              activity={completedActivity}
              profile={profile}
              reactionEmoji={currentFeedback?.reaction}
              onSave={(memory) => { 
                setMemories(prev => ({ ...prev, [completedActivity.id]: memory }));
                setShowMemoryModal(false);
                finishCompletionFlow();
              }}
              onSkip={() => { setShowMemoryModal(false); finishCompletionFlow(); }}
            />
          )}
      
          {showMilestoneModal && (
            <MilestoneModal
              type={milestoneType}
              stats={stats}
              profile={profile}
              onClose={() => setShowMilestoneModal(false)}
              onShare={() => { setShowMilestoneModal(false); setShowShareCard(true); }}
            />
          )}
      
          {showShareModal && (
            <ShareModal
              activity={selectedActivity}
              onClose={() => setShowShareModal(false)}
            />
          )}
      
          {showResetConfirm && (
            <ResetConfirmModal
              onConfirm={handleResetData}
              onCancel={() => setShowResetConfirm(false)}
            />
          )}
      
          {showAgeProgressionModal && (
            <AgeProgressionModal
              profile={profile}
              activitiesData={activitiesData}
              onUpdateAge={(newAge) => { setProfile(p => ({ ...p, ageBand: newAge })); setShowAgeProgressionModal(false); }}
              onDismiss={() => { setProfile(p => ({ ...p, dismissedAgePrompt: true })); setShowAgeProgressionModal(false); }}
              onClose={() => setShowAgeProgressionModal(false)}
            />
          )}
      
          {showShareCard && completedActivity && (
            <EinsteinShareCard
              profile={profile}
              stats={stats}
              activityData={activityData}
              completedActivity={completedActivity}
              onClose={() => setShowShareCard(false)}
              onFinishCompletionFlow={finishCompletionFlow}
            />
          )}
      
          {showGoldenTicketUnlock && (
            <GoldenTicketUnlockModal
              goldenTickets={goldenTickets}
              onShareTicket={() => { setShowGoldenTicketUnlock(false); setShowGoldenTicketShare(true); }}
              onClose={() => setShowGoldenTicketUnlock(false)}
            />
          )}
      
          {showGoldenTicketShare && (
            <GoldenTicketShareModal
              profile={profile}
              goldenTickets={goldenTickets}
              setGoldenTickets={setGoldenTickets}
              onClose={() => setShowGoldenTicketShare(false)}
            />
          )}

          {showInviteModal && (
            <InviteCaregiverModal
              childName={profile.childName}
              caregivers={caregivers}
              onClose={() => setShowInviteModal(false)}
              onInvite={(inviteData) => {
                if (inviteData.method === 'email') {
                  // Add new caregiver to list
                  setCaregivers(prev => [
                    ...prev,
                    {
                      id: String(Date.now()),
                      name: inviteData.name,
                      email: inviteData.email,
                      status: 'pending',
                      isOwner: false,
                    }
                  ]);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
