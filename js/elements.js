// Weather App Elements
const getWeatherButton = document.getElementById('submit');
const locationField = document.getElementById('location');
const forecastDiv = document.getElementById('forecast');
const currentWeatherDiv = document.querySelector('#current');
const threeDayWeatherDiv = document.querySelector('#upcoming');
const degreeSymbol = String.fromCharCode(8457);
/* console.log(degreeSymbol); */


// Modal elements
const modalContainer = document.querySelector(".modal-body");
const continueButton = document.querySelector(".modal-continue-btn");
const modalLoadBtn = document.querySelector(".modal-load-btn");
const modalPopoverBtn = document.querySelector(".modal-popover-btn");
const challengeContainer = document.querySelector(".challenge-container");
const modalDescript = document.querySelector(".modal-descript");