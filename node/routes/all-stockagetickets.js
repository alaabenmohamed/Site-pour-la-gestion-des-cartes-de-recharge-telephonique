const express = require("express");
const router = express.Router();
const controle = require("../controllers/controllers-stockagetickets");

router.get("/stockageticket", controle.stockageticket_index_get);
router.get("/stockageticket/:id", controle.stockageticket_index_get2);
router.delete("/stockageticket/:id", controle.stockageticket_delete);
router.post("/stockageticket", controle.stockageticket_post);
router.put("/stockageticketput/:id", controle.stockageticket_put);
router.put("/moinsticket", controle.stockageticket_putmoins);
router.put("/plusticket", controle.stockageticket_putplus);


module.exports = router;
