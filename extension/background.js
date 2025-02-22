
let isBlockingEnabled = false;
let blockEndTime = null;
let defaultBlockedSites = [
  "facebook.com",
  "twitter.com",
  "instagram.com",
  "youtube.com",
  "reddit.com",
  "tiktok.com",
  "x.com",
  "linkedin.com",
  "pinterest.com",
  "tumblr.com"
];

let customBlockedSites = [];

// Check if blocking should be disabled
function checkBlockingStatus() {
  if (blockEndTime && new Date() >= new Date(blockEndTime)) {
    isBlockingEnabled = false;
    blockEndTime = null;
    chrome.storage.local.set({ 
      isBlockingEnabled: false,
      blockEndTime: null
    });
  }
}

// Listen for navigation events
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  checkBlockingStatus();
  
  if (isBlockingEnabled) {
    const url = new URL(details.url);
    const allBlockedSites = [...defaultBlockedSites, ...customBlockedSites];
    if (allBlockedSites.some(site => url.hostname.includes(site))) {
      chrome.tabs.update(details.tabId, {
        url: chrome.runtime.getURL("blocked.html")
      });
    }
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case "toggleBlocking":
      isBlockingEnabled = request.value;
      if (isBlockingEnabled) {
        // Set 24 hour block period
        blockEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      } else {
        blockEndTime = null;
      }
      chrome.storage.local.set({ 
        isBlockingEnabled,
        blockEndTime
      });
      sendResponse({ 
        success: true,
        blockEndTime 
      });
      break;
      
    case "addCustomSite":
      if (request.site) {
        customBlockedSites.push(request.site);
        chrome.storage.local.set({ customBlockedSites });
        sendResponse({ success: true });
      }
      break;
      
    case "getBlockingStatus":
      sendResponse({ 
        isEnabled: isBlockingEnabled,
        blockEndTime,
        customBlockedSites
      });
      break;
  }
});

// Initialize state from storage
chrome.storage.local.get(
  ['isBlockingEnabled', 'blockEndTime', 'customBlockedSites'], 
  (result) => {
    isBlockingEnabled = result.isBlockingEnabled || false;
    blockEndTime = result.blockEndTime || null;
    customBlockedSites = result.customBlockedSites || [];
    checkBlockingStatus();
  }
);
