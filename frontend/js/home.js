// ============================================
// HOME PAGE JAVASCRIPT
// ============================================

/**
 * Load featured cars on home page
 */
function loadFeaturedCars() {
  const featuredCarsContainer = document.getElementById('featuredCars');
  if (!featuredCarsContainer) return;

  // Get first 6 cars as featured
  const featuredCars = carsData.slice(0, 6);

  featuredCarsContainer.innerHTML = featuredCars.map(car => `
    <div class="car-card card">
      <img src="${car.image}" alt="${car.title}" class="card-image" onerror="this.src='https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop'">
      <h3 class="card-title">${car.title}</h3>
      <p class="card-text">${truncateText(car.description, 80)}</p>
      <div class="car-specs">
        <span>📊 ${formatMileage(car.mileage)}</span>
        <span>⛽ ${car.fuelType}</span>
      </div>
      <div class="card-footer">
        <div class="card-price">${formatPrice(car.price)}</div>
        <a href="car-details.html?id=${car.id}" class="btn btn-primary btn-sm">View Details</a>
      </div>
    </div>
  `).join('');
}

/**
 * Handle category card clicks
 */
function setupCategoryCards() {
  const categoryCards = document.querySelectorAll('.category-card');
  
  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      window.location.href = 'cars.html';
    });
  });
}

/**
 * Initialize home page
 */
document.addEventListener('DOMContentLoaded', () => {
  loadFeaturedCars();
  setTimeout(() => {
    setupCategoryCards();
  }, 100);
});

// Add home-page specific styles
const homeStyles = document.createElement('style');
homeStyles.textContent = `
  /* ============================================
     HERO SECTION
     ============================================ */
  .hero {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    padding: 100px var(--spacing-lg) 80px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(233, 69, 96, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  .hero-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
    position: relative;
    z-index: 1;
    animation: slideInRight 0.6s ease-out;
  }

  .hero-content h1 {
    font-size: 3.5rem;
    font-weight: 700;
    font-family: var(--font-primary);
    margin-bottom: var(--spacing-md);
    color: var(--text-primary);
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  .hero-content p {
    font-size: 1.3rem;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-buttons {
    display: flex;
    gap: var(--spacing-md);
    justify-content: center;
    flex-wrap: wrap;
  }

  /* ============================================
     CARS GRID
     ============================================ */
  .cars-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
  }

  .car-card {
    display: flex;
    flex-direction: column;
  }

  .car-card .card-image {
    height: 250px;
  }

  .car-specs {
    display: flex;
    gap: var(--spacing-sm);
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin: var(--spacing-sm) 0;
  }

  .car-specs span {
    background-color: rgba(255, 255, 255, 0.05);
    padding: 0.4rem 0.8rem;
    border-radius: var(--radius-sm);
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-md);
    margin-top: auto;
    padding-top: var(--spacing-md);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .btn-sm {
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: 0.9rem;
    flex: 1;
    text-align: center;
  }

  /* ============================================
     HOW IT WORKS SECTION
     ============================================ */
  .how-it-works {
    background: linear-gradient(180deg, rgba(233, 69, 96, 0.05) 0%, transparent 100%);
  }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }

  .step-card {
    text-align: center;
    position: relative;
  }

  .step-number {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--accent-color), var(--accent-light));
    color: var(--text-primary);
    font-size: 1.8rem;
    font-weight: 700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--spacing-lg);
    font-family: var(--font-primary);
  }

  .step-card h3 {
    margin-bottom: var(--spacing-sm);
    font-family: var(--font-primary);
  }

  /* ============================================
     STATS SECTION
     ============================================ */
  .stats-section {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    border-radius: var(--radius-lg);
    margin: var(--spacing-xl) 0;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-lg);
    text-align: center;
    padding: var(--spacing-xl) var(--spacing-lg);
  }

  .stat-item {
    padding: var(--spacing-lg) 0;
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--accent-color);
    margin-bottom: var(--spacing-sm);
    font-family: var(--font-primary);
  }

  .stat-label {
    color: var(--text-secondary);
    font-size: 1rem;
  }

  /* ============================================
     CATEGORIES SECTION
     ============================================ */
  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }

  .category-card {
    background-color: var(--bg-card);
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    text-align: center;
    transition: var(--transition);
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .category-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(233, 69, 96, 0.3);
  }

  .category-icon {
    font-size: 3rem;
    margin-bottom: var(--spacing-md);
  }

  .category-card h3 {
    margin-bottom: var(--spacing-sm);
    font-family: var(--font-primary);
  }

  .category-card p {
    color: var(--text-secondary);
  }

  /* ============================================
     CTA SECTION
     ============================================ */
  .cta-section {
    background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-light) 100%);
    margin-top: var(--spacing-xl);
  }

  .cta-content {
    text-align: center;
    padding: var(--spacing-xl) 0;
  }

  .cta-content h2 {
    font-size: 2.5rem;
    margin-bottom: var(--spacing-md);
    font-family: var(--font-primary);
    color: var(--text-primary);
  }

  .cta-content p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: var(--spacing-lg);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-content .btn {
    background-color: var(--primary-color);
    color: var(--accent-color);
    font-weight: 700;
  }

  .cta-content .btn:hover {
    background-color: rgba(0, 0, 0, 0.2);
    color: var(--text-primary);
  }

  /* ============================================
     RESPONSIVE
     ============================================ */
  @media (max-width: 767px) {
    .hero-content h1 {
      font-size: 2rem;
    }

    .hero-content p {
      font-size: 1rem;
    }

    .hero {
      padding: 60px var(--spacing-md) 40px;
    }

    .hero-buttons {
      flex-direction: column;
    }

    .hero-buttons .btn {
      width: 100%;
    }

    .cars-grid {
      grid-template-columns: 1fr;
    }

    .stat-number {
      font-size: 2rem;
    }

    .cta-content h2 {
      font-size: 1.8rem;
    }
  }
`;

document.head.appendChild(homeStyles);
