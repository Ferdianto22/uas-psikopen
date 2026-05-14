// Community Forum Types
export interface ForumPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userLevel: number;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  timestamp: Date;
  category: "tip" | "question" | "achievement" | "discussion";
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
}
