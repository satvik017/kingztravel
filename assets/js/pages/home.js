/**
 * Kings Travels - Home Page Scripts
 * Handles Destination Tabs, Min Date Selection, and Live Google Reviews
 */

// Destination tabs switcher
function switchTab(tab) {
  document.querySelectorAll('.dest-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.dest-panel').forEach(p => p.classList.remove('active'));
  
  const tabBtn = document.getElementById('tab-' + tab);
  const panel = document.getElementById('panel-' + tab);
  
  if (tabBtn) tabBtn.classList.add('active');
  if (panel) {
    panel.classList.add('active');
    panel.querySelectorAll('.fade-up').forEach(el => {
      el.classList.remove('visible');
      setTimeout(() => el.classList.add('visible'), 50);
    });
  }
}

window.switchTab = switchTab;

// Initialize Home Elements on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  // Set min date for departure datepicker
  const dateInput = document.getElementById('hero-date');
  if (dateInput) {
    dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
  }

  // Live Google Reviews Fetcher
  fetchLatestGoogleReviews();
});

// Google Reviews & Places API Dynamic Fetcher
const GOOGLE_REVIEWS_CONFIG = {
  // Paste your Google Cloud Places API Key below to fetch real-time updates directly from Google:
  apiKey: "", 
  // Google Place ID / Knowledge Graph ID:
  placeId: "11vyrq3glb", 
  defaultCount: 6,
  defaultRating: "5.0",
  profileUrl: "https://share.google/047qTUBYLNEfL6nUd"
};

async function fetchLatestGoogleReviews() {
  const countEls = document.querySelectorAll('.dynamic-review-count');
  const ratingEls = document.querySelectorAll('.dynamic-rating-score');
  
  let totalReviews = GOOGLE_REVIEWS_CONFIG.defaultCount;
  let averageRating = GOOGLE_REVIEWS_CONFIG.defaultRating;

  if (GOOGLE_REVIEWS_CONFIG.apiKey && GOOGLE_REVIEWS_CONFIG.placeId) {
    try {
      const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_REVIEWS_CONFIG.placeId}&fields=user_ratings_total,rating&key=${GOOGLE_REVIEWS_CONFIG.apiKey}`;
      const res = await fetch(apiUrl);
      if (res.ok) {
        const data = await res.json();
        if (data && data.result) {
          if (data.result.user_ratings_total) totalReviews = data.result.user_ratings_total;
          if (data.result.rating) averageRating = data.result.rating.toFixed(1);
        }
      }
    } catch (err) {
      console.warn("Google Places API live fetch fallback:", err);
    }
  }

  countEls.forEach(el => el.textContent = totalReviews);
  ratingEls.forEach(el => el.textContent = averageRating);
}

/**
 * PACKAGE ITINERARY HANDLERS (Inline Drawer & Full Modal)
 */
function togglePackageItinerary(drawerId, btn) {
  const drawer = document.getElementById(drawerId);
  if (!drawer) return;

  const isOpen = drawer.classList.contains('open');
  if (isOpen) {
    drawer.classList.remove('open');
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = `<span class="itinerary-label"><i class="fas fa-route"></i> View Day-Wise Itinerary</span> <i class="fas fa-chevron-down toggle-icon"></i>`;
  } else {
    drawer.classList.add('open');
    btn.classList.add('active');
    btn.setAttribute('aria-expanded', 'true');
    btn.innerHTML = `<span class="itinerary-label"><i class="fas fa-times-circle"></i> Hide Itinerary</span> <i class="fas fa-chevron-down toggle-icon"></i>`;
  }
}
window.togglePackageItinerary = togglePackageItinerary;

const PACKAGES_ITINERARIES = {
  kashmir: {
    title: "Kashmir Valley Honeymoon Escape",
    badge: "Honeymoon Escape • 6 Days / 5 Nights",
    route: "03N Srinagar • 01N Pahalgam • 01N Houseboat",
    price: "₹16,499",
    waMsg: "Hi Kings Travels, I am interested in the 6-Day Kashmir Valley Package Itinerary. Please share details and best quotation.",
    days: [
      {
        day: "Day 01",
        title: "Srinagar Arrival to Local Mughal Tour",
        desc: "On Arrival in Srinagar Airport meet and greet by our representative and transfer to Hotel directly. After refreshing, begin the iconic Mughal tour: Nishat Garden known as 'Garden of pleasure' built in the 16th century (1633) by Mughal King Asif Khan. Nishat Bagh is a terraced Mughal garden built on the eastern side of Dal Lake, the second largest in the Kashmir Valley. Then visit Shalimar Garden known as 'Garden of love' built in 1619 by Emperor Jahangir for his beloved wife Noor Jahan, considered the high point of Mughal horticulture. Dinner & overnight stay at hotel."
      },
      {
        day: "Day 02",
        title: "Srinagar – Sonmarg – Srinagar Excursion",
        desc: "Today you will take an exhilarating day tour to Sonamarg. Enjoy a scenic road trip with breathtaking views of Himalayan hills. The first destination is the Thajiwas Glacier, perpetually covered with snow throughout the year—a magical snowy wonderland. Next, visit the Nilagrad River, renowned for its pristine natural beauty and healing water beliefs. After a memorable day, return to your Srinagar hotel for dinner and overnight stay."
      },
      {
        day: "Day 03",
        title: "Srinagar – Gulmarg – Srinagar (Gondola & Meadows)",
        desc: "After breakfast, proceed to Gulmarg ('Meadow of Flowers'). Visit Lord Shiva temple, the world’s highest Golf Course, Gulmarg Club, St. Mary Church, and Children's Park. Experience Asia's highest and longest cable car project—the Gulmarg Gondola—ferrying travelers to Kongdoori Mountain and nearby Afarwat Peak (4,200 m / 13,780 ft). Enjoy optional skiing, snow sledging, tube rides, and pony rides. Evening return to Srinagar hotel for dinner & overnight stay."
      },
      {
        day: "Day 04",
        title: "Srinagar to Pahalgam (Saffron Fields & Lidder River)",
        desc: "After breakfast, proceed to Pahalgam via the Golden land of Kashmir 'Saffron Fields' and the ancient Awantipora Ruins. Upon arrival in Pahalgam, check into the hotel. Enjoy leisure time exploring the tranquil Pahalgam Valley and strolling along the crystal-clear Lidder River. Dinner & overnight stay at hotel."
      },
      {
        day: "Day 05",
        title: "Full Day Pahalgam Excursion to Srinagar Houseboat",
        desc: "Morning after breakfast by 09:00 AM, embark on a full-day excursion in Pahalgam ('Village of Shepherds') offering breathtaking Himalayan panoramas. Visit Aru Valley, Betaab Valley, and Chandanwari. In the evening, drive back to Srinagar and check into a traditional luxury Houseboat on Dal Lake. Enjoy dinner & overnight stay on the houseboat."
      },
      {
        day: "Day 06",
        title: "Srinagar Airport / Railway Station Drop",
        desc: "After breakfast, enjoy free leisure time until departure. Transfer to Srinagar airport or railway station for your onward journey with lifelong happy memories of your Kashmir tour and our hospitality."
      }
    ]
  },
  dubai: {
    title: "Dubai Luxury Family Experience",
    badge: "Luxury Experience • 6 Days / 5 Nights",
    route: "5 Nights Dubai (Citymax Hotel Bur Dubai)",
    price: "₹17,499",
    waMsg: "Hi Kings Travels, I am interested in the 6-Day Dubai Luxury Family Package Itinerary. Please share details and best quotation.",
    days: [
      {
        day: "Day 01",
        title: "Arrival in Dubai | Private Airport Transfer",
        desc: "Arrival at Dubai International Airport (DXB). Meet our representative and enjoy a smooth private transfer in a 6-seater cab to Citymax Hotel Bur Dubai. Check-in and relax after your journey."
      },
      {
        day: "Day 02",
        title: "Dubai City Tour & Burj Khalifa At The Top (124th Floor)",
        desc: "Discover Dubai's iconic highlights on a guided City Tour. Later, ascend to 'At The Top' Burj Khalifa 124th Floor (Non-Prime Time) for breathtaking 360-degree views from the world's tallest building—a seamless blend of ancient heritage and futuristic grandeur.",
        note: "Transfers provided on SIC/PVT basis. Non-prime time slots applicable (Oct–Dec: 5:00–7:00 AM, 7:30–11:30 AM, 8:30–11:00 PM)."
      },
      {
        day: "Day 03",
        title: "Desert Safari with Dune Bashing & BBQ Buffet Dinner",
        desc: "Embark on an adrenaline-pumping Desert Safari in luxury 4x4 vehicles. Enjoy thrilling dune bashing, sunset photo stops, camel rides, henna painting, and Shisha. Relish a lavish international BBQ buffet dinner accompanied by live belly dancing, fire show, and Tanoura performances."
      },
      {
        day: "Day 04",
        title: "Dhow Marina Cruise with International Buffet Dinner",
        desc: "Board the traditional Arabian Dhow Cruise for a magical 90-minute evening journey along Dubai Marina's Venetian-style canals. Enjoy a welcome beverage, gourmet international buffet dinner, and live cultural entertainment while gazing at illuminated marina skyscrapers."
      },
      {
        day: "Day 05",
        title: "Day at Leisure | Shopping & Sightseeing",
        desc: "Spend your day exploring Dubai at your own leisure. Visit the world-famous Dubai Mall, witness the Dubai Aquarium, explore the vibrant Gold & Spice Souks, or admire the floral wonders of Dubai Miracle Garden."
      },
      {
        day: "Day 06",
        title: "Departure | Private Airport Drop",
        desc: "After breakfast, check out from Citymax Hotel Bur Dubai. Enjoy a private transfer to Dubai International Airport (DXB) for your flight back home carrying cherished memories of Dubai."
      }
    ]
  },
  andaman: {
    title: "Andaman Island & Beach Escape",
    badge: "Beach & Islands • 6 Days / 5 Nights",
    route: "1N Port Blair • 2N Havelock • 1N Neil Island • 1N Port Blair",
    price: "₹19,499",
    waMsg: "Hi Kings Travels, I am interested in the 6-Day Andaman Island Package Itinerary. Please share details and best quotation.",
    days: [
      {
        day: "Day 01",
        title: "Arrive Port Blair – Corbyn's Cove & Cellular Jail Light & Sound",
        desc: "Arrive at Veer Savarkar Airport, Port Blair. Meet our representative and transfer to your pre-booked hotel. In the afternoon, visit Corbyn’s Cove Beach (9 km from city), ideal for swimming and sun-basking. Later, visit the historic Cellular Jail ('Kala Paani') national memorial and witness the inspiring Light & Sound show narrating the heroic saga of India's freedom fighters. Overnight at Port Blair."
      },
      {
        day: "Day 02",
        title: "Port Blair to Havelock Island via Ferry – Radhanagar Beach",
        desc: "Board the luxury private tourist ferry to Havelock Island (57 km by sea). On arrival at Havelock jetty, proceed to world-famous Radhanagar Beach (ranked among Asia's best beaches). Marvel at the white curve of sand with turquoise waters fringed by tropical rainforest. Overnight at Havelock Island."
      },
      {
        day: "Day 03",
        title: "Kalapathar Beach Excursion at Havelock Island",
        desc: "After breakfast, board vehicle for Kala Patthar Beach. A tranquil paradise renowned for black volcanic rocks contrasting with powdery white sand and turquoise ocean. Relax on wooden hammocks and capture stunning tropical photographs. Overnight at Havelock Island."
      },
      {
        day: "Day 04",
        title: "Havelock to Neil Island Ferry – Laxmanpur & Natural Bridge",
        desc: "Take the morning luxury ferry to Neil Island (18 km by sea), known as the 'Vegetable Bowl of Andaman'. Check into hotel and visit Laxmanpur Beach to witness the wonder of the Natural Living Rock Bridge (subject to low tide). Enjoy the sunset. Overnight at Neil Island."
      },
      {
        day: "Day 05",
        title: "Neil Island (Bharatpur Beach) to Port Blair Return Ferry",
        desc: "Visit Bharatpur Beach, renowned for coral reefs and optional water activities (glass bottom boat, jet ski, snorkeling, scuba diving). In the evening, take the luxury ferry back to Port Blair. Check in and overnight at Port Blair."
      },
      {
        day: "Day 06",
        title: "Port Blair Hotel to Airport Drop",
        desc: "After breakfast, check out and transfer to Veer Savarkar Airport, Port Blair for your flight home with unforgettable island memories."
      }
    ]
  },
  thailand: {
    title: "Thailand Beach & Culture Escape",
    badge: "Beach & Culture • 6 Days / 5 Nights",
    route: "3N Pattaya • 2N Bangkok",
    price: "₹13,999",
    waMsg: "Hi Kings Travels, I am interested in the 6-Day Thailand Beach & Culture Package Itinerary. Please share details and best quotation.",
    days: [
      {
        day: "Day 01",
        title: "Bangkok Airport Arrival – Private Transfer to Pattaya",
        desc: "Arrive at Bangkok Suvarnabhumi International Airport (BKK). Meet our local representative and transfer to Pattaya by private vehicle. Check into hotel and relax. Evening at leisure to explore Pattaya Beach, night markets, or Walking Street. Overnight in Pattaya."
      },
      {
        day: "Day 02",
        title: "Full Day Coral Island Tour with Speedboat & Indian Lunch",
        desc: "Breakfast at hotel. Embark on an exciting speedboat tour to Coral Island (Koh Larn) on SIC basis. Relax on white sand beaches, swim in turquoise waters, or enjoy optional parasailing, banana boat, and jet ski. Savor an Indian buffet lunch. Evening free or optional Alcazar Cabaret Show. Overnight in Pattaya."
      },
      {
        day: "Day 03",
        title: "Pattaya City Sightseeing – Transfer to Bangkok",
        desc: "Visit the Sanctuary of Truth, Pattaya Viewpoint, and the Big Buddha Temple. Later, enjoy a scenic transfer to Bangkok. Check into Bangkok hotel and relax. Evening free for shopping at Pratunam or local night bazaars. Overnight in Bangkok."
      },
      {
        day: "Day 04",
        title: "Bangkok City Temple Tour & Chao Phraya River Dinner Cruise",
        desc: "Guided Bangkok temple tour visiting Golden Buddha Temple (Wat Traimit), Marble Temple (Wat Benchamabophit), and the Gems Gallery. In the evening, board the luxurious Chao Phraya River Dinner Cruise featuring an international buffet and live music with illuminated temple views. Overnight in Bangkok."
      },
      {
        day: "Day 05",
        title: "Safari World & Marine Park Excursion – Transfer to Pattaya",
        desc: "Check out and visit Safari World & Marine Park. Enjoy open safari drive, dolphin shows, sea lion stunts, and wild animal encounters with lunch. Later transfer to Pattaya hotel and check in. Overnight in Pattaya."
      },
      {
        day: "Day 06",
        title: "Pattaya to Bangkok Airport Departure",
        desc: "Breakfast at hotel. Check out and transfer to Bangkok Airport (BKK) for your onward flight with wonderful memories of Thailand."
      }
    ]
  },
  himachal: {
    title: "Himachal Hills & Valleys Tour",
    badge: "Hill Station • 6 Days / 5 Nights",
    route: "2N Shimla • 3N Manali",
    price: "₹11,999",
    waMsg: "Hi Kings Travels, I am interested in the 6-Day Himachal Hills Package Itinerary. Please share details and best quotation.",
    days: [
      {
        day: "Day 01",
        title: "Delhi / Chandigarh to Shimla Scenic Hill Drive",
        desc: "Pickup from Delhi or Chandigarh and drive through the scenic Shivalik mountain ranges to Shimla ('Queen of Hills'). Check in to hotel. In the evening, stroll along Mall Road, the Ridge, and historic Christ Church. Overnight in Shimla."
      },
      {
        day: "Day 02",
        title: "Shimla – Kufri Excursion & Local Heritage Tour",
        desc: "After breakfast, excursion to Kufri. Enjoy panoramic Himalayan views, Himalayan Wildlife Zoo, Mahasu Peak, and pony rides. In the afternoon, visit Jakhoo Temple, Vice Regal Lodge, and Lakkar Bazaar. Overnight in Shimla."
      },
      {
        day: "Day 03",
        title: "Shimla to Manali via Kullu Valley & Pandoh Dam",
        desc: "Scenic 260 km road journey to Manali. Drive past Sundernagar Lake, Pandoh Dam, and Hanogi Mata Temple. Stop in Kullu Valley for white-water river rafting and visit famous Kullu Shawl weaving factories. Check into Manali hotel. Overnight in Manali."
      },
      {
        day: "Day 04",
        title: "Manali Local Sightseeing & Temple Tour",
        desc: "Visit the 450-year-old Hadimba Devi Temple set in giant cedar woods, Vashisht Hot Water Sulphur Springs & Temple, Tibetan Monastery, Club House, and Van Vihar. Evening leisure on Mall Road. Overnight in Manali."
      },
      {
        day: "Day 05",
        title: "Solang Valley Snow Adventure & Atal Tunnel Excursion",
        desc: "Full-day excursion to Solang Valley. Enjoy snow activities, paragliding, zorbing, and cable car ropeway. Drive through the world's longest highway tunnel above 10,000 ft—Atal Tunnel to Sissu (subject to weather/permits). Overnight in Manali."
      },
      {
        day: "Day 06",
        title: "Manali to Chandigarh / Delhi Departure",
        desc: "Breakfast at hotel. Check out and drive back to Chandigarh or Delhi airport/railway station for onward departure."
      }
    ]
  },
  ladakh: {
    title: "Leh Ladakh Adventure Escape",
    badge: "Himalayan Adventure • 6 Days / 5 Nights",
    route: "3N Leh • 1N Nubra Valley • 1N Pangong Lake",
    price: "₹17,999",
    waMsg: "Hi Kings Travels, I am interested in the 6-Day Leh Ladakh Adventure Package Itinerary. Please share details and best quotation.",
    days: [
      {
        day: "Day 01",
        title: "Arrive in Leh (3,524 m) – Mandatory Acclimatization",
        desc: "Arrive at Kushok Bakula Rimpochee Airport, Leh. Traditional welcome and transfer to hotel. Rest complete day for high-altitude acclimatization. Evening short walk in Leh Market and Shanti Stupa for a majestic sunset. Overnight in Leh."
      },
      {
        day: "Day 02",
        title: "Leh Sightseeing – Hall of Fame, Magnetic Hill & Sangam",
        desc: "Visit the Hall of Fame war memorial, experience the optical illusion at Magnetic Hill, pay homage at Gurudwara Pathar Sahib, and witness the dramatic Confluence (Sangam) of the Indus and Zanskar rivers. Overnight in Leh."
      },
      {
        day: "Day 03",
        title: "Leh to Nubra Valley via Khardung La Pass (17,582 ft)",
        desc: "Drive over Khardung La Pass, one of the highest motorable roads on Earth. Descend into Nubra Valley ('Valley of Flowers'). Visit Diskit Monastery with its 106-ft Maitreya Buddha statue and enjoy a double-humped Bactrian camel ride at Hunder sand dunes. Overnight in Nubra Valley camp/hotel."
      },
      {
        day: "Day 04",
        title: "Nubra to Pangong Tso Lake (14,270 ft) via Shyok Route",
        desc: "Scenic journey along the turquoise Shyok River to world-renowned Pangong Lake. Admire the ever-changing shades of blue spanning from India to Tibet. Watch sunset reflections across the tranquil lake. Overnight in Pangong deluxe camp."
      },
      {
        day: "Day 05",
        title: "Pangong Sunrise to Leh via Chang La Pass (17,590 ft)",
        desc: "Witness a breathtaking sunrise over Pangong Lake. Drive back to Leh crossing Chang La Pass. En route, visit Thiksey Monastery and Shey Palace. Evening free for shopping in Leh bazaars. Overnight in Leh."
      },
      {
        day: "Day 06",
        title: "Leh Airport Drop",
        desc: "Morning transfer to Leh Airport for return flight with lifelong memories of the Land of High Passes."
      }
    ]
  },
  bali: {
    title: "Bali Romantic Island Getaway",
    badge: "Romantic Getaway • 6 Days / 5 Nights",
    route: "3N Kuta / Seminyak • 2N Ubud",
    price: "₹19,999",
    waMsg: "Hi Kings Travels, I am interested in the 6-Day Bali Romantic Island Package Itinerary. Please share details and best quotation.",
    days: [
      {
        day: "Day 01",
        title: "Arrive Bali (DPS) – Transfer to Kuta/Seminyak Resort",
        desc: "Arrive at Ngurah Rai International Airport, Denpasar. Flower garland welcome and private transfer to your resort. Relax and enjoy a romantic evening walk on Seminyak Beach with sunset drinks. Overnight in Bali."
      },
      {
        day: "Day 02",
        title: "Tanjung Benoa Watersports & Uluwatu Sunset Kecak Dance",
        desc: "Head to Tanjung Benoa for thrilling water sports (Banana boat ride included). In the afternoon, visit the dramatic Uluwatu Cliff Temple perched 70 meters above roaring Indian Ocean waves. Watch the famous sunset Kecak Fire Dance performance. Overnight in Bali."
      },
      {
        day: "Day 03",
        title: "Nusa Penida Island Speedboat Day Tour (West Coast)",
        desc: "Take a luxury speedboat to Nusa Penida Island. Visit the world-famous T-Rex cliff at Kelingking Beach, Broken Beach, Angel's Billabong natural infinity pool, and Crystal Bay. Buffet lunch included. Return to Bali mainland in the evening. Overnight in Bali."
      },
      {
        day: "Day 04",
        title: "Kintamani Volcano, Rice Terraces, Jungle Swing & Ubud Resort",
        desc: "Scenic drive to Kintamani overlooking Mount Batur volcano and crater lake. Visit Tegalalang Rice Terraces, experience the iconic Bali Jungle Swing, and sample authentic Luwak coffee. Check into Ubud jungle resort. Overnight in Ubud."
      },
      {
        day: "Day 05",
        title: "Ubud Monkey Forest, Waterfalls & Tanah Lot Temple",
        desc: "Explore Ubud Sacred Monkey Forest Sanctuary and picturesque Tegenungan Waterfall. In the late afternoon, visit the iconic offshore Tanah Lot Temple for world-class sunset silhouettes over the ocean. Overnight in Ubud."
      },
      {
        day: "Day 06",
        title: "Ubud Leisure to Denpasar Airport Departure",
        desc: "Enjoy breakfast at the resort. Free time for souvenir shopping at Ubud Traditional Art Market until private transfer to Denpasar Airport (DPS) for departure."
      }
    ]
  },
  kerala: {
    title: "Kerala Backwaters Family Holiday",
    badge: "Family Holiday • 6 Days / 5 Nights",
    route: "01N Cochin • 02N Munnar • 01N Thekkady • 01N Alleppey",
    price: "₹13,499",
    waMsg: "Hi Kings Travels, I am interested in the 6-Day Kerala Backwaters Package Itinerary. Please share details and best quotation.",
    days: [
      {
        day: "Day 01",
        title: "Arrival at Cochin & Heritage Sightseeing",
        desc: "Cochin, the confluence point of the alluring Arabian Sea and silent backwaters, will be your host. Warm meet & greet, transfer to hotel to freshen up. Visit Folklore Museum, Jew Town, Jewish Synagogue, Dutch Palace, St. Francis Church, Santa Cruz Basilica, Fort Kochi Beach, Chinese Fishing Nets, Marine Drive, and Lulu Mall. Overnight in Cochin hotel."
      },
      {
        day: "Day 02",
        title: "Cochin to Munnar Scenic Hill Drive (4 Hrs)",
        desc: "Drive to the hill station of Munnar ('Nature Lover’s Paradise'), cosseted by lush greeneries, mountain mist, and endless tea plantations. Visit Cheeyappara and Valara Waterfalls en route. Check into hotel/resort. Overnight stay at Munnar."
      },
      {
        day: "Day 03",
        title: "Munnar Local Sightseeing & Eravikulam National Park",
        desc: "Full day sightseeing tour: Echo Point, Kundala Lake & Dam, Mattupetty Lake & Dam, Munnar Boating, Tea gardens, Tea Museum & Factory, Rose (Blossom) Garden, Pothamedu View Point, and Eravikulam National Park (habitat of the endangered Nilgiri Tahr). Overnight stay in Munnar."
      },
      {
        day: "Day 04",
        title: "Munnar to Thekkady Drive (4 Hrs) & Periyar Wildlife Safari",
        desc: "Drive to Thekkady near the Kerala-Tamil Nadu border. Check into hotel. Embark on a tour to Periyar National Park and enjoy a boat cruise on Periyar Lake (home to elephants, sambar, gaur). Visit spice plantations and opt for traditional Kathakali / Kalaripayattu shows. Overnight in Thekkady."
      },
      {
        day: "Day 05",
        title: "Thekkady to Alleppey (5 Hrs) & Backwater Cruise",
        desc: "Proceed to Alleppey ('Venice of the East'). Check into hotel/traditional Kerala houseboat. Explore the enchanting backwaters, Vembanad Lake, Kuttanad (farming below sea level), Mannarasala temple, and Alleppey Beach. Optional Ayurvedic massage. Overnight stay in Alleppey."
      },
      {
        day: "Day 06",
        title: "Alleppey to Cochin Departure (2 Hrs)",
        desc: "Breakfast within the houseboat amidst tranquil backwaters. Check out and drive to Cochin International Airport for onward departure with cherished memories of God's Own Country."
      }
    ]
  }
};

function openItineraryModal(packageKey) {
  const pkg = PACKAGES_ITINERARIES[packageKey];
  if (!pkg) return;

  const modal = document.getElementById('itineraryModal');
  if (!modal) return;

  document.getElementById('modalBadge').textContent = pkg.badge;
  document.getElementById('modalTitle').textContent = pkg.title;
  document.getElementById('modalRoute').innerHTML = `<i class="fas fa-bed"></i> ${pkg.route}`;
  document.getElementById('modalPrice').innerHTML = `${pkg.price} <span>/ person</span>`;
  
  const waBtn = document.getElementById('modalWhatsAppBtn');
  if (waBtn) {
    waBtn.href = `https://wa.me/message/APRJYOU4WDQQK1?text=${encodeURIComponent(pkg.waMsg)}`;
  }

  const modalBody = document.getElementById('modalBody');
  let html = '';
  pkg.days.forEach(d => {
    html += `
      <div class="modal-timeline-item">
        <div class="modal-day-header">
          <span class="modal-day-badge">${d.day}</span>
          <h4 class="modal-day-title">${d.title}</h4>
        </div>
        <p class="modal-day-desc">${d.desc}</p>
        ${d.note ? `<div class="modal-day-note"><i class="fas fa-info-circle"></i> ${d.note}</div>` : ''}
      </div>
    `;
  });
  modalBody.innerHTML = html;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
window.openItineraryModal = openItineraryModal;

function closeItineraryModal(e) {
  if (e && e.target && e.target.classList && !e.target.classList.contains('itinerary-modal-backdrop') && !e.target.classList.contains('itinerary-modal-close')) {
    return;
  }
  const modal = document.getElementById('itineraryModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}
window.closeItineraryModal = closeItineraryModal;

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeItineraryModal();
  }
});

