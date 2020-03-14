import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { CTX } from './store.component'

// youtube video: 36:26


const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3,2),
      margin:"1em",
      
      minWidth: "500px",
      
    },
    content: {
        padding: "20px",
    },
    heading:{
        fontWeight: "500",
    },
    topic: {
        borderBottom: "1px solid grey",

        margin: "0",
    },
    flex: {
        display: "flex",
        alignItems: 'center',
    },
    userWindow: {
        width: '30%',
        height: '300px',
        borderRight: "1px solid grey",
    },
    chatWindow:{
        width: '70%',
        height: '300px',
        padding: '10px',
    },
    chatBox: {
        display: "flex",
        width: '85%',
        justifyContent: "flex-end",
        marginRight: "20px",
    },
    button: {
        width: '15%',
        margin: '0',
    },
    chip: {
        
    },
    
  }));

export default function Dashboard() {
    const classes = useStyles();
    
    // CTX store
    const [allChats] = React.useContext(CTX)
    const groups = Object.keys(allChats)
    
    // local state
    const [activeTopic, changeActiveTopic] = React.useState(groups[0])
    
    const [textValue, setTextValue] = React.useState('')
    
    return (
        <div className = {classes.root}>
            <Paper elevation={5} >
                <div className={classes.content}>
                <Typography className={classes.heading} variant="h5" gutterBottom>Chat Room Title</Typography>
                <Typography className={classes.topic} variant="subtitle2" gutterBottom>{activeTopic}</Typography>

                <div className={classes.flex}>
                    <div className={classes.userWindow}>
                        <List>
                            {/* mapping over data to display */}
                            {
                                groups.map(group=> (
                                    <ListItem onClick={e => changeActiveTopic(e.target.innerText) }key={group} button>
                                        <ListItemText primary={group} />
                                     </ListItem>
                                ))
                            }
                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        {
                            allChats[activeTopic].map((chat, i) => 
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
                    />
                    <Button 
                        className={classes.button}
                        variant="contained" 
                        color="primary">
                        Send
                    </Button>
                </div>
                </div>
            
            </Paper>
        </div>
    )
}


