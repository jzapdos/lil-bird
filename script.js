let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const radios = document.querySelectorAll('input[type="radio"]');

function showNextSlide() {

  radios[currentIndex].checked = false;


  currentIndex = (currentIndex + 1) % slides.length;


  radios[currentIndex].checked = true;
}

setInterval(showNextSlide, 3000);







let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartIcon() {
  document.querySelector("#cart-count").textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function addToCart(product) {
  const existingItem = cart.find(item => item.name === product.name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCartIcon();
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  saveCart();
  renderCart();
  updateCartIcon();
}

function decreaseQuantity(name) {
  const item = cart.find(item => item.name === name);
  if (item) {
    item.quantity--;
    if (item.quantity <= 0) {
      removeFromCart(name);
    } else {
      saveCart();
      renderCart();
      updateCartIcon();
    }
  }
}

function renderCart() {
  const cartElement = document.getElementById("cart");
  const cartItemsElement = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  cartItemsElement.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
      <button class="remove-btn" data-name="${item.name}">🗑️</button>
      <button class="decrease-btn" data-name="${item.name}">➖</button>
    `;

    cartItemsElement.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotalElement.textContent = total.toFixed(2);

  // Bind buttons
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.name));
  });

  document.querySelectorAll(".decrease-btn").forEach(btn => {
    btn.addEventListener("click", () => decreaseQuantity(btn.dataset.name));
  });
}

function toggleCart() {
  const cartElement = document.getElementById("cart");
  cartElement.style.display = cartElement.style.display === "block" ? "none" : "block";
  renderCart();
}

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