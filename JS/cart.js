document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cartItems");
    const subtotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total");
    const relatedProductsContainer = document.getElementById("relatedProducts");
    const popupContainer = document.getElementById("popupContainer");
    const popupContent = document.getElementById("popupContent");
    const closePopup = document.getElementById("closePopup");
    const confirmAdd = document.getElementById("confirmAdd");

    let selectedProduct = null;

    // Retrieve cart items from local storage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ""; // Clear previous cart items
        let subtotal = 0;

        cart.forEach((item, index) => {
            subtotal += item.price * item.quantity;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <p><strong>${item.name}</strong></p>
                        <p>Color: ${item.color}, Size: ${item.size}</p>
                        <p>Price: $${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <div class="cart-quantity">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <p class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-item" onclick="removeFromCart(${index})">🗑️</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        let tax = subtotal * 0.05;
        let shipping = cart.length > 0 ? 5 : 0;
        let total = subtotal + tax + shipping;

        subtotalElement.innerText = `$${subtotal.toFixed(2)}`;
        taxElement.innerText = `$${tax.toFixed(2)}`;
        totalElement.innerText = `$${total.toFixed(2)}`;
    }

    window.updateQuantity = (index, change) => {
        if (cart[index].quantity + change > 0) {
            cart[index].quantity += change;
        } else {
            cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    };

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    };

    updateCartDisplay();

    const relatedProducts = [
        { name: "Black Track Suit", price: 29.99, image: "/Assets/browse-range-img-1.png" },
        { name: "Hoodie", price: 39.99, image: "/Assets/inspiration-img-2.png" },
        { name: "Pink Hoodie", price: 24.99, image: "/Assets/inspiration-img-3.png" }
    ];

    function displayRelatedProducts() {
        relatedProductsContainer.innerHTML = "";

        if (relatedProducts.length === 0) {
            relatedProductsContainer.innerHTML = "<p>No recommendations available.</p>";
            return;
        }

        relatedProducts.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add("related-item");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <p>${product.name}</p>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="openPopup('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
            `;
            relatedProductsContainer.appendChild(productCard);
        });
    }

    window.openPopup = (name, price, image) => {
        selectedProduct = { name, price, image };
        popupContainer.style.display = "block";
    };

    closePopup.addEventListener("click", () => {
        popupContainer.style.display = "none";
    });

    confirmAdd.addEventListener("click", () => {
        const selectedColor = document.querySelector('input[name="color"]:checked')?.value;
        const selectedSize = document.querySelector('input[name="size"]:checked')?.value;

        if (!selectedColor || !selectedSize) {
            alert("Please select both color and size.");
            return;
        }

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existingItem = cart.find(item => item.name === selectedProduct.name && item.color === selectedColor && item.size === selectedSize);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...selectedProduct, color: selectedColor, size: selectedSize, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${selectedProduct.name} (${selectedColor}, ${selectedSize}) added to cart!`);
        updateCartDisplay();
        popupContainer.style.display = "none";
    });

    displayRelatedProducts();
});

