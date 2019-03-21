import React, { Component } from 'react';
import axios from 'axios';
import './Quote.css';

class Quote extends Component {
    constructor(){
        super()

        this.state = {
            quote: '',
            author: '',
        }
    }
    
    cleanup = null;


    getQuote = async () => {
        await axios.get('/api/quote').then(res => {
            // console.log(res.data.quoteText)
            if(this._isMounted){
                this.setState({ quote: res.data.quoteText, author: res.data.quoteAuthor })
            }
        })
    }

    componentDidMount(){
        this._isMounted = true;
        this.getQuote();
    }

    componentWillUnmount(){
        this._isMounted = false;
    }



    render(){
        return(
            <div className="quote">
                <div>{this.state.quote}</div><br />
                <p>--{this.state.author}</p>
            </div>
        )
    }
}

export default Quote;