# Mooshie Moments 🦉

> Turn your junk drawer into a playground - expert-backed activities for toddlers using household items.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-4.4-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-06B6D4?logo=tailwindcss)

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/mooshie-moments.git
cd mooshie-moments

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📁 Project Structure

```
src/
├── App.jsx                         # Router only (435 lines, 93% reduction!)
├── constants/
│   └── index.js                    # All constants, colors, defaults
├── hooks/
│   └── useActivities.js            # Activity loading & smart selection
└── components/
    ├── common/
    │   └── index.jsx               # TabNav, Confetti, MascotImage, Badge, Card, Button
    ├── onboarding/
    │   ├── Welcome.jsx             # Welcome carousel
    │   ├── ProfileSetup.jsx        # Name & birthday entry
    │   ├── NotificationSetup.jsx   # Spark schedule setup
    │   └── index.js
    ├── screens/
    │   ├── HomeScreen.jsx          # Daily mix, hero activities
    │   ├── DiscoverScreen.jsx      # Browse by category
    │   ├── ActivityDetail.jsx      # Full activity view
    │   ├── ProfileScreen.jsx       # User profile & settings
    │   ├── MemoriesScreen.jsx      # Timeline & memories
    │   ├── MissionScreen.jsx       # Share mission, unlock packs
    │   ├── MooshieLabsScreen.jsx   # Community ideas
    │   ├── TopicBrowseScreen.jsx   # Browse by topic
    │   ├── NotificationSettings.jsx # Edit schedule
    │   └── index.js
    └── modals/
        ├── Paywall.jsx             # Premium upgrade
        ├── FeedbackModal.jsx       # Activity feedback
        ├── MemoryModal.jsx         # Save memory
        ├── MilestoneModal.jsx      # Celebrate milestones
        ├── ShareModal.jsx          # Share options
        ├── ResetConfirmModal.jsx   # Confirm data reset
        ├── AgeProgressionModal.jsx # Age band update
        ├── EinsteinShareCard.jsx   # Progress report card
        ├── GoldenTicketUnlockModal.jsx  # Premium unlock
        ├── GoldenTicketShareModal.jsx   # Share golden ticket
        └── index.js
```

## 📊 Metrics

| Metric | Before | After |
|--------|--------|-------|
| **App.jsx lines** | 6,004 | 435 |
| **Reduction** | - | 93% |
| **Total files** | 1 | 29 |
| **Total lines** | 6,004 | 6,724 |

## 🔧 Integration Steps

### 1. Replace your `src/` folder
Copy the entire `src/` folder from this package to replace your existing one.

### 2. Install dependencies (if not already installed)
```bash
npm install lucide-react
```

### 3. Make sure your `activities.json` is accessible
The app expects to load activities from a JSON file. Update the path in `hooks/useActivities.js` if needed.

### 4. Test the app
```bash
npm start
```

## 🏗️ Architecture

### State Management
All global state is managed in `App.jsx`:
- Profile, activities, memories, stats
- Modal visibility states
- Navigation state (screen, activeTab)

### Props Drilling Pattern
```
App.jsx (state) → Screen Component → Child Components
```

### Key Data Flow
1. **Loading**: App loads activities from JSON, then user data from storage
2. **Routing**: `screen` state determines which component renders
3. **Completion Flow**: Activity → Confetti → Feedback → Memory → Milestone

### Storage Keys
- `STORAGE_KEY`: User data (profile, activities, memories, stats)
- `COMMUNITY_KEY`: Shared community ideas
- `MISSION_KEY`: Mission progress

## 📝 Notes

### Import Patterns
From any screen/modal component:
```javascript
import { COLORS, MASCOTS, etc } from '../../constants';
```

From App.jsx:
```javascript
import { COLORS, etc } from './constants';
import HomeScreen from './components/screens/HomeScreen';
```

### Component Props
Each screen receives only the props it needs. Check the component file for the full props interface.

### Adding New Screens
1. Create the component in `components/screens/`
2. Add to `screens/index.js`
3. Import in `App.jsx`
4. Add routing case in the render switch

## 🎉 You're Done!

Your 6,000+ line file is now a clean, maintainable 29-file structure. Each component is self-contained and easy to modify.

Questions? The code is well-commented and follows consistent patterns throughout.
