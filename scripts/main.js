//variáveis
const x_selector = $('#incognita');
const submit = $('#calcular');
const fields = {
    'delta_h': $('#delta_h'),
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
const funcs = Object.fromEntries(Object.keys(fields).map(k => [k, window[`calc_${k}`]]));

//funções
function calc_hf(h0, g, t) {
    return h0 - 0.5 * g * Math.pow(t, 2);
}

function calc_h0(v0, t, g) {
    return v0 * t + 0.5 * g * Math.pow(t, 2);
}

function calc_delta_h(h0, hf) {
    return Math.abs(hf - h0);
}

function calc_g(delta_h, v0, t) {
    return 2 * (delta_h - v0 * t) / Math.pow(t, 2);
}

function calc_t(vf, g) {
    return vf / g;
}

function calc_v0(delta_h, g, t) {
    return (delta_h - 0.5 * g * Math.pow(t, 2)) / t;
}

function calc_vf(v0, g, delta_h) {
    return Math.sqrt(Math.pow(v0, 2) + 2 * g * delta_h);
}

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
$(document).ready(function() {
   for (let field of Object.values(fields)) {
       field.closest('div').hide();
   }
});

submit.on('click', function () {
    const x_field = x_selector.val();
    const args = check_fields(x_field);

    if (args) {
        alert('funcionou');
    } else {
        alert('falhou');
    }
});

x_selector.on('change', function() {
   x_field = x_selector.val();
   for (let [key, value] of Object.entries(fields)) {
       const parentDiv = value.closest('div');
       if (needed_fields[x_field].includes(key)) {
           parentDiv.show();
       } else {
           parentDiv.hide();
       }
   }
});