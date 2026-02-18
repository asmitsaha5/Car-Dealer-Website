// ============================================
// SELL CAR PAGE JAVASCRIPT
// ============================================

/**
 * Initialize sell car page
 */
document.addEventListener('DOMContentLoaded', () => {
  setupFormValidation();
});

/**
 * Setup real-time form validation
 */
function setupFormValidation() {
  const form = document.getElementById('sellCarForm');
  const inputs = form.querySelectorAll('input, select, textarea');

  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('change', () => validateField(input));
  });
}

/**
 * Validate individual field
 * @param {HTMLElement} field - Form field element
 * @returns {boolean} True if valid
 */
function validateField(field) {
  let isValid = true;
  let errorMessage = '';

  // Skip validation for checkboxes
  if (field.type === 'checkbox') return true;

  // Empty field check
  if (field.value.trim() === '' && field.hasAttribute('required')) {
    isValid = false;
    errorMessage = 'This field is required';
  }
  // Email validation
  else if (field.type === 'email' && field.value.trim() !== '') {
    isValid = isValidEmail(field.value);
    errorMessage = 'Please enter a valid email address';
  }
  // Phone validation
  else if (field.id === 'ownerPhone' && field.value.trim() !== '') {
    isValid = isValidPhone(field.value);
    errorMessage = 'Please enter a valid phone number';
  }
  // Number field validation
  else if (field.type === 'number') {
    if (field.id === 'year') {
      const year = parseInt(field.value);
      isValid = year >= 1990 && year <= 2030;
      errorMessage = 'Year must be between 1990 and 2030';
    } else if (field.id === 'price') {
      isValid = parseInt(field.value) > 0;
      errorMessage = 'Price must be greater than 0';
    } else if (field.id === 'mileage') {
      isValid = parseInt(field.value) >= 0;
      errorMessage = 'Mileage cannot be negative';
    }
  }

  // Update field styling
  if (isValid) {
    field.classList.remove('input-error');
    removeFieldError(field);
  } else {
    field.classList.add('input-error');
    showFieldError(field, errorMessage);
  }

  return isValid;
}

/**
 * Show field error message
 * @param {HTMLElement} field - Form field
 * @param {string} message - Error message
 */
function showFieldError(field, message) {
  let errorElement = field.parentElement.querySelector('.form-error');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'form-error show';
    field.parentElement.appendChild(errorElement);
  }
  errorElement.textContent = message;
}

/**
 * Remove field error message
 * @param {HTMLElement} field - Form field
 */
function removeFieldError(field) {
  const errorElement = field.parentElement.querySelector('.form-error');
  if (errorElement) {
    errorElement.remove();
  }
}

/**
 * Validate entire form
 * @returns {boolean} True if all fields are valid
 */
function validateForm() {
  const form = document.getElementById('sellCarForm');
  const inputs = form.querySelectorAll('input, select, textarea');
  let isFormValid = true;

  inputs.forEach(input => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });

  // Check agreement checkbox
  const agreement = document.getElementById('agreement');
  if (!agreement.checked) {
    isFormValid = false;
    showNotification('Please agree to the Terms of Service', 'error');
  }

  return isFormValid;
}

/**
 * Handle form submission
 * @param {Event} event - Form event
 */
function handleFormSubmit(event) {
  event.preventDefault();

  const formError = document.getElementById('formError');
  const formSuccess = document.getElementById('formSuccess');

  // Clear previous messages
  formError.classList.remove('show');
  formSuccess.classList.remove('show');

  // Validate form
  if (!validateForm()) {
    formError.textContent = 'Please fill in all required fields correctly';
    formError.classList.add('show');
    showNotification('Please correct the errors in the form', 'error');
    return;
  }

  // Collect form data
  const formData = {
    brand: document.getElementById('brand').value,
    model: document.getElementById('model').value,
    year: parseInt(document.getElementById('year').value),
    mileage: parseInt(document.getElementById('mileage').value),
    fuelType: document.getElementById('fuelType').value,
    transmission: document.getElementById('transmission').value,
    color: document.getElementById('color').value,
    price: parseInt(document.getElementById('price').value),
    description: document.getElementById('description').value,
    location: document.getElementById('location').value,
    exterior: document.getElementById('exterior').value,
    interior: document.getElementById('interior').value,
    ownerName: document.getElementById('ownerName').value,
    ownerPhone: document.getElementById('ownerPhone').value,
    ownerEmail: document.getElementById('ownerEmail').value,
    submittedAt: new Date().toISOString()
  };

  console.log('[v0] Form submitted with data:', formData);

  // Save to localStorage (simulating backend)
  saveCarListing(formData);

  // Show success message
  formSuccess.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <span>✓</span>
      <div>
        <strong>Success!</strong> Your car listing has been created. 
        <a href="cars.html" style="color: #4caf50; text-decoration: underline;">View all listings</a>
      </div>
    </div>
  `;
  formSuccess.classList.add('show');

  showNotification('Car listing created successfully!', 'success');

  // Reset form
  setTimeout(() => {
    document.getElementById('sellCarForm').reset();
    formSuccess.classList.remove('show');
  }, 3000);
}

/**
 * Save car listing to localStorage
 * @param {object} formData - Form data object
 */
function saveCarListing(formData) {
  try {
    const listings = getStorage('userListings', 'local') || [];
    const newListing = {
      id: Date.now(),
      ...formData,
      status: 'active'
    };
    listings.push(newListing);
    setStorage('userListings', listings, 'local');
    console.log('[v0] Listing saved:', newListing);
  } catch (error) {
    console.error('[v0] Error saving listing:', error);
  }
}

// Add sell car page specific styles
const sellCarStyles = document.createElement('style');
sellCarStyles.textContent = `
  /* ============================================
     SELL CAR CONTAINER
     ============================================ */
  .sell-car-container {
    padding: var(--spacing-xl) 0;
  }

  /* ============================================
     BENEFITS SECTION
     ============================================ */
  .benefits-section {
    margin-bottom: var(--spacing-xl);
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }

  .benefit-card {
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .benefit-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-color), var(--accent-light));
  }

  .benefit-icon {
    font-size: 3rem;
    margin-bottom: var(--spacing-md);
  }

  .benefit-card h3 {
    margin-bottom: var(--spacing-sm);
    font-family: var(--font-primary);
    font-size: 1.2rem;
  }

  .benefit-card p {
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  /* ============================================
     FORM SECTION
     ============================================ */
  .form-section {
    margin-bottom: var(--spacing-xl);
  }

  /* ============================================
     FORM SECTION TITLE
     ============================================ */
  .form-section-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: var(--spacing-lg) 0 var(--spacing-md) 0;
    color: var(--accent-color);
    font-family: var(--font-primary);
    padding-bottom: var(--spacing-sm);
    border-bottom: 2px solid rgba(233, 69, 96, 0.3);
  }

  .form-section-title:first-child {
    margin-top: 0;
  }

  /* ============================================
     FORM LAYOUT
     ============================================ */
  .form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
  }

  .form-full-width {
    grid-column: 1 / -1;
  }

  /* ============================================
     SUCCESS/ERROR MESSAGES
     ============================================ */
  .form-success-message {
    background-color: rgba(76, 175, 80, 0.1);
    border-left: 4px solid #4caf50;
    color: #4caf50;
    padding: var(--spacing-lg);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-lg);
    display: none;
  }

  .form-success-message.show {
    display: block;
    animation: slideInLeft 0.3s ease-out;
  }

  .form-error-message {
    background-color: rgba(255, 107, 107, 0.1);
    border-left: 4px solid #ff6b6b;
    color: #ff6b6b;
    padding: var(--spacing-lg);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-lg);
    display: none;
  }

  .form-error-message.show {
    display: block;
    animation: slideInLeft 0.3s ease-out;
  }

  /* ============================================
     RESPONSIVE
     ============================================ */
  @media (max-width: 767px) {
    .sell-car-container {
      padding: var(--spacing-lg) 0;
    }

    .benefits-grid {
      grid-template-columns: 1fr;
    }

    .benefit-card h3 {
      font-size: 1rem;
    }

    .form-row {
      grid-template-columns: 1fr;
    }

    .form-section-title {
      font-size: 1rem;
      margin: var(--spacing-md) 0 var(--spacing-sm) 0;
    }

    .form-container {
      padding: var(--spacing-lg);
    }
  }
`;

document.head.appendChild(sellCarStyles);
