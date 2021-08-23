import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimpleAlerts( {type, msg, removeAlert} ) {
  const classes = useStyles();
   useEffect(() => {
      const timeout = setTimeout(() => {
         removeAlert()
      }, 3000)
      return () => clearTimeout(timeout)
   },[])
  return (
    <div className={classes.root}>
      <Alert severity={type} variant="filled">{msg}</Alert>
    </div>
  );
}

