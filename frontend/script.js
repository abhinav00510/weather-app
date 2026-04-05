let input = document.querySelector("#cityInput");
let button = document.querySelector("#searchBtn");
let result = document.querySelector("#result");
let note = document.querySelector("#note");


async function getweather(city) {
  if(!city){
        note.innerHTML = "CITY KA NAAM LIKH PEHLE😑";
        return;
  }

  try {
    let raw = await fetch(
      `http://localhost:3000/weather/${city}`);

    if (!raw.ok) {
      throw new Error("City not found.");
    }

    let real = await raw.json();

    if (real.cod !== 200) {
    throw new Error("City not found");
  }
    
    let temp = (real.main.temp - 273.15).toFixed(2);

    if(temp>40){
        note.innerHTML = "BOHOT GARAM HAI RE BIDU🥵";
        note.style.color = "crimson";
    }
    else if(temp<15){
        note.innerHTML = "BEEDU RAJAI ODH KE BATIH🥶";
        note.style.color = "lightseagreen";
    }

    else if(temp>20 && temp<30){
        note.innerHTML = "ITNE MAI TOH CHUHA BHI NAHI MAREGA😏";
        note.style.color = "lightgreen";
    }

    result.innerHTML = temp + ` °C in ${input.value}`;
    result.style.color = "blue";

  } catch (err) {
    note.innerHTML = "CITY NAHI MILA🤧";
    note.style.color = "red";
  } 
}


button.addEventListener("click",function(){
    getweather(input.value);
});