const express = require("express");
const router = express.Router();
const controle = require("../controllers/controllers-commandes");

router.get("/commande", controle.commande_index_get);
router.get("/commande/:id", controle.commande_index_get2);
router.delete("/commande/:id", controle.commande_delete);
router.post("/commande", controle.commande_post);
router.put("/commandeput/:id", controle.commande_put);
router.put("/put", controle.commande_putpost);

module.exports = router;
