
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
let user = null;

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

// Sync with Supabase
async function syncWithSupabase() {
  if (!user || !user.id) return;

  try {
    const response = await fetch('https://qkayjngfzatwrejndull.supabase.co/rest/v1/blocked_sites', {
      method: 'GET',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrYXlqbmdmemF0d3Jlam5kdWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2ODA3MTcsImV4cCI6MjA1NTI1NjcxN30.l8ODfig64uPYvWmnCyfuZWh0WUBC8wcuEw9CU6TqIEs',
        'Authorization': `Bearer ${user.token}`,
      }
    });
    
    if (response.ok) {
      const sites = await response.json();
      customBlockedSites = sites.map(site => site.site_domain);
      chrome.storage.local.set({ customBlockedSites });
    }
  } catch (error) {
    console.error('Error syncing with Supabase:', error);
  }
}

// Track blocked attempts
async function trackBlockedAttempt(domain) {
  if (!user || !user.id) return;

  try {
    await fetch('https://qkayjngfzatwrejndull.supabase.co/rest/v1/blocking_statistics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrYXlqbmdmemF0d3Jlam5kdWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2ODA3MTcsImV4cCI6MjA1NTI1NjcxN30.l8ODfig64uPYvWmnCyfuZWh0WUBC8wcuEw9CU6TqIEs',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        user_id: user.id,
        site_domain: domain,
        blocked_count: 1
      })
    });
  } catch (error) {
    console.error('Error tracking blocked attempt:', error);
  }
}

// Show notification reminder about digital sabbath
function showReminderNotification() {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'images/icon128.png',
    title: 'Digital Sabbath Reminder',
    message: 'You are currently on a digital sabbath. Remember to disconnect and be present.',
    priority: 2
  });
}

// Listen for navigation events
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  checkBlockingStatus();
  
  if (isBlockingEnabled) {
    const url = new URL(details.url);
    const allBlockedSites = [...defaultBlockedSites, ...customBlockedSites];
    if (allBlockedSites.some(site => url.hostname.includes(site))) {
      trackBlockedAttempt(url.hostname);
      chrome.tabs.update(details.tabId, {
        url: chrome.runtime.getURL("blocked.html")
      });
      
      // Show a reminder notification when site is blocked
      showReminderNotification();
    }
  }
});

// Check if the current time matches any scheduled blocking periods
function checkScheduledBlocking() {
  chrome.storage.local.get(['blockingSchedules'], (result) => {
    const schedules = result.blockingSchedules || [];
    
    if (schedules.length === 0) return;
    
    const now = new Date();
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
    
    // Check if current time falls within any of the scheduled blocks
    for (const schedule of schedules) {
      if (schedule.days_of_week.includes(dayOfWeek)) {
        if (schedule.start_time <= currentTime && currentTime <= schedule.end_time) {
          if (!isBlockingEnabled) {
            // Enable blocking and set the end time to the end of the scheduled period
            const [endHours, endMinutes] = schedule.end_time.split(':').map(Number);
            const endTimeDate = new Date();
            endTimeDate.setHours(endHours, endMinutes, 0, 0);
            
            isBlockingEnabled = true;
            blockEndTime = endTimeDate.toISOString();
            
            chrome.storage.local.set({ 
              isBlockingEnabled: true,
              blockEndTime
            });
            
            // Show a notification that scheduled blocking has begun
            chrome.notifications.create({
              type: 'basic',
              iconUrl: 'images/icon128.png',
              title: 'Digital Sabbath Activated',
              message: 'Your scheduled digital sabbath period has begun. Take this time to disconnect.',
              priority: 2
            });
          }
          return;
        }
      }
    }
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case "toggleBlocking":
      isBlockingEnabled = request.value;
      if (isBlockingEnabled) {
        // Set 24 hour block period
        blockEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        
        // Show notification when user enables blocking manually
        showReminderNotification();
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
      
    case "updateBlockingSchedules":
      chrome.storage.local.set({ blockingSchedules: request.schedules });
      sendResponse({ success: true });
      break;
  }
});

// Initialize state from storage
chrome.storage.local.get(
  ['isBlockingEnabled', 'blockEndTime', 'customBlockedSites', 'blockingSchedules'], 
  (result) => {
    isBlockingEnabled = result.isBlockingEnabled || false;
    blockEndTime = result.blockEndTime || null;
    customBlockedSites = result.customBlockedSites || [];
    checkBlockingStatus();
  }
);

// Check scheduled blocking every minute
setInterval(checkScheduledBlocking, 60000);
