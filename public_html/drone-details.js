// Get the drone ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const droneId = urlParams.get('id');

// Fetch the drone data from JSON and display it
fetch('drones.json')
    .then(response => response.json())
    .then(data => {
        const selectedDrone = data.find(drone => drone.id === droneId);
        if (selectedDrone) {
            const droneDetailsContainer = document.getElementById('droneDetails');
            const details = `
                <div class="col-md-6">
                    <img src="${selectedDrone.image}" class="img-fluid itemdetail-img" alt="${selectedDrone.name}">
                </div>
                <div class="col-md-6">
                    <h1 class="itemname">${selectedDrone.name}</h1>
                    <p class="description">${selectedDrone.description}</p>
                    <p><strong>Price:</strong><span class="price">${selectedDrone.price}</span></p>
                    <p><strong>Features:</strong></p>
                    <ul class="itemdetail">${selectedDrone.features.map(feature => `<li>${feature}</li>`).join('')}</ul>
                </div>
            `;
            droneDetailsContainer.innerHTML = details;
        } else {
            droneDetailsContainer.innerHTML = '<p>Drone not found.</p>';
        }
    })
    .catch(error => console.error('Error loading drone data:', error));
