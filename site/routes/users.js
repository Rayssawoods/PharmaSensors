var express = require('express');
var router = express.Router();
var banco = require('../app-banco');


router.post('/',(req,res,next)=>{
  banco.conectar().then(()=>{
    console.log(`Chegou para registro: ${JSON.stringify(req.body)}`);

    // Dados do formul�rio da pe�a
    var nome = req.body.nome_empresa;
    var cnpj = req.body.cnpj;
    var email = req.body.email;
    var senha = req.body.senha;
    

    return banco.sql.query(`INSERT INTO usuario (nome, cnpj,email,senha) values
    ('${nome}','${cnpj}','${email}','${senha}')`);
  }).then(()=>{
    res.send(200);
  }).catch(err=>{
    console.log(err);
  }).finally(()=>{
    banco.sql.close();
  })
});


module.exports = router;
