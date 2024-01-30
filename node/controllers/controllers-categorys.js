const pool = require("../model/db");

const category_index_get = async (req, res) => {
  try {
    let sql = `SElect * from category `;
    const allcategory = await pool.query(sql);

    res.json(allcategory.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const category_index_get2 = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `SElect * from category  WHERE master_id ='${id}' `;
    const allcategory = await pool.query(sql);

    res.json(allcategory.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const category_delete = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `DELETE   FROM category WHERE category_id = '${id}'`;
    const deletecategory = await pool.query(sql);
    res.json("category was deleted!");
  } catch (err) {
    console.log(err.message);
  }
};

const category_post = async (req, res) => {
  try {
    const { nom ,} = req.body;
    let sql = `INSERT INTO category ( nom ) VALUES ($1) RETURNING *`;

    const newcategory = await pool.query(sql, [nom]);

    res.json(newcategory.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};
const category_put = async (req, res) => {
  try {
    const { id } = req.params;
    const {CategorySelcted} = req.body;
    // console.log(req.body);
    // console.log("1" + nom);
    let sql = `UPDATE category SET nom='${CategorySelcted}'   WHERE category_id='${id}'  `;
    const updatecategory = await pool.query(sql);
    res.json("category was updated!");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  category_index_get2,
  category_index_get,
  category_delete,
  category_post,
  category_put,
};
