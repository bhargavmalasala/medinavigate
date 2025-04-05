function showLoadingAnimation() {
  const loadingDiv = document.createElement("div");
  loadingDiv.id = "loading";
  loadingDiv.innerHTML = `
    <div class="boxes">
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  `;
  document.body.appendChild(loadingDiv);
}

// Function to hide the loading animation
function hideLoadingAnimation() {
  const loadingDiv = document.getElementById("loading");
  if (loadingDiv) {
    loadingDiv.remove();
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function searchHospitals() {
  let searchQuery = document.getElementById("searchInput").value.trim();

  if (searchQuery === "") {
    alert("Please enter a symptom or disease.");
    return;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Your coordinates:', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        showHospitals(position, searchQuery);
      },
      showError
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

async function showHospitals(position, query) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  showLoadingAnimation();

  try {
    const fetchPromise = fetch("https://medinavigate.onrender.com/search-hospitals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, latitude, longitude }),
    });

    const delayPromise = delay(5000);
    const [response] = await Promise.all([fetchPromise, delayPromise]);
    await delay(1500); // Reduced for smoother UX
    const hospitals = await response.json();

    const resultSection = document.createElement("section");
    resultSection.className = "results";
    let html = `<h2 class="results-title">Recommended Hospitals</h2>`;
    if (hospitals.length > 0) {
      // Featured hospital (third one, centered)
      if (hospitals.length === 3) {
        const thirdHospital = hospitals[2];
        html += `
          <div class="featured-hospital">
            <div class="hospital-card featured">
              <div class="hospital-icon"><i class="fas fa-hospital"></i></div>
              <h3>${thirdHospital.name}</h3>
              <p class="specialty">Specialty: ${thirdHospital.specialties.join(", ")}</p>
              <p class="distance">Distance: ${thirdHospital.distance.toFixed(2)} km</p>
              <p class="doctors">Doctors: ${thirdHospital.doctors.length > 0 ? thirdHospital.doctors.join(", ") : "N/A"}</p>
              <button class="directions-btn" onclick="window.open('https://www.google.com/maps?q=${thirdHospital.lat},${thirdHospital.lon}', '_blank')">Get Directions</button>
            </div>
          </div>
        `;
      }
      // First two hospitals in a row
      html += `
        <div class="hospital-results">
          ${hospitals
            .slice(0, 2)
            .map(
              (h) => `
              <div class="hospital-card">
                <div class="hospital-icon"><i class="fas fa-hospital"></i></div>
                <h3>${h.name}</h3>
                <p class="specialty">Specialty: ${h.specialties.join(", ")}</p>
                <p class="distance">Distance: ${h.distance.toFixed(2)} km</p>
                <p class="doctors">Doctors: ${h.doctors.length > 0 ? h.doctors.join(", ") : "N/A"}</p>
                <button class="directions-btn" onclick="window.open('https://www.google.com/maps?q=${h.lat},${h.lon}', '_blank')">Get Directions</button>
              </div>
            `
            )
            .join("")}
        </div>
      `;
    } else {
      html += `<p class="no-results">No hospitals found for "${query}". Try a different search term.</p>`;
    }

    resultSection.innerHTML = html;

    const existingResults = document.querySelector(".results");
    if (existingResults) existingResults.remove();

    const heroSection = document.querySelector(".hero-section");
    if (!heroSection) {
      console.error("Hero section not found");
      return;
    }
    heroSection.insertAdjacentElement("afterend", resultSection);
  } catch (error) {
    alert("Error fetching hospital recommendations. Please try again.");
    console.error(error);
  } finally {
    hideLoadingAnimation();
  }
}

function showError(error) {
  alert("Location access denied. Showing general hospital recommendations.");
  // Optionally, call showHospitals with dummy coordinates
}

// Add scroll animations
document.addEventListener("scroll", () => {
  const steps = document.querySelectorAll(".step");
  steps.forEach((step, index) => {
    const stepPosition = step.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (stepPosition < screenPosition) {
      step.style.animation = `popIn 0.5s ease-out ${index * 0.2}s forwards`;
    }
  });
});

// Scramble Effect Function
function scrambleEffect(element, finalNumber, duration = 2000) {
  let startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const progressRatio = Math.min(progress / duration, 1);

    // Generate a random number for the scramble effect
    const randomNumber = Math.floor(Math.random() * finalNumber);
    element.textContent = randomNumber;

    // If animation is not complete, continue
    if (progressRatio < 1) {
      requestAnimationFrame(animate);
    } else {
      // Set the final number
      element.textContent = finalNumber + "+";
    }
  }

  // Start the animation
  requestAnimationFrame(animate);
}

// Function to trigger scramble effect when the section is in view
function triggerScrambleEffect() {
  const hospitalCount = document.getElementById("hospitalCount");
  const userCount = document.getElementById("userCount");
  const cityCount = document.getElementById("cityCount");

  const options = {
    threshold: 0.5, // Trigger when 50% of the section is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        scrambleEffect(hospitalCount, 85);
        scrambleEffect(userCount, 365);
        scrambleEffect(cityCount, 50);
        observer.unobserve(entry.target); // Stop observing after triggering
      }
    });
  }, options);

  observer.observe(document.querySelector(".statistics"));
}

// Call the function when the page loads
window.addEventListener("load", triggerScrambleEffect);

document.addEventListener("scroll", () => {
  const steps = document.querySelectorAll(".step");
  steps.forEach((step, index) => {
    const stepPosition = step.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    if (stepPosition < screenPosition && !step.classList.contains("animated")) {
      step.style.animation = `popIn 0.5s ease-out ${index * 0.2}s`; // No 'forwards'
      step.classList.add("animated"); // Prevent re-triggering
    }
  });
});

// Handle form submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent page refresh

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const formData = {
      name: name,
      email: email,
      message: message,
      timestamp: new Date().toISOString()
  };

  // For local storage (as per your last request)
  let storedData = JSON.parse(localStorage.getItem("contactMessages")) || [];
  storedData.push(formData);
  localStorage.setItem("contactMessages", JSON.stringify(storedData));

  console.log("Form Data Submitted:", formData); // Debugging
  alert("Thank you for your message! It has been saved locally."); // Alert should appear
  document.getElementById("contactForm").reset(); // Clear the form
});

window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});