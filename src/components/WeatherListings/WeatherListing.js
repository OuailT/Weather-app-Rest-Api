import axios from 'axios';
import React, {useState} from 'react'
import InitialData from '../InitialData';
import "weather-icons/css/weather-icons.css";


const WeatherListing = () => {
    const Api_Key = "429736441cf3572838aa10530929f7cd";

    const icons = {
        Thunderstorm: "wi-thunderstorm",
        Drizzle: "wi-sleet",
        Rain: "wi-storm-showers",
        Snow: "wi-snow", 
        Atmosphere: "wi-fog",
        Clear: "wi-day-sunny",
        Clouds: "wi-day-fog"
    }

    //States
    const [countryName,setCountryName] = useState(InitialData.name);
    const [temp, setTemp] = useState(InitialData.temp);
    const [maxTemp, setMaxTemp] = useState(InitialData.temp_max);
    const [minTemp, setMinTemp] = useState(InitialData.temp_min);
    const [WeatherDesc, setWeatherDesc] = useState(InitialData.description);
    const [name, setName] = useState("");
    const [weatherIcons, setWeatherIcons] = useState(icons);
    console.log(weatherIcons)


   
    
    

    //Display the icons based on the value
    const displayIcons = (icons, rangeId) => {
        switch(true) {
            case rangeId >=200 && rangeId < 232 :
                setWeatherIcons(icons.weatherIcons);
                break;
            case rangeId >= 300 && rangeId <= 321: 
                setWeatherIcons(icons.Drizzle);
                break;
            case rangeId >= 500 && rangeId <= 521:
                setWeatherIcons(icons.Rain);
                break;
            case rangeId >= 600 && rangeId <= 622:
                setWeatherIcons(icons.Snow);
                break;
            case rangeId >= 701 && rangeId <= 781:
                setWeatherIcons(icons.Atmosphere);
                break;
            case rangeId === 800:
                setWeatherIcons(icons.Clear);
                break;
            case rangeId >= 801 && rangeId <= 804:
                setWeatherIcons(icons.Clouds);
                break;
            default : 
                setWeatherIcons(icons.Clouds)
        }
    }
    

    //submit function to get the data by country
    const submitCountry = (e) => {
        e.preventDefault();
        if(name) {
            try {
                const fetchData = async () => {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${Api_Key}`)
                const result = await response.data;
                      setCountryName(result.name);
                      setTemp(convertToCeil(result.main.temp))
                      setMaxTemp(convertToCeil(result.main.temp_max))
                      setMinTemp(convertToCeil(result.main.temp_min))
                      setWeatherDesc(result.weather[0].description)  
                      console.log(result.weather[0].id)

                      displayIcons(weatherIcons, result.weather[0].id)
              }
              fetchData();
              

            } catch(error) {
                console.log(`Error : ${error}`)
            }

        }
        setName("")
        
    }

    //To convert number to ceil
    const convertToCeil = (temp) =>  {
        let cell = Math.floor(temp - 273.15);
        return cell
    }

    return (
        <section className="container">
            {/* {Object.values(weatherIcons).map((icon)=> console.log(icon))} */}
            <form className="form-control" >
                <input type="text" 
                       placeholder="Search by country"
                       value={name}
                       onChange={(e)=> setName(e.target.value)}
                       />
                <button type="submit" onClick={submitCountry}>Search</button>
            </form>

            <article>
                <h1>{countryName}</h1>
                <h3>{temp}°C</h3>
                <i className={`wi ${weatherIcons}`}></i>
                <h2>{WeatherDesc}</h2>
                <h4>{maxTemp}°C<span>/</span>{minTemp}°C</h4>
            </article>
        </section>
        
    )
}

export default WeatherListing
