const mnist = require('mnist');

const trainingSize = 8000;
const testSize = 2000;

const {
    training: trainingSet,
    test: testSet
} = mnist.set(trainingSize, testSize);

module.exports = {
    trainingSet,
    testSet,
};
