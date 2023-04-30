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
- login
- get all
- get by ID
- follow (from, to)
- unfollow (from, to)
*/
// add a user to the database (registration)
    // takes in a name and password (both strings)
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

app.post("/login", (req, res) => {
    const { name, password } = req.body;
    User.findOne({ name: name }).exec()
        .then((user) => {
            if (user) {
                if (password === user.password) {
                    res.send({ message: "Login succeeded!", user: user });
                } else {
                    res.send({ message: "ERROR: Wrong credentials!" });
                }
            } else {
                res.send({ message: "ERROR: User doesn't exist!" });
            }
        })
})

// get all users
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
                            res.send({ message: "You are now following " + toUser.data.name });
                        })
                })
        })
})

// unfollow someone
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
                            res.send({ message: "You are no longer following " + toUser.data.name });
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
- add/post a new event
- get all
- get by user ID
*/
// add a new event
    // params are userID (int), locationID (int), date (Date), comments (string)
app.post("/newevent", (req, res) => {
    const { userID, locationID, date, comments } = req.body;
    const event = new Event({ userID, locationID, date, comments });

    event.save()
        .then(() => {
            res.send({ message: "Your activity has been posted!" });
        })
        .catch((err) => {
            res.send("An error occurred: " + err);
        });
})

// get all events
app.get("/events", (req, res) => {
    Event.find().exec()
        .then((events) => {
            res.json(events);
        });
});

// get event by location ID
app.get("/events/bylocation/:lid", (req, res) => {
    Event.find({ locationID: req.params.lid }).exec()
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
})