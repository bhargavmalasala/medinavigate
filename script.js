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