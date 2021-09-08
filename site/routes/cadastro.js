const express = require('express');
const router = express.Router();
const Database = require('../Database');
const isNull = require('../script').isNull;
//const Cryptr = require('cryptr'); // Para encripitar as senhas dos users
const config = require('../config');
//const cryptr = new Cryptr(config.security.key);

router.post('/', (req, res, next) => {

//Pegando os valores dos inputs do formulário de cadastro
    var nome = req.body.nome_empresa;
    var cnpj = req.body.cnpj;
    var email = req.body.email;
    var senha = req.body.senha;
    
    console.log(nome,cnpj, email, senha);

    cadastro(nome,cnpj,email,senha,res);
});

function cadastro( nome,cnpj, email, senha, res){

    verificarEmail(email).then(resultado =>{

        let criar = !resultado;
        console.log(`criar: ${criar}`);

        //let senhaEncriptada = cryptr.encrypt(senha);
        // pra desencriptar é: cryptr.decrypt(senha);

        if(criar){
            var stringSql = `insert into usuario values ('${nome}', '${cnpj}','${email}','${senha}')`;
            Database.query(stringSql).then(resultado => {
                res.status(200).send("ok");
            });
        }else{
            res.status(200).send("Não Ok")
        }

    });

}

// Função para verfificar se o email já foi cadastrado
function verificarEmail(email) {
	// Abaixo está a stringSql para verificar se existe algum email ou cpf/cnpj que seja igual ao que o usuário está tentanto criar
    let querystring = `SELECT * FROM Usuario where email = '${email}'`;
    return new Promise((resolve, reject) => { 
        Database.query(querystring).then(results => {// É chamada a função para verificar esses dados
        	// Caso ela de certo, continua as linhas abaixo
                let existe = results.recordsets[0].length > 0; // Caso oq vier do select no banco tiver como indice maior que 0, isso significa que há dados iguais ao que estão nos campos digitados pelo Usuario
                
                resolve(existe); // Retorna as informações para quem chamou a função
                console.log("Informações verificadas!");
            }).catch(error => {// <-- Pega e trata se der algum erro 
                reject(error);// <-- Retorna o erro para quem chamou
            });
        });
}

module.exports = router;