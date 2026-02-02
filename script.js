const modal = document.getElementById("rsvpModal");
const closeModalBtn = document.getElementById("closeModal");
const packageSelect = document.getElementById("packageSelect");
const playersContainer = document.getElementById("playersContainer");

const changePackageBtn = document.getElementById("changePackageBtn");
const packageSummary = document.getElementById("packageSummary");

const companyFieldset = document.getElementById("companyFieldset");
const companyName = document.getElementById("companyName");
const vatNumber = document.getElementById("vatNumber");

const wateringDietFieldset = document.getElementById("wateringDietFieldset");
const wateringDiet1 = document.getElementById("wateringDiet1");
const wateringDiet2 = document.getElementById("wateringDiet2");
const wateringDietNotes1 = document.getElementById("wateringDietNotes1");
const wateringDietNotes2 = document.getElementById("wateringDietNotes2");

// Four-balls per package
const packageFourballs = {
  main: 4,
  platinum: 3,
  gold: 2,
  silver: 2,
  goodie: 1,
  fourball: 1,
  watering: 0
};

// Package summary details (shown in modal)
const packageDetails = {
  main: { title: "Main Sponsor", bullets: ["4 Four-Balls", "Gala Dinner Table for 8"] },
  platinum: { title: "Platinum Sponsor", bullets: ["3 Four-Balls", "Gala Dinner Table for 8"] },
  gold: { title: "Gold Sponsor", bullets: ["2 Four-Balls", "Gala Dinner Table for 8"] },
  silver: { title: "Silver Sponsor", bullets: ["2 Four-Balls"] },
  goodie: { title: "Goodie Bag Sponsor", bullets: ["1 Four-Ball", "Gala Dinner Table for 4"] },
  fourball: { title: "Four-Ball Only", bullets: ["1 Four-Ball", "Dinner Table for 4"] },

  watering: {
    title: "Watering Hole Sponsor",
    bullets: [
      "A watering hole to activate and share marketing collateral",
      "1 × Gala dinner table for 2",
      "Branding on the putting greens",
      "Branding across all communication platforms building up to the event",
      "Branding on the day of the event",
      "1 × Watering Hole"
    ]
  }
};

// Open modal + auto-select package
document.querySelectorAll(".package-card button").forEach(button => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest(".package-card");
    const selectedPackage = card.dataset.package;

    modal.classList.add("active");
    packageSelect.value = selectedPackage;
    packageSelect.dispatchEvent(new Event("change"));
  });
});

// Close modal (shared reset)
function closeModal() {
  modal.classList.remove("active");
  playersContainer.innerHTML = "";
  packageSelect.value = "";

  // reset company fields
  companyFieldset.classList.add("hidden");
  companyName.value = "";
  vatNumber.value = "";
  companyName.required = false;
  vatNumber.required = false;

  // reset watering dietary fields
  wateringDietFieldset.classList.add("hidden");
  wateringDiet1.value = "";
  wateringDiet2.value = "";
  wateringDietNotes1.value = "";
  wateringDietNotes2.value = "";
  wateringDiet1.required = false;
  wateringDiet2.required = false;

  // reset package summary
  packageSummary.classList.add("hidden");
  packageSummary.innerHTML = "";
}

closeModalBtn.addEventListener("click", closeModal);

// Close on overlay click
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Change package button: close modal & scroll to packages
changePackageBtn.addEventListener("click", () => {
  closeModal();
  document.querySelector(".packages").scrollIntoView({ behavior: "smooth" });
});

// Helper: set up accordion behavior for mobile (only one open)
function setupMobileAccordion() {
  const detailsList = playersContainer.querySelectorAll("details.player-accordion");

  detailsList.forEach((details) => {
    details.addEventListener("toggle", () => {
      const isMobileNow = window.matchMedia("(max-width: 768px)").matches;
      if (!isMobileNow) return;
      if (!details.open) return;

      detailsList.forEach((other) => {
        if (other !== details) other.removeAttribute("open");
      });
    });
  });
}

// Package change logic
packageSelect.addEventListener("change", () => {
  playersContainer.innerHTML = "";
  const selected = packageSelect.value;

  // Render package summary
  const details = packageDetails[selected];
  if (details) {
    packageSummary.classList.remove("hidden");
    packageSummary.innerHTML = `
      <h4>${details.title}</h4>
      <ul>${details.bullets.map(item => `<li>${item}</li>`).join("")}</ul>
    `;
  } else {
    packageSummary.classList.add("hidden");
    packageSummary.innerHTML = "";
  }

  // Reset + hide special sections by default
  companyFieldset.classList.add("hidden");
  companyName.required = false;
  vatNumber.required = false;

  wateringDietFieldset.classList.add("hidden");
  wateringDiet1.required = false;
  wateringDiet2.required = false;

  // Clear values when switching packages
  companyName.value = "";
  vatNumber.value = "";
  wateringDiet1.value = "";
  wateringDiet2.value = "";
  wateringDietNotes1.value = "";
  wateringDietNotes2.value = "";

  // ✅ Watering Hole: show company + dietary (2 guests), no players
  if (selected === "watering") {
    companyFieldset.classList.remove("hidden");
    companyName.required = true;
    vatNumber.required = true;

    wateringDietFieldset.classList.remove("hidden");
    wateringDiet1.required = true;
    wateringDiet2.required = true;

    return;
  }

  // Other packages: generate players
  const fourballs = packageFourballs[selected] || 0;
  const totalPlayers = fourballs * 4;
  if (totalPlayers === 0) return;

  for (let i = 1; i <= totalPlayers; i++) {
    playersContainer.innerHTML += `
      <details class="player-accordion" ${i === 1 ? "open" : ""}>
        <summary>Player ${i}</summary>

        <div class="player-inner">
          <input type="text" placeholder="Full Name" required />

          <select required>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input type="tel" placeholder="Phone Number" required />
          <input type="email" placeholder="Email Address" required />

          <select required>
            <option value="">Shirt Size</option>
            <option>XS</option><option>S</option><option>M</option>
            <option>L</option><option>XL</option><option>XXL</option>
          </select>

          <input type="text" placeholder="Bottom Size" required />
          <input type="text" placeholder="Glove Size" required />

          <select required>
            <option value="">Glove Hand</option>
            <option>Left</option>
            <option>Right</option>
          </select>

          <select required>
            <option value="">Dietary Requirement</option>
            <option>None</option>
            <option>Halaal</option>
            <option>Kosher</option>
            <option>Vegetarian</option>
            <option>Vegan</option>
            <option>Gluten-Free</option>
            <option>Other</option>
          </select>

          <input type="text" placeholder="Dietary notes (optional)" />
        </div>
      </details>
    `;
  }

  setupMobileAccordion();
});
