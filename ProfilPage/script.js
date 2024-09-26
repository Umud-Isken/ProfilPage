const map = L.map('map').setView([40.7128, -74.0060], 13); // Default to New York City

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Function to handle successful location retrieval
    function onLocationFound(e) {
        const radius = e.coords.accuracy / 2; // Get accuracy radius
        const latlng = [e.coords.latitude, e.coords.longitude]; // User's lat/lng

        // Add a marker at user's location
        L.marker(latlng).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();

        // Add a circle to show accuracy
        L.circle(latlng, radius).addTo(map);

        // Center the map on user's location
        map.setView(latlng, 13);
    }

    // Function to handle location errors
    function onLocationError(e) {
        alert(e.message);
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onLocationFound, onLocationError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }