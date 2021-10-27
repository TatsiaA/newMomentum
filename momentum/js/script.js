/* Часы и календарь */

function showTime(){
  window.setInterval(
   function showTime(){
       const date = new Date();
       const currentTime = date.toLocaleTimeString();
       const options = {weekday: 'long', month: 'long', day: 'numeric'};
       let currentDate = date.toLocaleDateString('en-Br', options);
       if (selectLang.value == 'en') {
        currentDate = date.toLocaleDateString('en-Br', options);
    } else if (selectLang.value == 'ru') {
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
const allLang = ['en', 'ru'];

function checkLangStorage() {
    if (localStorage.getItem('lang')) {
        selectLang.value = localStorage.getItem('lang');
    }

}
checkLangStorage();

function changeUrl() {
    let lang = selectLang.value;
    location.href = window.location.pathname + '#' + lang;
    location.reload();
}

function changeLanguage() {
    let hash = window.location.hash;
    hash = hash.substr(1);
    // console.log(hash);
    if (!allLang.includes(hash)) {
        location.href = window.location.pathname + '#en';
        location.reload();
    }
    selectLang.value = hash;
    localStorage.setItem('lang', hash);

    for (let key in langArr) {
        let elem = document.querySelector('.lng-' + key);
        if (elem) {
            elem.innerHTML = langArr[key][hash];
        }
    }
    let inputName = document.querySelector('.name');
    hash == 'en' ? inputName.setAttribute('placeholder', 'Enter name') : inputName.setAttribute('placeholder', 'Введите имя');
    
}
changeLanguage();



/* Greeting */

  let greet;
  let greet1;
  function getTimeOfDay(){
    const date1 = new Date();
    const hours = date1.getHours();
    if (hours >= 6 && hours < 12) {
      greet = 'morning';
    } else if (hours >= 12 && hours < 18) {
    greet = 'afternoon';
    } else if (hours >= 18 && hours < 24) {
      greet = 'evening';
    } else if (hours >= 0 && hours < 6) {
      greet = 'night';
    };
    
    // console.log(hours);
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
     console.log(greet);
    }
   
let greeting = document.querySelector('.greeting');
function showGreeting(){
      
      getTimeOfDay();  
     // greeting.textContent = `${greet},`;
        selectLang.value == 'en' ? greeting.textContent = `Good ${greet1},` : greeting.textContent = `${greet1}`;
     console.log(greeting.textContent)
     }
     showGreeting();


     selectLang.addEventListener('change', changeUrl);
     selectLang.addEventListener('change', getTimeOfDay);
     selectLang.addEventListener('change', showGreeting);


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

function getRandom() {
  
 // console.log(rand); 
}
getRandom();

function setBg(){  
   rand = rand.toString().padStart(2, "0");    
   document.body.style.backgroundImage = `url("https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${greet}/${rand}.jpg")`;

  }
  setBg();
                                               

const prev = document.querySelector('.slide-prev'),
      next = document.querySelector('.slide-next');

function getSlideNext(){
  if (rand < 20) { 
    setBg(rand);
    rand++;   
    
  } else {
    rand = 1;
    setBg(rand);
  }         
  
 // console.log(rand);
}
next.addEventListener('click', getSlideNext);

function getSlidePrev(){
  if (rand > 1) {     
    rand--;   
    setBg(rand);
  } else {
    rand = 20;
    setBg(rand);
  }        
 // console.log(rand);
}
prev.addEventListener('click', getSlidePrev);



/* Change quote */

let text = document.querySelector('.quote');
let author = document.querySelector('.author');
let quoteBtn = document.querySelector('.change-quote');

async function getQuotes(){
  let quotes;
  //let language = document.querySelector('lang')
 // console.log(language);

  if (selectLang.value == 'en'){
    quotes = 'js/data/quotes-en.json';
  } else if (selectLang.value == 'ru'){
    quotes = 'js/data/quotes-ru.json';
  }
  //console.log(quotes);
  const res = await fetch(quotes);
  const data = await res.json();
 // console.log(data);

 let randomQuote = Math.floor(Math.random() * data.length);
 // console.log(randomQuote);
 // console.log(data.length);
  
  text.textContent = `${data[randomQuote].text}`;
  author.textContent = `${data[randomQuote].author}`;
 // console.log(text.textContent);
 // console.log(author.textContent);
  
}

document.addEventListener('DOMContentLoaded', getQuotes);
//console.log(language);

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
  //console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
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
 // console.log(yourcity.value);
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
 // console.log(yourcity.value);
}
window.addEventListener('beforeunload', setLocalStorageForCity);

function getLocalStorageForCity() {
  if(localStorage.getItem('city')) {
    yourcity.value = localStorage.getItem('city');
  }
}
window.addEventListener('load', getLocalStorageForCity);

yourcity.addEventListener('change', getWeather);
window.addEventListener('load', getWeather);


/* Player */

import playList from './playList.js';
//console.log(playList);

let isPlay = false;
//let playNum = Math.floor(Math.random() * 4);
let playNum = 0;
const playListContainer = document.querySelector('.play-list');
let playBtn = document.querySelector('.play');
let pauseBtn = document.querySelector('.pause');
const prevBtn = document.querySelector('.play-prev');
const nextBtn = document.querySelector('.play-next');
const audio = document.querySelector('audio');

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play();
  isPlay = true;
 
 //console.log(playNum);
}
function pauseAudio() {
  audio.pause();
  isPlay = false;
 
}

function toggleBtn() {
 playBtn.classList.toggle('pause'); 
 
}
playBtn.addEventListener('click', toggleBtn);

function togglePlay() {
  if (isPlay == true){
    playAudio(playNum);
  //playBtn.style.backgroundImage = `../assets/svg/pause.svg`;
  
} else {
  pauseAudio(playNum);
 // playBtn.style.backgroundImage = `../assets/svg/play.svg`;

}
}
togglePlay();


//pauseBtn.addEventListener('click', pauseAudio);

playBtn.addEventListener('click', playAudio);



for(let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');
li.classList.add('play-item');
li.textContent = `${playList[i].title}`;
//console.log(li.textContent);
playListContainer.append(li);
}

//pauseBtn.addEventListener('click', pauseAudio);

const state = {
  language: 'en',
  photoSource: 'github',
  blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']
}

  
audio.addEventListener("ended", playNext),
document.querySelector(".play-next").addEventListener("click", playNext),
document.querySelector(".play-prev").addEventListener("click", playPrev),
document.querySelector(".play").addEventListener("click", playAudio);

function playNext() {
    playNum >= playList.length - 1 ? (playNum = 0,
    audio.pause(),
    isPlay = !1) : (playNum++,
    audio.pause(),
    isPlay = !1),
    localStorage.setItem("soundProgress-value", "NaN"),
    localStorage.setItem("playNum", playNum),
    playAudio()
}
function playPrev() {
    playNum <= 0 ? (playNum = playList.length - 1,
    isPlay = !1,
    audio.pause()) : (playNum--,
    isPlay = !1,
    audio.pause()),
    localStorage.setItem("soundProgress-value", "NaN"),
    localStorage.setItem("playNum", playNum),
    playAudio()
}


setInterval(() => {
    getSlideNext();
}, 600000)

