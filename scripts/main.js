import * as fisica from "./functions.js";

//variáveis
const form = $();
const fields = {
    'v0': $(),
    'vf': $(),
    'h0': $(),
    'hf': $(),
    'delta_h': $(),
    't': $(),
    'g': $(),
    'calc':$(),
}

const necessary_fields = {

}

//funções
function get_values() {
    return Object.fromEntries(
        Object.keys(fields).map(chave => [
            chave, fields[chave].val().trim()
        ])
    );
}

function main(empty_field) {
    //variáveis
    let output_value;
    const values = get_values();

    //processamento
    for (const [key, value] of Object.entries(values)) {
        if (value !== "") {
            values[key] = Number(value);
        }
    }

    switch (empty_field) {
        case 'v0':
            values.v0 = fisica.calc_v0(values.h0, values.g, values.t);
            output_value = values.v0;
            break;

        case 'vf':
            values.vf = fisica.calc_vf(values.v0, values.g, values.h);
            output_value = values.vf;
            break;

        case 'hf':
            values.hf = fisica.calc_hf(values.h0, values.g, values.t);
            output_value = values.hf;
            break;

        case 'delta_h':
            values.delta_h = fisica.calc_delta_h(values.h0, values.hf);
            output_value = values.hf;
            break;

        case 't':
            values.t = fisica.calc_t(values.vf, values.g);
            output_value = values.t;
            break;

        case 'g':
            values.g = fisica.calc_g(values.h, values.t);
            output_value = values.g;
    }

    //saída
    fields[empty_field].text(output_value);
}

function verify_entry(needed) {
    const values = get_values();
    let cont = 0;
    for (const key in needed) {
        if (values[key] === "") {
            cont++;
        }
    }
    return cont === 1;
}

//event listeners
$(form).on('submit', function (e) {
    e.preventDefault();
    let val = fields.calc.val();

    if (verify_entry()) {
        main();
    } else {
        alert("Deixe apenas 1 campo vazio");
    }
});