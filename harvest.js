
// HARVEST HUB PRODUCTS

const products = [
    {
        name: "Apples",
        category: "Fruits",
        price: 1000,
        image: "apples.jpg"
    },
    {
        name: "Bananas",
        category: "Fruits",
        price: 3000,
        image: "bananas.jpg"
    },
    {
        name: "Fresh tomatoes",
        category: "Vegetables",
        price: 4000,
        image: "fresh tomatoes.jpg"
    },
    {
        name: "Fresh Carrots",
        category: "Vegetables",
        price: 3500,
        image: "Fresh Carrots.jpg"
    },
    {
        name: "Rice",
        category: "Cereals",
        price: 6000,
        image: "rice.jpg"
    },
    {
        name: "Maize Flour",
        category: "Cereals",
        price: 4500,
        image: "maize flour.jpg"
    },
    {
        name: "Fresh Milk",
        category: "Dairy",
        price: 5000,
        image: "fresh milk.jpg"
    },
    {
        name: "Yoghurt",
        category: "Dairy",
        price: 4000,
        image: "yoghurt.jpg"
    },
    // ADDITIONAL HARVEST HUB PRODUCTS

{
    name: "Oranges",
    category: "Fruits",
    price: 3000,
    image: "oranges.jpg"
},

{
    name: "Mangoes",
    category: "Fruits",
    price: 2500,
    image: "mangoes.jpg"
},

{
    name: "Pineapples",
    category: "Fruits",
    price: 5000,
    image: "pine apples.jpg"
},

{
    name: "Onions",
    category: "Vegetables",
    price: 2000,
    image: "onions.jpg"
},

{
    name: "Irish Potatoes",
    category: "Vegetables",
    price: 4000,
    image: "irish potatoes.jpg"
},

{
    name: "Green Pepper",
    category: "Vegetables",
    price: 1500,
    image: "green pepper.jpg"
},

{
    name: "Beans",
    category: "Cereals",
    price: 5000,
    image: "beans.jpg"
},

{
    name: "Passion fruit",
    category: "Fruits",
    price: 2500,
    image: "passion fruit.jpg"
},
{
    name: "Cow peas",
    category: "Cereals",
    price: 2500,
    image: "Cow peas.jpg"
},
{
    name: "Egg plant",
    category: "Vegetables",
    price: 1000,
    image: "egg plant.jpg"
},{
    name: "Ginger",
    category: "Fruits",
    price: 500,
    image: "ginger.jpg"
},
{
    name: "Grapes",
    category: "Fruits",
    price: 5000,
    image: "grapes.jpg"
},
{
    name: "Millet flour",
    category: "cereals",
    price: 4500,
    image: "millet flour.jpg"
},
{
    name: "Oats",
    category: "Cereals",
    price: 2500,
    image: "oats.jpg"
},
{
    name: "Water melon",
    category: "Fruits",
    price: 5500,
    image: "water melon.jpg"
},
{
    name: "Strawberry",
    category: "Fruits",
    price: 6500,
    image: "strawberry.jpg"
},
{
    name: "sugar cubes",
    category: "Dairy",
    price: 4500,
    image: "sugar cubes.jpg"
},
{
    name: "Sweet potatoes",
    category: "Cereals",
    price: 3600,
    image: "sweet potatoes.jpg"
},
{
    name: "Salt",
    category: "Dairy",
    price: 1500,
    image: "salt.jpg"
},
{
    name: "Vineger",
    category: "Dairy",
    price: 5000,
    image: "vinegar.jpg"
},

];

let cart = [];

// DISPLAY PRODUCTS

function displayProducts(items) {
    const productGrid = document.getElementById("productGrid");

    productGrid.innerHTML = "";

    if (items.length === 0) {
        productGrid.innerHTML = "<p>No products found.</p>";
        return;
    }

    items.forEach((product) => {
        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `
            <img src="${product.image}"
                 alt="${product.name}"
                 onerror="this.src='https://placehold.co/400x250?text=Harvest+Hub'">

            <div class="product-info">
                <h3>${product.name}</h3>

                <p class="price">
                    UGX ${product.price.toLocaleString()}
                </p>

                <button>
                    Add to Cart
                </button>
            </div>
        `;

        productCard.querySelector("button").addEventListener(
            "click",
            () => addToCart(product)
        );

        productGrid.appendChild(productCard);
    });
}

// FILTER PRODUCTS

function filterProducts(category) {
    if (category === "All") {
        displayProducts(products);
    } else {
        const filtered = products.filter(
            product => product.category === category
        );

        displayProducts(filtered);
    }
}

// SEARCH PRODUCTS

function searchProducts() {
    const searchInput = document
        .getElementById("searchInput")
        .value.toLowerCase();

    const results = products.filter(product =>
        product.name.toLowerCase().includes(searchInput) ||
        product.category.toLowerCase().includes(searchInput)
    );

    displayProducts(results);
}

// ADD TO CART

function addToCart(product) {
    const existingItem = cart.find(
        item => item.name === product.name
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    alert(product.name + " added to your cart!");
}

// UPDATE CART

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>UGX ${item.price.toLocaleString()}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>

                <button onclick="removeFromCart(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    cartCount.textContent = count;
    cartTotal.textContent = total.toLocaleString();

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }
}

// REMOVE FROM CART

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// OPEN AND CLOSE CART

function toggleCart() {
    const cartOverlay = document.getElementById("cartOverlay");

    if (cartOverlay.style.display === "flex") {
        cartOverlay.style.display = "none";
    } else {
        cartOverlay.style.display = "flex";
    }
}

// CHECKOUT

function checkout() {
    if (cart.length === 0) {
        alert("Your shopping cart is empty!");
        return;
    }

    alert(
        "Thank you for shopping with Harvest Hub! " +
        "Your demo order total is UGX " +
        document.getElementById("cartTotal").textContent
    );

    cart = [];
    updateCart();
    toggleCart();
}

// INITIALIZE WEBSITE

displayProducts(products);
updateCart();
