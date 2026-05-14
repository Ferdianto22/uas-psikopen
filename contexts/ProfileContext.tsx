import { Achievement, UserProfile } from "@/types/profile";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

interface ProfileContextType {
  profile: UserProfile;
  achievements: Achievement[];
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const initialAchievements: Achievement[] = [
  {
    id: "first-task",
    title: "First Steps",
    description: "Complete your first eco task",
    icon: "flag-checkered",
    category: "social",
    points: 10,
    unlocked: true,
    unlockedDate: new Date("2024-01-15"),
  },
  {
    id: "week-streak",
    title: "Week Warrior",
    description: "Complete tasks for 7 days in a row",
    icon: "fire",
    category: "social",
    points: 50,
    unlocked: true,
    unlockedDate: new Date("2024-01-22"),
  },
  {
    id: "recycling-hero",
    title: "Recycling Hero",
    description: "Complete 20 recycling tasks",
    icon: "recycle",
    category: "recycling",
    points: 100,
    unlocked: true,
    unlockedDate: new Date("2024-02-01"),
    progress: 20,
    maxProgress: 20,
  },
  {
    id: "energy-saver",
    title: "Energy Saver",
    description: "Save 50kg of CO₂ through energy tasks",
    icon: "lightning-bolt",
    category: "energy",
    points: 150,
    unlocked: false,
    progress: 32,
    maxProgress: 50,
  },
  {
    id: "plastic-free",
    title: "Plastic Free Champion",
    description: "Avoid single-use plastic for 30 days",
    icon: "bottle-soda-off",
    category: "plastic",
    points: 200,
    unlocked: false,
    progress: 18,
    maxProgress: 30,
  },
  {
    id: "eco-commuter",
    title: "Eco Commuter",
    description: "Use eco-friendly transport 50 times",
    icon: "bike",
    category: "transportation",
    points: 150,
    unlocked: false,
    progress: 28,
    maxProgress: 50,
  },
];

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  // Create profile from authenticated user data
  const createProfileFromUser = (): UserProfile => {
    if (user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        level: 4,
        currentPoints: 245,
        pointsToNextLevel: 255,
        totalPoints: 1245,
        joinDate: new Date(),
        bio: "Passionate about sustainability and making a positive impact on our planet 🌍",
        badges: ["first-task", "week-streak", "recycling-hero"],
        weeklyActivity: [
          { day: "Mon", tasksCompleted: 5, pointsEarned: 35 },
          { day: "Tue", tasksCompleted: 6, pointsEarned: 42 },
          { day: "Wed", tasksCompleted: 4, pointsEarned: 28 },
          { day: "Thu", tasksCompleted: 7, pointsEarned: 50 },
          { day: "Fri", tasksCompleted: 5, pointsEarned: 38 },
          { day: "Sat", tasksCompleted: 6, pointsEarned: 45 },
          { day: "Sun", tasksCompleted: 4, pointsEarned: 32 },
        ],
      };
    }

    // Default profile if no user is logged in
    return {
      id: "guest",
      name: "Guest User",
      email: "guest@ecoconnect.com",
      avatar: "https://i.pravatar.cc/150?img=10",
      level: 1,
      currentPoints: 0,
      pointsToNextLevel: 100,
      totalPoints: 0,
      joinDate: new Date(),
      bio: "New to EcoConnect",
      badges: [],
      weeklyActivity: [],
    };
  };

  const [profile, setProfile] = useState<UserProfile>(createProfileFromUser());
  const [achievements] = useState<Achievement[]>(initialAchievements);

  // Update profile when user changes (login/logout)
  useEffect(() => {
    setProfile(createProfileFromUser());
  }, [user]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  return (
    <ProfileContext.Provider value={{ profile, achievements, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
};
