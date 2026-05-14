import { WeeklyActivity } from "@/types/profile";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

interface WeeklyActivityChartProps {
  data: WeeklyActivity[];
}

export const WeeklyActivityChart: React.FC<WeeklyActivityChartProps> = ({
  data,
}) => {
  const maxTasks = Math.max(...data.map((d) => d.tasksCompleted));

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.title}>
          Weekly Activity
        </Text>

        <View style={styles.chartContainer}>
          {data.map((day, index) => {
            const height = (day.tasksCompleted / maxTasks) * 100;
            return (
              <View key={index} style={styles.barContainer}>
                <View style={styles.barWrapper}>
                  <View style={[styles.bar, { height: `${height}%` }]} />
                </View>
                <Text variant="bodySmall" style={styles.dayLabel}>
                  {day.day}
                </Text>
                <Text variant="bodySmall" style={styles.taskCount}>
                  {day.tasksCompleted}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text variant="titleMedium" style={styles.summaryValue}>
              {data.reduce((sum, d) => sum + d.tasksCompleted, 0)}
            </Text>
            <Text variant="bodySmall" style={styles.summaryLabel}>
              Tasks
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text variant="titleMedium" style={styles.summaryValue}>
              {data.reduce((sum, d) => sum + d.pointsEarned, 0)}
            </Text>
            <Text variant="bodySmall" style={styles.summaryLabel}>
              Points
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 150,
    marginBottom: 20,
  },
  barContainer: {
    alignItems: "center",
    flex: 1,
  },
  barWrapper: {
    width: "80%",
    height: 120,
    justifyContent: "flex-end",
  },
  bar: {
    backgroundColor: "#4CAF50",
    borderRadius: 4,
    minHeight: 8,
  },
  dayLabel: {
    marginTop: 8,
    fontWeight: "bold",
  },
  taskCount: {
    marginTop: 2,
    opacity: 0.7,
    fontSize: 10,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryValue: {
    fontWeight: "bold",
    color: "#4CAF50",
  },
  summaryLabel: {
    opacity: 0.7,
    marginTop: 4,
  },
});
