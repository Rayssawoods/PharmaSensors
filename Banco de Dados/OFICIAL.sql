create table medicamentos(
    idMedicamento   int primary key,
    tipo            varchar(30),
    tempMax         char(4),    
    tempMin         char(4),
    umidMax         char(4),
    umidMin         char(4)
);

insert into medicamentos values 
(1020,'medicamento',25,20,70,40),
(1030,'insulinas',8,2,70,40),
(1040,'imunobiológicos',0,-20,70,40);
select * from medicamentos;


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
(100,'Geladeira x',1,1040),
(101,'Depósito 02',1,1030),
(102,'Geladeira 2',2,1020),
(103,'Geladeira 1',3,1020);




select * from geladeira;

create table dados(
    idTempUmid  int,
    temp        varchar(4),
    umid        varchar(4),
    dat_        date,
    hora        time,
    fkGeladeira int,
    foreign key(fkgeladeira) references geladeira(idgeladeira),
    primary key(fkgeladeira,idtempumid)
);


select * from geladeira;
select* from dados;
insert into dados values
(1,1,30,'2014-04-12','16:00',100),
(2,2,30,'2014-04-12','16:00',101),
(3,1,30,'2014-04-12','16:00',102);

-- Trás as informações da geladeira, o nome do Usuário, o tipo de medicamento na geladeira, a temperatura permitida
-- e a temperatuda que está atualmente
select g.*, u.nome, m.tipo as 'Tipo Medicamento' , m.tempMax as 'Temperatura Máxima', d.temp as 'Temperatura Atual'	
		from geladeira as g, usuario as u, medicamentos as m, dados as d
        where g.idGeladeira = d.fkGeladeira
        and u.idUser = g.fkUser
        and m.idMedicamento = g.fkMedicamento ; 