const pg = require("pg");
const express = require("express");

const app = express();
const port = process.env.PORT || 7000;
const cors = require("cors");
const path = require("path");
const master = require("./routes/all-masters");
 const client = require("./routes/all-clients");
 const commande = require("./routes/all-commandes");
 const type = require("./routes/all-types");
 const category = require("./routes/all-categorys");
 const prixpayant = require("./routes/all-prixpayants");
 const stockagecarte = require("./routes/all-stockagecartes");
 const stockageticket = require("./routes/all-stockagetickets");






// const http = require("http"); // deja existe dans node application
const http = require("http"); // deja existe dans node application



app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);


app.use(express.json()); //Utilise un middleware pour analyser les requêtes.

app.use("/", express.static(path.join("images")));

app.use(express.json());

app.use(master);
app.use(client);
app.use(commande);
app.use(type);
app.use(category);
app.use(prixpayant);
app.use(stockagecarte);
app.use(stockageticket);








const server = http.createServer(app);



app.use(cors());



server.listen(port, () => {
  console.log("Server app listening on port " + port);
});
