const result_field = $('#resultado p em');
const result = localStorage.getItem('result');
const unidade = localStorage.getItem('unidade');
const grandeza = localStorage.getItem('grand');
const result_output = Number(result).toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
})

result_field.text(`${grandeza} = ${result_output} ${unidade}`);