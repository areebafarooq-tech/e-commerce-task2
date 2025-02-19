// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


// Populate product details dynamically
document.addEventListener("DOMContentLoaded", function () {
    const productImage = document.getElementById("productImage");
    const productName = document.getElementById("productName");
    const originalPriceElem = document.getElementById("originalPrice");
    const productPriceElem = document.getElementById("productPrice");
    const productCategory = document.getElementById("productCategory");
    const addToCartBtn = document.getElementById("addToCart");
    const colorOptions = document.querySelectorAll(".color-option");
    const sizeOptions = document.querySelectorAll(".size-option");

    // Get product details from URL
    const productImageUrl = getQueryParam("image");
    const productTitle = getQueryParam("name");
    const productPrice = parseFloat(getQueryParam("price"));
    const category = getQueryParam("category") || "T-shirts";

    // Calculate and display prices
    let originalPrice = (productPrice * 1.2).toFixed(2);
    productImage.src = productImageUrl;
    productName.innerText = productTitle;
    originalPriceElem.innerText = `$${originalPrice}`;
    productPriceElem.innerText = `$${productPrice.toFixed(2)}`;
    productCategory.innerText = category;

    // Handle color selection
    let selectedColor = "";
    colorOptions.forEach(color => {
        color.addEventListener("click", function () {
            colorOptions.forEach(c => c.classList.remove("selected"));
            this.classList.add("selected");
            selectedColor = this.getAttribute("data-color");
        });
    });

    // Handle size selection
    let selectedSize = "";
    sizeOptions.forEach(size => {
        size.addEventListener("click", function () {
            sizeOptions.forEach(s => s.classList.remove("selected"));
            this.classList.add("selected");
            selectedSize = this.innerText;
        });
    });

    // Add to Cart Functionality
    addToCartBtn.addEventListener("click", function () {
        if (!selectedColor || !selectedSize) {
            alert("Please select a color and size before adding to cart.");
            return;
        }

        // Retrieve the cart from localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Create new cart item
        let newItem = {
            name: productTitle,
            price: productPrice,
            image: productImageUrl,
            color: selectedColor,
            size: selectedSize,
            quantity: 1
        };

        // Check if the item already exists in the cart
        let existingItem = cart.find(item => 
            item.name === newItem.name &&
            item.color === newItem.color &&
            item.size === newItem.size
        );

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push(newItem);
        }

        // Save updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Show notification message
        showNotification("Item has been added to cart!");
    });

    // Sample Related Products
    const relatedProducts = [
        { name: "Printed Pink Tshirt", price: 120, image: "/Assets/grid-item-4.png" },
        { name: "Typography Tee", price: 110, image: "/Assets/grid-item-3.png" },
        { name: "Printed Dark Blue Tshirt", price: 130, image: "/Assets/grid-item-5.png" }
    ];

    const relatedContainer = document.getElementById("relatedProducts");
    relatedProducts.forEach(product => {
        let productElement = document.createElement("div");
        productElement.classList.add("related-item");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name}</p>
            <p class="price">$${product.price}</p>
        `;
        relatedContainer.appendChild(productElement);
    });
});
