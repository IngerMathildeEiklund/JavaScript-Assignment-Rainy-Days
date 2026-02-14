import { url, ALL_PRODUCTS_ENDPOINT, ONE_PRODUCT_ENDPOINT } from "./script.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log("ID from URL:", id);

const endpoint = `${ONE_PRODUCT_ENDPOINT}/${id}`;
console.log("Full endpoint", url + endpoint);
let oneProduct = {};

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
    console.error("Something went wrong", error);
  }
}

function displayOneProduct() {
  const productContainer = document.getElementById("product-container");
  const imageContainer = document.getElementById("product-image-container");
  const productInfo = document.getElementById("product-info-container");
  const sizeAndBTNcontainer = document.getElementById(
    "size-dropdown-and-button-container",
  );
  productContainer.classList.add("flex-row");
  sizeAndBTNcontainer.classList.add("size-dropdown-and-button-container");
  productInfo.classList.add("margin-left");

  if (oneProduct.favorite === true) {
    const favoriteProduct = document.createElement("p");
    favoriteProduct.textContent = `Best seller!`;
    productInfo.appendChild(favoriteProduct);
  }
  const productImage = document.createElement("img");
  const productName = document.createElement("h3");
  const productDesc = document.createElement("p");
  const productPrice = document.createElement("p");
  const productGender = document.createElement("p");
  const productColor = document.createElement("p");
  const addToCartBTN = document.createElement("button");
  addToCartBTN.textContent = "Add to cart";
  addToCartBTN.classList.add("btn");
  productImage.src = oneProduct.image.url;
  productImage.alt = oneProduct.title;
  productName.textContent = oneProduct.title;
  productDesc.textContent = oneProduct.description;
  productPrice.textContent = oneProduct.price;
  productGender.textContent = `Fit: ${oneProduct.gender}`;
  productColor.textContent = `Color: ${oneProduct.baseColor}`;
  const sizeDropdown = document.createElement("select");

  const sizePlaceholder = document.createElement("option");
  sizePlaceholder.textContent = "Select a size";
  sizePlaceholder.value = "";
  sizePlaceholder.disabled = true;
  sizePlaceholder.selected = true;
  sizeDropdown.appendChild(sizePlaceholder);
  //add CSS to the size dropdown

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
    salePrice.classList.add("sale-price");
    salePrice.textContent = `On sale! Now ${oneProduct.discountedPrice}`;
    productInfo.appendChild(salePrice);
  }
  productInfo.appendChild(productPrice);
  productInfo.appendChild(productGender);
  productInfo.appendChild(productColor);
  sizeAndBTNcontainer.appendChild(sizeDropdown);
  sizeAndBTNcontainer.appendChild(addToCartBTN);
  productInfo.appendChild(sizeAndBTNcontainer);
}

getOneProduct();

//Next step, add an event listener to add item to cart!!!!! <3
