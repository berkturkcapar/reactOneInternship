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
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Table from "../components/Table";
import ClearAllIcon from '@material-ui/icons/ClearAll';
import Alert from "../components/Alert";

document.body.style = 'background: #faf9d5;';

const useStyles = makeStyles({
  box: {
    paddingTop: "25px",
    margin: "0 auto",
  },

  outerBox: {
    width: "1800px",
    margin: "0 auto",
  },

  innerBox: {
    width: "1600px",
    margin: "0 auto",
  },

  header: {
    margin: "0 auto",
  },

  content: {
    margin: "0 auto",
  },

  content_top: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "space-evenly",
  },
  
  content_center: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "space-evenly",
  },

  content_bottom: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "center",
  },

  footer: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "space-evenly",
  },

  table: {
    marginTop: "25px",
    margin: "0 auto",
    marginBottom: "25px",
    display: "flex",
    justifyContent: "center",
  },

  button: {
    "&:hover": {
      background: "green",
    },
  },
});

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list)
    return JSON.parse(localStorage.getItem("list"));
  else 
    return [];
}

const Form = () => {
  const classes = useStyles();

  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({show: false, msg: "", type: ""});

  const [userName, setUserName] = useState("");
  const [surname, setSurname] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [isImperialUnit, setIsImperialUnit] = useState(false);

  const switchRef = useRef();

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list])
/*
  useEffect(() => {
    const savedUserInfo = localStorage.getItem("userInformation");
    JSON.parse(savedUserInfo)?.isImperialUnit &&
      setIsImperialUnit(JSON.parse(savedUserInfo).isImperialUnit);
  }, []);*/

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

  const submitHandler = () => {
    
    if ( userName && surname && height >= 0 && weight >= 0 ) {
      if ( isEditing ) {
        setList(list.map((item) => {
          if (item.id === editId) {
            return {...item, userName, surname, 
                            country, weight, 
                            height, gender, 
                            isImperialUnit}
          }
          return item;
        }));
        setIsEditing(false);
        setEditId(null);
        setUserName("");
        setSurname("");
        setCountry("");
        setWeight(0);
        setHeight(0);
        setIsImperialUnit(false);
        setGender("");
        setAlert({show: true, type: "success", msg: "Person is edited"});
      }
      else {
        const userInfo = {
          id: new Date().getTime().toString(),
          userName,
          surname,
          country,
          weight,
          height,
          gender,
          isImperialUnit,
        };

        setList([...list, userInfo]);
        setUserName("");
        setSurname("");
        setCountry("");
        setWeight(0);
        setHeight(0);
        setIsImperialUnit(false);
        setGender("");
        const stringUserInfo = JSON.stringify(userInfo);
        localStorage.setItem("userInformation", stringUserInfo);
        setAlert({show: true, type: "success", msg: "Person is added successfuly"});
      }
    }
    else {
      showAlert(true, "error", "Invalid Data");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({show, type, msg});
  }

  const getCountries = () => {
    axios.get("https://countriesnow.space/api/v0.1/countries").then((res) => {
      const countryArr = res.data.data.map((countryItem, index) => {
        return { countryName: countryItem.country, id: index };
      });

      setCountries(countryArr);
    });
  };

  const clearAll = () => {
    showAlert(true, "info", "All people are deleted");
    setList([]);
  }

  const clearItem  = (id) => {
    showAlert(true, "info", "Person is deleted");
    setList( list.filter((item) => item.id !== id));
  }

  const copyToClipboard = (id) => {
    showAlert(true, "info", "Copied to Clipboard");
    const copy = list.find((item) => item.id === id);
    navigator.clipboard.writeText(copy.userName + ", " + copy.surname + ", " + copy.country + ", " +
    copy.weight + ", " + copy.height + ", " + copy.isImperialUnit + ", " + copy.gender);
  }

  const editItem = (id) => {
    const edittedItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setUserName(edittedItem.userName);
    setSurname(edittedItem.surname);
    setCountry(edittedItem.country);
    setWeight(edittedItem.weight);
    setHeight(edittedItem.height);
    setIsImperialUnit(edittedItem.isImperialUnit);
    setGender(edittedItem.gender);
  }

  

  return (
    <Box className = {classes.box}>
      <Box className = {classes.outerBox}>
        <Box className = {clsx(classes.innerBox, classes.header)}>
          <h1 style = {{display: "flex", justifyContent: "center"}}>Form</h1>
          <div style = {{marginTop: "20px",}}>
            {alert.show && <Alert {...alert} removeAlert ={showAlert}/>}
          </div>
        </Box>

        <Box className = {clsx(classes.innerBox, classes.content)}>
          <Box className = {classes.content_top}>
            <TextField
              id="name-input"
              label="Name"
              variant="outlined"
              value = {userName}
              onChange={(e) => userNameHandler(e.target.value)}
            />
            <TextField
              required
              id="surname-input"
              label="Surname"
              variant="outlined"
              value = {surname}
              onChange={(e) => surnameHandler(e.target.value)}
            />
            <FormControl className={classes.formControl} style = {{width: "20%"}}>
              <InputLabel id="coutry-label">Country</InputLabel>
              <Select
                labelId="country-label"
                id="country-select"
                value={country}
                onChange={(e) => countryHandler(e.target.value)}
              >
                {countries.map((item) => (
                  <MenuItem key={item.id} value={item.countryName}>
                    {item.countryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box className = {classes.content_center}>
            <TextField
              label="Weight"
              type="number"
              id="weight-input"
              value = {weight}
              onChange={(e) => weightHandler(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {isImperialUnit ? "Lbs" : "Kg"}
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              ref={switchRef}
              label="Height"
              id="height-input"
              type="number"
              value = {height}
              onChange={(e) => heightHandler(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {isImperialUnit ? "Inch" : "Cm"}
                  </InputAdornment>
                ),
              }}
            />
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
          <Box className = {classes.content_bottom}>
            <FormControl
              className={clsx(classes.buttonGroup)}
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
                <FormControlLabel value="Boeing AH-64 Apache" control={<Radio />} label="Boeing AH-64 Apache" />
                <FormControlLabel
                  value="Leopard 2A7"
                  control={<Radio />}
                  label="Leopard 2A7"
                />
                <FormControlLabel
                  value="Agent"
                  control={<Radio />}
                  label="Agent"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
        <Box className = {clsx(classes.innerBox, classes.footer)}>
            <Button className = {classes.button} onClick = {() => submitHandler()} variant = "contained" color = "secondary">
              {isEditing ? "Edit" : "Submit"}
            </Button>
            <Button className = {classes.button} onClick = {() => getSwitchInfo()} variant = "contained" color = "secondary">Get Ref Info</Button>
        </Box>
        <Box className = {classes.table} style = {{width: 1200}}>
          { list.length > 0 && (
            <Box className={classes.innerBox}>
              <Table people = {list} clearItem = {clearItem} editItem = {editItem} copyItem = {copyToClipboard}></Table>
              <Button
                className = {classes.button} 
                onClick = {clearAll} 
                startIcon = {<ClearAllIcon/>} 
                color = "secondary" 
                variant = "contained" 
                style = {{display: "flex",justifyContent: "center", margin: "0 auto", marginTop: "10px"}}
              >
                Clear All
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
