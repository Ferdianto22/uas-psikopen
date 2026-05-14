# 🌍 EcoConnect - Sustainable Living Mobile App

A premium React Native Expo mobile application designed to encourage and track eco-friendly habits through gamification, community engagement, and personal achievement tracking.

## 🎯 Project Overview

EcoConnect is a comprehensive sustainability app built for a university final project. It combines modern mobile UI/UX with engaging features to help users adopt and maintain environmentally friendly habits.

## ✨ Features

### 🏠 Home Screen

- **Personalized Greeting**: Welcome message for users
- **Environmental Statistics**: Real-time tracking of:
  - Total eco points earned
  - Tasks completed
  - CO₂ saved (kg)
  - Trees planted equivalent
- **Daily Check-in**: Quick access to daily eco tasks
- **Weekly Progress Chart**: Visual bar chart showing daily performance
- **Eco Tips**: Daily environmental tips and advice

### ✅ Daily Eco Tasks

- **Categorized Tasks**:
  - ♻️ Recycling
  - ⚡ Energy Saving
  - 🌊 Plastic Reduction
  - 🚴 Eco Transportation
- **Interactive Checkboxes**: Mark tasks as complete
- **Points System**: Earn 5-15 points per task
- **Animated Progress Bar**: Visual completion tracking
- **Smooth Animations**: Engaging task completion feedback

### 👥 Community Forum

- **Social Feed**: Share eco achievements and tips
- **Post Categories**:
  - 💡 Tips
  - ❓ Questions
  - 🏆 Achievements
  - 💬 Discussions
- **User Interactions**:
  - Like posts
  - Comment on posts
  - User avatars and levels
- **Create Posts**: Floating action button for new posts
- **Modern Social UI**: Clean, Instagram-style layout

### 👤 User Profile

- **Profile Card**: Beautiful gradient header with avatar
- **Level System**: Progressive leveling (1-20+)
- **Progress Tracking**: Points to next level
- **Weekly Activity Chart**: Visual task completion history
- **Achievement Badges**: Display unlocked achievements
- **Editable Profile**: Update name and bio
- **Statistics Dashboard**:
  - Total points
  - Badges earned
  - Days active

### 🏆 Eco Rewards & Badges

- **Achievement System**:
  - First Steps (10 pts)
  - Week Warrior (50 pts)
  - Recycling Hero (100 pts)
  - Energy Saver (150 pts)
  - Plastic Free Champion (200 pts)
  - Eco Commuter (150 pts)
- **Level Tiers**:
  - 🌱 Eco Beginner (Level 1)
  - 🍃 Eco Enthusiast (Level 5)
  - 🛡️ Eco Warrior (Level 10)
  - 🏆 Eco Champion (Level 15)
  - 👑 Eco Legend (Level 20)
- **Progress Tracking**: Visual progress bars for locked achievements
- **Animated Badges**: Smooth unlock animations
- **Gamification**: Encouraging eco-friendly behavior through rewards

## 🎨 Design System

### Color Palette

- **Primary Green**: `#4CAF50` - Main eco theme
- **Secondary Blue**: `#2196F3` - Accent color
- **Teal**: `#00BCD4` - Highlights
- **Warning**: `#FFC107` - Energy/alerts
- **Success**: `#4CAF50` - Achievements

### UI Components

- **Cards**: Elevated, rounded corners
- **Gradients**: Green-to-blue eco theme
- **Icons**: Material Community Icons
- **Typography**: React Native Paper variants
- **Animations**: React Native Reanimated

## 🛠️ Technical Stack

### Core Technologies

- **React Native**: 0.81.5
- **Expo**: ~54.0.33
- **TypeScript**: ~5.9.2
- **Expo Router**: ~6.0.23 (File-based navigation)

### UI Libraries

- **React Native Paper**: 5.15.2 (Material Design)
- **React Native Reanimated**: 4.1.1 (Animations)
- **React Native Chart Kit**: 6.12.2 (Data visualization)
- **Expo Linear Gradient**: Latest (Gradient backgrounds)

### State Management

- **React Context API**: Global state management
  - `EcoContext`: Tasks and statistics
  - `CommunityContext`: Forum posts
  - `ProfileContext`: User profile and achievements

### Navigation

- **Expo Router**: File-based routing
- **Bottom Tabs**: 4 main screens
- **Stack Navigation**: Modal screens

## 📁 Project Structure

```
ecoconnect/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Home Screen
│   │   ├── community.tsx      # Community Forum
│   │   ├── profile.tsx        # User Profile
│   │   └── rewards.tsx        # Rewards & Badges
│   ├── tasks.tsx              # Daily Tasks Screen
│   └── _layout.tsx            # Root Layout
├── components/
│   ├── eco/
│   │   ├── StatCard.tsx       # Statistics display
│   │   ├── WeeklyChart.tsx    # Bar chart
│   │   ├── EcoTipCard.tsx     # Tip display
│   │   ├── ProgressBar.tsx    # Animated progress
│   │   └── TaskItem.tsx       # Task card
│   ├── community/
│   │   └── PostCard.tsx       # Forum post card
│   └── profile/
│       ├── ProfileHeader.tsx  # Profile card
│       ├── WeeklyActivityChart.tsx
│       └── AchievementBadge.tsx
├── contexts/
│   ├── EcoContext.tsx         # Tasks & stats state
│   ├── CommunityContext.tsx   # Forum state
│   └── ProfileContext.tsx     # Profile & achievements
├── types/
│   ├── eco.ts                 # Task types
│   ├── community.ts           # Forum types
│   └── profile.ts             # Profile types
└── constants/
    └── theme.ts               # Theme configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd ecoconnect
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm start
# or
expo start
```

4. **Run on device/simulator**

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on physical device

## 📱 App Navigation

### Bottom Tabs

1. **Home** 🏠 - Dashboard and statistics
2. **Community** 👥 - Social forum
3. **Rewards** 🏆 - Achievements and levels
4. **Profile** 👤 - User profile and activity

### Additional Screens

- **Daily Tasks** - Accessible from Home screen "View Tasks" button

## 🎓 University Project Features

### Presentation-Ready Elements

- ✅ Modern, premium UI design
- ✅ Smooth animations and transitions
- ✅ Complete feature set
- ✅ Clean code architecture
- ✅ TypeScript for type safety
- ✅ Responsive mobile layout
- ✅ Professional color scheme
- ✅ Gamification elements
- ✅ Social features
- ✅ Data visualization

### Key Highlights for Presentation

1. **Gamification**: Points, levels, and achievements
2. **Social Engagement**: Community forum with interactions
3. **Data Visualization**: Charts and progress tracking
4. **User Experience**: Smooth animations and intuitive UI
5. **Sustainability Focus**: Environmental impact tracking
6. **Modern Tech Stack**: Latest React Native and Expo

## 🔧 Customization

### Adding New Tasks

Edit `contexts/EcoContext.tsx` and add to `initialTasks` array:

```typescript
{
  id: 'unique-id',
  title: 'Task Title',
  description: 'Task description',
  category: 'recycling', // or 'energy', 'plastic', 'transportation'
  points: 10,
  completed: false,
}
```

### Adding New Achievements

Edit `contexts/ProfileContext.tsx` and add to `initialAchievements` array:

```typescript
{
  id: 'unique-id',
  title: 'Achievement Title',
  description: 'Achievement description',
  icon: 'icon-name', // Material Community Icons
  category: 'recycling',
  points: 100,
  unlocked: false,
  progress: 0,
  maxProgress: 50,
}
```

### Customizing Theme

Edit `constants/theme.ts` to change colors and styling.

## 📊 Data Flow

1. **Context Providers** wrap the entire app in `_layout.tsx`
2. **Screens** consume context using custom hooks:
   - `useEco()` - Tasks and statistics
   - `useCommunity()` - Forum posts
   - `useProfile()` - User profile and achievements
3. **Components** receive data via props from screens
4. **State updates** trigger re-renders across the app

## 🎯 Future Enhancements

- [ ] Backend integration (Firebase/Supabase)
- [ ] Real-time notifications
- [ ] Photo uploads for posts
- [ ] Friend system
- [ ] Leaderboards
- [ ] Carbon footprint calculator
- [ ] Integration with fitness apps
- [ ] Push notifications for daily reminders
- [ ] Dark mode support
- [ ] Multi-language support

## 📝 License

This project is created for educational purposes as a university final project.

## 👨‍💻 Author

Created with 💚 for a sustainable future

---

**EcoConnect** - Making sustainability social, fun, and rewarding! 🌍✨
