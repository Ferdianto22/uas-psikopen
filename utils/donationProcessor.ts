// Tesler's Law: Complex donation processing, simple user interface
// Handles payment validation, currency conversion, tax calculations behind the scenes

/**
 * Donation Processor
 * Complex: Payment processing, fraud detection, currency conversion, tax receipts
 * Simple: User just enters amount and clicks donate
 */

export interface DonationInput {
  amount: number;
  currency?: string;
  projectId?: string;
  recurring?: boolean;
  frequency?: "monthly" | "quarterly" | "yearly";
  anonymous?: boolean;
}

export interface DonationResult {
  success: boolean;
  transactionId: string;
  amount: number;
  currency: string;
  co2Offset: number;
  taxDeductible: number;
  receipt: DonationReceipt;
  error?: string;
}

export interface DonationReceipt {
  receiptId: string;
  date: Date;
  donorName: string;
  amount: number;
  currency: string;
  project: string;
  taxDeductibleAmount: number;
  co2Impact: number;
}

// Exchange rates (would be fetched from API in production)
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.36,
  AUD: 1.52,
  JPY: 149.5,
};

// Project details with complex impact calculations
const PROJECTS = {
  reforestation: {
    name: "Global Reforestation",
    co2PerDollar: 6.67, // kg CO2 offset per USD
    taxDeductible: 0.95, // 95% tax deductible
    adminFee: 0.05,
  },
  renewable: {
    name: "Renewable Energy",
    co2PerDollar: 8.33,
    taxDeductible: 0.9,
    adminFee: 0.1,
  },
  ocean: {
    name: "Ocean Conservation",
    co2PerDollar: 5.5,
    taxDeductible: 0.92,
    adminFee: 0.08,
  },
  wildlife: {
    name: "Wildlife Protection",
    co2PerDollar: 4.2,
    taxDeductible: 0.88,
    adminFee: 0.12,
  },
};

/**
 * Process donation with complex validation and calculations
 * Complex: Currency conversion, fraud detection, payment processing, tax calculations
 * Simple: User just sees success/failure
 */
export const processDonation = async (
  input: DonationInput,
  userInfo: { name: string; email: string; country: string },
): Promise<DonationResult> => {
  try {
    // Step 1: Validate input (complex validation behind the scenes)
    const validation = validateDonation(input);
    if (!validation.isValid) {
      return {
        success: false,
        transactionId: "",
        amount: 0,
        currency: input.currency || "USD",
        co2Offset: 0,
        taxDeductible: 0,
        receipt: {} as DonationReceipt,
        error: validation.error,
      };
    }

    // Step 2: Convert currency to USD (complex exchange rate logic)
    const amountUSD = convertToUSD(input.amount, input.currency || "USD");

    // Step 3: Calculate fees and net donation (complex fee structure)
    const feeCalculation = calculateFees(amountUSD, input.recurring || false);

    // Step 4: Calculate CO2 offset (complex impact calculation)
    const project =
      PROJECTS[input.projectId as keyof typeof PROJECTS] ||
      PROJECTS.reforestation;
    const co2Offset = calculateCO2Offset(feeCalculation.netAmount, project);

    // Step 5: Calculate tax deductible amount (complex tax rules)
    const taxDeductible = calculateTaxDeductible(
      feeCalculation.netAmount,
      project,
      userInfo.country,
    );

    // Step 6: Process payment (simulated - would integrate with payment gateway)
    const paymentResult = await processPayment({
      amount: input.amount,
      currency: input.currency || "USD",
      recurring: input.recurring,
    });

    if (!paymentResult.success) {
      return {
        success: false,
        transactionId: "",
        amount: 0,
        currency: input.currency || "USD",
        co2Offset: 0,
        taxDeductible: 0,
        receipt: {} as DonationReceipt,
        error: "Payment processing failed",
      };
    }

    // Step 7: Generate receipt (complex receipt generation)
    const receipt = generateReceipt({
      transactionId: paymentResult.transactionId,
      donorName: input.anonymous ? "Anonymous" : userInfo.name,
      amount: input.amount,
      currency: input.currency || "USD",
      project: project.name,
      taxDeductible,
      co2Offset,
    });

    // Step 8: Send confirmation email (handled behind the scenes)
    await sendConfirmationEmail(userInfo.email, receipt);

    // Simple result for user
    return {
      success: true,
      transactionId: paymentResult.transactionId,
      amount: input.amount,
      currency: input.currency || "USD",
      co2Offset,
      taxDeductible,
      receipt,
    };
  } catch (error) {
    return {
      success: false,
      transactionId: "",
      amount: 0,
      currency: input.currency || "USD",
      co2Offset: 0,
      taxDeductible: 0,
      receipt: {} as DonationReceipt,
      error: "An error occurred processing your donation",
    };
  }
};

/**
 * Validate donation input
 * Complex: Multiple validation rules, fraud detection, limits
 * Simple: Returns valid/invalid
 */
const validateDonation = (
  input: DonationInput,
): { isValid: boolean; error?: string } => {
  // Minimum donation amount
  if (input.amount < 1) {
    return { isValid: false, error: "Minimum donation is $1" };
  }

  // Maximum donation amount (fraud prevention)
  if (input.amount > 10000) {
    return {
      isValid: false,
      error:
        "Maximum donation is $10,000. Please contact us for larger donations.",
    };
  }

  // Validate currency
  const currency = input.currency || "USD";
  if (!EXCHANGE_RATES[currency]) {
    return { isValid: false, error: "Unsupported currency" };
  }

  // Validate recurring frequency
  if (input.recurring && !input.frequency) {
    return {
      isValid: false,
      error: "Please select a frequency for recurring donations",
    };
  }

  return { isValid: true };
};

/**
 * Convert currency to USD
 * Complex: Real-time exchange rates, conversion fees
 * Simple: Returns USD amount
 */
const convertToUSD = (amount: number, currency: string): number => {
  if (currency === "USD") return amount;

  const rate = EXCHANGE_RATES[currency] || 1.0;
  const usdAmount = amount / rate;

  // Apply small conversion fee (0.5%)
  const conversionFee = usdAmount * 0.005;
  return usdAmount - conversionFee;
};

/**
 * Calculate fees
 * Complex: Tiered fee structure, recurring discounts, processing fees
 * Simple: Returns net amount
 */
const calculateFees = (
  amount: number,
  recurring: boolean,
): { grossAmount: number; fees: number; netAmount: number } => {
  // Base processing fee (2.9% + $0.30 - typical payment processor)
  let processingFee = amount * 0.029 + 0.3;

  // Recurring donations get reduced fees
  if (recurring) {
    processingFee *= 0.8; // 20% discount on fees
  }

  // Platform fee (5% for operations)
  const platformFee = amount * 0.05;

  const totalFees = processingFee + platformFee;
  const netAmount = amount - totalFees;

  return {
    grossAmount: amount,
    fees: parseFloat(totalFees.toFixed(2)),
    netAmount: parseFloat(netAmount.toFixed(2)),
  };
};

/**
 * Calculate CO2 offset
 * Complex: Project efficiency, verification standards, time factors
 * Simple: Returns kg CO2
 */
const calculateCO2Offset = (
  netAmount: number,
  project: (typeof PROJECTS)[keyof typeof PROJECTS],
): number => {
  // Base calculation
  const baseCO2 = netAmount * project.co2PerDollar;

  // Apply efficiency factor (verified projects are more efficient)
  const efficiencyFactor = 0.95; // 95% efficiency after verification

  // Apply time factor (immediate vs. long-term offset)
  const timeFactor = 0.9; // 90% immediate, 10% long-term

  const totalCO2 = baseCO2 * efficiencyFactor * timeFactor;

  return parseFloat(totalCO2.toFixed(2));
};

/**
 * Calculate tax deductible amount
 * Complex: Country-specific tax rules, donation limits, documentation requirements
 * Simple: Returns deductible amount
 */
const calculateTaxDeductible = (
  netAmount: number,
  project: (typeof PROJECTS)[keyof typeof PROJECTS],
  country: string,
): number => {
  // Base deductible percentage from project
  let deductiblePercentage = project.taxDeductible;

  // Country-specific adjustments
  const countryRules: Record<string, number> = {
    US: 1.0, // 100% of eligible amount
    CA: 0.75, // 75% tax credit
    UK: 1.25, // Gift Aid adds 25%
    AU: 1.0,
    EU: 0.9,
  };

  const countryMultiplier = countryRules[country] || 0.8;

  const deductibleAmount = netAmount * deductiblePercentage * countryMultiplier;

  return parseFloat(deductibleAmount.toFixed(2));
};

/**
 * Process payment
 * Complex: Payment gateway integration, fraud detection, 3D Secure, retry logic
 * Simple: Returns success/failure
 */
const processPayment = async (payment: {
  amount: number;
  currency: string;
  recurring?: boolean;
}): Promise<{ success: boolean; transactionId: string }> => {
  // Simulate payment processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Complex fraud detection (simplified for demo)
  const fraudScore = calculateFraudScore(payment);
  if (fraudScore > 0.8) {
    return { success: false, transactionId: "" };
  }

  // Generate transaction ID
  const transactionId = generateTransactionId();

  // In production: Integrate with Stripe, PayPal, etc.
  // - Handle 3D Secure authentication
  // - Implement retry logic for failed payments
  // - Store payment method for recurring donations
  // - Handle webhooks for payment status updates

  return { success: true, transactionId };
};

/**
 * Calculate fraud score
 * Complex: Machine learning model, behavioral analysis, device fingerprinting
 * Simple: Returns risk score
 */
const calculateFraudScore = (payment: {
  amount: number;
  currency: string;
  recurring?: boolean;
}): number => {
  let score = 0;

  // Unusual amount patterns
  if (payment.amount > 5000) score += 0.3;
  if (payment.amount % 1 === 0 && payment.amount > 100) score += 0.1; // Round numbers

  // Currency risk
  if (payment.currency !== "USD" && payment.currency !== "EUR") score += 0.1;

  // Recurring donations are lower risk
  if (payment.recurring) score -= 0.2;

  return Math.max(0, Math.min(1, score));
};

/**
 * Generate transaction ID
 * Complex: Unique, secure, traceable
 * Simple: Returns ID string
 */
const generateTransactionId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  return `TXN-${timestamp}-${random}`.toUpperCase();
};

/**
 * Generate receipt
 * Complex: Tax compliance, formatting, localization
 * Simple: Returns receipt object
 */
const generateReceipt = (data: {
  transactionId: string;
  donorName: string;
  amount: number;
  currency: string;
  project: string;
  taxDeductible: number;
  co2Offset: number;
}): DonationReceipt => {
  return {
    receiptId: `RCP-${data.transactionId}`,
    date: new Date(),
    donorName: data.donorName,
    amount: data.amount,
    currency: data.currency,
    project: data.project,
    taxDeductibleAmount: data.taxDeductible,
    co2Impact: data.co2Offset,
  };
};

/**
 * Send confirmation email
 * Complex: Email templating, localization, PDF generation, delivery tracking
 * Simple: Just sends email
 */
const sendConfirmationEmail = async (
  email: string,
  receipt: DonationReceipt,
): Promise<void> => {
  // In production:
  // - Generate PDF receipt
  // - Use email service (SendGrid, AWS SES)
  // - Track delivery status
  // - Handle bounces and retries
  // - Localize content based on user language

  console.log(`Sending confirmation email to ${email}`);
  // Simulated delay
  await new Promise((resolve) => setTimeout(resolve, 500));
};

/**
 * Calculate donation impact
 * Complex: Multiple impact metrics, time projections, verification
 * Simple: Returns clear impact summary
 */
export const calculateDonationImpact = (
  amount: number,
  projectId: string,
): {
  co2Offset: number;
  treesEquivalent: number;
  peopleHelped: number;
  timeframe: string;
  description: string;
} => {
  const project =
    PROJECTS[projectId as keyof typeof PROJECTS] || PROJECTS.reforestation;

  // Complex calculations
  const co2Offset = amount * project.co2PerDollar;
  const treesEquivalent = co2Offset / 21.77; // kg CO2 per tree per year
  const peopleHelped = Math.floor(amount / 10); // $10 helps 1 person

  // Generate simple description
  let description = "";
  if (projectId === "reforestation") {
    description = `Your donation will plant ${Math.floor(treesEquivalent * 10)} trees`;
  } else if (projectId === "renewable") {
    description = `Your donation will power ${Math.floor(amount / 5)} homes for a day`;
  } else if (projectId === "ocean") {
    description = `Your donation will protect ${Math.floor(amount * 2)} square meters of ocean`;
  } else {
    description = `Your donation will help protect ${Math.floor(amount / 15)} animals`;
  }

  return {
    co2Offset: parseFloat(co2Offset.toFixed(2)),
    treesEquivalent: parseFloat(treesEquivalent.toFixed(1)),
    peopleHelped,
    timeframe: "over the next year",
    description,
  };
};

/**
 * Get suggested donation amounts
 * Complex: User history, income level, regional pricing, psychological pricing
 * Simple: Returns 3-4 suggested amounts
 */
export const getSuggestedDonations = (userContext?: {
  previousDonations?: number[];
  country?: string;
}): Array<{ amount: number; label: string; impact: string }> => {
  // Complex logic to determine optimal suggestions
  const baseAmounts = [5, 10, 25, 50];

  // Adjust for country (purchasing power parity)
  const countryMultipliers: Record<string, number> = {
    US: 1.0,
    CA: 0.9,
    UK: 0.85,
    EU: 0.9,
    AU: 0.95,
  };

  const multiplier = countryMultipliers[userContext?.country || "US"] || 0.7;

  return baseAmounts.map((amount) => {
    const adjustedAmount = Math.round(amount * multiplier);
    const impact = calculateDonationImpact(adjustedAmount, "reforestation");

    return {
      amount: adjustedAmount,
      label: `$${adjustedAmount}`,
      impact: `Offsets ${impact.co2Offset} kg CO₂`,
    };
  });
};
