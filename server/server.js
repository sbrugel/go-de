const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const axios = require("axios"); // FOR TESTING PURPOSES ONLY

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

// models
const User = new mongoose.model("User", userSchema);

// TODO: endpoints
app.get("/hello", (req, res) => {
    res.json('Hello World!');
});

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
    User.find({ id: req.params.from }).exec()
        .then((fromUser) => {
            
        })
})

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
    axios.post("http://localhost:5000/users/follow/1/1").then(res => {
        console.log(res.data.message);
    })
})