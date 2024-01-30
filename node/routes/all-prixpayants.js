const express = require("express");
const router = express.Router();
const controle = require("../controllers/controllers-all-prixpayants");

router.get("/payant", controle.prixpayant_index_get);
router.get("/payant/:id", controle.prixpayant_index_get2);
router.get("/payant3/:id", controle.commande_index_get3);
router.delete("/payant/:id", controle.prixpayant_delete);
router.post("/payant", controle.prixpayant_post);
router.put("/payantput/:id", controle.prixpayant_put);
router.put("/putpost", controle.prixpayant_putpost);

module.exports = router;
