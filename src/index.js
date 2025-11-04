const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const movieRoute = require('./routes/movieRoutes');
const categoryRoute = require('./routes/categoryRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/movie', movieRoute);
app.use('/api/category', categoryRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});