const express = require('express');
const app = express()
const mongoose = require('mongoose');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const groups = require('./routes/api/groups')

// Bodyparser Middleware
app.use(express.urlencoded({extended: true})); // content-type: application/x-www-form-urlencoded
app.use(express.json()); // content-type: application/json



// DB config
const dbURL = require("./config/keys").mongoURI;

// Connect to mongoDB
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(console.log("MongoDB connected..."))
    .catch(err => console.log(err)) 


// Use Routes
app.use('/api/groups', groups)
 
const port = process.env.PORT || 3500

app.listen(port, ()=> console.log(`Server is listening at port ${port}`))

