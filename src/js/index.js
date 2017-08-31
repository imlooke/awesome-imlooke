
var list = [
    'main.js',
];

function getSrcArr() {
    var srcArr = [];
    var src = './src/js/';

    for (var i = 0; i < list.length; i++) {
        var element = list[i];
        srcArr[i] = src + element;
    }

    return srcArr;
}

module.exports = getSrcArr();