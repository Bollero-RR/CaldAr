//INIT EXPRESS
const express = require("express")
const app = express();

//BUILDING API ROUTES
app.use('/Buildings', require('./controllers/buildings'));

//CREATE ROUTE
app.get('/', (req,res)=>{
    res.send('Appointments')
});

// Boilers API Routes
app.use('/boilers', require('./controllers/boilers'));

// Appointment API Routes
app.use('/appointment', require('./controllers/appointment'));

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

