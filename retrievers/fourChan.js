const axios = require('axios');
const Thread = require('../models/fourChanThread.js')

const getThreads = async (boardName) => {
    axios.get('https://a.4cdn.org/pol/threads.json')
    .then(function (response) {
        // handle success
        console.log('ducky response: ', response);
        
        const firstThreadId = response.data[0].threads[2].no
        axios.get(`https://a.4cdn.org/pol/thread/${firstThreadId}.json`)
            .then(function (threadResponse) {
                console.log('ducky threadResponse: ', threadResponse.data);

                threadResponse.data.posts.forEach(reply => {
                    Thread.create({
                        title: 'Thread Title 1',
                        replies: ['reply 1', 'reply 2', 'reply 3'],
                        date: '2021-07-11',
                    }, function (err, small) {
                        if (err) return handleError(err);

                        // saved!
                        console.log("ducky successfully saved fourchan thread")
                    });
                
                })

        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    })
}

module.exports = { getThreads }