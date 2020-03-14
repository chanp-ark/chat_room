let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.get('/', (req,res) => {
    res.send('<h1>Hello World</h1>')
})

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('a user disconnected');
      });
});

http.listen(3001, () => console.log('listening on *:3001'))