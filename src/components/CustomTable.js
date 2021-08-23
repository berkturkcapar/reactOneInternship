import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import CustomButton from "./CustomButton";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({});

const CustomTable = ({ tableData, isImperialUnit, setUsersData }) => {
  const weightHandler = (weight, isImperialUnit) => {
    const converter = 2.20462262185;
    if (isImperialUnit) return (weight * converter).toFixed(2);
    else return weight;
  };
  const heightHandler = (height, isImperialUnit) => {
    const converter = 0.393700787;
    if (isImperialUnit) return (height * converter).toFixed(2);
    else return height;
  };

  return (
    <TableContainer component={Paper}>
      <Table className="classes.table" aria-label="User table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Weight ({isImperialUnit ? "Lbs" : "Kg"})</TableCell>
            <TableCell>Height ({isImperialUnit ? "Inc" : "Cm"})</TableCell>
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
                <TableCell>
                  {weightHandler(user.weight, isImperialUnit)}
                </TableCell>
                <TableCell>
                  {heightHandler(user.height, isImperialUnit)}
                </TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.country}</TableCell>
              </TableRow>
            );
          })}
          {tableData.length > 0 ? (
            <TableRow>
              <Box p={2}>
                <CustomButton
                  buttonFunction={() => {
                    localStorage.clear();
                    setUsersData([]);
                  }}
                  buttonText={"Clear Table"}
                ></CustomButton>
              </Box>
            </TableRow>
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
