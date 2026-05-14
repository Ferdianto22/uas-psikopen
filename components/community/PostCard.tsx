import { ForumPost } from "@/types/community";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Chip, IconButton, Text } from "react-native-paper";

interface PostCardProps {
  post: ForumPost;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
}

const categoryColors = {
  tip: "#4CAF50",
  question: "#2196F3",
  achievement: "#FFC107",
  discussion: "#9C27B0",
};

const categoryLabels = {
  tip: "💡 Tip",
  question: "❓ Question",
  achievement: "🏆 Achievement",
  discussion: "💬 Discussion",
};

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onComment,
}) => {
  const formatTime = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const categoryTextStyle = {
    color: categoryColors[post.category],
    fontSize: 13,
    fontWeight: "600" as const,
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        {/* User Header */}
        <View style={styles.header}>
          <Avatar.Image size={48} source={{ uri: post.userAvatar }} />
          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text variant="titleMedium" style={styles.userName}>
                {post.userName}
              </Text>
              <Chip
                compact
                style={[
                  styles.levelChip,
                  { backgroundColor: "#4CAF50" + "20" },
                ]}
                textStyle={styles.levelText}
              >
                Lv {post.userLevel}
              </Chip>
            </View>
            <Text variant="bodySmall" style={styles.timestamp}>
              {formatTime(post.timestamp)}
            </Text>
          </View>
        </View>

        {/* Category Badge */}
        <Chip
          compact
          style={[
            styles.categoryChip,
            { backgroundColor: categoryColors[post.category] + "20" },
          ]}
          textStyle={categoryTextStyle}
        >
          {categoryLabels[post.category]}
        </Chip>

        {/* Post Content */}
        <Text variant="bodyLarge" style={styles.content}>
          {post.content}
        </Text>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <View style={styles.actionButton}>
            <IconButton
              icon={post.isLiked ? "heart" : "heart-outline"}
              iconColor={post.isLiked ? "#F44336" : "#757575"}
              size={24}
              onPress={() => onLike(post.id)}
            />
            <Text variant="bodyMedium" style={styles.actionText}>
              {post.likes}
            </Text>
          </View>

          <View style={styles.actionButton}>
            <IconButton
              icon="comment-outline"
              iconColor="#757575"
              size={24}
              onPress={() => onComment(post.id)}
            />
            <Text variant="bodyMedium" style={styles.actionText}>
              {post.comments}
            </Text>
          </View>

          <IconButton icon="share-variant" iconColor="#757575" size={24} />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    minHeight: 60,
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 2,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
    minHeight: 28,
  },
  userName: {
    fontWeight: "bold",
    flexShrink: 1,
    maxWidth: "60%",
  },
  levelChip: {
    height: 28,
    minWidth: 50,
    paddingHorizontal: 8,
  },
  levelText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#4CAF50",
    lineHeight: 16,
  },
  timestamp: {
    opacity: 0.6,
    marginTop: 2,
  },
  categoryChip: {
    alignSelf: "flex-start",
    marginBottom: 12,
    height: 32,
    paddingHorizontal: 8,
  },
  content: {
    marginBottom: 12,
    lineHeight: 24,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  actionText: {
    marginLeft: -8,
    color: "#757575",
  },
});
