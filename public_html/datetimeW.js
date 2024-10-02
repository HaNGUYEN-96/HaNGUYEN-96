
// Function to display current date and time
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString(undefined, options);

    document.getElementById('dateTime').textContent = `Current Date: ${date} | Time: ${time}`;
}

// Function to display welcome message
function displayWelcomeMessage() {
    const hours = new Date().getHours();
    let greeting;

    if (hours < 12) {
        greeting = "Good Morning!";
    } else if (hours < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }

    document.getElementById('welcomeMessage').textContent = `${greeting}`;
}

// Call functions on page load
window.onload = function () {
    displayWelcomeMessage();
    updateDateTime();
    setInterval(updateDateTime, 1000); // Update time every second
}
