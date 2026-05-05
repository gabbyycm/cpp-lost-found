const NAV_SCREENS = [
  "lost-list",
  "item-details",
  "claim-form",
  "claim-celebration",
  "claim-map",
  "claim-history",
  "notifications",
  "found-form",
  "found-celebration",
  "found-map",
  "lost-form",
  "lost-celebration"
];

const buildings = [
  "Building 1 - Student Services Building",
  "Building 2 - College of Agriculture",
  "Building 3 - Science Laboratory",
  "Building 4 - Biotechnology Building",
  "Building 4A - BioTrek Learning Center",
  "Building 5 - College of Letters, Arts, and Social Sciences",
  "Building 6 - College of Business Administration",
  "Building 7 - College of Environmental Design",
  "Building 8 - College of Science",
  "Building 9 - College of Engineering",
  "Building 13 - Art Department and Engineering Annex",
  "Building 15 - University Library",
  "Building 17 - Engineering Laboratories",
  "Building 20 - Residence Hall: Alamitos",
  "Building 21 - Residence Hall: Aliso",
  "Building 22 - Residence Hall: Cedritos",
  "Building 23 - Residence Hall: Encinitas",
  "Building 24 - Music",
  "Building 25 - Drama Department / Theatre",
  "Building 26 - University Plaza",
  "Building 26A - Parking Information Booth",
  "Building 30 - Agricultural Unit",
  "Building 32 - Beef Unit / Feed Shed",
  "Building 35 - Bronco Student Center",
  "Building 37 - Swimming Pool",
  "Building 38 - Swine Unit / Shelters",
  "Building 41 - Darlene May Gymnasium",
  "Building 42 - BRIC",
  "Building 43 - Kellogg Gymnasium",
  "Building 45 - Agricultural Engineering",
  "Building 46 - Health Services",
  "Building 55 - Foundation Administration Offices",
  "Building 57 - Residence Hall: Montecito",
  "Building 58 - Residence Hall: Palmitas",
  "Building 59 - Los Olivos Commons",
  "Building 60 - Residence Suites",
  "Building 61 - Residence Suites",
  "Building 66 - Bronco Bookstore",
  "Building 67 - Interim Design Center",
  "Building 70 - Lyle Center for Regenerative Studies",
  "Building 79 - Collins College of Hospitality Management",
  "Building 86 - English Language Institute",
  "Building 89 - I Poly High School",
  "Building 91 - Information Technology Services",
  "Building 92 - Laboratory Facility",
  "Building 94 - University Office Building",
  "Building 95 - Cultural Centers",
  "Building 97 - Campus Center",
  "Building 98 - Classroom / Laboratory / Administration",
  "Building 106 - Parking Structure",
  "Building 109 - Police and Parking Services",
  "Building 111 - Manor House",
  "Building 112 - Kellogg House Pomona",
  "Building 116 - Child Care Center",
  "Building 128 - I Poly High School",
  "Building 133 - Parking Information Booth",
  "Building 193 - Chilled Water Center Plant",
  "Building 200 - University Village",
  "Building 209 - Lyle Center for Regenerative Studies",
  "Building 211 - Agriscapes / Farm Store",
  "Building 220A - Center for Training, Technology and Incubation",
  "Building 220B - Center for Training, Technology and Incubation",
  "Building 220C - Center for Training, Technology and Incubation",
  "University Library",
  "Bronco Student Center",
  "Bronco Bookstore",
  "BRIC",
  "Police and Parking Services",
  "Student Services Building",
  "Parking Lot J",
  "Parking Lot M"
];

function showBuildingSuggestions(inputId, suggestionsId) {
  const input = document.getElementById(inputId);
  const suggestionsBox = document.getElementById(suggestionsId);
  const query = input.value.trim().toLowerCase();

  suggestionsBox.innerHTML = "";

  if (query.length < 2) {
    suggestionsBox.style.display = "none";
    return;
  }

  const matches = buildings.filter((building) => {
    return building.toLowerCase().includes(query);
  });

  if (matches.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  matches.forEach((building) => {
    const item = document.createElement("div");
    item.className = "suggestion-item";
    item.textContent = building;

    item.onclick = function () {
      input.value = building;
      suggestionsBox.style.display = "none";

      if (inputId === "lostLocation") {
        updateCount("lostLocation", "lostLocationCount", 80);
      }

      if (inputId === "locationFound") {
        updateCount("locationFound", "locationFoundCount", 80);
      }
    };

    suggestionsBox.appendChild(item);
  });

  suggestionsBox.style.display = "block";
}

let lastMapScreen = "";
let claimHistory = [];

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  const nav = document.getElementById("bottomNav");
  nav.classList.toggle("visible", NAV_SCREENS.includes(id));

  if (id === "found-map" || id === "claim-map") {
    lastMapScreen = id;
  }

  if (id === "claim-history") {
    renderClaimHistory();
  }
}

function goHome() {
  showScreen("home");
  setActiveNav(null);
}

function setActiveNav(id) {
  document.querySelectorAll(".nav-item").forEach((nav) => {
    nav.classList.remove("active");
  });

  if (id) {
    document.getElementById(id).classList.add("active");
  }
}

function enterApp(dest, navId) {
  showScreen(dest);
  setActiveNav(navId);
}

function navTo(screenId, navId) {
  showScreen(screenId);
  setActiveNav(navId);
}

function clearNotif() {
  const badge = document.getElementById("notifBadge");
  if (badge) {
    badge.style.display = "none";
  }
}

function showItemDetail(name, location, date, desc, note, imageUrl) {
  document.getElementById('detail-name').textContent = name;
  document.getElementById('detail-location').textContent = location;
  document.getElementById('detail-date').textContent = date;
  document.getElementById('detail-desc').textContent = desc;
  document.getElementById('detail-note').textContent = note;

  // 🔥 NEW: update image
  document.getElementById('detail-img').src = imageUrl;

  showScreen('item-details');
}

function filterItems() {
  const q = document.getElementById("searchInput").value.toLowerCase();

  document.querySelectorAll(".searchable-item").forEach((item) => {
    item.style.display = item.dataset.name.includes(q) ? "block" : "none";
  });
}

function updateCount(inputId, countId, max) {
  const input = document.getElementById(inputId);
  const counter = document.getElementById(countId);

  const len = input.value.length;
  counter.textContent = len + " / " + max;

  if (len >= max) {
    counter.className = "char-count over";
  } else if (len >= max * 0.85) {
    counter.className = "char-count warn";
  } else {
    counter.className = "char-count";
  }
}

function previewImage(event, previewId) {
  const file = event.target.files[0];
  const preview = document.getElementById(previewId);

  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  }
}

function showBuildingSuggestions(inputId, suggestionsId) {
  const input = document.getElementById(inputId);
  const suggestionsBox = document.getElementById(suggestionsId);
  const query = input.value.toLowerCase();

  suggestionsBox.innerHTML = "";

  if (query.length < 2) {
    suggestionsBox.style.display = "none";
    return;
  }

  const matches = buildings.filter((building) => {
    return building.toLowerCase().includes(query);
  });

  if (matches.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  matches.forEach((building) => {
    const item = document.createElement("div");
    item.className = "suggestion-item";
    item.textContent = building;

    item.onclick = function () {
      input.value = building;
      suggestionsBox.style.display = "none";

      if (inputId === "lostLocation") {
        updateCount("lostLocation", "lostLocationCount", 80);
      }

      if (inputId === "locationFound") {
        updateCount("locationFound", "locationFoundCount", 80);
      }
    };

    suggestionsBox.appendChild(item);
  });

  suggestionsBox.style.display = "block";
}

function showLoading(msg, ms, cb) {
  document.getElementById("loadingMsg").textContent = msg;
  document.getElementById("loadingOverlay").classList.add("active");

  setTimeout(() => {
    document.getElementById("loadingOverlay").classList.remove("active");
    cb();
  }, ms);
}

function submitLostItem(e) {
  e.preventDefault();

  showLoading("Submitting your lost item report…", 1200, () => {
    showScreen("lost-celebration");

    // simulate notification appearing
    setTimeout(() => {
      document.getElementById("notifBadge").style.display = "block";
    }, 1500);
  });
}

function submitFoundItem(e) {
  e.preventDefault();

  showLoading("Submitting your found item report…", 1200, () => {
    showScreen("found-celebration");
    setActiveNav("nav-report");
  });
}

function submitClaim(e) {
  e.preventDefault();

  showLoading("Verifying your claim…", 1200, () => {
    addClaimToHistory();
    showScreen("claim-celebration");
    setActiveNav("nav-browse");
  });
}

function addClaimToHistory() {
  const itemName = document.getElementById("detail-name").textContent;

  const claim = {
    item: itemName,
    status: "Confirmed",
    location: "Student Services Building",
    date: new Date().toLocaleDateString()
  };

  claimHistory.push(claim);
  renderClaimHistory();
}

function renderClaimHistory() {
  const list = document.getElementById("claimHistoryList");

  if (claimHistory.length === 0) {
    list.innerHTML = `
      <div class="info-card">
        <h3>No claims yet</h3>
        <p class="cant-find-sub">Claimed items will appear here after you submit a claim.</p>
      </div>
    `;
    return;
  }

  list.innerHTML = "";

  claimHistory.forEach((claim) => {
    const card = document.createElement("div");
    card.className = "item-card";

    card.innerHTML = `
      <div class="item-card-body">
        <div class="item-card-top">
          <h3>${claim.item}</h3>
          <span class="status-badge">${claim.status}</span>
        </div>
        <p>📍 Pickup: ${claim.location}</p>
        <p>🗓 Claimed: ${claim.date}</p>
        <button class="outline-btn" onclick="showScreen('claim-map')">
          View Pickup Map
        </button>
      </div>
    `;

    list.appendChild(card);
  });
}

function openLastMap() {
  if (lastMapScreen) {
    showScreen(lastMapScreen);
  } else {
    showScreen("found-map");
  }
}

function openMaps() {
  window.open(
    "https://www.google.com/maps/search/Cal+Poly+Pomona+Student+Services+Building/@34.0572,-117.8224,17z",
    "_blank"
  );
}