const pool = require("../model/db");



const master_index_get = async (req, res) => {
  try {
    let sql = `SElect * from master `;
    const allmaster = await pool.query(sql);

  
    res.json(allmaster.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const master_index_get2 = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `SElect * from master  WHERE master_id ='${id}' `;
    const allmaster = await pool.query(sql);
    
    res.json(allmaster.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const master_delete = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `DELETE   FROM master WHERE master_id = '${id}'`;
    const deletemaster = await pool.query(sql);
    res.json("master was deleted!");
  } catch (err) {
    console.log(err.message);
  }
};

const master_post = async (req, res) => {
  try {
    const { nom,  email, mdp } = req.body;
    let sql = `INSERT INTO master (nom,email,mdp) VALUES ($1, $2, $3) RETURNING *`;

    const newmaster = await pool.query(sql, [nom, email, mdp]);

    res.json(newmaster.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};
const master_put = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email, mdp } = req.body;
    let sql = `UPDATE master SET nom='${nom}'  ,email='${email}',mdp='${mdp}'  WHERE master_id='${id}'  `;
    const updatemaster = await pool.query(sql);
    res.json("master was updated!");
  } catch (err) {
    console.error(err.message);
  }
};

const master_Login = async (req, res) => {
  try {
    const { mdp, email } = req.body;
    // const { mdp, mail } = req.body;


    let sql = `
            SELECT *  
            From  master
            WHERE  master.mdp='${mdp}'  AND master.email='${email}' `;
    const newcondition = await pool.query(sql);
    res.json(newcondition.rows);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  master_index_get2,
  master_index_get,
  master_delete,
  master_post,
  master_put,
  master_Login,
};
