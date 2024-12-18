// Existing code for quantity stepper
const myInput = document.getElementById("my-input");
function stepper(btn) {
  let id = btn.getAttribute("id");
  let min = myInput.getAttribute("min");
  let max = myInput.getAttribute("max");
  let step = myInput.getAttribute("step");
  let val = myInput.getAttribute("value");
  let calcStep = id == "increment" ? step * 1 : step * -1;
  let newValue = parseInt(val) + calcStep;

  if (newValue >= min && newValue <= max) {
    myInput.setAttribute("value", newValue);
  }
}

// Existing code for checkout container
document.addEventListener("DOMContentLoaded", function () {
  const checkoutButtons = document.querySelectorAll(".checkout-container");

  checkoutButtons.forEach((button) => {
    button.addEventListener("click", function () {
      window.location.href = "detailMenu.html";
    });
  });
});

// Existing code for adding order data
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButton = document.querySelector(".add-to-cart");
  const noteInput = document.querySelector("textarea[name='note']");
  const qtyInput = document.querySelector("#my-input");

  addToCartButton.addEventListener("click", function (event) {
    event.preventDefault();

    const menuName = document.querySelector("h1").textContent;
    const price = parseInt(
      document
        .querySelector(".price h2")
        .textContent.replace("Rp", "")
        .replace(".", "")
        .trim()
    );
    const quantity = parseInt(qtyInput.value);
    const note = noteInput.value;

    const orderData = {
      name: menuName,
      price: price,
      quantity: quantity,
      note: note,
    };

    localStorage.setItem("orderData", JSON.stringify(orderData));

    window.location.href = "detailRincian.html";
  });
});

// NEW: Add these new functions at the end of the file
// Function to update cart count
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartCountElement.textContent = cartItems.length;

  if (cartItems.length === 0) {
    cartCountElement.style.display = "none";
  } else {
    cartCountElement.style.display = "inline-block";
  }
}

// Modify the existing add to cart event listener to use the new cart storage method
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButton = document.querySelector(".add-to-cart");
  const noteInput = document.querySelector("textarea[name='note']");
  const qtyInput = document.querySelector("#my-input");

  addToCartButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Collect item details
    const menuName = document.querySelector("h1").textContent;
    const price = parseInt(
      document
        .querySelector(".price h2")
        .textContent.replace("Rp", "")
        .replace(".", "")
        .trim()
    );
    const quantity = parseInt(qtyInput.value);
    const note = noteInput.value;

    // Only add to cart if quantity is greater than 0
    if (quantity > 0) {
      // Retrieve existing cart items or initialize empty array
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      // Create new cart item
      const newItem = {
        name: menuName,
        price: price,
        quantity: quantity,
        note: note,
      };

      // Add new item to cart
      cartItems.push(newItem);

      // Save updated cart back to localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Update cart count
      updateCartCount();

      // Optional: Show a confirmation message
      alert(`${quantity} ${menuName} added to cart!`);

      // Reset quantity input and note
      qtyInput.value = 0;
      noteInput.value = "";
    } else {
      alert("Please select a quantity before adding to cart");
    }
  });

  // Call this on page load to set initial cart count
  updateCartCount();
});
