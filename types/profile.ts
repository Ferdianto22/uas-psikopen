// User Profile Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  currentPoints: number;
  pointsToNextLevel: number;
  totalPoints: number;
  joinDate: Date;
  bio: string;
  badges: string[];
  weeklyActivity: WeeklyActivity[];
}

export interface WeeklyActivity {
  day: string;
  tasksCompleted: number;
  pointsEarned: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "recycling" | "energy" | "plastic" | "transportation" | "social";
  points: number;
  unlocked: boolean;
  unlockedDate?: Date;
  progress?: number;
  maxProgress?: number;
}
