import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const ErrorNotice = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }))


return (
  <div className="error-notice">
      <span>{props.message}</span>
      <Button onClick={props.clearError} color="secondary">CLEAR MESSAGE</Button>
  </div>
)
}


export default ErrorNotice