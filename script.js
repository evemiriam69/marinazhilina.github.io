const nav = document.querySelector('.top-nav');
const menuToggle = document.querySelector('.menu-toggle');
const menuItems = document.querySelectorAll('.nav-links a');
const workCardToggles = document.querySelectorAll('.work-card-toggle');
const sections = Array.from(menuItems).map((item) => {
  const target = document.querySelector(item.getAttribute('href'));
  return { item, target };
});

function updateActiveNav() {
  const scrollPosition = window.scrollY + window.innerHeight / 3;
  let activeItem = null;

  sections.forEach(({ item, target }) => {
    if (!target) return;
    const top = target.offsetTop;
    const bottom = top + target.offsetHeight;
    if (scrollPosition >= top && scrollPosition < bottom) {
      activeItem = item;
    }
  });

  menuItems.forEach((menuItem) => menuItem.classList.toggle('active', menuItem === activeItem));
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

menuItems.forEach((menuItem) => {
  menuItem.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = menuItem.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({ top: target.offsetTop - 96, behavior: 'smooth' });
    }
    if (nav) {
      nav.classList.remove('open');
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

workCardToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const card = toggle.closest('.work-card');
    const isOpen = card.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
});

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);
