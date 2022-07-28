import React, { useEffect, useState, useRef, useContext } from "react";
import TextField from "@material-ui/core/TextField";
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
import { StoreListContext } from "../App";
import { SetStoreListContext } from "../App";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
    padding: 10,
    "& .MuiTextField-root": {
      margin: theme.spacing(2, 1),
      width: 380,
      height: "100%",
      "@media screen and (max-width: 992px)": {
        width: "100%",
        margin: theme.spacing(1, 0),
      },
    },
  },
}));

export default function NewStoreForm(props) {
  const storeList = useContext(StoreListContext);
  const setStoreList = useContext(SetStoreListContext);

  const storeTitle = useRef(null);

  const [title, setTitle] = useState("");
  const [openHours, setOpenHours] = useState("");
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");
  const [products, setProducts] = useState("");
  const [toHours, setToHours] = useState("");
  const [coverLink, setCoverLink] = useState("");
  const [galleryLink, setGalleryLink] = useState("");
  const [successMsgClass, setSuccessMsgClass] = useState("hidden");
  const navigate = useNavigate();

  let storeId = localStorage.getItem("lastStoreId") || 3;
  function addStore(event) {
    event.preventDefault();

    // {
    //   id: 0,
    //   title: "Sample Store",
    //   storeHrs: {
    //     from: "11:30",
    //     to: "12:00",
    //   },
    //   about:
    //     "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor similique sit ullam cumque, commodi tempore consequatur facilis velit aspernatur! Laborum, sint nesciunt. Dolorum, saepe eaque dolor quisquam at aperiam repellat.",
    //   cover:
    //     "https://i.pinimg.com/originals/b6/c2/a7/b6c2a7bd8e80a91ea9b8d7734f8f91ce.jpg",
    //   galleryImg1: "https://mapio.net/images-p/2387932.jpg",
    //   galleryImg2: "https://mapio.net/images-p/2387932.jpg",
    //   galleryImg3: "https://mapio.net/images-p/2387932.jpg",
    //   categories: {
    //     category1: "category1",
    //     category2: "category2",
    //     category3: "category3",
    //     category4: "category4",
    //   },
    // },
    storeId = Number(storeId);
    const newStore = {
      id: storeId + 1,
      title: title,
      storeHrs: {
        from: openHours,
        to: toHours,
      },
      cover: coverLink,
      galleryImg1: galleryLink,
      galleryImg2: galleryLink,
      galleryImg3: galleryLink,
      about: about,
      location: location,
      categories: {
        category1: products,
        category2: products,
        category3: products,
        category4: products,
      },
    };
    console.log(newStore);
    localStorage.setItem("lastStoreId", storeId + 1);
    setStoreList([...storeList, newStore]);
    setSuccessMsgClass("success_msg");
  }

  useEffect(() => {
    localStorage.setItem("storeList", JSON.stringify(storeList));
    storeTitle.current.focus();
  }, [storeList]);

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <form onSubmit={addStore} autoComplete="off" className="newStoreForm">
        <Typography variant="h5">
          <IconButton
            style={{ marginBottom: "4px" }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          Add New Store
        </Typography>
        <Divider />
        <CardContent>
          <Typography className={successMsgClass}>
            Store added successfully
            <button
              type="reset"
              className="close"
              onClick={() => {
                setSuccessMsgClass("hidden");
              }}
            >
              🗙
            </button>
          </Typography>

          <div className="name_inputs">
            <TextField
              id="standard-error"
              label="Title"
              className="textfield"
              required
              onChange={(event) => {
                setTitle(event.target.value);
                setSuccessMsgClass("hidden");
              }}
              value={title}
              ref={storeTitle}
              autoFocus
            />
            <TextField
              id="standard-error"
              label="Products"
              className="textfield"
              onChange={(event) => {
                setProducts(event.target.value);
                setSuccessMsgClass("hidden");
              }}
              value={products}
            />
          </div>
          <div className="mobile_location_inputs">
            <TextField
              id="standard-error"
              label="About"
              className="textfield"
              onChange={(event) => {
                const about = event.target.value;
                setAbout(about);
                setSuccessMsgClass("hidden");
              }}
              value={about}
            />
            <TextField
              id="standard-error"
              label="Address"
              className="textfield"
              onChange={(event) => {
                setLocation(event.target.value);
                setSuccessMsgClass("hidden");
              }}
              value={location}
            />
          </div>
          <div className="products_title_inputs">
            <Typography>Open Hours :-</Typography>
            <TextField
              id="standard-error"
              label="From"
              className="textfield"
              type="time"
              onChange={(event) => {
                setOpenHours(event.target.value);
                setSuccessMsgClass("hidden");
              }}
              value={openHours}
            />

            <TextField
              id="standard-error"
              label="To"
              className="textfield"
              type="time"
              onChange={(event) => {
                setToHours(event.target.value);
                setSuccessMsgClass("hidden");
              }}
              value={toHours}
            />
          </div>

          <div className="image-inputs">
            <TextField
              id="standard-error"
              label="Cover Link"
              className="textfield"
              onChange={(event) => {
                setCoverLink(event.target.value);
                setSuccessMsgClass("hidden");
              }}
              value={coverLink}
            />

            <TextField
              id="standard-error"
              label="Gallery Link"
              className="textfield"
              onChange={(event) => {
                setGalleryLink(event.target.value);
                setSuccessMsgClass("hidden");
              }}
              value={galleryLink}
            />
          </div>
        </CardContent>
        <CardActions className="form-actions">
          <Button
            type="reset"
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(-1);
            }}
          >
            Discard
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}
