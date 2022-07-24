const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const PORT = 8000
const app = express()

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

module.exports = {getOverview}
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));