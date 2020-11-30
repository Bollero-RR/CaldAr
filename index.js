//INIT EXPRESS
const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const db = require("./models");
const router = require("./routes");

// parse request of content-type aplication.json
app.use(bodyParser.json());

// parse request of conten-type urlencoded
app.use(bodyParser.urlencoded({extended: true}));

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("connected to the database!");
    })
    .catch(err =>{
        console.log("cannot connect to the database!", err);
        process.exit();
    });


app.use(express.static('public'));
app.use(router);
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));






  
