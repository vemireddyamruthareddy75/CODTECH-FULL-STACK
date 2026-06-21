async function getWeather() {

    const city = document.getElementById("city").value;

    if(city===""){
        alert("Please enter a city");
        return;
    }

    try{

        const response =
        await fetch(`https://wttr.in/${city}?format=j1`);

        const data = await response.json();

        const temp =
        data.current_condition[0].temp_C;

        const humidity =
        data.current_condition[0].humidity;

        const feelsLike =
        data.current_condition[0].FeelsLikeC;

        document.getElementById("result").innerHTML = `
        <h2>${city}</h2>
        <p>🌡 Temperature: ${temp}°C</p>
        <p>💧 Humidity: ${humidity}%</p>
        <p>🔥 Feels Like: ${feelsLike}°C</p>
        `;

    }
    catch(error){

        document.getElementById("result").innerHTML =
        "<p>Unable to fetch weather data.</p>";

    }
}