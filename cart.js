let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartIcon() {
  const cartCount = document.querySelector("#cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartIcon();
}

function getCartItems() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function toggleCart() {
  const cartElement = document.getElementById("cart");
  const cartItemsElement = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  // Toggle visibility
  cartElement.style.display = cartElement.style.display === "block" ? "none" : "block";

  // Clear current list
  cartItemsElement.innerHTML = "";

  let total = 0;
  getCartItems().forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItemsElement.appendChild(li);
    total += item.price;
  });

  cartTotalElement.textContent = total.toFixed(2);
}

// Make cart toggle work
document.addEventListener("DOMContentLoaded", () => {
  updateCartIcon();

  const cartLink = document.getElementById("cart-link");
  if (cartLink) {
    cartLink.addEventListener("click", (e) => {
      e.preventDefault();
      toggleCart();
    });
  }
});