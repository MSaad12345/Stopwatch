import "./app.css";
import Thunder from "../src/assets/Thunder.png";
import { useEffect, useState } from "react";

const App = () => {
  const [city, setCity] = useState(" ");
  const [weatherData, setWeatherData] = useState(null);

  const currentDate = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  const API_Key = "3c0fab70e1517978417b4ee5efe035e3";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`
      );
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
      } else {
        console.error("Error fetching weather:", data.message);
        setWeatherData(null); // Clear weather data if error occurs
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  });

  const handleInputChange = (e) => {
    setCity(e.target.value); // Update the city state dynamically
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    fetchWeatherData(); // Fetch weather data for the entered city
  };

  return (
    <div>
      <div className="container">
        <h1 className="container_date">{formattedDate}</h1>
        <div className="weather_data">
          <h2 className="container_city">{city}</h2>
          <img src={Thunder} alt="Weather icon" className="container_img" width="180px" />
          {weatherData ? (
            <>
              <h2 className="container_degree">
                {weatherData.main.temp.toFixed(1)}°C
              </h2>
              <h2 className="country_per">{weatherData.weather[0].description}</h2>
            </>
          ) : (
            <h2 className="country_per">Enter City Name</h2>
          )}
          <form onSubmit={handleFormSubmit} className="form">
            <input
              type="text"
              className="input"
              placeholder="Enter city"
              onChange={handleInputChange}
            />
            <button type="submit">Get</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
