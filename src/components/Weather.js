// import React, { useState } from 'react';
// import axios from 'axios';

// const Weather = () => {
//   const [city, setCity] = useState('');
//   const [weatherData, setWeatherData] = useState(null);
//   const [error, setError] = useState('');

//   const fetchWeather = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
//       setWeatherData(response.data);
//       setError('');
//     } catch (err) {
//       setError('Could not retrieve weather data');
//     }
//   };

//   const handleInputChange = (e) => {
//     setCity(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchWeather();
//   };

//   return (
//     <div>
//       <h2>Weather App</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={city} onChange={handleInputChange} placeholder="Enter city" />
//         <button type="submit">Get Weather</button>
//       </form>

//       {error && <p>{error}</p>}

//       {weatherData && (
//         <div>
//           <h3>{weatherData.name}</h3>
//           <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)} °C</p>
//           <p>Weather: {weatherData.weather[0].description}</p>
//           <p>Humidity: {weatherData.main.humidity}%</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Weather;



import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading

  const fetchWeather = async () => {
    setLoading(true); // Set loading to true when fetching
    setError(''); // Reset error state
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
      setWeatherData(response.data);
    } catch (err) {
      setError('Could not retrieve weather data');
      console.error(err); // Log error for debugging
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div>
      <h2>Weather App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city"
        />
        <button type="submit" disabled={loading}>Get Weather</button> {/* Disable button while loading */}
      </form>

      {loading && <p>Loading...</p>} {/* Show loading text */}
      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          <h3>{weatherData.name}</h3>
          <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
