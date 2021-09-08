-- Geração de Modelo físico
-- Sql ANSI 2003 - brModelo.



CREATE TABLE temperatura (
idTemp int PRIMARY KEY,
data date,
hora time,
valor int
);

CREATE TABLE geladeiras (
ident varchar(40),
idGeladeira int PRIMARY KEY,
idMedicamento int,
idUmid int,
idTemp int,
FOREIGN KEY(idTemp) REFERENCES temperatura (idTemp)
);

CREATE TABLE medicamento (
idMedicamento int PRIMARY KEY,
umidMin int,
tempMin int,
umidMax int,
tipo varchar(40),
tempMAx int
);

CREATE TABLE umidade (
idUmid int PRIMARY KEY,
data date,
hora time,
valor int
)

ALTER TABLE geladeiras ADD FOREIGN KEY(idMedicamento) REFERENCES medicamento (idMedicamento);
ALTER TABLE geladeiras ADD FOREIGN KEY(idUmid) REFERENCES umidade (idUmid);
