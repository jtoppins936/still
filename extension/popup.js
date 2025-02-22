
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleButton');
  const statusText = document.getElementById('status');
  const countdownEl = document.getElementById('countdown');
  const newSiteInput = document.getElementById('newSite');
  const addSiteButton = document.getElementById('addSiteButton');

  let countdownInterval;

  function updateCountdown(endTime) {
    if (!endTime) {
      countdownEl.textContent = '';
      return;
    }

    function updateTime() {
      const now = new Date();
      const end = new Date(endTime);
      const diff = end - now;

      if (diff <= 0) {
        countdownEl.textContent = 'Blocking period ended';
        clearInterval(countdownInterval);
        updateUI(false);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      countdownEl.textContent = `Time remaining: ${hours}h ${minutes}m`;
    }

    updateTime();
    countdownInterval = setInterval(updateTime, 60000); // Update every minute
  }

  // Initialize button state
  chrome.runtime.sendMessage({ action: "getBlockingStatus" }, (response) => {
    updateUI(response.isEnabled, response.blockEndTime);
  });

  toggleButton.addEventListener('click', () => {
    chrome.storage.local.get(['isBlockingEnabled'], (result) => {
      const newState = !result.isBlockingEnabled;
      
      chrome.runtime.sendMessage({ 
        action: "toggleBlocking", 
        value: newState 
      }, (response) => {
        if (response.success) {
          updateUI(newState, response.blockEndTime);
        }
      });
    });
  });

  addSiteButton.addEventListener('click', () => {
    const site = newSiteInput.value.trim();
    if (site) {
      chrome.runtime.sendMessage({ 
        action: "addCustomSite", 
        site: site 
      }, (response) => {
        if (response.success) {
          newSiteInput.value = '';
        }
      });
    }
  });

  function updateUI(isEnabled, endTime) {
    toggleButton.textContent = isEnabled ? 'Disable Website Blocking' : 'Enable 24h Website Blocking';
    statusText.textContent = `Blocking is currently ${isEnabled ? 'enabled' : 'disabled'}`;
    toggleButton.style.backgroundColor = isEnabled ? '#DC2626' : '#4B5563';
    updateCountdown(endTime);
  }
});
