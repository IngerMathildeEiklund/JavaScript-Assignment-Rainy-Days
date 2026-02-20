"use strict";
import { renderOrderSummary } from "./render-order.js";

const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
const SummaryContainer = document.getElementById("ordersummary-section");
SummaryContainer.classList.add("card");

renderOrderSummary(cart, SummaryContainer);
const payOrderBTN = document.createElement("button");
payOrderBTN.classList.add("btn");
payOrderBTN.textContent = "Pay order";
SummaryContainer.appendChild(payOrderBTN);

payOrderBTN.addEventListener("click", () => {
  window.location.href = "confirmation.html";
  localStorage.clear();
});
