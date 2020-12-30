const express = require('express');
const bodyParser = require("body-parser");
const db = require("./models");
const router = require("./routes");
const cors = require("cors");

require('dotenv').config()

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(express.static('public'));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("*******************************");
    console.log("╭-------━━━-╮");
    console.log("╰┃ ┣▇━▇");
    console.log(" ┃ ┃  ╰━▅╮");
    console.log(" ╰┳╯ ╰━━┳Connected");
    console.log("  ╰╮ ┳━━╯ to");
    console.log(" ▕▔▋ ╰╮╭━╮ Mongo");
    console.log(" ╱▔╲▋╰━┻┻╮╲╱▔▔▔╲");
    console.log(" ▏  ▔▔▔▔▔▔▔  O O┃");
    console.log(" ╲╱▔╲▂▂▂▂╱▔╲▂▂▂╱");
    console.log("  ▏╳▕▇▇▕ ▏╳▕▇▇▕");
    console.log("  ╲▂╱╲▂╱ ╲▂╱╲▂╱");
    console.log("*******************************");
  })
  .catch((err) => {
    console.log("Cannot connect Mongo: ", err);
    process.exit();
  });

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
