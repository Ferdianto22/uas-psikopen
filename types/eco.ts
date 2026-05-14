// Types for EcoConnect app
export interface EcoTask {
  id: string;
  title: string;
  description: string;
  category: "recycling" | "energy" | "plastic" | "transportation";
  points: number;
  completed: boolean;
}

export interface UserStats {
  totalPoints: number;
  tasksCompleted: number;
  co2Saved: number;
  treesPlanted: number;
}

export interface WeeklyProgress {
  day: string;
  points: number;
}

export interface EcoTip {
  id: string;
  title: string;
  description: string;
  icon: string;
}
