import * as func from "./functions.mjs";

//variáveis
const x_selector = $('#incognita');
const submit = $('#calcular');
const fields = {
    'delta_h': $('delta_h'),
    'h0': $('#h0'),
    'hf': $('#hf'),
    'v0': $('#v0'),
    'vf': $('#vf'),
    'g': $('#g'),
    't': $('#t'),
};
const needed_fields = {
    'g': ['delta_h', 'v0', 't'],
    'v0': ['delta_h', 'g', 't'],
    'delta_h': ['h0', 'hf'],
    'hf': ['h0', 'g', 't'],
    'h0': ['v0', 'g', 't'],
    'vf': ['v0', 'g'],
    't': ['vf', 'g'],
};
const funcs = Object.fromEntries(Object.keys(fields).map(k => [k, func[`calc_${k}`]]));

//funções
function check_fields(x_field) {
    const value_from_field = Object.fromEntries(needed_fields[x_field].map(k => [k, fields[k].val().trim()]));
    let values = [];
    for (let [key, val] of Object.entries(value_from_field)) {
        if (val !== '') {
            values.push(Number(val));
        } else {
            return false;
        }
    }
    return values;
}

function main(x_field) {
    const func = funcs[x_field];
    const args = check_fields(x_field);
    if (args) {
        return func(...args);
    } else {
        return false;
    }
}

//event listeners
submit.on('click', function () {
    alert('testando');
});