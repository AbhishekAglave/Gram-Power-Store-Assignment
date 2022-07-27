import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "300px",
    height: "310px",
    marginTop: 80,
    padding: 10,
    "& .MuiTextField-root": {
      margin: theme.spacing(2, 0),
      width: "100%",
      height: "100%",
      "@media screen and (max-width: 992px)": {
        width: "100%",
        margin: theme.spacing(2, 0),
      },
    },
  },
}));

export default function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setLoginState = props.setLoginState;
  const [loginErrorClass, setLoginErrorClass] = useState("hidden");
  const classes = useStyles();

  function login(event) {
    event.preventDefault();
    const userName = "abhishek.aglave";
    const passWord = "8530080493";
    if (userName === username && passWord === password) {
      setLoginState("loggingIn");
      setTimeout(() => {
        setLoginState("loggedIn");
        window.scrollTo(0, 0);
      }, 1000);
    } else {
      setLoginErrorClass("error_msg");
    }
  }
  return (
    <Card className={classes.root}>
      <form onSubmit={login} autoComplete="off">
        <CardContent>
          <Typography variant="h5">Login</Typography>
          <Typography variant="caption" className={loginErrorClass}>
            You entered wrong credentials!
            <button
              type="reset"
              className="close"
              onClick={() => {
                setLoginErrorClass("hidden");
              }}
            >
              🗙
            </button>
          </Typography>
          <div className="login_fields">
            <TextField
              label="Username"
              className="textfield"
              required
              onChange={(event) => {
                setUsername(event.target.value);
                setLoginErrorClass("hidden");
              }}
              value={username}
              autoFocus
            />
            <TextField
              label="Password"
              type="password"
              className="textfield"
              required
              onChange={(event) => {
                setPassword(event.target.value);
                setLoginErrorClass("hidden");
              }}
              value={password}
            />
          </div>
        </CardContent>
        <CardActions className="form-actions">
          <Button
            style={{ marginTop: "10px" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}
