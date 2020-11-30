const express = requiere('express');
const app = express();
const bodyParser = requiere("body-parser");
const port = 3000;
const db = require("./models");
const router = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Cannot connect to the database: ", err);
    process.exit();
  });

app.use(router);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});



  
