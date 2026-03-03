// ============================================
// CAR DETAILS PAGE JAVASCRIPT
// ============================================

let currentCar = null;

/**
 * Initialize car details page
 */
document.addEventListener('DOMContentLoaded', () => {
  const carId = parseInt(getQueryParam('id'));
  loadCarDetails(carId);
});

/**
 * Load car details by ID
 * @param {number} carId - Car ID
 */
function loadCarDetails(carId) {
  const detailsContainer = document.getElementById('detailsContainer');

  // Find car in data
  currentCar = carsData.find(car => car.id === carId);

  if (!currentCar) {
    detailsContainer.innerHTML = `
      <div class="error-message">
        <h2>Car Not Found</h2>
        <p>The car you're looking for doesn't exist.</p>
        <a href="cars.html" class="btn btn-primary">Back to Cars</a>
      </div>
    `;
    return;
  }

  // Update breadcrumb
  document.getElementById('breadcrumbTitle').textContent = currentCar.title;

  // Render car details
  detailsContainer.innerHTML = `
    <div class="details-grid">
      <!-- Image Gallery -->
      <div class="details-images">
        <div class="main-image-wrapper">
          <img src="${currentCar.image}" alt="${currentCar.title}" class="main-image" onerror="this.src='https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&h=600&fit=crop'">
          <div class="image-badge">${currentCar.year}</div>
        </div>
      </div>

      <!-- Details Panel -->
      <div class="details-panel">
        <h1 class="details-title">${currentCar.title}</h1>
        <div class="details-meta">
          <span class="meta-item">📍 ${currentCar.location}</span>
          <span class="meta-item">⏱️ ${currentCar.year}</span>
        </div>

        <!-- Price Section -->
        <div class="price-section">
          <div class="price-label">Listed Price</div>
          <div class="price-value">${formatPrice(currentCar.price)}</div>
        </div>

        <!-- Quick Specs -->
        <div class="quick-specs">
          <div class="spec-item">
            <div class="spec-icon">🚗</div>
            <div class="spec-info">
              <div class="spec-label">Mileage</div>
              <div class="spec-value">${formatMileage(currentCar.mileage)} miles</div>
            </div>
          </div>
          <div class="spec-item">
            <div class="spec-icon">⛽</div>
            <div class="spec-info">
              <div class="spec-label">Fuel Type</div>
              <div class="spec-value">${currentCar.fuelType}</div>
            </div>
          </div>
          <div class="spec-item">
            <div class="spec-icon">🔧</div>
            <div class="spec-info">
              <div class="spec-label">Transmission</div>
              <div class="spec-value">${currentCar.transmission}</div>
            </div>
          </div>
          <div class="spec-item">
            <div class="spec-icon">💨</div>
            <div class="spec-info">
              <div class="spec-label">Top Speed</div>
              <div class="spec-value">${currentCar.topSpeed} mph</div>
            </div>
          </div>
        </div>

        <!-- Features -->
        <div class="features-section">
          <h3>Key Features</h3>
          <ul class="features-list">
            ${currentCar.features.map(feature => `<li>✓ ${feature}</li>`).join('')}
          </ul>
        </div>

        <!-- Call to Action Buttons -->
        <div class="cta-buttons">
          <button class="btn btn-primary" onclick="openContactModal()">Contact Seller</button>
          <button class="btn btn-secondary" onclick="shareCar()">Share</button>
        </div>
      </div>
    </div>

    <!-- Full Details Section -->
    <div class="full-details-section">
      <h2>Vehicle Information</h2>

      <div class="details-tabs">
        <button class="tab-button active" onclick="switchTab('overview')">Overview</button>
        <button class="tab-button" onclick="switchTab('specifications')">Specifications</button>
        <button class="tab-button" onclick="switchTab('seller')">Seller Info</button>
      </div>

      <!-- Overview Tab -->
      <div id="overview" class="tab-content active">
        <div class="description-box">
          <h3>About This Vehicle</h3>
          <p>${currentCar.description}</p>
        </div>

        <div class="info-grid">
          <div class="info-card">
            <h4>Vehicle Condition</h4>
            <p>${currentCar.exteriorCondition}</p>
          </div>
          <div class="info-card">
            <h4>Interior</h4>
            <p>${currentCar.interior}</p>
          </div>
          <div class="info-card">
            <h4>Color</h4>
            <p>${currentCar.color}</p>
          </div>
          <div class="info-card">
            <h4>Service History</h4>
            <p>${currentCar.serviceHistory}</p>
          </div>
        </div>
      </div>

      <!-- Specifications Tab -->
      <div id="specifications" class="tab-content">
        <div class="specs-table">
          <div class="spec-row">
            <div class="spec-label">Brand</div>
            <div class="spec-value">${currentCar.brand}</div>
          </div>
          <div class="spec-row">
            <div class="spec-label">Model</div>
            <div class="spec-value">${currentCar.model}</div>
          </div>
          <div class="spec-row">
            <div class="spec-label">Year</div>
            <div class="spec-value">${currentCar.year}</div>
          </div>
          <div class="spec-row">
            <div class="spec-label">Mileage</div>
            <div class="spec-value">${formatMileage(currentCar.mileage)} miles</div>
          </div>
          <div class="spec-row">
            <div class="spec-label">Engine</div>
            <div class="spec-value">${currentCar.engine}</div>
          </div>
          <div class="spec-row">
            <div class="spec-label">Horsepower</div>
            <div class="spec-value">${currentCar.horsepower} hp</div>
          </div>
          <div class="spec-row">
            <div class="spec-label">Top Speed</div>
            <div class="spec-value">${currentCar.topSpeed} mph</div>
          </div>
          <div class="spec-row">
            <div class="spec-label">Transmission</div>
            <div class="spec-value">${currentCar.transmission}</div>
          </div>
          <div class="spec-row">
            <div class="spec-label">Fuel Type</div>
            <div class="spec-value">${currentCar.fuelType}</div>
          </div>
          <div class="spec-row">
            <div class="spec-label">Exterior Color</div>
            <div class="spec-value">${currentCar.color}</div>
          </div>
        </div>
      </div>

      <!-- Seller Info Tab -->
      <div id="seller" class="tab-content">
        <div class="seller-info">
          <div class="seller-card">
            <div class="seller-avatar">${getInitials(currentCar.owner)}</div>
            <h3>${currentCar.owner}</h3>
            <p class="seller-location">📍 ${currentCar.location}</p>

            <div class="seller-details">
              <div class="detail-item">
                <span class="detail-label">Email:</span>
                <a href="mailto:${currentCar.ownerEmail}">${currentCar.ownerEmail}</a>
              </div>
              <div class="detail-item">
                <span class="detail-label">Phone:</span>
                <a href="tel:${currentCar.ownerPhone}">${currentCar.ownerPhone}</a>
              </div>
            </div>

            <button class="btn btn-primary btn-full" onclick="openContactModal()">Contact This Seller</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Load related cars
  loadRelatedCars();
}

/**
 * Switch between tabs
 * @param {string} tabName - Tab name
 */
function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  // Remove active class from buttons
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show selected tab
  document.getElementById(tabName).classList.add('active');

  // Add active class to clicked button
  event.target.classList.add('active');
}

/**
 * Load related cars (similar brand or price range)
 */
function loadRelatedCars() {
  const relatedCarsContainer = document.getElementById('relatedCars');

  const related = carsData.filter(car => {
    return car.id !== currentCar.id && (
      car.brand === currentCar.brand ||
      (car.price >= currentCar.price - 10000 && car.price <= currentCar.price + 10000)
    );
  }).slice(0, 3);

  relatedCarsContainer.innerHTML = related.map(car => `
    <div class="car-card card">
      <img src="${car.image}" alt="${car.title}" class="card-image" onerror="this.src='https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop'">
      <h3 class="card-title">${car.title}</h3>
      <p class="card-text">${truncateText(car.description, 80)}</p>
      <div class="car-specs">
        <span>📊 ${formatMileage(car.mileage)} miles</span>
        <span>⛽ ${car.fuelType}</span>
      </div>
      <div class="card-footer">
        <div class="card-price">${formatPrice(car.price)}</div>
        <a href="car-details.html?id=${car.id}" class="btn btn-primary btn-sm">View</a>
      </div>
    </div>
  `).join('');
}

/**
 * Open contact modal
 */
function openContactModal() {
  document.getElementById('contactModal').style.display = 'flex';
}

/**
 * Close contact modal
 */
function closeContactModal() {
  document.getElementById('contactModal').style.display = 'none';
  document.getElementById('contactForm').reset();
}

/**
 * Handle contact form submission
 * @param {Event} event - Form event
 */
function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const phone = document.getElementById('contactPhone').value;
  const message = document.getElementById('contactMessage').value;

  // Validate form
  if (!name || !email || !phone || !message) {
    showNotification('Please fill in all fields', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email', 'error');
    return;
  }

  // In a real app, this would send data to a backend
  console.log('Contact form submitted:', { name, email, phone, message, carId: currentCar.id });

  showNotification('Message sent successfully! The seller will contact you soon.', 'success');
  closeContactModal();
}

/**
 * Share car details
 */
function shareCar() {
  const url = window.location.href;
  const title = currentCar.title;

  if (navigator.share) {
    navigator.share({
      title: 'AutoHub',
      text: `Check out this ${title}`,
      url: url
    }).catch(err => console.log('Error sharing:', err));
  } else {
    // Fallback: Copy to clipboard
    copyToClipboard(url).then(success => {
      if (success) {
        showNotification('Link copied to clipboard!', 'success');
      }
    });
  }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  const modal = document.getElementById('contactModal');
  if (e.target === modal) {
    closeContactModal();
  }
});

// Add car details page specific styles
const detailsStyles = document.createElement('style');
detailsStyles.textContent = `
  /* ============================================
     MAIN CONTENT & LAYOUT
     ============================================ */
  .main-content {
    padding: var(--spacing-xl) 0;
  }

  /* ============================================
     BREADCRUMB
     ============================================ */
  .breadcrumb {
    margin-bottom: var(--spacing-lg);
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  .breadcrumb a {
    color: var(--accent-color);
    text-decoration: none;
    transition: var(--transition);
  }

  .breadcrumb a:hover {
    text-decoration: underline;
  }

  /* ============================================
     DETAILS CONTAINER
     ============================================ */
  .details-container {
    background-color: var(--bg-card);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  /* ============================================
     LOADING STATE
     ============================================ */
  .loading {
    text-align: center;
    padding: var(--spacing-xl);
    color: var(--text-secondary);
  }

  /* ============================================
     DETAILS GRID
     ============================================ */
  .details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
  }

  /* ============================================
     DETAILS IMAGES
     ============================================ */
  .main-image-wrapper {
    position: relative;
    border-radius: var(--radius-lg);
    overflow: hidden;
    height: 500px;
  }

  .main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: var(--accent-color);
    color: var(--text-primary);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    font-weight: 700;
    font-size: 1.1rem;
    font-family: var(--font-primary);
  }

  /* ============================================
     DETAILS PANEL
     ============================================ */
  .details-panel {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .details-title {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    font-family: var(--font-primary);
  }

  .details-meta {
    display: flex;
    gap: var(--spacing-lg);
    color: var(--text-secondary);
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* ============================================
     PRICE SECTION
     ============================================ */
  .price-section {
    padding: var(--spacing-lg);
    background: linear-gradient(135deg, rgba(233, 69, 96, 0.1), rgba(255, 107, 157, 0.1));
    border-radius: var(--radius-lg);
    border: 1px solid rgba(233, 69, 96, 0.3);
  }

  .price-label {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: var(--spacing-sm);
  }

  .price-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--accent-color);
    font-family: var(--font-primary);
  }

  /* ============================================
     QUICK SPECS
     ============================================ */
  .quick-specs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
  }

  .spec-item {
    display: flex;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-md);
  }

  .spec-icon {
    font-size: 1.5rem;
  }

  .spec-info {
    flex: 1;
  }

  .spec-label {
    color: var(--text-secondary);
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
  }

  .spec-value {
    font-weight: 600;
    color: var(--text-primary);
  }

  /* ============================================
     FEATURES SECTION
     ============================================ */
  .features-section h3 {
    margin-bottom: var(--spacing-md);
    font-family: var(--font-primary);
  }

  .features-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
  }

  .features-list li {
    color: var(--text-secondary);
    padding: var(--spacing-sm) 0;
  }

  /* ============================================
     CTA BUTTONS
     ============================================ */
  .cta-buttons {
    display: flex;
    gap: var(--spacing-md);
    margin-top: auto;
  }

  .cta-buttons .btn {
    flex: 1;
  }

  /* ============================================
     FULL DETAILS SECTION
     ============================================ */
  .full-details-section {
    background-color: var(--bg-card);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .full-details-section h2 {
    margin-bottom: var(--spacing-lg);
    font-family: var(--font-primary);
  }

  /* ============================================
     TABS
     ============================================ */
  .details-tabs {
    display: flex;
    gap: var(--spacing-sm);
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
    margin-bottom: var(--spacing-lg);
  }

  .tab-button {
    background: none;
    border: none;
    color: var(--text-secondary);
    padding: var(--spacing-md) var(--spacing-lg);
    cursor: pointer;
    font-weight: 600;
    font-family: var(--font-primary);
    border-bottom: 3px solid transparent;
    transition: var(--transition);
  }

  .tab-button:hover {
    color: var(--text-primary);
  }

  .tab-button.active {
    color: var(--accent-color);
    border-bottom-color: var(--accent-color);
  }

  /* ============================================
     TAB CONTENT
     ============================================ */
  .tab-content {
    display: none;
  }

  .tab-content.active {
    display: block;
  }

  .description-box {
    background-color: rgba(255, 255, 255, 0.05);
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    margin-bottom: var(--spacing-lg);
  }

  .description-box h3 {
    margin-bottom: var(--spacing-md);
    font-family: var(--font-primary);
  }

  .description-box p {
    color: var(--text-secondary);
    line-height: 1.8;
  }

  /* ============================================
     INFO GRID
     ============================================ */
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-lg);
  }

  .info-card {
    background-color: rgba(255, 255, 255, 0.05);
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
  }

  .info-card h4 {
    margin-bottom: var(--spacing-sm);
    font-family: var(--font-primary);
  }

  .info-card p {
    color: var(--text-secondary);
  }

  /* ============================================
     SPECS TABLE
     ============================================ */
  .specs-table {
    display: grid;
    gap: 0;
  }

  .spec-row {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: var(--spacing-lg);
    padding: var(--spacing-md) 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .spec-row:last-child {
    border-bottom: none;
  }

  .spec-row .spec-label {
    color: var(--text-secondary);
    font-weight: 500;
  }

  .spec-row .spec-value {
    color: var(--text-primary);
    font-weight: 600;
  }

  /* ============================================
     SELLER INFO
     ============================================ */
  .seller-info {
    display: flex;
    justify-content: center;
  }

  .seller-card {
    background-color: rgba(233, 69, 96, 0.1);
    border: 1px solid rgba(233, 69, 96, 0.3);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    text-align: center;
    max-width: 400px;
    width: 100%;
  }

  .seller-avatar {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
    color: var(--text-primary);
    font-size: 1.8rem;
    font-weight: 700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--spacing-lg);
  }

  .seller-card h3 {
    margin-bottom: var(--spacing-sm);
    font-family: var(--font-primary);
  }

  .seller-location {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
  }

  .seller-details {
    text-align: left;
    margin: var(--spacing-lg) 0;
  }

  .detail-item {
    margin-bottom: var(--spacing-sm);
  }

  .detail-label {
    color: var(--text-secondary);
    display: block;
    margin-bottom: 0.25rem;
  }

  .detail-item a {
    color: var(--accent-color);
    text-decoration: none;
    font-weight: 600;
  }

  .detail-item a:hover {
    text-decoration: underline;
  }

  .btn-full {
    width: 100%;
    margin-top: var(--spacing-md);
  }

  /* ============================================
     RELATED SECTION
     ============================================ */
  .related-section {
    margin-top: var(--spacing-xl);
  }

  /* ============================================
     MODAL
     ============================================ */
  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    align-items: center;
    justify-content: center;
    z-index: 2000;
  }

  .modal-content {
    background-color: var(--bg-card);
    padding: var(--spacing-xl);
    border-radius: var(--radius-lg);
    max-width: 500px;
    width: 90%;
    position: relative;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }

  .modal-content h2 {
    margin-bottom: var(--spacing-lg);
    font-family: var(--font-primary);
  }

  .modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 1.5rem;
    cursor: pointer;
    transition: var(--transition);
  }

  .modal-close:hover {
    color: var(--text-primary);
  }

  /* ============================================
     ERROR MESSAGE
     ============================================ */
  .error-message {
    text-align: center;
    padding: var(--spacing-xl);
  }

  .error-message h2 {
    color: #ff6b6b;
    margin-bottom: var(--spacing-md);
  }

  /* ============================================
     RESPONSIVE
     ============================================ */
  @media (max-width: 1024px) {
    .details-grid {
      grid-template-columns: 1fr;
    }

    .main-image-wrapper {
      height: 400px;
    }

    .quick-specs {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 767px) {
    .details-container {
      padding: var(--spacing-md);
    }

    .details-title {
      font-size: 1.5rem;
    }

    .price-value {
      font-size: 1.8rem;
    }

    .main-image-wrapper {
      height: 300px;
    }

    .cta-buttons {
      flex-direction: column;
    }

    .quick-specs {
      grid-template-columns: 1fr;
    }

    .features-list {
      grid-template-columns: 1fr;
    }

    .details-tabs {
      gap: 0;
    }

    .tab-button {
      flex: 1;
      padding: var(--spacing-md);
      font-size: 0.85rem;
    }

    .spec-row {
      grid-template-columns: 100px 1fr;
      gap: var(--spacing-sm);
      font-size: 0.9rem;
    }

    .info-grid {
      grid-template-columns: 1fr;
    }

    .modal-content {
      width: 95%;
    }
  }
`;

document.head.appendChild(detailsStyles);
