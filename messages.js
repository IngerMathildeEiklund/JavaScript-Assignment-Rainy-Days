const toastContainer = document.getElementById("toast-container");

export function showToastNotification(message, type) {
  const toastElement = document.createElement("div");
  toastElement.classList.add("toast", type);
  toastElement.textContent = message;
  toastContainer.appendChild(toastElement);
  setTimeout(() => {
    toastElement.remove();
  }, 3000);
}
