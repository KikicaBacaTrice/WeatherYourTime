{/* https://c.tadst.com/gfx/n/fl/32/us.png ikone države */}
import { useEffect, useState } from "react";
import PopularCityWeather from "./parts/popularCityWeather.jsx";

    function PopularCities(){
        const url = "http://dataservice.accuweather.com/currentconditions/v1/topcities/50?apikey=r8wpfziCwWusGi0oBp6rBFH6SBmUGnsk";
        const [citysData, setCitysData] = useState([]);
        const [visible, setVisible] = useState(4);

        const showMoreVisible = () => {
            setVisible((prevValue) => prevValue + 8);
            if((visible + 8) >= citysData.length){
                document.querySelectorAll(".load-more-btn")[0].style.display = "none";
            }
        }

        const fetchInfo = () => {
            return fetch(url)
            .then((res) => res.json())
            .then((d) => setCitysData(d))
        }

        useEffect(() => {
            fetchInfo();
        }, []);

        return(
        <section className="section-popular-cities">
            <h2>Top 50 Popular Cities</h2>
            <div className="popular-cities-container">
                {citysData.slice(0, visible).map((cityData, idx) => {
                    return (
                        <>
                            <PopularCityWeather key={idx} countryFlag={cityData.Country.ID.toLowerCase()} city={cityData.EnglishName} weatherIcon={cityData.WeatherIcon} temp={cityData.Temperature.Metric.Value} latitude={cityData.GeoPosition.Latitude} longitude={cityData.GeoPosition.Longitude} />
                        </>
                    );
                })}
            </div>
            <button className="load-more-btn" onClick={(showMoreVisible)}>Load more</button>
        </section>
    )
}

export default PopularCities;