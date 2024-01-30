const pool = require("../model/db");

const typeproduit_index_get = async (req, res) => {
  try {
    let sql = `SElect * from typeproduit `;
    const alltypeproduit = await pool.query(sql);

    res.json(alltypeproduit.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const typeproduit_index_get2 = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `SElect * from typeproduit  WHERE master_id ='${id}' `;
    const alltypeproduit = await pool.query(sql);

    res.json(alltypeproduit.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const typeproduit_delete = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `DELETE   FROM typeproduit WHERE typeproduit_id = '${id}'`;
    const deletetypeproduit = await pool.query(sql);
    res.json("typeproduit was deleted!");
  } catch (err) {
    console.log(err.message);
  }
};

const typeproduit_post = async (req, res) => {
  try {
    const { nom, master_id } = req.body;
    let sql = `INSERT INTO typeproduit ( nom,master_id) VALUES ($1,$2) RETURNING *`;

    const newtypeproduit = await pool.query(sql, [nom,master_id]);

    res.json(newtypeproduit.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};
const typeproduit_put = async (req, res) => {
  try {
    const { id } = req.params;
    const {TypeSelcted} = req.body;
    console.log(req.body);
    let sql = `UPDATE typeproduit SET nom='${TypeSelcted}'  WHERE typeproduit_id='${id}'  `;
    const updatetypeproduit = await pool.query(sql);
    res.json("typeproduit was updated!");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  typeproduit_index_get2,
  typeproduit_index_get,
  typeproduit_delete,
  typeproduit_post,
  typeproduit_put,
};
