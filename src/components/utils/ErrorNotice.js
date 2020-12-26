import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';


const ErrorNotice = (props) => {
  
  
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
const classes = useStyles();
return ( 
  <div className={classes.root}>
      <Alert severity="error"  ><span>{props.message}</span></Alert>
  </div>
  
)
}


export default ErrorNotice