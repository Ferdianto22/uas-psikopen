// Tesler's Law: Simple interface, complex calculations behind the scenes
import { EcoTheme } from "@/constants/theme";
import {
  calculateTransportationFootprint,
  TransportationInput,
} from "@/utils/carbonCalculator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  SegmentedButtons,
  Text,
  TextInput,
} from "react-native-paper";

export const CarbonCalculatorCard: React.FC = () => {
  const [mode, setMode] = useState<"car" | "bus" | "train" | "bike">("car");
  const [distance, setDistance] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const input: TransportationInput = {
      mode,
      distance: parseFloat(distance) || 0,
      fuelType: mode === "car" ? "gasoline" : undefined,
    };

    // Complex calculation happens here, user just sees simple result
    const carbonResult = calculateTransportationFootprint(input);
    setResult(carbonResult);
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="calculator"
            size={32}
            color={EcoTheme.colors.primary}
          />
          <Text variant="titleLarge" style={styles.title}>
            Carbon Calculator
          </Text>
        </View>

        <Text variant="bodyMedium" style={styles.subtitle}>
          Calculate your trip's carbon footprint
        </Text>

        {/* Simple interface */}
        <SegmentedButtons
          value={mode}
          onValueChange={(value) => setMode(value as any)}
          buttons={[
            { value: "car", label: "🚗 Car" },
            { value: "bus", label: "🚌 Bus" },
            { value: "train", label: "🚆 Train" },
            { value: "bike", label: "🚴 Bike" },
          ]}
          style={styles.segmented}
        />

        <TextInput
          mode="outlined"
          label="Distance (km)"
          value={distance}
          onChangeText={setDistance}
          keyboardType="numeric"
          style={styles.input}
          outlineColor={EcoTheme.colors.primary}
          activeOutlineColor={EcoTheme.colors.primary}
        />

        <Button
          mode="contained"
          onPress={handleCalculate}
          buttonColor={EcoTheme.colors.primary}
          style={styles.button}
        >
          Calculate
        </Button>

        {/* Simple result display (complex calculations hidden) */}
        {result && (
          <View style={styles.result}>
            <View style={styles.resultRow}>
              <MaterialCommunityIcons
                name="cloud-outline"
                size={24}
                color={EcoTheme.colors.info}
              />
              <Text variant="headlineSmall" style={styles.resultValue}>
                {result.co2Kg} kg CO₂
              </Text>
            </View>
            <Text variant="bodyMedium" style={styles.comparison}>
              {result.comparison}
            </Text>
            <Text variant="bodySmall" style={styles.trees}>
              🌳 Equivalent to {result.treesEquivalent} trees for a year
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: EcoTheme.spacing.md,
    elevation: 4,
    borderRadius: EcoTheme.borderRadius.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: EcoTheme.spacing.sm,
    gap: EcoTheme.spacing.sm,
  },
  title: {
    fontWeight: "bold",
    color: EcoTheme.colors.primary,
  },
  subtitle: {
    opacity: 0.7,
    marginBottom: EcoTheme.spacing.md,
  },
  segmented: {
    marginBottom: EcoTheme.spacing.md,
  },
  input: {
    marginBottom: EcoTheme.spacing.md,
  },
  button: {
    marginTop: EcoTheme.spacing.sm,
  },
  result: {
    marginTop: EcoTheme.spacing.lg,
    padding: EcoTheme.spacing.md,
    backgroundColor: EcoTheme.colors.primary + "10",
    borderRadius: EcoTheme.borderRadius.md,
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: EcoTheme.spacing.sm,
    marginBottom: EcoTheme.spacing.sm,
  },
  resultValue: {
    fontWeight: "bold",
    color: EcoTheme.colors.primary,
  },
  comparison: {
    marginTop: EcoTheme.spacing.sm,
    opacity: 0.8,
  },
  trees: {
    marginTop: EcoTheme.spacing.xs,
    opacity: 0.7,
  },
});
