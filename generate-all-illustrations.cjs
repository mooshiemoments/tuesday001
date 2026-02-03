const fs = require('fs');
const path = require('path');

// ============================================
// GENERATE ALL ILLUSTRATIONS
// Uses the ultimate generator v3 logic
// ============================================

console.log(`\n🎨 MOOSHIE ILLUSTRATION GENERATOR`);
console.log(`   Generating for ALL activities...\n`);

// Load all activities
const data = JSON.parse(fs.readFileSync('public/activities.json', 'utf8'));
const activities = data.activities;
console.log(`   Total activities: ${activities.length}`);

// Create output directory
const outputDir = 'public/illustrations';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// ============================================
// GENERATOR CODE (from v3)
// ============================================

function seededRandom(seed) {
  let s = seed;
  return function() {
    s = Math.sin(s) * 10000;
    return s - Math.floor(s);
  };
}

const palettes = {
  peach: ['#FFE5D9', '#FFCDB2', '#FFB4A2', '#E5989B', '#D4A5A5'],
  mint: ['#D8F3DC', '#B7E4C7', '#95D5B2', '#74C69D', '#52B788'],
  lavender: ['#E2D9F3', '#C9B8E8', '#B298DC', '#9B7ED9', '#8B5CF6'],
  yellow: ['#FFF3B0', '#FFE566', '#FFD93D', '#F9C74F', '#F4A261'],
  blue: ['#D4E9FF', '#A8D0F0', '#7BB8E0', '#48CAE4', '#00B4D8'],
  coral: ['#FFD6D6', '#FFB3B3', '#FF9999', '#FF6B6B', '#EF476F'],
  teal: ['#D0F0F0', '#A0E0E0', '#70D0D0', '#4ECDC4', '#2A9D8F'],
  sage: ['#E8F0E8', '#C5DBC5', '#A3C4A3', '#81B29A', '#6A9B7E'],
  blush: ['#FFE4EC', '#FFC8DD', '#FFAFCC', '#FF8FAB', '#FF5C8D'],
  sky: ['#E0F4FF', '#BAE6FD', '#7DD3FC', '#38BDF8', '#0EA5E9'],
  warm: ['#FFF5EB', '#FFE4CC', '#FFD3A8', '#FFC285', '#FFB067'],
  cool: ['#F0F7FF', '#DCE8F5', '#C7D9EB', '#B3CAE0', '#9EBBD6'],
};

const allPalettes = Object.values(palettes);

// Item extraction
const itemKeywords = {
  'spoon': 'spoon', 'cup': 'cup', 'bowl': 'bowl', 'plate': 'plate', 'pot': 'pot',
  'container': 'container', 'bottle': 'bottle', 'jar': 'jar', 'lid': 'lid',
  'paper': 'paper', 'ribbon': 'ribbon', 'string': 'string', 'tape': 'tape',
  'scissors': 'scissors', 'glue': 'glue', 'crayon': 'crayon', 'marker': 'marker',
  'ball': 'ball', 'block': 'block', 'toy': 'toy', 'doll': 'doll', 'car': 'car',
  'puzzle': 'puzzle', 'rattle': 'rattle',
  'blanket': 'blanket', 'scarf': 'scarf', 'sock': 'sock', 'cloth': 'cloth',
  'towel': 'towel', 'fabric': 'fabric',
  'flower': 'flower', 'leaf': 'leaf', 'plant': 'plant', 'seed': 'seed',
  'water': 'water', 'sand': 'sand', 'rock': 'rock', 'stick': 'stick',
  'fruit': 'fruit', 'apple': 'apple', 'banana': 'banana', 'orange': 'orange',
  'carrot': 'carrot', 'cookie': 'cookie', 'bread': 'bread',
  'brush': 'brush', 'sponge': 'sponge', 'feather': 'feather', 'cotton': 'cotton',
  'drum': 'drum', 'bell': 'bell', 'shaker': 'shaker',
  'soap': 'soap', 'bubble': 'bubble', 'mirror': 'mirror',
  'box': 'box', 'basket': 'basket', 'bag': 'bag', 'tray': 'tray',
  'flashlight': 'flashlight', 'torch': 'flashlight', 'light': 'light',
  'book': 'book', 'card': 'card', 'picture': 'picture',
  'coin': 'coin',
};

function extractItems(itemsRequired) {
  const found = new Set();
  const itemText = (itemsRequired || []).join(' ').toLowerCase();
  for (const [keyword, item] of Object.entries(itemKeywords)) {
    if (itemText.includes(keyword)) found.add(item);
  }
  return [...found];
}

// Scene keyword mapping
const keywordScenes = {
  'water': 'water', 'float': 'water', 'sink': 'water', 'splash': 'water', 'pour': 'water',
  'bath': 'bath', 'wash': 'bath', 'bubble': 'bath', 'tub': 'bath',
  'music': 'music', 'rhythm': 'music', 'song': 'music', 'sing': 'music', 'dance': 'music',
  'drum': 'music', 'shake': 'music', 'rattle': 'music', 'bell': 'music',
  'texture': 'sensory', 'touch': 'sensory', 'feel': 'sensory', 'sensory': 'sensory', 'smell': 'sensory',
  'block': 'blocks', 'stack': 'blocks', 'tower': 'blocks', 'build': 'blocks',
  'paint': 'art', 'color': 'art', 'draw': 'art', 'art': 'art', 'crayon': 'art', 'scribble': 'art',
  'craft': 'diy', 'create': 'diy', 'make': 'diy', 'box': 'diy', 'container': 'diy', 'diy': 'diy',
  'climb': 'movement', 'jump': 'movement', 'run': 'movement', 'move': 'movement', 'motor': 'movement',
  'exercise': 'movement', 'crawl': 'movement', 'roll': 'movement', 'tummy': 'movement',
  'nature': 'nature', 'plant': 'nature', 'garden': 'nature', 'tree': 'nature', 'flower': 'nature',
  'outdoor': 'nature', 'sun': 'nature', 'grass': 'nature', 'leaf': 'nature',
  'feeling': 'feelings', 'emotion': 'feelings', 'happy': 'feelings', 'sad': 'feelings',
  'calm': 'calm', 'angry': 'feelings', 'face': 'feelings', 'expression': 'feelings',
  'relax': 'calm', 'breathe': 'calm', 'gentle': 'calm', 'soothe': 'calm', 'comfort': 'calm',
  'book': 'book', 'read': 'book', 'story': 'book', 'word': 'book', 'language': 'book', 'letter': 'book',
  'food': 'food', 'eat': 'food', 'cook': 'food', 'kitchen': 'food', 'snack': 'food',
  'fruit': 'food', 'vegetable': 'food', 'taste': 'food',
  'sleep': 'sleep', 'bed': 'sleep', 'night': 'sleep', 'nap': 'sleep', 'dream': 'sleep', 'rest': 'sleep',
  'mirror': 'mirror', 'reflection': 'mirror',
  'science': 'science', 'experiment': 'science', 'discover': 'science', 'magnet': 'science',
  'gravity': 'science', 'light': 'science', 'shadow': 'science',
  'animal': 'animal', 'pet': 'animal', 'dog': 'animal', 'cat': 'animal', 'bunny': 'animal', 'bird': 'animal',
  'share': 'sharing', 'turn': 'sharing', 'friend': 'sharing', 'together': 'sharing',
  'help': 'helper', 'helper': 'helper', 'chore': 'helper', 'task': 'helper',
  'timer': 'timer', 'time': 'timer', 'wait': 'timer', 'routine': 'timer', 'schedule': 'timer',
  'potty': 'potty', 'toilet': 'potty', 'diaper': 'potty',
};

const topicDefaultScenes = {
  'Toys': 'blocks', 'Sensory Exploration': 'sensory', 'Math & Logic': 'blocks',
  'Language & Storytelling': 'book', 'Fine Motor': 'diy', 'Science & Physics': 'science',
  'Music & Rhythm': 'music', 'Social & Emotional': 'feelings', 'Gross Motor': 'movement',
  'Seasonal': 'nature', 'Tiny Fixer': 'helper', 'Regulation Station': 'calm',
  'DIY Toy Lab': 'diy', 'Heuristic Hamper': 'diy', 'Speech Spark': 'book',
  'Gratitude Pack': 'feelings', 'Little Helper Pack': 'helper', 'Kindness Pack': 'sharing',
  'Manners Pack': 'food', 'Sharing & Turns Pack': 'sharing', 'Sensory Scientist': 'science',
  'Teething Relief': 'calm', 'Bedtime Routines': 'sleep', 'Separation Anxiety': 'feelings',
  'Outdoor Play': 'nature', 'Water Play': 'water', 'Caregiver Wellbeing': 'calm',
  'Messy Play': 'art', 'Tantrum Taming': 'calm', 'Picky Eating Solutions': 'food',
  'Independent Play Building': 'blocks', 'Gentle Discipline Moments': 'feelings',
  'Potty Learning Prep': 'potty', 'Sleep Transition Support': 'sleep',
  'Sibling Adjustment': 'sharing', 'Screen Time Alternatives': 'diy',
  'Language Explosion Support': 'book', 'Big Feelings Coaching': 'feelings',
  'Language & Communication Boost': 'book', 'Sharing & Turn-Taking': 'sharing',
  'Tantrum & Meltdown Recovery': 'calm', 'Potty Training Support': 'potty',
  'Power Struggle Solutions': 'feelings', 'Preschool Readiness': 'book',
  'Fear & Anxiety Support': 'calm', 'Sleep Regression Help': 'sleep',
  'Picky Eating Phase 2': 'food', 'Big Sibling Adjustment': 'sharing',
  'Independence vs Safety Balance': 'helper', 'Emotional Vocabulary Building': 'feelings',
  'Transition & Change Support': 'calm', 'Impulse Control Practice': 'timer',
  'Preschool Transition Support': 'book', 'Friendship & Social Navigation': 'sharing',
  'Lying & Fantasy vs Reality': 'book', 'Persistent Power Struggles': 'feelings',
  'Whining & Negotiation Fatigue': 'feelings', 'Fear & Nightmare Management': 'sleep',
  'Sibling Conflict Resolution': 'sharing', 'Focus & Attention Building': 'blocks',
  'Potty Training Completion': 'potty', 'Emotional Regulation Coaching': 'feelings',
  'Body Autonomy & Safety': 'feelings', 'The Endless \'Why?\' Phase': 'science',
  'Screen Time Boundaries': 'timer', 'Early Learning Pressure': 'book',
  'Perfectionism & Frustration': 'feelings', 'Independence Battles': 'helper',
};

function determineScene(activity) {
  const titleLower = activity.title.toLowerCase();
  for (const [keyword, scene] of Object.entries(keywordScenes)) {
    if (titleLower.includes(keyword)) return scene;
  }
  if (topicDefaultScenes[activity.topic]) return topicDefaultScenes[activity.topic];
  const topicLower = activity.topic.toLowerCase();
  for (const [keyword, scene] of Object.entries(keywordScenes)) {
    if (topicLower.includes(keyword)) return scene;
  }
  return 'calm';
}

// ============================================
// COMPACT SCENE GENERATORS
// ============================================

function generateScene(sceneName, rand, palette, items, activity) {
  const e = [];
  const p = palette;

  // Helper functions
  const circle = (cx, cy, r, fill, op = 1) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${op}"/>`;
  const ellipse = (cx, cy, rx, ry, fill, op = 1) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" opacity="${op}"/>`;
  const rect = (x, y, w, h, fill, rx = 8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"/>`;
  const star = (cx, cy, r, fill) => {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const radius = i % 2 === 0 ? r : r * 0.5;
      const angle = (i * 36 - 90) * Math.PI / 180;
      pts.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`);
    }
    return `<polygon points="${pts.join(' ')}" fill="${fill}"/>`;
  };
  const heart = (cx, cy, s, fill) => `<path d="M${cx},${cy + s * 0.15} C${cx - s * 0.4},${cy - s * 0.2} ${cx - s * 0.2},${cy - s * 0.4} ${cx},${cy - s * 0.15} C${cx + s * 0.2},${cy - s * 0.4} ${cx + s * 0.4},${cy - s * 0.2} ${cx},${cy + s * 0.15}Z" fill="${fill}"/>`;
  const sparkles = (x, y, spread, color) => {
    let s = '';
    for (let i = 0; i < 4; i++) {
      const sx = x + (Math.sin(i * 2.5) - 0.5) * spread;
      const sy = y + (Math.cos(i * 3.1) - 0.5) * spread * 0.6;
      s += star(sx, sy, 8 + i * 2, color);
    }
    return s;
  };
  const dots = (x, y, w, h, color) => {
    let d = '';
    for (let i = 0; i < 6; i++) {
      d += circle(x + rand() * w, y + rand() * h, 2 + rand() * 3, color, 0.3);
    }
    return d;
  };

  switch (sceneName) {
    case 'water':
      e.push(ellipse(100, 105, 55, 18, p[2]));
      e.push(`<path d="M45 80 Q45 115 100 120 Q155 115 155 80" fill="${p[1]}" stroke="${p[2]}" stroke-width="2"/>`);
      e.push(ellipse(100, 80, 50, 12, palettes.blue[0]));
      e.push(circle(70 + rand() * 15, 68, 12, palettes.yellow[1]));
      e.push(rect(120, 78, 18, 18, palettes.coral[1], 3));
      e.push(circle(55, 55, 5, palettes.blue[1]));
      e.push(circle(140, 50, 4, palettes.blue[1]));
      e.push(sparkles(50, 40, 35, palettes.yellow[0]));
      break;

    case 'bath':
      e.push(`<path d="M25 65 Q25 120 100 120 Q175 120 175 65" fill="white" stroke="${p[2]}" stroke-width="3"/>`);
      e.push(`<path d="M30 70 Q30 110 100 112 Q170 110 170 70" fill="${palettes.blue[0]}"/>`);
      for (let i = 0; i < 5; i++) {
        e.push(circle(50 + i * 25 + rand() * 10, 52 + rand() * 8, 8 + rand() * 6, 'white', 0.7));
      }
      e.push(ellipse(130, 68, 16, 14, palettes.yellow[1]));
      e.push(circle(142, 58, 12, palettes.yellow[1]));
      e.push(`<polygon points="152,58 165,60 152,62" fill="${palettes.coral[1]}"/>`);
      e.push(circle(146, 55, 2.5, '#333'));
      break;

    case 'music':
      e.push(dots(0, 0, 200, 150, p[1]));
      const notePos = [[55, 80], [100, 55], [145, 75]];
      notePos.forEach(([nx, ny], i) => {
        e.push(ellipse(nx + rand() * 10, ny + 15, 12, 8, p[2 - i % 2]));
        e.push(rect(nx + rand() * 10 + 10, ny - 20, 4, 35, p[2 - i % 2], 1));
      });
      e.push(`<text x="40" y="40" fill="${p[2]}" font-size="14" opacity="0.7">♪</text>`);
      e.push(`<text x="155" y="50" fill="${palettes.coral[1]}" font-size="12" opacity="0.5">♫</text>`);
      e.push(sparkles(160, 35, 25, palettes.yellow[0]));
      break;

    case 'sensory':
      const panelColors = [palettes.coral[1], palettes.mint[1], palettes.lavender[1]];
      for (let i = 0; i < 3; i++) {
        e.push(rect(28 + i * 58, 45, 50, 65, panelColors[i], 10));
        if (i === 0) for (let j = 0; j < 6; j++) e.push(circle(40 + (j % 3) * 13, 60 + Math.floor(j / 3) * 20, 5, palettes.coral[2]));
        else if (i === 1) for (let j = 0; j < 4; j++) e.push(`<line x1="94" y1="${55 + j * 14}" x2="128" y2="${55 + j * 14}" stroke="${palettes.mint[2]}" stroke-width="4"/>`);
        else for (let j = 0; j < 4; j++) e.push(rect(152 + (j % 2) * 18, 52 + Math.floor(j / 2) * 22, 12, 12, palettes.lavender[2], 2));
      }
      e.push(sparkles(170, 30, 25, palettes.yellow[0]));
      break;

    case 'blocks':
      const blockColors = [palettes.coral[1], palettes.mint[1], palettes.lavender[1], palettes.yellow[1]];
      let yPos = 115;
      for (let i = 0; i < 4; i++) {
        const bw = 55 - i * 10 + rand() * 8;
        const bh = 22 + rand() * 5;
        yPos -= bh;
        e.push(rect(100 - bw / 2 + (rand() - 0.5) * 6, yPos, bw, bh, blockColors[i], 4));
      }
      e.push(star(45, 45, 14, palettes.yellow[1]));
      e.push(star(160, 50, 12, palettes.yellow[0]));
      e.push(star(100, 22, 10, palettes.coral[1]));
      break;

    case 'art':
      for (let i = 0; i < 6; i++) e.push(circle(20 + rand() * 160, 20 + rand() * 35, 5 + rand() * 10, [palettes.coral[1], palettes.blue[1], palettes.yellow[1]][i % 3], 0.4));
      const potColors = [palettes.coral[1], palettes.blue[1], palettes.yellow[1]];
      for (let i = 0; i < 3; i++) {
        const px = 40 + i * 55 + rand() * 10;
        const ph = 35 + rand() * 12;
        e.push(rect(px, 115 - ph, 35, ph, potColors[i], 4));
        e.push(ellipse(px + 17.5, 115 - ph - 8, 10, 8, potColors[i].replace('1', '2')));
      }
      e.push(rect(165, 50, 8, 40, '#8B4513', 2));
      e.push(rect(163, 85, 12, 20, p[1], 3));
      break;

    case 'movement':
      for (let i = 0; i < 4; i++) e.push(`<path d="M${10 + i * 12} ${45 + i * 6} Q${22 + i * 12} ${38 + i * 6} ${34 + i * 12} ${45 + i * 6}" stroke="${p[1]}" stroke-width="3" fill="none" opacity="0.3"/>`);
      e.push(rect(25, 90, 55, 28, palettes.coral[1], 14));
      e.push(rect(70, 65, 50, 26, palettes.mint[1], 13));
      e.push(rect(110, 45, 45, 24, palettes.lavender[1], 12));
      e.push(circle(160, 85, 15, palettes.yellow[1]));
      e.push(circle(157, 80, 5, 'white', 0.5));
      e.push(sparkles(45, 40, 30, palettes.yellow[0]));
      break;

    case 'nature':
      e.push(rect(0, 100, 200, 50, palettes.sage[1], 0));
      e.push(circle(165, 35, 22, palettes.yellow[1]));
      for (let i = 0; i < 8; i++) {
        const angle = i * 45 * Math.PI / 180;
        e.push(`<line x1="${165 + Math.cos(angle) * 26}" y1="${35 + Math.sin(angle) * 26}" x2="${165 + Math.cos(angle) * 35}" y2="${35 + Math.sin(angle) * 35}" stroke="${palettes.yellow[0]}" stroke-width="3" stroke-linecap="round"/>`);
      }
      e.push(rect(90, 55, 14, 50, '#8B6914', 2));
      for (let i = 0; i < 5; i++) {
        const lx = 75 + i * 12 + rand() * 8;
        const ly = 35 + rand() * 20;
        e.push(`<path d="M${lx},${ly - 12} Q${lx + 10},${ly} ${lx},${ly + 12} Q${lx - 10},${ly} ${lx},${ly - 12}Z" fill="${palettes.mint[1 + i % 2]}"/>`);
      }
      e.push(circle(45, 95, 8, palettes.coral[1]));
      e.push(circle(155, 98, 6, palettes.lavender[1]));
      break;

    case 'feelings':
      e.push(dots(0, 0, 200, 150, p[0]));
      e.push(circle(100, 75, 48, palettes.peach[0]));
      e.push(circle(80, 68, 8, '#333'));
      e.push(circle(120, 68, 8, '#333'));
      e.push(circle(78, 65, 3, 'white'));
      e.push(circle(118, 65, 3, 'white'));
      e.push(`<path d="M72 92 Q100 115 128 92" stroke="#333" stroke-width="4" fill="none" stroke-linecap="round"/>`);
      e.push(ellipse(60, 82, 12, 7, palettes.coral[1], 0.4));
      e.push(ellipse(140, 82, 12, 7, palettes.coral[1], 0.4));
      e.push(heart(45, 40, 15, palettes.coral[1]));
      e.push(heart(160, 45, 12, palettes.coral[0]));
      break;

    case 'book':
      e.push(star(30, 30, 8, palettes.yellow[0]));
      e.push(star(170, 35, 6, p[0]));
      e.push(rect(30, 50, 65, 75, 'white', 3));
      e.push(rect(105, 50, 65, 75, '#FFFBF5', 3));
      e.push(`<line x1="100" y1="50" x2="100" y2="125" stroke="${p[2]}" stroke-width="3"/>`);
      for (let i = 0; i < 5; i++) {
        const lw = 25 + rand() * 20;
        e.push(`<line x1="40" y1="${68 + i * 13}" x2="${40 + lw}" y2="${68 + i * 13}" stroke="#DDD" stroke-width="2"/>`);
        e.push(`<line x1="115" y1="${68 + i * 13}" x2="${115 + lw}" y2="${68 + i * 13}" stroke="#DDD" stroke-width="2"/>`);
      }
      e.push(`<polygon points="155,50 165,50 165,80 160,75 155,80" fill="${palettes.coral[1]}"/>`);
      e.push(sparkles(100, 25, 45, palettes.yellow[1]));
      break;

    case 'food':
      e.push(rect(0, 95, 200, 55, palettes.warm[1], 0));
      e.push(ellipse(100, 90, 60, 22, '#F8F8F8'));
      e.push(ellipse(100, 88, 52, 18, 'white'));
      e.push(circle(75, 75, 16, palettes.coral[1]));
      e.push(rect(73, 57, 4, 8, '#8B4513', 1));
      e.push(`<path d="M105 82 Q125 55 145 75" stroke="${palettes.yellow[1]}" stroke-width="14" fill="none" stroke-linecap="round"/>`);
      e.push(sparkles(160, 45, 28, palettes.yellow[0]));
      break;

    case 'sleep':
      e.push(rect(0, 0, 200, 150, '#1a1a3e', 0));
      for (let i = 0; i < 10; i++) e.push(star(15 + rand() * 170, 10 + rand() * 45, 2 + rand() * 3, palettes.yellow[0]));
      e.push(`<path d="M155 25 A22 22 0 1 1 175 50 A18 18 0 1 0 155 25" fill="${palettes.yellow[1]}"/>`);
      e.push(rect(35, 75, 130, 50, palettes.lavender[1], 8));
      e.push(rect(45, 65, 90, 20, 'white', 8));
      e.push(rect(40, 90, 120, 30, p[1], 6));
      e.push(`<text x="170" y="75" fill="${palettes.lavender[0]}" font-size="16" font-weight="bold">z</text>`);
      e.push(`<text x="178" y="65" fill="${palettes.lavender[0]}" font-size="13" font-weight="bold">z</text>`);
      break;

    case 'mirror':
      e.push(dots(0, 0, 200, 150, p[0]));
      e.push(ellipse(100, 70, 50, 58, p[2]));
      e.push(ellipse(100, 70, 44, 52, palettes.blue[0]));
      e.push(ellipse(80, 50, 15, 20, 'white', 0.5));
      e.push(rect(88, 123, 24, 22, p[2], 4));
      e.push(sparkles(40, 45, 30, palettes.yellow[0]));
      e.push(heart(55, 100, 10, palettes.coral[1]));
      break;

    case 'diy':
      e.push(rect(0, 105, 200, 45, palettes.warm[1], 0));
      e.push(rect(50, 50, 100, 60, p[1], 6));
      e.push(rect(50, 50, 100, 15, p[2], 6));
      e.push(rect(70, 30, 8, 35, palettes.coral[1], 2));
      e.push(rect(90, 25, 25, 35, palettes.yellow[0], 2));
      e.push(circle(130, 45, 15, palettes.mint[1]));
      e.push(`<path d="M160 75 L175 55 M160 75 L175 95" stroke="#888" stroke-width="4" stroke-linecap="round"/>`);
      e.push(star(35, 40, 12, palettes.yellow[0]));
      e.push(star(175, 30, 10, palettes.yellow[1]));
      break;

    case 'calm':
      e.push(ellipse(50, 55, 40, 25, p[0], 0.7));
      e.push(ellipse(100, 45, 50, 30, palettes.lavender[0], 0.6));
      e.push(ellipse(155, 60, 45, 28, p[1], 0.5));
      e.push(ellipse(70, 85, 35, 22, palettes.blue[0], 0.4));
      e.push(ellipse(140, 90, 40, 25, p[0], 0.5));
      e.push(heart(100, 100, 28, palettes.coral[1]));
      e.push(star(45, 35, 10, palettes.yellow[0]));
      e.push(star(160, 40, 8, palettes.yellow[0]));
      break;

    case 'science':
      e.push(rect(0, 110, 200, 40, palettes.cool[1], 0));
      e.push(`<path d="M55 35 L55 80 L40 108 L90 108 L75 80 L75 35" fill="none" stroke="${p[2]}" stroke-width="3"/>`);
      e.push(rect(50, 30, 30, 10, p[2], 2));
      e.push(`<path d="M57 82 L43 105 L87 105 L73 82" fill="${palettes.mint[1]}"/>`);
      e.push(circle(60, 92, 4, palettes.mint[0]));
      e.push(circle(72, 88, 3, palettes.mint[0]));
      e.push(circle(145, 55, 28, p[0], 0.3));
      e.push(circle(145, 55, 24, palettes.blue[0], 0.5));
      e.push(`<circle cx="145" cy="55" r="24" fill="none" stroke="${p[2]}" stroke-width="4"/>`);
      e.push(rect(162, 72, 10, 35, p[2], 3));
      e.push(sparkles(110, 40, 30, palettes.yellow[1]));
      break;

    case 'animal':
      e.push(dots(0, 0, 200, 150, p[0]));
      e.push(ellipse(100, 95, 32, 28, p[1]));
      e.push(circle(100, 58, 28, p[1]));
      e.push(ellipse(82, 25, 10, 24, p[1]));
      e.push(ellipse(118, 25, 10, 24, p[1]));
      e.push(ellipse(82, 27, 5, 15, palettes.coral[0]));
      e.push(ellipse(118, 27, 5, 15, palettes.coral[0]));
      e.push(circle(88, 52, 5, '#333'));
      e.push(circle(112, 52, 5, '#333'));
      e.push(circle(86, 50, 2, 'white'));
      e.push(circle(110, 50, 2, 'white'));
      e.push(ellipse(100, 68, 6, 4, palettes.coral[1]));
      e.push(heart(50, 45, 12, palettes.coral[1]));
      e.push(heart(155, 50, 10, palettes.coral[0]));
      break;

    case 'sharing':
      e.push(dots(0, 0, 200, 150, p[0]));
      e.push(circle(60, 80, 28, p[1]));
      e.push(circle(140, 80, 28, palettes.mint[1]));
      e.push(`<path d="M88 80 L112 80" stroke="${p[2]}" stroke-width="10" stroke-linecap="round"/>`);
      e.push(`<path d="M92 74 L108 74" stroke="${p[2]}" stroke-width="5" stroke-linecap="round"/>`);
      e.push(`<path d="M92 86 L108 86" stroke="${p[2]}" stroke-width="5" stroke-linecap="round"/>`);
      e.push(heart(100, 40, 20, palettes.coral[1]));
      e.push(sparkles(35, 45, 25, palettes.yellow[0]));
      e.push(star(100, 120, 12, palettes.yellow[1]));
      break;

    case 'timer':
      e.push(dots(0, 0, 200, 150, p[0]));
      e.push(circle(100, 75, 45, p[0]));
      e.push(circle(100, 75, 40, 'white'));
      for (let i = 0; i < 12; i++) {
        const angle = i * 30 * Math.PI / 180;
        const len = i % 3 === 0 ? 10 : 5;
        e.push(`<line x1="${100 + Math.cos(angle - Math.PI/2) * 33}" y1="${75 + Math.sin(angle - Math.PI/2) * 33}" x2="${100 + Math.cos(angle - Math.PI/2) * (33 - len)}" y2="${75 + Math.sin(angle - Math.PI/2) * (33 - len)}" stroke="${p[2]}" stroke-width="2"/>`);
      }
      e.push(`<line x1="100" y1="75" x2="100" y2="55" stroke="${p[2]}" stroke-width="4" stroke-linecap="round"/>`);
      e.push(`<line x1="100" y1="75" x2="118" y2="85" stroke="${palettes.coral[1]}" stroke-width="3" stroke-linecap="round"/>`);
      e.push(circle(100, 75, 5, p[2]));
      e.push(star(45, 45, 12, palettes.yellow[0]));
      break;

    case 'helper':
      e.push(dots(0, 0, 200, 150, p[0]));
      e.push(`<path d="M55 45 L55 115 L100 125 L145 115 L145 45 L125 40 L100 48 L75 40 Z" fill="${p[1]}"/>`);
      e.push(rect(80, 70, 40, 40, p[0], 5));
      e.push(rect(85, 75, 30, 30, p[2], 3, 0.3));
      e.push(rect(90, 62, 5, 20, '#8B4513', 1));
      e.push(circle(92.5, 58, 7, palettes.mint[1]));
      e.push(star(45, 40, 15, palettes.yellow[1]));
      e.push(star(160, 45, 13, palettes.yellow[0]));
      e.push(star(100, 25, 10, palettes.coral[1]));
      break;

    case 'potty':
      for (let i = 0; i < 8; i++) {
        const cx = 20 + rand() * 160;
        const cy = 15 + rand() * 35;
        e.push(rand() > 0.5 ? rect(cx, cy, 6, 3, [palettes.yellow[0], palettes.coral[0], palettes.mint[0]][i % 3], 1) : circle(cx, cy, 3, [palettes.yellow[0], palettes.coral[0], palettes.mint[0]][i % 3]));
      }
      e.push(rect(55, 55, 90, 60, p[1], 15));
      e.push(ellipse(100, 75, 28, 20, p[0]));
      e.push(rect(60, 50, 80, 18, p[2], 10));
      e.push(star(40, 40, 15, palettes.yellow[1]));
      e.push(star(165, 45, 13, palettes.yellow[0]));
      e.push(star(100, 25, 12, palettes.coral[1]));
      break;

    default: // calm fallback
      e.push(ellipse(50, 55, 40, 25, p[0], 0.7));
      e.push(ellipse(100, 45, 50, 30, palettes.lavender[0], 0.6));
      e.push(ellipse(155, 60, 45, 28, p[1], 0.5));
      e.push(heart(100, 95, 25, palettes.coral[1]));
      e.push(star(45, 35, 10, palettes.yellow[0]));
      e.push(star(160, 40, 8, palettes.yellow[0]));
  }

  return e;
}

// ============================================
// MAIN GENERATION
// ============================================
const sceneUsage = {};
const startTime = Date.now();

activities.forEach((activity, index) => {
  const rand = seededRandom(activity.id);
  const activityItems = extractItems(activity.items_required);
  const paletteIndex = (activity.id + Math.floor(rand() * 5)) % allPalettes.length;
  const palette = allPalettes[paletteIndex];
  const sceneName = determineScene(activity);

  sceneUsage[sceneName] = (sceneUsage[sceneName] || 0) + 1;

  const gradientAngle = [0, 45, 90, 135, 180][Math.floor(rand() * 5)];
  const sceneElements = generateScene(sceneName, rand, palette, activityItems, activity);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="200" height="150">
  <defs>
    <linearGradient id="bg${activity.id}" gradientTransform="rotate(${gradientAngle})">
      <stop offset="0%" style="stop-color:${palette[0]}"/>
      <stop offset="100%" style="stop-color:${palette[1]}"/>
    </linearGradient>
  </defs>
  <rect width="200" height="150" fill="url(#bg${activity.id})" rx="16"/>
  ${sceneElements.join('\n  ')}
</svg>`;

  fs.writeFileSync(path.join(outputDir, `${activity.id}.svg`), svg);

  if ((index + 1) % 500 === 0 || index === 0) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`   Generated ${index + 1}/${activities.length} (${elapsed}s)`);
  }
});

const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
console.log(`\n✅ COMPLETE! Generated ${activities.length} illustrations in ${totalTime}s`);
console.log(`\n📊 Scene distribution:`);
Object.entries(sceneUsage).sort((a, b) => b[1] - a[1]).forEach(([scene, count]) => {
  const pct = ((count / activities.length) * 100).toFixed(1);
  console.log(`   ${scene}: ${count} (${pct}%)`);
});

// Create index file for quick lookup
const index = {};
activities.forEach(a => {
  index[a.id] = `${a.id}.svg`;
});
fs.writeFileSync(path.join(outputDir, 'index.json'), JSON.stringify(index));
console.log(`\n📁 Saved to: ${outputDir}/`);
console.log(`   Index file: ${outputDir}/index.json`);
