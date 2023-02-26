/* Clock and calendar */

function showTime(){
  window.setInterval(
   function showTime(){
       const date = new Date();
       const currentTime = date.toLocaleTimeString();
       const options = {weekday: 'long', month: 'long', day: 'numeric'};
       let currentDate = date.toLocaleDateString('en-Br', options);
       if (selectLang.value == 'en') {
        currentDate = date.toLocaleDateString('en-Br', options);
    }  else if (selectLang.value == 'ru') {
        currentDate = date.toLocaleDateString('ru-Ru', options);
    };
       document.getElementById("clock").innerHTML = currentTime;
       document.getElementById("currentdate").innerHTML = currentDate;

  }
 , 1000);
}
showTime();


/* Select language */

const selectLang = document.querySelector('.change-lang');
const languages = ['en', 'ru'];

function checkLangStorage() {
    if (localStorage.getItem('lang')) {
        selectLang.value = localStorage.getItem('lang');
    }
}
checkLangStorage();

function changeUrl() {
    let lang = selectLang.value;
    location.href = window.location.pathname + '#' + lang;
    // location.reload();
}

function changeLanguage() {
    let hash = window.location.hash;
    hash = hash[1] + hash[2];
    if (!languages.includes(hash)) {
      hash = 'en';
      location.href = window.location.pathname + '#' + hash;
        // location.reload();
    }
    selectLang.value = hash;
    localStorage.setItem('lang', hash);
    // for (let key in langArr) {
    //   console.log(langArr);
    //     let elem = document.querySelector('.lng-' + key);
    //     console.log(key);
    //     if (elem) {
    //         elem.innerHTML = langArr[key][hash];
    //     }
    // }
    let inputName = document.querySelector('.name');
    hash == 'en' ? inputName.setAttribute('placeholder', 'Enter name') : inputName.setAttribute('placeholder', 'Введите имя');

}
changeLanguage();



/* Greeting */

  let greet; // for url to background picture
  let greet1; // for setting the date up
  function getTimeOfDay(){
    const currentDate = new Date();
    const hours = currentDate.getHours();
    if (hours >= 6 && hours < 12) {
      greet = 'morning';
    } else if (hours >= 12 && hours < 18) {
    greet = 'afternoon';
    } else if (hours >= 18 && hours < 24) {
      greet = 'evening';
    } else if (hours >= 0 && hours < 6) {
      greet = 'night';
    };

    if (selectLang.value == 'en' && hours >= 6 && hours < 12) {
        greet1 = 'morning';
      } else if (selectLang.value == 'en' && hours >= 12 && hours < 18) {
      greet1 = 'afternoon';
      } else if (selectLang.value == 'en' && hours >= 18 && hours < 24) {
        greet1 = 'evening';
      } else if (selectLang.value == 'en' && hours >= 0 && hours < 6) {
        greet1 = 'night';
      } else if (selectLang.value == 'ru' && hours >= 6 && hours < 12) {
        greet1 = 'Доброе утро,';
      } else if (selectLang.value == 'ru' && hours >= 12 && hours < 18) {
      greet1 = 'Добрый день,';
      } else if (selectLang.value == 'ru' && hours >= 18 && hours < 24) {
        greet1 = 'Добрый вечер,';
      } else if (selectLang.value == 'ru' && hours >= 0 && hours < 6) {
        greet1 = 'Доброй ночи,';
     }
    }

let greeting = document.querySelector('.greeting');

function showGreeting(){

  getTimeOfDay();
     // greeting.textContent = `${greet},`;
  selectLang.value == 'en' ? greeting.textContent = `Good ${greet1},` : greeting.textContent = greet1;
  // console.log(greeting.textContent)
}
showGreeting();


selectLang.addEventListener('change', changeUrl);
selectLang.addEventListener('change', getTimeOfDay);
selectLang.addEventListener('change', showGreeting);
selectLang.addEventListener('change', getWeather);
selectLang.addEventListener('change', getQuotes);

const yourname = document.querySelector('.name');
function setLocalStorage() {
  localStorage.setItem('name', yourname.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    yourname.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage);

/* Change backgrounds*/

let rand = Math.ceil(Math.random() * 20);

function setBg(pictureNumber){
  pictureNumber = pictureNumber.toString().padStart(2, "0");
  document.body.style.backgroundImage = `url("https://raw.githubusercontent.com/tatsiaa/stage1-tasks/assets/images/${greet}/${pictureNumber}.jpg")`;
  }
setBg(rand);

const prev = document.querySelector('.slide-prev'),
      next = document.querySelector('.slide-next');
next.addEventListener('click', getSlideNext);
prev.addEventListener('click', getSlidePrev);

function getSlideNext(){
  if (rand < 20) {
    rand++;
    setBg(rand);
  } else {
    rand = 1;
    setBg(rand);
  }
}

function getSlidePrev() {
  if (rand > 1) {
    rand--;
    setBg(rand);
  } else {
    rand = 20;
    setBg(rand);
  }
}

/* Change quote */

let text = document.querySelector('.quote');
let author = document.querySelector('.author');
let quoteBtn = document.querySelector('.change-quote');

async function getQuotes() {
  let quotes;

  if (selectLang.value == 'en'){
    quotes = 'js/data/quotes-en.json';
  } else if (selectLang.value == 'ru'){
    quotes = 'js/data/quotes-ru.json';
  }
  const res = await fetch(quotes);
  const data = await res.json();

  let randomQuote = Math.floor(Math.random() * data.length);

  text.textContent = `${data[randomQuote].text}`;
  author.textContent = `${data[randomQuote].author}`;
}

document.addEventListener('DOMContentLoaded', getQuotes);
quoteBtn.addEventListener('click', getQuotes);


/* Weather */

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const yourcity = document.querySelector('.city');
yourcity.value = "Minsk";

async function getWeather() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${yourcity.value}&lang=${selectLang.value}&appid=f8bcf48e68c4e870c8738d6525319d52&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (selectLang.value == 'en'){
    if (data.cod == "404"){
      yourcity.value = "";
      yourcity.placeholder = "ERROR";
      temperature.textContent = `City not found`;
      weatherIcon.classList.add(`owf-950`);
      weatherDescription.textContent = 'Try to enter correct city';
      wind.textContent = "";
      humidity.textContent = "";
    } else {
      yourcity.value = data.name;
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
      humidity.textContent = `Humidity: ${Math.round(data.main.humidity)} %`;
    }
  } else if (selectLang.value == 'ru'){
    if (data.cod == "404"){
      yourcity.value = "";
      yourcity.placeholder = "ОШИБКА";
      temperature.textContent = `Город не найден`;
      weatherIcon.classList.add(`owf-950`);
      weatherDescription.textContent = 'Введите город';
      wind.textContent = "";
      humidity.textContent = "";
    } else {
      yourcity.value = data.name;
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
      humidity.textContent = `Влажность: ${Math.round(data.main.humidity)} %`;
    }
  }
}
getWeather();

function setLocalStorageForCity() {
  localStorage.setItem('city', yourcity.value);
}
window.addEventListener('beforeunload', setLocalStorageForCity);

function getLocalStorageForCity() {
  if (localStorage.getItem('city')) {
    yourcity.value = localStorage.getItem('city');
  }
}
window.addEventListener('load', getLocalStorageForCity);

yourcity.addEventListener('change', getWeather);
window.addEventListener('load', getWeather);


/* Player */

import playList from './playList.js';

let isPlay = false;
let playNum = 0;
const playListContainer = document.querySelector('.play-list');
let playBtn = document.querySelector('.play');
let pauseBtn = document.querySelector('.pause');
const prevBtn = document.querySelector('.play-prev');
const nextBtn = document.querySelector('.play-next');
const audio = document.querySelector('audio');

function playAudio() {
  playBtn.classList.add('pause');
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play();
  isPlay = true;
  document.querySelectorAll('.play-item')[playNum].style.color = 'blue';
}

function pauseAudio() {
  playBtn.classList.remove('pause');
  audio.pause();
  isPlay = false;
  document.querySelectorAll('.play-item')[playNum].style.color = 'white';

}

function togglePlay() {
  if (isPlay === true){
    pauseAudio();
  } else {
    playAudio();
  }
}

for (let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = `${playList[i].title}`;
  playListContainer.append(li);
}

const state = {
  language: 'en',
  photoSource: 'github',
  blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']
}

playBtn.addEventListener('click', togglePlay);
audio.addEventListener('ended', playNext);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);

function playNext() {
  document.querySelectorAll('.play-item')[playNum].style.color = 'white';
  if (playNum >= playList.length - 1) {
    playNum = 0;
  } else {
    playNum++;
  }
  audio.pause();
  isPlay = false;
  localStorage.setItem('playNum', playNum);
  playAudio();
}

function playPrev() {
  document.querySelectorAll('.play-item')[playNum].style.color = 'white';
  if (playNum <= 0) {
    playNum = playList.length - 1;
  } else {
    playNum--;
  }
  isPlay = false;
  audio.pause();
  localStorage.setItem('playNum', playNum);
  playAudio();
}
