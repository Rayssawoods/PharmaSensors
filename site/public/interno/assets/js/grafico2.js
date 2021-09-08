var temper = temperatura2.getContext('2d');
var umidade = umidade2.getContext('2d');


window.onload = function(){
    atualizarGrafico();
};

var t3 = new Chart(temper, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: "#af2828",
            borderColor: "#af2828",
            borderWidth: 3,
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 7,
            lineTension: 0.2,
            fill: false,
            label: "Temperatura"
        }]
    },
    options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        title: {
            display: true,
            text: 'Gráfico de Temperatura',
            fontSize: 30,
            fontColor: "#af2828",
            fontStyle: "normal"
        },
        scales: {
            yAxes: [{
                ticks: {

                    // Inclui a °C para o gráfico de Temperatura
                    callback: function(value) {
                        return value.toFixed(1) + '°C';
                    }
                }
            }]
        }
}
});

var t4 = new Chart(umidade, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: "#0056e2",
            borderColor: "#0056e2",
            borderWidth: 3,
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 7,
            lineTension: 0.2,
            fill: false,
            label: "Umidade"
        }]
    },
    options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        title: {
            display: true,
            text: 'Gráfico de Umidade',
            fontSize: 30,
            fontColor: "#0056e2",
            fontStyle: "normal"
        },
        scales: {
            yAxes: [{
                ticks: {

                    // Inclui a °C para o gráfico de Temperatura
                    callback: function(value) {
                        return value.toFixed(1) + '%';
                    }
                }
            }]
        }
}
});

function atualizarGrafico(){
    fetch('../leituras/ultimas2', {cache: 'no-store'}).then(function (response){
        if(response.ok){
            console.log('Conexão ta Funfando');
            response.json().then(function (resposta){ 
                resposta.reverse();
                for(i=0; i<resposta.length;i++){
                    var registro = resposta[i];
                    //ifizinho para nao deixar a temperaturazinha ultrapassar 6 registros
                    if(t3.data.datasets[0].data.length >= 6){
                        //horas
                        t3.data.labels.shift();
                        t3.data.labels.push(registro.hora);
                        //temperatura e umidade
                        t3.data.datasets[0].data.shift();
                        t3.data.datasets[0].data.push(registro.temp);
                    }
                    else{
                        t3.data.labels.push(registro.hora);
                        t3.data.datasets[0].data.push(registro.temp);
                    }

                    
                    //dar update nas tabelas
                    t3.update();

                    if(t4.data.datasets[0].data.length >= 6){
                        t4.data.labels.shift();
                        t4.data.labels.push(registro.hora);
                        t4.data.datasets[0].data.shift();
                        t4.data.datasets[0].data.push(registro.umid);
                        
                    }
                    else{
                        t4.data.labels.push(registro.hora);
                        t4.data.datasets[0].data.push(registro.umid);
                    }


                    t4.update();
                }
            });
        }
        else{
            console.log('Conexão NÃO TA FUNFANDO');
        }
        
       

    }).catch(function (error){
        console.error(`O erro é: ${error.message}` );
    });

    setTimeout('atualizarGrafico()',6000);
}




