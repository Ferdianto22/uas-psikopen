import { ForumPost } from "@/types/community";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface CommunityContextType {
  posts: ForumPost[];
  addPost: (content: string, category: ForumPost["category"]) => void;
  toggleLike: (postId: string) => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(
  undefined,
);

const initialPosts: ForumPost[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Sarah Green",
    userAvatar: "https://i.pravatar.cc/150?img=1",
    userLevel: 5,
    content:
      "Just completed my 30-day plastic-free challenge! 🌊 Feeling amazing and saved so much waste. Anyone else trying this?",
    likes: 24,
    comments: 8,
    isLiked: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    category: "achievement",
  },
  {
    id: "2",
    userId: "user2",
    userName: "Mike Eco",
    userAvatar: "https://i.pravatar.cc/150?img=2",
    userLevel: 3,
    content:
      "Quick tip: Use a reusable coffee cup and most cafes will give you a discount! ☕ Saved money and the planet.",
    likes: 42,
    comments: 12,
    isLiked: true,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    category: "tip",
  },
  {
    id: "3",
    userId: "user3",
    userName: "Emma Earth",
    userAvatar: "https://i.pravatar.cc/150?img=3",
    userLevel: 7,
    content:
      "Does anyone know good apps for tracking carbon footprint? Looking for recommendations! 🌍",
    likes: 15,
    comments: 20,
    isLiked: false,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    category: "question",
  },
];

export const CommunityProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);

  const addPost = (content: string, category: ForumPost["category"]) => {
    const newPost: ForumPost = {
      id: Date.now().toString(),
      userId: "currentUser",
      userName: "You",
      userAvatar: "https://i.pravatar.cc/150?img=10",
      userLevel: 4,
      content,
      likes: 0,
      comments: 0,
      isLiked: false,
      timestamp: new Date(),
      category,
    };
    setPosts([newPost, ...posts]);
  };

  const toggleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  };

  return (
    <CommunityContext.Provider value={{ posts, addPost, toggleLike }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error("useCommunity must be used within CommunityProvider");
  }
  return context;
};
