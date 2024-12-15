// INPUT QUANTITY
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

// Fungsi untuk menghubungkan checkout-container ke detailMenu.html
document.addEventListener("DOMContentLoaded", function () {
  // Ambil semua elemen dengan class "checkout-container"
  const checkoutButtons = document.querySelectorAll(".checkout-container");

  // Tambahkan event listener untuk setiap tombol
  checkoutButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Redirect ke halaman detail menu
      window.location.href = "detailMenu.html";
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const addToCartButton = document.querySelector(".add-to-cart"); // Tombol Add to Cart
  const noteInput = document.querySelector("textarea[name='note']"); // Input catatan
  const qtyInput = document.querySelector("#my-input"); // Input jumlah pesanan

  addToCartButton.addEventListener("click", function (event) {
    event.preventDefault(); // Mencegah form submit

    // Ambil data dari form
    const menuName = document.querySelector("h1").textContent; // Nama menu
    const price = parseInt(
      document
        .querySelector(".price h2")
        .textContent.replace("Rp", "")
        .replace(".", "")
        .trim()
    ); // Harga
    const quantity = parseInt(qtyInput.value); // Jumlah pesanan
    const note = noteInput.value; // Catatan pesan

    // Simpan data ke localStorage
    const orderData = {
      name: menuName,
      price: price,
      quantity: quantity,
      note: note,
    };

    // Menyimpan data pesanan dalam localStorage
    localStorage.setItem("orderData", JSON.stringify(orderData));

    // Arahkan ke halaman rincian pesanan
    window.location.href = "detailRincian.html";
  });
});
