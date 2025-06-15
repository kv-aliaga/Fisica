import $ from "jquery";

const resultado: string = localStorage.getItem('result');
$('#resultado').find('p em').html(resultado);