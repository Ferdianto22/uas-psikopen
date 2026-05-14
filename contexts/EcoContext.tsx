import { EcoTask, UserStats, WeeklyProgress } from "@/types/eco";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface EcoContextType {
  userStats: UserStats;
  tasks: EcoTask[];
  weeklyProgress: WeeklyProgress[];
  completeTask: (taskId: string) => void;
  resetDailyTasks: () => void;
}

const EcoContext = createContext<EcoContextType | undefined>(undefined);

const initialTasks: EcoTask[] = [
  {
    id: "1",
    title: "Recycle Paper & Cardboard",
    description: "Sort and recycle all paper products today",
    category: "recycling",
    points: 10,
    completed: false,
  },
  {
    id: "2",
    title: "Turn Off Unused Lights",
    description: "Check all rooms and turn off unnecessary lights",
    category: "energy",
    points: 5,
    completed: false,
  },
  {
    id: "3",
    title: "Use Reusable Water Bottle",
    description: "Avoid single-use plastic bottles today",
    category: "plastic",
    points: 8,
    completed: false,
  },
  {
    id: "4",
    title: "Walk or Bike Short Distances",
    description: "Choose eco-friendly transport for trips under 2km",
    category: "transportation",
    points: 15,
    completed: false,
  },
  {
    id: "5",
    title: "Unplug Devices Not in Use",
    description: "Reduce phantom energy consumption",
    category: "energy",
    points: 5,
    completed: false,
  },
  {
    id: "6",
    title: "Bring Reusable Bags",
    description: "Use cloth bags for shopping",
    category: "plastic",
    points: 8,
    completed: false,
  },
];

export const EcoProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<EcoTask[]>(initialTasks);
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 245,
    tasksCompleted: 28,
    co2Saved: 12.5,
    treesPlanted: 3,
  });

  const [weeklyProgress] = useState<WeeklyProgress[]>([
    { day: "Mon", points: 35 },
    { day: "Tue", points: 42 },
    { day: "Wed", points: 28 },
    { day: "Thu", points: 50 },
    { day: "Fri", points: 38 },
    { day: "Sat", points: 45 },
    { day: "Sun", points: 32 },
  ]);

  const completeTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );

    const task = tasks.find((t) => t.id === taskId);
    if (task && !task.completed) {
      setUserStats((prev) => ({
        ...prev,
        totalPoints: prev.totalPoints + task.points,
        tasksCompleted: prev.tasksCompleted + 1,
        co2Saved: prev.co2Saved + 0.5,
      }));
    } else if (task && task.completed) {
      setUserStats((prev) => ({
        ...prev,
        totalPoints: prev.totalPoints - task.points,
        tasksCompleted: prev.tasksCompleted - 1,
        co2Saved: prev.co2Saved - 0.5,
      }));
    }
  };

  const resetDailyTasks = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, completed: false })),
    );
  };

  return (
    <EcoContext.Provider
      value={{
        userStats,
        tasks,
        weeklyProgress,
        completeTask,
        resetDailyTasks,
      }}
    >
      {children}
    </EcoContext.Provider>
  );
};

export const useEco = () => {
  const context = useContext(EcoContext);
  if (!context) {
    throw new Error("useEco must be used within EcoProvider");
  }
  return context;
};
