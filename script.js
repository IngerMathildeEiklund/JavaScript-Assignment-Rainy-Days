export const url = "https://v2.api.noroff.dev";
export const ALL_PRODUCTS_ENDPOINT = "/rainy-days";
export const ONE_PRODUCT_ENDPOINT = "/rainy-days";
let allProducts = [];

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
    console.error("Something went wrong", error);
  }
}

function displayProducts(products) {
  const sectionContainer = document.querySelector(".new-arrivals");
  if (!sectionContainer) {
    return;
  }
  sectionContainer.innerHTML = "";

  for (const product of products) {
    const productContainer = document.createElement("div");
    const productImage = document.createElement("img");
    const productName = document.createElement("h3");
    const productPrice = document.createElement("p");
    productContainer.classList.add("card");

    productContainer.addEventListener("click", () => {
      window.location.href = `productpage.html?id=${product.id}`;
    });
    productImage.src = product.image.url;
    productImage.alt = product.title;
    productName.textContent = product.title;
    productPrice.textContent = `$${product.price}`;
    sectionContainer.append(productContainer);
    productContainer.append(productImage, productName, productPrice);

    if (product.onSale) {
      const productSalePrice = document.createElement("p");
      productSalePrice.classList.add("sale-price");
      productPrice.classList.add("strike");
      productSalePrice.textContent = `On sale! Now $${product.discountedPrice}`;
      productContainer.append(productSalePrice);
    }
  }
}

function filterByMale() {
  const filtered = allProducts.filter((product) => product.gender === "Male");
  displayProducts(filtered);
}

function filterByFemale() {
  const filtered = allProducts.filter((product) => product.gender === "Female");
  displayProducts(filtered);
}

function filterByAll() {
  displayProducts(allProducts);
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
