# 👤 User Profile Synchronization

## ✅ Changes Made

The profile system now uses **real user data** from registration instead of template data.

## 🔄 How It Works

### Before (Template Data)

```typescript
// Fixed template data
name: "Eco Warrior";
email: "eco.warrior@ecoconnect.com";
```

### After (Real User Data)

```typescript
// Uses actual registration data
name: user.name; // From registration form
email: user.email; // From registration form
```

## 📋 Updated Files

### 1. ProfileContext.tsx

**Changes**:

- Now imports `useAuth` to access authenticated user
- Creates profile from real user data
- Updates profile automatically when user logs in/out
- Uses user's actual name and email

**Code**:

```typescript
const { user } = useAuth();

const createProfileFromUser = (): UserProfile => {
  if (user) {
    return {
      id: user.id,
      name: user.name, // Real name from registration
      email: user.email, // Real email from registration
      avatar: user.avatar,
      // ... other profile data
    };
  }
  // Default for guest users
};

// Auto-update when user changes
useEffect(() => {
  setProfile(createProfileFromUser());
}, [user]);
```

### 2. Home Screen (app/(tabs)/index.tsx)

**Changes**:

- Imports `useAuth` to access user data
- Uses real user name in greeting
- Falls back to "Guest" if no user

**Code**:

```typescript
const { user } = useAuth();
const userName = user?.name || "Guest";

// Displays: "Hello, John! 👋" (actual name)
// Instead of: "Hello, Eco Warrior! 👋" (template)
```

## 🎯 User Flow

### Registration Flow

```
1. User registers with:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Password: "******"
   ↓
2. AuthContext stores user data
   ↓
3. ProfileContext syncs with AuthContext
   ↓
4. Profile shows:
   - Name: "John Doe"
   - Email: "john@example.com"
```

### Login Flow

```
1. User logs in with email/password
   ↓
2. AuthContext loads user data
   ↓
3. ProfileContext updates automatically
   ↓
4. All screens show real user data
```

### Logout Flow

```
1. User clicks logout
   ↓
2. AuthContext clears user data
   ↓
3. ProfileContext resets to guest
   ↓
4. Returns to welcome screen
```

## 📱 Where User Data Appears

### Home Screen

- ✅ Greeting: "Hello, [Real Name]! 👋"

### Profile Screen

- ✅ Name: [Real Name]
- ✅ Email: [Real Email]
- ✅ Avatar: [User Avatar]
- ✅ Bio: Editable by user

### Community Posts

- ✅ When user creates posts, uses real name
- ✅ Avatar from user profile

## 🔧 How to Test

### Test 1: Register New User

```
1. Open app
2. Click "Get Started"
3. Enter:
   - Name: "Alice Green"
   - Email: "alice@test.com"
   - Password: "123456"
4. Register
5. Check Profile → Should show "Alice Green"
6. Check Home → Should say "Hello, Alice Green! 👋"
```

### Test 2: Login Existing User

```
1. Logout if logged in
2. Click "Sign In"
3. Enter credentials
4. Login
5. Profile shows your registered name
```

### Test 3: Edit Profile

```
1. Go to Profile
2. Click edit button
3. Change name to "Alice G."
4. Save
5. Home screen updates to "Hello, Alice G.! 👋"
```

## 💾 Data Storage

### AuthContext (Authentication)

```typescript
{
  id: "user123",
  name: "John Doe",      // From registration
  email: "john@test.com", // From registration
  avatar: "https://..."
}
```

### ProfileContext (Profile Data)

```typescript
{
  id: "user123",
  name: "John Doe",      // Synced from AuthContext
  email: "john@test.com", // Synced from AuthContext
  avatar: "https://...",
  level: 4,
  points: 245,
  bio: "...",
  // ... other profile fields
}
```

## 🎨 Default Values

### New User (Just Registered)

- Name: [From registration form]
- Email: [From registration form]
- Avatar: Default avatar
- Level: 4
- Points: 245
- Bio: "Passionate about sustainability..."

### Guest User (Not Logged In)

- Name: "Guest User"
- Email: "guest@ecoconnect.com"
- Level: 1
- Points: 0
- Bio: "New to EcoConnect"

## ✅ Benefits

1. **Personalized Experience**
   - Real name in greetings
   - Actual email in profile
   - Personal data throughout app

2. **Consistent Data**
   - Profile syncs with auth automatically
   - No manual updates needed
   - Always shows current user

3. **Proper Logout**
   - Clears user data
   - Resets to guest state
   - Secure data handling

4. **Easy to Extend**
   - Add more user fields easily
   - Sync automatically
   - Maintain consistency

## 🔐 Privacy

- User data stored in AsyncStorage (local device)
- Cleared on logout
- Not shared with other users
- Secure and private

## 📝 Summary

✅ Profile now uses **real user data** from registration
✅ Name and email from registration form
✅ Auto-syncs when user logs in/out
✅ Personalized greetings throughout app
✅ No more template "Eco Warrior" data
✅ Each user sees their own information

**Result**: Every user has their own personalized profile with their actual registration data! 👤✨
