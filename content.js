// content.js

// Step 1: Inject styles directly into the page
const style = document.createElement('style');
style.innerHTML = `
  .custom-context-menu {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 5px;
    z-index: 9999;
    font-size: 14px;
  }

  .custom-context-menu .show-messages-option {
    padding: 8px 12px;
    cursor: pointer;
  }

  .custom-context-menu .show-messages-option:hover {
    background-color: #f0f0f0;
  }
`;
// Add the style to the head of the document
document.head.appendChild(style);

// Step 2: Listen for right-click on contact names
document.addEventListener("contextmenu", (event) => {
  // Log the event target to see what element is being clicked
  console.log(event.target);

  // Check if the clicked element is a contact name (using the class name "_ahxj")
  const contactElement = event.target.closest("._ahxj");

  if (contactElement) {
    console.log("Contact element clicked:", contactElement);
    // Prevent the default context menu from appearing
    event.preventDefault();

    // Show custom context menu on the right-clicked contact
    showCustomContextMenu(contactElement, event.pageX, event.pageY);
  }
});

// Step 3: Function to show the custom context menu
function showCustomContextMenu(contactElement, x, y) {
  // Remove any previously shown custom menus
  const existingMenu = document.querySelector(".custom-context-menu");
  if (existingMenu) {
    existingMenu.remove();
  }

  // Create the custom menu
  const menu = document.createElement("div");
  menu.classList.add("custom-context-menu");

  // Add the "Show All Messages" option
  const showMessagesOption = document.createElement("div");
  showMessagesOption.classList.add("show-messages-option");
  showMessagesOption.textContent = "Show All Messages";
  showMessagesOption.addEventListener("click", () => {
    // Get the contact's name and filter the messages
    const contactName = contactElement.innerText.trim();
    console.log("Contact name to filter:", contactName); // Debugging line
    filterMessages(contactName);
    menu.remove(); // Close the custom menu after clicking
  });

  // Add the option to the menu
  menu.appendChild(showMessagesOption);

  // Log the position to check if it's being displayed correctly
  console.log("Show custom menu at:", x, y);

  // Position the menu near the mouse click
  menu.style.position = "absolute";
  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;

  // Append the menu to the document body
  document.body.appendChild(menu);
}

// Step 4: Function to filter messages based on contact name
function filterMessages(contactName) {
  // Debugging: Check if we're selecting the messages correctly
  console.log("Filtering messages for:", contactName);

  // Adjust the selector for message bubbles in WhatsApp Web
  const messages = document.querySelectorAll(".message-out, .message-in"); // Adjust the selector for message bubbles
  
  messages.forEach((message) => {
    // Adjust to get the sender's name inside the message
    const sender = message.querySelector("span[title]"); // Look for span elements with a 'title' attribute for sender names
    console.log("Sender name:", sender ? sender.innerText : "No sender found"); // Debugging line

    // If sender name matches the contact name, show the message, otherwise hide it
    if (sender && sender.innerText.trim() !== contactName) {
      message.style.display = "none"; // Hide messages not from the selected contact
    } else {
      message.style.display = "block"; // Show messages from the selected contact
    }
  });
}

// Step 5: Close the custom context menu when clicking outside
document.addEventListener("click", () => {
  const existingMenu = document.querySelector(".custom-context-menu");
  if (existingMenu) {
    existingMenu.remove();
  }
});
