// Get the accessory ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const accessoryId = urlParams.get('id');

// Fetch the accessory data from JSON and display it
fetch('accessories.json')
    .then(response => response.json())
    .then(data => {
        const selectedAccessory = data.find(accessory => accessory.id === accessoryId);
        if (selectedAccessory) {
            const accessoryDetailsContainer = document.getElementById('accessoryDetails');
            const details = `
                <div class="col-md-6">
                    <img src="${selectedAccessory.image}" class="img-fluid itemdetail-img" alt="${selectedAccessory.name}">
                </div>
                <div class="col-md-6">
                    <h1 class="itemname">${selectedAccessory.name}</h1>
                    <p class="description">${selectedAccessory.description}</p>
                    <p><strong>Price:</strong><span class="price">${selectedAccessory.price}</span></p>
                    <p><strong>Features:</strong></p>
                    <ul class="itemdetail">${selectedAccessory.features.map(feature => `<li>${feature}</li>`).join('')}</ul>
                    <p><strong>Compatible with:</strong></p>
                    <ul class="itemdetail">${selectedAccessory.compatible_cameras.map(camera => `<li>${camera}</li>`).join('')}</ul>
                </div>
            `;
            accessoryDetailsContainer.innerHTML = details;
        } else {
            accessoryDetailsContainer.innerHTML = '<p>Accessory not found.</p>';
        }
    })
    .catch(error => console.error('Error loading accessory data:', error));
