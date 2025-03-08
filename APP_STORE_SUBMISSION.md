
# iOS App Store Submission Guide for Still App

## Step-by-Step Guide to App Store Submission

### 1. Export & Set Up Your Project

After exporting from Lovable to your GitHub repository:

```bash
# Clone your GitHub repository
git clone [your-repo-url]
cd [your-repo-name]

# Install dependencies
npm install

# Build the project
npm run build

# Add iOS platform (if not already added)
npx cap add ios

# Sync the web code to the native platform
npx cap sync
```

### 2. Open in Xcode & Configure

```bash
# Open the iOS project in Xcode
npx cap open ios
```

In Xcode:
1. Select your team in Signing & Capabilities
2. Update Bundle Identifier if needed (should match `com.stillapp.ios`)
3. Set proper deployment target and device orientation settings

### 3. Create App in App Store Connect

Before submitting, create your app in [App Store Connect](https://appstoreconnect.apple.com):
1. Go to "My Apps" > "+" > "New App"
2. Fill in required information:
   - Platform: iOS
   - Name: Still
   - Primary language: English
   - Bundle ID: com.stillapp.ios
   - SKU: still2023 (or similar unique identifier)

### 4. Implement StoreKit for In-App Purchases

Replace the current subscription implementation with StoreKit:

```bash
# Add the Capacitor StoreKit plugin
npm install @capacitor/ios-storekit-purchases
npx cap sync
```

Then update your PaywallProvider to use the StoreKit service instead of the current implementation. The `StoreKitService.ts` file is already available in your project.

### 5. Build & Submit

In Xcode:
1. Select "Any iOS Device" as the build target
2. Go to Product > Archive
3. When the archive is complete, click "Distribute App"
4. Follow the prompts for App Store submission

### 6. Complete App Store Connect Information

In App Store Connect, complete all required information:
- App description
- Screenshots
- App icon
- Privacy policy URL
- Support URL
- App Review Information (contact details)

### 7. Submit for Review

Once all information is complete and your build is uploaded, submit for review.

## Common Issues & Troubleshooting

- **Signing Issues**: Ensure you have a valid Apple Developer account and proper certificates
- **Missing Icons**: Generate all required icon sizes using [AppIcon](https://appicon.co/)
- **Rejection Reasons**: Common reasons include metadata issues, crashes, or privacy concerns

## Resources

- [Apple App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- [TestFlight Guide](https://developer.apple.com/testflight/)
