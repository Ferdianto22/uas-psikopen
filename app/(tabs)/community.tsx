import { PostCard } from "@/components/community/PostCard";
import { EcoTheme } from "@/constants/theme";
import { useCommunity } from "@/contexts/CommunityContext";
import { ForumPost } from "@/types/community";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Chip,
  FAB,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";

export default function CommunityScreen() {
  const { posts, addPost, toggleLike } = useCommunity();
  const [modalVisible, setModalVisible] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ForumPost["category"]>("discussion");

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      addPost(newPostContent, selectedCategory);
      setNewPostContent("");
      setModalVisible(false);
    }
  };

  const handleComment = (postId: string) => {
    console.log("Comment on post:", postId);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={toggleLike}
            onComment={handleComment}
          />
        ))}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        color="#FFF"
      />

      {/* Create Post Modal */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Text variant="titleLarge" style={styles.modalTitle}>
            Create New Post
          </Text>

          <Text variant="bodyMedium" style={styles.label}>
            Category
          </Text>
          <View style={styles.categoryContainer}>
            <Chip
              selected={selectedCategory === "tip"}
              onPress={() => setSelectedCategory("tip")}
              style={styles.categoryChip}
            >
              💡 Tip
            </Chip>
            <Chip
              selected={selectedCategory === "question"}
              onPress={() => setSelectedCategory("question")}
              style={styles.categoryChip}
            >
              ❓ Question
            </Chip>
            <Chip
              selected={selectedCategory === "achievement"}
              onPress={() => setSelectedCategory("achievement")}
              style={styles.categoryChip}
            >
              🏆 Achievement
            </Chip>
            <Chip
              selected={selectedCategory === "discussion"}
              onPress={() => setSelectedCategory("discussion")}
              style={styles.categoryChip}
            >
              💬 Discussion
            </Chip>
          </View>

          <TextInput
            mode="outlined"
            label="What's on your mind?"
            value={newPostContent}
            onChangeText={setNewPostContent}
            multiline
            numberOfLines={4}
            style={styles.input}
            outlineColor={EcoTheme.colors.primary}
            activeOutlineColor={EcoTheme.colors.primary}
          />

          <View style={styles.modalActions}>
            <Button onPress={() => setModalVisible(false)}>Cancel</Button>
            <Button
              mode="contained"
              onPress={handleCreatePost}
              buttonColor={EcoTheme.colors.primary}
              disabled={!newPostContent.trim()}
            >
              Post
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
    backgroundColor: EcoTheme.colors.background,
  },
  bottomSpacing: {
    height: 80,
  },
  fab: {
    position: "absolute",
    right: EcoTheme.spacing.md,
    bottom: EcoTheme.spacing.md,
    backgroundColor: EcoTheme.colors.primary,
  },
  modal: {
    backgroundColor: EcoTheme.colors.surface,
    padding: EcoTheme.spacing.lg,
    margin: 20,
    borderRadius: EcoTheme.borderRadius.lg,
  },
  modalTitle: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    marginBottom: EcoTheme.spacing.sm,
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: EcoTheme.spacing.sm,
    marginBottom: EcoTheme.spacing.md,
  },
  categoryChip: {
    marginRight: 4,
  },
  input: {
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: EcoTheme.spacing.sm,
  },
});
