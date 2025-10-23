import { useState, useEffect } from "react";

function Forcast5Days({ cityKey }) {
    const [forcast5Days, setForcast5Days] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}/?apikey=r8wpfziCwWusGi0oBp6rBFH6SBmUGnsk&metric=true`;
                const response = await fetch(url);
                const data = await response.json();
                setForcast5Days(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cityKey]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!forcast5Days.DailyForecasts) {
        return <p>No data available</p>;
    }

    const renderDay = (day, idx) => {
        let a = new Date(day.EpochDate * 1000);
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let dayOfWeek = days[a.getDay()];
        return (
            <div className="location-1-day" key={idx}>
                <h3>{dayOfWeek}</h3>
                <div>
                    <img src={`./../src/images/icons/${day.Day.Icon}.svg`} alt="" />
                    <img src={`./../src/images/icons/${day.Night.Icon}.svg`} alt="" />
                </div>
                <p>{Math.round(day.Temperature.Maximum.Value)}°/{Math.round(day.Temperature.Minimum.Value)}°</p>
            </div>
        );
    };

    return (
        <div className="location-5-day">
            {forcast5Days.DailyForecasts.map((day, idx) => renderDay(day, idx))}
        </div>
    );
}

export default Forcast5Days;
