// Product Data

let products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1499,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },

  {
    id: 2,
    name: "Smart Watch",
    price: 2499,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },

  {
    id: 3,
    name: "T-Shirt",
    price: 599,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },

  {
    id: 4,
    name: "Running Shoes",
    price: 1999,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },

  {
    id: 5,
    name: "Sneakers",
    price: 1799,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  },

  {
    id: 6,
    name: "Jacket",
    price: 1299,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
  },
];

// Get Elements

let productsContainer = document.getElementById("productsContainer");

let searchInput = document.getElementById("searchInput");

let cart = document.getElementById("cart");

let cartItems = document.getElementById("cartItems");

let cartCount = document.getElementById("cartCount");

let cartTotal = document.getElementById("cartTotal");

let overlay = document.getElementById("overlay");

// Cart

let cartData = JSON.parse(localStorage.getItem("cart")) || [];

// Display Products

function displayProducts(productList) {
  productsContainer.innerHTML = "";

  if (productList.length === 0) {
    productsContainer.innerHTML = "<h3>No products found</h3>";

    return;
  }

  productList.forEach(function (product) {
    let card = document.createElement("div");

    card.className = "product";

    card.innerHTML = `

            <img src="${product.image}" alt="${product.name}">

            <div class="productInfo">

                <h3>${product.name}</h3>

                <p class="price">
                    ₹${product.price}
                </p>

                <button
                    class="addBtn"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

            </div>

        `;

    productsContainer.appendChild(card);
  });
}

// Add To Cart

function addToCart(id) {
  let product = products.find(function (item) {
    return item.id === id;
  });

  let existingProduct = cartData.find(function (item) {
    return item.id === id;
  });

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cartData.push({
      ...product,

      quantity: 1,
    });
  }

  saveCart();

  displayCart();

  openCart();
}

// Save Cart

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartData));
}

// Display Cart

function displayCart() {
  cartItems.innerHTML = "";

  if (cartData.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  }

  let total = 0;
  let count = 0;

  cartData.forEach(function (item) {
    total += item.price * item.quantity;

    count += item.quantity;

    let div = document.createElement("div");

    div.className = "cartItem";

    div.innerHTML = `

            <div>

                <h4>${item.name}</h4>

                <p>₹${item.price}</p>

            </div>

            <div class="quantity">

                <button
                    onclick="decreaseQuantity(${item.id})">
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${item.id})">
                    +
                </button>

            </div>

        `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = total;

  cartCount.textContent = count;
}

// Increase Quantity

function increaseQuantity(id) {
  let item = cartData.find(function (item) {
    return item.id === id;
  });

  item.quantity++;

  saveCart();

  displayCart();
}

// Decrease Quantity

function decreaseQuantity(id) {
  let item = cartData.find(function (item) {
    return item.id === id;
  });

  item.quantity--;

  if (item.quantity === 0) {
    cartData = cartData.filter(function (item) {
      return item.id !== id;
    });
  }

  saveCart();

  displayCart();
}

// Open Cart

function openCart() {
  cart.classList.add("show");

  overlay.classList.add("show");
}

// Close Cart

function closeCart() {
  cart.classList.remove("show");

  overlay.classList.remove("show");
}

document.getElementById("cartBtn").addEventListener("click", openCart);

document.getElementById("closeCart").addEventListener("click", closeCart);

overlay.addEventListener("click", closeCart);

// Search

searchInput.addEventListener("input", function () {
  let search = searchInput.value.toLowerCase();

  let result = products.filter(function (product) {
    return product.name.toLowerCase().includes(search);
  });

  displayProducts(result);
});

// Category Filter

let categoryButtons = document.querySelectorAll(".categoryBtn");

categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    categoryButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    let category = button.dataset.category;

    if (category === "all") {
      displayProducts(products);
    } else {
      let result = products.filter(function (product) {
        return product.category === category;
      });

      displayProducts(result);
    }
  });
});

// Checkout

document.getElementById("checkoutBtn").addEventListener("click", function () {
  if (cartData.length === 0) {
    alert("Your cart is empty!");

    return;
  }

  alert("Order placed successfully!");

  cartData = [];

  saveCart();

  displayCart();

  closeCart();
});

// Initial Display

displayProducts(products);

displayCart();
