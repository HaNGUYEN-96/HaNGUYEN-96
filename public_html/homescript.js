// Fetch the JSON data and display items dynamically for digital cameras
fetch('digitalCams.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('itemsContainerDigitalCameras');

        data.forEach(item => {
            const card = `
        <div class="col">
          <div class="card h-100">
            <img src="${item.image}" class="card-img-top" alt="${item.name}">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
            </div>
            <div class="card-footer text-center">
                <p class="card-text price"><strong>${item.price}</strong></p>
                <a href="item-details.html?id=${item.id}" class="btn btn-outline-primary w-100">Discover</a>
            </div>
          </div>
        </div>
      `;
            container.innerHTML += card;
        });
    })
    .catch(error => console.error('Error loading JSON data:', error));

// Fetch the JSON data and display items dynamically for lenses
let lensesData = [];
fetch('lenses.json')
    .then(response => response.json())
    .then(data => {
        const lensContainer = document.getElementById('itemsContainerLenses');

        data.forEach(lens => {
            const card = `
        <div class="col">
          <div class="card h-100">
            <img src="${lens.image}" class="card-img-top" alt="${lens.name}">
            <div class="card-body">
                <h5 class="card-title">${lens.name}</h5>
                <p class="card-text">${lens.description}</p>
            </div>
                <div class="card-footer text-center">
                    <p class="card-text price"><strong>${lens.price}</strong></p>
                    <a href="lens-details.html?id=${lens.id}" class="btn btn-outline-primary w-100">Discover</a>
                </div>
            </div>
          </div>
        </div>
      `;
            lensContainer.innerHTML += card;
        });
    })
    .catch(error => console.error('Error loading lens JSON data:', error));

// Fetch the JSON data and display items dynamically for accessories
fetch('accessories.json')
    .then(response => response.json())
    .then(data => {
        const accessoriesContainer = document.getElementById('itemsContainerAccessories');

        data.forEach(accessory => {
            const card = `
    <div class="col">
      <div class="card h-100">
        <img src="${accessory.image}" class="card-img-top" alt="${accessory.name}">
        <div class="card-body">
            <h5 class="card-title">${accessory.name}</h5>
            <p class="card-text">${accessory.description}</p>
        </div>
        <div class="card-footer text-center">
            <p class="card-text price"><strong>${accessory.price}</strong></p>
            <a href="accessory-details.html?id=${accessory.id}" class="btn btn-outline-primary w-100">Discover</a>
        </div>
      </div>
    </div>
  `;
            accessoriesContainer.innerHTML += card;
        });
    })
    .catch(error => console.error('Error loading accessories JSON data:', error));

// Fetch the JSON data and display items dynamically for compact and action cameras
fetch('compactCams.json')
    .then(response => response.json())
    .then(data => {
        const compactCamContainer = document.getElementById('itemsContainerCompactCameras');

        data.forEach(cam => {
            const card = `
        <div class="col">
          <div class="card h-100">
            <img src="${cam.image}" class="card-img-top" alt="${cam.name}">
            <div class="card-body">
                <h5 class="card-title">${cam.name}</h5>
                <p class="card-text">${cam.description}</p>
            </div>
            <div class="card-footer text-center">
                <p class="card-text price"><strong>${cam.price}</strong></p>
                <a href="compact-details.html?id=${cam.id}" class="btn btn-outline-primary w-100">Discover</a>
            </div>
          </div>
        </div>
      `;
            compactCamContainer.innerHTML += card;
        });
    })
    .catch(error => console.error('Error loading compact camera JSON data:', error));

// Fetch the JSON data and display items dynamically for drones
fetch('drones.json')
    .then(response => response.json())
    .then(data => {
        const droneContainer = document.getElementById('itemsContainerDrones');

        data.forEach(drone => {
            const card = `
        <div class="col">
          <div class="card h-100">
            <img src="${drone.image}" class="card-img-top" alt="${drone.name}">
            <div class="card-body">
                <h5 class="card-title">${drone.name}</h5>
                <p class="card-text">${drone.description}</p>
            </div>
            <div class="card-footer text-center">
                <p class="card-text price"><strong>${drone.price}</strong></p>
                <a href="drone-details.html?id=${drone.id}" class="btn btn-outline-primary w-100">Discover</a>
            </div>
          </div>
        </div>
      `;
            droneContainer.innerHTML += card;
        });
    })
    .catch(error => console.error('Error loading drone JSON data:', error));



// Function to show full details in a modal or a section
function showDetails(id) {
    fetch('digitalCams.json')
        .then(response => response.json())
        .then(data => {
            const selectedItem = data.find(item => item.id === id);
            if (selectedItem) {
                const detailsSection = document.getElementById('itemDetails');

                const details = `
                  <div class="card">
                    <img src="${selectedItem.image}" class="card-img-top" alt="${selectedItem.name}">
                    <div class="card-body">
                        <h5 class="card-title">${selectedItem.name}</h5>
                        <p class="card-text"><strong>Description:</strong> ${selectedItem.description}</p>
                        <p class="card-text"><strong>Price:</strong> ${selectedItem.price}</p>
                        <p class="card-text"><strong>Details:</strong> ${selectedItem.detail}</p>
                    </div>
                  </div>
                `;

                detailsSection.innerHTML = details;
            }
        })
        .catch(error => console.error('Error loading JSON data:', error));
}