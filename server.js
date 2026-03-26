const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Setup Multer for uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Setup EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (CSS, Images)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// --- Routes ---

app.get('/', (req, res) => {
    res.redirect('/login');
});

// 1. Login Page
app.get('/login', (req, res) => {
    res.render('pages/login');
});

app.post('/login', (req, res) => {
    // Basic hook: just redirect to home
    res.redirect('/home');
});

// 2. Home Page (Upload Dashboard)
app.get('/home', (req, res) => {
    res.render('pages/home');
});

// 3. Conversion Hook Route
app.post('/convert', upload.single('image'), (req, res) => {
    // In production: Process req.file with pdfkit or images-to-pdf here
    // Redirecting to loading page to simulate the magical conversion
    res.redirect('/loading');
});

// 4. Loading Page (Crystal Ball)
app.get('/loading', (req, res) => {
    res.render('pages/loading');
});

// 5. Success Page (Masterpiece)
app.get('/success', (req, res) => {
    res.render('pages/success');
});

// Mock download hook
app.get('/download-pdf', (req, res) => {
    res.send("In a real implementation, the generated PDF file stream would be sent here.");
});

// Start Server
app.listen(port, () => {
    console.log(`Xshift Magic Server is running at http://localhost:${port}`);
    console.log(`Open http://localhost:${port}/ in your browser to view the app!`);
});
