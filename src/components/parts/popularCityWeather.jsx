import { useEffect, useState } from "react";

function PopularCityWeather(props){
    let countryFlag = "https://c.tadst.com/gfx/n/fl/32/" + props.countryFlag + ".png";
    let weatherIcon = "./src/images/icons/" + props.weatherIcon + ".svg";

    let latitude = props.latitude;
    let longitude = props.longitude;
    let idx= props.idx;

    const url = `https://api.ipgeolocation.io/timezone?apiKey=6b91ecec22d3446d9456a4b97d9a188d&lat=${latitude}&long=${longitude}`;
    const [cityTime, setCityTime] = useState("");

    const fetchInfo = () => {
        return fetch(url)
        .then((res) => res.json())
        .then((d) => {
            const dateTimeParts = d.date_time_txt.split("+")[0];

            const dateObj = new Date(dateTimeParts);

            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const dayOfWeek = daysOfWeek[dateObj.getDay()];

            const day = dateObj.getDate();
            const year = dateObj.getFullYear();
            const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const print = `${dayOfWeek}, ${day}, ${year} ${time}`

            setCityTime(print)  
        })
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div className="popular-city" key={idx}>
            <div>
                <img src={countryFlag} alt=""/>
                <h3>{props.city}</h3>
            </div>
            <img src={weatherIcon} alt="" />
            <p>{props.temp}°C</p>
            <p>{cityTime}</p>
            <button className="popular-city-btn">Learn More</button>
        </div>
    )
}

export default PopularCityWeather;