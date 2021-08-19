import React from "react";
import Button from "@material-ui/core/Button";

const CustomButton = (props) => (
  <Button variant="contained" color="primary" onClick={props.buttonFunction}>
    {props.buttonText}
  </Button>
);

export default CustomButton;
