const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

console.log("dashboard JS loaded");

// ================= SERVICE ICONS =================
const serviceIcons = {
  Plumbing: "🔧",
  Electrical: "⚡",
  Carpentry: "🪚",
  Painting: "🎨",
  "AC Repair": "❄️",
  Cleaning: "✨",
  "Pest Control": "🐛",
  "Appliance Repair": "🔌",
  Default: "🔨",
};

// ================= GLOBAL STATE =================
let allBookings = [];
let currentFilter = "all";

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();
});

async function loadDashboard() {
  const container = document.getElementById("booking-list");
  showLoading(container);

  try {
    const token = localStorage.getItem("token"); // 🔑 JWT TOKEN

    const response = await fetch(
      "http://127.0.0.1:8000/api/my-bookings/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        // credentials: "include", // ✅ Django session support
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    // ✅ Handle BOTH response formats
    allBookings = Array.isArray(data) ? data : data.bookings || [];

    // Optional user name
    if (data.user?.name) {
      document.getElementById("user-name").textContent = data.user.name;
    }

    updateStats();
    setupTabs();
    renderBookings();
  } catch (err) {
    console.error("Dashboard Load Error:", err);
    showError(container);
  }
}

// ================= UI HELPERS =================
function showLoading(container) {
  container.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>Loading your bookings...</p>
    </div>
  `;
}

function showError(container) {
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">⚠️</div>
      <h3>Unable to load dashboard</h3>
      <p>Please login again or check server</p>
      <button class="cta-btn" onclick="location.reload()">Retry</button>
    </div>
  `;
}

// ================= STATS =================
function updateStats() {
  const total = allBookings.length;
  const pending = allBookings.filter(b => b.status === "pending").length;
  const completed = allBookings.filter(b => b.status === "completed").length;
  const confirmed = allBookings.filter(b => b.status === "confirmed").length;

  document.getElementById("total-bookings").textContent = total;
  document.getElementById("pending-count").textContent = pending;
  document.getElementById("completed-count").textContent = completed;
  document.getElementById("active-count").textContent = confirmed;
}

// ================= RENDER BOOKINGS =================
function renderBookings() {
  const container = document.getElementById("booking-list");

  const list =
    currentFilter === "all"
      ? allBookings
      : allBookings.filter(b => b.status === currentFilter);

  if (!list.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <h3>No bookings found</h3>
        <a href="booking.html" class="cta-btn">Book Service</a>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(createBookingCard).join("");
}

// ================= CARD =================
function createBookingCard(b) {
  const icon = serviceIcons[b.service] || serviceIcons.Default;

  return `
    <div class="booking-card">
      <div class="booking-header">
        <div>
          <h4>${b.service}</h4>
          <div class="booking-id">#${b.id}</div>
        </div>
        <div class="service-icon">${icon}</div>
      </div>

      <div class="booking-info">
        <div class="info-row">📅 ${b.date || "TBD"} ${b.time || ""}</div>
        <div class="info-row">👤 ${b.technician || "Assigning"}</div>
        <div class="info-row">📍 ${b.address || "Not provided"}</div>
        <div class="info-row">💰 ₹${b.price || "TBD"}</div>
      </div>

      <div class="booking-footer">
        <span class="status ${b.status}">${b.status}</span>
        <div class="booking-actions">
          <button class="action-btn" onclick="viewDetails(${b.id})">View</button>
          ${
            b.status === "pending"
              ? `<button class="action-btn" onclick="cancelBooking(${b.id})">Cancel</button>`
              : ""
          }
        </div>
      </div>
    </div>
  `;
}

// ================= TABS =================
function setupTabs() {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentFilter = tab.dataset.filter;
      renderBookings();
    };
  });
}

// ================= ACTIONS =================
window.viewDetails = id => {
  const b = allBookings.find(x => x.id === id);
  alert(JSON.stringify(b, null, 2));
};

window.cancelBooking = async id => {
  if (!confirm("Cancel booking?")) return;

  await fetch(`http://127.0.0.1:8000/api/bookings/${id}/cancel/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const booking = allBookings.find(b => b.id === id);
  if (booking) booking.status = "cancelled";

  updateStats();
  renderBookings();
};
