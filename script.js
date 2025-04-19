let products = JSON.parse(localStorage.getItem("products")) || [];

const productForm = document.getElementById("product-form");
const productList = document.getElementById("product-list");

function saveToLocal() {
  localStorage.setItem("products", JSON.stringify(products));
}

function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" width="100">
      <h3>${product.name}</h3>
      <p>السعر: <input type="number" value="${product.price}" onchange="updatePrice(${index}, this.value)"> ريال</p>
      <p>الكمية: <input type="number" value="${product.quantity}" onchange="updateQuantity(${index}, this.value)"> وحدة</p>
      <button onclick="deleteProduct(${index})">🗑️ حذف</button>
    `;
    productList.appendChild(productCard);
  });
}

function updatePrice(index, newPrice) {
  products[index].price = parseFloat(newPrice);
  saveToLocal();
}

function updateQuantity(index, newQuantity) {
  products[index].quantity = parseInt(newQuantity);
  saveToLocal();
}

function deleteProduct(index) {
  if (confirm("هل أنت متأكد من حذف المنتج؟")) {
    products.splice(index, 1);
    saveToLocal();
    renderProducts();
  }
}

productForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("product-name").value;
  const price = parseFloat(document.getElementById("product-price").value);
  const quantity = parseInt(document.getElementById("product-quantity").value);
  const image = document.getElementById("product-image").value;

  products.push({ name, price, quantity, image });
  saveToLocal();
  renderProducts();
  productForm.reset();
});

renderProducts();
