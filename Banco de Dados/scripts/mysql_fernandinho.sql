create table cliente (
idCliente int primary key identity (1,1),
email varchar(40),
senha varchar(40),
cnpj int
);

create table medicamento (
idMedicamento int primary key identity (1,1),
UmidMax int,
UmidMin int,
TempMax int,
TempMin int
);

create table Geladeira (
idGleadeira int primary key identity (1,1)
);

alter table Geladeira ADD fkMedicamento int FOREIGN KEY references Medicamento (idMedicamento)
alter table Geladeira ADD fkCliente int FOREIGN KEY references Cliente (idCliente)

create table Dados (
idDados int primary key identity (1,1),
Umidade float,
Temperatura float
);

select * from cliente;

alter table cliente add nome_da_empresa varchar(40)

insert into cliente values 
('fernandom281100@ben10.com.br','hannamontana', 123456,'freguesiaamoeba')