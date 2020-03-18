import React from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import { useStyles } from './css/newGroup.styles'

const NewGroup = () => {
    
    const classes= useStyles()
    
    // database
    const dbURL = require("../server/config/keys")
    fetch(dbURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(err => console.error("Error:", err))
    
    return(
        <div className={classes.root}>
            <Paper elevation={2}>
                <TextField 
                    className={classes.textBox} 
                    id="standard-basic" 
                    label="Enter New Group"
                    onKeyPress={e => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            console.log(e.target.value)
                        }
                    }}
                    
                />
            </Paper>
        </div>
    )

}

export default NewGroup