import { url, ALL_PRODUCTS_ENDPOINT, ONE_PRODUCT_ENDPOINT } from "./script.js";
import { showToastNotification } from "./messages.js";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("ID from URL:", id);

const endpoint = `${ONE_PRODUCT_ENDPOINT}/${id}`;
console.log("Full endpoint", url + endpoint);
let oneProduct = {};
export let cart = [];

export function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}
export function loadCart() {
  const savedCart = localStorage.getItem("shoppingCart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}
export function addToCart(product) {
  cart.push(product);
  saveCart();
  showToastNotification(`${oneProduct.title} added to cart!`, "success");
}
const productContainer = document.getElementById("product-container");

async function getOneProduct() {
  try {
    const response = await fetch(url + endpoint);
    if (!response.ok) {
      throw new Error(`Something went wrong. ${response.status}`);
    }
    const result = await response.json();
    oneProduct = result.data;
    displayOneProduct();
  } catch (error) {
    const errorMsg = document.createElement("p");
    errorMsg.setAttribute("role", "alert");
    errorMsg.textContent = "Something went wrong, please try again later.";
    productContainer.appendChild(errorMsg);
  }
}

function displayOneProduct() {
  productContainer.classList.add("card");
  const imageContainer = document.getElementById("product-image-container");
  const productInfo = document.getElementById("product-info-container");
  const sizeAndBTNcontainer = document.getElementById(
    "size-dropdown-and-button-container",
  );
  const sizeDropdown = document.createElement("select");
  sizeDropdown.classList.add("dropdown");
  const sizePlaceholder = document.createElement("option");
  productContainer.classList.add("flex-row");
  sizeAndBTNcontainer.classList.add("size-dropdown-and-button-container");
  productInfo.classList.add("margin-left");
  const sizeLabel = document.createElement("label");
  sizeLabel.setAttribute("for", "size-dropdown");
  sizeLabel.textContent = "Select a size";
  sizeLabel.classList.add("sr-only");
  sizeDropdown.id = "size-dropdown";

  if (oneProduct.favorite === true) {
    const favoriteProduct = document.createElement("p");
    favoriteProduct.textContent = `Best seller!`;
    productInfo.appendChild(favoriteProduct);
  }
  const productImage = document.createElement("img");
  const productName = document.createElement("h3");
  const productDesc = document.createElement("p");
  const productPrice = document.createElement("h3");
  const hr = document.createElement("hr");
  const productGender = document.createElement("p");
  const productColor = document.createElement("p");
  const productTags = document.createElement("p");
  const addToCartBTN = document.createElement("button");
  productTags.textContent = `Tags: ${oneProduct.tags}`;
  addToCartBTN.textContent = "Add to cart";
  addToCartBTN.classList.add("btn");
  addToCartBTN.setAttribute("aria-label", `Add ${oneProduct.title} to cart`);
  addToCartBTN.addEventListener("click", () => {
    const selectedSize = sizeDropdown.value;
    const selectedCartItem = {
      id: oneProduct.id,
      title: oneProduct.title,
      price: oneProduct.price,
      discountedPrice: oneProduct.discountedPrice,
      onSale: oneProduct.onSale,
      image: oneProduct.image.url,
      size: selectedSize,
      quantity: 1,
    };

    if (!selectedSize) {
      showToastNotification("Please select a size!", "error");
      return;
    }
    addToCart(selectedCartItem);
  });

  productImage.src = oneProduct.image.url;
  productImage.alt = oneProduct.title;
  productName.textContent = oneProduct.title;
  productDesc.textContent = oneProduct.description;
  productPrice.textContent = `$${oneProduct.price}`;
  productPrice.setAttribute(
    "aria-label",
    `Original Price $${oneProduct.price}`,
  );
  productGender.textContent = `Fit: ${oneProduct.gender}`;
  productColor.textContent = `Color: ${oneProduct.baseColor}`;

  sizePlaceholder.textContent = "Select a size";
  sizePlaceholder.value = "";
  sizePlaceholder.disabled = true;
  sizePlaceholder.selected = true;
  sizeDropdown.appendChild(sizePlaceholder);

  oneProduct.sizes.forEach((size) => {
    const option = document.createElement("option");
    option.textContent = size;
    option.value = size;
    sizeDropdown.appendChild(option);
  });

  imageContainer.appendChild(productImage);
  productInfo.appendChild(productName);
  productInfo.appendChild(productDesc);

  if (oneProduct.onSale === true) {
    productPrice.classList.add("strike");
    const salePrice = document.createElement("p");
    salePrice.setAttribute(
      "aria-label",
      `Sale price $${oneProduct.discountedPrice}`,
    );
    salePrice.classList.add("sale-price");
    salePrice.textContent = `On sale! Now ${oneProduct.discountedPrice}`;
    productInfo.appendChild(salePrice);
  }
  productInfo.appendChild(productPrice);
  productInfo.appendChild(hr);
  productInfo.appendChild(productGender);
  productInfo.appendChild(productColor);
  productInfo.appendChild(productTags);
  productInfo.appendChild(sizeAndBTNcontainer);
  sizeAndBTNcontainer.appendChild(sizeLabel);
  sizeAndBTNcontainer.appendChild(sizeDropdown);
  sizeAndBTNcontainer.appendChild(addToCartBTN);
}
if (id) {
  getOneProduct();
}

loadCart();
