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
import CustomTable from "../components/CustomTable";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  mainContainer: {
    padding: "30px",
  },
  paper: { padding: "30px" },

  formControl: {
    width: "max",
  },
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
  const [usersData, setUsersData] = useState([]);
  const [alertSuccessOpen, setAlertSuccessOpen] = useState(false);
  const [alertFailOpen, setAlertFailOpen] = useState(false);

  const switchRef = useRef();

  useEffect(() => {
    getCountries();
    if (localStorage.getItem("userData")) {
      setUsersData(JSON.parse(localStorage.getItem("userData")));
    }
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

  const submitHandler = () => {
    if (
      userName === "" ||
      surname === "" ||
      gender === "" ||
      country === "" ||
      weight <= 0 ||
      height <= 0
    )
      setAlertFailOpen(true);
    else {
      const userCountry = countries[country].countryName;
      const userWeight = isImperialUnit
        ? parseFloat((weight * 0.45359237).toPrecision(2))
        : weight;
      const userHeight = isImperialUnit
        ? parseFloat((height * 2.54).toPrecision(2))
        : height;

      const userInfo = {
        surname,
        weight: userWeight,
        height: userHeight,
        userName,
        gender,
        country: userCountry,
      };

      const usersData = localStorage.getItem("userData");
      let newUsersData;
      if (usersData) {
        newUsersData = JSON.parse(usersData);
        userInfo.id = newUsersData.length + 1;
        newUsersData.push(userInfo);
      } else {
        newUsersData = [];
        userInfo.id = 1;
        newUsersData.push(userInfo);
      }

      setUsersData(newUsersData);
      const json = JSON.stringify(newUsersData);
      localStorage.setItem("userData", json);

      setAlertSuccessOpen(true);
    }
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
    <>
      <Grid container>
        <Grid item xs={4}>
          <Container
            component="main"
            maxWidth="xs"
            className={classes.mainContainer}
          >
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="name-input"
                    label="Name"
                    variant="outlined"
                    onChange={(e) => userNameHandler(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="surname-input"
                    label="Surname"
                    variant="outlined"
                    onChange={(e) => surnameHandler(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
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
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
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
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
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
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isImperialUnit}
                        onChange={() => unitHandler()}
                        name="checkedA"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    }
                    label={isImperialUnit ? "Imperial" : "Metric"}
                    labelPlacement="top"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    required
                    className={clsx(classes.buttonGroup, classes.button)}
                    component="fieldset"
                  >
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      row
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
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <CustomButton
                    buttonFunction={() => submitHandler()}
                    buttonText={"Submit"}
                  ></CustomButton>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Grid>
        <Grid item xs={8} className={classes.mainContainer}>
          <CustomTable
            tableData={usersData}
            isImperialUnit={isImperialUnit}
            setUsersData={setUsersData}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={alertSuccessOpen}
        autoHideDuration={6000}
        onClose={() => {
          setAlertSuccessOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setAlertSuccessOpen(false);
          }}
          severity="success"
        >
          User successfully added to the table.
        </Alert>
      </Snackbar>
      <Snackbar
        open={alertFailOpen}
        autoHideDuration={6000}
        onClose={() => {
          setAlertFailOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setAlertFailOpen(false);
          }}
          severity="error"
        >
          Please fill all input areas.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Form;
