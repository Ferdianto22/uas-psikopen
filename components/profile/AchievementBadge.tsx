import { Achievement } from "@/types/profile";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, ProgressBar, Text } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

interface AchievementBadgeProps {
  achievement: Achievement;
  onPress?: () => void;
}

const categoryColors = {
  recycling: "#4CAF50",
  energy: "#FFC107",
  plastic: "#2196F3",
  transportation: "#9C27B0",
  social: "#FF5722",
};

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  onPress,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(achievement.unlocked ? 1 : 0.4),
      transform: [{ scale: withSpring(achievement.unlocked ? 1 : 0.95) }],
    };
  });

  const progress = achievement.maxProgress
    ? (achievement.progress || 0) / achievement.maxProgress
    : 1;

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity onPress={onPress} disabled={!achievement.unlocked}>
        <Card style={[styles.card, !achievement.unlocked && styles.lockedCard]}>
          <Card.Content style={styles.content}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: categoryColors[achievement.category] + "20",
                  borderColor: categoryColors[achievement.category],
                },
                achievement.unlocked && styles.unlockedIcon,
              ]}
            >
              <MaterialCommunityIcons
                name={achievement.icon as any}
                size={32}
                color={
                  achievement.unlocked
                    ? categoryColors[achievement.category]
                    : "#BDBDBD"
                }
              />
            </View>

            <Text
              variant="titleSmall"
              style={[styles.title, !achievement.unlocked && styles.lockedText]}
            >
              {achievement.title}
            </Text>

            <Text
              variant="bodySmall"
              style={[
                styles.description,
                !achievement.unlocked && styles.lockedText,
              ]}
            >
              {achievement.description}
            </Text>

            {!achievement.unlocked && achievement.maxProgress && (
              <View style={styles.progressContainer}>
                <ProgressBar
                  progress={progress}
                  color={categoryColors[achievement.category]}
                  style={styles.progressBar}
                />
                <Text variant="bodySmall" style={styles.progressText}>
                  {achievement.progress} / {achievement.maxProgress}
                </Text>
              </View>
            )}

            {achievement.unlocked && (
              <View style={styles.pointsContainer}>
                <MaterialCommunityIcons name="star" size={16} color="#FFC107" />
                <Text variant="bodySmall" style={styles.points}>
                  +{achievement.points} pts
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    margin: 8,
    elevation: 2,
  },
  lockedCard: {
    backgroundColor: "#F5F5F5",
  },
  content: {
    alignItems: "center",
    paddingVertical: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 2,
  },
  unlockedIcon: {
    borderWidth: 3,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  description: {
    textAlign: "center",
    opacity: 0.7,
    fontSize: 11,
  },
  lockedText: {
    color: "#9E9E9E",
  },
  progressContainer: {
    width: "100%",
    marginTop: 12,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  progressText: {
    textAlign: "center",
    marginTop: 4,
    opacity: 0.7,
    fontSize: 10,
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 4,
  },
  points: {
    color: "#FFC107",
    fontWeight: "bold",
  },
});
