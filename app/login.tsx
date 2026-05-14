import { EcoTheme } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, IconButton, Text, TextInput } from "react-native-paper";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const success = await login(email, password);

    if (success) {
      router.replace("/(tabs)");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons
              name="leaf"
              size={80}
              color={EcoTheme.colors.primary}
            />
          </View>
          <Text variant="headlineLarge" style={styles.title}>
            Welcome Back!
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Sign in to continue your eco journey
          </Text>
        </Animated.View>

        {/* Login Form */}
        <Animated.View entering={FadeInUp.delay(200)}>
          <Card style={styles.card}>
            <Card.Content>
              <TextInput
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                left={<TextInput.Icon icon="email" />}
                style={styles.input}
                outlineColor={EcoTheme.colors.primary}
                activeOutlineColor={EcoTheme.colors.primary}
              />

              <TextInput
                mode="outlined"
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                style={styles.input}
                outlineColor={EcoTheme.colors.primary}
                activeOutlineColor={EcoTheme.colors.primary}
              />

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <Button
                mode="contained"
                onPress={handleLogin}
                loading={isLoading}
                disabled={isLoading}
                style={styles.loginButton}
                buttonColor={EcoTheme.colors.primary}
                contentStyle={styles.buttonContent}
              >
                Sign In
              </Button>

              <Button
                mode="text"
                onPress={() => {}}
                style={styles.forgotButton}
                textColor={EcoTheme.colors.primary}
              >
                Forgot Password?
              </Button>
            </Card.Content>
          </Card>
        </Animated.View>

        {/* Social Login */}
        <Animated.View
          entering={FadeInUp.delay(300)}
          style={styles.socialContainer}
        >
          <Text style={styles.orText}>Or continue with</Text>
          <View style={styles.socialButtons}>
            <IconButton
              icon="google"
              size={30}
              iconColor="#4285F4"
              style={styles.socialButton}
              onPress={() => {}}
            />
            <IconButton
              icon="facebook"
              size={30}
              iconColor="#4267B2"
              style={styles.socialButton}
              onPress={() => {}}
            />
            <IconButton
              icon="apple"
              size={30}
              iconColor="#000"
              style={styles.socialButton}
              onPress={() => {}}
            />
          </View>
        </Animated.View>

        {/* Register Link */}
        <Animated.View
          entering={FadeInUp.delay(400)}
          style={styles.registerContainer}
        >
          <Text style={styles.registerText}>Don't have an account? </Text>
          <Button
            mode="text"
            onPress={() => router.push("/register")}
            textColor={EcoTheme.colors.primary}
            style={styles.registerButton}
          >
            Sign Up
          </Button>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EcoTheme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: EcoTheme.spacing.lg,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: EcoTheme.spacing.xl,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: EcoTheme.colors.primary + "20",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: EcoTheme.spacing.lg,
  },
  title: {
    fontWeight: "bold",
    color: EcoTheme.colors.primary,
    marginBottom: EcoTheme.spacing.sm,
  },
  subtitle: {
    opacity: 0.7,
    textAlign: "center",
  },
  card: {
    elevation: 4,
    borderRadius: EcoTheme.borderRadius.lg,
  },
  input: {
    marginBottom: EcoTheme.spacing.md,
  },
  errorText: {
    color: EcoTheme.colors.error,
    marginBottom: EcoTheme.spacing.md,
    textAlign: "center",
  },
  loginButton: {
    marginTop: EcoTheme.spacing.md,
    borderRadius: EcoTheme.borderRadius.md,
  },
  buttonContent: {
    paddingVertical: EcoTheme.spacing.sm,
  },
  forgotButton: {
    marginTop: EcoTheme.spacing.sm,
  },
  socialContainer: {
    alignItems: "center",
    marginTop: EcoTheme.spacing.xl,
  },
  orText: {
    opacity: 0.6,
    marginBottom: EcoTheme.spacing.md,
  },
  socialButtons: {
    flexDirection: "row",
    gap: EcoTheme.spacing.md,
  },
  socialButton: {
    backgroundColor: EcoTheme.colors.surface,
    elevation: 2,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: EcoTheme.spacing.xl,
  },
  registerText: {
    opacity: 0.7,
  },
  registerButton: {
    marginLeft: -EcoTheme.spacing.sm,
  },
});
