
let isBlockingEnabled = false;
let blockedSites = [
  "facebook.com",
  "twitter.com",
  "instagram.com",
  "youtube.com",
  "reddit.com"
];

// Listen for navigation events
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (isBlockingEnabled) {
    const url = new URL(details.url);
    if (blockedSites.some(site => url.hostname.includes(site))) {
      // Redirect to our blocking page
      chrome.tabs.update(details.tabId, {
        url: chrome.runtime.getURL("blocked.html")
      });
    }
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleBlocking") {
    isBlockingEnabled = request.value;
    // Store the state
    chrome.storage.local.set({ isBlockingEnabled });
    sendResponse({ success: true });
  }
});

// Initialize state from storage
chrome.storage.local.get(['isBlockingEnabled'], (result) => {
  isBlockingEnabled = result.isBlockingEnabled || false;
});
