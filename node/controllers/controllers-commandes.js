const pool = require("../model/db");

const commande_index_get = async (req, res) => {
  try {
    let sql = `SElect * from commande `;
    const allcommande = await pool.query(sql);

    res.json(allcommande.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const commande_index_get2 = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `SElect * from commande  WHERE client_id ='${id}' `;
    const allcommande = await pool.query(sql);

    res.json(allcommande.rows);
  } catch (err) {
    console.error(err.message);
  }
};
const commande_index_get4 = async (type, category, idclient) => {
  try {
    let sql = `SElect * from commande  WHERE categorie='${category}'   and   typ ='${type}' and client_id ='${idclient}' `;
    const allcommande = await pool.query(sql);

    return allcommande.rows;
  } catch (err) {
    console.error(err.message);
  }
};

const commande_delete = async (req, res) => {
  try {
    const { id } = req.params;
    let sql = `DELETE   FROM commande WHERE commande_id = '${id}'`;
    const deletecommande = await pool.query(sql);
    res.json("commande was deleted!");
  } catch (err) {
    console.log(err.message);
  }
};

const commande_post = async (req, res) => {
  try {
    const {
      categorie,
      typ,
      qantite,
      prixUnitaire,
      prixpayant,
      prixrestant,
      prixTotale,
      client_id,
    } = req.body;
    let sql = `INSERT INTO commande (categorie,
      typ,
      qantite,
      prixUnitaire,
      prixpayant,
      prixrestant,
           prixTotale,
      client_id) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING *`;

    const newcommande = await pool.query(sql, [
      categorie,
      typ,
      qantite,
      prixUnitaire,
      prixpayant,
      prixrestant,
      prixTotale,
      client_id,
    ]);

    res.json(newcommande.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};
const commande_put = async (req, res) => {
  try {
    const { id } = req.params;
    const { qantite, prixunitaire, prixpayant, prixrestant, prixtotale } =
      req.body;
    let sql = `UPDATE commande SET qantite='${qantite}',prixunitaire='${prixunitaire}',prixpayant='${prixpayant}',prixrestant='${
      prixtotale - prixpayant
    }',prixtotale='${qantite * prixunitaire}'  WHERE commande_id='${id}'  `;
    const updatecommande = await pool.query(sql);
    res.json("commande was updated!");
  } catch (err) {
    console.error(err.message);
  }
};

const commande_putpost = async (req, res) => {
  try {
    // const { id } = req.params;
    const { categorie, typ, qantite, prixunitaire, client_id } =
      req.body;

    const exist = await commande_index_get4(typ, categorie, client_id);
    console.log(exist);

    if (exist.length === 0) {
      let sql = `INSERT INTO commande (categorie,
      typ,
      qantite,
      prixunitaire,
      client_id) VALUES ($1, $2, $3,$4,$5) RETURNING *`;
      const newcommande = await pool.query(sql, [
        categorie,
        typ,
        qantite,
        prixunitaire,
        client_id,
      ]);

      res.json("insert");
    }
    if (exist.length != 0) {
      let sql = ` 

UPDATE commande
SET
prixunitaire = '${prixunitaire}',
    qantite = '${qantite}'

 where   categorie='${categorie}'  and   typ = '${typ}'  and client_id ='${client_id}' 
  `;
      const updatecommande = await pool.query(sql);
      res.json(updatecommande.rows);
    }
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  commande_putpost,
  commande_index_get2,
  commande_index_get,
  commande_delete,
  commande_post,
  commande_put,
};
//
// UPDATE commande
// SET
// prixunitaire = '${prixunitaire}',
//     qantite = '${qantite}'

//  where   categorie='${categorie}'  and   typ = '${typ}'  and client_id ='${client_id}' 
//   `;
