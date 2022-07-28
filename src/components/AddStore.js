import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function AddButton() {
  const classes = useStyles();
  return (
    <Link to='/AddNewStore' className="add_button" style={{ textDecoration: 'none' }}>
      <div className={classes.root}>
        <Button variant="contained" color="primary">
          Add New Store
        </Button>
      </div>
    </Link>
  );
}
