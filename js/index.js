let search = document.getElementById('search');
let btn = document.querySelector('.btnn');
let currentLocation = document.querySelector('.location');
let currentDegree = document.querySelector('.degreeNumber');
let currentImage = document.getElementById('currentImage');
let currentweatherStatus = document.querySelector('.weatherStatus');
let tomorrowIcon = document.getElementById('image2');
let tomorrowMaxDegree = document.querySelector('.maxDegree .num');
let tomorrowMinDegree = document.querySelector('.minDegree .num');
let tomorrowWeatherStatus = document.querySelector('.tomorrowWeatherStatus');
let afterTomorrowIcon = document.getElementById('image3');
let afterTomorrowMaxDegree = document.querySelector('.item3-content .maxDegree .num');
let afterTomorrowMinDegree = document.querySelector('.item3-content .minDegree .num')
let afterTomorrowWeatherStatus = document.querySelector('.afterTomorrowWeatherStatus');

getWeather()
search.addEventListener("keyup", function(){
    getWeather(search.value)
})

btn.addEventListener("click", ()=>{
    getWeather(search.value)
    console.log('hello');
})

async function getWeather(name = 'cairo'){
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1126ae9ae76443b9acb184910242006&q=${name}&days=3`);
    let result = await data.json();
    console.log(result);

    //location
    let searchLocation = result.location.name;
    currentLocation.innerHTML = searchLocation;

    //temp
    let temp_c = result.current.temp_c;
    currentDegree.innerHTML = temp_c;

    //icon
    let currentIcon = result.current.condition.icon;
    currentImage.setAttribute('src', `${currentIcon}`)

    //text
    let currentText = result.current.condition.text;
    currentweatherStatus.innerHTML = currentText;


    array = result.forecast.forecastday;
    console.log(array);

    let day2;
    let day3;
    let maxTemp_Day2;
    let minTemp_Day2;
    let maxTemp_Day3;
    let minTemp_Day3;
    let icon_Day2;
    let icon_Day3;
    let text_Day2;
    let text_Day3;

    for (let i = 0; i < array.length; i++) {
        //temp day2
        day2 = array[1].date;
        maxTemp_Day2 = array[1].day.maxtemp_c;
        tomorrowMaxDegree.innerHTML = maxTemp_Day2;

        minTemp_Day2 = array[1].day.mintemp_c;
        tomorrowMinDegree.innerHTML = minTemp_Day2;

        icon_Day2 = array[1].day.condition.icon;
        tomorrowIcon.setAttribute('src', `${icon_Day2}`);

        text_Day2 = array[1].day.condition.text;
        tomorrowWeatherStatus.innerHTML = text_Day2;

        //temp day3
        day3 = array[2].date;
        maxTemp_Day3 = array[2].day.maxtemp_c;
        afterTomorrowMaxDegree.innerHTML = maxTemp_Day3;

        minTemp_Day3 = array[2].day.mintemp_c;  
        afterTomorrowMinDegree.innerHTML = minTemp_Day3;

        icon_Day3 = array[2].day.condition.icon;
        afterTomorrowIcon.setAttribute('src', `${icon_Day3}`);

        text_Day3 = array[2].day.condition.text;
        afterTomorrowWeatherStatus.innerHTML = text_Day3;

    }

}

//today
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let date = new Date()
console.log(date);

let month = monthNames[date.getMonth()];
let day = date.getDate();
let fullDate = day+month;
document.querySelector('.date').innerHTML = fullDate;

let today = weekday[date.getDay()];
document.querySelector('.day1').innerHTML = today;

console.log(date.toISOString().substring(0, 10));

//tomorrow
let tomorrowDate = new Date();
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
let tomorrow = weekday[tomorrowDate.getDay()];
document.querySelector('.day2').innerHTML = tomorrow;

//after tomorrow
let afterTomorrowDate = new Date();
afterTomorrowDate.setDate(afterTomorrowDate.getDate() + 2);
let aftertomorrow = weekday[afterTomorrowDate.getDay()];
document.querySelector('.day3').innerHTML = aftertomorrow;
