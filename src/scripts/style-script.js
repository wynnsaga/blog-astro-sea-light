import chroma from "chroma-js";

function getRandomColor() {
    return chroma.random().hex();
}

function getScaleColors(length = 18) {
    const arr = chroma.scale(['#ffffff', '#7ca4a1'])
        .mode('lch').colors(length)
    return arr;
}

function getRandomScaleColor(length = 24) {
    const arr = chroma.scale(['#F0F4F4', '#7ca4a1'])
        .mode('lch').colors(length);
    return arr[Math.floor(Math.random() * arr.length)];
}


export {
    getRandomColor,
    getScaleColors,
    getRandomScaleColor,
};