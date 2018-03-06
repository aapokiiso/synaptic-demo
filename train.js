const fs = require('fs');
const { Layer, Network } = require('synaptic');
const mnist = require('mnist');
const {trainingSet} = require('./mnist-sets');

const net = loadNetwork();
const trainedNet = trainNetwork(net, trainingSet);
saveNetwork(trainedNet);

function loadNetwork() {
    const inputLayer = new Layer(28*28);
    const hiddenLayer = new Layer(30);
    const outputLayer = new Layer(10);

    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    return new Network({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer,
    });
}

function trainNetwork(network, trainingSet, learningRate = .1) {
    const trainingSize = trainingSet.length;

    console.log('Training hand-writing network...');

    for (let i = 0; i < trainingSize; i++) {
        const digitMatrix = trainingSet[i].input;
        const result = network.activate(digitMatrix);
        network.propagate(learningRate, trainingSet[i].output);
        console.log(`${i+1} / ${trainingSize}\nInput: [${digitMatrix}]\nResult: [${result}]\n\n`);
    }

    return network;
}

function saveNetwork(network) {
    fs.writeFileSync('network.json', JSON.stringify(network.toJSON()));
}