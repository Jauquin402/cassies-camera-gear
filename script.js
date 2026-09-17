const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('#site-menu');
const filterButtons = document.querySelectorAll('.filter-button');
const productCards = document.querySelectorAll('.product-card');
const inquiryForm = document.querySelector('#inquiry-form');
const formStatus = document.querySelector('#form-status');
const itemInput = document.querySelector('#item');

// Keep the mobile menu keyboard and screen-reader state in sync.
menuToggle.addEventListener('click', () => {
  const isOpen = siteMenu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Close menu' : 'Open menu';
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.querySelector('.sr-only').textContent = 'Open menu';
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle('is-active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    });

    productCards.forEach((card) => {
      const shouldShow = selectedFilter === 'all' || card.dataset.category === selectedFilter;
      card.classList.toggle('is-hidden', !shouldShow);
    });
  });
});

document.querySelectorAll('.inquiry-button').forEach((button) => {
  button.addEventListener('click', () => {
    itemInput.value = button.dataset.item;
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    window.setTimeout(() => document.querySelector('#name').focus(), 500);
  });
});

inquiryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  formStatus.textContent = `Thanks${name ? `, ${name}` : ''}! This demo inquiry is ready to send, but no information was submitted.`;
  inquiryForm.reset();
});
