// import { url, ALL_PRODUCTS_ENDPOINT, ONE_PRODUCT_ENDPOINT } from "./script.js";
import { cart, loadCart, saveCart } from "./productpage.js";
import { renderOrderSummary } from "./render-order.js";

loadCart();

const cartSummaryContainer = document.getElementById(
  "cart-and-summary-container",
);

const cartContainer = document.getElementById("cart-container");
const summaryContainer = document.getElementById("summary-container");
const cartTitle = document.createElement("h2");
const summaryTitle = document.createElement("h2");
cartTitle.textContent = "Your cart";
summaryTitle.textContent = "Order summary";
cartSummaryContainer.appendChild(cartContainer);
cartSummaryContainer.appendChild(summaryContainer);
cartContainer.append(cartTitle);
summaryContainer.append(summaryTitle);

function displayCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = `<h2> Your cart </h2> <p> No items found in cart! Let's go shopping! <button class="btn" id="return-to-homepage"> Go to homepage <button> </p>`;
    const returnToHomepageBTN = document.getElementById("return-to-homepage");
    returnToHomepageBTN.addEventListener("click", () => {
      window.location.href = "index.html";
    });
    summaryContainer.innerHTML = "";
    const bagImage = document.createElement("img");
    bagImage.src = "svg/shopping-bag-cart-svgrepo-com.svg";
    cartContainer.appendChild(bagImage);
  } else {
    summaryContainer.innerHTML = "<h2> Order summary </h2>";

    cartContainer.innerHTML = "<h2> Your cart </h2>";
    const clearCartBTN = document.createElement("button");
    clearCartBTN.textContent = `Clear cart`;
    clearCartBTN.classList.add("clearBTN");

    clearCartBTN.addEventListener("click", () => {
      if (cart.length === 0) {
        clearCartBTN.disabled = true;
      } else {
        cart.splice(0, cart.length);
        saveCart();
        displayCart();
      }
    });
    cart.forEach((item, index) => {
      const productContainer = document.createElement("div");
      const productImage = document.createElement("img");
      const productName = document.createElement("h3");
      const productSize = document.createElement("p");
      const productPrice = document.createElement("h4");
      const productQuantity = document.createElement("p");
      productImage.src = item.image;
      productImage.classList.add("cart-image");
      productName.textContent = item.title;
      productPrice.textContent = ` $${item.price}`;
      productSize.textContent = `Size: ${item.size} `;
      productQuantity.textContent = `Quantity: ${item.quantity}`;

      const deleteBTN = document.createElement("button");
      deleteBTN.textContent = "Remove item";
      deleteBTN.classList.add("btn");
      deleteBTN.classList.add("margin-block");
      deleteBTN.addEventListener("click", () => {
        cart.splice(index, 1);
        saveCart();
        displayCart();
      });

      productContainer.appendChild(productImage);
      productContainer.appendChild(productName);
      productContainer.appendChild(productSize);
      productContainer.appendChild(productPrice);
      if (item.onSale) {
        const salePrice = document.createElement("p");
        salePrice.classList.add("sale-price");
        productPrice.classList.add("strike");
        salePrice.textContent = `Sale! Now $${item.discountedPrice}`;
        productContainer.appendChild(salePrice);
      }

      productContainer.appendChild(productQuantity);
      productContainer.appendChild(deleteBTN);
      cartContainer.appendChild(productContainer);
      cartContainer.appendChild(clearCartBTN);
    });
    renderOrderSummary(cart, summaryContainer);
    const checkoutBTN = document.createElement("button");
    checkoutBTN.textContent = `Continue to checkout`;
    checkoutBTN.classList.add("btn");
    checkoutBTN.addEventListener("click", () => {
      window.location.href = `details.html`;
    });
    summaryContainer.appendChild(checkoutBTN);
  }
}

displayCart();
