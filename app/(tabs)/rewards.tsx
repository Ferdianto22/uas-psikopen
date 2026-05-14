import { AchievementBadge } from "@/components/profile/AchievementBadge";
import { EcoTheme } from "@/constants/theme";
import { useProfile } from "@/contexts/ProfileContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Chip, ProgressBar, Text } from "react-native-paper";

export default function RewardsScreen() {
  const { profile, achievements } = useProfile();

  const levelProgress = profile.currentPoints / profile.pointsToNextLevel;
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  const levelTiers = [
    { level: 1, name: "Eco Beginner", color: "#8D6E63", icon: "sprout" },
    { level: 5, name: "Eco Enthusiast", color: "#C0C0C0", icon: "leaf" },
    { level: 10, name: "Eco Warrior", color: "#FFD700", icon: "shield" },
    { level: 15, name: "Eco Champion", color: "#E5E4E2", icon: "trophy" },
    { level: 20, name: "Eco Legend", color: "#B9F2FF", icon: "crown" },
  ];

  const currentTier =
    [...levelTiers].reverse().find((tier) => profile.level >= tier.level) ||
    levelTiers[0];
  const nextTier = levelTiers.find((tier) => tier.level > profile.level);

  return (
    <ScrollView style={styles.container}>
      {/* Level Progress Card */}
      <Card style={styles.card}>
        <View style={styles.levelHeader}>
          <View style={styles.levelIconContainer}>
            <MaterialCommunityIcons
              name={currentTier.icon as any}
              size={48}
              color="#FFF"
            />
          </View>
          <Text variant="headlineMedium" style={styles.levelTitle}>
            Level {profile.level}
          </Text>
          <Text variant="titleMedium" style={styles.tierName}>
            {currentTier.name}
          </Text>
        </View>

        <Card.Content>
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text variant="bodyLarge" style={styles.progressText}>
                {profile.currentPoints} / {profile.pointsToNextLevel} pts
              </Text>
              {nextTier && (
                <Text variant="bodySmall" style={styles.nextLevel}>
                  Next: {nextTier.name}
                </Text>
              )}
            </View>
            <ProgressBar
              progress={levelProgress}
              color={EcoTheme.colors.primary}
              style={styles.progressBar}
            />
          </View>
        </Card.Content>
      </Card>

      {/* Stats Overview */}
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <MaterialCommunityIcons
              name="star"
              size={32}
              color={EcoTheme.colors.warning}
            />
            <Text variant="headlineSmall" style={styles.statValue}>
              {profile.totalPoints}
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Total Points
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <MaterialCommunityIcons
              name="trophy"
              size={32}
              color={EcoTheme.colors.success}
            />
            <Text variant="headlineSmall" style={styles.statValue}>
              {unlockedCount}/{achievements.length}
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Achievements
            </Text>
          </Card.Content>
        </Card>
      </View>

      {/* Level Tiers */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Level Tiers
          </Text>
          {levelTiers.map((tier) => {
            const isUnlocked = profile.level >= tier.level;
            return (
              <View
                key={tier.level}
                style={[styles.tierItem, !isUnlocked && styles.lockedTier]}
              >
                <View
                  style={[
                    styles.tierIcon,
                    { backgroundColor: tier.color + "20" },
                    isUnlocked && styles.unlockedTierIcon,
                  ]}
                >
                  <MaterialCommunityIcons
                    name={tier.icon as any}
                    size={24}
                    color={isUnlocked ? tier.color : "#BDBDBD"}
                  />
                </View>
                <View style={styles.tierInfo}>
                  <Text
                    variant="titleMedium"
                    style={[styles.tierTitle, !isUnlocked && styles.lockedText]}
                  >
                    {tier.name}
                  </Text>
                  <Text
                    variant="bodySmall"
                    style={[styles.tierLevel, !isUnlocked && styles.lockedText]}
                  >
                    Level {tier.level}
                  </Text>
                </View>
                {isUnlocked && (
                  <Chip
                    compact
                    style={styles.unlockedChip}
                    textStyle={styles.unlockedChipText}
                  >
                    Unlocked
                  </Chip>
                )}
              </View>
            );
          })}
        </Card.Content>
      </Card>

      {/* All Achievements */}
      <View style={styles.achievementsSection}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          All Achievements
        </Text>
        <View style={styles.achievementsGrid}>
          {achievements.map((achievement) => (
            <AchievementBadge key={achievement.id} achievement={achievement} />
          ))}
        </View>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EcoTheme.colors.background,
  },
  card: {
    margin: EcoTheme.spacing.md,
    elevation: 4,
    overflow: "hidden",
    borderRadius: EcoTheme.borderRadius.lg,
  },
  levelHeader: {
    padding: EcoTheme.spacing.lg,
    backgroundColor: EcoTheme.colors.primary,
    alignItems: "center",
  },
  levelIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: EcoTheme.spacing.md,
  },
  levelTitle: {
    color: "#FFF",
    fontWeight: "bold",
    marginTop: EcoTheme.spacing.sm,
  },
  tierName: {
    color: "#FFF",
    opacity: 0.9,
    marginTop: EcoTheme.spacing.xs,
  },
  progressSection: {
    marginTop: EcoTheme.spacing.md,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: EcoTheme.spacing.sm,
  },
  progressText: {
    fontWeight: "bold",
    color: EcoTheme.colors.primary,
  },
  nextLevel: {
    opacity: 0.7,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  statsGrid: {
    flexDirection: "row",
    paddingHorizontal: EcoTheme.spacing.md,
    gap: EcoTheme.spacing.md,
  },
  statCard: {
    flex: 1,
    elevation: 2,
    borderRadius: EcoTheme.borderRadius.md,
  },
  statContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  statValue: {
    fontWeight: "bold",
    marginTop: EcoTheme.spacing.sm,
    color: EcoTheme.colors.primary,
  },
  statLabel: {
    marginTop: EcoTheme.spacing.xs,
    opacity: 0.7,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: EcoTheme.spacing.md,
  },
  tierItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  lockedTier: {
    opacity: 0.5,
  },
  tierIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: EcoTheme.spacing.md,
  },
  unlockedTierIcon: {
    borderWidth: 2,
    borderColor: EcoTheme.colors.primary,
  },
  tierInfo: {
    flex: 1,
  },
  tierTitle: {
    fontWeight: "bold",
  },
  tierLevel: {
    opacity: 0.7,
    marginTop: 2,
  },
  lockedText: {
    color: "#9E9E9E",
  },
  unlockedChip: {
    backgroundColor: EcoTheme.colors.primary + "20",
  },
  unlockedChipText: {
    color: EcoTheme.colors.primary,
    fontSize: 11,
  },
  achievementsSection: {
    marginTop: EcoTheme.spacing.sm,
    paddingHorizontal: EcoTheme.spacing.md,
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  bottomSpacing: {
    height: EcoTheme.spacing.xl,
  },
});
