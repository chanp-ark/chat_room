import { makeStyles } from '@material-ui/core/styles'


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
      group: {
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
    })
)

export {
    useStyles
}