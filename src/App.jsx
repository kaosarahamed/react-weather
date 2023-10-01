import './App.css'
import { TiWeatherPartlySunny, TiAdjustBrightness } from "react-icons/ti";
import { FaWalking } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const API_KEY = "006d2cc5c6254e248dc98c5f4d5707ed";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=Metric&appid=${API_KEY}`;

  const handlleSubmit = async (e) => {
    e.preventDefault();
    await axios.get(URL, input).then((res) => {
      setData(res.data)
    }).catch((err) => {
      setError(err.response.data.message);
    })
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  };



  return (
    <div className='section'>
      <div className='container'>
        <div className='weatherApp'>
          <div className='appBody'>
            <div className="form">
              <form onSubmit={handlleSubmit}>
                <input type="text" onChange={handleChange} name="search" id="search" placeholder='Enter location'/>
                <button type="submit">Search</button>
              </form>
            </div> 
            <div className="body">
              <TiWeatherPartlySunny />
              <h2>Temperature</h2>
              <h1>{data ? data.main.temp : "0"}°C</h1>
              <h2>{data ? data.name : error}</h2>
            </div>
            <div className="footer">
              <div className="wrapContainer">
                <TiAdjustBrightness />
                <span>
                  <h2>{data ? data.main.humidity : "0"}%</h2>
                  <h3>Humidity</h3>
                </span>
              </div>
              <div className="wrapContainer">
                <FaWalking />
                <span>
                  <h2>{data ? data.wind.speed : "0"}km/h</h2>
                  <h3>Wind Speed</h3>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
