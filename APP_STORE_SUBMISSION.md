
# iOS App Store Submission Guide for Still App

## Pre-Submission Checklist

### 1. Complete Capacitor Setup

After you've exported this project to your GitHub repository:

```bash
# Clone your GitHub repository
git clone [your-repo-url]
cd [your-repo-name]

# Install dependencies
npm install

# Build the project
npm run build

# Add iOS platform
npx cap add ios

# Sync the web code to the native platform
npx cap sync
```

### 2. App Icons and Splash Screens

Generate iOS app icons using a tool like [AppIcon](https://appicon.co/) or [MakeAppIcon](https://makeappicon.com/). Place the generated icons in the appropriate directories in your iOS project.

For splash screens, you can use Capacitor's official plugin:

```bash
npm install @capacitor/splash-screen
npx cap sync
```

Configure splash screens in Xcode following Apple's guidelines.

### 3. App Store Connect Setup

1. Create an Apple Developer account if you don't have one
2. Register a new app in App Store Connect
3. Prepare all required information:
   - App name: "Still"
   - Primary category: Health & Fitness or Lifestyle
   - Secondary category: Productivity

### 4. App Store Metadata

Prepare the following:

- App description (short and long versions)
- Keywords for App Store search
- Support URL
- Marketing URL (optional)
- Privacy Policy URL (required)
- App Store screenshots for various devices
- App Preview videos (optional)

### 5. In-App Purchases Setup

For the $2.99/month subscription:

1. Create a new in-app purchase in App Store Connect
2. Set up subscription groups and pricing
3. Create a paywall that uses StoreKit instead of the current implementation

### 6. Implement StoreKit for Subscription

The current subscription implementation in `PaywallProvider.tsx` needs to be replaced with StoreKit integration.

### 7. Final Testing

Before submission:

1. Test the app on multiple iOS devices
2. Verify that the subscription flow works correctly
3. Ensure all Apple guidelines are met

### 8. Submission Process

1. Upload the build using Xcode or Transporter
2. Complete the submission form in App Store Connect
3. Submit for review

## Additional Resources

- [Apple App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)
- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
