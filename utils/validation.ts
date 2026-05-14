// Postel's Law Implementation: Be liberal in what you accept, conservative in what you send
// This utility provides flexible input validation and normalization

/**
 * Email Validation - Accepts various formats
 * - Trims whitespace
 * - Converts to lowercase
 * - Accepts common email variations
 */
export const validateAndNormalizeEmail = (
  email: string,
): { isValid: boolean; normalized: string; error?: string } => {
  // Be liberal: Accept input with whitespace, mixed case
  const trimmed = email.trim().toLowerCase();

  // Basic email pattern (liberal)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!trimmed) {
    return { isValid: false, normalized: "", error: "Email is required" };
  }

  if (!emailPattern.test(trimmed)) {
    return {
      isValid: false,
      normalized: trimmed,
      error: "Please enter a valid email address",
    };
  }

  // Be conservative: Return normalized format
  return { isValid: true, normalized: trimmed };
};

/**
 * Phone Number Validation - Accepts multiple formats
 * Accepts: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890, +1 123 456 7890
 */
export const validateAndNormalizePhone = (
  phone: string,
): { isValid: boolean; normalized: string; error?: string } => {
  // Be liberal: Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, "");

  if (!cleaned) {
    return {
      isValid: false,
      normalized: "",
      error: "Phone number is required",
    };
  }

  // Extract digits only for validation
  const digitsOnly = cleaned.replace(/\+/g, "");

  // Accept 10-15 digits (flexible for international)
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return {
      isValid: false,
      normalized: phone,
      error: "Please enter a valid phone number",
    };
  }

  // Be conservative: Return normalized format (E.164 style)
  const normalized = cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
  return { isValid: true, normalized };
};

/**
 * Date Validation - Accepts multiple formats
 * Accepts: MM/DD/YYYY, DD-MM-YYYY, YYYY.MM.DD, MM DD YYYY, etc.
 */
export const validateAndNormalizeDate = (
  dateStr: string,
): { isValid: boolean; normalized: string; error?: string } => {
  // Be liberal: Accept various separators and formats
  const cleaned = dateStr.trim();

  if (!cleaned) {
    return { isValid: false, normalized: "", error: "Date is required" };
  }

  // Try to parse various formats
  const separators = /[\/\-\.\s]/;
  const parts = cleaned.split(separators).filter((p) => p);

  if (parts.length !== 3) {
    return {
      isValid: false,
      normalized: dateStr,
      error: "Please enter a valid date",
    };
  }

  let year: number, month: number, day: number;

  // Detect format based on part lengths and values
  if (parts[0].length === 4) {
    // YYYY-MM-DD format
    [year, month, day] = parts.map(Number);
  } else if (parts[2].length === 4) {
    // MM-DD-YYYY or DD-MM-YYYY
    // Assume MM-DD-YYYY for US format (can be configured)
    [month, day, year] = parts.map(Number);
  } else {
    return {
      isValid: false,
      normalized: dateStr,
      error: "Please use format MM/DD/YYYY",
    };
  }

  // Validate ranges
  if (
    year < 1900 ||
    year > 2100 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return {
      isValid: false,
      normalized: dateStr,
      error: "Please enter a valid date",
    };
  }

  // Be conservative: Return ISO format
  const normalized = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return { isValid: true, normalized };
};

/**
 * Name Validation - Accepts various formats
 * - Trims whitespace
 * - Accepts multiple spaces between names
 * - Capitalizes properly
 */
export const validateAndNormalizeName = (
  name: string,
): { isValid: boolean; normalized: string; error?: string } => {
  // Be liberal: Accept extra spaces, mixed case
  const trimmed = name.trim().replace(/\s+/g, " ");

  if (!trimmed) {
    return { isValid: false, normalized: "", error: "Name is required" };
  }

  if (trimmed.length < 2) {
    return {
      isValid: false,
      normalized: trimmed,
      error: "Name must be at least 2 characters",
    };
  }

  // Accept letters, spaces, hyphens, apostrophes
  const namePattern = /^[a-zA-Z\s\-']+$/;
  if (!namePattern.test(trimmed)) {
    return {
      isValid: false,
      normalized: trimmed,
      error: "Name can only contain letters, spaces, hyphens, and apostrophes",
    };
  }

  // Be conservative: Return properly capitalized format
  const normalized = trimmed
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return { isValid: true, normalized };
};

/**
 * Password Validation - Flexible but secure
 * - Accepts various formats
 * - Provides helpful feedback
 */
export const validatePassword = (
  password: string,
): { isValid: boolean; error?: string; strength?: string } => {
  // Be liberal: Don't trim (passwords can have intentional spaces)

  if (!password) {
    return { isValid: false, error: "Password is required" };
  }

  if (password.length < 6) {
    return { isValid: false, error: "Password must be at least 6 characters" };
  }

  // Calculate strength
  let strength = "Weak";
  if (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  ) {
    strength = "Strong";
  } else if (password.length >= 6) {
    strength = "Medium";
  }

  return { isValid: true, strength };
};

/**
 * Numeric Input Validation - Accepts various formats
 * Accepts: 1,234.56, 1234.56, 1 234.56, etc.
 */
export const validateAndNormalizeNumber = (
  value: string,
  options?: { min?: number; max?: number; decimals?: number },
): { isValid: boolean; normalized: number; error?: string } => {
  // Be liberal: Remove commas, spaces, and other separators
  const cleaned = value.trim().replace(/[,\s]/g, "");

  if (!cleaned) {
    return { isValid: false, normalized: 0, error: "Value is required" };
  }

  const num = parseFloat(cleaned);

  if (isNaN(num)) {
    return {
      isValid: false,
      normalized: 0,
      error: "Please enter a valid number",
    };
  }

  // Validate range if provided
  if (options?.min !== undefined && num < options.min) {
    return {
      isValid: false,
      normalized: num,
      error: `Value must be at least ${options.min}`,
    };
  }

  if (options?.max !== undefined && num > options.max) {
    return {
      isValid: false,
      normalized: num,
      error: `Value must be at most ${options.max}`,
    };
  }

  // Be conservative: Return normalized number
  const normalized =
    options?.decimals !== undefined
      ? parseFloat(num.toFixed(options.decimals))
      : num;

  return { isValid: true, normalized };
};

/**
 * URL Validation - Accepts various formats
 * Accepts: example.com, www.example.com, http://example.com, https://example.com
 */
export const validateAndNormalizeURL = (
  url: string,
): { isValid: boolean; normalized: string; error?: string } => {
  // Be liberal: Accept URLs with or without protocol
  let trimmed = url.trim().toLowerCase();

  if (!trimmed) {
    return { isValid: false, normalized: "", error: "URL is required" };
  }

  // Add protocol if missing
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    trimmed = "https://" + trimmed;
  }

  // Basic URL validation
  try {
    const urlObj = new URL(trimmed);
    // Be conservative: Return normalized URL
    return { isValid: true, normalized: urlObj.href };
  } catch {
    return {
      isValid: false,
      normalized: url,
      error: "Please enter a valid URL",
    };
  }
};

/**
 * Postal Code Validation - Accepts various formats
 * Accepts: 12345, 12345-6789, A1A 1A1, A1A1A1, etc.
 */
export const validateAndNormalizePostalCode = (
  code: string,
  country: "US" | "CA" | "OTHER" = "OTHER",
): { isValid: boolean; normalized: string; error?: string } => {
  // Be liberal: Accept various formats
  const cleaned = code.trim().toUpperCase();

  if (!cleaned) {
    return { isValid: false, normalized: "", error: "Postal code is required" };
  }

  if (country === "US") {
    // US ZIP code: 12345 or 12345-6789
    const usPattern = /^(\d{5})(-?\d{4})?$/;
    const match = cleaned.match(usPattern);
    if (!match) {
      return {
        isValid: false,
        normalized: code,
        error: "Please enter a valid US ZIP code",
      };
    }
    // Be conservative: Return normalized format
    const normalized = match[2]
      ? `${match[1]}-${match[2].replace("-", "")}`
      : match[1];
    return { isValid: true, normalized };
  } else if (country === "CA") {
    // Canadian postal code: A1A 1A1 or A1A1A1
    const caPattern = /^([A-Z]\d[A-Z])\s?(\d[A-Z]\d)$/;
    const match = cleaned.match(caPattern);
    if (!match) {
      return {
        isValid: false,
        normalized: code,
        error: "Please enter a valid Canadian postal code",
      };
    }
    // Be conservative: Return normalized format
    const normalized = `${match[1]} ${match[2]}`;
    return { isValid: true, normalized };
  }

  // Generic validation for other countries
  if (cleaned.length < 3 || cleaned.length > 10) {
    return {
      isValid: false,
      normalized: code,
      error: "Please enter a valid postal code",
    };
  }

  return { isValid: true, normalized: cleaned };
};

/**
 * Credit Card Validation - Accepts various formats
 * Accepts: 1234567890123456, 1234 5678 9012 3456, 1234-5678-9012-3456
 */
export const validateAndNormalizeCreditCard = (
  cardNumber: string,
): { isValid: boolean; normalized: string; type?: string; error?: string } => {
  // Be liberal: Remove spaces, dashes
  const cleaned = cardNumber.replace(/[\s\-]/g, "");

  if (!cleaned) {
    return { isValid: false, normalized: "", error: "Card number is required" };
  }

  // Check if all digits
  if (!/^\d+$/.test(cleaned)) {
    return {
      isValid: false,
      normalized: cardNumber,
      error: "Card number must contain only digits",
    };
  }

  // Luhn algorithm validation
  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  if (sum % 10 !== 0) {
    return {
      isValid: false,
      normalized: cardNumber,
      error: "Please enter a valid card number",
    };
  }

  // Detect card type
  let type = "Unknown";
  if (/^4/.test(cleaned)) type = "Visa";
  else if (/^5[1-5]/.test(cleaned)) type = "Mastercard";
  else if (/^3[47]/.test(cleaned)) type = "Amex";

  // Be conservative: Return normalized format (grouped by 4)
  const normalized = cleaned.replace(/(\d{4})/g, "$1 ").trim();

  return { isValid: true, normalized, type };
};

/**
 * Generic text validation with flexible rules
 */
export const validateText = (
  text: string,
  options?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    required?: boolean;
  },
): { isValid: boolean; normalized: string; error?: string } => {
  // Be liberal: Trim whitespace
  const trimmed = text.trim();

  if (options?.required && !trimmed) {
    return { isValid: false, normalized: "", error: "This field is required" };
  }

  if (options?.minLength && trimmed.length < options.minLength) {
    return {
      isValid: false,
      normalized: trimmed,
      error: `Must be at least ${options.minLength} characters`,
    };
  }

  if (options?.maxLength && trimmed.length > options.maxLength) {
    return {
      isValid: false,
      normalized: trimmed,
      error: `Must be at most ${options.maxLength} characters`,
    };
  }

  if (options?.pattern && !options.pattern.test(trimmed)) {
    return { isValid: false, normalized: trimmed, error: "Invalid format" };
  }

  return { isValid: true, normalized: trimmed };
};
