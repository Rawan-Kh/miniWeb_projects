const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const dayOutput = document.querySelector('.day');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('.locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
const API = '66a4e6336d45a6f577f46bdc0f1462c2' ;

function convertion(val){
    return (val - 273).toFixed(0)
}

btn.addEventListener('click', (e) =>{
// form.addEventListener('submit' ,(e) => {
    app.style.opacity = "0";
    e.preventDefault();
    if(search.value.length == 0){
        alert('Please type in a city name');
    }else{
        let cityInput = search.value;
        fetchWeatherData();
        // search.value = "";
    }
});

cities.forEach((city) => {
    city.addEventListener('click' ,(e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
    });
});

function fetchWeatherData(){
    // fetch('./h.json')
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+search.value+'&appid='+API)
    .then(res => res.json())
    //  .then(data => console.log(data))

    .then(data => {
        var nameval = data['name']  //egypt
        var descrip = data['weather']['0']['description'] //clear sky
        var tempature =  convertion(data['main']['temp'])  //32°C
        var humidity = data['main']['humidity']  //humidity%
        var feelsLike = convertion(data['main']['feels_like'] )  //feels like
        var wndspd = data['wind']['speed']    //wind speed km/h
        var countryCode = data['sys']['country']    //US
        var sunrise = data['sys']['sunrise']
        var code = data['weather']['0']['id'] ;
        var sunset = data['sys']['sunset']
        var iconId = data['weather']['0']['icon']
        console.log(iconId);
        let timeOfDay = "day";
        // icon.src = 'http://openweathermap.org/img/wn/'+ iconId +'.png';
        
        function myDay() {
            var a = new Date();
            var weekdays = new Array(7);
            weekdays[0] = "Sunday";
            weekdays[1] = "Monday";
            weekdays[2] = "Tuesday";
            weekdays[3] = "Wednesday";
            weekdays[4] = "Thursday";
            weekdays[5] = "Friday";
            weekdays[6] = "Saturday";
            var d = weekdays[a.getDay()];
            dayOutput.innerHTML = d;
        }
        function myDate() {
            var today = new Date();
            var months = new Array(12);
            months[0] = "Jan";
            months[1] = "Feb";
            months[2] = "March";
            months[3] = "April";
            months[4] = "May";
            months[5] = "Jun";
            months[6] = "Jul";
            months[7] = "Aug";
            months[8] = "Sep";
            months[9] = "Oct";
            months[10] = "Nov";
            months[11] = "Dec";

            // var dd = String(today.getDate()).padStart(2, '0');
            // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var mm = months[today.getMonth()];
            today = mm + ' ' + yyyy;
            dateOutput.innerHTML = today;
        };
        
          
        if (new Date().valueOf() / 1000 < sunrise) {
          console.log('Day Time');
          timeOfDay = "day";
        } else {
          console.log('Night Time');
          timeOfDay = "night";
        }
        nameOutput.innerHTML = nameval + ", "+ countryCode;
        temp.innerHTML =  tempature +"°C";
        conditionOutput.innerHTML = descrip;
        cloudOutput.innerHTML = feelsLike +"°C";
        humidityOutput.innerHTML = humidity + "%";
        windOutput.innerHTML = wndspd + "km/h";
        myDay();
        myDate();

        //thuderstorm
        if(code == 200 ||code == 201 ||code == 202 ||code == 210 ||code == 211 ||code == 212 ||code == 221||code == 230 ||code == 231||code == 232){
            app.style.backgroundImage = 'url(./img/'+ timeOfDay +'/thunder.jpg)';
            icon.src = './icons/'+ timeOfDay +'/thunder.png';
        if(timeOfDay == "night"){
            btn.style.background = "#71a9d6";
        }else{
            btn.style.background = "#ff8b48";
        }
        }
        // Drizzle
        else if(code == 300 ||code == 301 ||code == 302||code == 310||code == 311||code == 312||code == 313||code == 314||code == 321){
            app.style.backgroundImage = 'url(./img/'+ timeOfDay +'/rain.jpg)';
            icon.src = './icons/'+ timeOfDay +'/rain.png';
        if(timeOfDay == "night"){
            btn.style.background = "#71a9d6";
        }else{
            btn.style.background = "#ff8b48";
        }
        }
        // Rain
        else if(code == 500 ||code == 501 ||code == 502||code == 503||code == 504||code == 511||code == 520||code == 521||code == 522 ||code == 531){
            app.style.backgroundImage = 'url(./img/'+ timeOfDay +'/rain.jpg)';
            icon.src = './icons/'+ timeOfDay +'/rain.png';
            if(timeOfDay == "night"){
                btn.style.background = "#71a9d6";
            }else{
                btn.style.background = "#ff8b48";
            }
        }
        // Snow
        else if(code == 600 ||code == 601 ||code == 602||code == 611||code == 612||code == 613||code == 615||code == 616||code == 620 ||code == 621|| code ==622){
            app.style.backgroundImage = 'url(./img/'+ timeOfDay +'/snow.jpg)';
            icon.src = './icons/'+ timeOfDay +'/snow.png';
            if(timeOfDay == "night"){
                btn.style.background = "#71a9d6";
            }else{
                btn.style.background = "#ff8b48";
            }
        }
        // Mist
        else if(code == 701 ||code == 711 ||code == 721||code == 731||code == 741||code == 751||code == 761||code == 762||code == 771 ||code == 781){
            app.style.backgroundImage = 'url(./img/'+ timeOfDay +'/fog.jpg)';
            icon.src = './icons/'+ timeOfDay +'/fog.png';
            if(timeOfDay == "night"){
                btn.style.background = "#71a9d6";
            }else{
                btn.style.background = "#ff8b48";
            }
        }
        // Clouds
        else if(code == 801 ||code == 802 ||code == 804||code == 803){
            app.style.backgroundImage = 'url(./img/'+ timeOfDay +'/cloudy.jpg)';
            icon.src = './icons/'+ timeOfDay +'/cloudy.png';
            if(timeOfDay == "night"){
                btn.style.background = "#71a9d6";
            }else{
                btn.style.background = "#ff8b48";
            }
        }
        //Clear
        else if(code == 800 ){
        app.style.backgroundImage = 'url(./img/'+ timeOfDay +'/clear.jpg)';
        icon.src = './icons/'+ timeOfDay +'/clear.png';
        if(timeOfDay == "night"){
            btn.style.background = "#71a9d6";
        }else{
            btn.style.background = "#ff8b48";
        }
        }

    //update ui
        nameOutput.innerHTML = nameval + ", "+ countryCode;
        temp.innerHTML =  tempature +"°C";
        conditionOutput.innerHTML = descrip;
        cloudOutput.innerHTML = feelsLike +"°C";
        humidityOutput.innerHTML = humidity + "%";
        windOutput.innerHTML = wndspd + "km/h";
        myDay();
        myDate();
    })
    .catch(err => alert('Opps.., city not found'))
    app.style.opacity ="1";
}

//play audio
// var sample = document.getElementById("foobar");
// sample.play();