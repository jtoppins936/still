
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleButton');
  const statusText = document.getElementById('status');

  // Initialize button state
  chrome.storage.local.get(['isBlockingEnabled'], (result) => {
    updateUI(result.isBlockingEnabled || false);
  });

  toggleButton.addEventListener('click', () => {
    chrome.storage.local.get(['isBlockingEnabled'], (result) => {
      const newState = !result.isBlockingEnabled;
      
      chrome.runtime.sendMessage({ 
        action: "toggleBlocking", 
        value: newState 
      }, (response) => {
        if (response.success) {
          updateUI(newState);
        }
      });
    });
  });

  function updateUI(isEnabled) {
    toggleButton.textContent = isEnabled ? 'Disable Website Blocking' : 'Enable Website Blocking';
    statusText.textContent = `Blocking is currently ${isEnabled ? 'enabled' : 'disabled'}`;
    toggleButton.style.backgroundColor = isEnabled ? '#DC2626' : '#4B5563';
  }
});
