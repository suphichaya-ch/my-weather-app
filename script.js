const apiKey = '8f14477c36dde91c82fc330309a7acf'; // ใส่ API Key ถูกต้อง

const searchForm = document.querySelector('#search-form');
const cityInput = document.querySelector('#city-input');
const weatherInfoContainer = document.querySelector('#weather-info-container');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const cityName = cityInput.value.trim();
    if (cityName) getWeather(cityName);
    else alert('กรุณาป้อนชื่อเมือง');
});

async function getWeather(city) {
    weatherInfoContainer.innerHTML = `<p>กำลังโหลดข้อมูล...</p>`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=th`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('ไม่พบข้อมูลเมืองนี้');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfoContainer.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const { temp, humidity } = main;
    const { description, icon } = weather[0];

    weatherInfoContainer.innerHTML = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p style="font-size: 2rem; font-weight: bold;">${temp.toFixed(1)}°C</p>
        <p>${description}</p>
        <p>ความชื้น: ${humidity}%</p>
    `;

    fetch(url)
  .then(response => {
    if (!response.ok) throw new Error("City not found");
    return response.json();
  })
  .then(data => {
    console.log(data); // ตรวจสอบ data ว่ามีอะไรบ้าง
    weatherInfoContainer.innerHTML = `
      <h2>${data.name}</h2>
      <p>${data.weather[0].description}</p>
      <p>Temperature: ${data.main.temp}°C</p>
    `;
  })
  .catch(error => {
    console.error("Error:", error);
    weatherInfoContainer.innerHTML = `<p>ไม่พบข้อมูลเมือง</p>`;
  });

}
