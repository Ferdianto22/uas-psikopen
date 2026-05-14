import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface ProgressBarProps {
  completed: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  completed,
  total,
}) => {
  const progress = useSharedValue(0);
  const percentage = Math.round((completed / total) * 100);

  useEffect(() => {
    progress.value = withSpring((completed / total) * 100);
  }, [completed, total]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.title}>
          Daily Progress
        </Text>
        <Text variant="titleMedium" style={styles.percentage}>
          {percentage}%
        </Text>
      </View>
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, animatedStyle]} />
      </View>
      <Text variant="bodySmall" style={styles.subtitle}>
        {completed} of {total} tasks completed
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontWeight: "bold",
  },
  percentage: {
    fontWeight: "bold",
    color: "#4CAF50",
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 6,
  },
  subtitle: {
    marginTop: 8,
    opacity: 0.7,
  },
});
