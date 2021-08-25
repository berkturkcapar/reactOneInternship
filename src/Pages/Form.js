import React, { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  box: {
    margin: "10px",
  },
  outerBox: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "center"
  },
  innerBox: {
    margin: "25px",
  },
  buttonGroup: {
    marginRight: "25px",
  },
  button: {
    margin: "10px",
    marginRight: "90px"
  },
  formControl: {
    minWidth: "200px",
  },
  inputField: {
    minWidth: "150px",
  },
  leftBox: {
    width: "800px",
    float: "left",
  },
  rightBox: {
    marginTop: "50px",
    width: "400px",
    float: "right",
    display: "flex",
    justifyContent: "center"
  },
  table: {
    minWidth: 650,
    margin: "25px"
  },
  buttonBox: {
    marginLeft: "-70px",
  }
});

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
  const [users, setUsers] = useState([]);

  const switchRef = useRef();

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    const savedUserInfo = localStorage.getItem("userInformation");
    JSON.parse(savedUserInfo)?.isImperialUnit &&
      setIsImperialUnit(JSON.parse(savedUserInfo).isImperialUnit);
  }, []);

  useEffect(() => {
    const usersData = localStorage.getItem("userData");
    JSON.parse(usersData)?.users &&
    setUsers(JSON.parse(usersData).users);
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
    setCountry(value);
  };

  const getSwitchInfo = () => {
    console.log(switchRef);
  };

  const clearData = () => {
    const updatedUsers = [];
    setUsers(updatedUsers);
    localStorage.setItem("userData", JSON.stringify(updatedUsers));
  }

  const submitHandler = () => {
    const userInfo = {
      userName,
      surname,
      country,
      weight,
      height,
      gender,
      isImperialUnit,
    };

    const updatedUsers = [...users, userInfo];
    setUsers(updatedUsers);
    const currentUsers = JSON.stringify(updatedUsers);
    const stringUserInfo = JSON.stringify(userInfo);
    localStorage.setItem("userInformation", stringUserInfo);
    localStorage.setItem("userData", currentUsers);
  };

  const getCountries = () => {
    axios.get("https://countriesnow.space/api/v0.1/countries").then((res) => {
      const countryArr = res.data.data.map((countryItem, index) => {
        return { countryName: countryItem.country, id: index };
      });
      setCountries(countryArr);
    });
  };

  return (
    <Box className={classes.box}>
      <Box className={classes.leftBox}>
        <Box className={classes.outerBox}>
        <Box className={classes.innerBox}>
          <TextField className={classes.inputField}
            id="name-input"
            label="Name"
            variant="outlined"
            onChange={(e) => userNameHandler(e.target.value)}
          />
        </Box>
        <Box className={classes.innerBox}>
          <TextField className={classes.inputField}
            required
            id="surname-input"
            label="Surname"
            variant="outlined"
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
          <TextField className={classes.inputField}
            label="Weight"
            type="number"
            id="weight-input"
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
          <TextField className={classes.inputField}
            ref={switchRef}
            label="Height"
            id="height-input"
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
      </Box>
      <Box className={classes.rightBox}>
          <Box className={classes.innerBox}>
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
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box className={classes.buttonBox}>
            <Box className={classes.innerBox}>
            <CustomButton
              buttonFunction={() => submitHandler()}
              buttonText={"Submit"}
            ></CustomButton>
          </Box>
          <Box className={classes.innerBox}>
            <CustomButton
              buttonFunction={() => getSwitchInfo()}
              buttonText={"Get Ref Info"}
            ></CustomButton>
          </Box>
          <Box className={classes.innerBox}>
            <CustomButton
              buttonFunction={() => clearData()}
              buttonText={"Clear"}
            ></CustomButton>
          </Box>
        </Box>
        </Box>
      <Box>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Surname</TableCell>
            <TableCell align="left">Country</TableCell>
            <TableCell align="left">Weight</TableCell>
            <TableCell align="left">Height</TableCell>
            <TableCell align="left">Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow>
              <TableCell align="left">{user.userName}</TableCell>
              <TableCell align="left">{user.surname}</TableCell>
              <TableCell align="left">{countries[user.country].countryName}</TableCell>
              <TableCell align="left">{user.weight + (user.isImperialUnit ? "(lbs)":"(kg)")}</TableCell>
              <TableCell align="left">{user.height + (user.isImperialUnit ? "(inch)":"(cm)")}</TableCell>
              <TableCell align="left">{user.gender}</TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
    </Box>
  );
};

export default Form;
