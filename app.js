function attachEvents() {
  const getWeatherButton = document.getElementById("submit");
  const locationField = document.getElementById("location");
  const forecastDiv = document.getElementById("forecast");
  const currentWeatherDiv = document.querySelector("#current");
  const threeDayWeatherDiv = document.querySelector("#upcoming");
  const degreeSymbol = String.fromCharCode(8457);
  /* console.log(degreeSymbol); */

  locationField.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
      getWeatherButton.click();
    }
  });

  getWeatherButton.addEventListener("click", () => {
    if (currentWeatherDiv.lastElementChild.className === "forecasts") {
      currentWeatherDiv.removeChild(currentWeatherDiv.lastElementChild);
    }
    if (threeDayWeatherDiv.lastElementChild.className === "forecasts") {
      for (let i = 0; i < 3; i++) {
        threeDayWeatherDiv.removeChild(threeDayWeatherDiv.lastElementChild);
      }
    }

    forecastDiv.style.display = "block";
    const weatherInfo = document.createElement("div");
    const weatherInfoThreeDay = document.createElement("div");
    weatherInfo.setAttribute("class", "forecasts");
    weatherInfoThreeDay.setAttribute("class", "forecasts");

    /* threeDayWeatherDiv.innerHTML=""; */

    let conditionSpan = document.createElement("span");
    let conditionSymbolImg = document.createElement("img");
    let locationSpan = document.createElement("span");
    let temperatureSpan = document.createElement("span");
    let conditionTypeSpan = document.createElement("span");

    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "9e3b640dd0msh933047c63870f32p159593jsn32f916cad387");
    myHeaders.append("x-rapidapi-host", "weatherapi-com.p.rapidapi.com");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${locationField.value}&days=3`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        /* console.log(data); */
        conditionSymbolImg.setAttribute("class", "condition symbol");
        conditionSpan.setAttribute("class", "condition");
        locationSpan.setAttribute("class", "forecast-data");
        temperatureSpan.setAttribute("class", "forecast-data");
        conditionTypeSpan.setAttribute("class", "forecast-data");

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
      })
      .catch((error) => console.log("error", error));
  });
}

function createThreeDayForecast(forcastArr, data, mainDiv) {
  const degreeSymbol = String.fromCharCode(8457);

  forcastArr.map((eachDay, index) => {
    const weatherInfoThreeDay = document.createElement("div");
    weatherInfoThreeDay.setAttribute("class", "forecasts");

    let conditionSpan = document.createElement("span");
    let conditionSymbolImg = document.createElement("img");
    let locationSpan = document.createElement("span");
    let temperatureSpan = document.createElement("span");
    let conditionTypeSpan = document.createElement("span");

    conditionSymbolImg.setAttribute("class", "condition symbol");
    conditionSpan.setAttribute("class", "condition");
    locationSpan.setAttribute("class", "forecast-data");
    temperatureSpan.setAttribute("class", "forecast-data");
    conditionTypeSpan.setAttribute("class", "forecast-data");

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

attachEvents();
