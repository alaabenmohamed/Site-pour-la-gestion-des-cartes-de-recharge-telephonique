const pool = require("../model/db");

const stockageticket_index_get = async (req, res) => {
  try {
    let sql = `SElect * from stockageticket `;
    const allstockageticket = await pool.query(sql);

    res.json(allstockageticket.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const stockageticket_index_get2 = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `SElect * from stockageticket  WHERE master_id ='${id}' `;
    const allstockageticket = await pool.query(sql);

    res.json(allstockageticket.rows);
  } catch (err) {
    console.error(err.message);
  }
};
const commande_index_get3 = async (master_id, type) => {
  try {
    let sql = `SElect * from stockageticket  WHERE master_id ='${master_id}' and type ='${type}' `;
    const allcommande = await pool.query(sql);

    return allcommande.rows;
  } catch (err) {
    console.error(err.message);
  }
};

const stockageticket_delete = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `DELETE   FROM stockageticket WHERE stockageticket_id = '${id}'`;
    const deletestockageticket = await pool.query(sql);
    res.json("stockageticket was deleted!");
  } catch (err) {
    console.log(err.message);
  }
};

const stockageticket_post = async (req, res) => {
  try {
    const { type, qantite, master_id } = req.body;
    const exist = await commande_index_get3(master_id, type);
    console.log(exist);
    if (exist.length === 0) {
      let sql = `INSERT INTO stockageticket (type,qantite,master_id) VALUES ($1,$2,$3) RETURNING *`;

      const newstockageticket = await pool.query(sql, [
        type,
        qantite,
        master_id,
      ]);

      res.json("insert");
    }
    if (exist.length != 0) {
      let sql = ` 

UPDATE stockageticket
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
const stockageticket_put = async (req, res) => {
  try {
    const { id } = req.params;
    const { TypeSelcted } = req.body;
    console.log(req.body);
    let sql = `UPDATE stockageticket SET type='${TypeSelcted}'  WHERE stockageticket_id='${id}'  `;
    const updatestockageticket = await pool.query(sql);
    res.json("stockageticket was updated!");
  } catch (err) {
    console.error(err.message);
  }
};
const stockageticket_putplus = async (req, res) => {
  try {
    // const { id } = req.params;
    const { qantite, master_id, type } = req.body;
    console.log(req.body);
    // let sql = `UPDATE stockagecarte SET qantite=qantite+'${qantite}'  WHERE stockagecarte_id='${id}'  `;
    let sql = `UPDATE stockageticket SET qantite=qantite+'${qantite}'  WHERE master_id = '${master_id}' and   type = '${type}'  `;

    const updatestockagecarte = await pool.query(sql);
    res.json("stockageticket was updated!");
  } catch (err) {
    console.error(err.message);
  }
};
const stockageticket_putmoins = async (req, res) => {
  try {
    // const { id } = req.params;
    const { qantite, master_id, type } = req.body;
    console.log(req.body);
    // let sql = `UPDATE stockagecarte SET qantite=qantite+'${qantite}'  WHERE stockagecarte_id='${id}'  `;
    let sql = `UPDATE stockageticket SET qantite=qantite-'${qantite}'  WHERE master_id = '${master_id}' and   type = '${type}'  `;

    const updatestockagecarte = await pool.query(sql);
    res.json("stockageticket was updated!");
  } catch (err) {
    console.error(err.message);
  }
};
module.exports = {
  stockageticket_putplus,
  stockageticket_putmoins,
  stockageticket_index_get2,
  stockageticket_index_get,
  stockageticket_delete,
  stockageticket_post,
  stockageticket_put,
};
