// Required packages
const express = require('express');
const db = require('./config/connection');

const PORT = 3001;
const app = express();

// Initialize Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`)
    });
});