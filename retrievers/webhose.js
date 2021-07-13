const webhoseio = require('webhoseio');
const psl = require('psl');
const storySchema = require('../models/story')

require('dotenv').config();
const webHoseAPIKey = process.env.WEBHOSE_API_KEY

const extractHostname = (url) => {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

const returnEssentials = (outputArray) => {
    return outputArray.map((story) => {
        let domainName = "unkown"
        try {
            domainName = psl.get(extractHostname(story.url))
        } catch (err) {
            console.log("error using psl while trying to extract the hostname: ", err)
        }
        return {
            title: story.title || "unknown",
            text: story.text || "unknown",
            published: story.published || "unknown",
            author: story.author || "unknown",
            source: domainName || "unknown",
            api: "webhose",
        }
    })
}

const getTopStories = async function(req, res) {
    const client = webhoseio.config({token: webHoseAPIKey});
    const query_params = {
        "q": "language:english num_chars:>100",
    }
        
    return await client.query('filterWebContent', query_params).then(output => {
        console.log('ducky output: ', output)
        //console.log(output['posts'][0]['text']); // Print the text of the first post
        //console.log(output['posts'][0]['published']); // Print the text of the first post publication date
        if(!output || !output.posts || !output.posts) {
            return({code: "404", message: "Could not get output from getTopStories on webhose"})
        }
        return returnEssentials(output.posts)
    })
}

const getTopStoriesByTopic = async function(req, res) {
    const client = webhoseio.config({token: webHoseAPIKey});
    if(!req.params.topic) {
        res.send({code: 400, message: "No topic was supplied in the parameter"})
    }
    const topic = req.params.topic
    console.log('ducky topic: ', topic)
    const query_params = {
        "q": `${topic} language:english num_chars:>100`,
    }
    console.log('ducky query_params: ', query_params)
        
    const output = await client.query('filterWebContent', query_params).then(output => {
        console.log('ducky output: ', output)
        //console.log(output['posts'][0]['text']); // Print the text of the first post
        //console.log(output['posts'][0]['published']); // Print the text of the first post publication date
        if(!output || !output.posts) {
            return({code: "404", message: "Could not get output from getTopStoriesByTopic on webhose"})
        }
        return returnEssentials(output.posts)
    });

    res.send(output)
}

const getTopStoriesByCategory = async function(req, res) {
    const client = webhoseio.config({token: webHoseAPIKey});
    if(!req.params.category) {
        res.send({code: 400, message: "No category was supplied in the parameter"})
    }
    const category = req.params.category
    const query_params = {
        "q": `language:english num_chars:>100 site.category:${category}`,
    }
        
    const output = await client.query('filterWebContent', query_params).then(output => {
        console.log('ducky output: ', output)
        //console.log(output['posts'][0]['text']); // Print the text of the first post
        //console.log(output['posts'][0]['published']); // Print the text of the first post publication date
        if(!output || !output.posts) {
            return({code: "404", message: "Could not get output from getTopStoriesByCategory on webhose"})
        }
        return returnEssentials(output.posts)
    });

    res.send(output)
}

const getWebhoseStories = async () => {
    try {
        //Get Webhose Stories && convert to story schema
        const topStories = await getTopStories();
        
        //Save storySchema via mongoose
        topStories.forEach(story => {
            storySchema.save(story)
        })
    } catch(err) {
        console.log("Error getting Top Stories from WebHose Retriver function 'getTopStories()' OR from saving them to MongoDB")
    }
}

module.exports = { getWebhoseStories }
