/**
 * Kings Travels - Travel Guides Page Scripts
 * Handles Destination Tabs (India vs International)
 */

function switchDestTab(tab) {
  const tabIndia = document.getElementById('tab-india');
  const tabIntl = document.getElementById('tab-intl');
  const panelIndia = document.getElementById('panel-india');
  const panelIntl = document.getElementById('panel-intl');

  if (tab === 'india') {
    if (tabIndia) tabIndia.classList.add('active');
    if (tabIntl) tabIntl.classList.remove('active');
    if (panelIndia) panelIndia.style.display = 'grid';
    if (panelIntl) panelIntl.style.display = 'none';
  } else {
    if (tabIntl) tabIntl.classList.add('active');
    if (tabIndia) tabIndia.classList.remove('active');
    if (panelIntl) panelIntl.style.display = 'grid';
    if (panelIndia) panelIndia.style.display = 'none';
  }
}
