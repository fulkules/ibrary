import React, { Component } from 'react';
import axios from 'axios';

class Weather extends Component {
    constructor(){
        super()

        this.state = {
            temperature: [],
            icon: ``
        }
    }
        
    getWeather = async () => {
        await axios.get('/api/weather').then(res => {
            console.log(res.data)
            let temp = Math.floor(res.data.main.temp)
            let icon = res.data.weather[0].icon
            this.setState({ temperature: temp, icon: icon })
        })
    }

    componentDidMount(){
        this.getWeather();
    }

    render() {
        return (
            <div>
                <h2>{this.state.temperature}&deg;F</h2>  
                <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`} alt="weather" />
            </div>
        );
    }
};

export default Weather;