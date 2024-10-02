// Get the lens ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const lensId = urlParams.get('id');

// Fetch the lens data from JSON and display it
fetch('lenses.json')
    .then(response => response.json())
    .then(data => {
        const selectedLens = data.find(lens => lens.id === lensId);
        if (selectedLens) {
            const lensDetailsContainer = document.getElementById('lensDetails');
            const details = `
                <div class="col-md-6">
                    <img src="${selectedLens.image}" class="img-fluid itemdetail-img" alt="${selectedLens.name}">
                </div>
                <div class="col-md-6">
                    <h1 class="itemname">${selectedLens.name}</h1>
                    <p class="description">${selectedLens.description}</p>
                    <p><strong>Price:</strong><span class="price">${selectedLens.price}</span></p>
                    <p><strong>Features:</strong></p>
                    <ul class="itemdetail">${selectedLens.features.map(feature => `<li>${feature}</li>`).join('')}</ul>
                    <p><strong>Compatible with:</strong></p>
                    <ul class="itemdetail">${selectedLens.compatible_cameras.map(camera => `<li>${camera}</li>`).join('')}</ul>
                </div>
            `;
            lensDetailsContainer.innerHTML = details;
        } else {
            lensDetailsContainer.innerHTML = '<p>Lens not found.</p>';
        }
    })
    .catch(error => console.error('Error loading lens data:', error));
