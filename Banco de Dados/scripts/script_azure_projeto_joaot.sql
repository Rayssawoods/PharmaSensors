create table medicamento (
idMedicamento int primary key identity (1,1),
tipo varchar (30),
tempMax float,
tempMin float,
umiMax float,
umiMin float);

select * from medicamento;

insert into medicamento values
('regular', 25, 20, 30, 15),
('congenito', 5, 0, 30, 15);

create table cliente (
idCliente int primary key identity (1,1),
email varchar (60),
senha varchar (60),
CNPJ int,
nomeDaEmpresa varchar (60));

select * from cliente;

insert into cliente values 
('joao.teodoro@bandtec.com.br', 12345, 234587, 'Farmacia do Tio Joao');

create table geladeira (
idGeladeira int primary key identity (1,1));

 alter table geladeira add fkMedicamento int foreign key references medicamento (idMedicamento);
 alter table geladeira add fkCliente int foreign key references cliente (idCliente);

 select * from geladeira;
 
 insert into geladeira values
 ('congenito', 1),
 ('regular', 1);

 create table dados (
 idDados int primary key identity (1,1),
 valorTemp float,
 valorUmid float,
 dia date,
 hora time);

 alter table dados add fkGeladeira int foreign key references geladeira (idGeladeira);

 select * from dados;

 insert into dados values
 (22, 20, '2019-03-09', '16:00:00', 4);


