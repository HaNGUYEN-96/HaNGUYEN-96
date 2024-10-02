// Get the item ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('id');

// Fetch the item data from JSON and display it
fetch('digitalCams.json')
    .then(response => response.json())
    .then(data => {
        const selectedItem = data.find(item => item.id === itemId);
        if (selectedItem) {
            const itemDetailsContainer = document.getElementById('itemDetails');
            const details = `
                <div class="col-md-6">
                    <img src="${selectedItem.image}" class="img-fluid itemdetail-img" alt="${selectedItem.name}">
                </div>
                <div class="col-md-6">
                    <h1 class="itemname">${selectedItem.name}</h1>
                    <p class="description">${selectedItem.description}</p>
                    <p><strong>Price:</strong><span class="price">${selectedItem.price}</span></p>
                    <p class="itemdetail"> ${selectedItem.detail}</p>
                </div>
            `;
            itemDetailsContainer.innerHTML = details;
        } else {
            itemDetailsContainer.innerHTML = '<p>Item not found.</p>';
        }
    })
    .catch(error => console.error('Error loading item data:', error));
