const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Store data in a JSON file
const dataFile = path.join(__dirname, 'data.json');

// Initialize data file if it doesn't exist
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({
        users: [],
        products: [],
        messages: []
    }));
}

// Read data
function readData() {
    return JSON.parse(fs.readFileSync(dataFile));
}

// Write data
function writeData(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// User routes
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    const data = readData();
    
    if (data.users.find(user => user.email === email)) {
        return res.status(400).json({ error: 'User already exists' });
    }
    
    data.users.push({ email, password }); // In production, hash the password!
    writeData(data);
    
    res.json({ message: 'User registered successfully' });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const data = readData();
    
    const user = data.users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }