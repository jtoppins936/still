
# Stillness.io iOS App Store Submission Guide

## Prerequisites

1. Apple Developer Program account ($99/year)
2. Xcode installed on a Mac
3. App Store Connect access
4. Capacitor project (already configured)

## Step 1: Prepare Your Capacitor Project

1. Ensure all your web code is production-ready
2. Update the version in package.json
3. Build your web application:

```bash
npm run build
```

4. Sync with Capacitor to update the iOS project:

```bash
npx cap sync ios
```

## Step 2: Open and Configure Xcode Project

1. Open the iOS project in Xcode:

```bash
npx cap open ios
```

2. In Xcode, configure the following:

   a. Update Bundle Identifier to match `com.stillness.io`
   b. Set your Team ID in Signing & Capabilities
   c. Set Deployment Target to iOS 16.0
   d. Check that all required app icons are present
   e. Verify Info.plist has all necessary entries and permissions
   f. Update App Display Name to "Stillness.io"

3. Set Version and Build Number
   - Version: semantic version (e.g., 1.0.0)
   - Build: incremental number (e.g., 1)

## Step 3: App Store Connect Setup

1. Create a new app in App Store Connect:
   - Go to [App Store Connect](https://appstoreconnect.apple.com/)
   - Click "My Apps" → "+" → "New App"
   - Select iOS as the platform
   - Enter app name: "Stillness.io"
   - Select primary language
   - Bundle ID: Select the bundle ID you configured in Xcode
   - SKU: A unique identifier (e.g., "stillness2023")

2. Configure App Information:
   - App Store Information (description, keywords, support URL, marketing URL)
   - Privacy Policy URL
   - App Rating information
   - App Review Information (contact info, notes for reviewers)
   - Version Information

3. Configure In-App Purchases (if applicable):
   - Create in-app purchase products
   - Configure pricing and availability
   - Add descriptions and review information

## Step 4: Prepare App Screenshots and Assets

1. Create screenshots for all required device sizes:
   - iPhone 6.5" Display (iPhone 14 Pro Max)
   - iPhone 5.5" Display (iPhone 8 Plus)
   - iPad Pro 12.9" (3rd gen)
   - iPad Pro 12.9" (2nd gen)

2. Create App Preview videos (optional but recommended)

3. Ensure you have a proper App Icon in all required sizes

## Step 5: Archive and Upload

1. In Xcode, select a generic iOS device as the build target
2. Select Product → Archive
3. When archive completes, the Organizer window will appear
4. Click "Distribute App"
5. Select "App Store Connect" and click "Next"
6. Select appropriate options for distribution
7. Click "Upload" to send the build to App Store Connect

## Step 6: Submit for Review

1. Wait for the build to process in App Store Connect
2. Go to the app's page in App Store Connect
3. Select the build under the "Build" section
4. Complete all required fields if not already done
5. Click "Submit for Review"

## Common App Store Rejection Reasons to Avoid

1. Metadata issues
   - Incomplete information
   - Inaccurate descriptions
   - Missing privacy policy
   - Poor quality screenshots

2. Functionality issues
   - Crashes or bugs
   - Broken links
   - Non-functioning features
   - Placeholder content

3. Design issues
   - Poor UI/UX
   - Non-standard iOS interface elements
   - Poor performance

4. Legal/Content issues
   - Copyright infringement
   - Objectionable content
   - Unrestricted web content without proper filtering

5. In-App Purchase issues
   - Not using Apple's in-app purchase system
   - Incomplete IAP implementation
   - Missing restoration mechanism

## Final Checklist Before Submission

- App runs without crashing on all supported iOS versions and devices
- All features function as expected
- StoreKit integration works properly
- App has all required icons and launch screens
- All placeholder content has been replaced
- Privacy policy is accessible and complete
- No references to beta/test versions in the app
- App follows Human Interface Guidelines
- In-app purchases can be restored

## Post-Submission

Be ready to respond quickly to any questions or concerns from the App Review team. They may reach out via email or phone if they encounter issues during review.

## Resources

- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [TestFlight Beta Testing](https://developer.apple.com/testflight/)
- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
