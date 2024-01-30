const express = require("express");
const router = express.Router();
const controle = require("../controllers/controllers-clients");

router.get("/client", controle.client_index_get);
router.get("/client/:id", controle.client_index_get2);
router.delete("/client/:id", controle.client_delete);
router.post("/client", controle.client_post);
router.put("/clientput/:id", controle.client_put);
module.exports = router;
