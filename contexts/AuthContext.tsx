import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock validation
      if (email && password.length >= 6) {
        const userData: User = {
          id: "1",
          name: email.split("@")[0],
          email: email,
          avatar: "https://i.pravatar.cc/150?img=10",
        };

        setUser(userData);
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock validation
      if (name && email && password.length >= 6) {
        const userData: User = {
          id: Date.now().toString(),
          name: name,
          email: email,
          avatar: "https://i.pravatar.cc/150?img=10",
        };

        setUser(userData);
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      console.log("Logging out user...");
      // Clear AsyncStorage first
      await AsyncStorage.removeItem("user");
      // Then clear state
      setUser(null);
      console.log("Logout successful - user cleared");
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear user even if AsyncStorage fails
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
