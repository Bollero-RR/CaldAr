const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const db = require("./models");
const router = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
