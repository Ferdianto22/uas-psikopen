import { ProgressBar } from "@/components/eco/ProgressBar";
import { TaskItem } from "@/components/eco/TaskItem";
import { EcoTheme } from "@/constants/theme";
import { useEco } from "@/contexts/EcoContext";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Chip, Text } from "react-native-paper";

export default function TasksScreen() {
  const { tasks, completeTask } = useEco();

  const tasksByCategory = {
    recycling: tasks.filter((t) => t.category === "recycling"),
    energy: tasks.filter((t) => t.category === "energy"),
    plastic: tasks.filter((t) => t.category === "plastic"),
    transportation: tasks.filter((t) => t.category === "transportation"),
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalPoints = tasks
    .filter((t) => t.completed)
    .reduce((sum, task) => sum + task.points, 0);

  return (
    <ScrollView style={styles.container}>
      {/* Header Card */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Complete tasks to earn points and help the planet
          </Text>
          <View style={styles.pointsContainer}>
            <Chip icon="star" style={styles.chip} textStyle={styles.chipText}>
              {totalPoints} points earned today
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Progress Bar */}
      <ProgressBar completed={completedTasks} total={tasks.length} />

      {/* Recycling Tasks */}
      {tasksByCategory.recycling.length > 0 && (
        <>
          <Text variant="titleLarge" style={styles.categoryTitle}>
            ♻️ Recycling
          </Text>
          {tasksByCategory.recycling.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={completeTask} />
          ))}
        </>
      )}

      {/* Energy Tasks */}
      {tasksByCategory.energy.length > 0 && (
        <>
          <Text variant="titleLarge" style={styles.categoryTitle}>
            ⚡ Energy Saving
          </Text>
          {tasksByCategory.energy.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={completeTask} />
          ))}
        </>
      )}

      {/* Plastic Reduction Tasks */}
      {tasksByCategory.plastic.length > 0 && (
        <>
          <Text variant="titleLarge" style={styles.categoryTitle}>
            🌊 Reduce Plastic
          </Text>
          {tasksByCategory.plastic.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={completeTask} />
          ))}
        </>
      )}

      {/* Transportation Tasks */}
      {tasksByCategory.transportation.length > 0 && (
        <>
          <Text variant="titleLarge" style={styles.categoryTitle}>
            🚴 Eco Transportation
          </Text>
          {tasksByCategory.transportation.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={completeTask} />
          ))}
        </>
      )}

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EcoTheme.colors.background,
  },
  headerCard: {
    margin: EcoTheme.spacing.md,
    marginTop: EcoTheme.spacing.sm,
    elevation: 2,
    borderRadius: EcoTheme.borderRadius.md,
  },
  subtitle: {
    opacity: 0.8,
  },
  pointsContainer: {
    marginTop: EcoTheme.spacing.md,
  },
  chip: {
    alignSelf: "flex-start",
    backgroundColor: "#FFF3E0",
  },
  chipText: {
    color: EcoTheme.colors.warning,
    fontWeight: "bold",
  },
  categoryTitle: {
    fontWeight: "bold",
    marginHorizontal: EcoTheme.spacing.md,
    marginTop: EcoTheme.spacing.lg,
    marginBottom: EcoTheme.spacing.sm,
  },
  bottomSpacing: {
    height: EcoTheme.spacing.xl,
  },
});
