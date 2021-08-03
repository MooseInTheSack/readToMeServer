const axios = require('axios');
const Thread = require('../models/fourChanThread.js')
const striptags = require('striptags');
const he = require('he');

const getRepliesToThread = async (boardName, threadId) => {
    axios.get(`https://a.4cdn.org/${boardName}/thread/${threadId}.json`)
        .then((threadResponse) => {
            
            const replyArray = threadResponse.data.posts.map(obj => {
                
                const removedTags = striptags(obj.com)
                return he.decode(removedTags)
            })
            const title = threadResponse.data.posts[0].sub ? threadResponse.data.posts[0].sub : "Untitled"
            const time = threadResponse.data.posts[0].time ? threadResponse.data.posts[0].time : "NA"
        
                threadResponse.data.posts.forEach(reply => {
                    Thread.create({
                        board: boardName,
                        title: title,
                        replies: replyArray,
                        date: time,
                    }, function (err, small) {
                        if (err) {
                            console.log('Error creating Threads: ', err)
                            throw err;
                        }

                        // saved!
                        console.log("ducky successfully saved fourchan thread")
                    });
                
                })

    })
    .catch(function (error) {
        console.log(error);
    })
}

const getThreads = async (boardName) => {
    const board = boardName ? boardName : "pol"
    axios.get(`https://a.4cdn.org/${boardName}/threads.json`)
    .then(function (response) {
        // handle success
        console.log('ducky response: ', response.data);
        
        if(response.data && response.data.length > 1) {
            const firstTwoPageIds = response.data[0].threads.map(threadId => threadId.no).concat(response.data[1].threads.map(threadId => threadId.no))
            //remove first two since they're stickies
            firstTwoPageIds.splice(0, 2)
            console.log('ducky firstTwoPageIds: ', firstTwoPageIds)

            //const firstThreadId = response.data[0].threads[2].no
            
            Thread.deleteMany({}, (err, result) => {
                if (err) {
                    console.log('Error deleting Threads: ', err)
                    throw err;
                }
                console.log("successfully deleted elements before entry...")
                
                firstTwoPageIds.forEach(threadId => {
                    setTimeout(() => {
                        getRepliesToThread(board, threadId) 
                    }, 30000)
                }) 
            })
        }
    })  
}

module.exports = { getThreads }