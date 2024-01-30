const pool = require("../model/db");

const client_index_get = async (req, res) => {
  try {
    let sql = `SElect * from client `;
    const allclient = await pool.query(sql);

    res.json(allclient.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const client_index_get2 = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `SElect * from client  WHERE master_id ='${id}' `;
    const allclient = await pool.query(sql);

    res.json(allclient.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const client_delete = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `DELETE   FROM client WHERE client_id = '${id}'`;
    const deleteclient = await pool.query(sql);
    res.json("client was deleted!");
  } catch (err) {
    console.log(err.message);
  }
};

const client_post = async (req, res) => {
  try {
    const {
      nom,
      num,
      adres,
      prixunitairecarte,
      prixunitaireticket,
      master_id,
    } = req.body;
    let sql = `INSERT INTO client ( nom, num,adres,prixunitairecarte,prixunitaireticket, master_id ) VALUES ($1, $2, $3,$4,$5,$6) RETURNING *`;

    const newclient = await pool.query(sql, [
      nom,
      num,
      adres,
      prixunitairecarte,
      prixunitaireticket,
      master_id,
    ]);

    res.json(newclient.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};
const client_put = async (req, res) => {
  try {
    const {id} = req.params;
    const {
      nom,
      num,
      adres,
      prixunitairecarte,
      prixunitaireticket,
      master_id,
    } = req.body;
    // console.log("1"+body)
    console.log(req.body);
    let sql = `UPDATE client SET nom='${nom}'  ,num='${num}',adres='${adres}',prixunitairecarte='${prixunitairecarte}',prixunitaireticket='${prixunitaireticket}'
    ,master_id='${master_id}' 
    WHERE client_id='${id}'  `;
    const updateclient = await pool.query(sql);
    res.json("updateclient");
  } catch (err) {
    console.error(err.message);
  }
};

// const famille_put = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { nom, img, description, boutique_id } = req.body;
//     let sql = `UPDATE client SET nom='${nom}' ,num='${num}',adres='${adres}',boutique_id='${boutique_id}'  WHERE famille_id='${id}'  `;
//     const updatefamille = await pool.query(sql);
//     res.json("famille was updated!");
//   } catch (err) {
//     console.error(err.message);
//   }
// };

module.exports = {
  client_index_get2,
  client_index_get,
  client_delete,
  client_post,
  client_put,
};
