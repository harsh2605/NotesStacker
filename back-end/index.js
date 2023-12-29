const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors=require("cors");
app.use(cors());
app.use(express.json());

app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));
mongoose.connect('mongodb://127.0.0.1:27017/notestacker')
    .then(() => {
        console.log("Connected to mongoDB database");
    }).catch((err) => {
        console.log(err);
    })
app.listen(5000,() => {
    console.log("Listening to port 5000")
});
