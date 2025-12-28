// Service Icons Mapping
const serviceIcons = {
  'Plumbing': '🔧',
  'Electrical': '⚡',
  'Carpentry': '🪚',
  'Painting': '🎨',
  'AC Repair': '❄️',
  'Cleaning': '✨',
  'Pest Control': '🐛',
  'Appliance Repair': '🔌',
  'Default': '🔨'
};

// Global variables
let allBookings = [];
let currentFilter = 'all';

// Initialize Dashboard
document.addEventListener("DOMContentLoaded", async () => {
  const bookingList = document.getElementById("booking-list");
  
  // Show loading state
  showLoading(bookingList);
  
  try {
    // Fetch bookings from API
    const response = await fetch("http://127.0.0.1:8000/api/my-bookings/");
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    allBookings = await response.json();
    
    // Update statistics
    updateStats();
    
    // Render bookings
    renderBookings();
    
    // Setup tab filtering
    setupTabs();
    
  } catch (error) {
    console.error("Error loading bookings:", error);
    showError(bookingList);
  }
});

// Show loading spinner
function showLoading(container) {
  container.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>Loading your bookings...</p>
    </div>
  `;
}

// Show error message
function showError(container) {
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">⚠️</div>
      <h3>Unable to load bookings</h3>
      <p>Please check your connection and try again</p>
      <button class="cta-btn" onclick="location.reload()">Retry</button>
    </div>
  `;
}

// Update Statistics
function updateStats() {
  const totalBookings = allBookings.length;
  const pendingCount = allBookings.filter(b => 
    b.status && b.status.toLowerCase() === 'pending'
  ).length;
  const completedCount = allBookings.filter(b => 
    b.status && b.status.toLowerCase() === 'completed'
  ).length;
  const confirmedCount = allBookings.filter(b => 
    b.status && b.status.toLowerCase() === 'confirmed'
  ).length;
  
  // Update stat cards
  const totalEl = document.getElementById('total-bookings');
  const pendingEl = document.getElementById('pending-count');
  const completedEl = document.getElementById('completed-count');
  const activeEl = document.getElementById('active-count');
  
  if (totalEl) totalEl.textContent = totalBookings;
  if (pendingEl) pendingEl.textContent = pendingCount;
  if (completedEl) completedEl.textContent = completedCount;
  if (activeEl) activeEl.textContent = confirmedCount;
}

// Render Bookings
function renderBookings() {
  const container = document.getElementById('booking-list');
  
  if (!container) return;
  
  // Filter bookings based on current filter
  const filtered = currentFilter === 'all' 
    ? allBookings 
    : allBookings.filter(b => 
        b.status && b.status.toLowerCase() === currentFilter.toLowerCase()
      );
  
  // Show empty state if no bookings
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <h3>No bookings found</h3>
        <p>You don't have any ${currentFilter === 'all' ? '' : currentFilter} bookings yet</p>
        <a href="booking.html" class="cta-btn">Book a Service</a>
      </div>
    `;
    return;
  }
  
  // Render booking cards
  container.innerHTML = filtered.map(booking => createBookingCard(booking)).join('');
}

// Create Booking Card HTML
function createBookingCard(booking) {
  const service = booking.service || 'Service';
  const bookingId = booking.id || 'N/A';
  const date = booking.date || 'Not scheduled';
  const time = booking.time || 'TBD';
  const technician = booking.technician || booking.worker || 'To be assigned';
  const location = booking.location || booking.address || 'Address not provided';
  const status = (booking.status || 'pending').toLowerCase();
  const price = booking.price || booking.cost || 'TBD';
  
  // Get service icon
  const icon = serviceIcons[service] || serviceIcons.Default;
  
  // Format price if it's a number
  const formattedPrice = typeof price === 'number' ? `₹${price}` : price;
  
  return `
    <div class="booking-card" data-booking-id="${bookingId}">
      <div class="booking-header">
        <div>
          <h4>${service}</h4>
          <div class="booking-id">#${bookingId}</div>
        </div>
        <div class="service-icon">${icon}</div>
      </div>
      
      <div class="booking-info">
        <div class="info-row">
          <span class="info-icon">📅</span>
          <span>${date}${time !== 'TBD' ? ' at ' + time : ''}</span>
        </div>
        <div class="info-row">
          <span class="info-icon">👤</span>
          <span>${technician}</span>
        </div>
        <div class="info-row">
          <span class="info-icon">📍</span>
          <span>${location}</span>
        </div>
        <div class="info-row">
          <span class="info-icon">💰</span>
          <span>${formattedPrice}</span>
        </div>
      </div>
      
      <div class="booking-footer">
        <span class="status ${status}">${status}</span>
        <div class="booking-actions">
          <button class="action-btn" onclick="viewDetails(${bookingId})">View</button>
          ${status === 'pending' ? 
            `<button class="action-btn" onclick="cancelBooking(${bookingId})">Cancel</button>` : ''}
        </div>
      </div>
    </div>
  `;
}

// Setup Tab Filtering
function setupTabs() {
  const tabs = document.querySelectorAll('.tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Update filter and re-render
      currentFilter = this.dataset.filter;
      renderBookings();
    });
  });
}

// View Booking Details
function viewDetails(bookingId) {
  const booking = allBookings.find(b => b.id == bookingId);
  
  if (!booking) {
    alert('Booking not found');
    return;
  }
  
  const details = `
Booking Details:
━━━━━━━━━━━━━━━━━━━━
Booking ID: #${booking.id || 'N/A'}
Service: ${booking.service || 'N/A'}
Date: ${booking.date || 'Not scheduled'}
Time: ${booking.time || 'TBD'}
Technician: ${booking.technician || booking.worker || 'To be assigned'}
Location: ${booking.location || booking.address || 'N/A'}
Status: ${booking.status || 'Pending'}
Price: ${typeof booking.price === 'number' ? '₹' + booking.price : booking.price || 'TBD'}
━━━━━━━━━━━━━━━━━━━━
  `.trim();
  
  alert(details);
}

// Cancel Booking
async function cancelBooking(bookingId) {
  if (!confirm('Are you sure you want to cancel this booking?')) {
    return;
  }
  
  try {
    // Make API call to cancel booking
    const response = await fetch(`http://127.0.0.1:8000/api/bookings/${bookingId}/cancel/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to cancel booking');
    }
    
    // Update local data
    const bookingIndex = allBookings.findIndex(b => b.id == bookingId);
    if (bookingIndex !== -1) {
      allBookings[bookingIndex].status = 'cancelled';
    }
    
    // Update UI
    updateStats();
    renderBookings();
    
    alert('Booking cancelled successfully');
    
  } catch (error) {
    console.error('Error cancelling booking:', error);
    alert('Unable to cancel booking. Please try again later.');
  }
}

// Refresh Dashboard
function refreshDashboard() {
  location.reload();
}

// Export functions for inline onclick handlers
window.viewDetails = viewDetails;
window.cancelBooking = cancelBooking;
window.refreshDashboard = refreshDashboard;