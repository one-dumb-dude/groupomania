require('dotenv').config();

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const express = require('express');
const cors = require('cors');
const {join} = require('path');
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

app.use('/public/images', express.static(join(__dirname, 'upload')))

app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/posts', postRoutes);

app.listen(port, () => {
    console.log(`Running Node Express on port: ${port}`)
});
