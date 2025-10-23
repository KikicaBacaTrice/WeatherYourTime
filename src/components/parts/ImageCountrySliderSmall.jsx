import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';


function ImageCountrySliderSmall({slides}){
    // const [currentSlide, setCurrentSlide] = useState(0);

    const date = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayOfWeek = daysOfWeek[date.getDay()];

    const [is24Hour, set24Hour] = useState(false);
    
    function setTime(timezone) {
        const options = {
            hour12: is24Hour,
            timeZone: timezone,
            hour: 'numeric',
            minute: 'numeric',
            // second: 'numeric'
        };
    
        const formattedTime = new Date().toLocaleTimeString('en-US', options);
        return formattedTime;
    }

    
    function handleTimeFormatChange(event) {
        const isChecked = event.target.checked;
        set24Hour(isChecked);
    }
    return (
        <div className="country-small-container">
            <div className="country-small-time-btn">
                <li className="tg-list-item-small">
                    <input className="tgl tgl-skewed" id="cb3" type="checkbox" onChange={handleTimeFormatChange} />
                    <label className="tgl-btn" data-tg-off="24h" data-tg-on="12h" for="cb3"></label>
                </li>
            </div>
            <Swiper slidesPerView={2}
                spaceBetween={30}
                centeredSlides={true}
                // pagination={{
                //   clickable: true,
                // }}
                // modules={[Pagination]}
                className="country-slides-small-container mySwiper">
                    {
                        slides.map((item, idx) => (
                            <SwiperSlide className="country-slides-small-item" key={idx}>
                                <img src={item.src} alt="" />
                                <div className="country-slide-small-country">
                                    <h2>{item.country}</h2>
                                    <p>{item.picture}</p>
                                </div>
                                <div className="country-time-clock-container">
                                    <div className="days-of-week">
                                        <p>{currentDayOfWeek}</p>
                                    </div>
                                    <div className="country-time-clock-container-clock">
                                        <h2 className="country-time-clock" data-format="">{setTime(item.timezone)}</h2>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
            </Swiper>
        </div>
    )
}
export default ImageCountrySliderSmall;