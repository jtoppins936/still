
# iOS App Store Submission Checklist for Stillness.io

## Pre-Submission Preparation

### Xcode Project & Building
- [ ] Update app version and build number in Xcode
- [ ] Ensure proper bundle identifier (com.stillness.io) is set
- [ ] Validate all permissions in Info.plist are properly configured
- [ ] Check that all assets (icons, splash screens) are properly included
- [ ] Run and test on multiple iOS devices (iPhone and iPad if supported)
- [ ] Test in both light and dark mode
- [ ] Test all features for functionality and performance
- [ ] Test all UI elements for proper scaling and appearance

### In-App Purchases (if applicable)
- [ ] Configure and test all in-app purchases
- [ ] Create App Store Connect in-app purchase products
- [ ] Implement StoreKit for handling purchases
- [ ] Test purchase flow, including restoration

### App Store Connect Setup
- [ ] Create App Store Connect entry for the app
- [ ] Add required app information (description, keywords, etc.)
- [ ] Upload screenshots for all supported devices
- [ ] Add app preview videos (optional but recommended)
- [ ] Complete all required App Store information fields
- [ ] Set up app privacy details in App Store Connect

## Submission Process

### Archive & Upload
- [ ] Clean the project (Product → Clean Build Folder)
- [ ] Create Archive of the app (Product → Archive)
- [ ] Validate Archive in Xcode
- [ ] Upload to App Store Connect via Xcode

### App Store Connect Final Steps
- [ ] Select build for review
- [ ] Complete "Version Information"
- [ ] Answer all App Review Information questions
- [ ] Provide demo account if login is required
- [ ] Complete "App Privacy" section
- [ ] Verify all app store screenshots and previews
- [ ] Submit for review

## Common Rejection Reasons to Avoid
- [ ] Incomplete information or metadata
- [ ] Placeholder or Lorem Ipsum text anywhere in the app
- [ ] Mentioning other platforms (like Android)
- [ ] Incomplete in-app purchase implementation
- [ ] Crashes or bugs during review
- [ ] Mentioning "beta" or "test" in the app or metadata
- [ ] Missing privacy policy
- [ ] Inadequate content filtering if user-generated content is present
- [ ] Poor user interface or user experience
- [ ] References to "App Store" in marketing materials or app UI

## Post-Submission
- [ ] Monitor App Store Connect for review status
- [ ] Be prepared to quickly address any issues raised by reviewers
- [ ] Have testing devices ready if expedited review communication is needed

## Final Production Readiness
- [ ] Server environments are ready for production traffic
- [ ] Analytics are properly implemented
- [ ] Error reporting systems are in place
- [ ] Customer support system is ready
