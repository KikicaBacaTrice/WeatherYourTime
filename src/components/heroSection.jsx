import { useEffect, useState } from "react";

function HeroSection({cityName, cityCountryName, cityKey, cityTimeZone}) {
  // const date = new Date();
  // const hours = date.getHours();
  // const minutes = String(date.getMinutes()).padStart(2, "0");
  const [sky, setSky] = useState("./src/images/hero/day/bg-sky.png");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [cityWeather, setCityWeather] = useState([]);
  const [dayNight, setDayNight] = useState("");

  useEffect(() => {
    if (cityName !== null && cityKey !== null && cityTimeZone !== null) {
      setTimeout(()=>{
        let bgMount = document.querySelector(".para-bg-mount");
        let mount1 = document.querySelector(".para-mount1");
        let mount2 = document.querySelector(".para-mount2");
        let mount3 = document.querySelector(".para-mount3");
        let heroPlanet = document.querySelector(".hero-planet");
        let info = document.querySelector(".hero-info-container");
        let fog1 = document.querySelector(".para-fog1");
        let fog2 = document.querySelector(".para-fog2");

        if (bgMount && mount1 && mount2 && mount3 && heroPlanet && info && fog1 && fog2) {
              
        function introAnimation(image, timeout, check){
          const timeoutId = setTimeout(() => {
            if(check == 1){
              image.style.opacity=.6;
              image.classList.add("hero-image-animation");
              image.classList.add("para-fog2-anim");
            } 
            else if(check == 2) {
              image.classList.add("hero-image-animation-info");
            } else image.classList.add("hero-image-animation");
          }, timeout);
          return () => clearTimeout(timeoutId);
        }
        function introAnimationPlanet(image){
          const timeoutId = setTimeout(() => {
            image.classList.add("hero-image-animation-planet");
          }, 2000);
          return () => clearTimeout(timeoutId);
        }
        
        introAnimation(mount3, 500, 0);
        introAnimation(mount2, 700, 0);
        introAnimation(mount1, 900, 0);
        introAnimation(bgMount, 1100, 0);
        introAnimation(fog2, 1500, 1);
        introAnimation(fog1, 1800, 0);
        introAnimation(info, 2000, 2);
        introAnimationPlanet(heroPlanet);
    
    
        window.addEventListener("scroll", () => {
            let value = window.scrollY;
            bgMount.style.top = value * (-.05) + "px";
            mount1.style.top = value * (-.15) + "px";
            mount2.style.top = value * (-0.3) + "px";
            mount3.style.top = value * (-0.3) + "px";
            heroPlanet.style.marginTop = value * 0.5 + "px";
            info.style.marginTop = value * 0.18 + "px";
        })
        } else {
          console.error("Neki od elemenata nisu pronađeni u DOM-u.");
        }
      }, 50)
    
      const cityTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        timeZone: cityTimeZone,
        hour: 'numeric',
        minute: 'numeric',
      });
      const parts = cityTime.split(":");
      setHours(parts[0])
      setMinutes(parts[1])
      
      const url = `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=r8wpfziCwWusGi0oBp6rBFH6SBmUGnsk`;
      fetch(url)
        .then((res) => res.json())
        .then((d) => setCityWeather(d))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [cityKey]);

  const CityTemp = Math.round(cityWeather.length > 0 ? cityWeather[0].Temperature.Metric.Value : null);
  const CityWeatherIcon = cityWeather.length > 0 ? cityWeather[0].WeatherIcon : null;
  const isDayTime = cityWeather.length > 0 ? cityWeather[0].IsDayTime : null;

  useEffect(() => {
    if (isDayTime !== null) {
      if (isDayTime) {
        setDayNight("day");
      } else {
        setDayNight("night");
      }
      const timeoutId = setTimeout(() => {
        if (isDayTime) {
          setSky("./src/images/hero/day/bg-sky2.png");
        } else {
          setSky("./src/images/hero/night/bg-sky.png");
        }
      }, 1500);
  
      return () => clearTimeout(timeoutId); // Čišćenje timeout-a
    }
  }, [isDayTime]);

  // useEffect(() => {
  //   if (cityKey !== null) {
  //     const timeoutId = setTimeout(() => {
  //       if(isDayTime){
  //         setSky(`./src/images/hero/day/bg-sky2.png`);
  //       }
  //     }, 2000);
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [cityKey]);

  return (
    <section className="hero-container">
      <img src={sky} alt="" className="hero-image para-bg-sky" />
      <img src={`./src/images/hero/${dayNight}/planet.png`} alt="" className="hero-planet" />
      <img src={`./src/images/hero/${dayNight}/bg-mount.png`} alt="" className="hero-image para-bg-mount" />
      <img src={`./src/images/hero/${dayNight}/fog.png`} alt="" className="hero-image para-fog1" />
      <img src={`./src/images/hero/${dayNight}/mount1.png`} alt="" className="hero-image para-mount1" />
      <img src={`./src/images/hero/${dayNight}/fog.png`} alt="" className="hero-image para-fog2" />
      <img src={`./src/images/hero/${dayNight}/mount2.png`} alt="" className="hero-image para-mount2" />
      <img src={`./src/images/hero/${dayNight}/mount3.png`} alt="" className="hero-image para-mount3" />
      <div className="hero-info-container">
          <div className="hero-info-flex">
              <div className="hero-info-detail">
                  <div>
                      <h2 className="hero-city">{cityName}</h2>
                      <p>{cityCountryName}</p>
                  </div>
                  <img src={`./src/images/icons/${CityWeatherIcon}.svg`} alt="" className="hero-weather-icon" />
              </div>
              <div className="hero-info-detail">
                  <div className="hero-info-time">
                      <h2>{hours}</h2>
                      <h3>{minutes}</h3>
                  </div>
                  <div className="hero-info-time">
                      <h2>{CityTemp}</h2>
                      <h2 className="celsius-sign">°</h2>
                  </div>
              </div>
          </div>
      </div>
    </section>
  );
}

export default HeroSection;