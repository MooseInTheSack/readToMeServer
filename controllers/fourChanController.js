const Thread = require('../models/fourChanThread.js')

exports.topTenThreadsPol = async function(req, res) {
    const topThreads = await Thread.find({ board: "pol"}).limit(25)
    console.log('ducky topThreads: ', topThreads)
    res.send(JSON.stringify(topThreads));
};

exports.topTenThreadsFit = async (req, res) => {
    const topThreads = await Thread.find({ board: "fit"}).limit(25)
    res.send(JSON.stringify(topThreads));
}

exports.topTenThreadsInt = async (req, res) => {
    const topThreads = await Thread.find({ board: "int"}).limit(25)
    res.send(JSON.stringify(topThreads));
}

exports.topTenThreadsV = async (req, res) => {
    const topThreads = await Thread.find({ board: "v"}).limit(25)
    res.send(JSON.stringify(topThreads));
}

exports.topTenThreadsBiz = async function(req, res) {
    const topThreads = await Thread.find({ board: "biz"}).limit(25)
    res.send(JSON.stringify(topThreads));
};