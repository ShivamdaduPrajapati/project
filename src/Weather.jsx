import React from "react";
import { useState } from "react";
import './Weather.css'
import conf from "./conf/conf";

const api = {
    key: conf.key,
    base: conf.base,
}


const Weather = () => {
    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})
    const search = e => {
        if (e.key === "Enter") {
            console.log(api.base)
            console.log(api.key)
            fetch(`${api.base}q=${query}&units=metric&appid=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('')
                    console.log(result)
                })
        }
    }
    const dateBuilder = (d) => {
        let months = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()]
        let date = d.getDate()
        let month = months[d.getMonth()]
        let year = d.getFullYear()
        return `${day} ${date} ${month} ${year}`
    }
    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
            <main >
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        name="search"
                        id="search"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyPress={search}
                    />
                </div>

                {(typeof weather.main != "undefined") ? (
                    <div>
                        <div className="location-box">
                            <div className="location">
                                {weather.name},{weather.sys.country}
                            </div>
                            <div className="date">
                                {dateBuilder(new Date())}
                            </div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°C
                            </div>
                            <div className="weather">
                                {weather.weather[0].main}
                            </div>
                        </div>

                    </div>
                ) : (' ')}

            </main>
        </div>

    )
}
export default Weather