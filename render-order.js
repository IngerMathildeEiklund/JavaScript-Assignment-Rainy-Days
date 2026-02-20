"use strict";
export function renderOrderSummary(cart, summaryContainer) {
  const summaryList = document.createElement("ul");
  summaryList.setAttribute("aria-label", "Order summary items");
  summaryContainer.appendChild(summaryList);

  cart.forEach((item) => {
    const orderTitleSummary = document.createElement("li");
    const orderPriceSummary = document.createElement("li");
    orderTitleSummary.textContent = item.title;
    orderPriceSummary.textContent = item.onSale
      ? `$${item.discountedPrice}`
      : `$${item.price}`;
    orderPriceSummary.setAttribute(
      "aria-label",
      item.onSale
        ? `Sale price $${item.discountedPrice}`
        : `Price $${item.price}`,
    );
    const hr = document.createElement("hr");
    orderPriceSummary.appendChild(hr);
    summaryList.appendChild(orderTitleSummary);
    summaryList.appendChild(orderPriceSummary);
  });
  const total = cart.reduce((sum, item) => {
    return sum + (item.onSale ? item.discountedPrice : item.price);
  }, 0);
  const orderTotal = document.createElement("h3");
  orderTotal.textContent = `Order total: $${total.toFixed(2)}`;
  orderTotal.setAttribute("aria-label", `Order total $${total.toFixed(2)}`);
  summaryContainer.appendChild(orderTotal);
}
