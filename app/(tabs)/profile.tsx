import { AchievementBadge } from "@/components/profile/AchievementBadge";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { WeeklyActivityChart } from "@/components/profile/WeeklyActivityChart";
import { useProfile } from "@/contexts/ProfileContext";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";

export default function ProfileScreen() {
  const { profile, achievements, updateProfile } = useProfile();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedName, setEditedName] = useState(profile.name);
  const [editedBio, setEditedBio] = useState(profile.bio);

  const handleSaveProfile = () => {
    updateProfile({ name: editedName, bio: editedBio });
    setEditModalVisible(false);
  };

  const unlockedAchievements = achievements.filter((a) => a.unlocked);
  const lockedAchievements = achievements.filter((a) => !a.unlocked);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Profile Header */}
        <ProfileHeader
          profile={profile}
          onEdit={() => setEditModalVisible(true)}
        />

        {/* Weekly Activity */}
        <WeeklyActivityChart data={profile.weeklyActivity} />

        {/* Achievements Section */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            🏆 Achievements
          </Text>

          <Text variant="titleMedium" style={styles.subsectionTitle}>
            Unlocked ({unlockedAchievements.length})
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.badgeScroll}
          >
            {unlockedAchievements.map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
              />
            ))}
          </ScrollView>

          <Text variant="titleMedium" style={styles.subsectionTitle}>
            In Progress ({lockedAchievements.length})
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.badgeScroll}
          >
            {lockedAchievements.map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Edit Profile Modal */}
      <Portal>
        <Modal
          visible={editModalVisible}
          onDismiss={() => setEditModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Text variant="titleLarge" style={styles.modalTitle}>
            Edit Profile
          </Text>

          <TextInput
            mode="outlined"
            label="Name"
            value={editedName}
            onChangeText={setEditedName}
            style={styles.input}
            outlineColor="#4CAF50"
            activeOutlineColor="#4CAF50"
          />

          <TextInput
            mode="outlined"
            label="Bio"
            value={editedBio}
            onChangeText={setEditedBio}
            multiline
            numberOfLines={3}
            style={styles.input}
            outlineColor="#4CAF50"
            activeOutlineColor="#4CAF50"
          />

          <View style={styles.modalActions}>
            <Button onPress={() => setEditModalVisible(false)}>Cancel</Button>
            <Button
              mode="contained"
              onPress={handleSaveProfile}
              buttonColor="#4CAF50"
            >
              Save
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  subsectionTitle: {
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    opacity: 0.8,
  },
  badgeScroll: {
    paddingLeft: 8,
  },
  bottomSpacing: {
    height: 32,
  },
  modal: {
    backgroundColor: "#FFF",
    padding: 24,
    margin: 20,
    borderRadius: 16,
  },
  modalTitle: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 8,
  },
});
