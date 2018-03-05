const classList = require('@lamiaoy/class-list');
// const domEvents = require('@lamiaoy/dom-events');
const mnist = require('mnist');
const {network, trainingSet, testSet} = require('./nn');

document.addEventListener('DOMContentLoaded', function () {
    teachNetwork();
    beginTesting();
});

let currTestIdx = 0;

document.querySelector('.js-test-shuffle').addEventListener('click', function () {
    currTestIdx = Math.round(Math.random() * testSet.length);
    const digitMatrix = testSet[currTestIdx].input;
    drawSubject(digitMatrix);
});

document.querySelector('.js-test-guess').addEventListener('click', function () {
    const digitMatrix = testSet[currTestIdx].input;
    drawGuess(digitMatrix);
});

// domEvents.addEventListener(document, '.js-test-activate', function () {
//     const randomIndex = Math.round(Math.random() * testSet.length);
//     console.log(randomIndex)
// });

// @todo testing below
// let correctCount = 0;
// for (let i = 0; i < testSet.length; i++) {
//     const expected = arrToInt(testSet[i].output);
//     const guess = arrToInt(net.activate(testSet[i].input));
//     if (expected === guess) {
//         correctCount++;
//     }
// }

// console.log(`Guessed correctly ${Math.round(correctCount / testSize * 10000) / 100}% (${correctCount} out of ${testSize})`);

// var digit = mnist[1].get();
// var context = document.getElementById('myCanvas').getContext('2d');

// mnist.draw(digit, context);

function teachNetwork() {
    // const loadingIndex = document.querySelector('.js-loading-index');
    // const loadingCount = document.querySelector('.js-loading-count');

    const trainingSize = trainingSet.length;
    // loadingCount.textContent = trainingSize;

    const learningRate = .1;
    for (let i = 0; i < trainingSize; i++) {
        network.activate(trainingSet[i].input);
        network.propagate(learningRate, trainingSet[i].output);
        // loadingIndex.textContent = i + 1;
    }
}

function beginTesting() {
    const loadingScreen = document.querySelector('.js-loading');
    classList.addClass(loadingScreen, 'is-finished');
    drawSubject(testSet[currTestIdx].input);
}

function drawSubject(digitMatrix) {
    const context = document.getElementById('test-digit-canvas').getContext('2d');

    mnist.draw(digitMatrix, context);
}

function drawGuess(digitMatrix) {
    const networkResult = network.activate(digitMatrix);
    const maxProbability = Math.max(...networkResult);
    const mostProbableDigit = networkResult.indexOf(maxProbability);

    const resultEl = document.querySelector('.js-test-result');
    resultEl.textContent = mostProbableDigit;
}
