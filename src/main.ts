// ordem dos inputs no html: h0, hf, v0, vf, g, t
import $ from "jquery";

type Funcao = (...args: any[]) => any;

//funções
const toChar: (x: number) => string = x => x.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

function calcT(h0: number, hf: number, v0: number, g: number): void {
    const a: number = -0.5 * g;
    const b: number = v0;
    const c: number = h0;

    const delta: number = b * b - 4 * a * c;
    let t: number;

    let resultado: string;

    if (delta < 0) {
        localStorage.setItem('result', 'Nenhum resultado possível');
        return;
    }

    if (delta === 0) {
        t = -b / (2 * a);
    } else {
        let t1 = (-b + Math.sqrt(delta)) / (2 * a);
        let t2 = (-b - Math.sqrt(delta)) / (2 * a);
        t = Math.max(t1, t2);
    }

    resultado = toChar(t);
    localStorage.setItem('result', t >= 0 ? 'Nenhum resultado fisicamente possível' : `t = ${resultado}s`);
}

function calcVf(v0: number, g: number, t: number): void {
    const vf: number = v0 - g * t;
    localStorage.setItem('result', `v<sub>f</sub> = ${toChar(vf)}m/s`);
}

function calcV0(h0: number, hf: number, g: number, t: number): void {
    const v0: number = (hf - h0 + 0.5 * g * t * t);
    localStorage.setItem('result', `v<sub>i</sub> = ${toChar(v0)}m/s`);
}

function calcHf(h0: number, v0: number, g: number, t: number): void {
    const hf: number = h0 + v0 * t - g * t * t;
    localStorage.setItem('result', `h<sub>f</sub> = ${toChar(hf)}m`);
}

function calcH0(hf: number, v0: number, g: number, t: number): void {
    const h0: number = hf - v0 * t + g * t * t;
    localStorage.setItem('result', `h<sub>i</sub> = ${toChar(h0)}m`);
}

function calcDh(v0: number, g: number, t: number): void {
    const dh: number = v0 * t - g * t * t;
    localStorage.setItem('result', `\u0394h = ${toChar(dh)}m`);
}

function calcHmax(h0: number, v0: number, g: number): void {
    const hmax: number = h0 + v0 * v0 / (2 * g);
    localStorage.setItem('result', `h<sub>max</sub> = ${toChar(hmax)}m`);
}

function calcTmax(v0: number, g: number): void {
    const tmax: number = v0/g;
    localStorage.setItem('result', `t<sub>max</sub> = ${toChar(tmax)}s`);
}

//dicionários e constantes jQuery
const functions: { [key: string]: Funcao } = {
    t: calcT,
    vf: calcVf,
    v0: calcV0,
    hf: calcHf,
    h0: calcH0,
    dh: calcDh,
    hmax: calcHmax,
    tmax: calcTmax
};

const needed_arguments = new Map<Funcao, string[]>([
    [calcT, ['h0', 'hf', 'v0', 'g']],
    [calcVf, ['v0', 'g', 't']],
    [calcV0, ['h0', 'hf', 'g', 't']],
    [calcHf, ['h0', 'v0', 'g', 't']],
    [calcH0, ['hf', 'v0', 'g', 't']],
    [calcDh, ['v0', 'g', 't']],
    [calcHmax, ['h0', 'v0', 'g']],
    [calcTmax, ['v0', 'g']]
]);

const fieds: { [key: string]: JQuery} = Object.fromEntries(
    ['h0', 'hf', 'v0', 'vf', 'g', 'f'].map(x => [x, $(`#${x}`)])
);

//event listeners
$('#incognita').on('change', function(): void {
    const x_field: string = $(this).val() as string;
    let argumentos: number[];

    $('#perguntas').children().each(function(): void {
       if ($(this).prop('id') in Object.keys(functions)) {
           $(this).show();
       } else {
           $(this).hide();
       }
    });
});

$('body').css('color', 'blue');
