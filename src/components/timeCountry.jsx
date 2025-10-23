import { useEffect, useState } from "react";
import ImageCountrySlider from "./parts/imageCountrySlider.jsx";
import ImageCountrySliderSmall from "./parts/ImageCountrySliderSmall.jsx";


function TimeCountry(){
    // const url = "http://dataservice.accuweather.com/currentconditions/v1/topcities/50?apikey=r8wpfziCwWusGi0oBp6rBFH6SBmUGnsk";
    // const [citysData, setCitysData] = useState([]);

    // const fetchInfo = () => {
    //     return fetch(url)
    //     .then((res) => res.json())
    //     .then((d) => setCitysData(d))
    // }

    // useEffect(() => {
    //     fetchInfo();
    // }, []);

    // citysData.map((cityData, index) => {
    //     return (
    //         <>
    //             <PopularCityWeather latitude={cityData.GeoPosition.Latitude} longitude={cityData.GeoPosition.Longitude} />
    //         </>
    //     );
    // })

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect (() => {
        const getScreenWidth = () => {
            return window.innerWidth;
        }

        const screenResize = () => {
            const newScreenWidth = getScreenWidth();
            setScreenWidth(newScreenWidth);
        }

        window.addEventListener("resize", screenResize);

        return () => {
            window.removeEventListener("resize", screenResize);
        };
    }, )

    const slides = [
        {src: "../src/images/time/france.png", timezone: "Europe/Paris", country: "France", picture: "Eiffel Tower"},
        {src: "../src/images/time/china.png", timezone: "Asia/Shanghai", country: "China", picture: "Great Wall of China"},
        {src: "../src/images/time/england.png", timezone: "Europe/London", country: "England", picture: "Big Ben"},
        {src: "../src/images/time/japan.png", timezone: "Asia/Tokyo", country: "Japan", picture: "Streets"},
        {src: "../src/images/time/germany.png", timezone: "Europe/Berlin", country: "Germany", picture: "Brandenburg Gate"},
        {src: "../src/images/time/usa.png", timezone: "America/New_York", country: "Usa", picture: "Statue of Liberty"},
        {src: "../src/images/time/italy.png", timezone: "Europe/Rome", country: "Italy", picture: "Colosseum"}
    ]

    return(
        <section className="section-time-popular-countries">
            <h2>Popular Countries Time</h2>
            <div className="time-popular-country-container">
                {/* <ImageCountrySlider slides={slides} /> */}
                {screenWidth>800 ? <ImageCountrySlider slides={slides} /> : <ImageCountrySliderSmall slides={slides} screenWidth={screenWidth} />}
                
            </div>
        </section>
    )
}

export default TimeCountry;