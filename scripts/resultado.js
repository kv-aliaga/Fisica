const result_field = $('#resultado p em');
const result = localStorage.getItem('result');
const unidade = localStorage.getItem('unidade');
const grandeza = localStorage.getItem('grand');
const result_output = typeof(result) === 'number' ? Number(result).toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
}) : result;

if (typeof(result) === 'number'){
    result_field.text(`${grandeza} = ${result_output} ${unidade}`);
} else {
    result_field.css({
        'color':'rgb(211, 0, 0)',
        'font-weight':'bolder'
    });
    result_field.text(result);
}