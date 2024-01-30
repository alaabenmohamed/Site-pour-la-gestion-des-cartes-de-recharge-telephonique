const pool = require("../model/db");

const stockagecarte_index_get = async (req, res) => {
  try {
    let sql = `SElect * from stockagecarte `;
    const allstockagecarte = await pool.query(sql);

    res.json(allstockagecarte.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const stockagecarte_index_get2 = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `SElect * from stockagecarte  WHERE master_id ='${id}' `;
    const allstockagecarte = await pool.query(sql);

    res.json(allstockagecarte.rows);
  } catch (err) {
    console.error(err.message);
  }
};
const commande_index_get3 = async (master_id, type) => {
  try {
    let sql = `SElect * from stockagecarte  WHERE master_id ='${master_id}' and type ='${type}'  `;
    const allcommande = await pool.query(sql);

    return allcommande.rows;
  } catch (err) {
    console.error(err.message);
  }
};

const stockagecarte_delete = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `DELETE   FROM stockagecarte WHERE stockagecarte_id = '${id}'`;
    const deletestockagecarte = await pool.query(sql);
    res.json("stockagecarte was deleted!");
  } catch (err) {
    console.log(err.message);
  }
};

const stockagecarte_post = async (req, res) => {
  try {
    
    const { type, qantite, master_id } = req.body;
    const exist = await commande_index_get3(master_id, type);
    console.log(exist);
    if (exist.length === 0) {
      let sql = `INSERT INTO stockagecarte (type,qantite,master_id) VALUES ($1,$2,$3) RETURNING *`;

      const newstockagecarte = await pool.query(sql, [
        type,
        qantite,
        master_id,
      ]);

      //  res.json(newstockagecarte.rows[0]);

      res.json("insert");
    }
    if (exist.length != 0) {
      let sql = ` 

UPDATE stockagecarte
SET
qantite = '${qantite}'
    WHERE  master_id = '${master_id}' and   type = '${type}'

  `;
      const updatecommande = await pool.query(sql);
      res.json(updatecommande.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
};
const stockagecarte_put = async (req, res) => {
  try {
    const { id } = req.params;
    const { qantite } = req.body;
    console.log(req.body);
    let sql = `UPDATE stockagecarte SET qantite='${+qantite}'  WHERE stockagecarte_id='${id}'  `;
    const updatestockagecarte = await pool.query(sql);
    res.json("stockagecarte was updated!");
  } catch (err) {
    console.error(err.message);
  }
};

const stockagecarte_putplus = async (req, res) => {
  try {
    // const { id } = req.params;
    const { qantite, master_id, type } = req.body;
    console.log(req.body);
    // let sql = `UPDATE stockagecarte SET qantite=qantite+'${qantite}'  WHERE stockagecarte_id='${id}'  `;
    let sql = `UPDATE stockagecarte SET qantite=qantite+'${qantite}'  WHERE master_id = '${master_id}' and   type = '${type}'  `;

    const updatestockagecarte = await pool.query(sql);
    res.json("stockagecarte was updated!");
  } catch (err) {
    console.error(err.message);
  }
};
const stockagecarte_putmoins = async (req, res) => {
  try {
    // const { id } = req.params;
    const { qantite, master_id, type } = req.body;
    console.log(req.body);
    // let sql = `UPDATE stockagecarte SET qantite=qantite+'${qantite}'  WHERE stockagecarte_id='${id}'  `;
    let sql = `UPDATE stockagecarte SET qantite=qantite-'${qantite}'  WHERE master_id = '${master_id}' and   type = '${type}'  `;

    const updatestockagecarte = await pool.query(sql);
    res.json("stockagecarte was updated!");
  } catch (err) {
    console.error(err.message);
  }
};
module.exports = {
  stockagecarte_putmoins,
  stockagecarte_putplus,
  stockagecarte_index_get2,
  stockagecarte_index_get,
  stockagecarte_delete,
  stockagecarte_post,
  stockagecarte_put,
};
