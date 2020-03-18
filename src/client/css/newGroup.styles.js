import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3,15),
        margin:"0.5em",
        minWidth: "100px",
        backgroundColor: "white"
        
      },
    textBox: {
        padding: theme.spacing(0,0),
        paddingBottom: "0.6em",
        fontSize: "1.5em",
        width: "60%",
    }  
    })
)

export {
    useStyles
}