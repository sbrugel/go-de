const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

console.log('Connected to DB');

// schemas
const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    password: String,
    following: [Number],
    regDate: Date
});
const locationSchema = new mongoose.Schema({
    id: Number,
    name: String,
    imgURL: String,
    description: String,
    location: String
})
const eventSchema = new mongoose.Schema({
    userID: Number, // who visited
    locationID: Number, // where visited
    date: Date,
    comments: String
})

// models
const User = new mongoose.model("User", userSchema);
const Location = new mongoose.model("Location", locationSchema);
const Event = new mongoose.model("Event", eventSchema);

// == USER ENDPOINTS ==
/*
- register
- get all
- get by ID
- follow (from, to)
- unfollow (from, to)
*/
// add a user to the database (registration)
app.post("/register", (req, res) => {
    const { name, password } = req.body;
    User.findOne({ name: name }).exec()
        .then(async user => {
            if (user) {
                res.send({ message: "ERROR: A user with name " + name + " already exists." });
            } else {
                let id = 0;
                let foundNewID = false; // TODO: this is inefficient as shit lol
                do {
                    id++;
                    await User.findOne({ id: id }).exec()
                        .then(user => {
                            if (!user) foundNewID = true;
                        })
                } while (!foundNewID);
    
                const user = new User({
                    id,
                    name,
                    password,
                    following: [],
                    regDate: Date.now()
                });
                user.save()
                    .then(() => {
                        res.send({ message: name + " has been registered" });
                    })
                    .catch((err) => {
                        res.send("An error occurred: " + err);
                    });
            }
        })
})

// get all users (idk if we need this)
app.get("/users", (req, res) => {
    User.find().exec()
        .then((users) => {
            res.json(users);
        });
});

// get user by ID
app.get("/users/:i", (req, res) => {
    User.findOne({ id: req.params.i }).exec()
        .then((user) => {
            res.json(user);
        });
});

// add a new user to someone's following
app.post("/users/follow/:from/:to", (req, res) => {
    if (req.params.from === req.params.to) {
        res.send({ message: "ERROR: User cannot follow themselves." });
        return;
    }

    axios.get("http://localhost:5000/users/" + req.params.from)
        .then((fromUser) => {
            if (!fromUser.data) {
                res.send({ message: "ERROR: Invalid fromUser." });
                return;
            }

            axios.get("http://localhost:5000/users/" + req.params.to)
                .then((toUser) => {
                    if (!toUser.data) {
                        res.send({ message: "ERROR: Invalid toUser." });
                        return;
                    }

                    if (fromUser.data.following.includes(toUser.data.id)) {
                        res.send({ message: "ERROR: " + fromUser.data.name + " is already following " + toUser.data.name})
                        return;
                    }

                    User.updateOne({ id: req.params.from }, { following: [...fromUser.data.following, req.params.to] })
                        .then(() => {
                            res.send({ message: fromUser.data.name + " is now following " + toUser.data.name });
                        })
                })
        })
})

// add a new user to someone's following
app.post("/users/unfollow/:from/:to", (req, res) => {
    if (req.params.from === req.params.to) {
        res.send({ message: "ERROR: User cannot unfollow themselves." });
        return;
    }

    axios.get("http://localhost:5000/users/" + req.params.from)
        .then((fromUser) => {
            if (!fromUser.data) {
                res.send({ message: "ERROR: Invalid fromUser." });
                return;
            }

            axios.get("http://localhost:5000/users/" + req.params.to)
                .then((toUser) => {
                    if (!toUser.data) {
                        res.send({ message: "ERROR: Invalid toUser." });
                        return;
                    }

                    if (!fromUser.data.following.includes(toUser.data.id)) {
                        res.send({ message: "ERROR: " + fromUser.data.name + " is not following " + toUser.data.name})
                        return;
                    }

                    User.updateOne({ id: req.params.from }, { following: fromUser.data.following.filter(item => item != req.params.to) })
                        .then(() => {
                            res.send({ message: fromUser.data.name + " is no longer following " + toUser.data.name });
                        })
                })
        })
})

// == LOCATION ENDPOINTS ==
/*
- get all
- get by ID
*/
// get all locations
app.get("/locations", (req, res) => {
    Location.find().exec()
        .then((locations) => {
            res.json(locations);
        });
});

// get location by ID
app.get("/locations/:i", (req, res) => {
    Location.findOne({ id: req.params.i }).exec()
        .then((location) => {
            res.json(location);
        });
});

// == EVENT ENDPOINTS ==
/*
- get all
- get by user ID
*/
// get all events (idk if needed)
app.get("/events", (req, res) => {
    Event.find().exec()
        .then((events) => {
            res.json(events);
        });
});

// get events by user ID
app.get("/events/byuser/:uid", (req, res) => {
    Event.find({ userID: req.params.uid }).exec()
        .then((events) => {
            res.json(events);
        });
});

app.listen(port, () => {
    console.log('Server is now started');

    // const user = {
    //     name: 'prof_roosen',
    //     password: 'raspberrypis'
    // };
    // console.log('posting user');
    // axios.post("http://localhost:5000/register", user).then(res => {
    //     console.log(res.data.message);
    // })

    // axios.post("http://localhost:5000/users/unfollow/1/3").then(res => {
    //     console.log(res.data.message);
    // })

    let test;
    // test = new Location({
    //     id: 2,
    //     name: "Kalmar Nyckel",
    //     imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Kalmar_Nyckel_by_Jacob_H%C3%A4gg_cropped.jpg/1024px-Kalmar_Nyckel_by_Jacob_H%C3%A4gg_cropped.jpg",
    //     description: "A Swedish ship built by the Dutch famed for carrying Swedish settlers to North America. A replica of the ship is located in Wilmington!",
    //     location: "Wilmington, New Castle County, Delaware"
    // })
    // test.save()
    // test = new Event({
    //     userID: 1,
    //     locationID: 1,
    //     date: Date.now(),
    //     comments: "I visited Rehoboth Beach! :D"
    // });
    // test.save()
})