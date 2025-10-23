import React, { useState, useEffect }  from "react";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
import {IndexChartData} from "./charts/indexChartData";
import Forcast5Days from "./parts/forcast5Days.jsx";

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

setTimeout(() => {
    let infoHeader = document.querySelector(".info-header");
    let locationCountry = document.querySelectorAll(".location-country");

    window.addEventListener("scroll", () => {
        let scrollValue = window.scrollY;
        
        if(scrollValue * .5 <= 400 ){
            infoHeader.style.transform = "translate(-50%, " + (-400 + scrollValue) + "px)";
        }


        // if(scrollValue > 180){
        //     locationCountry.style.transform = "translateX(" + ((-scrollValue + 180) * .7) + "px)";
        // }
        locationCountry[0].style.transform = "translateX(" + (-scrollValue * .7) + "px)";

        let widthLocationCountry2 = locationCountry[1].offsetWidth;
        locationCountry[1].style.transform = "translateX(" +  (-widthLocationCountry2 * 1.5  + scrollValue) * .7 + "px)";


    })
  }, 50);

function InfoAboutLocation({cityName, cityCountryName, cityKey, cityTimeZone}){
    const [countryBanner, setCountryBanner] = useState("");
    const [cityWeather, setCityWeather] = useState([]);
    const [cityKeyProvided, setCityKeyProvided] = useState(null);
    const [hoursGraph, setHoursGraph] = useState("");

    useEffect(() => {
        let coutryBannerString = "";
        let countryNameLength = String(cityCountryName).length;
        let countryName = String(cityCountryName).replace(/\s+/g, '');;
    
        while (coutryBannerString.length + countryNameLength <= 30) {
            coutryBannerString += countryName;
        }
        setCountryBanner(coutryBannerString.slice(0, 30).trim());

        const url = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${cityKey}?apikey=r8wpfziCwWusGi0oBp6rBFH6SBmUGnsk&details=true&metric=true`;
        fetch(url)
            .then((res) => res.json())
            .then((d) => setCityWeather(d))
            .catch((error) => console.error("Error fetching data:", error));
    
        if(cityKey){
            setCityKeyProvided(cityKey);
        }
    }, [cityCountryName, cityKey]);

    useEffect(() => {
        if (cityTimeZone) {
            const cityTime = new Date().toLocaleTimeString("en-US", {
                hour12: false,
                timeZone: cityTimeZone,
                hour: 'numeric',
                minute: 'numeric',
            });
            const parts = cityTime.split(":");
            setHoursGraph(parts[0]);
        }
    }, [cityTimeZone]);

    let TimeDate = cityWeather.length > 0 ? cityWeather[0].DateTime : null;
    let TempCurrent = Math.round(cityWeather.length > 0 ? cityWeather[0].Temperature.Value : null);
    let WeatherIcon = cityWeather.length > 0 ? cityWeather[0].WeatherIcon : null;
    let RealFeel = Math.round(cityWeather.length > 0 ? cityWeather[0].RealFeelTemperature.Value : null);
    let UVIndex = cityWeather.length > 0 ? cityWeather[0].UVIndex : null;
    let UVIndexText = cityWeather.length > 0 ? cityWeather[0].UVIndexText : null;
    let Humidity = cityWeather.length > 0 ? cityWeather[0].RelativeHumidity : null;
    let WindSpeed = Math.round(cityWeather.length > 0 ? cityWeather[0].Wind.Speed.Value : null);
    let WindSpeedDirection = cityWeather.length > 0 ? cityWeather[0].Wind.Direction.English : null;
    let Visibility = cityWeather.length > 0 ? cityWeather[0].Visibility.Value : null;
    let RainProbability = cityWeather.length > 0 ? cityWeather[0].RainProbability : null;
    
    let dateObj = new Date(TimeDate);
    
    var options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        // second: 'numeric', 
        // timeZoneName: 'short',
        hour12: false,
    };
    let formattedDate = dateObj.toLocaleDateString('en-US', options);
    
    TimeDate = formattedDate;
    
    
    let delayed ;

    const [arrayOfTemps, setArrayOfTemps] = useState([]);
    const [chartTemp, setChartTemp] = useState({
        labels: [],
        datasets: [{
            label: "Temperature",
            data: [],
            fill: true,
            backgroundColor: (context) => {
                const bgColor = [
                    "rgba(202, 78, 89, 0.8)",
                    "rgba(202, 78, 89, 0.4)",
                ];
                if (!context.chart.chartArea) {
                    return;
                }
                const { ctx, data, chartArea: { top, bottom } } = context.chart;
                const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                gradientBg.addColorStop(0, bgColor[0]);
                gradientBg.addColorStop(.5, bgColor[0]);
                gradientBg.addColorStop(1, bgColor[1]);
                return gradientBg;
            },
            borderColor: "rgba(202, 78, 89, .8)",
            pointBackgroundColor: "rgba(202, 78, 89, 1)",
            pointBorderColor: "rgba(17, 21, 38, .5)",
            hitRadius: 30,
            hoverRadius: 12,
            animation: {
                onComplete: () => {
                    delayed = true;
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                        delay = context.dataIndex * 500 + context.datasetIndex * 100;
                    }
                    return delay;
                }
            }
        }]
    });

    let hourTime;

    useEffect(() => {
        if (cityWeather.length > 0) {
            const newArrayOfTemps = cityWeather.map((weather, index) => {
                return {
                    id: index,
                    hour: `${(parseInt(hoursGraph) + index) % 24}h`,
                    temp: weather.Temperature.Value
                };
            });
            setArrayOfTemps(newArrayOfTemps);
        }
    }, [cityWeather]);

    useEffect(() => {
        setChartTemp({
            labels: arrayOfTemps.map((data) => data.hour),
            datasets: [{
                label: "Temperature",
                data: arrayOfTemps.map((data) => data.temp),
                fill: true,
                backgroundColor: (context) => {
                    const bgColor = [
                        "rgba(202, 78, 89, 0.8)",
                        "rgba(202, 78, 89, 0.4)",
                    ];
                    if (!context.chart.chartArea) {
                        return;
                    }
                    const { ctx, data, chartArea: { top, bottom } } = context.chart;
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                    gradientBg.addColorStop(0, bgColor[0]);
                    gradientBg.addColorStop(.5, bgColor[0]);
                    gradientBg.addColorStop(1, bgColor[1]);
                    return gradientBg;
                },
                borderColor: "rgba(202, 78, 89, .8)",
                pointBackgroundColor: "rgba(202, 78, 89, 1)",
                pointBorderColor: "rgba(17, 21, 38, .5)",
                hitRadius: 30,
                hoverRadius: 12,
                animation: {
                    onComplete: () => {
                        delayed = true;
                    },
                    delay: (context) => {
                        let delay = 0;
                        if (context.type === 'data' && context.mode === 'default' && !delayed) {
                            delay = context.dataIndex * 500 + context.datasetIndex * 100;
                        }
                        return delay;
                    }
                }
            }]
        });
    }, [arrayOfTemps]);

    const Temp = arrayOfTemps.map((data) => data.temp);
    // console.log("TEMP",Math.min(...Temp));
    // console.log("TEMP",Math.max(...Temp))

    var options= {
        responsive: true, 
        radius: 5,
        scales: {
            y: {
                ticks: {
                    callback: function(value){
                        return value + "°"
                    }
                },
                suggestedMin: Math.min(...Temp) - 5,
                suggestedMax: Math.max(...Temp) + 2,
            }
        },
        tension: .2
    }



    return(
        <section className="info-location">
            <div className="location-country-container">
                <h1 className="location-country">{countryBanner}</h1>
                <h1 className="location-country location-country-2">{countryBanner}</h1>
            </div>
            <h2 className="info-header">{cityName}</h2>
            <div className="info-location-container">
                <div className="info-location-current">
                    <div className="info-loc-general">
                        <div className="info-loc-time">
                            <p>{TimeDate}</p>
                        </div>
                        <div className="info-loc-time">
                            <h2>{TempCurrent}</h2>
                            <h2 className="celsius-sign">°</h2>
                            <img src={`./src/images/icons/${WeatherIcon}.svg`} alt="" className="hero-weather-icon" />
                        </div>
                    </div>
                    <div className="info-loc-chart">
                        <Chart id="canvas" type='line' data={chartTemp} options={options}/>
                    </div>
                </div>
                <div className="info-loc-details">
                    {/* <div className="info-loc-danger">
                        <img src="./src/images/iconsSpecial/danger.svg" alt="" />
                        <p>Thunderstorms in the area Wednesday morning through late Wednesday night</p>
                    </div> */}
                    <div className="loc-all-details">
                        <div>
                            <img src="./src/images/iconsSpecial/temp.svg" alt="" />
                            <p>Real Feel: </p>
                            <span>{RealFeel}°</span>
                        </div>
                        <div>
                            <img src="./src/images/iconsSpecial/airQuality.svg" alt="" />
                            <p>Rain Probability: </p>
                            <span>{RainProbability}%</span>
                        </div>
                        <div>
                            <img src="./src/images/iconsSpecial/UVindex.svg" alt="" />
                            <p>UV Index: </p>
                            <span>{UVIndex} ({UVIndexText})</span>
                        </div>
                        <div>
                            <img src="./src/images/iconsSpecial/windSpeed.svg" alt="" />
                            <p>Wind Speed: </p>
                            <span>{WindSpeed}km/h, {WindSpeedDirection}</span>
                        </div>
                        <div>
                            <img src="./src/images/iconsSpecial/humidity.svg" alt="" />
                            <p>Humidity: </p>
                            <span>{Humidity}</span>
                        </div>
                        <div>
                            <img src="./src/images/iconsSpecial/visibility.svg" alt="" />
                            <p>Visibility: </p>
                            <span>{Visibility}km</span>
                        </div>
                    </div>
                </div>
                <h2 className="forcast-5-days">5 day forecast</h2>
                {cityKeyProvided ? <Forcast5Days cityKey={cityKeyProvided} /> : <p>Loading....</p>}
                {/* <Forcast5Days cityKeyAdded={cityKey} /> */}
                {/* <div className="location-5-day">
                    <div className="location-1-day">
                        <h3>Today</h3>
                        <div>
                            <img src="./src/images/icons/3.svg" alt="" />
                            <img src="./src/images/icons/33.svg" alt="" />
                        </div>
                        <p>27°/16°</p>
                    </div>
                    <div className="location-1-day">
                        <h3>Saturday</h3>
                        <div>
                            <img src="./src/images/icons/3.svg" alt="" />
                            <img src="./src/images/icons/33.svg" alt="" />
                        </div>
                        <p>30°/18°</p>
                    </div>
                    <div className="location-1-day">
                        <h3>Sunday</h3>
                        <div>
                            <img src="./src/images/icons/3.svg" alt="" />
                            <img src="./src/images/icons/33.svg" alt="" />
                        </div>
                        <p>29°/19°</p>
                    </div>
                    <div className="location-1-day">
                        <h3>Monday</h3>
                        <div>
                            <img src="./src/images/icons/3.svg" alt="" />
                            <img src="./src/images/icons/33.svg" alt="" />
                        </div>
                        <p>32°/19°</p>
                    </div>
                    <div className="location-1-day">
                        <h3>Tuesday</h3>
                        <div>
                            <img src="./src/images/icons/2.svg" alt="" />
                            <img src="./src/images/icons/35.svg" alt="" />
                        </div>
                        <p>30°/19°</p>
                    </div>
                </div> */}
            </div>
        </section>
    )
}

export default InfoAboutLocation;