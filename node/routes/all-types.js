const express = require("express");
const router = express.Router();
const controle = require("../controllers/controllers-typeproduits");

router.get("/typeproduit", controle.typeproduit_index_get);
router.get("/typeproduit/:id", controle.typeproduit_index_get2);
router.delete("/typeproduit/:id", controle.typeproduit_delete);
router.post("/typeproduit", controle.typeproduit_post);
router.put("/typeproduitput/:id", controle.typeproduit_put);
module.exports = router;
