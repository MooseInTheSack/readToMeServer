const axios = require('axios');
const threadSchema = require('../models/fourChanThread')

const getThreads = async (boardName) => {
    axios.get('https://a.4cdn.org/pol/threads.json')
    .then(function (response) {
        // handle success
        console.log('ducky response: ', response);
        
        const firstThreadId = response.data[0].threads[2].no
        axios.get(`https://a.4cdn.org/pol/thread/${firstThreadId}.json`)
            .then(function (threadResponse) {
                console.log('ducky threadResponse: ', threadResponse);

                threadResponse.data.posts.forEach(reply => {
                    threadSchema.save(reply)
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}

module.exports = { getThreads }