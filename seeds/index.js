const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const axios = require('axios');

/* mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
}); */
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("Connection open");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })

const sample = array => array[Math.floor(Math.random() * array.length)];

/* const accessKey = 'hPc98dzZl1hdtia2S58gquWYozZO5iS6YbF_8-wECUk'; */
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 20; i++) {
        /* const response = await axios.get(`https://api.unsplash.com/photos/random/?client_id=${accessKey}`);

        const imageUrl = response.data.urls.small; */
        const random1000 = Math.floor(Math.random() * 1000);
        const random100 = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '655f9b67a00d3f36e0b98e73',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry:{
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {

                    url: 'https://res.cloudinary.com/dh1sahyu5/image/upload/v1701047206/YelpCamp/spljif.png',
                    filename: 'spljif'
                },
                {

                    url: 'https://res.cloudinary.com/dh1sahyu5/image/upload/v1701047996/YelpCamp/spljif2.avif',
                    filename: 'spljif2'
                }

            ],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            price: random100
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})