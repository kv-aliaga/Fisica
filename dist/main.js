// ordem dos inputs no html: h0, hf, v0, vf, g, t
import $ from "jquery";
//funções
const toChar = x => x.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});
function calcT(h0, hf, v0, g) {
    const a = -0.5 * g;
    const b = v0;
    const c = h0;
    const delta = b * b - 4 * a * c;
    let t;
    let resultado;
    if (delta < 0) {
        localStorage.setItem('result', 'Nenhum resultado possível');
        return;
    }
    if (delta === 0) {
        t = -b / (2 * a);
    }
    else {
        let t1 = (-b + Math.sqrt(delta)) / (2 * a);
        let t2 = (-b - Math.sqrt(delta)) / (2 * a);
        t = Math.max(t1, t2);
    }
    resultado = toChar(t);
    localStorage.setItem('result', t >= 0 ? 'Nenhum resultado fisicamente possível' : `t = ${resultado}s`);
}
function calcVf(v0, g, t) {
    const vf = v0 - g * t;
    localStorage.setItem('result', `v<sub>f</sub> = ${toChar(vf)}m/s`);
}
function calcV0(h0, hf, g, t) {
    const v0 = (hf - h0 + 0.5 * g * t * t);
    localStorage.setItem('result', `v<sub>i</sub> = ${toChar(v0)}m/s`);
}
function calcHf(h0, v0, g, t) {
    const hf = h0 + v0 * t - g * t * t;
    localStorage.setItem('result', `h<sub>f</sub> = ${toChar(hf)}m`);
}
function calcH0(hf, v0, g, t) {
    const h0 = hf - v0 * t + g * t * t;
    localStorage.setItem('result', `h<sub>i</sub> = ${toChar(h0)}m`);
}
function calcDh(v0, g, t) {
    const dh = v0 * t - g * t * t;
    localStorage.setItem('result', `\u0394h = ${toChar(dh)}m`);
}
function calcHmax(h0, v0, g) {
    const hmax = h0 + v0 * v0 / (2 * g);
    localStorage.setItem('result', `h<sub>max</sub> = ${toChar(hmax)}m`);
}
function calcTmax(v0, g) {
    const tmax = v0 / g;
    localStorage.setItem('result', `t<sub>max</sub> = ${toChar(tmax)}s`);
}
//dicionários e constantes jQuery
const functions = {
    t: calcT,
    vf: calcVf,
    v0: calcV0,
    hf: calcHf,
    h0: calcH0,
    dh: calcDh,
    hmax: calcHmax,
    tmax: calcTmax
};
const needed_arguments = new Map([
    [calcT, ['h0', 'hf', 'v0', 'g']],
    [calcVf, ['v0', 'g', 't']],
    [calcV0, ['h0', 'hf', 'g', 't']],
    [calcHf, ['h0', 'v0', 'g', 't']],
    [calcH0, ['hf', 'v0', 'g', 't']],
    [calcDh, ['v0', 'g', 't']],
    [calcHmax, ['h0', 'v0', 'g']],
    [calcTmax, ['v0', 'g']]
]);
const fieds = Object.fromEntries(['h0', 'hf', 'v0', 'vf', 'g', 'f'].map(x => [x, $(`#${x}`)]));
//event listeners
$('#incognita').on('change', function () {
    const x_field = $(this).val();
    let argumentos;
    $('#perguntas').children().each(function () {
        if ($(this).prop('id') in Object.keys(functions)) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
});
$('body').css('color', 'blue');
