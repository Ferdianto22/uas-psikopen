// Tesler's Law: Simple donation interface, complex processing behind the scenes
import { EcoTheme } from "@/constants/theme";
import {
  calculateDonationImpact,
  getSuggestedDonations,
  processDonation,
} from "@/utils/donationProcessor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Text,
  TextInput,
} from "react-native-paper";

export const DonationCard: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [selectedProject, setSelectedProject] = useState("reforestation");
  const [loading, setLoading] = useState(false);
  const [impact, setImpact] = useState<any>(null);

  // Get suggested amounts (complex logic behind the scenes)
  const suggestions = getSuggestedDonations({ country: "US" });

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString());
    // Show impact immediately (complex calculation hidden)
    const impactResult = calculateDonationImpact(value, selectedProject);
    setImpact(impactResult);
  };

  const handleDonate = async () => {
    const donationAmount = parseFloat(amount);

    if (!donationAmount || donationAmount < 1) {
      Alert.alert("Invalid Amount", "Please enter a valid donation amount");
      return;
    }

    setLoading(true);

    try {
      // Complex donation processing happens here
      // User just sees simple loading indicator
      const result = await processDonation(
        {
          amount: donationAmount,
          currency: "USD",
          projectId: selectedProject,
          recurring: false,
        },
        {
          name: "Eco Warrior",
          email: "user@example.com",
          country: "US",
        },
      );

      setLoading(false);

      if (result.success) {
        // Simple success message (complex receipt generation hidden)
        Alert.alert(
          "Thank You! 🎉",
          `Your donation of $${result.amount} will offset ${result.co2Offset} kg of CO₂!\n\nReceipt ID: ${result.receipt.receiptId}`,
          [{ text: "OK" }],
        );
        setAmount("");
        setImpact(null);
      } else {
        Alert.alert("Error", result.error || "Donation failed");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="heart"
            size={32}
            color={EcoTheme.colors.error}
          />
          <Text variant="titleLarge" style={styles.title}>
            Make a Difference
          </Text>
        </View>

        <Text variant="bodyMedium" style={styles.subtitle}>
          Support environmental projects and offset your carbon footprint
        </Text>

        {/* Simple project selection */}
        <Text variant="titleSmall" style={styles.label}>
          Choose a Project
        </Text>
        <View style={styles.projectChips}>
          <Chip
            selected={selectedProject === "reforestation"}
            onPress={() => setSelectedProject("reforestation")}
            style={styles.chip}
          >
            🌳 Trees
          </Chip>
          <Chip
            selected={selectedProject === "renewable"}
            onPress={() => setSelectedProject("renewable")}
            style={styles.chip}
          >
            ⚡ Energy
          </Chip>
          <Chip
            selected={selectedProject === "ocean"}
            onPress={() => setSelectedProject("ocean")}
            style={styles.chip}
          >
            🌊 Ocean
          </Chip>
        </View>

        {/* Simple amount selection */}
        <Text variant="titleSmall" style={styles.label}>
          Select Amount
        </Text>
        <View style={styles.amountChips}>
          {suggestions.map((suggestion) => (
            <Chip
              key={suggestion.amount}
              selected={amount === suggestion.amount.toString()}
              onPress={() => handleAmountSelect(suggestion.amount)}
              style={styles.chip}
            >
              {suggestion.label}
            </Chip>
          ))}
        </View>

        {/* Custom amount */}
        <TextInput
          mode="outlined"
          label="Custom Amount ($)"
          value={amount}
          onChangeText={(text) => {
            setAmount(text);
            const value = parseFloat(text);
            if (value > 0) {
              const impactResult = calculateDonationImpact(
                value,
                selectedProject,
              );
              setImpact(impactResult);
            }
          }}
          keyboardType="numeric"
          style={styles.input}
          outlineColor={EcoTheme.colors.primary}
          activeOutlineColor={EcoTheme.colors.primary}
          left={<TextInput.Icon icon="currency-usd" />}
        />

        {/* Simple impact display (complex calculations hidden) */}
        {impact && (
          <View style={styles.impact}>
            <Text variant="titleSmall" style={styles.impactTitle}>
              Your Impact:
            </Text>
            <Text variant="bodyMedium" style={styles.impactText}>
              ✓ Offset {impact.co2Offset} kg CO₂
            </Text>
            <Text variant="bodyMedium" style={styles.impactText}>
              ✓ {impact.description}
            </Text>
            <Text variant="bodySmall" style={styles.impactSubtext}>
              {impact.timeframe}
            </Text>
          </View>
        )}

        {/* Simple donate button (complex processing hidden) */}
        <Button
          mode="contained"
          onPress={handleDonate}
          disabled={loading || !amount}
          buttonColor={EcoTheme.colors.primary}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            `Donate ${amount ? `$${amount}` : ""}`
          )}
        </Button>

        <Text variant="bodySmall" style={styles.disclaimer}>
          100% secure • Tax deductible • Instant receipt
        </Text>
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
    marginBottom: EcoTheme.spacing.lg,
  },
  label: {
    fontWeight: "bold",
    marginBottom: EcoTheme.spacing.sm,
    marginTop: EcoTheme.spacing.md,
  },
  projectChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: EcoTheme.spacing.sm,
    marginBottom: EcoTheme.spacing.md,
  },
  amountChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: EcoTheme.spacing.sm,
    marginBottom: EcoTheme.spacing.md,
  },
  chip: {
    marginRight: 0,
  },
  input: {
    marginBottom: EcoTheme.spacing.md,
  },
  impact: {
    padding: EcoTheme.spacing.md,
    backgroundColor: EcoTheme.colors.success + "10",
    borderRadius: EcoTheme.borderRadius.md,
    marginBottom: EcoTheme.spacing.md,
  },
  impactTitle: {
    fontWeight: "bold",
    marginBottom: EcoTheme.spacing.sm,
    color: EcoTheme.colors.success,
  },
  impactText: {
    marginBottom: EcoTheme.spacing.xs,
  },
  impactSubtext: {
    opacity: 0.7,
    marginTop: EcoTheme.spacing.xs,
  },
  button: {
    marginTop: EcoTheme.spacing.md,
  },
  buttonContent: {
    paddingVertical: EcoTheme.spacing.sm,
  },
  disclaimer: {
    textAlign: "center",
    opacity: 0.6,
    marginTop: EcoTheme.spacing.md,
  },
});
