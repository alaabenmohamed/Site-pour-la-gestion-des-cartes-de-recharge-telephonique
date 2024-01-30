CREATE DATABASE nacim;


DROP TABLE master
CREATE TABLE master(master_id SERIAL PRIMARY KEY,
                                             nom VARCHAR(50),
                                                 email VARCHAR(50),
                                                       mdp VARCHAR(50));


SElect *
from master
DROP TABLE client
CREATE TABLE client(client_id SERIAL PRIMARY KEY,
                                             nom VARCHAR(50),
                                                 num VARCHAR(250),
                                                     adres VARCHAR(250),
                                                           prixunitairecarte float, prixunitaireticket float, master_id SERIAL REFERENCES master (master_id));



SElect *
from client
DROP TABLE commande
CREATE TABLE commande (commande_id SERIAL PRIMARY KEY,
                                                  categorie VARCHAR(50),
                                                            typ VARCHAR(50),
                                                                qantite int, prixunitaire float,  client_id SERIAL REFERENCES client (client_id));


SElect *
from commande


DROP TABLE prixpayant
CREATE TABLE prixpayant (prixpayant_id SERIAL PRIMARY KEY,
                                                       prixpayant float ,
                                                  
                                                        client_id SERIAL REFERENCES client (client_id));


SElect *
from prixpayant

DROP TABLE typeproduit
CREATE TABLE typeproduit (typeproduit_id SERIAL PRIMARY KEY,
                                                  nom VARCHAR(250),
                                                     master_id SERIAL REFERENCES master (master_id)     );


SElect *
from typeproduit
DROP TABLE category
CREATE TABLE category(category_id SERIAL PRIMARY KEY,
                                                        nom VARCHAR(250),
                                                        master_id SERIAL REFERENCES master (master_id) );


SElect *
from category
DROP TABLE stockagecarte
CREATE TABLE stockagecarte(stockagecarte_id SERIAL PRIMARY KEY,
                                                 type VARCHAR(250),
                                                 qantite int,
                                                     master_id SERIAL REFERENCES master (master_id));


SElect *
from stockagecarte

DROP TABLE stockageticket
CREATE TABLE stockageticket(stockageticket_id SERIAL PRIMARY KEY,
                                                           type VARCHAR(250),
                                                                qantite int, master_id SERIAL REFERENCES master (master_id));


SElect *
from stockageticket