import { useState, useEffect } from "react";
import { ArrowBackOutline, ArrowForwardOutline } from 'react-ionicons';

function ImageCountrySlider({slides}){
    const [currentSlide, setCurrentSlide] = useState(0);
    const [formattedTime, setFormattedTime] = useState("");
    const [is24HourFormat, setIs24HourFormat] = useState(false);
    const root = document.documentElement;
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            const rawTime = new Date().toLocaleTimeString("en-US", {
                hour12: !is24HourFormat,
                timeZone: slides[currentSlide].timezone,
            });
            const formattedTime = rawTime.replace(/(\d{1,2}):(\d{1,2}):(\d{1,2})/, (_, hour, minute, second) => {
                return `${hour.padStart(2, '0')}:${minute}:${second}`;
            });
    
            setFormattedTime(formattedTime);
        //   setFormattedTime(new Date().toLocaleTimeString("en-US", {
        //     hour12: !is24HourFormat,
        //     timeZone: slides[currentSlide].timezone,
        //   }));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [currentSlide, slides, is24HourFormat]);


    function handleTimeFormatChange(event) {
        const isChecked = event.target.checked;
        setIs24HourFormat(isChecked);
        
        const newTime = new Date().toLocaleTimeString("en-US", {
            hour12: !isChecked,
            timeZone: slides[currentSlide].timezone,
        });
        // clockElement.setAttribute('data-format', isChecked ? '24h' : '12h');
        // console.log("ischanged:", isChecked, "  newtime.length",newTime.length);
        // console.log("getattribute: ",clockElement.getAttribute('data-format'));

        setFormattedTime(newTime);
    }


    const date = new Date();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDayOfWeek = daysOfWeek[date.getDay()];
    const daysOfWeekPrint = daysOfWeek.push(daysOfWeek.shift());
    // console.log(currentDayOfWeek)
    // console.log(daysOfWeek)

    // const [time, setTime] = useState(new Date());
    
    // const formattedTime = time.toLocaleTimeString("en-US", {
    //     timeZone: slides.timezone,
    // });
    
    const prevSlide = () => {
        document.querySelector(".next-slide").classList.add("next-to-none");
        document.querySelector(".current-slide").classList.add("current-to-next");
        document.querySelector(".prev-slide").classList.add("prev-to-current");
        document.querySelector(".prev-not-shown").classList.add("prevNotShown-to-prev");

        setTimeout(() => {
            setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
            document.querySelector(".next-slide").classList.remove("next-to-none");
            document.querySelector(".current-slide").classList.remove("current-to-next");
            document.querySelector(".prev-slide").classList.remove("prev-to-current");
            document.querySelector(".prev-not-shown").classList.remove("prevNotShown-to-prev");
          }, 1100);
    };

    const nextSlide = () => {
        document.querySelector(".prev-slide").classList.add("prev-to-none");
        document.querySelector(".current-slide").classList.add("current-to-prev");
        document.querySelector(".next-slide").classList.add("next-to-current");
        document.querySelector(".next-not-shown").classList.add("nextNotShown-to-next");

        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            document.querySelector(".prev-slide").classList.remove("prev-to-none");
            document.querySelector(".current-slide").classList.remove("current-to-prev");
            document.querySelector(".next-slide").classList.remove("next-to-current");
            document.querySelector(".next-not-shown").classList.remove("nextNotShown-to-next");
          }, 1100);
    };



    return(
        <div className="carousel">
            <li className="tg-list-item">
                <input className="tgl tgl-skewed" id="cb3" type="checkbox" onChange={handleTimeFormatChange} />
                <label className="tgl-btn" data-tg-off="12h" data-tg-on="24h" for="cb3"></label>
            </li>
            <ArrowBackOutline
                color={'#00000'}
                height="3rem"
                width="3rem"
                onClick={prevSlide}
                className="arrow arrow-left"
            />
            <div className="carosel-slide-showen">
                <img
                    src={slides[(currentSlide - 2 + slides.length) % slides.length].src}
                    alt={slides[(currentSlide - 2 + slides.length) % slides.length].alt}
                    className="carosel-not-shown prev-not-shown"
                />
                <img
                    src={slides[(currentSlide - 1 + slides.length) % slides.length].src}
                    alt={slides[(currentSlide - 1 + slides.length) % slides.length].alt}
                    className="carosel-not-current prev-slide"
                />
                {/* {slides.map((item, idx) => (
                    <img src={item.src} alt={item.alt} key={idx} 
                    className={currentSlide === idx ? "slide current-slide" : "slide slide-hidden"} 
                     />
                ))} */}
                {slides.map((item, idx) => (
                    <div key={idx} className={currentSlide === idx ? "slide current-slide" : "slide slide-hidden"}>
                        <img src={item.src} alt={item.alt} />
                        <div className="country-time-country">
                            <h2>{item.country}</h2>
                            <p>{item.picture}</p>
                        </div>
                        <div className="country-time-clock-container">
                            <div className="days-of-week">
                                {daysOfWeek.map((day, idx) => (
                                    <p key={idx} className={day === currentDayOfWeek ? "today" : "not-today"}>{day}</p>
                                ))}
                            </div>
                            <div className="country-time-clock-container-clock">
                                <h2 className="country-time-clock" data-format="">{formattedTime}</h2>
                            </div>
                        </div>
                    </div>
                ))}
                <img
                    src={slides[(currentSlide + 1) % slides.length].src}
                    alt={slides[(currentSlide + 1) % slides.length].alt}
                    className="carosel-not-current next-slide"
                />
                <img
                    src={slides[(currentSlide + 2) % slides.length].src}
                    alt={slides[(currentSlide + 2) % slides.length].alt}
                    className="carosel-not-shown next-not-shown"
                />

            </div>
            <ArrowForwardOutline
                color={'#00000'}
                height="3rem"
                width="3rem"
                onClick={nextSlide}
                className="arrow arrow-right"
            />
            <span className="indicators">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        className={currentSlide === idx ? "indicator" : "indicator indicator-inactive"}
                        onClick={() => setCurrentSlide(idx)}
                    ></button>
                ))}
            </span>
        </div>
    )
}

export default ImageCountrySlider;