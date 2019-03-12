const axios = require('axios');


module.exports = {
    getQuote: (req, res) => {
        let url = `https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json&json=?`
        // console.log(url)
        axios.get(url).then(resp => {
            console.log(resp)
            res.status(200).send(resp.data)
        }).catch(err => {
            console.log(err)
        })
    }
}