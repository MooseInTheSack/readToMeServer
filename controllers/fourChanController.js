const Thread = require('../models/fourChanThread.js')

exports.topTenThreadsPol = async (keyword, category, country) => {
    return await Thread.find({ board: "pol"})
}

exports.topTenThreadsFit = async (keyword, category, country) => {
    return await Thread.find({ board: "fit"})
}

exports.topTenThreadsInt = async (keyword, category, country) => {
    return await Thread.find({ board: "int"})
}

exports.topTenThreadsV = async (keyword, category, country) => {
    return await Thread.find({ board: "v"})
}

exports.topTenThreadsBiz = async (keyword, category, country) => {
    return await Thread.find({ board: "biz"})
}