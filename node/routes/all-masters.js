const express = require('express');
const router = express.Router();
const controle =require('../controllers/controllers-masters')


router.get('/master', controle.master_index_get)
router.get("/master/:id", controle.master_index_get2);
router.delete('/master/:id',controle.master_delete) 
router.post('/master',controle.master_post);
router.put("/masterput/:id",controle.master_put);
router.post("/masterLogin",controle.master_Login);
module.exports = router;