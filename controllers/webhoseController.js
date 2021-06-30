const webhoseio = require('webhoseio');
require('dotenv').config();
const webHoseAPIKey = process.env.WEBHOSE_API_KEY

exports.topStories = async function(req, res) {
    const client = webhoseio.config({token: webHoseAPIKey});
    const query_params = {
        "q": "bitcoin language:english words:>50",
    }
        
    const output = await client.query('filterWebContent', query_params).then(output => {
        console.log('ducky output: ', output)
        console.log(output['posts'][0]['text']); // Print the text of the first post
        console.log(output['posts'][0]['published']); // Print the text of the first post publication date
        return output
    });

    res.send(output)
}
