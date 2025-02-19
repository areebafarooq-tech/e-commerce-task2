
// Product Data Array
const products = [
    { name: "Sweet White", price: 128, image: "/Assets/grid-item-1.png", rating: 4.5 },
    { name: "Coffee Brown", price: 250, image: "/Assets/grid-item-2.png", rating: 4.2 },
    { name: "Fun Green", price: 145, image: "/Assets/grid-item-3.png", rating: 4.7 },
    { name: "Cute Pink", price: 230, image: "/Assets/grid-item-4.png", rating: 4.6 },
    { name: "Stylish Grey", price: 165, image: "/Assets/grid-item-5.png", rating: 4.4 },
    { name: "Sweet White", price: 128, image: "/Assets/grid-item-1.png", rating: 4.5 },
    { name: "Coffee Brown", price: 250, image: "/Assets/grid-item-2.png", rating: 4.2 },
    { name: "Fun Green", price: 145, image: "/Assets/grid-item-3.png", rating: 4.7 },
    { name: "Cute Pink", price: 230, image: "/Assets/grid-item-4.png", rating: 4.6 },
    { name: "Stylish Grey", price: 165, image: "/Assets/grid-item-5.png", rating: 4.4 },
    { name: "Sweet White", price: 128, image: "/Assets/grid-item-1.png", rating: 4.5 },
    { name: "Coffee Brown", price: 250, image: "/Assets/grid-item-2.png", rating: 4.2 },
    { name: "Fun Green", price: 145, image: "/Assets/grid-item-3.png", rating: 4.7 },
    { name: "Cute Pink", price: 230, image: "/Assets/grid-item-4.png", rating: 4.6 },
    { name: "Stylish Grey", price: 165, image: "/Assets/grid-item-5.png", rating: 4.4 },
    { name: "Sweet White", price: 128, image: "/Assets/grid-item-1.png", rating: 4.5 },
    { name: "Coffee Brown", price: 250, image: "/Assets/grid-item-2.png", rating: 4.2 },
    { name: "Fun Green", price: 145, image: "/Assets/grid-item-3.png", rating: 4.7 },
    { name: "Cute Pink", price: 230, image: "/Assets/grid-item-4.png", rating: 4.6 },
    { name: "Stylish Grey", price: 165, image: "/Assets/grid-item-5.png", rating: 4.4 }
];

// Function to generate products
function displayProducts() {
    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = ""; // Clear existing products

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    products.forEach((product) => {
        // Create product card
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        // Check if product is in wishlist
        let isInWishlist = wishlist.some(item => item.name === product.name);

        // Generate star rating dynamically
        const fullStars = Math.floor(product.rating);
        const halfStar = product.rating % 1 >= 0.5 ? "⭐" : "";
        const stars = "⭐".repeat(fullStars) + halfStar;

        // Insert product details
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onclick="viewProductDetail('${product.name}', ${product.price}, '${product.image}', ${product.rating})">
            <h3>${product.name}</h3>
            <div class="rating">${stars} <span class="review-score">${product.rating}/5</span></div>
            <p class="price">$${product.price}</p>
            <button onclick="addToWishlist('${product.name}', ${product.price}, '${product.image}', this)">
                <span class="wishlist-icon">${isInWishlist ? "❤️" : "🤍"}</span> Wishlist
            </button>
        `;

        productGrid.appendChild(productElement);
    });
}

// Function to add/remove items from wishlist
function addToWishlist(name, price, image, button) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let index = wishlist.findIndex(item => item.name === name);

    if (index === -1) {
        wishlist.push({ name, price, image });
        button.querySelector(".wishlist-icon").textContent = "❤️"; // Change to filled heart
    } else {
        wishlist.splice(index, 1); // Remove from wishlist if already added
        button.querySelector(".wishlist-icon").textContent = "🤍"; // Change to empty heart
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Function to redirect to product detail page
function viewProductDetail(name, price, image, rating) {
    window.location.href = `product-detail.html?name=${encodeURIComponent(name)}&price=${price}&image=${encodeURIComponent(image)}&rating=${rating}`;
}

// Load products when the page loads
window.onload = displayProducts;




