const url = "https://v2.api.noroff.dev";
const ALL_PRODUCTS_ENDPOINT = "/rainy-days";
const ONE_PRODUCT_ENDPOINT = "/rainy-days/<id>";

async function getAllProducts(url, endpoint) {
  try {
    const response = await fetch(url + ALL_PRODUCTS_ENDPOINT);

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    const result = await response.json();
    const products = result.data;

    for (const product of products) {
      const sectionContainer = document.querySelector(".new-arrivals");
      const productContainer = document.createElement("div");
      const productImage = document.createElement("img");
      const productName = document.createElement("h3");
      const productPrice = document.createElement("p");
      const productSalePrice = document.createElement("p");

      productImage.src = product.image.url;
      productName.textContent = product.title;
      productPrice.textContent = product.price;
      productSalePrice.textContent = product.discountedPrice;

      // Create an if statement for if onSale is true to display price, if not, do not display
      sectionContainer.append(productContainer);
      productContainer.append(
        productImage,
        productName,
        productPrice,
        productSalePrice,
      );
    }
  } catch (error) {
  } finally {
    console.log("Finished loading products.");
  }
}
getAllProducts(url, ALL_PRODUCTS_ENDPOINT);

async function getOneProduct(url, endpoint) {
  try {
    const response = await fetch(url + ONE_PRODUCT_ENDPOINT);

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    const result = await response.json();
    const oneProduct = result.data;
  } catch (error) {}
}
