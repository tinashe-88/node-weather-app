const formWeather = document.querySelector('form');
const searchWeather = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

formWeather.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchWeather.value;

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('http://localhost:3000/weather?address=' + location).then(res => {
        res.json().then(data => {
            if(data.error){
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                
            }
        })
    });
})

