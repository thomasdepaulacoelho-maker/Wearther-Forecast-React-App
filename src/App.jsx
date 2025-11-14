import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Clima from './assets/clima'

function App() {
  const [cityName, setCityName] = useState("")
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function searchWeather() {
    if(!cityName.trim()){
      setError("Cidade Inválida!")
      setWeather(null)
      return
    }

    setLoading(true)
    setError(null)
    setWeather(null)
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6fa075125c2a4a329ff707c1f429ddf0&units=metric&lang=pt`
      );

      if (!response.ok){
        if(response.status === 404){
          setError("404 - NOT FOUND")
        } else {
          setError("ocorreu um erro. Tente novamente mais tarde")
        }
      }

      const data = await response.json()
      setWeather({
        name: data.name, 
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      }) }
    catch (error) {
      setError(error.message)
    } finally {
      console.log(weather)
      setLoading(false)
    }
  }

  return (
    <div  className='bg-blue-400 min-h-screen
    flex flex-col items-center p-6
    '>
      <div>
        <h1 className='text-3xl font-black
        text-yellow-400 mb-3'
        
        >☀️ PREVISÃO DO TEMPO 🌧️</h1>
      </div>
      <div className='bg-blue-200 shadow-lg
      rounded-xl p-5'>
        <input
        className='p-2 border
        border-blue-400 rounded-xl
        focus:outline-none 
        focus: ring-2 
        focus:ring-blue-600' 
        placeholder='informe uma cidade'
        onChange={(event)=> setCityName(event.target.value)}
        ></input>
        <button
        className='bg-blue-600 ms-5 rounded-xl
        p-2 text-blue-100 font-bold
        hover:bg-yellow-600
        transition duration-300
        '
        onClick={searchWeather}>
        Pesquisar</button>
      </div>

      {
        weather &&
              <Clima  weather={weather}
      />
      }
        {error && <p className='text-red-700 p-2 font-black'>{error}</p>}
        {loading && <p className='text-blue-700 p-2 font-black'>Carregando...</p>}
    </div>

  )
}

export default App
