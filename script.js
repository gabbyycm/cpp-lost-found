function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");

  screens.forEach((screen) => {
    screen.classList.remove("active");
  });

  document.getElementById(screenId).classList.add("active");
}

function submitFoundItem(event) {
  event.preventDefault();
  showScreen("submit-success");
}

function submitClaim(event) {
  event.preventDefault();
  showScreen("notification-screen");
}

function filterItems() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const items = document.querySelectorAll(".searchable-item");

  items.forEach((item) => {
    const text = item.dataset.name;
    if (text.includes(input)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}