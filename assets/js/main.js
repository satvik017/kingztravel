/**
 * Kings Travels - Global Main Scripts
 * Handles Navbar, Mobile Menu, Accordions, Scroll Animations, and Smooth Scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar on Scroll
  const navbar = document.getElementById('main-navbar') || document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  }

  // 2. Mobile Hamburger & Navigation Menu
  const hamburger = document.getElementById('hamburger-btn') || document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu') || document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Scroll Reveal Animations (IntersectionObserver)
  const fadeElements = document.querySelectorAll('.fade-up');
  if (fadeElements.length > 0) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      });

      fadeElements.forEach(el => observer.observe(el));
    } else {
      // Fallback for older browsers
      fadeElements.forEach(el => el.classList.add('visible'));
    }
  }

  // 4. Smooth Scrolling for Internal Links
  document.querySelectorAll('a[href^="#"]:not([href="#"]):not([href="#!"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      try {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch (err) {
        // Fallback for non-standard selector
      }
    });
  });

  // 5. Accessible Keyboard Navigation for FAQ Cards
  document.querySelectorAll('.faq-card, .faq-item').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target === card) {
        e.preventDefault();
        toggleFaq(card);
      }
    });
  });
});

/**
 * Mobile Submenu Accordion Toggle
 * @param {string} id - The ID of the submenu container
 */
function toggleMobileSubmenu(id) {
  const submenu = document.getElementById(id);
  if (!submenu) return;
  const btn = submenu.previousElementSibling;
  const isOpen = submenu.classList.contains('open');

  document.querySelectorAll('.mobile-submenu').forEach(s => s.classList.remove('open'));
  document.querySelectorAll('.mobile-nav-link').forEach(b => b.classList.remove('open'));

  if (!isOpen) {
    submenu.classList.add('open');
    if (btn) btn.classList.add('open');
  }
}

/**
 * Universal FAQ Accordion Toggle
 * Handles .faq-card and .faq-item structures smoothly across all pages
 * @param {HTMLElement} element - The clicked button, header, or card
 */
function toggleFaq(element) {
  if (!element) return;

  // Determine the target container
  const item = element.closest('.faq-item') || element.closest('.faq-card') || element;
  const wasActive = item.classList.contains('active');

  // Find the container or column to restrict sibling closing
  const container = item.closest('.faq-col') || item.closest('.faq-grid') || item.parentElement;

  if (container) {
    container.querySelectorAll('.faq-item, .faq-card').forEach(sibling => {
      sibling.classList.remove('active');
      if (sibling.hasAttribute('aria-expanded')) {
        sibling.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (!wasActive) {
    item.classList.add('active');
    if (item.hasAttribute('aria-expanded')) {
      item.setAttribute('aria-expanded', 'true');
    }
  }
}
