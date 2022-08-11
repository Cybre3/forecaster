import { fetchData } from '../utilities/fetch.js';

export async function weatherDisplay() {
  if (currentWeatherDiv.lastElementChild.className === 'forecasts') {
    currentWeatherDiv.removeChild(currentWeatherDiv.lastElementChild);
  }
  if (threeDayWeatherDiv.lastElementChild.className === 'forecasts') {
    for (let i = 0; i < 3; i++) {
      threeDayWeatherDiv.removeChild(threeDayWeatherDiv.lastElementChild);
    }
  }

  forecastDiv.style.display = 'block';
  const weatherInfo = document.createElement('div');
  const weatherInfoThreeDay = document.createElement('div');
  weatherInfo.setAttribute('class', 'forecasts');
  weatherInfoThreeDay.setAttribute('class', 'forecasts');

  /* threeDayWeatherDiv.innerHTML=""; */

  let conditionSpan = document.createElement('span');
  let conditionSymbolImg = document.createElement('img');
  let locationSpan = document.createElement('span');
  let temperatureSpan = document.createElement('span');
  let conditionTypeSpan = document.createElement('span');

  const data = await fetchData(
    `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${locationField.value}&days=3`,
    'Fisher Data',
    requestOptions
  );

  conditionSymbolImg.setAttribute('class', 'condition symbol');
  conditionSpan.setAttribute('class', 'condition');
  locationSpan.setAttribute('class', 'forecast-data');
  temperatureSpan.setAttribute('class', 'forecast-data');
  conditionTypeSpan.setAttribute('class', 'forecast-data');

  locationSpan.textContent = `${data.location.name}, ${data.location.country}`;
  temperatureSpan.textContent = `${data.forecast.forecastday[0].day.mintemp_f}${degreeSymbol} / ${data.forecast.forecastday[0].day.maxtemp_f}${degreeSymbol}`;
  conditionTypeSpan.textContent = data.current.condition.text;

  conditionSymbolImg.src = `https:${data.forecast.forecastday[0].day.condition.icon}`;

  conditionSpan.appendChild(locationSpan);
  conditionSpan.appendChild(temperatureSpan);
  conditionSpan.appendChild(conditionTypeSpan);

  weatherInfo.appendChild(conditionSymbolImg);
  weatherInfo.appendChild(conditionSpan);
  currentWeatherDiv.appendChild(weatherInfo);

  const { forecastday } = data.forecast;
  /* console.log(forecastday); */

  createThreeDayForecast(forecastday, data, threeDayWeatherDiv);
}

function createThreeDayForecast(forcastArr, data, mainDiv) {
  const degreeSymbol = String.fromCharCode(8457);

  forcastArr.map((eachDay) => {
    const weatherInfoThreeDay = document.createElement('div');
    weatherInfoThreeDay.setAttribute('class', 'forecasts');

    let conditionSpan = document.createElement('span');
    let conditionSymbolImg = document.createElement('img');
    let locationSpan = document.createElement('span');
    let temperatureSpan = document.createElement('span');
    let conditionTypeSpan = document.createElement('span');

    conditionSymbolImg.setAttribute('class', 'condition symbol');
    conditionSpan.setAttribute('class', 'condition');
    locationSpan.setAttribute('class', 'forecast-data');
    temperatureSpan.setAttribute('class', 'forecast-data');
    conditionTypeSpan.setAttribute('class', 'forecast-data');

    locationSpan.textContent = `${data.location.name}`;
    temperatureSpan.textContent = `${eachDay.day.mintemp_f}${degreeSymbol} / ${eachDay.day.maxtemp_f}${degreeSymbol}`;
    conditionTypeSpan.textContent = eachDay.day.condition.text;

    conditionSymbolImg.src = `https:${eachDay.day.condition.icon}`;

    conditionSpan.appendChild(locationSpan);
    conditionSpan.appendChild(temperatureSpan);
    conditionSpan.appendChild(conditionTypeSpan);

    weatherInfoThreeDay.appendChild(conditionSymbolImg);
    weatherInfoThreeDay.appendChild(conditionSpan);
    mainDiv.appendChild(weatherInfoThreeDay);
  });
}
