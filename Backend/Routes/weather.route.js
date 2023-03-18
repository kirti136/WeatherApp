const { Router } = require("express")
const fs = require('fs')
var requests = require('requests');

const weatherRouter = Router()


weatherRouter.get('/', (req, res) => {
    const indexFile = fs.readFileSync("../Frontend/index.html", "utf-8")

    const replaceVal = (tempVal, orgVal) => {
        let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp)
        temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min)
        temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max)
        temperature = temperature.replace("{%location%}", orgVal.name)
        temperature = temperature.replace("{%country%}", orgVal.sys.country)
        temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main)

        return temperature
    }
    requests('https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=e88dd4fc76352a930a164e91516e3e95')
        .on('data', (chunk) => {
            const objdata = JSON.parse(chunk);
            const arrData = [objdata]

            const realTimeData = arrData.map(val => replaceVal(indexFile, val)).join("")
            res.write(realTimeData)
        })
        .on('end', (err) => {
            if (err) return console.log('connection closed due to errors', err);
            res.end();
        });
})


module.exports = {
    weatherRouter
}