import { useState } from 'react';
import '../styles/components/weathercard.sass'
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';
import { toast } from 'react-toastify'


const WeatherCard = () => {
  
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  
  const API_KEY = import.meta.env.API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

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
    toast.success("Cidade encontrada com sucesso!", {
      position: "top-right",
      theme: "colored",
      hideProgressBar: true,
      pauseOnHover: false,
      autoClose: 3000,
})
    } catch (error) {
      toast.error("Erro ao procurar a cidade, tente novamente." + error, {
        position: "top-right",
        theme: "colored",
        hideProgressBar: true,
        pauseOnHover: false,
        autoClose: 3000,
  })
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

        { weather &&
        <div className='result-weather'>
          <p>{weather.name}</p>
        </div>  
        }
    </div>
  )
}

export default WeatherCard