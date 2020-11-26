//console.log(‘hi’)

const express = require('express');

//INIT EXPRESS

const app = express();

//BUILDING API ROUTES
app.use('/Buildings', require('./controllers/buildings'));

//CREATE ROUTE
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

