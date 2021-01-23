import React, { Component } from "react";
import SingleSlide from "./SingleSlide.js"
import * as weather from "./GetWeather";
import * as photo from "./GetPhoto";
import * as location from "./GetLocation.js";

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: '',
            cityName: '',
            isLoaded: false
        };
    }

    componentDidMount() {
        this.setWeather();
    }

    setWeather() {
        if (weather.default.weather === '') {
            setTimeout(() => {
                this.setWeather();
            }, 2000);
        } else {
            this.setState({weather: weather.default.weather}, () => {
                this.setState({cityName: location.default.cityName});
                this.setState({isLoaded: true});
            });
        }
    }

    slideLeft(slide, slideAlt) {
        let animation = document.getElementsByClassName(slide);
        animation[0].style.animation = "slideOutRight 1s forwards";

        if(slide === "WeatherLater") {
            let animationAlt = document.getElementsByClassName(slideAlt);

            animation[0].style.animation = "slideOutRightAlt 1s forwards";
            animationAlt[0].style.animation = "slideInAlt 1s forwards";

            setTimeout(() => {
                animation[0].style.animation = "";
            }, 1100);
        }

        setTimeout(() => {
            animation[0].style.animation = "";
        }, 1100);
    }

    slideRight(slide) {
        let animation = document.getElementsByClassName(slide);

        if(slide === "WeatherNow") {
            animation[0].style.animation = "";

            setTimeout(() => {
                animation[0].style.animation = "";
            }, 1100);
        }
        if(slide === "WeatherTomorrow") {
            animation[0].style.animation = "slideOutAlt 1s forwards";

            setTimeout(() => {
                animation[0].style.animation = "";
            }, 1100);
        }
    }

    render() {
        return (
            <div className="Slider">
                    <div className="WeatherNow" id="weatherNow">
                        <div className="WeatherNowBg">
                        </div>
                            <div className="Weather">
                                <h1>
                                    {this.state.isLoaded &&
                                    <SingleSlide
                                        cityName={this.state.cityName}
                                        weather={this.state.weather[0]}
                                        isLoaded={this.state.isLoaded}
                                    />
                                    }
                                </h1>
                            </div>
                         <a href="#weatherTomorrow">
                            <div className="arrowRight-tomorrow" onClick={() => {this.slideRight("WeatherNow")}}></div>
                        </a>
                    </div>

                    <div className="WeatherTomorrow" id="weatherTomorrow">
                        <div className="WeatherTomorrowBg">
                        </div>
                        <a href="#weatherNow">
                            <div className="arrowLeft-now" onClick={() => {this.slideLeft("WeatherTomorrow")}}></div>
                        </a>
                            <div className="Weather">
                                <h1>
                                    {this.state.isLoaded &&
                                    <SingleSlide
                                        cityName={this.state.cityName}
                                        weather={this.state.weather[1]}
                                        isLoaded={this.state.isLoaded}
                                    />
                                    }
                        </h1>
                    </div>
                        <a href="#weatherLater">
                            <div className="arrowRight-later" onClick={() => {this.slideRight("WeatherTomorrow")}}></div>
                        </a>
                    </div>

                    <div className="WeatherLater" id="weatherLater">
                        <div className="WeatherLaterBg">
                        </div>
                        <a href="#weatherTomorrow">
                            <div className="arrowLeft-tomorrow" onClick={() => {this.slideLeft("WeatherLater", "WeatherTomorrow")}}></div>
                        </a>
                        <h1>
                            {this.state.isLoaded &&
                            <SingleSlide
                                cityName={this.state.cityName}
                                weather={this.state.weather[2]}
                                isLoaded={this.state.isLoaded}

                            />
                            }
                        </h1>
                    </div>
            </div>
        );
    }
}

export default Carousel;