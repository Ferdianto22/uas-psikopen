import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

interface EcoTipCardProps {
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

export const EcoTipCard: React.FC<EcoTipCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <MaterialCommunityIcons name={icon} size={40} color="#4CAF50" />
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          {description}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    elevation: 2,
  },
  content: {
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    opacity: 0.8,
  },
});
