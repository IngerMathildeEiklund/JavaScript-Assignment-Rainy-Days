"use strict";
import { renderOrderSummary } from "./render-order.js";

const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
const summaryContainer = document.getElementById("ordersummary-section");

if (summaryContainer) {
  summaryContainer.classList.add("card-cart");
  renderOrderSummary(cart, summaryContainer);

  const payOrderBTN = document.createElement("button");
  payOrderBTN.classList.add("btn");
  payOrderBTN.textContent = "Pay order";
  payOrderBTN.type = "button";
  summaryContainer.appendChild(payOrderBTN);

  payOrderBTN.addEventListener("click", () => {
    localStorage.removeItem("shoppingCart");
    window.location.href = "confirmation.html";
  });
}
