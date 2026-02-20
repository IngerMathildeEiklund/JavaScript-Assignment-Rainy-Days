"use strict";

export const url = "https://v2.api.noroff.dev";
export const ALL_PRODUCTS_ENDPOINT = "/rainy-days";
export const ONE_PRODUCT_ENDPOINT = "/rainy-days";
let allProducts = [];
const sectionContainer = document.querySelector(".new-arrivals");
async function getAllProducts(url, endpoint) {
  try {
    const response = await fetch(url + endpoint);

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    const result = await response.json();
    allProducts = result.data;

    displayProducts(allProducts);
  } catch (error) {
    sectionContainer.innerHTML = `<p> Could not load products, please try again later </p> ${error}`;
  }
}

function displayProducts(products) {
  const loadingStatus = document.getElementById("loading-status");
  if (loadingStatus) {
    loadingStatus.textContent = "";
  }
  if (!sectionContainer) {
    return;
  }
  sectionContainer.innerHTML = "";

  for (const product of products) {
    const productContainer = document.createElement("div");
    const productImage = document.createElement("img");
    const imageContainer = document.createElement("div");
    const productName = document.createElement("h3");
    const productPrice = document.createElement("p");
    productContainer.classList.add("card");

    productContainer.addEventListener("click", () => {
      window.location.href = `productpage.html?id=${product.id}`;
    });

    productContainer.setAttribute("role", "button");
    productContainer.setAttribute("tabindex", "0");
    productContainer.setAttribute("aria-label", `View ${product.title}`);

    productContainer.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        window.location.href = `productpage.html?id=${product.id}`;
      }
    });
    productImage.src = product.image.url;
    productImage.alt = product.title;
    productName.textContent = product.title;
    productPrice.textContent = `$${product.price}`;
    productPrice.setAttribute("aria-label", `Original price $${product.price}`);

    sectionContainer.append(productContainer);
    productContainer.append(imageContainer, productName, productPrice);
    imageContainer.append(productImage);
    imageContainer.classList.add("card-img");

    if (product.onSale) {
      const productSalePrice = document.createElement("p");
      productSalePrice.classList.add("sale-price");
      productPrice.classList.add("strike");
      productSalePrice.textContent = `On sale! Now $${product.discountedPrice}`;
      productSalePrice.setAttribute(
        "aria-label",
        `Sale price $${product.discountedPrice}`,
      );
      productContainer.append(productSalePrice);
    }
  }
}

function filterByMale() {
  const filtered = allProducts.filter((product) => product.gender === "Male");
  displayProducts(filtered);
  const filterStatus = document.getElementById("filter-status");
  if (filterStatus)
    filterStatus.textContent = `Showing ${filtered.length} products`;
}

function filterByFemale() {
  const filtered = allProducts.filter((product) => product.gender === "Female");
  displayProducts(filtered);
  const filterStatus = document.getElementById("filter-status");
  if (filterStatus)
    filterStatus.textContent = `Showing ${filtered.length} products`;
}
function filterByAll() {
  displayProducts(allProducts);
  const filterStatus = document.getElementById("filter-status");
  if (filterStatus)
    filterStatus.textContent = `Showing ${allProducts.length} products`;
}

getAllProducts(url, ALL_PRODUCTS_ENDPOINT);

if (document.getElementById("filter-dropdown")) {
  const filterDropdown = document.getElementById("filter-dropdown");
  filterDropdown.addEventListener("change", () => {
    const selectedFilter = filterDropdown.value;
    if (selectedFilter === "all") {
      filterByAll();
    } else if (selectedFilter === "male") {
      filterByMale();
    } else if (selectedFilter === "female") {
      filterByFemale();
    }
  });
}
