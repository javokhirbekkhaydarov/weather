const wrapper = document.querySelector(".wrapper"),
  inputPart = wrapper.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-text"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  wIcon = document.querySelector(".weather-part  img"),
  arrowBack = wrapper.querySelector("header img ");

let api;

inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    infoTxt.textContent = `joylashuvingiz ob-havo ma'lumotlarini olinmoqda`;

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    confirm("ob-havoni bilish uchun joylashuvingizni yoqing");
  }
});

function onError(error) {
  infoTxt.textContent = error.message;
  infoTxt.classList.add("error");
}
function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=b17f49fddd52f6c4bb63340bb4dd513d`;
  fetchData();
}

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b17f49fddd52f6c4bb63340bb4dd513d`;
  fetchData();
}

function fetchData() {
  infoTxt.textContent = `${inputField.value} - shahrining ob-havo ma'lumotlarini olinmoqda`;
  infoTxt.classList.add("pending");
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}

function weatherDetails(info) {
  infoTxt.classList.replace("pending", "error");

  if (info.cod == "404") {
    infoTxt.textContent = `${inputField.value} - nomli shahar topilmadi`;
  } else {
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { feels_like, temp, humidity } = info.main;

    if (id == 800) {
      wIcon.src = "icons/sun.png";
    } else if (id >= 600 && id <= 622) {
      wIcon.src = "icons/snow.png";
    } else if ((id >= 300 && id <= 622) || (id >= 500 && id <= 531)) {
      wIcon.src = "icons/rain.png";
    }
     let tempo = feels_like;
     Math.floor(tempo)
    //   all 
    wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
    wrapper.querySelector(".temp .numb-2").innerHTML = `${tempo}C <sup>o</sup>`;
    wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

    infoTxt.classList.remove("pending", "error");
    wrapper.classList.add("active");
   
  }
}

arrowBack.addEventListener("click" , ()=> {
    wrapper.classList.remove("active");
    console.log("rtg");
})