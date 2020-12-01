const express = requiere('express');
const app = express();
const bodyParser = requiere("body-parser");
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

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



  
