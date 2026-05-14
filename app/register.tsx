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
import { Button, Card, Checkbox, Text, TextInput } from "react-native-paper";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    const success = await register(name, email, password);

    if (success) {
      router.replace("/(tabs)");
    } else {
      setError("Registration failed. Please try again.");
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
              name="account-plus"
              size={80}
              color={EcoTheme.colors.primary}
            />
          </View>
          <Text variant="headlineLarge" style={styles.title}>
            Join EcoConnect
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Start your sustainable living journey today
          </Text>
        </Animated.View>

        {/* Register Form */}
        <Animated.View entering={FadeInUp.delay(200)}>
          <Card style={styles.card}>
            <Card.Content>
              <TextInput
                mode="outlined"
                label="Full Name"
                value={name}
                onChangeText={setName}
                left={<TextInput.Icon icon="account" />}
                style={styles.input}
                outlineColor={EcoTheme.colors.primary}
                activeOutlineColor={EcoTheme.colors.primary}
              />

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

              <TextInput
                mode="outlined"
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                left={<TextInput.Icon icon="lock-check" />}
                right={
                  <TextInput.Icon
                    icon={showConfirmPassword ? "eye-off" : "eye"}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                }
                style={styles.input}
                outlineColor={EcoTheme.colors.primary}
                activeOutlineColor={EcoTheme.colors.primary}
              />

              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={agreeTerms ? "checked" : "unchecked"}
                  onPress={() => setAgreeTerms(!agreeTerms)}
                  color={EcoTheme.colors.primary}
                />
                <Text style={styles.checkboxText}>
                  I agree to the{" "}
                  <Text style={styles.linkText}>Terms & Conditions</Text>
                </Text>
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <Button
                mode="contained"
                onPress={handleRegister}
                loading={isLoading}
                disabled={isLoading}
                style={styles.registerButton}
                buttonColor={EcoTheme.colors.primary}
                contentStyle={styles.buttonContent}
              >
                Create Account
              </Button>
            </Card.Content>
          </Card>
        </Animated.View>

        {/* Login Link */}
        <Animated.View
          entering={FadeInUp.delay(300)}
          style={styles.loginContainer}
        >
          <Text style={styles.loginText}>Already have an account? </Text>
          <Button
            mode="text"
            onPress={() => router.back()}
            textColor={EcoTheme.colors.primary}
            style={styles.loginButton}
          >
            Sign In
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: EcoTheme.spacing.md,
  },
  checkboxText: {
    flex: 1,
    marginLeft: EcoTheme.spacing.sm,
  },
  linkText: {
    color: EcoTheme.colors.primary,
    fontWeight: "bold",
  },
  errorText: {
    color: EcoTheme.colors.error,
    marginBottom: EcoTheme.spacing.md,
    textAlign: "center",
  },
  registerButton: {
    marginTop: EcoTheme.spacing.md,
    borderRadius: EcoTheme.borderRadius.md,
  },
  buttonContent: {
    paddingVertical: EcoTheme.spacing.sm,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: EcoTheme.spacing.xl,
  },
  loginText: {
    opacity: 0.7,
  },
  loginButton: {
    marginLeft: -EcoTheme.spacing.sm,
  },
});
