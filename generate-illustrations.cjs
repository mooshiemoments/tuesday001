const fs = require('fs');
const path = require('path');

// Color palette matching Mooshie brand
const colors = {
  peach: ['#FFE5D9', '#FFCDB2', '#FFB4A2'],
  mint: ['#D8F3DC', '#B7E4C7', '#95D5B2'],
  lavender: ['#E2D9F3', '#C9B8E8', '#B298DC'],
  yellow: ['#FFF3B0', '#FFE566', '#FFD700'],
  blue: ['#D4E9FF', '#A8D0F0', '#7BB8E0'],
  coral: ['#FFD6D6', '#FFB3B3', '#FF9999'],
  teal: ['#D0F0F0', '#A0E0E0', '#70D0D0'],
};

// Simple shape library
const shapes = {
  circle: (cx, cy, r, fill) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`,
  ellipse: (cx, cy, rx, ry, fill) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"/>`,
  rect: (x, y, w, h, fill, rx = 8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"/>`,
  triangle: (points, fill) => `<polygon points="${points}" fill="${fill}"/>`,
  star: (cx, cy, r, fill) => {
    const points = [];
    for (let i = 0; i < 10; i++) {
      const radius = i % 2 === 0 ? r : r * 0.5;
      const angle = (i * 36 - 90) * Math.PI / 180;
      points.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`);
    }
    return `<polygon points="${points.join(' ')}" fill="${fill}"/>`;
  },
  heart: (cx, cy, size, fill) => `<path d="M${cx},${cy + size * 0.3} C${cx - size},${cy - size * 0.5} ${cx - size * 0.5},${cy - size} ${cx},${cy - size * 0.3} C${cx + size * 0.5},${cy - size} ${cx + size},${cy - size * 0.5} ${cx},${cy + size * 0.3}Z" fill="${fill}"/>`,
  drop: (cx, cy, size, fill) => `<path d="M${cx},${cy - size} Q${cx + size * 0.8},${cy} ${cx},${cy + size * 0.5} Q${cx - size * 0.8},${cy} ${cx},${cy - size}Z" fill="${fill}"/>`,
};

// Generate illustration based on keywords
function generateIllustration(activity) {
  const title = activity.title.toLowerCase();
  const visual = activity.visual_description.toLowerCase();
  const width = 200;
  const height = 150;

  let elements = [];
  let bgGradient = '';

  // Background gradient based on topic
  const topicColors = {
    'science': colors.blue,
    'sensory': colors.peach,
    'motor': colors.mint,
    'music': colors.lavender,
    'creative': colors.coral,
    'diy': colors.teal,
    'language': colors.yellow,
    'math': colors.blue,
    'social': colors.peach,
    'default': colors.mint
  };

  let palette = topicColors.default;
  for (const [key, cols] of Object.entries(topicColors)) {
    if (activity.topic.toLowerCase().includes(key)) {
      palette = cols;
      break;
    }
  }

  bgGradient = `
    <defs>
      <linearGradient id="bg${activity.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${palette[0]}"/>
        <stop offset="100%" style="stop-color:${palette[1]}"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg${activity.id})" rx="16"/>
  `;

  // Generate shapes based on visual description
  if (visual.includes('water') || visual.includes('float') || visual.includes('sink')) {
    // Water scene
    elements.push(`<ellipse cx="100" cy="110" rx="60" ry="20" fill="${colors.blue[1]}"/>`);
    elements.push(`<path d="M40 90 Q40 120 100 125 Q160 120 160 90" fill="${colors.blue[2]}" stroke="${colors.blue[2]}" stroke-width="2"/>`);
    elements.push(shapes.circle(70, 85, 12, colors.yellow[1])); // floating ball
    elements.push(shapes.rect(110, 95, 15, 15, '#888', 2)); // sinking cube
    elements.push(shapes.circle(55, 70, 4, colors.blue[1]));
    elements.push(shapes.circle(130, 65, 3, colors.blue[1]));
  }
  else if (visual.includes('crown') || visual.includes('craft')) {
    // Crown crafting
    elements.push(shapes.rect(60, 70, 80, 50, colors.yellow[1], 4));
    elements.push(`<polygon points="60,70 80,40 100,70 120,40 140,70" fill="${colors.yellow[0]}"/>`);
    elements.push(shapes.circle(80, 55, 5, colors.coral[1]));
    elements.push(shapes.circle(120, 55, 5, colors.lavender[1]));
    elements.push(shapes.circle(100, 45, 5, colors.mint[1]));
  }
  else if (visual.includes('mirror')) {
    // Mirror
    elements.push(shapes.ellipse(100, 80, 40, 50, '#E8E8E8'));
    elements.push(shapes.ellipse(100, 80, 35, 45, colors.blue[0]));
    elements.push(shapes.ellipse(90, 70, 8, 10, 'white'));
    elements.push(shapes.rect(90, 125, 20, 15, '#C9B8E8', 4));
  }
  else if (visual.includes('brush') || visual.includes('basket')) {
    // Brushes in basket
    elements.push(shapes.ellipse(100, 100, 50, 25, '#D4A574'));
    elements.push(shapes.rect(50, 70, 100, 35, '#E8C49A', 8));
    elements.push(shapes.rect(65, 40, 8, 45, colors.coral[1], 2));
    elements.push(shapes.rect(85, 45, 8, 40, colors.mint[1], 2));
    elements.push(shapes.rect(105, 35, 8, 50, colors.lavender[1], 2));
    elements.push(shapes.rect(125, 50, 8, 35, colors.yellow[1], 2));
  }
  else if (visual.includes('butterfly')) {
    // Butterfly
    elements.push(shapes.ellipse(100, 80, 8, 25, '#6B5B4F'));
    elements.push(shapes.ellipse(70, 65, 25, 20, colors.lavender[1]));
    elements.push(shapes.ellipse(130, 65, 25, 20, colors.lavender[1]));
    elements.push(shapes.ellipse(75, 95, 20, 15, colors.coral[1]));
    elements.push(shapes.ellipse(125, 95, 20, 15, colors.coral[1]));
    elements.push(shapes.circle(70, 65, 5, colors.lavender[2]));
    elements.push(shapes.circle(130, 65, 5, colors.lavender[2]));
    elements.push(`<path d="M95 50 Q90 35 85 40" stroke="#6B5B4F" stroke-width="2" fill="none"/>`);
    elements.push(`<path d="M105 50 Q110 35 115 40" stroke="#6B5B4F" stroke-width="2" fill="none"/>`);
  }
  else if (visual.includes('paint') || visual.includes('color')) {
    // Paint pots
    elements.push(shapes.rect(40, 70, 30, 40, colors.coral[1], 4));
    elements.push(shapes.rect(85, 60, 30, 50, colors.blue[1], 4));
    elements.push(shapes.rect(130, 75, 30, 35, colors.yellow[1], 4));
    elements.push(shapes.circle(55, 55, 12, colors.coral[2]));
    elements.push(shapes.circle(100, 45, 12, colors.blue[2]));
    elements.push(shapes.circle(145, 60, 12, colors.yellow[2]));
    // Splashes
    elements.push(shapes.circle(70, 50, 5, colors.coral[0]));
    elements.push(shapes.circle(120, 40, 4, colors.blue[0]));
  }
  else if (visual.includes('cushion') || visual.includes('movement')) {
    // Cushions for climbing
    elements.push(shapes.rect(30, 90, 50, 30, colors.coral[1], 8));
    elements.push(shapes.rect(70, 70, 50, 30, colors.mint[1], 8));
    elements.push(shapes.rect(110, 50, 50, 30, colors.lavender[1], 8));
    // Motion lines
    elements.push(`<path d="M90 45 Q95 35 100 45" stroke="${colors.yellow[1]}" stroke-width="3" fill="none"/>`);
    elements.push(`<path d="M100 40 Q105 30 110 40" stroke="${colors.yellow[1]}" stroke-width="3" fill="none"/>`);
  }
  else if (visual.includes('bicycle') || visual.includes('leg')) {
    // Legs doing bicycle motion
    elements.push(shapes.circle(100, 75, 35, palette[0]));
    elements.push(`<path d="M80 75 L60 100" stroke="${palette[2]}" stroke-width="8" stroke-linecap="round"/>`);
    elements.push(`<path d="M120 75 L140 55" stroke="${palette[2]}" stroke-width="8" stroke-linecap="round"/>`);
    elements.push(`<path d="M60 100 L45 95" stroke="${palette[2]}" stroke-width="6" stroke-linecap="round"/>`);
    elements.push(`<path d="M140 55 L155 60" stroke="${palette[2]}" stroke-width="6" stroke-linecap="round"/>`);
    // Motion curves
    elements.push(`<path d="M35 80 Q45 70 35 60" stroke="${colors.yellow[1]}" stroke-width="2" fill="none"/>`);
    elements.push(`<path d="M165 80 Q155 70 165 60" stroke="${colors.yellow[1]}" stroke-width="2" fill="none"/>`);
  }
  else if (visual.includes('texture') || visual.includes('touch')) {
    // Different textures
    elements.push(shapes.rect(25, 60, 45, 60, colors.coral[1], 4));
    elements.push(shapes.rect(78, 60, 45, 60, colors.mint[1], 4));
    elements.push(shapes.rect(131, 60, 45, 60, colors.lavender[1], 4));
    // Texture patterns
    for (let i = 0; i < 4; i++) {
      elements.push(shapes.circle(35 + i * 10, 80 + (i % 2) * 15, 4, colors.coral[2]));
    }
    for (let i = 0; i < 3; i++) {
      elements.push(`<line x1="85" y1="${70 + i * 15}" x2="115" y2="${70 + i * 15}" stroke="${colors.mint[2]}" stroke-width="3"/>`);
    }
    for (let i = 0; i < 4; i++) {
      elements.push(`<rect x="${138 + (i % 2) * 18}" y="${68 + Math.floor(i / 2) * 22}" width="12" height="12" fill="${colors.lavender[2]}" rx="2"/>`);
    }
  }
  else if (visual.includes('turtle') || visual.includes('rabbit') || visual.includes('speed')) {
    // Slow and fast
    elements.push(shapes.ellipse(60, 90, 25, 15, colors.mint[1])); // turtle shell
    elements.push(shapes.circle(45, 85, 8, colors.mint[2])); // turtle head
    elements.push(shapes.ellipse(140, 80, 20, 25, colors.coral[1])); // rabbit body
    elements.push(shapes.ellipse(140, 55, 8, 15, colors.coral[1])); // rabbit head
    elements.push(shapes.ellipse(135, 40, 3, 10, colors.coral[2])); // ear
    elements.push(shapes.ellipse(145, 40, 3, 10, colors.coral[2])); // ear
    // Speed lines behind rabbit
    elements.push(`<line x1="160" y1="70" x2="180" y2="70" stroke="${colors.yellow[1]}" stroke-width="2"/>`);
    elements.push(`<line x1="165" y1="80" x2="185" y2="80" stroke="${colors.yellow[1]}" stroke-width="2"/>`);
    elements.push(`<line x1="160" y1="90" x2="180" y2="90" stroke="${colors.yellow[1]}" stroke-width="2"/>`);
  }
  else if (visual.includes('match') || visual.includes('same') || visual.includes('different')) {
    // Matching objects
    elements.push(shapes.circle(50, 70, 20, colors.coral[1]));
    elements.push(shapes.circle(100, 70, 20, colors.coral[1]));
    elements.push(shapes.rect(135, 55, 30, 30, colors.blue[1], 4));
    // Check mark on matching
    elements.push(`<path d="M40 70 L48 78 L62 60" stroke="white" stroke-width="4" fill="none" stroke-linecap="round"/>`);
    elements.push(`<path d="M90 70 L98 78 L112 60" stroke="white" stroke-width="4" fill="none" stroke-linecap="round"/>`);
    // X on different
    elements.push(`<path d="M140 60 L160 80 M160 60 L140 80" stroke="white" stroke-width="4" stroke-linecap="round"/>`);
  }
  else if (visual.includes('book') || visual.includes('story') || visual.includes('read')) {
    // Open book
    elements.push(shapes.rect(40, 50, 60, 70, 'white', 4));
    elements.push(shapes.rect(100, 50, 60, 70, '#FFF8F0', 4));
    elements.push(`<line x1="100" y1="50" x2="100" y2="120" stroke="${palette[2]}" stroke-width="3"/>`);
    // Text lines
    for (let i = 0; i < 4; i++) {
      elements.push(`<line x1="50" y1="${65 + i * 12}" x2="90" y2="${65 + i * 12}" stroke="#DDD" stroke-width="2"/>`);
      elements.push(`<line x1="110" y1="${65 + i * 12}" x2="150" y2="${65 + i * 12}" stroke="#DDD" stroke-width="2"/>`);
    }
    // Stars decoration
    elements.push(shapes.star(75, 55, 8, colors.yellow[1]));
    elements.push(shapes.star(135, 55, 8, colors.yellow[1]));
  }
  else if (visual.includes('music') || visual.includes('note') || visual.includes('rhythm')) {
    // Musical notes
    elements.push(shapes.ellipse(60, 90, 15, 10, palette[2]));
    elements.push(`<line x1="75" y1="90" x2="75" y2="45" stroke="${palette[2]}" stroke-width="4"/>`);
    elements.push(shapes.ellipse(110, 80, 15, 10, palette[2]));
    elements.push(`<line x1="125" y1="80" x2="125" y2="35" stroke="${palette[2]}" stroke-width="4"/>`);
    elements.push(shapes.ellipse(150, 95, 12, 8, palette[2]));
    elements.push(`<line x1="162" y1="95" x2="162" y2="55" stroke="${palette[2]}" stroke-width="3"/>`);
    // Sound waves
    elements.push(`<path d="M30 70 Q35 60 30 50" stroke="${colors.yellow[1]}" stroke-width="2" fill="none"/>`);
    elements.push(`<path d="M25 75 Q32 60 25 45" stroke="${colors.yellow[1]}" stroke-width="2" fill="none"/>`);
  }
  else if (visual.includes('bubble')) {
    // Bubbles
    elements.push(shapes.circle(60, 80, 25, colors.blue[0]));
    elements.push(shapes.circle(100, 60, 30, colors.lavender[0]));
    elements.push(shapes.circle(140, 85, 20, colors.coral[0]));
    elements.push(shapes.circle(80, 100, 15, colors.mint[0]));
    // Highlights
    elements.push(shapes.circle(55, 70, 5, 'white'));
    elements.push(shapes.circle(92, 50, 6, 'white'));
    elements.push(shapes.circle(135, 77, 4, 'white'));
  }
  else if (visual.includes('block') || visual.includes('stack') || visual.includes('tower')) {
    // Stacked blocks
    elements.push(shapes.rect(70, 90, 60, 25, colors.coral[1], 4));
    elements.push(shapes.rect(80, 65, 40, 25, colors.mint[1], 4));
    elements.push(shapes.rect(85, 40, 30, 25, colors.lavender[1], 4));
    elements.push(shapes.rect(90, 20, 20, 20, colors.yellow[1], 4));
    // Stars for success
    elements.push(shapes.star(145, 50, 10, colors.yellow[0]));
    elements.push(shapes.star(50, 70, 8, colors.yellow[0]));
  }
  else if (visual.includes('ball') || visual.includes('bounce')) {
    // Bouncing ball
    elements.push(shapes.circle(100, 70, 35, colors.coral[1]));
    elements.push(shapes.circle(90, 55, 10, 'white'));
    // Bounce lines
    elements.push(`<path d="M100 110 L100 130" stroke="${palette[2]}" stroke-width="2" stroke-dasharray="4,4"/>`);
    elements.push(`<path d="M70 120 L130 120" stroke="${palette[2]}" stroke-width="2"/>`);
    elements.push(`<path d="M85 125 L115 125" stroke="${palette[2]}" stroke-width="2"/>`);
  }
  else if (visual.includes('sand')) {
    // Sand play
    elements.push(shapes.rect(0, 100, 200, 50, colors.yellow[1], 0));
    elements.push(`<polygon points="80,60 60,110 100,110" fill="${colors.coral[1]}"/>`); // bucket
    elements.push(shapes.rect(70, 55, 20, 10, colors.coral[2], 2));
    elements.push(`<path d="M130 110 L150 80 L170 110" fill="${colors.mint[1]}" stroke="${colors.mint[2]}" stroke-width="2"/>`); // shovel
    elements.push(shapes.rect(147, 65, 6, 20, '#8B7355', 2));
    // Sand mound
    elements.push(shapes.ellipse(50, 105, 25, 12, colors.yellow[2]));
  }
  else if (visual.includes('sleep') || visual.includes('bed') || visual.includes('moon')) {
    // Bedtime scene
    elements.push(shapes.rect(50, 70, 100, 50, colors.lavender[1], 8));
    elements.push(shapes.rect(60, 60, 80, 20, 'white', 4)); // pillow
    elements.push(`<path d="M130 30 A25 25 0 1 1 155 55 A20 20 0 1 0 130 30" fill="${colors.yellow[1]}"/>`); // moon
    elements.push(shapes.star(60, 35, 6, colors.yellow[0]));
    elements.push(shapes.star(90, 25, 5, colors.yellow[0]));
    elements.push(shapes.star(45, 50, 4, colors.yellow[0]));
  }
  else if (visual.includes('garden') || visual.includes('plant') || visual.includes('seed')) {
    // Plant in pot
    elements.push(shapes.rect(70, 85, 60, 40, colors.coral[1], 8));
    elements.push(shapes.ellipse(100, 90, 35, 12, '#8B5A2B'));
    elements.push(`<path d="M100 85 L100 50" stroke="${colors.mint[2]}" stroke-width="4"/>`);
    elements.push(shapes.ellipse(85, 45, 15, 20, colors.mint[1]));
    elements.push(shapes.ellipse(115, 45, 15, 20, colors.mint[1]));
    elements.push(shapes.ellipse(100, 35, 12, 18, colors.mint[1]));
    // Water drops
    elements.push(shapes.drop(150, 60, 10, colors.blue[1]));
    elements.push(shapes.drop(160, 75, 8, colors.blue[1]));
  }
  else {
    // Default: playful abstract shapes
    elements.push(shapes.circle(60, 70, 25, palette[1]));
    elements.push(shapes.rect(100, 55, 40, 40, palette[2], 8));
    elements.push(`<polygon points="160,95 140,55 180,55" fill="${colors.yellow[1]}"/>`);
    elements.push(shapes.star(100, 35, 12, colors.yellow[0]));
    elements.push(shapes.circle(50, 110, 10, colors.coral[0]));
    elements.push(shapes.circle(150, 110, 10, colors.mint[0]));
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  ${bgGradient}
  ${elements.join('\n  ')}
</svg>`;

  return svg;
}

// Load prompts and generate illustrations
const activities = JSON.parse(fs.readFileSync('illustration-prompts-enhanced.json', 'utf8'));
const outputDir = 'public/illustrations';

console.log(`Generating ${activities.length} illustrations...`);

activities.forEach((activity, index) => {
  const svg = generateIllustration(activity);
  const filename = `${activity.id}.svg`;
  fs.writeFileSync(path.join(outputDir, filename), svg);

  if ((index + 1) % 10 === 0) {
    console.log(`Generated ${index + 1}/${activities.length}`);
  }
});

// Create an index HTML to preview all illustrations
const previewHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Mooshie Illustrations Preview</title>
  <style>
    body { font-family: -apple-system, sans-serif; padding: 20px; background: #f5f5f5; }
    h1 { text-align: center; color: #333; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
    .card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .card img { width: 100%; height: 150px; object-fit: cover; }
    .card-content { padding: 12px; }
    .card-title { font-weight: bold; font-size: 14px; color: #333; margin-bottom: 4px; }
    .card-topic { font-size: 11px; color: #666; text-transform: uppercase; }
    .card-age { font-size: 11px; color: #999; }
  </style>
</head>
<body>
  <h1>🎨 Mooshie Activity Illustrations (${activities.length} samples)</h1>
  <div class="grid">
    ${activities.map(a => `
    <div class="card">
      <img src="illustrations/${a.id}.svg" alt="${a.title}">
      <div class="card-content">
        <div class="card-title">${a.title}</div>
        <div class="card-topic">${a.topic}</div>
        <div class="card-age">${a.age_band}</div>
      </div>
    </div>
    `).join('')}
  </div>
</body>
</html>`;

fs.writeFileSync('public/illustrations-preview.html', previewHtml);
console.log(`\n✅ Done! Generated ${activities.length} illustrations`);
console.log('Preview at: public/illustrations-preview.html');
