require('dotenv').config();

const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/users');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.NODE_PORT || 3000


const whitelist = ['http://localhost:5173'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

app.listen(port, () => {
    console.log(`Running Node Express on port: ${port}`)
});
