/* Select language */

const selectLang = document.querySelector('.change-lang');
const allLang = ['en', 'ru'];



// проверим есть ли язык в localstorage
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
    
/*
    if (hours >= 6 && hours < 12) {
     // greet = "morning";
      if (selectLang.value == 'en') {
        greet = 'morning';
      } else if (selectLang.value == 'ru'){
        greet = 'Доброе утро,';
        };
    } else if (hours >= 12 && hours < 18) {
     // greet = "afternoon";
     if (selectLang.value == 'en') {
       greet = 'afternoon';
      } else if (selectLang.value == 'ru'){
        greet = 'Добрый день,';
         };
    } else if (hours >= 18 && hours < 24) {
     // greet = "evening";
     if (selectLang.value == 'en') {
       greet = 'evening';
      } else if (selectLang.value == 'ru'){
        greet = 'Добрый вечер,';
        };
    } else {
     // greet = "night";
     if (selectLang.value == 'en'){
       greet = 'night';
     } else if (selectLang.value == 'ru'){
       greet = 'Доброй ночи,';
        };
    }
   
   // console.log(greet);
    
  }
 */ 
  
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
/*
function changeCity(){
if (selectLang.value == 'ru'){
  yourcity.value = `Минск`;
} else if (selectLang.value == 'en') {
  yourcity.value = `Minsk`;
};
}
changeCity();
*/

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
/*
console.log('Score: 75 / 150 
  (Часы и календарь +15
   Приветствие +10
   Смена фонового изображения +20
   Виджет погоды +15
   Виджет цитата дня +10
   Аудиоплеер +5)')

   */

  
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

/*


let urlApiFlickr, urlApiUnsplash;
//checkLanguage(),
engBtn.addEventListener("click", changeLanguageEng),
rusBtn.addEventListener("click", changeLanguageRus);
let apiFlickrBtn = document.querySelector(".flickr-api")
  , apiUnsplashBtn = document.querySelector(".unsplash-api")
  , githubBtn = document.querySelector(".github-api");
async function getUnsplashToImage() {
    const e = `https://api.unsplash.com/photos/random?orientation=landscape&query=${getTimeOfDayForBg()},nature&client_id=4zlg7vxd_ulCb_aTpZiwXv16GCqGfAOXokIEwa_JBhM`
      , t = await fetch(e)
      , o = await t.json();
    urlApiUnsplash = o.urls.regular
}
getUnsplashToImage();
const albomsFlickr = {
    night: "https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=98bdf49bfcda58a0e5188de75b74e79c&gallery_id=185118123-72157720062587146&extras=url_h&format=json&nojsoncallback=1",
    morning: "https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=98bdf49bfcda58a0e5188de75b74e79c&gallery_id=185118123-72157720069530982&extras=url_h&format=json&nojsoncallback=1",
    afternoon: "https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=98bdf49bfcda58a0e5188de75b74e79c&gallery_id=185118123-72157720111881805&extras=url_h&format=json&nojsoncallback=1",
    evening: "https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=98bdf49bfcda58a0e5188de75b74e79c&gallery_id=185118123-72157720111880160&extras=url_h&format=json&nojsoncallback=1"
}
async function getFlickrToImage() {
    const e = albomsFlickr[getTimeOfDayForBg()]
      , t = await fetch(e)
      , o = await t.json();
    urlApiFlickr = o.photos.photo[randomNumForApi].url_h ? o.photos.photo[randomNumForApi].url_h : `https://farm${o.photos.photo[randomNumForApi].farm}.staticflickr.com/${o.photos.photo[randomNumForApi].server}/${o.photos.photo[randomNumForApi].id}_${o.photos.photo[randomNumForApi].secret}.jpg`
}
function setBgApi() {
    const e = document.querySelector("body"),
     t = new Image;
    isApiFlickr ? (getFlickrToImage(),
    t.src = urlApiFlickr) : isApiUnsplash ? (getUnsplashToImage(),
    t.src = urlApiUnsplash) : setBg(),
    t.onload = ()=>{
        e.style.backgroundImage = `url('${t.src}')`,
        setTimeout(()=>{
            loading = !0
        }
        , 1100)
    }
}
getFlickrToImage(),
apiFlickrBtn.addEventListener("click", (function() {
    githubBtn.classList.remove("active"),
    apiUnsplashBtn.classList.remove("active"),
    apiFlickrBtn.classList.add("active"),
    isApiFlickr = !0,
    isApiUnsplash = !1,
    setBgApi()
}
//)),
apiUnsplashBtn.addEventListener("click", (function() {
    githubBtn.classList.remove("active"),
    apiUnsplashBtn.classList.add("active"),
    apiFlickrBtn.classList.remove("active"),
    isApiFlickr = !1,
    isApiUnsplash = !0,
    setBgApi()
}
//)),
githubBtn.addEventListener("click", (function() {
    (isApiFlickr || isApiUnsplash) && (console.log(1),
    githubBtn.classList.add("active"),
    apiUnsplashBtn.classList.remove("active"),
    apiFlickrBtn.classList.remove("active"),
    isApiFlickr = !1,
    isApiUnsplash = !1,
    setBg())
}
//));
const settingsBtn = document.querySelector(".settings-icon")
  , settingsWrap = document.querySelector(".settings-wrap");
function showSettings() {
    settingsBtn.classList.toggle("active"),
    settingsWrap.classList.toggle("active")
}
settingsBtn.addEventListener("click", showSettings);


*/
setInterval(() => {
    getSlideNext();
}, 600000)



/* Select language */

/*
const allLang = ['en', 'ru'];

selectLang.addEventListener('change', changeUrl);
selectLang.addEventListener('change', getTimeOfDay);
selectLang.addEventListener('change', showGreeting);

// проверим есть ли язык в localstorage
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
*/