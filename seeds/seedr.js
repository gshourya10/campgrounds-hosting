const mongoose = require("mongoose");
const { descriptors, places } = require("./seedUtil");
const cities = require("./cities");
const images = require("./images");
const Campground = require("../models/campgrounds");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 40; i++) {
    const camp = new Campground({
      title: `${getRandom(descriptors)} ${getRandom(places)}`,
      location: `${getRandom(cities).city}, ${getRandom(cities).state}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus non est dolorem minus eos id, amet autem quis quas in quisquam quasi necessitatibus iusto possimus qui corrupti, reprehenderit repellat deserunt.",
      price: Math.floor(Math.random() * 30),
      images: [
        {
          path: "https://res.cloudinary.com/dxa5ddk4q/image/upload/v1643050999/YelpCamp/pexels-photo-817275_erbriz.jpg",
          filename: "YelpCamp/pexels-photo-817275_erbriz.jpg",
        },
      ],
      author: "61e3e0352b554d02df3a329a",
    });

    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
