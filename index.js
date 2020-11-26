//INIT EXPRESS
const express = require("express")
const app = express();

//BUILDING API ROUTES
app.use('/Buildings', require('./controllers/buildings'));

//CREATE ROUTE
app.get('/', (req,res)=>{
    res.send('Appointments')
});


//boiler types api routes

app.use('/boilerType', require('./controllers/boilerType'));


// Appointment API Routes
app.use('/appointment', require('./controllers/appointment'));


const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

<<<<<<< HEAD

  
=======
>>>>>>> 671a9d01d25db317c10ffef9b5ac15f79845adec
