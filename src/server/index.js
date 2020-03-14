let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.get('/', (req,res) => {
    res.send('<h1>Hello World</h1>')
})

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', msg => {
        console.log("message: " + JSON.stringify(msg));
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        console.log('a user disconnected');
      });
});

http.listen(3001, () => console.log('listening on *:3001'))


// 1. Client connection
// 2. Server listening
// 3. Emit from client
// 4. Broadcast from server
// 5. Client receive