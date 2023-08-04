require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const messageRoutes = require('./routes/messages');

app.use('/api/messages', messageRoutes);

app.listen(port, () => {
    console.log(`Running on port: ${port}`)
});
