const index = require('./index.js')


// Citation for the following code for variable 'sentences': 
// Date: 07.22.2022
// Copied from: 
// https://stackoverflow.com/questions/18914629/split-string-into-sentences-in-javascript
function randSentence(url, language) { const response = index.getOverview(url).then((overview) => {

    // separates sentences in overview and inserts into an array
    const sentences = overview.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
    language = language.replace(/_/g, ' ')
    
    // picks a random sentences from the array
    const len = sentences.length;
    const randNum = Math.floor(Math.random() * len);

    let result = {}
    result[`${language}`] = sentences[randNum]
    return {result}

    }).catch((error) => {
        console.log(error)
        return ('Please try again') 
    });

return response
};

module.exports = { randSentence }