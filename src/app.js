const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDir = path.join(__dirname, '../public');
const viewPaths = path.join(__dirname, '../templates/views');
const partialsPaths = path.join(__dirname, '../templates/partials');

// Setup hbs engine & views location
app.set('view engine', 'hbs');
app.set('views', viewPaths);
hbs.registerPartials(partialsPaths);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Tinashe'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Tinashe'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Tinashe Chiweshe',
        message: 'Welcome to help page'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please enter an address"
        })
    };

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error){
            return res.send( { error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: `C'est nuageux`,
    //     location: 'Johannesburg',
    //     address: req.query.address
    // });
});

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'An error has occured'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tinashe Chiweshe',
        errorMessage: 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tinashe',
        errorMessage: 'Whoops! Page not found...'
    });
})

// thisapp.com
// thisapp.com/contact
// thisapp.com/about

app.listen(port, () => {
    console.log('Listening on port ' + port);
});