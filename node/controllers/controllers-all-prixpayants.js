const pool = require("../model/db");

const prixpayant_index_get = async (req, res) => {
  try {
    let sql = `SElect * from prixpayant `;
    const allprixpayant = await pool.query(sql);

    res.json(allprixpayant.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const prixpayant_index_get2 = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `SElect * from prixpayant  WHERE client_id ='${id}' `;
    const allprixpayant = await pool.query(sql);

    res.json(allprixpayant.rows);
  } catch (err) {
    console.error(err.message);
  }
};
const commande_index_get3 = async (idclient) => {
  try {
    let sql = `SElect * from prixpayant  WHERE client_id ='${idclient}' `;
    const allcommande = await pool.query(sql);

    return allcommande.rows;
  } catch (err) {
    console.error(err.message);
  }
};

const prixpayant_delete = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `DELETE   FROM prixpayant WHERE prixpayant_id = '${id}'`;
    const deleteprixpayant = await pool.query(sql);
    res.json("prixpayant was deleted!");
  } catch (err) {
    console.log(err.message);
  }
};

const prixpayant_post = async (req, res) => {
  try {
    const { nom, client_id } = req.body;
    let sql = `INSERT INTO prixpayant ( nom ) VALUES ($1) RETURNING *`;

    const newprixpayant = await pool.query(sql, [nom]);

    res.json(newprixpayant.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};
const prixpayant_put = async (req, res) => {
  try {
    const { id } = req.params;
    const { prixpayantSelcted } = req.body;
    // console.log(req.body);
    // console.log("1" + nom);
    let sql = `UPDATE prixpayant SET nom='${prixpayantSelcted}'   WHERE prixpayant_id='${id}'  `;
    const updateprixpayant = await pool.query(sql);
    res.json("prixpayant was updated!");
  } catch (err) {
    console.error(err.message);
  }
};
const prixpayant_putpost = async (req, res) => {
  try {
    const {prixpayant,client_id } = req.body;
    const exist = await commande_index_get3(client_id);
    console.log(exist);

    if (exist.length === 0) {
      let sql = `INSERT INTO prixpayant (prixpayant,
      client_id) VALUES ($1, $2) RETURNING *`;
      const newcommande = await pool.query(sql, [prixpayant, client_id]);

      res.json("insert");
    }
    if (exist.length != 0) {
      let sql = ` 

UPDATE prixpayant
SET
prixpayant = '${prixpayant}'
    

 where client_id ='${client_id}' 
  `;
      const updatecommande = await pool.query(sql);
      res.json(updatecommande.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
};
module.exports = {
  commande_index_get3,
  prixpayant_putpost,
  prixpayant_index_get2,
  prixpayant_index_get,
  prixpayant_delete,
  prixpayant_post,
  prixpayant_put,
};
