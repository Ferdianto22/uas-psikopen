# 🎯 Postel's Law - Quick Implementation Examples

## Copy-Paste Ready Code

### Example 1: Enhanced Login Form

```typescript
import { validateAndNormalizeEmail } from '@/utils/validation';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(''); // Clear error on change
  };

  const handleLogin = async () => {
    // Postel's Law: Be liberal in what you accept
    const emailValidation = validateAndNormalizeEmail(email);

    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || 'Invalid email');
      return;
    }

    // Be conservative in what you send
    await login(emailValidation.normalized, password);
  };

  return (
    <TextInput
      label="Email"
      value={email}
      onChangeText={handleEmailChange}
      error={!!emailError}
    />
    {emailError && <Text style={styles.error}>{emailError}</Text>}
  );
}
```

### Example 2: Enhanced Registration Form

```typescript
import {
  validateAndNormalizeEmail,
  validateAndNormalizeName,
  validatePassword,
} from "@/utils/validation";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async () => {
    // Clear all errors
    setNameError("");
    setEmailError("");
    setPasswordError("");

    // Validate name
    const nameValidation = validateAndNormalizeName(name);
    if (!nameValidation.isValid) {
      setNameError(nameValidation.error || "");
      return;
    }

    // Validate email
    const emailValidation = validateAndNormalizeEmail(email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || "");
      return;
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.error || "");
      return;
    }

    // Send normalized data
    await register(
      nameValidation.normalized,
      emailValidation.normalized,
      password,
    );
  };
}
```

### Example 3: Profile Edit Form with Phone

```typescript
import {
  validateAndNormalizeName,
  validateAndNormalizePhone,
} from "@/utils/validation";

const handleSaveProfile = async () => {
  const nameValidation = validateAndNormalizeName(name);
  const phoneValidation = validateAndNormalizePhone(phone);

  if (!nameValidation.isValid) {
    setNameError(nameValidation.error || "");
    return;
  }

  if (!phoneValidation.isValid) {
    setPhoneError(phoneValidation.error || "");
    return;
  }

  await updateProfile({
    name: nameValidation.normalized,
    phone: phoneValidation.normalized,
  });
};
```

### Example 4: Date Input Form

```typescript
import { validateAndNormalizeDate } from "@/utils/validation";

const handleDateChange = (text: string) => {
  setDate(text);

  // Optional: Validate on change
  const validation = validateAndNormalizeDate(text);
  if (validation.isValid) {
    setDateError("");
    // Show normalized format as hint
    setDateHint(`Will be saved as: ${validation.normalized}`);
  }
};
```

### Example 5: Number Input with Range

```typescript
import { validateAndNormalizeNumber } from "@/utils/validation";

const handleAmountChange = (text: string) => {
  setAmount(text);

  const validation = validateAndNormalizeNumber(text, {
    min: 0,
    max: 10000,
    decimals: 2,
  });

  if (!validation.isValid) {
    setAmountError(validation.error || "");
  } else {
    setAmountError("");
    // Use normalized value
    setNormalizedAmount(validation.normalized);
  }
};
```

## 🎨 Styling for Error Messages

```typescript
const styles = StyleSheet.create({
  input: {
    marginBottom: 8,
  },
  fieldError: {
    color: "#F44336",
    fontSize: 12,
    marginTop: -4,
    marginBottom: 12,
    marginLeft: 12,
  },
  hint: {
    color: "#4CAF50",
    fontSize: 12,
    marginTop: -4,
    marginBottom: 12,
    marginLeft: 12,
  },
});
```

## 🚀 Complete Form Example

```typescript
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import {
  validateAndNormalizeEmail,
  validateAndNormalizeName,
  validateAndNormalizePhone,
} from '@/utils/validation';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleSubmit = async () => {
    // Clear errors
    setNameError('');
    setEmailError('');
    setPhoneError('');

    // Validate all fields
    const nameValidation = validateAndNormalizeName(name);
    const emailValidation = validateAndNormalizeEmail(email);
    const phoneValidation = validateAndNormalizePhone(phone);

    // Check for errors
    let hasError = false;

    if (!nameValidation.isValid) {
      setNameError(nameValidation.error || '');
      hasError = true;
    }

    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || '');
      hasError = true;
    }

    if (!phoneValidation.isValid) {
      setPhoneError(phoneValidation.error || '');
      hasError = true;
    }

    if (hasError) return;

    // Submit with normalized data
    await submitContact({
      name: nameValidation.normalized,
      email: emailValidation.normalized,
      phone: phoneValidation.normalized,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Full Name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          setNameError('');
        }}
        error={!!nameError}
        style={styles.input}
      />
      {nameError ? (
        <Text style={styles.error}>{nameError}</Text>
      ) : null}

      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError('');
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        error={!!emailError}
        style={styles.input}
      />
      {emailError ? (
        <Text style={styles.error}>{emailError}</Text>
      ) : null}

      <TextInput
        mode="outlined"
        label="Phone"
        value={phone}
        onChangeText={(text) => {
          setPhone(text);
          setPhoneError('');
        }}
        keyboardType="phone-pad"
        error={!!phoneError}
        style={styles.input}
      />
      {phoneError ? (
        <Text style={styles.error}>{phoneError}</Text>
      ) : null}

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
      >
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 8,
  },
  error: {
    color: '#F44336',
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 12,
  },
  button: {
    marginTop: 16,
  },
});
```

## 📱 Test Cases

### Test Your Implementation

```typescript
// Test 1: Email with whitespace
validateAndNormalizeEmail("  user@example.com  ");
// Expected: { isValid: true, normalized: 'user@example.com' }

// Test 2: Name in all caps
validateAndNormalizeName("JOHN DOE");
// Expected: { isValid: true, normalized: 'John Doe' }

// Test 3: Phone with formatting
validateAndNormalizePhone("(555) 123-4567");
// Expected: { isValid: true, normalized: '+15551234567' }

// Test 4: Number with commas
validateAndNormalizeNumber("1,234.56");
// Expected: { isValid: true, normalized: 1234.56 }
```

## ✅ Quick Checklist

- [ ] Import validators from `@/utils/validation`
- [ ] Add state for field errors
- [ ] Clear errors on input change
- [ ] Validate on submit
- [ ] Use normalized values
- [ ] Display field-specific errors
- [ ] Test with various input formats

---

**Ready to use!** Copy any example and adapt to your needs. 🚀
