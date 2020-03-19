const express = require('express');
const app = express()
const mongoose = require('mongoose');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const groups = require('./routes/api/groups') // for routing to creating a new group after home page is set up

// Bodyparser Middleware
app.use(express.urlencoded({extended: true})); // content-type: application/x-www-form-urlencoded
app.use(express.json()); // content-type: application/json


// chat model
const Chat = require('./models/Chat')

// DB config
const dbURL = require("./config/keys").mongoURI;

// Connect to mongoDB
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(console.log("MongoDB connected..."))
    .catch(err => console.log(err)) 

io.on('connection', socket => {
    console.log("io opened sockets")
    Chat.find().sort({createdAt: -1}).limit(10).exec((err, messages) => {
        if (err) return console.error(err);
    
        // Send the last messages to the user.
        socket.emit('init', messages);
      })
    // listen to connected users for a new message
    socket.on('chat', msg => {
        // create a message with the content and the name of the user
        const chat = new Chat ({
            content: msg.content,
            name: msg.name
        })
        // save the message to the db
        chat.save(err => {
            if (err) return console.error(err)
        })
        
        // Notify all other users about a new message
        socket.broadcast.emit('push', msg)
    })
  
})


// Use Routes to group once home page is set up
    // app.use('/api/groups', groups)

 
const port = process.env.PORT || 3500

app.listen(port, ()=> console.log(`Server is listening at port ${port}`))

