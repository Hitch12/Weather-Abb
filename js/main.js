//default search by city
window.addEventListener('load',function(){
    getWeather('cairo')
})


let searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup',function(){
    getWeather(searchInput.value)
})


//getting API
let finalApi;
async function getWeather(city){
    let apiResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=99ba1fa7929347cb828170606221110&q=${city}&days=3&aqi=yes&alerts=no`)
    finalApi= await apiResponse.json()
    displayDays()
}


let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
function ruleDays(x){
    if(x>6) x=0
    return x;
}

function displayDays(){
    let thisDay = new Date();
    document.getElementById('todayName').innerHTML = `<p>${days[thisDay.getDay()]}</p>`;
    document.getElementById('todayNumber').innerHTML = `<p>${thisDay.getDate()}${months[thisDay.getMonth()]}</p>`;
    document.getElementById('cityName').innerText = finalApi.location.name;
    document.getElementById('weatherNumber').innerHTML = `${finalApi.current.temp_c}<sup>o</sup>C`
    document.getElementById('imgWeather').setAttribute('src',finalApi.current.condition.icon);
    document.getElementById('conditionText').innerText = finalApi.current.condition.text;

    document.getElementById('nextDayName').innerHTML = `<p>${days[ruleDays(1+thisDay.getDay())]}</p>`;
    document.getElementById('weatherNextImg').setAttribute('src',finalApi.forecast.forecastday[1].day.condition.icon)
    document.getElementById('maxtemp_c').innerHTML = `${finalApi.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`
    document.getElementById('mintemp_c').innerHTML = `${finalApi.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C`
    document.getElementById('conditionTextNextDay').innerText = finalApi.forecast.forecastday[1].day.condition.text;

    document.getElementById('endDayName').innerHTML = `<p>${days[ruleDays(2+thisDay.getDay())]}</p>`;
    document.getElementById('weatherEndImg').setAttribute('src',finalApi.forecast.forecastday[2].day.condition.icon)
    document.getElementById('maxtemp_c2').innerHTML = `${finalApi.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`
    document.getElementById('mintemp_c2').innerHTML = `${finalApi.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C`
    document.getElementById('conditionEndNextDay').innerText = finalApi.forecast.forecastday[2].day.condition.text;
}
