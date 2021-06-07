const express = require("express");
const cors = require("cors");

//crear servidor
const app = express();

console.log("Comenzando");

//puerto
const port = process.env.PORT || 4000;

app.use(cors());
//rutas de la app
app.use("/api/items", require("./items"));
app.use("/api/items/:id", require("./items"));

//arrancar servidor
app.listen(port, "0.0.0.0", () => [
	console.log(`El servidor esta funcionando en el puerto ${port}`),
]);
