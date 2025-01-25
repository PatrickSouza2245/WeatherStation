import { useState } from 'react';
import '../styles/components/weathercard.sass'
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';
import { toast } from 'react-toastify'


const WeatherCard = () => {
  
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const API_KEY = import.meta.env.VITE_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=pt_br&units=metric`

  const handleSearch = async () => {
    if(city === ''){
      toast.error("Ops, preencha com alguma cidade!", {
        position: "top-right",
        theme: "colored",
        hideProgressBar: true,
        pauseOnHover: false,
        autoClose: 3000,
      }) ;
      return;
            
  }
    try{
    const res = await axios.get(url)
    setWeather(res.data) 
    setCity('')
    setIsVisible(false)

    setTimeout(() => setIsVisible(true), 50)
    
    toast.success("Cidade encontrada com sucesso!", {
      position: "top-right",
      theme: "colored",
      hideProgressBar: true,
      pauseOnHover: false,
      autoClose: 3000,
})
    } catch (error) {
      toast.error("Erro ao procurar a cidade, tente novamente.", {
        position: "top-right",
        theme: "colored",
        hideProgressBar: true,
        pauseOnHover: false,
        autoClose: 3000,
  })
  console.log(error)
  setCity("")
    }
  }

  return (
    <div className="weather-card-container">
        <p>Bem-vindo ao <i>WeatherStation</i>! Digite o nome da cidade que gostaria de ver a previsão. </p>

        <div className='search-container'>
          <input type="text" name="searchCity" id="searchCity" placeholder='Ex: Tokyo, São Paulo, Estocolmo...' value={city} onChange={(e) => setCity(e.target.value)} />
          <button className='btnSearch' onClick={handleSearch}><IoSearchOutline /></button>
        </div>

        { weather && (
        <div className={`result-weather ${isVisible ? 'visible' : ''}`}>
          <p>{weather.name} - {weather.sys.country}</p>
          <p><b>Clima:</b> {weather.weather[0].description}</p>
          <p>{(weather.main.temp).toFixed(0)}°C</p>
          <p><b>Min:</b> {(weather.main.temp_min).toFixed(0)}°C</p>
          <p><b>Max:</b> {(weather.main.temp_max).toFixed(0)}°C</p>
          <div className='resultInfo'>
            <p><b>Sensação Térmica:</b> {(weather.main.feels_like).toFixed(0)}°C</p>
            <p><b>Umidade:</b> {weather.main.humidity}%</p>
            <p><b>Pressão:</b> {weather.main.pressure} hPa</p>
          </div>
        </div>  
        )}

        <footer>&copy; 2025, Desenvolvido por Patrick Souza </footer>
    </div>
  )
}

export default WeatherCard