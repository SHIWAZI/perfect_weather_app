
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details= document.querySelector('.details');
const time =document.querySelector('img.time');
const icon =document.querySelector('.icon img');


const updateUI=(data)=>{
   
    const cityDets= data.city;
    const cityWeather=data.weather;
    
    details.innerHTML=` 
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3"> ${cityWeather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${cityWeather.Temperature.Metric.Value}</span>
        <span>&deg;c</span>
    </div>
          `;

//updateIcon
let srcIcon =`img/icons/${cityWeather.WeatherIcon}.svg`;
icon.setAttribute('src',srcIcon);


          //updateTime
          let timesrc=null;
          if (cityWeather.IsDayTime){
              timesrc='img/day.svg';
          }else{
              timesrc='img/night.svg';
          };
          time.setAttribute('src',timesrc);


          if(card.classList.contains('d-none'))
          {
              card.classList.remove('d-none');
          }
}  





//city update
const cityUpdate= async(cityValue)=>{
    //console.log(cityValue);
const city = await getCity(cityValue);
const weather = await getWeather(city.Key); 

return{
    city:city ,
    weather: weather
};


}

cityForm.addEventListener('submit',e=>{
e.preventDefault();
//city value
const cityValue = cityForm.city.value.trim();
cityForm.reset();

cityUpdate(cityValue)
.then(data => updateUI(data))
.catch(err => console.log(err)) ;
});

