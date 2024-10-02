// Require the express web application framework (https://expressjs.com)
const express = require('express');
const https = require('https');
const morgan = require('morgan');
const sqlite3 = require('sqlite3').verbose(); // Import SQLite3
const fs = require('fs');
// Require the bcryptjs library
const bcrypt = require('bcryptjs');

// Create a new web application by calling the express function
const app = express()
const port = 3000

// Added to support access to file system paths
const path = require('path');

// Use the morgan middleware to log all requests
app.use(morgan('common'));

// Middleware to parse incoming form data (POST body)
app.use(express.urlencoded({ extended: true }));

// Certificate and key paths
const options = {
  key: fs.readFileSync('localhost.key'),  // The private key file you generated
  cert: fs.readFileSync('localhost.crt')  // The certificate file you generated
};

// Tell our application to serve all the files under the `public_html` directory
app.use(express.static('public_html'));

// Set EJS as the template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Open the database and insert the data into the `servicebooking` table
// const dbService = new sqlite3.Database('servicebooking.db');

// POST route to handle form submission
app.post('/submitservices', (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let mobileNumber = req.body.mobileNumber;
  let date = req.body.date;
  let serviceChoice = req.body.serviceChoice;
  let message = req.body.message;
  
  let errors = [];

  //let { firstname, surname, email, mobileNumber, capstyle, inputNumCaps, comments } = req.body;

  // Check for missing fields and validate email
  if (!name) errors.push({ field: 'name', message: 'Missing name?' });
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  if (!email || !validateEmail(email)) errors.push({ field: 'email', message: 'Missing or invalid email?' });
  if (!mobileNumber) errors.push({ field: 'mobile number', message: 'Missing or invalid mobile?' });
  if (!date) errors.push({ field: 'date', message: 'Date incorrect?' });
  if (!serviceChoice) errors.push({ field: 'serviceChoice', message: 'serviceChoice incorrect?' });
  if (!message) errors.push({ field: 'message', message: 'Missing messgage?' });

  // If there are errors, render the error page
  if (errors.length > 0) {
    return res.render('invalid-form', { 
      title:'Service Booking Form Error',
      errors 
    });
  }

  console.log(req.body);

  const dbService = new sqlite3.Database('servicebooking.db');

  dbService.run(
    `INSERT INTO serviceBooking (name, email, mobile, bookingdate, service, comment)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, mobileNumber, date, serviceChoice, message],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Database error.');
        return;
      }
      console.log('New service booking entry added.');
      dbService.close();

      // Pass the booking information to the success page
      res.render('successful-service-booking', {
        title: 'Success Booking',
        name: name,
        email: email,
        mobileNumber: mobileNumber,
        date: date,
        serviceChoice: serviceChoice,
        message: message
      });
    }
  );
});

// Define a route to handle GET requests for the root URL (/) 
app.get('/register', (req, res) => {
  res.render('register', { title: 'Membership Registration' });
})

app.post('/submitregister', async(req, res) => {
  let { first_name, last_name, email, phone, postal_code, username, password, confirm_password, job, dob, camera_brand, photo_style, membership, newsletter } = req.body;
  
  let errors = [];
  
  function sanitizeInput(input) {
    return input.replace(/[<>\/\\&'"]/g, ''); // Removes HTML tags, slashes, and quotes
  }
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  function validatePhone(phone) {
    const re = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
    return re.test(phone);
  }
  function validatePostalCode(postal_code) {
    const re = /^\d{4}$/; // Australian postal codes are 4 digits long
    return re.test(postal_code);
  }
  function validatePassword(password) {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/;
    return re.test(password);
  }

  // Basic Validation for Required Fields
  if (!first_name) errors.push({ field: 'first_name', message: 'First name is required.' });
  if (!last_name) errors.push({ field: 'last_name', message: 'Last name is required.' });
  if (!email || !validateEmail(email)) errors.push({ field: 'email', message: 'A valid email is required.' });
  if (!phone || !validatePhone(phone)) errors.push({ field: 'phone', message: 'A valid phone number is required.' });
  if (!postal_code || !validatePostalCode(postal_code)) errors.push({ field: 'postal_code', message: 'A valid postal code is required.' });
  if (!username) errors.push({ field: 'username', message: 'Username is required.' });
  if (!password || !validatePassword(password)) errors.push({ field: 'password', message: 'Password must meet the complexity requirements.' });
  if (password !== confirm_password) errors.push({ field: 'confirm_password', message: 'Passwords do not match.' });
  if (!dob) errors.push({ field: 'dob', message: 'Date of Birth is required.' });
  if (!photo_style) errors.push({ field: 'photo_style', message: 'Photography style is required.' });
  if (!membership) errors.push({ field: 'membership', message: 'Membership level is required.' });

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);  // Use a salt round of 10

  // Return errors if any exist
  if (errors.length > 0) {
    return res.render('invalid-register', { title: 'Registration Form Error', errors });
  }

  // Process and sanitize the inputs before storing them
  const sanitizedInputs = {
    first_name: sanitizeInput(first_name),
    last_name: sanitizeInput(last_name),
    email: sanitizeInput(email),
    phone: sanitizeInput(phone),
    postal_code: sanitizeInput(postal_code),
    username: sanitizeInput(username),
    password: hashedPassword,  // Store hashed password
    dob: sanitizeInput(dob),
    camera_brand: sanitizeInput(camera_brand),
    photo_style: sanitizeInput(photo_style),
    membership: sanitizeInput(membership),
    newsletter: newsletter ? 'subscribed' : 'unsubscribed'
  };

  // Database Insertion Logic
  const register = new sqlite3.Database('register.db');
  
  register.run(
    `INSERT INTO register (first_name, last_name, email, phone, postal_code, username, password, dob, camera_brand, photo_style, membership, newsletter) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [sanitizedInputs.first_name, 
      sanitizedInputs.last_name, 
      sanitizedInputs.email, 
      sanitizedInputs.phone, 
      sanitizedInputs.postal_code, 
      sanitizedInputs.username, 
      sanitizedInputs.password, 
      sanitizedInputs.dob, 
      sanitizedInputs.camera_brand, 
      sanitizedInputs.photo_style, 
      sanitizedInputs.membership, 
      sanitizedInputs.newsletter],
    (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Database error.');
      }
      console.log('New user registered successfully.');
      register.close();

      // Redirect to success page
      res.render('successful-registration', {
        title: 'Registration Success',
        first_name: sanitizedInputs.first_name,
        last_name: sanitizedInputs.last_name,
        email: sanitizedInputs.email,
        phone: sanitizedInputs.phone,
        postal_code: sanitizedInputs.postal_code,
        username: sanitizedInputs.username,
        dob: sanitizedInputs.dob,
        camera_brand: sanitizedInputs.camera_brand,
        photo_style: sanitizedInputs.photo_style,
        membership: sanitizedInputs.membership,
        newsletter: sanitizedInputs.newsletter
      });
    }
  );
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Open the SQLite database
  const registerDb = new sqlite3.Database('register.db');

  // Query the database to check credentials
  const query = `SELECT username, password, membership FROM register WHERE username = ?`;

  registerDb.get(query, [username], async (err, row) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ message: 'Database error.' });
    }

    if (row) {
      // Compare the hashed password with the password provided
      const isMatch = await bcrypt.compare(password, row.password);
      if (isMatch) {
        // Successful login, return membership information
        // res.status(200).json({
        //   message: 'Login successful',
        //   username: row.username,
        //   membership: row.membership
        // });
        res.render('membership', {
          title: 'Membership Page',
          username: row.username,
          membership: row.membership
        });
      } else {
        res.render('login-failure', { title: 'Login Failed' });
      }
    } else {
      res.render('login-failure', { title: 'Login Failed' });
    }
  });
});

// Add category field to each product when loading them
const accessories = require(path.join(__dirname, 'public_html', 'accessories.json')).map(item => ({ ...item, category: 'accessories' }));
const compactCams = require(path.join(__dirname, 'public_html', 'compactCams.json')).map(item => ({ ...item, category: 'compactCams' }));
const digitalCams = require(path.join(__dirname, 'public_html', 'digitalCams.json')).map(item => ({ ...item, category: 'digitalCams' }));
const drones = require(path.join(__dirname, 'public_html', 'drones.json')).map(item => ({ ...item, category: 'drones' }));
const lenses = require(path.join(__dirname, 'public_html', 'lenses.json')).map(item => ({ ...item, category: 'lenses' }));

// Helper function to search products
function searchProducts(query, products) {
  return products.filter(product => {
      const searchFields = ['name', 'description', 'features'];
      return searchFields.some(field => {
          if (product[field]) { // Ensure the field exists
              if (Array.isArray(product[field])) {
                  // Handle array fields (e.g., 'features')
                  return product[field].some(subField => 
                      typeof subField === 'string' && subField.toLowerCase().includes(query.toLowerCase())
                  );
              } else if (typeof product[field] === 'string') {
                  // Handle string fields (e.g., 'name', 'description')
                  return product[field].toLowerCase().includes(query.toLowerCase());
              }
          }
          return false;
      });
  });
}

// Search route
app.post('/search', (req, res) => {
    const query = req.body.searchQuery.toLowerCase();

    // Perform search in all categories
    const results = [
        ...searchProducts(query, accessories),
        ...searchProducts(query, compactCams),
        ...searchProducts(query, digitalCams),
        ...searchProducts(query, drones),
        ...searchProducts(query, lenses)
    ];

    res.render('search-results', { title: 'Search Results', query, results });
});

// Route to handle /admin to show all registered members and all service bookings
app.get('/admin', (req, res) => {
  const registerDb = new sqlite3.Database('register.db');
  const serviceDb = new sqlite3.Database('servicebooking.db');
  
  // Fetch all registered members
  registerDb.all(`SELECT * FROM register`, (err, members) => {
    if (err) {
      console.error('Error fetching members:', err.message);
      return res.status(500).send('Database error while fetching members.');
    }
    
    // Fetch all service bookings
    serviceDb.all(`SELECT * FROM serviceBooking`, (err, services) => {
      if (err) {
        console.error('Error fetching service bookings:', err.message);
        return res.status(500).send('Database error while fetching service bookings.');
      }

      // Render the admin page and pass members and services data to the EJS template
      res.render('admin', {
        title: 'Admin Dashboard',
        members: members,   // List of registered members
        services: services  // List of service bookings
      });
    });

    // Close the service booking database
    serviceDb.close();
  });

  // Close the register database
  registerDb.close();
});


// Define a route to force an error
app.get('/forceerror', (req, res) => {
  console.log('Forcing an error');
  let f;
  console.log(`f = ${f.nomethod()}`); // Will cause an error
});

// Define a route to handle GET requests for the /about URL
app.use((req, res) => {
  res.status(404).send('<h1>404 - File not found</h1>');
});

// Define a route to handle errors
app.use( (error, request, response, next) => {
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  
  let errorStatus = error.status || 500;
  response.status(errorStatus);
  response.send('<h1>ERROR(' + errorStatus + '): ' + error.toString() + '</h1>');
});

// Create an HTTPS server
https.createServer(options, app).listen(port, () => {
  console.log('Server running on https://localhost:3000');
  console.log(`Type Ctrl+C to shut down the web server`)
});

// // Tell our application to listen to requests at port 3000 on the localhost
// app.listen(port, ()=> {
//   // When the application starts, print to the console that our app is
//   // running at http://localhost:3000. Print another message indicating
//   // how to shut the server down.
//   console.log(`Web server running at: http://localhost:${port}`)
//   console.log(`Type Ctrl+C to shut down the web server`)
// })
