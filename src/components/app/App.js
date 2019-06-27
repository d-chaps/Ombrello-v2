import React, { Component } from 'react';
import '../../style/App.css';
import * as location from './GetLocation.js';
import './Carousel.js';
import Carousel from "./Carousel";
require('dotenv').config({path: __dirname + '/.env'});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cityName: ''
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({cityName: location.default.cityName});
        }, 1500);
    }

    render() {
        if(this.state.cityName === '') {
            return <div>Loading...</div>
        }
        return (
            <div className="App">
                <Carousel
                    cityName={this.state.cityName}/>
            </div>
        );
    }
}

export default App;
