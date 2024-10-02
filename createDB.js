const sqlite3 = require('sqlite3').verbose();
const dbService = new sqlite3.Database('servicebooking.db');

dbService.serialize(() => {
    // dbService.run('DROP TABLE IF EXISTS servicebooking');
    dbService.run(`CREATE TABLE IF NOT EXISTS servicebooking (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        mobile TEXT,
        bookingdate DATE,
        service TEXT,
        comment TEXT
    )`);

    // dbService.run(`DELETE FROM membership`);

    console.log('Displaying all entries in the servicebooking table:');

    dbService.each(`SELECT * FROM servicebooking DESC`, (err, row) => {
        console.log(`${row.id} ${row.name} ${row.email} ${row.mobile} ${row.bookingdate} ${row.service} ${row.comment}`);
    });

    console.log('Database and table created.');
});

dbService.close();


const register = new sqlite3.Database('register.db');

register.serialize(() => {
    register.run('DROP TABLE IF EXISTS register');
    register.run(`CREATE TABLE IF NOT EXISTS register (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        email TEXT,
        phone TEXT,
        postal_code TEXT,
        username TEXT,
        password TEXT,
        dob DATE,
        camera_brand TEXT,
        photo_style TEXT,
        membership TEXT,
        newsletter TEXT
    )`);

    register.run(`DELETE FROM register`);

    console.log('Displaying all entries in the register table:');

    register.each(`SELECT * FROM register DESC`, (err, row) => {
        console.log(`${row.id} ${row.first_name} ${row.last_name} ${row.email} ${row.phone} ${row.postal_code} ${row.username} ${row.password} ${row.dob} ${row.camera_brand} ${row.photo_style} ${row.membership} ${row.newsletter}`);
    });

    console.log('Database and table created.');
});

register.close();