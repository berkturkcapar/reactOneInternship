import React, { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { createTheme, ThemeProvider, makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Switch from "@material-ui/core/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { MdDelete } from 'react-icons/md';
import { BiClipboard } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles({
  mleft: {
    marginLeft: "10px",
  },
  radioButtons: {
    marginTop: "-100px",
  },
  centeredText: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    fontFamily: "Oxygen, sans-serif",
    color: "#3F51B5"
  },
  box: {
    margin: "100px",
    display: "flex",
    justifyContent: "center",
  },
  tableBox: {
    maxWidth: "1400px"
  },
  outerBox: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "center",
  },
  innerBox: {
    margin: "20px",
  },
  buttonGroup: {
    marginRight: "25px",
    maxHeight: "50px"
  },
  button: {
    margin: "100px",
  },
  formControl: {
    minWidth: 120,
  },
  table: {
    minWidth: 650,
    backgroundColor: "#fafafa",
  },
});

const theme = createTheme();


theme.typography.h1 = {
  fontSize: "60px",
};

const Form = () => {
  const classes = useStyles();

  const [userName, setUserName] = useState("");
  const [surname, setSurname] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [isImperialUnit, setIsImperialUnit] = useState(false);
  const temp = JSON.parse(localStorage.getItem("usersInformation")) || [];
  const [rows, setRows] = useState(temp);
  const [isFilled, setIsFilled] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState(null);


  const switchRef = useRef();

  useEffect(() => {
    getCountries();
  }, []);


  const surnameHandler = (value) => {
    setSurname(value);
  };

  const userNameHandler = (value) => {
    setUserName(value);
  };

  const weightHandler = (value) => {
    setWeight(value);
  };

  const heightHandler = (value) => {
    setHeight(value);
  };

  const genderHandler = (value) => {
    setGender(value);
  };

  const unitHandler = () => {
    setIsImperialUnit((oldState) => !oldState);
  };

  const countryHandler = (value) => {
    setCountry(countries[value].countryName);
  };

  const getSwitchInfo = () => {
    console.log(switchRef);
  };


  const removeFromLS = (id) => {
    if (rows.length === 1) {
      clearLocalStorage();
      return;
    }
    var oldItems = JSON.parse(localStorage.getItem('usersInformation')) || [];
    oldItems = oldItems.filter((item) => item.id !== id);
    localStorage.setItem("usersInformation", JSON.stringify(oldItems));
    setRows(oldItems);
  };

  const submitHandler = () => {
    if (!isEditMode) {
      const userInfo = {
        userName, surname, country, gender, height, weight, isImperialUnit,
        id: new Date().getTime()
      };

      if (!userName || !surname) {
        setIsFilled(false);
        setTimeout(() => setIsFilled(true), 3000);
        return;
      }

      setIsFilled(true);
      var oldItems = JSON.parse(localStorage.getItem('usersInformation')) || [];
      oldItems.push(userInfo);
      localStorage.setItem("usersInformation", JSON.stringify(oldItems));
      setRows(oldItems);
    }

    if (isEditMode) {
      if (!userName || !surname) {
        setIsFilled(false);
        setTimeout(() => setIsFilled(true), 3000);
        return;
      }

      setIsFilled(true);

      const newRows = rows.map((row) => {
        if (row.id === editedItem.id) {
          return { id: row.id, userName, surname, country, gender, height, weight, isImperialUnit }
        }
        return row;
      })
      setRows(newRows)
      localStorage.clear();
      localStorage.setItem("usersInformation", JSON.stringify(newRows));
      setIsEditMode(false)
      setEditedItem(null)
    }
    setUserName("");
    setSurname("");
    setGender("");
    setWeight(0);
    setHeight(0);
    setCountry("");
    setIsImperialUnit(false)
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setRows([]);
  };

  const getCountries = () => {
    axios.get("https://countriesnow.space/api/v0.1/countries").then((res) => {
      const countryArr = res.data.data.map((countryItem, index) => {
        return { countryName: countryItem.country, id: index };
      });

      setCountries(countryArr);
    });
  };

  const copyToClipboard = (id) => {
    rows.map((row) => {
      if (row.id === id) {
        const kgOrLbs = row.isImperialUnit ? " lbs" : " kg";
        const cmOrInc = row.isImperialUnit ? " inc" : " cm";
        const item = "Name: " + row.userName + ", Surname: " + row.surname +
          ", Weight: " + row.weight + kgOrLbs + ", Height: " + row.height + cmOrInc + ", Country: " +
          row.country + ", Is Unit Imperial: " + row.isImperialUnit + ", Gender: " + row.gender;
        navigator.clipboard.writeText(item);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        return;
      }
    })
  };

  const editRow = (id) => {
    const itemToEdit = rows.find((item) => id === item.id);
    setUserName(itemToEdit.userName);
    setSurname(itemToEdit.surname)
    setCountry(itemToEdit.country)
    setGender(itemToEdit.gender)
    setHeight(itemToEdit.height)
    setWeight(itemToEdit.weight)
    setIsImperialUnit(itemToEdit.isImperialUnit)
    setIsEditMode(true)
    setEditedItem(itemToEdit)
  }

  return (
    <Box classes={classes.box}>
      <ThemeProvider theme={theme}>
        <Typography className={classes.centeredText} variant="h1">Basic Form</Typography>
      </ThemeProvider>
      <Box className={classes.outerBox}>
        <Box className={classes.innerBox}>
          <TextField
            required
            id="name-input"
            label="Name"
            variant="outlined"
            value={userName}
            onChange={(e) => userNameHandler(e.target.value)}
          />
        </Box>
        <Box className={classes.innerBox}>
          <TextField
            required
            id="surname-input"
            label="Surname"
            variant="outlined"
            value={surname}
            onChange={(e) => surnameHandler(e.target.value)}
          />
        </Box>
        <Box className={classes.innerBox}>
          <FormControl className={classes.formControl}>
            <InputLabel id="coutry-label">Country</InputLabel>
            <Select
              labelId="country-label"
              id="country-select"
              value={country}
              onChange={(e) => countryHandler(e.target.value)}
            >
              {countries.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.countryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box className={classes.outerBox}>
        <Box className={classes.innerBox}>
          <TextField
            label="Weight"
            type="number"
            id="weight-input"
            value={weight}
            onChange={(e) => weightHandler(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {isImperialUnit ? "Lbs" : "Kg"}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box className={classes.innerBox}>
          <TextField
            ref={switchRef}
            label="Height"
            id="height-input"
            value={height}
            type="number"
            onChange={(e) => heightHandler(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {isImperialUnit ? "Inc" : "Cm"}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box className={classes.innerBox}>
          <FormControlLabel
            control={
              <Switch
                checked={isImperialUnit}
                color="primary"
                onChange={() => unitHandler()}
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            }
            label="Is Unit Imperial"
            labelPlacement="top"
          />
        </Box>
      </Box>
      <Box className={classes.outerBox}>
        <Box className={classes.innerBox, classes.radioButtons}>
          <FormControl
            className={clsx(classes.buttonGroup, classes.button)}
            component="fieldset"
          >
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={gender}
              onChange={(e) => genderHandler(e.target.value)}
            >
              <FormControlLabel
                value="female"
                control={<Radio color="primary"/>}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio color="primary"/>} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio color="primary"/>}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
      <Box className={classes.outerBox}>
        <Box className={classes.innerBox}>
          <CustomButton
            buttonFunction={() => submitHandler()}
            buttonText={isEditMode ? "Edit" : "Submit"}
          ></CustomButton>
        </Box>
        <Box className={classes.innerBox}>
          <CustomButton
            buttonFunction={() => getSwitchInfo()}
            buttonText={"Get Ref Info"}
          ></CustomButton>
        </Box>

      </Box>
      <Box className={classes.centeredText}>
        {!isFilled ? <h3>You need to fill both name and surname</h3>: <h3> </h3>}
        {copied && <p className={classes.centeredText}>Copied to clipboard</p>}
      </Box>
      <Box className={classes.outerBox}>
        <Box className={classes.tableBox}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Surname</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Height</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Is Unit Imperial</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell align="right">Operations</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.userName}
                    </TableCell>
                    <TableCell>{row.surname}</TableCell>
                    <TableCell>{row.weight} {row.isImperialUnit ? "lbs" : "kg"}</TableCell>
                    <TableCell>{row.height} {row.isImperialUnit ? "inc" : "cm"}</TableCell>
                    <TableCell>{row.country}</TableCell>
                    <TableCell>{row.isImperialUnit ? "Yes" : "No"}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell align="right">
                      <Button variant="outlined" size="large" color="primary" onClick={() => editRow(row.id)}>
                        <AiOutlineEdit/>
                      </Button>
                      <Button variant="outlined" size="large" color="secondary" onClick={() => removeFromLS(row.id)}>
                        <MdDelete/>
                      </Button>
                      <Button variant="outlined" size="large" color="default" onClick={() => copyToClipboard(row.id)}>
                        <BiClipboard/>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Box className={classes.outerBox}>
        <Box className={classes.innerBox}>
          {rows.length !== 0 && <CustomButton
            buttonFunction={clearLocalStorage}
            buttonText={"Clear Local Storage"}
          ></CustomButton>}
        </Box>
      </Box>

    </Box>
  );
};

export default Form;
