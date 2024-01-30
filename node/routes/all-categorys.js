const express = require("express");
const router = express.Router();
const controle = require("../controllers/controllers-categorys");

router.get("/category", controle.category_index_get);
router.get("/category/:id", controle.category_index_get2);
router.delete("/category/:id", controle.category_delete);
router.post("/category", controle.category_post);
router.put("/categoryput/:id", controle.category_put);
module.exports = router;
