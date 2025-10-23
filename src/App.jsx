import './App.css'
import Nav from "./components/nav.jsx";
import HeroSection from "./components/heroSection.jsx";
import InfoAboutLocation from "./components/infoAboutLocation.jsx";
import PopularCities from "./components/popularCities.jsx";
import TimeCountry from "./components/timeCountry.jsx";
import { useState, useEffect } from 'react';

function App() {
  const [cityValue, setCityValue] = useState("");
  const [cityData, setCityData] = useState([]);
  function inputCity(){
    let inputValue = document.getElementById("city-input").value;
    setCityValue(inputValue);
    
    let container = document.getElementsByClassName("hero-city-popup-container")[0];
    container.classList.add("hero-city-popup-container-anim");
  
}
useEffect(() => {
  const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=r8wpfziCwWusGi0oBp6rBFH6SBmUGnsk&q=${cityValue}`;

  if (cityValue.trim() !== '') {
    fetch(url)
      .then((res) => res.json())
      .then((d) => setCityData(d))
      .catch((error) => console.error("Error fetching data:", error));
  }
}, [cityValue]);

const CityName = cityData.length > 0 ? cityData[0].EnglishName : null;
const CityCountryName = cityData.length > 0 ? cityData[0].Country.EnglishName : null;
const CityKey = cityData.length > 0 ? cityData[0].Key : null;
const CityTimeZone = cityData.length > 0 ? cityData[0].TimeZone.Name : null;
// console.log("Key: " + CityKey + " TimeZone" + CityTimeZone);

  return (
    <div style={{isolation: "isolate", position: "relative"}}>
      <Nav cityValue = {cityValue} />
      <div className="hero-city-popup-container">
        <div className="hero-city-popup">
          <h2>Weather for city:</h2>
          <div style={{display:"flex", gap: "1rem"}}>
            <label className="input">
              <input id="city-input" className="input-field" type="text" placeholder=" " autocomplete="off" />
            </label>
            <button onClick={inputCity}>Confirm</button>
          </div>
        </div>
      </div>
      <HeroSection cityName={CityName} cityCountryName={CityCountryName} cityKey={CityKey} cityTimeZone={CityTimeZone} />
      <InfoAboutLocation cityName={CityName} cityCountryName={CityCountryName} cityKey={CityKey} cityTimeZone={CityTimeZone} />
      <PopularCities />
      <TimeCountry />
    </div>
  )
}

export default App
