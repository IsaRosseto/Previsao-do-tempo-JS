
// variaveis
const apiKey = "80407ac7ab8c2df954e1d9f9edef2b98";
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");


const toggleLoader = () => {
    loader.classList.toggle("hide");
  };

// Funções 
const getWeatherData = async(city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

        const res = await fetch(apiWeatherURL);
        const data= await res.json();

      return data;

};




const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name ; 
    tempElement.innerText = parseInt(data.main.temp); 
    descElement.innerText = data.weather[0].description; 
    weatherIconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
      countryElement.setAttribute("src", apiCountryURL + data.sys.country);
      humidityElement.innerText = `${data.main.humidity}%`;
      windElement.innerText = `${data.wind.speed}km/h`;

      weatherContainer.classList.remove("hide");

        // Change bg image
  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;
      

};


// Eventos
searchBtn.addEventListener("click",(e) => {
    e.preventDefault();
  
    const city = cityInput.value;
  
    showWeatherData(city);
});

cityInput.addEventListener("keyup" , (e) => {

    if(e.code === "Enter") {
        const city = e.target.value

        showWeatherData(city);
    }
});


