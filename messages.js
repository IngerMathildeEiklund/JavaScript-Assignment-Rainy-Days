"use strict";
const toastContainer = document.getElementById("toast-container");

export function showToastNotification(message, type) {
  if (!toastContainer) {
    ("Toast container not found");
    return;
  }
  const toastElement = document.createElement("div");
  toastElement.setAttribute("role", "status");
  toastElement.classList.add("toast", type);
  toastElement.textContent = message;
  toastContainer.appendChild(toastElement);
  setTimeout(() => {
    toastElement.remove();
  }, 3000);
}
