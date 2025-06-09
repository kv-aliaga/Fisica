const result_field = $('#resultado p em');
const result = localStorage.getItem('result');
const unidade = localStorage.getItem('unidade');
const grandeza = localStorage.getItem('grand');

result_field.text(`${grandeza} = ${result} ${unidade}`);