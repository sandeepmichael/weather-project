const express = require('express')
const https = require('https')          //api request
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})
app.post('/', (req, res) => {
    const query = req.body.cityName
    const apiKey = "6595930179fede1a1492c1a33602ed40"
    const unit = "imperial"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apiKey+ "&units=" +unit+""
    https.get(url, resp => {
        console.log(resp.statusCode)
        resp.on('data', (data) => {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const weatherHumidity = weatherData.main.humidity;
            res.write("<h1>The Temparature in " +query+ " is " + temp + " degree celsius</h1>")
            res.write("<p>The weather is currently " +  weatherDescription + "<p>")
            res.write("<h1>the Humidity in " +query+ " is "  + weatherHumidity + "</h1>")
            res.send()
        })
    })
})





app.listen(5000, () => {
    console.log("server is running on port 5000")
})