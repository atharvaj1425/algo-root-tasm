import dotenv from 'dotenv';
dotenv.config(); // Load environment variables at the very beginning

import express from 'express';
import { app } from './app.js';
import { connectDB } from './db/db.js';

const port = process.env.PORT || 6000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error('Database connection error:', error);
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.send('Server is ready');
});