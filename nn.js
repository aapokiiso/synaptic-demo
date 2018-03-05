const { Layer, Network } = require('synaptic');
const mnist = require('mnist');

const inputLayer = new Layer(28*28);
const hiddenLayer = new Layer(30);
const outputLayer = new Layer(10);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

const net = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer,
});

const trainingSize = 8000;
const testSize = 2000;
const { training: trainingSet, test: testSet } = mnist.set(trainingSize, testSize);

module.exports = {
    network: net,
    trainingSet,
    testSet,
};
