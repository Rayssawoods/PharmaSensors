// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.get('/ultimas', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    var limite_linhas = 8;
    return banco.sql.query(`select top ${limite_linhas} 
                            temp, 
                            umid, 
                            FORMAT(hora,'HH:mm:ss') as hora,
                            fkgeladeira 
                            from dados order by idtempumid desc`);
  }).then(consulta => {

    console.log(`Resultado da consulta: ${JSON.stringify(consulta.recordset)}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

// TESTES DE TRIPLICAÇÃO DOS ENDPOINTS
router.get('/ultimas1', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    var limite_linhas = 1;
    return banco.sql.query(`select top ${limite_linhas} 
                            temp, 
                            umid, 
                            FORMAT(hora,'HH:mm:ss') as hora,
                            fkgeladeira 
                            from dados where fkgeladeira=1 order by idtempumid desc`);
  }).then(consulta => {

    console.log(`Resultado da consulta: ${JSON.stringify(consulta.recordset)}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});
router.get('/ultimas2', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    var limite_linhas = 1;
    return banco.sql.query(`select top ${limite_linhas} 
                            temp, 
                            umid, 
                            FORMAT(hora,'HH:mm:ss') as hora,
                            fkgeladeira 
                            from dados where fkgeladeira=2 order by idtempumid desc`);
  }).then(consulta => {

    console.log(`Resultado da consulta: ${JSON.stringify(consulta.recordset)}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});
router.get('/ultimas3', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    var limite_linhas = 1;
    return banco.sql.query(`select top ${limite_linhas} 
                            temp, 
                            umid, 
                            FORMAT(hora,'HH:mm:ss') as hora,
                            fkgeladeira 
                            from dados where fkgeladeira=3 order by idtempumid desc`);
  }).then(consulta => {

    console.log(`Resultado da consulta: ${JSON.stringify(consulta.recordset)}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

//FIM DOS TESTES



router.get('/estatisticas', function (req, res, next) {
  console.log(banco.conexao);

  var estatisticas = {
    temp_maxima: 0,
    temp_minima: 0,
    temp_media: 0
  };

  banco.conectar().then(() => {
    return banco.sql.query(`
        select 
          max(temperatura) as temp_maxima, 
          min(temperatura) as temp_minima, 
          avg(temperatura) as temp_media 
        from leitura
        `);
  }).then(consulta => {
    estatisticas.temp_maxima = consulta.recordset[0].temp_maxima;
    estatisticas.temp_minima = consulta.recordset[0].temp_minima;
    estatisticas.temp_media = consulta.recordset[0].temp_media;
    console.log(`Estatísticas: ${JSON.stringify(estatisticas)}`);
    res.send(estatisticas);
  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});




//TESTE DE ENDPOINT TRIPLO
router.get('/tempo-real-teste', function (req, res, next) {
  console.log(banco.conexao);

  var estatisticas = {
    temperatura1: 0,
    umidade1: 0,
    temperatura2: 0,
    umidade2: 0,
    temperatura3: 0,
    umidade3: 0
  };

  banco.conectar().then(() => {
    return banco.sql.query(`
        select top 1 d1.temp as 'temp1', d1.umid as 'umid1', d2.temp as 'temp2', d2.umid as 'umid2', d3.temp as 'temp3', d3.umid as 'umid3'
        from dados as d1, dados as d2, dados as d3
        where d1.fkGeladeira=1
        and d2.fkGeladeira = 2
        and d3.fkGeladeira = 3   
        order by d1.idtempumid desc, d2.idtempumid desc, d3.idtempumid desc
        `);
  }).then(consulta => {

    estatisticas.temperatura1 = consulta.recordset[0].temp1;
    estatisticas.umidade1 = consulta.recordset[0].umid1;
    estatisticas.temperatura2 = consulta.recordset[0].temp2;
    estatisticas.umidade2 = consulta.recordset[0].umid2;
    estatisticas.temperatura3 = consulta.recordset[0].temp3;
    estatisticas.umidade3 = consulta.recordset[0].umid3;
    
    console.log(`Tempo real: ${JSON.stringify(estatisticas)}`);

    res.send(estatisticas);

  }).catch(err => {

    var erro = `Erro na leitura dos registros de tempo real: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });
});





//TEMPERATURAS UNICAS
router.get('/tempo-real1', function (req, res, next) {
  console.log(banco.conexao);

  var estatisticas = {
    temperatura: 0,
    umidade: 0,
    apelido: ''
  };

  banco.conectar().then(() => {
    return banco.sql.query(`
        select top 1 temp, umid, apelido from dados, geladeira 
        where idGeladeira = fkGeladeira
        and fkGeladeira=1 order by idtempumid desc
        `);
  }).then(consulta => {

    estatisticas.temperatura = consulta.recordset[0].temp;
    estatisticas.umidade = consulta.recordset[0].umid;
    estatisticas.apelido = consulta.recordset[0].apelido;
    console.log(`Tempo real: ${JSON.stringify(estatisticas)}`);

    res.send(estatisticas);

  }).catch(err => {

    var erro = `Erro na leitura dos registros de tempo real: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });
});


router.get('/tempo-real2', function (req, res, next) {
  console.log(banco.conexao);

  var estatisticas = {
    temperatura: 0,
    umidade: 0
  };

  banco.conectar().then(() => {
    return banco.sql.query(`
        select top 1 temp, umid from dados where fkGeladeira=2 order by idtempumid desc
        `);
  }).then(consulta => {

    estatisticas.temperatura = consulta.recordset[0].temp;
    estatisticas.umidade = consulta.recordset[0].umid;
    console.log(`Tempo real: ${JSON.stringify(estatisticas)}`);

    res.send(estatisticas);

  }).catch(err => {

    var erro = `Erro na leitura dos registros de tempo real: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });
});

router.get('/tempo-real3', function (req, res, next) {
  console.log(banco.conexao);

  var estatisticas = {
    temperatura: 0,
    umidade: 0
  };

  banco.conectar().then(() => {
    return banco.sql.query(`
        select top 1 temp, umid from dados where fkGeladeira=3 order by idtempumid desc
        `);
  }).then(consulta => {

    estatisticas.temperatura = consulta.recordset[0].temp;
    estatisticas.umidade = consulta.recordset[0].umid;
    console.log(`Tempo real: ${JSON.stringify(estatisticas)}`);

    res.send(estatisticas);

  }).catch(err => {

    var erro = `Erro na leitura dos registros de tempo real: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });
});

// não mexa nesta linha!
module.exports = router;
