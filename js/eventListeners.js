import { weatherDisplay } from './app.js';
import { hideModal, toggleList } from './modal.js'

// Weather App event listeners
locationField.addEventListener('keypress', function (e) {
  if (e.key == 'Enter') {
    getWeatherButton.click();
  }
});
getWeatherButton.addEventListener('click', weatherDisplay);

// Modal Event listeners
continueButton.addEventListener("click", hideModal);
modalPopoverBtn.addEventListener("click", toggleList);