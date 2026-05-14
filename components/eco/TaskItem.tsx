import { EcoTask } from "@/types/eco";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Checkbox, Text } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

interface TaskItemProps {
  task: EcoTask;
  onToggle: (taskId: string) => void;
}

const categoryIcons = {
  recycling: "recycle",
  energy: "lightning-bolt",
  plastic: "bottle-soda",
  transportation: "bike",
} as const;

const categoryColors = {
  recycling: "#4CAF50",
  energy: "#FFC107",
  plastic: "#2196F3",
  transportation: "#9C27B0",
};

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(task.completed ? 0.6 : 1),
      transform: [{ scale: withSpring(task.completed ? 0.98 : 1) }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Card style={styles.card} onPress={() => onToggle(task.id)}>
        <Card.Content style={styles.content}>
          <View style={styles.leftSection}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: categoryColors[task.category] + "20" },
              ]}
            >
              <MaterialCommunityIcons
                name={categoryIcons[task.category]}
                size={24}
                color={categoryColors[task.category]}
              />
            </View>
            <View style={styles.textContainer}>
              <Text
                variant="titleMedium"
                style={[styles.title, task.completed && styles.completedText]}
              >
                {task.title}
              </Text>
              <Text variant="bodySmall" style={styles.description}>
                {task.description}
              </Text>
              <Text variant="labelSmall" style={styles.points}>
                +{task.points} points
              </Text>
            </View>
          </View>
          <Checkbox
            status={task.completed ? "checked" : "unchecked"}
            onPress={() => onToggle(task.id)}
          />
        </Card.Content>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
  },
  completedText: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  description: {
    marginTop: 4,
    opacity: 0.7,
  },
  points: {
    marginTop: 4,
    color: "#4CAF50",
    fontWeight: "bold",
  },
});
