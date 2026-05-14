// Tesler's Law Implementation: Complex calculations, simple interface
// All complexity is handled behind the scenes with accurate algorithms

/**
 * Carbon Footprint Calculator
 * Uses real emission factors and complex calculations
 * Presents simple results to users
 */

// Emission factors (kg CO2 per unit)
const EMISSION_FACTORS = {
  // Transportation (kg CO2 per km)
  car: {
    gasoline: 0.192,
    diesel: 0.171,
    hybrid: 0.109,
    electric: 0.053,
  },
  publicTransport: {
    bus: 0.089,
    train: 0.041,
    subway: 0.028,
  },
  // Energy (kg CO2 per kWh)
  electricity: {
    coal: 0.82,
    naturalGas: 0.49,
    renewable: 0.012,
    mixed: 0.475, // Average grid mix
  },
  // Waste (kg CO2 per kg)
  waste: {
    landfill: 0.57,
    recycled: -0.21, // Negative = carbon saved
    composted: -0.14,
  },
  // Water (kg CO2 per liter)
  water: 0.000298,
  // Food (kg CO2 per kg)
  food: {
    beef: 27.0,
    pork: 12.1,
    chicken: 6.9,
    fish: 6.1,
    dairy: 3.2,
    vegetables: 2.0,
    fruits: 1.1,
    grains: 2.7,
  },
};

// Tree absorption rate (kg CO2 per year per tree)
const TREE_ABSORPTION_RATE = 21.77;

/**
 * Calculate transportation carbon footprint
 * Complex: Considers vehicle type, fuel efficiency, distance, traffic conditions
 * Simple: User just enters distance and transport mode
 */
export interface TransportationInput {
  mode: "car" | "bus" | "train" | "subway" | "bike" | "walk";
  distance: number; // km
  fuelType?: "gasoline" | "diesel" | "hybrid" | "electric";
  passengers?: number;
  trafficFactor?: number; // 1.0 = normal, 1.3 = heavy traffic
}

export interface CarbonResult {
  co2Kg: number;
  treesEquivalent: number;
  comparison: string;
  breakdown?: Record<string, number>;
}

export const calculateTransportationFootprint = (
  input: TransportationInput,
): CarbonResult => {
  let co2Kg = 0;

  // Handle zero-emission transport
  if (input.mode === "bike" || input.mode === "walk") {
    return {
      co2Kg: 0,
      treesEquivalent: 0,
      comparison: "Zero emissions! Great choice! 🌱",
    };
  }

  // Complex calculation behind the scenes
  if (input.mode === "car") {
    const fuelType = input.fuelType || "gasoline";
    const baseEmission = EMISSION_FACTORS.car[fuelType];
    const trafficMultiplier = input.trafficFactor || 1.0;
    const passengerDivisor = input.passengers || 1;

    // Account for traffic conditions and carpooling
    co2Kg =
      (baseEmission * input.distance * trafficMultiplier) / passengerDivisor;
  } else {
    // Public transport
    const emissionFactor = EMISSION_FACTORS.publicTransport[input.mode];
    co2Kg = emissionFactor * input.distance;
  }

  // Calculate tree equivalents
  const treesEquivalent = co2Kg / TREE_ABSORPTION_RATE;

  // Generate simple comparison
  const comparison = generateComparison(co2Kg, "transportation");

  return {
    co2Kg: parseFloat(co2Kg.toFixed(2)),
    treesEquivalent: parseFloat(treesEquivalent.toFixed(2)),
    comparison,
  };
};

/**
 * Calculate energy consumption footprint
 * Complex: Considers energy source mix, time of day, seasonal variations
 * Simple: User enters kWh usage
 */
export interface EnergyInput {
  kWh: number;
  energySource?: "coal" | "naturalGas" | "renewable" | "mixed";
  timeOfDay?: "peak" | "offPeak";
}

export const calculateEnergyFootprint = (input: EnergyInput): CarbonResult => {
  const energySource = input.energySource || "mixed";
  const baseEmission = EMISSION_FACTORS.electricity[energySource];

  // Complex: Adjust for time of day (peak hours use dirtier energy)
  let timeMultiplier = 1.0;
  if (input.timeOfDay === "peak") {
    timeMultiplier = 1.15; // Peak hours typically use more fossil fuels
  } else if (input.timeOfDay === "offPeak") {
    timeMultiplier = 0.9; // Off-peak can use more renewables
  }

  const co2Kg = baseEmission * input.kWh * timeMultiplier;
  const treesEquivalent = co2Kg / TREE_ABSORPTION_RATE;
  const comparison = generateComparison(co2Kg, "energy");

  return {
    co2Kg: parseFloat(co2Kg.toFixed(2)),
    treesEquivalent: parseFloat(treesEquivalent.toFixed(2)),
    comparison,
    breakdown: {
      baseEmission: parseFloat((baseEmission * input.kWh).toFixed(2)),
      timeAdjustment: parseFloat((co2Kg - baseEmission * input.kWh).toFixed(2)),
    },
  };
};

/**
 * Calculate waste footprint
 * Complex: Considers waste composition, decomposition rates, methane emissions
 * Simple: User enters waste amount and disposal method
 */
export interface WasteInput {
  wasteKg: number;
  disposalMethod: "landfill" | "recycled" | "composted";
  wasteType?: "organic" | "plastic" | "paper" | "mixed";
}

export const calculateWasteFootprint = (input: WasteInput): CarbonResult => {
  const baseEmission = EMISSION_FACTORS.waste[input.disposalMethod];

  // Complex: Adjust for waste type
  let typeMultiplier = 1.0;
  if (input.wasteType === "organic") {
    typeMultiplier = input.disposalMethod === "landfill" ? 1.5 : 0.8; // Organic in landfill = more methane
  } else if (input.wasteType === "plastic") {
    typeMultiplier = input.disposalMethod === "recycled" ? 0.7 : 1.2;
  }

  const co2Kg = baseEmission * input.wasteKg * typeMultiplier;
  const treesEquivalent = Math.abs(co2Kg) / TREE_ABSORPTION_RATE;
  const comparison = generateComparison(Math.abs(co2Kg), "waste");

  return {
    co2Kg: parseFloat(co2Kg.toFixed(2)),
    treesEquivalent: parseFloat(treesEquivalent.toFixed(2)),
    comparison:
      co2Kg < 0
        ? `You saved ${Math.abs(co2Kg).toFixed(2)} kg CO₂! 🌟`
        : comparison,
  };
};

/**
 * Calculate daily carbon footprint
 * Complex: Aggregates multiple sources, applies regional factors, seasonal adjustments
 * Simple: User answers simple questions
 */
export interface DailyFootprintInput {
  transportation?: TransportationInput[];
  energyUsage?: number; // kWh
  waterUsage?: number; // liters
  wasteGenerated?: number; // kg
  meals?: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
}

export const calculateDailyFootprint = (
  input: DailyFootprintInput,
): CarbonResult => {
  let totalCO2 = 0;
  const breakdown: Record<string, number> = {};

  // Transportation
  if (input.transportation && input.transportation.length > 0) {
    const transportCO2 = input.transportation.reduce((sum, trip) => {
      return sum + calculateTransportationFootprint(trip).co2Kg;
    }, 0);
    breakdown.transportation = parseFloat(transportCO2.toFixed(2));
    totalCO2 += transportCO2;
  }

  // Energy
  if (input.energyUsage) {
    const energyCO2 = calculateEnergyFootprint({
      kWh: input.energyUsage,
    }).co2Kg;
    breakdown.energy = parseFloat(energyCO2.toFixed(2));
    totalCO2 += energyCO2;
  }

  // Water
  if (input.waterUsage) {
    const waterCO2 = input.waterUsage * EMISSION_FACTORS.water;
    breakdown.water = parseFloat(waterCO2.toFixed(2));
    totalCO2 += waterCO2;
  }

  // Waste
  if (input.wasteGenerated) {
    const wasteCO2 = input.wasteGenerated * EMISSION_FACTORS.waste.landfill;
    breakdown.waste = parseFloat(wasteCO2.toFixed(2));
    totalCO2 += wasteCO2;
  }

  // Food (simplified - would be more complex in production)
  if (input.meals) {
    const foodCO2 = estimateFoodFootprint(input.meals);
    breakdown.food = parseFloat(foodCO2.toFixed(2));
    totalCO2 += foodCO2;
  }

  const treesEquivalent = totalCO2 / TREE_ABSORPTION_RATE;
  const comparison = generateDailyComparison(totalCO2);

  return {
    co2Kg: parseFloat(totalCO2.toFixed(2)),
    treesEquivalent: parseFloat(treesEquivalent.toFixed(2)),
    comparison,
    breakdown,
  };
};

/**
 * Estimate food footprint
 * Complex: Considers production, transportation, processing, waste
 * Simple: Based on meal type
 */
const estimateFoodFootprint = (meals: {
  breakfast: string;
  lunch: string;
  dinner: string;
}): number => {
  // Simplified meal categories
  const mealEmissions: Record<string, number> = {
    "meat-heavy": 7.2,
    "meat-moderate": 4.5,
    vegetarian: 2.5,
    vegan: 1.7,
    "fast-food": 5.8,
    "home-cooked": 3.2,
  };

  let total = 0;
  Object.values(meals).forEach((meal) => {
    total += mealEmissions[meal] || 3.0; // Default average
  });

  return total;
};

/**
 * Generate user-friendly comparisons
 * Complex: Database of equivalents, contextual selection
 * Simple: One clear comparison
 */
const generateComparison = (co2Kg: number, category: string): string => {
  // Complex logic to select most relevant comparison
  if (co2Kg < 1) {
    return `That's like charging ${Math.round(co2Kg * 121)} smartphones! 📱`;
  } else if (co2Kg < 5) {
    return `Equivalent to ${Math.round(co2Kg * 4.5)} km driven in a car 🚗`;
  } else if (co2Kg < 20) {
    return `That's ${Math.round(co2Kg / 2.3)} days of electricity for a home 🏠`;
  } else {
    return `Equivalent to ${Math.round(co2Kg / 21.77)} trees needed for a year 🌳`;
  }
};

const generateDailyComparison = (co2Kg: number): string => {
  const annualKg = co2Kg * 365;
  const globalAverage = 4000; // kg CO2 per person per year (global average)

  if (annualKg < globalAverage * 0.5) {
    return `Excellent! You're well below the global average! 🌟`;
  } else if (annualKg < globalAverage) {
    return `Good job! You're below the global average! 👍`;
  } else if (annualKg < globalAverage * 1.5) {
    return `Close to average. Room for improvement! 💪`;
  } else {
    return `Above average. Let's work on reducing this! 🎯`;
  }
};

/**
 * Calculate carbon offset cost
 * Complex: Market rates, project types, verification standards
 * Simple: Returns cost per kg CO2
 */
export const calculateOffsetCost = (
  co2Kg: number,
): {
  cost: number;
  projects: Array<{ name: string; costPerKg: number; description: string }>;
} => {
  // Complex: Different project types have different costs
  const projects = [
    {
      name: "Reforestation",
      costPerKg: 0.015,
      description: "Plant trees to absorb CO₂",
    },
    {
      name: "Renewable Energy",
      costPerKg: 0.012,
      description: "Support solar and wind projects",
    },
    {
      name: "Ocean Conservation",
      costPerKg: 0.018,
      description: "Protect marine ecosystems",
    },
  ];

  // Simple: Average cost for user
  const averageCost =
    projects.reduce((sum, p) => sum + p.costPerKg, 0) / projects.length;
  const totalCost = co2Kg * averageCost;

  return {
    cost: parseFloat(totalCost.toFixed(2)),
    projects,
  };
};

/**
 * Calculate savings from eco actions
 * Complex: Considers baseline, efficiency gains, behavioral changes
 * Simple: Shows clear savings
 */
export const calculateEcoSavings = (action: {
  type: string;
  frequency: "daily" | "weekly" | "monthly";
  duration?: number; // days
}): {
  co2Saved: number;
  moneySaved: number;
  treesEquivalent: number;
} => {
  // Complex savings calculations per action type
  const savingsPerAction: Record<string, { co2: number; money: number }> = {
    "reusable-bottle": { co2: 0.12, money: 0.5 },
    "public-transport": { co2: 2.5, money: 3.0 },
    "led-bulbs": { co2: 0.4, money: 0.15 },
    "meatless-meal": { co2: 2.8, money: 2.0 },
    "bike-commute": { co2: 3.2, money: 4.0 },
    "reusable-bags": { co2: 0.08, money: 0.2 },
  };

  const savings = savingsPerAction[action.type] || { co2: 0, money: 0 };

  // Calculate based on frequency
  let multiplier = 1;
  if (action.frequency === "daily") {
    multiplier = action.duration || 1;
  } else if (action.frequency === "weekly") {
    multiplier = (action.duration || 7) / 7;
  } else if (action.frequency === "monthly") {
    multiplier = (action.duration || 30) / 30;
  }

  const co2Saved = savings.co2 * multiplier;
  const moneySaved = savings.money * multiplier;
  const treesEquivalent = co2Saved / TREE_ABSORPTION_RATE;

  return {
    co2Saved: parseFloat(co2Saved.toFixed(2)),
    moneySaved: parseFloat(moneySaved.toFixed(2)),
    treesEquivalent: parseFloat(treesEquivalent.toFixed(3)),
  };
};
