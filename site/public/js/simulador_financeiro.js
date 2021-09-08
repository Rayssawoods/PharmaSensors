function simulador(porte, quantidade, vacina){
    var valor_estoque = (Number(quantidade) *  Number(vacina)) * 0.30;

    alert(`Adquirindo o nosso produto, com  R$${porte} de investimento, é possível diminuir a perca de até R$${(valor_estoque).toFixed(2)} de seu estoque.`);

}