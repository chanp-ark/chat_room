import React from 'react'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import NewGroup from "./newGroup.component"
import { useStyles } from "./css/dashboard.styles"
import { CTX } from './store.component'

export default function Dashboard() {
    const classes = useStyles();
    
    // CTX pulling props out from store
    const {allChats, sendChatAction, user} = React.useContext(CTX)
    const groups = Object.keys(allChats)
    
    // local state
    const [activeGroup, changeActiveGroup] = React.useState(groups[0])
    
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
                                {/* map over users to display*/}
                                {
                                    groups.map(group=> (
                                        <ListItem onClick={e => changeActiveGroup(e.target.innerText) }key={group} button>
                                            <ListItemText primary={group} />
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </div>
                        <div className={classes.chatWindow}>
                            {/* display chat from mongoLab */}
                            {
                                allChats[activeGroup].map((chat, i) => 
                                    <div className={classes.flex} key={i}>
                                        <Chip label={chat.from} className={classes.chip} />
                                        <Typography variant='body1' gutterBottom>{chat.msg}</Typography>
                                    </div>
                                    )
                            }
                            
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
                                    sendChatAction({from: user, msg: textValue, group: activeGroup})
                                    setTextValue('')
                                }
                            }}
                        />
                        <Button 
                            className={classes.button}
                            variant="contained" 
                            color="primary"
                            onClick={() => {
                                sendChatAction({from: user, msg: textValue, group: activeGroup})
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


