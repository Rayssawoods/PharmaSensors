create database projeto;
use projeto;

create table medicamentos(
    idMedicamento   int primary key,
    tipo            varchar(30),
    tempMax         char(4),    
    tempMin         char(4),
    umidMax         char(4),
    umidMin         char(4)
);

insert into medicamentos values 
(1020,'teste',2,2,40,40),
(1030,'teste',2,2,40,40),
(1040,'teste',2,2,40,40);

create table usuario(
    idUser      int primary key,
    nome        varchar(40),
    cnpj        char(8),
    email       varchar(30),
    senha       varchar(10)
);

insert into usuario values
(1,'Dr Fausto',12345678,'fausto@gmail.com','time123'),
(2,'Dra Mariana',12345678,'mariana@gmail.com','time123'),
(3,'Dra Vitoria',12345678,'vitoria@gmail.com','time123');

select * from usuario;
select * from medicamentos;

update medicamentos set tipo = 'congenito' where idMedicamento in (1020,1030,1040);


create table geladeira(
    idGeladeira int primary key,
    fkUser  int,
    fkMedicamento   int
);

insert into geladeira values
(100,1,1040),
(101,1,1030),
(102,2,1020),
(103,3,1020);

select * from geladeira;

alter table geladeira add foreign key (fkUser) references 
    usuario(idUser);  

alter table geladeira add foreign key (fkMedicamento) references
    medicamentos(idMedicamento);

create table dados(
    idTempUmid  int primary key,
    temp        varchar(4),
    umid        varchar(4),
    dat_        date,
    hora        time,
    fkGeladeira int
);

alter table dados add foreign key (fkGeladeira) references
        geladeira(idGeladeira);

select * from geladeira;
select* from dados;

desc dados;
insert into dados values
(1,'1','30','2014-04-12','16:00:00',100),
(2,'2','30','2014-04-12','16:00:00',101),
(3,'1','30','2014-04-12','16:00:00',102);

-- Trás as informações da geladeira, o nome do Usuário, o tipo de medicamento na geladeira, a temperatura permitida
-- e a temperatuda que está atualmente
select g.*, u.nome, m.tipo as 'Tipo Medicamento' , m.tempMax as 'Temperatura Máxima', d.temp as 'Temperatura Atual'	
		from geladeira as g, usuario as u, medicamentos as m, dados as d
        where g.idGeladeira = d.fkGeladeira
        and u.idUser = g.fkUser
        and m.idMedicamento = g.fkMedicamento ; 

select * from dados;

-- pega os dados da geladeira e das temperaturas
select geladeira.*, dados.* from geladeira , dados
    where idGeladeira = fkGeladeira;




