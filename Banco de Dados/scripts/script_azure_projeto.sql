create table medicamento (
idMedicamento int primary key identity (1,1),
tipo int,
tempMax int,
tempMin int,
umiMax int,
umiMin int);

select * from medicamento;

insert into medicamento values
(1, 25, 20, 30, 15),
(2, 5, 0, 30, 15);

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
 (2, 1),
 (3, 1);

 create table dados (
 idDados int primary key identity (1,1),
 valorTemp varchar (10),
 valorUmid varchar (10),
 dia date,
 hora time);

 alter table dados add fkGeladeira int foreign key references geladeira (idGeladeira);

 select * from dados;

 insert into dados values
 (22, 20, 2019-03-09, 16.00, 4);


