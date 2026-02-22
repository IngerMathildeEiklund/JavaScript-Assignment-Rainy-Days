"use strict";

export const url = "https://v2.api.noroff.dev";
export const ALL_PRODUCTS_ENDPOINT = "/rainy-days";
export const ONE_PRODUCT_ENDPOINT = "/rainy-days";
let allProducts = [];
const sectionContainer = document.querySelector(".new-arrivals");
async function getAllProducts(url, endpoint) {
  if (!sectionContainer) {
    return;
  }
  try {
    const response = await fetch(url + endpoint);

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    const result = await response.json();
    if (!Array.isArray(result.data)) {
      throw new Error("Unexpected API response format");
    }
    allProducts = result.data;

    displayProducts(allProducts);
  } catch (error) {
    sectionContainer.innerHTML = `<p> Could not load products, please try again later </p>`;
  }
}

function displayProducts(products) {
  try {
    const loadingStatus = document.getElementById("loading-status");
    if (loadingStatus) {
      loadingStatus.textContent = "";
    }
    if (!sectionContainer) {
      return;
    }
    sectionContainer.innerHTML = "";
    if (products.length === 0) {
      sectionContainer.innerHTML = "<p> No products found </p>";
      return;
    }

    for (const product of products) {
      const productContainer = document.createElement("div");
      const productImage = document.createElement("img");
      const imageContainer = document.createElement("div");
      const productName = document.createElement("h3");
      const productPrice = document.createElement("p");

      productContainer.classList.add("card");
      imageContainer.classList.add("card-img");
      productContainer.setAttribute("role", "button");
      productContainer.setAttribute("tabindex", "0");
      productContainer.setAttribute("aria-label", `View ${product.title}`);

      productImage.src = product.image.url;
      productImage.alt = product.title;

      productName.textContent = product.title;

      productPrice.textContent = `$${product.price}`;
      productPrice.setAttribute(
        "aria-label",
        `Original price $${product.price}`,
      );
      productContainer.addEventListener("click", () => {
        window.location.href = `productpage.html?id=${product.id}`;
      });

      productContainer.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          window.location.href = `productpage.html?id=${product.id}`;
        }
      });
      imageContainer.append(productImage);
      productContainer.append(imageContainer, productName, productPrice);
      sectionContainer.append(productContainer);
      if (product.onSale) {
        const productSalePrice = document.createElement("p");
        productSalePrice.classList.add("sale-price");
        productSalePrice.textContent = `On sale! Now $${product.discountedPrice}`;
        productSalePrice.setAttribute(
          "aria-label",
          `Sale price $${product.discountedPrice}`,
        );
        productPrice.classList.add("strike");

        productPrice.after(productSalePrice);
      }
      if (product.favorite === true) {
        const popularDiv = document.createElement("div");
        const popularTag = document.createElement("p");
        popularDiv.classList.add("popular");
        popularTag.textContent = `Best seller!`;
        popularDiv.appendChild(popularTag);
        productContainer.appendChild(popularDiv);
      }
    }
  } catch (error) {
    sectionContainer.innerHTML =
      "<p> Could not load products, please try again later </p>";
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
function filterByBestSeller() {
  const filtered = allProducts.filter((product) => product.favorite === true);
  displayProducts(filtered);
  const filterStatus = document.getElementById("filter-status");
  if (filterStatus)
    filterStatus.textContent = `Showing ${filtered.length} products`;
}
function sortByHighToLowPrice() {
  const sorted = [...allProducts].sort((a, b) => {
    const priceA = a.discountedPrice || a.price;
    const priceB = b.discountedPrice || b.price;

    return priceB - priceA;
  });
  const filterStatus = document.getElementById("filter-status");
  if (filterStatus)
    filterStatus.textContent = `Showing ${sorted.length} products`;
  displayProducts(sorted);
}
function sortByLowToHighPrice() {
  const sorted = [...allProducts].sort((a, b) => {
    const priceA = a.discountedPrice || a.price;
    const priceB = b.discountedPrice || b.price;

    return priceA - priceB;
  });
  const filterStatus = document.getElementById("filter-status");
  if (filterStatus)
    filterStatus.textContent = `Showing ${sorted.length} products`;
  displayProducts(sorted);
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
    } else if (selectedFilter === "best-seller") {
      filterByBestSeller();
    } else if (selectedFilter === "high-low") {
      sortByHighToLowPrice();
    } else if (selectedFilter === "low-high") {
      sortByLowToHighPrice();
    }
  });
}
