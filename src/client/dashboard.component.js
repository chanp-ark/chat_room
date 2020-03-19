import React from 'react'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import io from 'socket.io-client'
import "isomorphic-fetch" // to use fetch

import NewGroup from "./newGroup.component"
import { useStyles } from "./css/dashboard.styles"

export default function Dashboard() {
    
    // style
    const classes = useStyles();
    
    // get initial State from db
    const initialState = {
        group1: [
            
        ],
        group2: [
            
        ]
    }
    
    const dbURL = require("../server/config/keys")
    fetch(dbURL)
        .then(response => {
            if (response.status >= 400) throw new Error("bad response")
            return response.json()
        })
        .then(data => console.log('Success:', data))
        .catch(err => console.error("Error:", err))
        
    // initialize socket
    let socket;
    if (!socket) {
        socket = io.connect('http://localhost/')
        socket.on('connection', msg => {
            console.log(msg)
        })
    }
    const sendChatAction = (value) => {
        socket.emit('chat', value)
        console.log(value)
    }
    
    // get all groups
    const [allGroups, updateAllGroups] = React.useState(initialState)
    
    // get active group 
    const [activeGroup, changeActiveGroup] = React.useState(initialState[0])
    
    // for outbound chat box
    const [textValue, setTextValue] = React.useState('')
    
    
    return (
        <div className = {classes.root}>
            <Paper elevation={5} >
                <div className={classes.content}>
                    {/* Group Name */}
                    <Typography className={classes.heading} variant="h5" gutterBottom>Chat App</Typography>
                    {/* Group */}
                    <Typography className={classes.group} variant="subtitle2" gutterBottom>{activeGroup}</Typography>

                    <div className={classes.flex}>
                        <div className={classes.userWindow}>
                            <List>
                                {/* map over groups to display*/}
                                {// commented out because it can't connect
                                    // allGroups.map(group=> (
                                    //     <ListItem onClick={e => changeActiveGroup(e.target.innerText)} key={group} button>
                                    //         <ListItemText primary={group} />
                                    //     </ListItem>
                                    // ))
                                }
                            </List>
                        </div>
                        <div className={classes.chatWindow}>
                            {/* display chat from mongoLab */}
                            {/* {
                                allChats[activeGroup].map((chat, i) => 
                                    <div className={classes.flex} key={i}>
                                        <Chip label={chat.from} className={classes.chip} />
                                        <Typography variant='body1' gutterBottom>{chat.msg}</Typography>
                                    </div>
                                    )
                            }
                             */}
                        </div>
                        
                    </div>
                    <div className={classes.flex}>
                        <TextField 
                            label="Send a chat" 
                            className={classes.chatBox}    
                            value={textValue}
                            onChange={e => setTextValue(e.target.value)}
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    sendChatAction({msg: textValue, group: activeGroup})
                                    // save chat into db
                                    setTextValue('')
                                }
                            }}
                        />
                        <Button 
                            className={classes.button}
                            variant="contained" 
                            color="primary"
                            onClick={() => {
                                sendChatAction({msg: textValue, group: activeGroup})
                                // save chat into db
                                setTextValue('')
                                
                            }}
                            >
                            Send
                        </Button>
                    </div>
                </div>
            
            </Paper>
            <NewGroup />

        </div>
    )
}


