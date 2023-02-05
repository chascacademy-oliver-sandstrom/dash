'use strict';
import {
  asyncCall as e,
  kToC as t,
  renderSpinner as a,
  showErrorAcitivtyMsg as i,
  showErrorTimeMsg as o,
  showErrorImgMsg as n,
  showErrorMsgJokes as r,
} from './functions.js';
let dashboardHolder = document.querySelector('.dashboardHolder'),
  timeHolder = document.querySelector('.timeHolder'),
  backgroundImage = document.querySelector('.backgroundImage'),
  activityHolder = document.querySelector('.activityHolder'),
  imageDescription = document.querySelector('.imageDescription'),
  randomJokeHolder = document.querySelector('.randomJokeHolder'),
  randomJoke = async function () {
    try {
      let response = await e('https://type.fit/api/quotes'),
        // { contents: i } = t,
        o = `<span class="activity">Random Quote:</span> 
      <p>${
        response.data[Math.floor(Math.random() * response.data.length)].text
      }</p>
      
    `;
      randomJokeHolder.innerHTML = o;
    } catch (n) {
      r(n, randomJokeHolder);
    }
  },
  boredActivity = async function () {
    try {
      let { data: t } = await e(
          'https://uselessfacts.jsph.pl/random.json?language=en'
        ),
        { text: a } = t,
        n = `    
    <p class="activity">Random Facts:</p>     
      <span class="activity">${a}</span>     
        `;
      activityHolder.innerHTML = n;
    } catch (r) {
      i(activityHolder);
    }
  },
  showBackgroundImage = async function () {
    try {
      let { data: t } = await e(
        'https://api.unsplash.com/photos/random?count=1&client_id=kry-mdhiXYPHMpYyC7DOagXkPDtI6SRMS7N5MabBj8o'
      );
      t.forEach((e) => {
        let t = e.urls.full,
          a = `
        <p class="author">Image created by ${e.user.first_name} ${
            e.user.last_name ? '' : e.user.last_name
          }.</p>
         `;
        imageDescription.innerHTML = a;
        let i = new Image();
        (i.src = t),
          (i.onload = function () {
            backgroundImage.style.backgroundImage = `url('${i.src}')`;
          });
      });
    } catch (a) {
      n(imageDescription);
    }
  },
  displayTime = async function () {
    try {
      let t = Intl.DateTimeFormat().resolvedOptions().timeZone,
        { data: a } = await e(`https://worldtimeapi.org/api/timezone/${t}`),
        { datetime: i } = a,
        n = `
    <div class="date_time">
      <span id="time">${i.slice(11, 19)}</span>
      <span class="date">${
        [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ][a.day_of_week]
      }</span>    
      <span class="date">${i.slice(0, 10)} </span>    
    </div>
  `;
      timeHolder.innerHTML = n;
    } catch (r) {
      r.message, o(timeHolder);
    }
  },
  getPosition = function () {
    return new Promise(function (e, t) {
      navigator.geolocation.getCurrentPosition(e, t);
    });
  },
  getWeather = async function () {
    try {
      let e = await getPosition(),
        { latitude: t, longitude: a } = e.coords;
      if (!e) throw Error('Problem getting location data');
      displayWeather(t, a);
    } catch (i) {
      console.error(`${i.message}`);
      let o = `
    <div class="weatherHolder">    
            <div class="weatherItems">
                <span>${i.message}</span>
        </div>    
        `;
      dashboardHolder.insertAdjacentHTML('beforeend', o);
    }
  },
  displayWeather = async function (e, a) {
    try {
      let i = `https://api.openweathermap.org/data/2.5/weather?lat=${e}&lon=${a}&appid=f365e6e92904c6192868a84da639c28d`,
        { data: o } = await axios.get(i),
        { temp: n } = o.main,
        r = `
    <div class="weatherHolder">
        <div class="weatherItems">
            <span>${t(n)}</span>
            <span>${o.name}</span>
            </div>
            <img src="http://openweathermap.org/img/w/${
              o.weather[0].icon
            }.png" alt="${o.weather.description}">
    </div>
    `;
      dashboardHolder.insertAdjacentHTML('beforeend', r);
    } catch (s) {
      throw s;
    }
  },
  start = function () {
    getWeather(),
      showBackgroundImage(),
      boredActivity(),
      randomJoke(),
      a(timeHolder),
      a(activityHolder),
      a(imageDescription),
      a(randomJokeHolder);
  };
start(),
  setInterval(() => {
    displayTime();
  }, 1000),
  setInterval(showBackgroundImage, 25000),
  setInterval(boredActivity, 15000),
  setInterval(randomJoke, 15000);