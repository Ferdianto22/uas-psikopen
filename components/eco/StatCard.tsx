import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

interface StatCardProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string | number;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  color,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <MaterialCommunityIcons name={icon} size={32} color={color} />
        <Text variant="headlineMedium" style={styles.value}>
          {value}
        </Text>
        <Text variant="bodySmall" style={styles.label}>
          {label}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    elevation: 2,
  },
  content: {
    alignItems: "center",
    paddingVertical: 16,
  },
  value: {
    fontWeight: "bold",
    marginTop: 8,
  },
  label: {
    marginTop: 4,
    opacity: 0.7,
  },
});
