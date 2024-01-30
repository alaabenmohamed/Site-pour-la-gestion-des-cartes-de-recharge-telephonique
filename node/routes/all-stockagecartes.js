const express = require("express");
const router = express.Router();
const controle = require("../controllers/controllers-stockagecartes");

router.get("/stockagecarte", controle.stockagecarte_index_get);
router.get("/stockagecarte/:id", controle.stockagecarte_index_get2);
router.delete("/stockagecarte/:id", controle.stockagecarte_delete);
router.post("/stockagecarte", controle.stockagecarte_post);
router.put("/plus", controle.stockagecarte_putplus);
router.put("/stockagecarteput/:id", controle.stockagecarte_put);
router.put("/moins", controle.stockagecarte_putmoins);


module.exports = router;
