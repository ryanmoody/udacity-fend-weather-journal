/* Global Variables */
const API_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?';
const API_KEY = 'ADD API KEY HERE';

let counter = 1;

const getDate = () => {
  const d = new Date();
  return `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;
};

const fetchWeatherData = async (zipcode) => {
  const url = `${API_BASE_URL}zip=${zipcode},us&appid=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(`An error occured while fetching weather data: ${err}`);
  }
};

const postWeatherData = async (url = '/add', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (err) {
    console.log(`An error occured while posting data to the server: ${err}`);
  }
};

const updateUI = async (id) => {
  try {
    const res = await fetch(`/entry/${id}`);
    const data = await res.json();
    console.log(data);

    document.getElementById('date').innerHTML = data.date;
    document.getElementById('temp').innerHTML = `${data.temp} &#8457;`;
    document.getElementById('content').innerHTML = data.content;
  } catch (err) {
    console.log(`An error occured while updating the UI: ${err}`);
  }
}

const handleGenerate = () => {
  const zipcode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  fetchWeatherData(zipcode)
    .then((data) => {
      console.log(data);
      const req = {
        date: getDate(),
        temp: data.main.temp,
        content: feelings,
        id: counter
      };

      counter += 1;

      return postWeatherData('/add', req);
    })
    .then((data) => updateUI(data.id));
};

document.getElementById('generate').addEventListener('click', handleGenerate);