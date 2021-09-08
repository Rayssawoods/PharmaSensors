create database farmacia;
use farmacia;

create table medicamentos(
    idMedicamento   int primary key,
    tipo            varchar(30),
    tempMax         int,    
    tempMin         int,
    umidMax         int,
    umidMin         int
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


create table geladeira(
    idGeladeira int primary key,
    apelido varchar(20),
    fkUser  int,
    fkMedicamento   int,
    foreign key (fkUser) references usuario(idUser),
    foreign key (fkMedicamento) references medicamentos(idMedicamento)
);
insert into geladeira values
(100,1,1040),
(101,1,1030),
(102,2,1020),
(103,3,1020);

select * from geladeira;

create table dados(
    idTempUmid  int,
    temp        float,
    umid        int,
    dat_        date,
    hora        time,
    fkGeladeira int,
    foreign key(fkgeladeira) references geladeira(idgeladeira),
    primary key(idtempumid, fkgeladeira)
);


select * from geladeira;
select* from dados;
insert into dados values
(1,1,30,'2014-04-12','16:00',100),
(2,2,30,'2014-04-12','16:00',101),
(3,1,30,'2014-04-12','16:00',102);



