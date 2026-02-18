// ============================================
// CARS LISTING PAGE JAVASCRIPT
// ============================================

let filteredCars = [...carsData];
let currentPage = 1;
const carsPerPage = 9;

/**
 * Initialize cars listing page
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize filteredCars with all cars
  filteredCars = [...carsData];
  
  // Check if category filter is in URL
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  
  if (category) {
    filterByCategory(category);
  } else {
    // Show all cars initially
    displayCars();
  }
  
  attachFilterListeners();
});

/**
 * Filter cars by category
 * @param {string} category - Category name (Sports Cars, SUVs, Electric, Family Cars)
 */
function filterByCategory(category) {
  let fuelTypeFilter = '';
  let modelFilter = '';
  
  switch(category) {
    case 'Sports Cars':
      // Filter for sports/performance cars (Mustang, Tesla Model 3, high horsepower)
      filteredCars = carsData.filter(car => 
        car.model === 'Mustang' || car.title.includes('Model 3') || car.horsepower > 280
      );
      break;
    case 'SUVs':
      // Filter for SUVs/crossovers
      filteredCars = carsData.filter(car => 
        car.model.includes('X5') || car.model.includes('CX-5') || car.title.includes('SUV')
      );
      break;
    case 'Electric':
      // Filter for electric vehicles
      filteredCars = carsData.filter(car => car.fuelType === 'Electric');
      break;
    case 'Family Cars':
      // Filter for family sedans and practical cars
      filteredCars = carsData.filter(car => 
        car.model === 'Civic' || car.model === 'Camry' || car.model === 'Golf' || car.model === 'A4'
      );
      break;
    default:
      filteredCars = [...carsData];
  }
  
  applySorting();
}

/**
 * Attach event listeners to filters
 */
function attachFilterListeners() {
  // Price filter
  document.getElementById('minPrice').addEventListener('change', applyFilters);
  document.getElementById('maxPrice').addEventListener('change', applyFilters);

  // Brand filter
  document.getElementById('brandFilter').addEventListener('change', applyFilters);

  // Fuel type filters
  document.querySelectorAll('.fuel-filter').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
  });

  // Transmission filters
  document.querySelectorAll('.transmission-filter').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
  });

  // Mileage filters
  document.querySelectorAll('.mileage-filter').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
  });

  // Search input with debounce
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(applyFilters, 300));
  }

  // Sort select
  document.getElementById('sortSelect').addEventListener('change', applySorting);
}

/**
 * Apply all filters
 */
function applyFilters() {
  currentPage = 1;
  const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
  const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
  const brand = document.getElementById('brandFilter').value;
  const searchQuery = document.getElementById('searchInput').value.toLowerCase();

  // Get selected fuel types
  const fuelTypes = Array.from(document.querySelectorAll('.fuel-filter:checked')).map(cb => cb.value);

  // Get selected transmissions
  const transmissions = Array.from(document.querySelectorAll('.transmission-filter:checked')).map(cb => cb.value);

  // Get selected mileage ranges
  const mileageRanges = Array.from(document.querySelectorAll('.mileage-filter:checked')).map(cb => cb.value);

  // Filter cars
  filteredCars = carsData.filter(car => {
    // Price filter
    if (car.price < minPrice || car.price > maxPrice) return false;

    // Brand filter
    if (brand && car.brand !== brand) return false;

    // Fuel type filter
    if (fuelTypes.length > 0 && !fuelTypes.includes(car.fuelType)) return false;

    // Transmission filter
    if (transmissions.length > 0 && !transmissions.includes(car.transmission)) return false;

    // Mileage filter
    if (mileageRanges.length > 0) {
      const mileageInRange = mileageRanges.some(range => {
        if (range === '0-20000') return car.mileage <= 20000;
        if (range === '20000-50000') return car.mileage > 20000 && car.mileage <= 50000;
        if (range === '50000-100000') return car.mileage > 50000 && car.mileage <= 100000;
        if (range === '100000+') return car.mileage > 100000;
        return false;
      });
      if (!mileageInRange) return false;
    }

    // Search filter
    if (searchQuery) {
      const searchableText = `${car.title} ${car.brand} ${car.model} ${car.location}`.toLowerCase();
      if (!searchableText.includes(searchQuery)) return false;
    }

    return true;
  });

  applySorting();
}

/**
 * Apply sorting to filtered cars
 */
function applySorting() {
  const sortValue = document.getElementById('sortSelect').value;

  if (sortValue === 'price-low') {
    filteredCars.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'price-high') {
    filteredCars.sort((a, b) => b.price - a.price);
  } else if (sortValue === 'mileage-low') {
    filteredCars.sort((a, b) => a.mileage - b.mileage);
  } else {
    // Latest first (default)
    filteredCars.sort((a, b) => b.year - a.year || b.id - a.id);
  }

  displayCars();
}

/**
 * Display cars for current page
 */
function displayCars() {
  const carsGrid = document.getElementById('carsGrid');
  const noResults = document.getElementById('noResults');
  const resultsCount = document.getElementById('resultsCount');

  resultsCount.textContent = filteredCars.length;

  if (filteredCars.length === 0) {
    carsGrid.style.display = 'none';
    noResults.style.display = 'block';
    document.getElementById('pagination').innerHTML = '';
    return;
  }

  carsGrid.style.display = 'grid';
  noResults.style.display = 'none';

  // Calculate pagination
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const paginatedCars = filteredCars.slice(startIndex, endIndex);

  // Render cars
  carsGrid.innerHTML = paginatedCars.map(car => `
    <div class="car-card card">
      <div class="car-image-wrapper">
        <img src="${car.image}" alt="${car.title}" class="card-image" onerror="this.src='https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop'">
        <div class="car-year-badge">${car.year}</div>
      </div>
      <h3 class="card-title">${car.title}</h3>
      <div class="car-location">📍 ${car.location}</div>
      <div class="car-specs">
        <span>📊 ${formatMileage(car.mileage)}</span>
        <span>⛽ ${car.fuelType}</span>
        <span>🔧 ${car.transmission}</span>
      </div>
      <div class="card-footer">
        <div class="card-price">${formatPrice(car.price)}</div>
        <a href="car-details.html?id=${car.id}" class="btn btn-primary btn-sm">View Details</a>
      </div>
    </div>
  `).join('');

  // Render pagination
  renderPagination(totalPages);
}

/**
 * Render pagination controls
 * @param {number} totalPages - Total number of pages
 */
function renderPagination(totalPages) {
  const pagination = document.getElementById('pagination');

  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }

  let html = '<div class="pagination-buttons">';

  // Previous button
  if (currentPage > 1) {
    html += `<button class="pagination-btn" onclick="goToPage(${currentPage - 1})">← Previous</button>`;
  }

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      html += `<button class="pagination-btn active">${i}</button>`;
    } else {
      html += `<button class="pagination-btn" onclick="goToPage(${i})">${i}</button>`;
    }
  }

  // Next button
  if (currentPage < totalPages) {
    html += `<button class="pagination-btn" onclick="goToPage(${currentPage + 1})">Next →</button>`;
  }

  html += '</div>';
  pagination.innerHTML = html;
}

/**
 * Go to specific page
 * @param {number} pageNumber - Page number
 */
function goToPage(pageNumber) {
  currentPage = pageNumber;
  displayCars();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Reset all filters
 */
function resetFilters() {
  document.getElementById('minPrice').value = '0';
  document.getElementById('maxPrice').value = '6000000';
  document.getElementById('brandFilter').value = '';
  document.getElementById('searchInput').value = '';
  document.getElementById('sortSelect').value = 'latest';

  document.querySelectorAll('.fuel-filter').forEach(cb => cb.checked = false);
  document.querySelectorAll('.transmission-filter').forEach(cb => cb.checked = false);
  document.querySelectorAll('.mileage-filter').forEach(cb => cb.checked = false);

  currentPage = 1;
  filteredCars = [...carsData];
  displayCars();
}

// Add cars page specific styles
const carsStyles = document.createElement('style');
carsStyles.textContent = `
  /* ============================================
     PAGE HEADER
     ============================================ */
  .page-header {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    padding: 60px var(--spacing-lg) 40px;
    text-align: center;
    margin-bottom: var(--spacing-xl);
  }

  .page-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: var(--spacing-sm);
    font-family: var(--font-primary);
  }

  .page-header p {
    color: var(--text-secondary);
    font-size: 1.1rem;
  }

  /* ============================================
     MAIN CONTENT
     ============================================ */
  .main-content {
    padding: var(--spacing-xl) 0;
  }

  .cars-container {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: var(--spacing-xl);
  }

  /* ============================================
     FILTERS SIDEBAR
     ============================================ */
  .filters-sidebar {
    height: fit-content;
    position: sticky;
    top: 100px;
  }

  .filters-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-lg);
    border-bottom: 2px solid rgba(233, 69, 96, 0.3);
  }

  .filters-header h2 {
    font-size: 1.3rem;
    font-family: var(--font-primary);
  }

  .btn-reset-filters {
    background: none;
    border: none;
    color: var(--accent-color);
    cursor: pointer;
    font-weight: 600;
    font-size: 0.85rem;
    transition: var(--transition);
  }

  .btn-reset-filters:hover {
    color: var(--accent-light);
  }

  .filter-group {
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-lg);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .filter-group h3 {
    font-size: 1rem;
    margin-bottom: var(--spacing-sm);
    font-family: var(--font-primary);
    color: var(--text-primary);
  }

  .price-inputs {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .filter-input {
    flex: 1;
    padding: 0.6rem 0.8rem;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-sm);
    color: var(--text-primary);
    font-size: 0.9rem;
  }

  .filter-input:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(233, 69, 96, 0.1);
  }

  .filter-select {
    font-size: 0.95rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 35px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .price-input {
    flex: 1;
    max-width: 120px;
    padding: 8px 10px;
    font-size: 0.9rem;
  }

  .filter-select option {
    background-color: var(--bg-card);
    color: var(--text-primary);
    padding: 10px;
  }

  .filter-select option:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
  }

  .filter-select option:checked {
    background-color: var(--accent-color);
    color: var(--text-primary);
  }

  .sort-select {
    min-width: 180px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 35px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .sort-select option {
    background-color: var(--bg-card);
    color: var(--text-primary);
    padding: 10px;
  }

  .sort-select option:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
  }

  .sort-select option:checked {
    background-color: var(--accent-color);
    color: var(--text-primary);
  }

  /* ============================================
     CARS MAIN
     ============================================ */
  .cars-main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  /* ============================================
     CARS HEADER (Search & Sort)
     ============================================ */
  .cars-header {
    display: flex;
    gap: var(--spacing-lg);
    flex-wrap: wrap;
  }

  .search-box {
    flex: 1;
    min-width: 250px;
  }

  .search-input {
    width: 100%;
    padding: var(--spacing-sm);
    background-color: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-size: 1rem;
    transition: var(--transition);
  }

  .search-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .search-input:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(233, 69, 96, 0.1);
  }

  /* ============================================
     RESULTS INFO
     ============================================ */
  .results-info {
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  /* ============================================
     CARS GRID
     ============================================ */
  .cars-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-lg);
  }

  .car-card {
    position: relative;
  }

  .car-image-wrapper {
    position: relative;
    overflow: hidden;
  }

  .car-year-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: var(--accent-color);
    color: var(--text-primary);
    padding: 0.4rem 0.8rem;
    border-radius: var(--radius-sm);
    font-weight: 600;
    font-size: 0.85rem;
  }

  .car-location {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin: var(--spacing-sm) 0;
  }

  .car-specs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin: var(--spacing-sm) 0;
  }

  .car-specs span {
    background-color: rgba(255, 255, 255, 0.05);
    padding: 0.3rem 0.6rem;
    border-radius: var(--radius-sm);
  }

  /* ============================================
     NO RESULTS
     ============================================ */
  .no-results {
    text-align: center;
    padding: var(--spacing-xl);
    background-color: rgba(255, 107, 107, 0.1);
    border: 2px dashed var(--accent-color);
    border-radius: var(--radius-lg);
    grid-column: 1 / -1;
  }

  .no-results p {
    margin-bottom: var(--spacing-lg);
    color: var(--text-secondary);
  }

  /* ============================================
     PAGINATION
     ============================================ */
  .pagination {
    margin-top: var(--spacing-xl);
    padding-top: var(--spacing-lg);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .pagination-buttons {
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
  }

  .pagination-btn {
    padding: 0.6rem 1rem;
    background-color: var(--bg-card);
    color: var(--text-secondary);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-md);
    cursor: pointer;
    font-weight: 500;
    transition: var(--transition);
  }

  .pagination-btn:hover {
    background-color: var(--accent-color);
    color: var(--text-primary);
    border-color: var(--accent-color);
  }

  .pagination-btn.active {
    background-color: var(--accent-color);
    color: var(--text-primary);
    border-color: var(--accent-color);
  }

  /* ============================================
     RESPONSIVE
     ============================================ */
  @media (max-width: 1024px) {
    .cars-container {
      grid-template-columns: 1fr;
    }

    .filters-sidebar {
      position: relative;
      top: auto;
    }
  }

  @media (max-width: 767px) {
    .page-header {
      padding: 40px var(--spacing-md) 30px;
    }

    .page-header h1 {
      font-size: 1.8rem;
    }

    .cars-header {
      flex-direction: column;
    }

    .sort-select {
      width: 100%;
    }

    .cars-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: var(--spacing-md);
    }

    .car-specs {
      font-size: 0.75rem;
    }

    .filter-group {
      padding-bottom: var(--spacing-md);
      margin-bottom: var(--spacing-md);
    }
  }
`;

document.head.appendChild(carsStyles);
