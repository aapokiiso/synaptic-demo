const {Network} = require('synaptic');
const mnist = require('mnist');

const classList = require('@lamiaoy/class-list');
const domEvents = require('@lamiaoy/dom-events');

const {testSet} = require('./mnist-sets');
const networkJson = require('./network.json');
const trainedNet = Network.fromJSON(networkJson);

let currTestIdx = 0;

bindEventListeners();

document.addEventListener('DOMContentLoaded', function () {
    beginTesting();
});

function bindEventListeners() {
    domEvents.addEventListener(document, 'click', '.js-test-shuffle', function () {
        currTestIdx = Math.round(Math.random() * testSet.length);
        const digitMatrix = testSet[currTestIdx].input;
        drawSubject(digitMatrix);
    });

    domEvents.addEventListener(document, 'click', '.js-test-guess', function () {
        const digitMatrix = testSet[currTestIdx].input;
        const digit = guessDigit(trainedNet, digitMatrix);
        drawGuess(digit);
    });
}

function beginTesting() {
    const loadingScreen = document.querySelector('.js-loading');
    classList.addClass(loadingScreen, 'is-finished');

    // Draw first test digit as a placeholder
    drawSubject(testSet[currTestIdx].input);
}

function drawSubject(digitMatrix) {
    const canvas = document.getElementById('test-digit-canvas');
    mnist.draw(digitMatrix, canvas.getContext('2d'));
}

function guessDigit(network, digitMatrix) {
    const networkResult = network.activate(digitMatrix);
    const maxProbability = Math.max(...networkResult);
    const mostProbableDigit = networkResult.indexOf(maxProbability);

    return mostProbableDigit;
}

function drawGuess(digit) {
    const resultEl = document.querySelector('.js-test-result');
    resultEl.textContent = digit;
}
