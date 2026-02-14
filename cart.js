import { url, ALL_PRODUCTS_ENDPOINT, ONE_PRODUCT_ENDPOINT } from "./script.js";

const cartSummaryContainer = document.getElementById(
  "cart-and-summary-container",
);
cartSummaryContainer.classList.add("flex-row");
const cartContainer = document.getElementById("cart-container");
const summaryContainer = document.getElementById("summary-container");

const cartTitle = document.createElement("h3");
const summaryTitle = document.createElement("h3");
cartTitle.textContent = "Your cart";
summaryTitle.textContent = "Order summary";
cartSummaryContainer.appendChild(cartContainer);
cartSummaryContainer.appendChild(summaryContainer);
cartContainer.append(cartTitle);
summaryContainer.append(summaryTitle);

if (!localStorage.getItem("shoppingCart")) {
  cartContainer.innerHTML =
    "<h3> Your cart </h3> <p> Your cart is empty...sad </p>";
}

//add the export the loadcart function and run it here
