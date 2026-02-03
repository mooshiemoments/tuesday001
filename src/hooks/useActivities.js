import { useState, useEffect, useCallback } from 'react';

// Activity arrays
let activitiesData = [];
let toysActivities = [];
let diyToyLabActivities = [];
let seasonalActivities = [];
let tinyFixerActivities = [];
let sensoryScienceActivities = [];
let regulationStationActivities = [];
let speechSparkActivities = [];
let heuristicHamperActivities = [];
let kindnessPackActivities = [];
let mannersPackActivities = [];
let sharingPackActivities = [];
let helperPackActivities = [];
let gratitudePackActivities = [];
let craftsActivities = [];
let outdoorActivities = [];

// Transform activity data
const transformActivity = (act) => {
  let geniusScript = [];
  if (act.magic_words) {
    geniusScript = act.magic_words.split(' | ').map(m => m.replace(/"/g, '').trim()).filter(m => m.length > 0);
  }
  
  let einsteinExt = null;
  if (act.infinite_star && act.infinite_star.trim()) {
    const parts = act.infinite_star.split(' | ').map(p => p.trim());
    einsteinExt = {
      title: "⭐ Extend the Fun",
      description: parts[0] || '',
      prompt: parts[1] || parts[0] || '',
      cognitive_boost: parts[2] || "Builds on core skills with added challenge!"
    };
  }
  
  let householdItems = [];
  if (act.items_required) {
    // Handle both array and string formats
    if (Array.isArray(act.items_required)) {
      householdItems = act.items_required.map(i => i.trim()).filter(i => i.length > 0);
    } else {
      householdItems = act.items_required.split(/[•\n]/).map(i => i.replace(/^[\s,]+|[\s,]+$/g, '').trim()).filter(i => i.length > 0);
      if (householdItems.length <= 1 && act.items_required.includes(',')) {
        householdItems = act.items_required.split(',').map(i => i.trim()).filter(i => i.length > 0);
      }
    }
  }
  
  let steps = [];
  if (act.steps) {
    // Handle both array and string formats
    if (Array.isArray(act.steps)) {
      steps = act.steps.map(s => s.trim()).filter(s => s.length > 0);
    } else if (/\d+\./.test(act.steps)) {
      steps = act.steps.split(/\n?\d+\.\s*/).map(s => s.trim()).filter(s => s.length > 0);
    } else if (act.steps.includes('\n')) {
      steps = act.steps.split('\n').map(s => s.trim()).filter(s => s.length > 0);
    } else {
      steps = [act.steps.trim()];
    }
  }
  
  let skills = [];
  if (act.skills) {
    // Handle both array and string formats
    if (Array.isArray(act.skills)) {
      skills = act.skills.map(s => s.trim()).filter(s => s.length > 0);
    } else {
      skills = act.skills.split(/[,\n]/).map(s => s.trim()).filter(s => s.length > 0);
    }
  }
  
  // Parse extended play (infinite_star) into array
  let extendedPlay = [];
  if (act.infinite_star && act.infinite_star.trim()) {
    extendedPlay = act.infinite_star.split(' | ').map(p => p.trim()).filter(p => p.length > 0);
  }

  // Parse tags
  let tags = [];
  if (act.tags) {
    tags = Array.isArray(act.tags) ? act.tags : act.tags.split(',').map(t => t.trim());
  }

  return {
    ...act,
    what_to_do: act.what_to_do || '',
    household_items: householdItems,
    steps: steps,
    skills: skills,
    safety_note: act.safety_note || null,
    genius_script: geniusScript,
    einstein_extension: einsteinExt,
    extended_play: extendedPlay,  // NEW: Array of extension ideas
    parental_coaching: act.parental_coaching || '',  // NEW: Expert coaching for parents
    mooshie_moment: act.mooshie_moment || act.bonding_cues || '',  // NEW: Magic moment to watch for
    tags: tags,  // NEW: Filterable tags
    is_hero: act.is_hero || false,
    prep_time: act.prep_time || '',
    mess_level: act.mess_level || '',
    best_time: act.best_time || '',
    bonding_cues: act.bonding_cues || '',
    why_it_matters: act.why_it_matters || '',
    energy_level: act.energy_level || 'moderate',
    supervision: act.supervision || 'guided'
  };
};

// Load activities from JSON
export async function loadActivitiesFromJSON() {
  try {
    const response = await fetch('/activities.json');
    if (!response.ok) throw new Error('Failed to load activities');
    const data = await response.json();
    const allActs = data.activities || data;
    
    // Reset arrays
    activitiesData = []; toysActivities = []; diyToyLabActivities = []; seasonalActivities = [];
    tinyFixerActivities = []; sensoryScienceActivities = []; regulationStationActivities = [];
    speechSparkActivities = []; heuristicHamperActivities = []; kindnessPackActivities = [];
    mannersPackActivities = []; sharingPackActivities = []; helperPackActivities = [];
    gratitudePackActivities = []; craftsActivities = []; outdoorActivities = [];
    
    // Sort into arrays
    allActs.forEach(act => {
      const section = act.section || '';
      if (section.includes('Toys')) toysActivities.push(act);
      else if (section.includes('DIY Toy Lab')) diyToyLabActivities.push(act);
      else if (section.includes('Seasonal')) seasonalActivities.push(act);
      else if (section.includes('Tiny Fixer')) tinyFixerActivities.push(act);
      else if (section.includes('Sensory Science') || section.includes('Sensory Scientist')) sensoryScienceActivities.push(act);
      else if (section.includes('Regulation Station')) regulationStationActivities.push(act);
      else if (section.includes('Speech Spark')) speechSparkActivities.push(act);
      else if (section.includes('Heuristic')) heuristicHamperActivities.push(act);
      else if (section.includes('Kindness')) kindnessPackActivities.push(act);
      else if (section.includes('Manners')) mannersPackActivities.push(act);
      else if (section.includes('Sharing')) sharingPackActivities.push(act);
      else if (section.includes('Helper')) helperPackActivities.push(act);
      else if (section.includes('Gratitude')) gratitudePackActivities.push(act);
      else if (section.includes('Crafts')) craftsActivities.push(act);
      else if (section.includes('Outdoor')) outdoorActivities.push(act);
      else activitiesData.push(act);
    });
    
    // Transform all arrays
    activitiesData = activitiesData.map(transformActivity);
    toysActivities = toysActivities.map(transformActivity);
    diyToyLabActivities = diyToyLabActivities.map(transformActivity);
    seasonalActivities = seasonalActivities.map(transformActivity);
    tinyFixerActivities = tinyFixerActivities.map(transformActivity);
    sensoryScienceActivities = sensoryScienceActivities.map(transformActivity);
    regulationStationActivities = regulationStationActivities.map(transformActivity);
    speechSparkActivities = speechSparkActivities.map(transformActivity);
    heuristicHamperActivities = heuristicHamperActivities.map(transformActivity);
    kindnessPackActivities = kindnessPackActivities.map(transformActivity);
    mannersPackActivities = mannersPackActivities.map(transformActivity);
    sharingPackActivities = sharingPackActivities.map(transformActivity);
    helperPackActivities = helperPackActivities.map(transformActivity);
    gratitudePackActivities = gratitudePackActivities.map(transformActivity);
    craftsActivities = craftsActivities.map(transformActivity);
    outdoorActivities = outdoorActivities.map(transformActivity);
    
    console.log(`✅ Loaded ${allActs.length} activities`);
    return true;
  } catch (error) {
    console.error('Failed to load activities:', error);
    return false;
  }
}

// Get all activities
export function getAllActivities() {
  return [
    ...activitiesData, ...toysActivities, ...seasonalActivities, ...diyToyLabActivities,
    ...tinyFixerActivities, ...sensoryScienceActivities, ...regulationStationActivities,
    ...speechSparkActivities, ...heuristicHamperActivities, ...kindnessPackActivities,
    ...mannersPackActivities, ...sharingPackActivities, ...helperPackActivities,
    ...gratitudePackActivities, ...craftsActivities, ...outdoorActivities
  ];
}

// Get specific arrays
export const getActivitiesData = () => activitiesData;
export const getToysActivities = () => toysActivities;
export const getSeasonalActivities = () => seasonalActivities;
export const getCraftsActivities = () => craftsActivities;
export const getOutdoorActivities = () => outdoorActivities;
export const getKindnessPackActivities = () => kindnessPackActivities;
export const getMannersPackActivities = () => mannersPackActivities;
export const getSharingPackActivities = () => sharingPackActivities;
export const getHelperPackActivities = () => helperPackActivities;
export const getGratitudePackActivities = () => gratitudePackActivities;

// Custom hook
export function useActivities() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activities, setActivities] = useState({
    all: [],
    main: [],
    toys: [],
    diyToyLab: [],
    seasonal: [],
    crafts: [],
    outdoor: [],
  });
  
  useEffect(() => {
    const load = async () => {
      await loadActivitiesFromJSON();
      setActivities({
        all: getAllActivities(),
        main: [...activitiesData],
        toys: [...toysActivities],
        diyToyLab: [...diyToyLabActivities],
        seasonal: [...seasonalActivities],
        crafts: [...craftsActivities],
        outdoor: [...outdoorActivities],
      });
      setIsLoaded(true);
    };
    load();
  }, []);
  
  const refreshActivities = useCallback(() => {
    setActivities({
      all: getAllActivities(),
      main: [...activitiesData],
      toys: [...toysActivities],
      diyToyLab: [...diyToyLabActivities],
      seasonal: [...seasonalActivities],
      crafts: [...craftsActivities],
      outdoor: [...outdoorActivities],
    });
  }, []);
  
  return { 
    isLoaded, 
    allActivities: activities.all,
    activitiesData: activities.main,
    toysActivities: activities.toys,
    diyToyLabActivities: activities.diyToyLab,
    seasonalActivities: activities.seasonal,
    craftsActivities: activities.crafts,
    outdoorActivities: activities.outdoor,
    refreshActivities,
    getAllActivities,
    getActivitiesData
  };
}
