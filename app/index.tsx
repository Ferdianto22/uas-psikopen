import { EcoTheme } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function WelcomeScreen() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    console.log(
      "Welcome screen - isAuthenticated:",
      isAuthenticated,
      "user:",
      user,
    );
    if (isAuthenticated && user) {
      console.log("User authenticated, redirecting to tabs...");
      router.replace("/(tabs)");
    } else {
      console.log("User not authenticated, staying on welcome screen");
    }
  }, [isAuthenticated, user]);

  return (
    <View style={styles.container}>
      {/* Animated Background Circles */}
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />

      {/* Logo */}
      <Animated.View
        entering={FadeInDown.delay(200)}
        style={styles.logoContainer}
      >
        <View style={styles.logoCircle}>
          <MaterialCommunityIcons name="leaf" size={100} color="#FFF" />
        </View>
      </Animated.View>

      {/* Title */}
      <Animated.View
        entering={FadeInUp.delay(400)}
        style={styles.textContainer}
      >
        <Text variant="displaySmall" style={styles.title}>
          EcoConnect
        </Text>
        <Text variant="titleLarge" style={styles.subtitle}>
          Sustainable Living Made Easy
        </Text>
        <Text variant="bodyLarge" style={styles.description}>
          Track your eco-friendly habits, earn rewards, and join a community of
          environmental champions
        </Text>
      </Animated.View>

      {/* Features */}
      <Animated.View
        entering={FadeInUp.delay(600)}
        style={styles.featuresContainer}
      >
        <View style={styles.feature}>
          <MaterialCommunityIcons
            name="checkbox-marked-circle"
            size={24}
            color={EcoTheme.colors.primary}
          />
          <Text style={styles.featureText}>Daily Eco Tasks</Text>
        </View>
        <View style={styles.feature}>
          <MaterialCommunityIcons
            name="trophy"
            size={24}
            color={EcoTheme.colors.warning}
          />
          <Text style={styles.featureText}>Earn Rewards</Text>
        </View>
        <View style={styles.feature}>
          <MaterialCommunityIcons
            name="account-group"
            size={24}
            color={EcoTheme.colors.info}
          />
          <Text style={styles.featureText}>Join Community</Text>
        </View>
      </Animated.View>

      {/* Buttons */}
      <Animated.View
        entering={FadeInUp.delay(800)}
        style={styles.buttonContainer}
      >
        <Button
          mode="contained"
          onPress={() => router.push("/register")}
          style={styles.primaryButton}
          buttonColor={EcoTheme.colors.primary}
          contentStyle={styles.buttonContent}
        >
          Get Started
        </Button>
        <Button
          mode="outlined"
          onPress={() => router.push("/login")}
          style={styles.secondaryButton}
          textColor={EcoTheme.colors.primary}
          contentStyle={styles.buttonContent}
        >
          Sign In
        </Button>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EcoTheme.colors.background,
    padding: EcoTheme.spacing.lg,
    justifyContent: "center",
  },
  backgroundCircle1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: EcoTheme.colors.primary + "10",
    top: -100,
    right: -100,
  },
  backgroundCircle2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: EcoTheme.colors.secondary + "10",
    bottom: -50,
    left: -50,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: EcoTheme.spacing.xl,
  },
  logoCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: EcoTheme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: EcoTheme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: EcoTheme.spacing.xl,
  },
  title: {
    fontWeight: "bold",
    color: EcoTheme.colors.primary,
    marginBottom: EcoTheme.spacing.sm,
  },
  subtitle: {
    color: EcoTheme.colors.text,
    marginBottom: EcoTheme.spacing.md,
    opacity: 0.8,
  },
  description: {
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 24,
    paddingHorizontal: EcoTheme.spacing.md,
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: EcoTheme.spacing.xl,
    paddingHorizontal: EcoTheme.spacing.md,
  },
  feature: {
    alignItems: "center",
    flex: 1,
  },
  featureText: {
    marginTop: EcoTheme.spacing.sm,
    fontSize: 12,
    textAlign: "center",
    opacity: 0.8,
  },
  buttonContainer: {
    gap: EcoTheme.spacing.md,
  },
  primaryButton: {
    borderRadius: EcoTheme.borderRadius.md,
    elevation: 4,
  },
  secondaryButton: {
    borderRadius: EcoTheme.borderRadius.md,
    borderColor: EcoTheme.colors.primary,
    borderWidth: 2,
  },
  buttonContent: {
    paddingVertical: EcoTheme.spacing.sm,
  },
});
