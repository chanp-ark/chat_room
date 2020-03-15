const express = require('express')
let app = express();
let http = require('http').createServer(app);
const path = require('path')
let io = require('socket.io')(http);

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

const Message = require('./message');
const mongoose = require('mongoose');

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

io.on('connection', socket => {
    
    // Get the last 10 messages from the database
    Message.find().sort({createdAt: -1}).limit(10).exec((err, messages) => {
        if (err) return console.error(err);
    
        // Send the last messages to the user.
        socket.emit('init', messages);
      });
    
    // Listen to the connected users for a new message
    socket.on('chat message', msg => {
        console.log("message: " + JSON.stringify(msg));
        const message = new Message({
            content: msg.content,
            name: msg.name,
        })
        
        // save the message to the database
        message.save(err => {
            if (err) return console.error(err)
        })
        
        // Notify all users about a new message
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        console.log('a user disconnected');
      });
});

http.listen(port, () => console.log('listening on *' + port))

// 1. Client connection
// 2. Server listening
// 3. Emit from client
// 4. Broadcast from server
// 5. Client receive