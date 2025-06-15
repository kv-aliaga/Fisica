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
    'delta_h': ['g', 't', 'v0'],
    'hf': ['h0', 'g', 't', 'v0'],
    'h0': ['v0', 't', 'g', 'hf'],
    'vf': ['v0', 'g'],
    't': ['h0', 'v0', 'g'],
};
const funcs = Object.fromEntries(Object.keys(fields).map(k => [k, window[`calc_${k}`]]));
const unidades = {
    'g': 'm/s\u00b2',
    'v0': 'm/s',
    'vf': 'm/s',
    'h0': 'm',
    'hf': 'm',
    'delta_h': 'm',
    't': 's',
}
const grandezas = {
    'g': 'g',
    'v0': 'v0',
    'vf': 'vf',
    'h0': 'h0',
    'hf': 'hf',
    'delta_h': '\u0394h',
    't': 't',
}

//funções
function calc_hf(h0, g, t, v0) {
    return h0 + v0 * t - 0.5 * g * t * t;
} //corrigida

function calc_h0(v0, t, g, hf) {
    return hf - v0 * t + g * t * t;
} //corrigida

function calc_delta_h(g, t, v0) {
    return g * t * t - v0 * t;
} //corrigida

function calc_g(delta_h, v0, t) {
    return (delta_h + v0 * t) / (t * t);
} //corrigida

function calc_t(h0, v0, g) {
    const a = -0.5 * g;
    const b = v0;
    const c = h0;
    let delta;
    let t;

    //usando bhaskara para descobrir t
    delta = b * b - 4 * a * c;
    if (delta < 0) {
        return "Nenhuma solução encontrada, \u0394 < 0";
    } else if (delta === 0) {
        t = -b / 2 * a;
    } else {
        let t1, t2;
        t1 = (-b + Math.sqrt(delta)) / (2 * a);
        t2 = (-b - Math.sqrt(delta)) / (2 * a);
        t = Math.max(t1, t2);
    }
    return t >= 0 ? t : "Nenhuma solução com t >= 0 encontrada";
} //corrigida

function calc_v0(delta_h, g, t) {
    return (2 * delta_h + g * t * t) / (2 * t);
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
$(document).ready(function () {
    for (let field of Object.values(fields)) {
        field.closest('div').hide();
    }
});

submit.on('click', function () {
    const x_field = x_selector.val();
    const result = main(x_field);

    if (result) {
        localStorage.setItem('result', result);
        localStorage.setItem('unidade', unidades[x_field]);
        localStorage.setItem('grand', grandezas[x_field]);
        window.location.assign('resultado.html');
    } else {
        alert('Não deixe nenhum campo vazio!');
    }
});

x_selector.on('change', function () {
    const x_field = x_selector.val();
    for (let [key, value] of Object.entries(fields)) {
        const parentDiv = value.closest('div');
        value.val('');
        if (needed_fields[x_field].includes(key)) {
            parentDiv.show();
        } else {
            parentDiv.hide();
        }
    }
});