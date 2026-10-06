/**
 * Kings Travels - Corporate Travel Page Scripts
 * Handles Corporate Quote Modal and WhatsApp Inquiry Generator
 */

// Modal Functionality
function openCorpModal(serviceType) {
  const modal = document.getElementById('corpModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (serviceType) {
      const select = document.getElementById('corp-service');
      if (select) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].text.toLowerCase().includes(serviceType.toLowerCase())) {
            select.selectedIndex = i;
            break;
          }
        }
      }
    }
  }
}

function closeCorpModal() {
  const modal = document.getElementById('corpModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Close modal when clicking on backdrop
  const corpModal = document.getElementById('corpModal');
  if (corpModal) {
    corpModal.addEventListener('click', (e) => {
      if (e.target === corpModal) {
        closeCorpModal();
      }
    });
  }

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCorpModal();
    }
  });
});

// Handle Form Submission
function handleCorpSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('corp-name')?.value || '';
  const company = document.getElementById('corp-company')?.value || '';
  const phone = document.getElementById('corp-phone')?.value || '';
  const email = document.getElementById('corp-email')?.value || '';
  const service = document.getElementById('corp-service')?.value || '';
  const pax = document.getElementById('corp-pax')?.value || 'Not specified';
  const dest = document.getElementById('corp-dest')?.value || 'To be decided';
  const message = document.getElementById('corp-message')?.value || 'None';

  alert(`Thank you, ${name}! Your corporate travel inquiry has been received. Our team will contact you shortly.`);
  closeCorpModal();
  document.getElementById('corpForm')?.reset();
}

// Direct WhatsApp Inquiry
function sendWhatsAppInquiry() {
  const name = document.getElementById('corp-name')?.value || 'Corporate Client';
  const company = document.getElementById('corp-company')?.value || '';
  const service = document.getElementById('corp-service')?.value || 'Corporate Travel';
  
  let text = `Hello Kings Travels, I would like to inquire about ${service}`;
  if (company) text += ` for ${company}`;
  if (name && name !== 'Corporate Client') text += `. My name is ${name}`;
  
  window.open(`https://wa.me/message/APRJYOU4WDQQK1?text=${encodeURIComponent(text)}`, '_blank');
}
