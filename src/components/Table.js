import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles({
  table: {
    minWidth:  1600,
    background: "#63c5da",
  },
  table_cell: {
    width: "25px"
  },
  button: {
    "&:hover": {
      background: "green",
    },
  }
});

export default function BasicTable( {people, clearItem, editItem, copyItem} ) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Surname</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Weight</TableCell>
            <TableCell align="right">Height</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">isImperialUnit</TableCell>
            <TableCell align="center">Buttons</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {people.map((person) => {
               return (
                  <TableRow key = {person.id}>
                     <TableCell className = {classes.table_cell} component="th" scope="row">
                        {person.userName}
                     </TableCell>
                     <TableCell align="left">{person.surname}</TableCell>
                     <TableCell align="left">{person.country}</TableCell>
                     <TableCell align="right">{person.weight}{person.isImperialUnit ? " lbs" : " kg"}</TableCell>
                     <TableCell align="right">{person.height}{person.isImperialUnit ? " inch" : " cm"}</TableCell>
                     <TableCell align="right">{person.gender}</TableCell>
                     <TableCell align="right">{person.isImperialUnit ? "yes" : "no"}</TableCell>
                     <TableCell align = "center">
                        <ButtonGroup color = "secondary" variant = "contained">
                           <Button startIcon = {<EditIcon/>} onClick = {() => editItem(person.id)} className = {classes.button}>Edit</Button>
                           <Button startIcon = {<FileCopyIcon/>} onClick = {() => copyItem(person.id)} className = {classes.button}>Copy to Clipboard</Button>
                           <Button startIcon = {<DeleteIcon/>} onClick = {() => clearItem(person.id)} className = {classes.button}>Delete</Button>
                        </ButtonGroup>
                     </TableCell>
                  </TableRow>
               );
           })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}