const modal = document.getElementById("rsvpModal");
const closeModalBtn = document.getElementById("closeModal");
const packageSelect = document.getElementById("packageSelect");
const playersContainer = document.getElementById("playersContainer");

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

// Close modal
closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  playersContainer.innerHTML = "";
  packageSelect.value = "";
});

// Close on overlay click
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModalBtn.click();
});

// Generate players
packageSelect.addEventListener("change", () => {
  playersContainer.innerHTML = "";

  const fourballs = packageFourballs[packageSelect.value] || 0;
  const totalPlayers = fourballs * 4;

  if (totalPlayers === 0) return;

  for (let i = 1; i <= totalPlayers; i++) {
    playersContainer.innerHTML += `
      <div class="player-card">
        <h3>Player ${i}</h3>

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
    `;
  }
});
