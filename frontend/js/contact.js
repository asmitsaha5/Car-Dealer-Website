function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !subject || !message) {
    showNotification('Please fill in all fields', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }

  console.log('[v0] Contact form submitted:', { name, email, subject, message });

  const messages = getStorage('contactMessages', 'local') || [];
  const newMessage = {
    id: Date.now(),
    name,
    email,
    subject,
    message,
    submittedAt: new Date().toISOString()
  };
  messages.push(newMessage);
  setStorage('contactMessages', messages, 'local');

  showNotification('Message sent successfully! We will get back to you soon.', 'success');

  document.getElementById('contactForm').reset();
}

const contactStyles = document.createElement('style');
contactStyles.textContent = `
  .contact-container {
    padding: var(--spacing-xl) 0;
  }

  .contact-info-section {
    margin-bottom: var(--spacing-xl);
  }

  .contact-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-lg);
  }

  .contact-info-card {
    text-align: center;
  }

  .info-icon {
    font-size: 2.5rem;
    margin-bottom: var(--spacing-md);
  }

  .contact-info-card h3 {
    margin-bottom: var(--spacing-sm);
    font-family: var(--font-primary);
  }

  .contact-info-card p {
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
  }

  .contact-info-card a {
    color: var(--accent-color);
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
  }

  .contact-info-card a:hover {
    color: var(--accent-light);
    text-decoration: underline;
  }

  .contact-form-section {
    margin-bottom: var(--spacing-xl);
  }

  .contact-form-container {
    max-width: 700px;
    margin: 0 auto;
  }

  .faq-section {
    background: linear-gradient(180deg, rgba(233, 69, 96, 0.05) 0%, transparent 100%);
  }

  .faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
  }

  .faq-item h3 {
    margin-bottom: var(--spacing-md);
    font-family: var(--font-primary);
    font-size: 1.1rem;
  }

  .faq-item p {
    color: var(--text-secondary);
    line-height: 1.6;
  }

  @media (max-width: 767px) {
    .contact-container {
      padding: var(--spacing-lg) 0;
    }

    .contact-info-grid {
      grid-template-columns: 1fr;
    }

    .contact-form-container {
      padding: var(--spacing-lg);
    }

    .faq-grid {
      grid-template-columns: 1fr;
    }
  }
`;

document.head.appendChild(contactStyles);
