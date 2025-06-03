function calc_hf(h0, g, t) {
    return h0 - 0.5 * g * Math.pow(t, 2);
}

function calc_v(g, t) {
    return g * t;
}

function calc_delta_h(h0, hf) {
    return Math.abs(hf - h0);
}

function calc_g(h, t) {
    return 2 * h / Math.pow(t, 2);
}

function calc_t(vf, g) {
    return vf / g;
}

function calc_v0(delta_h, g, t) {
    return (delta_h - 0.5 * g * Math.pow(t, 2)) / t;
}

function calc_vf(v0, g, h) {
    return Math.sqrt(Math.pow(v0, 2) + 2 * g * h);
}