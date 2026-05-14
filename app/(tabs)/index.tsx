import { EcoTipCard } from "@/components/eco/EcoTipCard";
import { StatCard } from "@/components/eco/StatCard";
import { WeeklyChart } from "@/components/eco/WeeklyChart";
import { EcoTheme } from "@/constants/theme";
import { useEco } from "@/contexts/EcoContext";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

export default function HomeScreen() {
  const { userStats, weeklyProgress, tasks } = useEco();

  const completedToday = tasks.filter((t) => t.completed).length;
  const userName = "Eco Warrior";

  return (
    <ScrollView style={styles.container}>
      {/* Greeting Section */}
      <Card style={styles.greetingCard}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.greeting}>
            Hello, {userName}! 👋
          </Text>
          <Text variant="bodyLarge" style={styles.subGreeting}>
            Ready to make a difference today?
          </Text>
          <Text variant="bodyMedium" style={styles.taskInfo}>
            {completedToday} of {tasks.length} tasks completed today
          </Text>
        </Card.Content>
      </Card>

      {/* Environmental Statistics */}
      <View style={styles.statsContainer}>
        <StatCard
          icon="trophy"
          label="Total Points"
          value={userStats.totalPoints}
          color={EcoTheme.colors.warning}
        />
        <StatCard
          icon="check-circle"
          label="Tasks Done"
          value={userStats.tasksCompleted}
          color={EcoTheme.colors.success}
        />
      </View>

      <View style={styles.statsContainer}>
        <StatCard
          icon="cloud-outline"
          label="CO₂ Saved (kg)"
          value={userStats.co2Saved.toFixed(1)}
          color={EcoTheme.colors.info}
        />
        <StatCard
          icon="tree"
          label="Trees Planted"
          value={userStats.treesPlanted}
          color={EcoTheme.colors.ecoLightGreen}
        />
      </View>

      {/* Weekly Progress Chart */}
      <WeeklyChart data={weeklyProgress} />

      {/* Eco Tips Section */}
      <Text variant="headlineSmall" style={styles.sectionTitle}>
        Today's Eco Tips
      </Text>
      <EcoTipCard
        icon="lightbulb-on"
        title="Save Energy"
        description="Switch to LED bulbs to reduce energy consumption by up to 75%"
      />

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EcoTheme.colors.background,
  },
  greetingCard: {
    margin: EcoTheme.spacing.md,
    marginTop: EcoTheme.spacing.sm,
    elevation: 2,
    borderRadius: EcoTheme.borderRadius.md,
  },
  greeting: {
    fontWeight: "bold",
    color: EcoTheme.colors.primary,
  },
  subGreeting: {
    marginTop: EcoTheme.spacing.sm,
    opacity: 0.8,
  },
  taskInfo: {
    marginTop: EcoTheme.spacing.md,
    color: EcoTheme.colors.primary,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginHorizontal: EcoTheme.spacing.md,
    marginTop: EcoTheme.spacing.sm,
    marginBottom: EcoTheme.spacing.sm,
  },
  bottomSpacing: {
    height: EcoTheme.spacing.xl,
  },
});
