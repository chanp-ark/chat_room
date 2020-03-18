import React from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import { useStyles } from './css/newGroup.styles'

const NewGroup = () => {
    const classes= useStyles()
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
                            
                        }
                    }}
                    
                />
            </Paper>
        </div>
    )

}

export default NewGroup