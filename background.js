chrome.runtime.onInstalled.addListener(() => {
  // Create the context menu item when the extension is installed
  chrome.contextMenus.create({
    id: "showMessages",
    title: "Show All Messages", // This is the text that will show up in the context menu
    contexts: ["all"], // Make it available for all right-click contexts
  });
});

// Handle the click event when the user selects the context menu option
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "showMessages") {
    // Execute the script on the current tab when "Show All Messages" is clicked
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // Dispatch an event to filter messages for the selected contact
        document.dispatchEvent(new CustomEvent("filterMessages"));
      }
    });
  }
});
