require('dotenv').config()
const axios = require('axios');
const {WEATHER_API_KEY} = process.env;

// request(url, function (err, response, body) {
//   if(err){
//     console.log('error:', error);
//   } else {
//     let weather = JSON.parse(body)
//     let message = `${weather.main.temp} ${weather.weather.icon}`;
//     console.log(message);
//   }
// });

module.exports = {
    getWeather: (req, res) => {
        let {city} = req.body;
        let apiKey = WEATHER_API_KEY;
        console.log(apiKey)
        city = city || 'Salt%20Lake%20City';
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
        console.log(url)
        axios.get(url).then(resp => {
            console.log(resp)
            res.status(200).send(resp.data)
        }).catch(err => {
            console.log(err)
        })
    }
}