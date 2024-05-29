const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();


const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes)

const server = http.createServer(app);


mongoose.connect(process.env.MONGO_URI).then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch(err => {
    console.log('connection failed')
    console.error(err);
});
