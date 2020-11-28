//INIT EXPRESS
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./models");
const router = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(router);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongoo");
  })
  .catch((err) => {
    console.log("Cannot connect Mongo: ", err);
    process.exit();
  });

//BUILDING API ROUTES
app.use("/Buildings", require("./controllers/buildings"));

// Customers API Routes
app.use("/customers", require("./controllers/customer"));

//CREATE ROUTE
app.get("/", (req, res) => {
  res.send("caldAr");
});

// Technicians API Routes
app.use("/technicians", require("./controllers/technicians"));

// Boilers API Routes
app.use("/boilers", require("./controllers/boilers"));

//boiler types api routes

app.use("/boilerType", require("./controllers/boilerType"));

// Appointment API Routes
app.use("/appointment", require("./controllers/appointment"));

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
