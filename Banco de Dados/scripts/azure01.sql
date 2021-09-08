create table Aluno (
    ra      int primary key,
    nome    varchar(40),
    bairro  varchar(35) 
);

select * from Aluno; -- selecionando a tabela

insert into Aluno values 
    (1191003, 'Maria da Silva', 'Tatuapé');
insert into Aluno values
    (1191005, 'José Oliveira', 'Paraíso'),
    (1191006, 'Claudia Souza', 'Vila Prudente');

select nome from Aluno;
select * from Aluno where bairro = 'Paraíso';
update Aluno set bairro = 'Tatuapé' where bairro = 'Paraíso';

-- criação da tabela curso
create table Curso (
    idCurso     int primary key identity(100,10), -- esse é o autoincrement do azure
                                /* o primeiro número é onde começa e o segundo de quanto em quanto ele andará */
    nome        varchar(20),
    coordenador varchar(40)
);
insert into Curso values
    ('ADS','Gerson'), --aqui não se necessita do 'null' para substituir o idCurso
    ('Redes','Alex'),
    ('BD','Marise');

select * from Curso;
-- adicionando coluna no Azure
alter table Aluno
    add fkCurso int foreign key references 
    Curso(idCurso);  
select * from Aluno;
-- Atualizando a tabela Aluno
update Aluno set fkCurso = 100 where RA = 1191005;
update Aluno set fkCurso = 110 where RA = 1191003;
update Aluno set fkCurso = 120 where RA = 1191006;
-- Consultas corretos // aqui repete-se o idCurso 2x
select * from Aluno, Curso where fkCurso = idCurso;
-- maneira grande
select ra, Aluno.nome, bairro, fkCurso, Curso.nome, coordenador
    from Aluno, Curso where fkCurso = idCurso;
-- maneira pequena 
select Aluno.*, Curso.nome, coordenador 
    from Aluno, Curso where fkCurso = idCurso;
-- apelidando tabelas
select a.*,c.* from Aluno as a, Curso as c
    where fkCurso = idCurso;
select a.*,c.* from Aluno as a, Curso as c
    where fkCurso = idCurso and c.nome = 'redes';














