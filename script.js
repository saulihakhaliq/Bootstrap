const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 49.99,
    image: "img2.avif"
  },
  {
    id: 2,
    name: "Classic Watch",
    category: "Fashion",
    price: 79.99,
    image: "img3.avif"
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Fashion",
    price: 59.99,
    image: "img4.jpeg"
  },
  {
    id: 4,
    name: "Desk Lamp",
    category: "Home",
    price: 30.99,
    image: " img5.jpg"
  },
  {
    id: 5,
    name: "Smart Speaker",
    category: "Electronics",
    price: 39.99,
    image: "img6.jpg" 
  },
  {
    id: 6,
    name: "Travel Backpack",
    category: "Fashion",
    price: 44.99,
    image: "img7.webp" 
  },
  {
    id: 7,
    name: "Decoration piece",
    category: "Home",
    price: 54.99,
    image: "img8.webp" 
  },
   {
    id: 8,
    name: "Handbag",
    category: "Fashion",
    price: 44.99, 
    image: "img9.webp" 
  },
   {
    id: 8,
    name: "Laptop",
    category: "Electronics",
    price: 88.99, 
    image: "img9.jpg" 
  }

];

let cart = [];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

const money = amount => `$${amount.toFixed(2)}`;

function renderProducts() {
  const search = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  let filtered = products.filter(product =>
    product.name.toLowerCase().includes(search) &&
    (category === "all" || product.category === category)
  );

  if (sortFilter.value === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortFilter.value === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  productList.innerHTML = filtered.map(product => `
    <div class="col-6 col-md-4 col-lg-4">
      <div class="card product-card shadow-sm">
        <img class="product-image"
             src="${product.image}"
             alt="${product.name}"
             loading="lazy">
        <div class="card-body d-flex flex-column">
          <small class="text-muted">${product.category}</small>
          <h5 class="card-title mt-1">${product.name}</h5>
          <p class="price">${money(product.price)}</p>
          <button class="btn btn-primary mt-auto"
                  onclick="addToCart(${product.id})">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join("");

  document.getElementById("emptyMessage")
    .classList.toggle("d-none", filtered.length > 0);
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }

  renderCart();
}

function changeQuantity(id, amount) {
  const item = cart.find(item => item.id === id);
  if (!item) return;

  item.quantity += amount;
  cart = cart.filter(item => item.quantity > 0);
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

function renderCart() {
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);

  document.getElementById("cartCount").textContent = totalItems;
  document.getElementById("cartTotal").textContent = money(total);

  document.getElementById("cartItems").innerHTML = cart.length
    ? cart.map(item => {
        const product = products.find(p => p.id === item.id);

        return `
          <div class="cart-row">
            <div class="fw-semibold">${product.name}</div>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <div class="btn-group btn-group-sm">
                <button class="btn btn-outline-secondary"
                        onclick="changeQuantity(${item.id}, -1)">−</button>
                <button class="btn btn-outline-secondary" disabled>
                  ${item.quantity}
                </button>
                <button class="btn btn-outline-secondary"
                        onclick="changeQuantity(${item.id}, 1)">+</button>
              </div>
              <span>${money(product.price * item.quantity)}</span>
              <button class="btn btn-sm btn-outline-danger"
                      onclick="removeFromCart(${item.id})">
                Remove
              </button>
            </div>
          </div>
        `;
      }).join("")
    : '<p class="text-muted">Your cart is empty.</p>';
}

searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
sortFilter.addEventListener("change", renderProducts);

document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();
  renderProducts();
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Demo checkout: connect a backend and payment provider to place orders.");
});

renderProducts();
renderCart();

