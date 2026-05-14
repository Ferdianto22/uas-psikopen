import { EcoTheme } from "@/constants/theme";
import { UserProfile } from "@/types/profile";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  ProgressBar,
  Text,
} from "react-native-paper";

interface ProfileHeaderProps {
  profile: UserProfile;
  onEdit: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  onEdit,
}) => {
  const levelProgress = profile.currentPoints / profile.pointsToNextLevel;

  return (
    <Card style={styles.card}>
      <View style={styles.headerBackground}>
        <View style={styles.header}>
          <Avatar.Image size={80} source={{ uri: profile.avatar }} />
          <IconButton
            icon="pencil"
            iconColor="#FFF"
            size={20}
            onPress={onEdit}
            style={styles.editButton}
          />
        </View>

        <Text variant="headlineSmall" style={styles.name}>
          {profile.name}
        </Text>
        <Text variant="bodyMedium" style={styles.email}>
          {profile.email}
        </Text>

        {/* Level Badge */}
        <View style={styles.levelContainer}>
          <Text variant="titleLarge" style={styles.levelText}>
            Level {profile.level}
          </Text>
          <Text variant="bodySmall" style={styles.levelSubtext}>
            Eco Champion
          </Text>
        </View>
      </View>

      <Card.Content style={styles.content}>
        {/* Points Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text variant="titleMedium" style={styles.progressTitle}>
              {profile.currentPoints} / {profile.pointsToNextLevel} pts
            </Text>
            <Text variant="bodySmall" style={styles.progressSubtitle}>
              to Level {profile.level + 1}
            </Text>
          </View>
          <ProgressBar
            progress={levelProgress}
            color={EcoTheme.colors.primary}
            style={styles.progressBar}
          />
        </View>

        {/* Bio */}
        <Text variant="bodyMedium" style={styles.bio}>
          {profile.bio}
        </Text>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text variant="headlineSmall" style={styles.statValue}>
              {profile.totalPoints}
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Total Points
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text variant="headlineSmall" style={styles.statValue}>
              {profile.badges.length}
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Badges
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text variant="headlineSmall" style={styles.statValue}>
              {Math.floor(
                (Date.now() - profile.joinDate.getTime()) /
                  (1000 * 60 * 60 * 24),
              )}
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Days Active
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: EcoTheme.spacing.md,
    elevation: 4,
    overflow: "hidden",
    borderRadius: EcoTheme.borderRadius.lg,
  },
  headerBackground: {
    padding: EcoTheme.spacing.lg,
    alignItems: "center",
    backgroundColor: EcoTheme.colors.primary,
  },
  header: {
    position: "relative",
  },
  editButton: {
    position: "absolute",
    right: -10,
    bottom: -10,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  name: {
    color: "#FFF",
    fontWeight: "bold",
    marginTop: EcoTheme.spacing.md,
  },
  email: {
    color: "#FFF",
    opacity: 0.9,
    marginTop: EcoTheme.spacing.xs,
  },
  levelContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 20,
    paddingVertical: EcoTheme.spacing.sm,
    borderRadius: 20,
    marginTop: EcoTheme.spacing.md,
    alignItems: "center",
  },
  levelText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  levelSubtext: {
    color: "#FFF",
    opacity: 0.9,
  },
  content: {
    paddingTop: 20,
  },
  progressSection: {
    marginBottom: EcoTheme.spacing.md,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: EcoTheme.spacing.sm,
  },
  progressTitle: {
    fontWeight: "bold",
    color: EcoTheme.colors.primary,
  },
  progressSubtitle: {
    opacity: 0.7,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  bio: {
    marginBottom: 20,
    lineHeight: 22,
    opacity: 0.8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: EcoTheme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontWeight: "bold",
    color: EcoTheme.colors.primary,
  },
  statLabel: {
    opacity: 0.7,
    marginTop: EcoTheme.spacing.xs,
  },
});
