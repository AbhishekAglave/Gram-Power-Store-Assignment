import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
    padding: 10,
    "& .MuiTypography-root": {
      margin: theme.spacing(1, 1),
      width: 380,
      height: "100%",
      "@media screen and (max-width: 992px)": {
        width: "100%",
        minWidth: "250px",
        margin: theme.spacing(0, 1),
      },
    },
  },
}));

export default function ViewContact(props) {
  const contactDetails = props.contactDetails;
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Typography variant="h5">
        <IconButton
          style={{ marginBottom: "4px" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        Contact Details
      </Typography>
      <Divider />
      <CardContent>
        <div className="name_inputs">
          <Typography className="textfield" variant="caption">
            Name
          </Typography>
          <Typography className="textfield" variant="subtitle1">
            {contactDetails.firstName + " " + contactDetails.lastName}
          </Typography>
        </div>
        <div className="mobile_email_inputs">
          {contactDetails.phone?<><Typography className="textfield" variant="caption">
            Phone
          </Typography>
          <Typography className="textfield" variant="subtitle1">
            <a
              style={{ textDecoration: "none" }}
              href={`tel:${contactDetails.phone}`}
            >
              {contactDetails.phone}
            </a>
          </Typography></>:null}

          {contactDetails.email?<><Typography className="textfield" variant="caption">
            Email
          </Typography>
          <Typography className="textfield" variant="subtitle1">
            <a
              style={{ textDecoration: "none" }}
              href={`mailto:${contactDetails.email}`}
            >
              {contactDetails.email}
            </a>
          </Typography></>:null}
        </div>
        <div className="company_titile_inputs">
          {contactDetails.company ? (
            <>
              <Typography className="textfield" variant="caption">
                Company / Institute
              </Typography>
              <Typography className="textfield" variant="subtitle1">
                {contactDetails.company}
              </Typography>
            </>
          ) : null}

          {contactDetails.title ? (
            <>
              <Typography className="textfield" variant="caption">
                Title / Role
              </Typography>
              <Typography className="textfield" variant="subtitle1">
                {contactDetails.title}
              </Typography>
            </>
          ) : null}
        </div>
      </CardContent>
      <CardActions className="form-actions">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/EditContact");
          }}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
