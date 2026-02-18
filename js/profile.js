// ============================================
// PROFILE PAGE JAVASCRIPT
// ============================================

/**
 * Initialize profile page
 */
document.addEventListener('DOMContentLoaded', () => {
  requireLogin();
  loadProfileData();
  loadUserListings();
});

/**
 * Load user profile data
 */
function loadProfileData() {
  const user = getCurrentUser();

  if (user) {
    // Update header
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profileAvatar').textContent = getInitials(user.name);

    // Update info section
    document.getElementById('infoName').textContent = user.name;
    document.getElementById('infoEmail').textContent = user.email;
    document.getElementById('infoPhone').textContent = user.phone || '-';
    document.getElementById('infoJoinDate').textContent = user.loginTime ? formatDate(user.loginTime) : '-';
  }
}

/**
 * Load user's car listings
 */
function loadUserListings() {
  const listingsContainer = document.getElementById('listingsContainer');
  const listings = getStorage('userListings', 'local') || [];

  if (listings.length === 0) {
    listingsContainer.innerHTML = `
      <div class="empty-state">
        <p>You haven't listed any cars yet.</p>
        <a href="sell-car.html" class="btn btn-primary">List Your Car</a>
      </div>
    `;
    return;
  }

  listingsContainer.innerHTML = `
    <div class="listings-grid">
      ${listings.map(listing => `
        <div class="listing-card card">
          <h4>${listing.year} ${listing.brand} ${listing.model}</h4>
          <div class="listing-info">
            <span>💰 ${formatPrice(listing.price)}</span>
            <span>📊 ${formatMileage(listing.mileage)} miles</span>
          </div>
          <div class="listing-status">
            <span class="status-badge status-${listing.status}">${listing.status}</span>
          </div>
          <div class="listing-actions">
            <button class="btn btn-secondary btn-sm" onclick="editListing(${listing.id})">Edit</button>
            <button class="btn btn-secondary btn-sm" onclick="deleteListing(${listing.id})">Delete</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Switch between tabs
 * @param {string} tabName - Tab name
 * @param {Event} event - Click event
 */
function switchTab(tabName, event) {
  event.preventDefault();

  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  // Remove active class from nav items
  document.querySelectorAll('.profile-nav-item').forEach(item => {
    item.classList.remove('active');
  });

  // Show selected tab
  document.getElementById(tabName).classList.add('active');
  event.target.classList.add('active');
}

/**
 * Edit listing
 * @param {number} listingId - Listing ID
 */
function editListing(listingId) {
  showNotification('Edit functionality coming soon', 'info');
}

/**
 * Delete listing
 * @param {number} listingId - Listing ID
 */
function deleteListing(listingId) {
  if (confirm('Are you sure you want to delete this listing?')) {
    const listings = getStorage('userListings', 'local') || [];
    const updatedListings = listings.filter(l => l.id !== listingId);
    setStorage('userListings', updatedListings, 'local');
    loadUserListings();
    showNotification('Listing deleted successfully', 'success');
  }
}

// Add profile page specific styles
const profileStyles = document.createElement('style');
profileStyles.textContent = `
  /* ============================================
     PROFILE CONTAINER
     ============================================ */
  .profile-container {
    padding: var(--spacing-xl) 0;
  }

  .profile-grid {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: var(--spacing-xl);
  }

  /* ============================================
     PROFILE SIDEBAR
     ============================================ */
  .profile-sidebar {
    height: fit-content;
    position: sticky;
    top: 100px;
  }

  .profile-card {
    text-align: center;
    margin-bottom: var(--spacing-lg);
  }

  .profile-avatar {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
    color: var(--text-primary);
    font-size: 2rem;
    font-weight: 700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--spacing-lg);
  }

  .profile-card h2 {
    margin-bottom: var(--spacing-xs);
    font-family: var(--font-primary);
  }

  .profile-email {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
  }

  /* ============================================
     PROFILE NAV
     ============================================ */
  .profile-nav {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .profile-nav-item {
    padding: var(--spacing-md);
    background-color: rgba(255, 255, 255, 0.05);
    border: none;
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    text-decoration: none;
    text-align: left;
    cursor: pointer;
    transition: var(--transition);
    font-weight: 500;
  }

  .profile-nav-item:hover {
    background-color: rgba(233, 69, 96, 0.1);
    color: var(--accent-color);
  }

  .profile-nav-item.active {
    background-color: var(--accent-color);
    color: var(--text-primary);
  }

  /* ============================================
     PROFILE MAIN
     ============================================ */
  .profile-main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .tab-content {
    display: none;
  }

  .tab-content.active {
    display: block;
  }

  /* ============================================
     CONTENT CARD
     ============================================ */
  .content-card h3 {
    margin-bottom: var(--spacing-lg);
    font-family: var(--font-primary);
    border-bottom: 2px solid rgba(233, 69, 96, 0.3);
    padding-bottom: var(--spacing-md);
  }

  /* ============================================
     INFO TABLE
     ============================================ */
  .info-table {
    display: grid;
    gap: var(--spacing-lg);
  }

  .info-row {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: var(--spacing-lg);
    padding: var(--spacing-md) 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .info-row:last-child {
    border-bottom: none;
  }

  .info-label {
    color: var(--text-secondary);
    font-weight: 600;
  }

  .info-value {
    color: var(--text-primary);
  }

  /* ============================================
     LISTINGS
     ============================================ */
  .empty-state {
    text-align: center;
    padding: var(--spacing-xl);
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-lg);
  }

  .empty-state p {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
  }

  .listings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-lg);
  }

  .listing-card h4 {
    margin-bottom: var(--spacing-md);
    font-family: var(--font-primary);
  }

  .listing-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .listing-status {
    margin-bottom: var(--spacing-md);
  }

  .status-badge {
    padding: 0.4rem 0.8rem;
    border-radius: var(--radius-sm);
    font-size: 0.85rem;
    font-weight: 600;
  }

  .status-active {
    background-color: rgba(76, 175, 80, 0.2);
    color: #4caf50;
  }

  .status-inactive {
    background-color: rgba(158, 158, 158, 0.2);
    color: var(--neutral-gray);
  }

  .listing-actions {
    display: flex;
    gap: var(--spacing-sm);
  }

  .btn-sm {
    flex: 1;
    padding: 0.5rem;
    font-size: 0.85rem;
  }

  /* ============================================
     SETTINGS
     ============================================ */
  .settings-group {
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-lg);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .settings-group h4 {
    margin-bottom: var(--spacing-md);
    font-family: var(--font-primary);
    color: var(--accent-color);
  }

  .checkbox-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
    cursor: pointer;
  }

  .checkbox-item input {
    width: 20px;
    height: 20px;
    cursor: pointer;
    accent-color: var(--accent-color);
  }

  .checkbox-item span {
    cursor: pointer;
  }

  /* ============================================
     RESPONSIVE
     ============================================ */
  @media (max-width: 1024px) {
    .profile-grid {
      grid-template-columns: 1fr;
    }

    .profile-sidebar {
      position: relative;
      top: auto;
    }
  }

  @media (max-width: 767px) {
    .profile-container {
      padding: var(--spacing-lg) 0;
    }

    .profile-grid {
      gap: var(--spacing-lg);
    }

    .info-row {
      grid-template-columns: 1fr;
      gap: var(--spacing-sm);
    }

    .listings-grid {
      grid-template-columns: 1fr;
    }
  }
`;

document.head.appendChild(profileStyles);
