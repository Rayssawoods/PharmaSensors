window.onload = function(){
    atualizarGeladeiras();
};


// TIPO 1
var t1 = document.getElementById('temp_g1');
var u1 = document.getElementById('umid_g1');
var imuno = document.getElementById('div_imuno');
var s_imuno = document.getElementById('status_imuno');
var icone1 = document.getElementById('icone_g1');
// TIPO 2
var t2 = document.getElementById('temp_g2');
var u2 = document.getElementById('umid_g2');
var comum = document.getElementById('div_com');
var s_comum = document.getElementById('status_com');
var icone2 = document.getElementById('icone_g2');
//TIPO 3
var t3 = document.getElementById('temp_g3');
var u3 = document.getElementById('umid_g3');
var insulina = document.getElementById('div_insul');
var s_insul = document.getElementById('status_ins');
var icone3 = document.getElementById('icone_g3');



function atualizarGeladeiras(){
    console.log('Entrou aqui');
    fetch('../leituras/tempo-real-teste', {cache: 'no-store'}).then(function (response){
        if(response.ok){
            console.log('Geladeira 1 Recebendo Dados');
            response.json().then(function (resposta){
                console.log(resposta);
                t1.innerHTML = `${(resposta.temperatura1).toFixed(1)}°C`;
                u1.innerHTML = `${resposta.umidade1}%`;
                if(resposta.temperatura1 <= 2 || resposta.temperatura1 >= 8){
                    s_imuno.style.color = 'red';
                    t1.style.color = 'red';
                    s_imuno.innerHTML = 'Limites de temperatura ultrapassados!';
                    imuno.className = "card-header card-header-danger card-header-icon";
                    icone1.innerHTML = "error";
                }
                 else if(resposta.temperatura1 <= 3.5 || resposta.temperatura1 >= 6.5){
                    s_imuno.style.color = 'purple';
                    t1.style.color = 'purple';
                    s_imuno.innerHTML = 'Chegando ao Limite!!';
                    imuno.className = "card-header card-header-warning card-header-icon";
                    icone1.innerHTML = "warning";
                }
                else if(resposta.temperatura1 >3.5 && resposta.temperatura1<6.5){
                    s_imuno.style.color = 'gray';
                    t1.style.color = 'black';
                    s_imuno.innerHTML = 'dentro do limite';
                    imuno.className = "card-header card-header-success card-header-icon";
                    icone1.innerHTML = "ac_unit";
                }

                                //tipo 2
                t2.innerHTML = `${(resposta.temperatura2).toFixed(1)}°C`;
                u2.innerHTML = `${resposta.umidade2}%`;
                if(resposta.temperatura2 < 20 || resposta.temperatura2 > 25){
                    s_comum.style.color = 'red';
                    t2.style.color = 'red';
                    s_comum.innerHTML = 'Limites de temperatura ultrapassados!';
                    comum.className = "card-header card-header-danger card-header-icon";
                    icone2.innerHTML = "error";
                }
                 else if(resposta.temperatura2 <= 21.25 || resposta.temperatura2 >= 23.75){
                    s_comum.style.color = 'purple';
                    t2.style.color = 'purple';
                    s_comum.innerHTML = 'Chegando ao Limite!!';
                    comum.className = "card-header card-header-warning card-header-icon";
                    icone2.innerHTML = "warning";
                }
                else if(resposta.temperatura2 >21.25 && resposta.temperatura2 <23.75){
                    s_comum.style.color = 'gray';
                    t2.style.color = 'black';
                    s_comum.innerHTML = 'dentro do limite';
                    comum.className = "card-header card-header-success card-header-icon";
                    icone2.innerHTML = "ac_unit";
                }
                
                //tipo3
                t3.innerHTML = `${(resposta.temperatura3).toFixed(1)}°C`;
                u3.innerHTML = `${resposta.umidade3}%`;
                if(resposta.temperatura3 <= -20 || resposta.temperatura3 >= 0){
                    s_insul.style.color = 'red';
                    t3.style.color = 'red';
                    s_insul.innerHTML = 'Limites de temperatura ultrapassados!';
                    insulina.className = "card-header card-header-danger card-header-icon";
                    icone3.innerHTML = "error";
                }
                 else if(resposta.temperatura3 <= -15 || resposta.temperatura3 >= -5){
                    s_insul.style.color = 'purple';
                    t3.style.color = 'purple';
                    s_insul.innerHTML = 'Chegando ao Limite!!';
                    insulina.className = "card-header card-header-warning card-header-icon";
                    icone3.innerHTML = "warning";
                }
                else if(resposta.temperatura3 >-15 && resposta.temperatura3 < -5){
                    s_insul.style.color = 'gray';
                    t3.style.color = 'black';
                    s_insul.innerHTML = 'dentro do limite';
                    insulina.className = "card-header card-header-success card-header-icon";
                    icone3.innerHTML = "ac_unit";
                }


                
                

            });
        }
        else{
            console.log('Geladeiras não estão recebendo dados.');
        }
    }).catch(function (error){
        console.error(`O erro é: ${error.message}` );
    });
 
    setTimeout('atualizarGeladeiras()', 8000);
}


