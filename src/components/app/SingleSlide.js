import React, { Component } from "react";

class SingleSlide extends Component {

    covertFtoC(temp) {
        let tempInC = (temp - 32) / 1.8;
        return(tempInC.toFixed(0));
    }
    convertUnixToDateTime(time) {
        let date = new Date(time * 1000);
        return String(date);
    }
    convertMphToKmh(speed) {
        let speedInKmh = speed * 1.61;
        return speedInKmh.toFixed(0) + "km/h";
    }
    checkMoonPhase(phase) {
        let moonPhase = '';

        if(phase == 0 && phase == 1) {
            moonPhase = "wi wi-moon-alt-new";
        }
        else if(phase > 0 && phase < 0.25) {
            moonPhase = "wi wi-moon-alt-waxing-crescent-4";
        }
        else if(phase == 0.25) {
            moonPhase = "wi wi-moon-alt-first-quarter\n";
        }
        else if(phase > 0.25 && phase < 0.5) {
            moonPhase = "wi wi-moon-alt-waxing-gibbous-3";
        }
        else if(phase == 0.5) {
            moonPhase = "wi wi-moon-alt-full";
        }
        else if(phase > 0.5 && phase < 0.75) {
            moonPhase = "wi wi-moon-alt-waning-gibbous-4";
        }
        else if(phase == 0.75) {
            moonPhase = "wi wi-moon-alt-last-quarter";
        }
        else if(phase > 0.75 && phase < 1) {
            moonPhase = "wi wi-moon-alt-waning-crescent-5";
        }
        return moonPhase;
    }

    render() {
        return(
            <div className="SingleSlide">
                <div className="Temp">
                    {this.covertFtoC(this.props.weather.temperatureMax)} <p>°C</p>
                </div>
                <div className="TempApparent">
                    feels like {this.covertFtoC(this.props.weather.apparentTemperatureMax)}°
                </div>
                <div className="Summary">
                    {(this.props.weather.summary).toLowerCase()}
                </div>
                <div className="Date">
                    {this.convertUnixToDateTime(this.props.weather.time).slice(0, 10).toLowerCase()}
                </div>
                <div className="SunriseTime">
                    <h3>{this.convertUnixToDateTime(this.props.weather.sunriseTime).slice(15, 21)}</h3>
                    <i className="wi wi-sunrise"></i>
                </div>
                <div className="Humidity">
                    <h3>{String((this.props.weather.humidity * 100).toFixed(0))}</h3>
                    <i className="wi wi-humidity wi-fw-2" ></i>
                </div>
                <div className="WindSpeed">
                    <h3>{this.convertMphToKmh(this.props.weather.windSpeed)}</h3>
                    <i className="wi wi-strong-wind"></i>
                </div>
                <div className="MoonPhase">
                    <h3>{this.props.weather.moonPhase}</h3>
                    <i className={this.checkMoonPhase(this.props.weather.moonPhase)}></i>
                </div>
                <div className="SunsetTime">
                    <h3>{this.convertUnixToDateTime(this.props.weather.sunsetTime).slice(15, 21)}</h3>
                    <i className="wi wi-sunset"></i>
                </div>
            </div>
        )
    }
}

export default SingleSlide