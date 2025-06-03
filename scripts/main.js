import * as fisica from "./functions.js";

//variáveis
const form = $();

function main() {
    //variáveis
    const input_fields = {
        'v0': $(),
        'vf': $(),
        'h0': $(),
        'hf': $(),
        'delta_h': $(),
        't': $(),
        'g': $(),
    }

    const values = Object.fromEntries(
        Object.keys(input_fields).map(chave => [
            chave, input_fields[chave].val().trim()
        ])
    );

    let empty_field;
    let output_value;

    //processamento
    for (const [key, value] of Object.entries(values)) {
        if (value === "") {
            empty_field = key;
        } else {
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
    empty_field.text(output_value);
}

$(form).on('submit', function(e) {
    e.preventDefault();
    main();
});