// import { url, ALL_PRODUCTS_ENDPOINT, ONE_PRODUCT_ENDPOINT } from "./script.js";
import { cart, loadCart, saveCart, addToCart } from "./productpage.js";

loadCart();

const cartSummaryContainer = document.getElementById(
  "cart-and-summary-container",
);
cartSummaryContainer.classList.add("grid-2fr");

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

function displayCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = `<h3> Your cart </h3> <p> Your cart is empty </p>`;
    summaryContainer.innerHTML = "";
  } else {
    summaryContainer.innerHTML = "<h3> Order summary </h3>";
    cartContainer.innerHTML = "<h3> Your cart </h3>";
    const clearCartBTN = document.createElement("button");
    clearCartBTN.textContent = `Clear cart`;
    cartContainer.appendChild(clearCartBTN);
    clearCartBTN.addEventListener("click", () => {
      if (cart.length === 0) {
        clearCartBTN.disabled = true;
      } else {
        cart.splice(0, cart.length);
        saveCart();
        displayCart();
      }
    });
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price ? item.discountedPrice : item.price;
      const productContainer = document.createElement("div");
      const productImage = document.createElement("img");
      const productName = document.createElement("h4");
      const productSize = document.createElement("p");
      const productPrice = document.createElement("p");
      const productQuantity = document.createElement("p");
      productImage.src = item.image;
      productImage.classList.add("cart-image");
      productName.textContent = item.title;
      productPrice.textContent = ` $${item.price}`;
      productSize.textContent = `Size: ${item.size} `;
      productQuantity.textContent = `Quantity: ${item.quantity}`;

      const deleteBTN = document.createElement("button");
      deleteBTN.textContent = "Remove item";
      deleteBTN.addEventListener("click", () => {
        cart.splice(index, 1);
        saveCart();
        displayCart();
      });

      productContainer.appendChild(productImage);
      productContainer.appendChild(productName);
      productContainer.appendChild(productSize);
      if (item.onSale) {
        const salePrice = document.createElement("p");
        salePrice.classList.add("sale-price");
        productPrice.classList.add("strike");
        salePrice.textContent = `Sale! Now $${item.discountedPrice}`;
        productContainer.appendChild(salePrice);
      }
      productContainer.appendChild(productPrice);

      productContainer.appendChild(productQuantity);
      productContainer.appendChild(deleteBTN);
      cartContainer.appendChild(productContainer);
      const orderTitleSummary = document.createElement("li");
      const orderPriceSummary = document.createElement("li");
      summaryContainer.appendChild(orderTitleSummary);
      summaryContainer.appendChild(orderPriceSummary);
      orderTitleSummary.textContent = item.title;
      orderPriceSummary.textContent = item.onSale
        ? `$${item.discountedPrice}`
        : `$${item.price}`;
    });
    const orderTotal = document.createElement("p");
    orderTotal.textContent = `Order total: $${total}`;
    summaryContainer.appendChild(orderTotal);
    const checkoutBTN = document.createElement("button");
    checkoutBTN.textContent = `Continue to checkout`;
    checkoutBTN.addEventListener("click", () => {
      window.location.href = `confirmation.html`;
    });
    summaryContainer.appendChild(checkoutBTN);
  }
}

displayCart();
