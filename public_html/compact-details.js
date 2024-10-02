// Get the compact camera ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const compactCamId = urlParams.get('id');

// Fetch the compact camera data from JSON and display it
fetch('compactCams.json')
    .then(response => response.json())
    .then(data => {
        const selectedCam = data.find(cam => cam.id === compactCamId);
        if (selectedCam) {
            const camDetailsContainer = document.getElementById('compactCamDetails');
            const details = `
                <div class="col-md-6">
                    <img src="${selectedCam.image}" class="img-fluid itemdetail-img" alt="${selectedCam.name}">
                </div>
                <div class="col-md-6">
                    <h1 class="itemname">${selectedCam.name}</h1>
                    <p class="description">${selectedCam.description}</p>
                    <p><strong>Price:</strong><span class="price">${selectedCam.price}</span></p>
                    <p><strong>Features:</strong></p>
                    <ul class="itemdetail">${selectedCam.features.map(feature => `<li>${feature}</li>`).join('')}</ul>
                </div>
            `;
            camDetailsContainer.innerHTML = details;
        } else {
            camDetailsContainer.innerHTML = '<p>Compact camera not found.</p>';
        }
    })
    .catch(error => console.error('Error loading compact camera data:', error));
