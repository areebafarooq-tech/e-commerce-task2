document.addEventListener("DOMContentLoaded", function () {
    const wishlistContainer = document.getElementById("wishlistItems");

    function loadWishlist() {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlistContainer.innerHTML = "";

        if (wishlist.length === 0) {
            wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
            return;
        }

        wishlist.forEach((item, index) => {
            const wishlistItem = document.createElement("div");
            wishlistItem.classList.add("wishlist-item");
            wishlistItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name} - $${item.price}</p>
                <button onclick="removeFromWishlist(${index})">Remove</button>
            `;
            wishlistContainer.appendChild(wishlistItem);
        });
    }

    window.removeFromWishlist = function (index) {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlist.splice(index, 1);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        loadWishlist();
    };

    loadWishlist();
});
