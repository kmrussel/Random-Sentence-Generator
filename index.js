const langModule = require('./languages.js')
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const PORT = 8000
const app = express()

let language = langModule.randomLanguage();
const url = 'https://en.wikipedia.org/wiki/' + language

// scrapes overview from wikipedia article 
const getOverview = async (url) => {
    try{
        const res = await axios.get(url)
        const html =  await res.data
        const $ = cheerio.load(html)
       
        // gets first instance of p 
        let i = 1 
        while ($(`.mw-parser-output > p:nth-of-type(${i})`).text().trim() === "") {
            i++ 
        }
        
        // scrapes until no longer p 
        let $para =  $(`.mw-parser-output > p:nth-of-type(${i})`).prev()
        $para = $para.nextUntil(":not(p)")
      
        // removes references and formats into text 
        $para.find('sup').remove()
        const randPara = $para.text().trim()
        return(randPara)
    
    } catch (error) {
        console.log(error)
    }
   
}

// https://stackoverflow.com/questions/18914629/split-string-into-sentences-in-javascript
// credit!

    
const randSentence = getOverview(url).then((overview) => {
    // separates sentences in overview and inserts into an array
    const sentences = overview.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
    
    // picks a random sentences from the array
    const len = sentences.length;
    const randNum = Math.floor(Math.random() * len);
    return sentences[randNum]
}).catch((error) => {
    console.log(error)
    return ('Please try again')
});


randSentence.then((result) => {
    language = language.replace(/_/g, ' ')
    console.log(language + ': ' + result)
    // send as an object { language: result }
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));