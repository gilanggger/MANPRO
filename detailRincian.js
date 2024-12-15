document.addEventListener("DOMContentLoaded", function () {
  // Ambil data pesanan dari localStorage
  const orderData = JSON.parse(localStorage.getItem("orderData"));

  if (orderData) {
    // Ambil elemen-elemen untuk menampilkan data
    const itemName = document.querySelector(".order-id h3");
    const itemPrice = document.querySelector(".unit-price");
    const itemQty = document.querySelector(".qty");
    const itemTotal = document.querySelector(".total-price");
    const itemNote = document.querySelector(".notes p"); // Menampilkan catatan

    // Menampilkan data di tabel rincian pesanan
    itemName.textContent = orderData.name;
    itemPrice.textContent = orderData.price.toLocaleString(); // Format harga dengan pemisah ribuan
    itemQty.textContent = orderData.quantity;
    itemTotal.textContent = (
      orderData.price * orderData.quantity
    ).toLocaleString(); // Total harga
    itemNote.textContent = orderData.note || "No note"; // Menampilkan catatan, jika ada
  } else {
    console.log("No order data found.");
  }
});

//   =======================================================

function updateQty(button, change) {
  const row = button.closest("tr");
  const qtyElement = row.querySelector(".qty");
  const unitPrice = parseInt(row.querySelector(".unit-price").innerText);
  const totalPriceElement = row.querySelector(".total-price");

  // Update Quantity
  let qty = parseInt(qtyElement.innerText);
  qty = Math.max(1, qty + change); // Minimal quantity adalah 1
  qtyElement.innerText = qty;

  // Update Total Price per Row
  const totalPrice = unitPrice * qty;
  totalPriceElement.innerText = totalPrice;

  // Recalculate Subtotal, Tax, and Total
  recalculateTotals();
}

function recalculateTotals() {
  const totalElements = document.querySelectorAll(".total-price");
  let subtotal = 0;

  // Hitung subtotal
  totalElements.forEach((el) => {
    subtotal += parseInt(el.innerText);
  });

  // Hitung tax 5% dan total akhir
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  // Tampilkan di halaman
  document.getElementById(
    "subtotal"
  ).innerText = `Rp ${subtotal.toLocaleString()}`;
  document.getElementById("tax").innerText = `Rp ${tax.toLocaleString()}`;
  document.getElementById("total").innerText = `Rp ${total.toLocaleString()}`;
}

// Fungsi untuk menghapus baris item
function deleteRow(button) {
  const row = button.closest("tr"); // Cari baris tabel terdekat
  row.remove(); // Hapus baris dari tabel
  recalculateTotals(); // Hitung ulang subtotal, tax, dan total
}

// Tambahkan event listener untuk tombol trash setelah halaman dimuat
window.onload = () => {
  recalculateTotals(); // Hitung total saat halaman pertama kali dimuat

  // Tambahkan event listener ke semua tombol trash
  const deleteButtons = document.querySelectorAll(".btn-danger");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      deleteRow(this);
    });
  });
};

// Inisialisasi total awal saat halaman dimuat
// window.onload = recalculateTotals;
