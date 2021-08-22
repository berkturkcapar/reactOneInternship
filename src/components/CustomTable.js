import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({});

const CustomTable = ({ tableData }) => {
  return (
    <TableContainer component={Paper}>
      <Table className="classes.table" aria-label="User table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Height</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Country</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.surname}</TableCell>
                <TableCell>{user.weight}</TableCell>
                <TableCell>{user.height}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.country}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
