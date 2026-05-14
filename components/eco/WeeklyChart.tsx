import { WeeklyProgress } from "@/types/eco";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Card, Text } from "react-native-paper";

interface WeeklyChartProps {
  data: WeeklyProgress[];
}

export const WeeklyChart: React.FC<WeeklyChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.day),
    datasets: [
      {
        data: data.map((d) => d.points),
      },
    ],
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.title}>
          Weekly Progress
        </Text>
        <BarChart
          data={chartData}
          width={Dimensions.get("window").width - 60}
          height={200}
          yAxisLabel=""
          yAxisSuffix=" pts"
          chartConfig={{
            backgroundColor: "#4CAF50",
            backgroundGradientFrom: "#66BB6A",
            backgroundGradientTo: "#4CAF50",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={styles.chart}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
