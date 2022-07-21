const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');


const PORT = 8000
const app = express()

const url = 'https://en.wikipedia.org/wiki/' +'French_language'

// generates a random number correlating to p attribute # in overview (between 3-5)
const randNum = Math.floor(Math.random() * (5 - 3 + 1) + 3)

// scrapes random paragraph from wikipedia article  
const getRandomPara = async (url, randNum) => {
    try{
        const res = await axios.get(url)
        const html =  await res.data
        const $ = cheerio.load(html)
        const $para = $(`.mw-parser-output > p:nth-of-type(${randNum})`);
        $para.find('sup').remove()
        const randPara = $para.text().trim()
        return randPara
    } catch (error) {
        console.log(error)
    }
   
}

// https://stackoverflow.com/questions/18914629/split-string-into-sentences-in-javascript
    
    
const randSentence = getRandomPara(url, randNum).then((paragraph) => {
    const sentences = paragraph.replace(/([.?!])\x20{1,2}(?=[A-Z\d])/g, "$1|").split("|");
    const len = sentences.length;
    const randNum = Math.floor(Math.random() * len);
    return sentences[randNum]
});

// this returns a pending promise fix ;-; 

randSentence.then((result) => {console.log(result)} )

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));