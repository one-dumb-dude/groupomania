require('dotenv').config();

const express = require('express');
const cors = require ('cors');
// const http = require('http');
// const {Server} = require('socket.io');

const app = express();
const port = process.env.NODE_PORT || 3000
// const server = http.createServer(app);

const corsOptions = [
    'http://localhost:5173'
];

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/users');

app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

app.listen(port, () => {
    console.log(`Running Node Express on port: ${port}`)
});