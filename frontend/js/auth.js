// ============================================
// AUTHENTICATION JAVASCRIPT
// ============================================

/**
 * Handle login form submission
 * @param {Event} event - Form event
 */
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const remember = document.getElementById('remember').checked;

  // Validate email
  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }

  // Validate password
  if (password.length < 6) {
    showNotification('Password must be at least 6 characters', 'error');
    return;
  }

  // Simulate login (in real app, this would call a backend API)
  console.log('[v0] Login attempt:', { email, remember });

  // Check if user exists in localStorage
  const users = getStorage('users', 'local') || [];
  const user = users.find(u => u.email === email);

  if (!user) {
    showNotification('Email or password is incorrect', 'error');
    return;
  }

  // Create session
  const session = {
    name: user.name,
    email: user.email,
    phone: user.phone,
    loginTime: new Date().toISOString()
  };

  setStorage('currentUser', session, 'local');
  setStorage('sessionToken', `token_${Date.now()}`, 'local');

  if (remember) {
    setStorage('rememberEmail', email, 'local');
  }

  showNotification(`Welcome back, ${user.name}!`, 'success');

  // Redirect to home page
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
}

/**
 * Handle register form submission
 * @param {Event} event - Form event
 */
function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const phone = document.getElementById('phone').value.trim();
  const terms = document.getElementById('terms').checked;

  // Validate inputs
  if (!name || !email || !password || !phone) {
    showNotification('Please fill in all fields', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }

  if (!isValidPhone(phone)) {
    showNotification('Please enter a valid phone number', 'error');
    return;
  }

  if (password !== confirmPassword) {
    showNotification('Passwords do not match', 'error');
    return;
  }

  // Validate password strength
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    showNotification(passwordValidation.errors[0] || 'Password is too weak', 'error');
    return;
  }

  if (!terms) {
    showNotification('Please agree to the Terms of Service', 'error');
    return;
  }

  // Check if email already exists
  const users = getStorage('users', 'local') || [];
  if (users.some(u => u.email === email)) {
    showNotification('An account with this email already exists', 'error');
    return;
  }

  // Create new user
  const newUser = {
    id: Date.now(),
    name,
    email,
    password, // In real app, this would be hashed
    phone,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  setStorage('users', users, 'local');

  console.log('[v0] New user registered:', { name, email, phone });

  showNotification('Account created successfully! Redirecting to login...', 'success');

  // Redirect to login page
  setTimeout(() => {
    window.location.href = 'login.html?email=' + encodeURIComponent(email);
  }, 2000);
}

/**
 * Pre-fill email if redirected from register page
 */
document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  if (emailInput) {
    const email = getQueryParam('email');
    if (email) {
      emailInput.value = email;
    }
  }

  // Pre-fill remembered email
  const rememberEmail = getStorage('rememberEmail', 'local');
  if (rememberEmail && emailInput) {
    emailInput.value = rememberEmail;
  }
});

// Add auth page specific styles
const authStyles = document.createElement('style');
authStyles.textContent = `
  /* ============================================
     AUTH MAIN
     ============================================ */
  .auth-main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 200px);
    padding: var(--spacing-xl);
  }

  .auth-container {
    width: 100%;
    max-width: 450px;
  }

  .form-container {
    background-color: var(--bg-card);
    padding: var(--spacing-xl);
    border-radius: var(--radius-lg);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .form-header {
    text-align: center;
    margin-bottom: var(--spacing-xl);
  }

  .form-header h1 {
    font-size: 1.8rem;
    margin-bottom: var(--spacing-sm);
    font-family: var(--font-primary);
  }

  .form-header p {
    color: var(--text-secondary);
  }

  /* ============================================
     FORM INPUTS
     ============================================ */
  .form-group {
    margin-bottom: var(--spacing-lg);
  }

  .form-label {
    display: block;
    margin-bottom: var(--spacing-xs);
    font-weight: 600;
    color: var(--text-primary);
  }

  .form-input {
    width: 100%;
    padding: var(--spacing-sm);
    background-color: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    font-size: 1rem;
    transition: var(--transition);
  }

  .form-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .form-input:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(233, 69, 96, 0.1);
  }

  /* ============================================
     FORM BUTTONS
     ============================================ */
  .form-btn {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-lg);
    border: none;
    border-radius: var(--radius-md);
    font-family: var(--font-primary);
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: var(--transition);
  }

  .form-btn-submit {
    background-color: var(--accent-color);
    color: var(--text-primary);
  }

  .form-btn-submit:hover {
    background-color: var(--accent-light);
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(233, 69, 96, 0.4);
  }

  /* ============================================
     FORM LINK
     ============================================ */
  .form-link {
    text-align: center;
    margin-top: var(--spacing-lg);
    color: var(--text-secondary);
  }

  .form-link a {
    color: var(--accent-color);
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
  }

  .form-link a:hover {
    color: var(--accent-light);
    text-decoration: underline;
  }

  /* ============================================
     RESPONSIVE
     ============================================ */
  @media (max-width: 767px) {
    .auth-main {
      padding: var(--spacing-lg);
    }

    .form-container {
      padding: var(--spacing-lg);
    }

    .form-header h1 {
      font-size: 1.5rem;
    }
  }
`;

document.head.appendChild(authStyles);
