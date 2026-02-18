// ============================================
// MAIN APPLICATION JAVASCRIPT
// ============================================

/**
 * Initialize the application
 */
function initApp() {
  loadNavbar();
  loadFooter();
  updateAuthUI();
  setupMobileNav();
}

/**
 * Load navbar component
 */
async function loadNavbar() {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    try {
      const response = await fetch('./components/navbar.html');
      navbar.innerHTML = await response.text();
      setupMobileNav();
      updateAuthUI();
    } catch (error) {
      console.error('Error loading navbar:', error);
    }
  }
}

/**
 * Load footer component
 */
async function loadFooter() {
  const footer = document.getElementById('footer');
  if (footer) {
    try {
      const response = await fetch('./components/footer.html');
      footer.innerHTML = await response.text();
    } catch (error) {
      console.error('Error loading footer:', error);
    }
  }
}

/**
 * Setup mobile navigation toggle
 */
function setupMobileNav() {
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarMenu = document.getElementById('navbarMenu');

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    const navLinks = navbarMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
      });
    });
  }
}

/**
 * Update authentication UI based on login status
 */
function updateAuthUI() {
  const navAuth = document.getElementById('navAuth');
  const user = getStorage('currentUser', 'local');

  if (navAuth) {
    if (user && user.email) {
      navAuth.innerHTML = `
        <div class="nav-auth-user">
          <a href="profile.html" class="nav-link">${user.name}</a>
          <button onclick="logout()" class="nav-link logout-btn">Logout</button>
        </div>
      `;
    } else {
      navAuth.innerHTML = `<a href="login.html" class="nav-link login-btn">Login</a>`;
    }
  }
}

/**
 * Logout user
 */
function logout() {
  removeStorage('currentUser', 'local');
  removeStorage('sessionToken', 'local');
  showNotification('Logged out successfully', 'success');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

/**
 * Check if user is logged in
 * @returns {boolean} True if logged in
 */
function isLoggedIn() {
  return !!getStorage('currentUser', 'local');
}

/**
 * Get current logged in user
 * @returns {object|null} User object or null
 */
function getCurrentUser() {
  return getStorage('currentUser', 'local');
}

/**
 * Redirect to login if not authenticated
 */
function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
  }
}

/**
 * Add scroll animation for elements
 */
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .section').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Initialize event listeners
 */
function initEventListeners() {
  // Add any global event listeners here
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/**
 * Initialize application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  initApp();
  initEventListeners();
  addScrollAnimations();
});

/**
 * Handle window resize for responsive behavior
 */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Add any resize-specific logic here
  }, 250);
});

/**
 * Add CSS styles for navbar auth
 */
const style = document.createElement('style');
style.textContent = `
  .nav-auth-user {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .logout-btn {
    background-color: var(--accent-color);
    color: var(--text-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    border: none;
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }

  .logout-btn:hover {
    background-color: var(--accent-light);
  }

  @media (max-width: 767px) {
    .nav-auth-user {
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }

    .logout-btn {
      width: 100%;
    }
  }
`;
document.head.appendChild(style);
