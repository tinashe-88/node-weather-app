const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2c9f960d98703a45c50fedd1833b6fb9/' + latitude + ',' + longitude + '?units=si';

    request( { url: url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to establish connection', undefined );
        } else if(body.error){
            callback('Whoops! Unable to find location. Try again..');
        } else {
            callback(undefined, ` ${body.daily.data[0].summary} It is currently ${body.currently.temperature}°C. There's a ${body.currently.temperature}% chance of rain.`);
        }
    })
};

module.exports = forecast;