const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb+srv://rest:abcd1234@cluster0.u9bglnq.mongodb.net/myDatabase');

const db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));


app.post("/sign_up", (req, res) => {
    const { name, age, email, phno, gender, password } = req.body; // Extract form data from the request body

    const data = {
        name,
        age,
        email,
        phno,
        gender,
        password
    };

    // Insert the data into the 'users' collection in MongoDB
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
        res.redirect('signup_successful.html'); // Redirect to a success page after insertion
    });
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
});
