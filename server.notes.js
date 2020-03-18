

mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) {
        throw err
    }
    console.log('Connected to MongoDB...')
})

// model - Schema from models folder
const Chat = require("./models/Chat")
const Group = require("./models/Group")

io.on('connection', socket => {
    console.log('user connected')
    Chat.find({}, (err, docs) => {
        if (err) throw err
        console.log('Sending old messages to check')
        socket.emit('load old msgs', docs)
    })
    
    socket.on('chat message', msg => {
        let newMsg = new Chat({msg: msg})
        console.log(newMsg)
        newMsg.save(err => {
            if (err) throw err
            io.emit('chat message')
        })
    })
    
    
    
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

/*
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
    if (err) {
        throw err
    } 
    console.log("MongoDb connected...")
    
    // connect to socket.io
    io.on('connection', socket => {
        let chat = db.collection('chats')
        
        // create function to send status
        const sendStatus = status => {
            socket.emit('status', status)
        }
        
        // get chats from mongo collection (this is the mongodb driver)
        chat.find().limit(100).sort({_id:1}).toArray((err, result)=> {
            if(err){
                throw err
            }
            // emit the messages
            socket.emit('output', result)
        })
        // handle input events
        socket.on('input', data => {
            let name = data.name;
            let message = data.message
            
            // check for name and message
            if (name === '' || message === '') {
                // send error status
                sendStatus('Please enter a name and message')
            } else {
                // insert message
                chat.insert({name: name, message: message}, () => {
                    clientInformation.emit('output', [data])
                    
                    // send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    })
                })
                console.log(chat)
            }
        })
    })
})
    */
    
    

/*
// using bodyParser
    // for app.use, it is usually route in first arg, and cb as second arg
        // app.use is intended for binding middleware to the app
    // if a cb is the only arg, it matches all routes
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// app.get is a part of Express' application routing
    // intended for matching and handling a specific route when requested with the GET http verb
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
*/
http.listen("3500", () => console.log('listening on *:3500'))


// 1. Client connection
// 2. Server listening
// 3. Emit from client
// 4. Broadcast from server
// 5. Client receive