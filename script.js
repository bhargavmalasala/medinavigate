function searchHospitals() {
    let searchQuery = document.getElementById("searchInput").value.trim();

    if (searchQuery === "") {
        alert("Please enter a symptom or disease.");
        return;
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showHospitals, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showHospitals(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    alert(`Searching for hospitals near (${latitude}, ${longitude}) for: ${document.getElementById("searchInput").value}`);
    
}

function showError(error) {
    alert("Location access denied. Showing general hospital recommendations.");
}

// Add scroll animations
document.addEventListener('scroll', () => {
    const steps = document.querySelectorAll('.step');
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
            element.textContent = finalNumber + '+';
        }
    }

    // Start the animation
    requestAnimationFrame(animate);
}

// Function to trigger scramble effect when the section is in view
function triggerScrambleEffect() {
    const hospitalCount = document.getElementById('hospitalCount');
    const userCount = document.getElementById('userCount');
    const cityCount = document.getElementById('cityCount');

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

    observer.observe(document.querySelector('.statistics'));
}

// Call the function when the page loads
window.addEventListener('load', triggerScrambleEffect);