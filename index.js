//INIT EXPRESS
const express = require("express"); //instancia de manipulacion del servidor
const app = express(); //instancia de manipulacion del servidor
const bodyParser = require("body-parser"); //instancia de manipulacion de las request y trasnformarlas en json
const PORT = process.env.PORT || 2000; //puerto donde se ejecutará
const db = require("./models"); //logica de base de datos
const router = require("./routes"); //logica de base de rutas

//parse requests of content-type - application/json
app.use(bodyParser.json()); //instancia a la librería body-parser

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
})); //instancia a la librería body-parser

db.mongoose //instancia a la librería mongoose (para darle cierta consistencia a nuestra abse de datos)
  .connect(db.url, { //acá solicito la url la cual me conectaré al la base de datos
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!"); //si sale todo bien
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err); //si algo sale mal
    process.exit();
  });

app.use(router); //aca solicito el router

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); //una vez que se hizo todo lo anterior, pongo a mi servidor a escuchar las request http