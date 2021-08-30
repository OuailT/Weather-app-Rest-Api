import axios from 'axios';
import React, {useState} from 'react'

const WeatherListing = () => {
    const Api_Key = "429736441cf3572838aa10530929f7cd";
    //States
    const [countryName,setCountryName] = useState("");
    const [temp, setTemp] = useState(null);
    const [maxTemp, setMaxTemp] = useState(null)
    const [minTemp, setMinTemp] = useState(null)
    const [WeatherDesc, setWeatherDesc] = useState("");
    const [name, setName] = useState("");
    console.log(name);
    console.log(WeatherDesc)

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
                <h2>{WeatherDesc}</h2>
                <h4>{maxTemp}°C<span>/</span>{minTemp}°C</h4>
            </article>
        </section>
        
    )
}

export default WeatherListing
