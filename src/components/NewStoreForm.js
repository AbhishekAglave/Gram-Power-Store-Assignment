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
import { GpsFixed } from "@material-ui/icons";

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

// google api code start

const apiKey = "YOUR_API_KEY";
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

// load google map api js

function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

// const extractAddress = (place) => {
//   const address = {
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//     plain() {
//       const city = this.city ? this.city + ", " : "";
//       const zip = this.zip ? this.zip + ", " : "";
//       const state = this.state ? this.state + ", " : "";
//       return city + zip + state + this.country;
//     }
//   };

//   if (!Array.isArray(place?.address_components)) {
//     return address;
//   }

//   place.address_components.forEach((component) => {
//     const types = component.types;
//     const value = component.long_name;

//     if (types.includes("locality")) {
//       address.city = value;
//     }

//     if (types.includes("administrative_area_level_2")) {
//       address.state = value;
//     }

//     if (types.includes("postal_code")) {
//       address.zip = value;
//     }

//     if (types.includes("country")) {
//       address.country = value;
//     }
//   });
//   return address;
// };

// google api code end

export default function NewStoreForm(props) {
  const storeList = useContext(StoreListContext);
  const setStoreList = useContext(SetStoreListContext);

  // const [latitude, setLatitude] = useState();
  // const [longitude, setLongitude] = useState();

  const searchInput = useRef(null);
  const [address, setAddress] = useState({});

  const storeTitle = useRef(null);

  const [title, setTitle] = useState("");
  const [storeHrsMon, setStoreHrsMon] = useState({
    from: "",
    to: "Close",
  });
  const [storeHrsTue, setStoreHrsTue] = useState({
    from: "",
    to: "Close",
  });
  const [storeHrsWed, setStoreHrsWed] = useState({
    from: "",
    to: "Close",
  });
  const [storeHrsThu, setStoreHrsThu] = useState({
    from: "",
    to: "Close",
  });
  const [storeHrsFri, setStoreHrsFri] = useState({
    from: "",
    to: "Close",
  });
  const [storeHrsSat, setStoreHrsSat] = useState({
    from: "",
    to: "Close",
  });
  const [storeHrsSun, setStoreHrsSun] = useState({
    from: "",
    to: "Close",
  });
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");
  const [catergory1, setCatergory1] = useState("");
  const [catergory2, setCatergory2] = useState("");
  const [catergory3, setCatergory3] = useState("");
  const [coverLink, setCoverLink] = useState("");
  const [galleryLink1, setGalleryLink1] = useState("");
  const [galleryLink2, setGalleryLink2] = useState("");
  const [galleryLink3, setGalleryLink3] = useState("");
  const [successMsgClass, setSuccessMsgClass] = useState("hidden");
  const navigate = useNavigate();

  // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    setAddress(
      place.address_components[0].long_name +
        ", " +
        place.address_components[1].long_name +
        ", " +
        place.address_components[2].long_name +
        ", " +
        place.address_components[3].long_name +
        ", " +
        place.address_components[4].long_name
    );
    setLocation(
      place.address_components[0].long_name +
        ", " +
        place.address_components[1].long_name +
        ", " +
        place.address_components[2].long_name +
        ", " +
        place.address_components[3].long_name +
        ", " +
        place.address_components[4].long_name
    );
  };

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };

  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    searchInput.current.value = "Getting your location...";
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        console.log(place.formatted_address);
        const _address = place.formatted_address;
        setAddress(_address);
        setLocation(_address);
        searchInput.current.value = place.formatted_address;
      });
  };

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // setLatitude(position.coords.latitude);
        // setLongitude(position.coords.longitude);
        reverseGeocode(position.coords);
      });
    }
  };

  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
    // eslint-disable-next-line
  }, []);

  let storeId = localStorage.getItem("lastStoreId") || 3;
  function addStore(event) {
    event.preventDefault();
    storeId = Number(storeId);

    if (storeHrsMon.from !== "" && storeHrsMon.to === "Close")
      alert("Please choose closing time");
    if (storeHrsTue.from !== "" && storeHrsTue.to === "Close")
      alert("Please choose closing time");
    if (storeHrsWed.from !== "" && storeHrsWed.to === "Close")
      alert("Please choose closing time");
    if (storeHrsThu.from !== "" && storeHrsThu.to === "Close")
      alert("Please choose closing time");
    if (storeHrsFri.from !== "" && storeHrsFri.to === "Close")
      alert("Please choose closing time");
    if (storeHrsSat.from !== "" && storeHrsSat.to === "Close")
      alert("Please choose closing time");
    if (storeHrsSun.from !== "" && storeHrsSun.to === "Close")
      alert("Please choose closing time");

    const newStore = {
      id: storeId + 1,
      title: title,
      storeHrsMon: storeHrsMon,
      storeHrsTue: storeHrsTue,
      storeHrsWed: storeHrsWed,
      storeHrsThu: storeHrsThu,
      storeHrsFri: storeHrsFri,
      storeHrsSat: storeHrsSat,
      storeHrsSun: storeHrsSun,
      cover: coverLink,
      galleryImg1: galleryLink1,
      galleryImg2: galleryLink2,
      galleryImg3: galleryLink3,
      about: about,
      location: address,
      categories: {
        category1: catergory1,
        category2: catergory2,
        category3: catergory3,
      },
    };
    localStorage.setItem("lastStoreId", storeId + 1);
    setStoreList([...storeList, newStore]);
    setAbout("");
    setTitle("");
    setCatergory1("");
    setCatergory2("");
    setCatergory3("");
    setCoverLink("");
    setGalleryLink1("");
    setGalleryLink2("");
    setGalleryLink3("");
    setLocation("");
    setStoreHrsMon({
      from: "",
      to: "",
    });
    setStoreHrsTue({
      from: "",
      to: "",
    });
    setStoreHrsWed({
      from: "",
      to: "",
    });
    setStoreHrsThu({
      from: "",
      to: "",
    });
    setStoreHrsFri({
      from: "",
      to: "",
    });
    setStoreHrsSat({
      from: "",
      to: "",
    });
    setStoreHrsSun({
      from: "",
      to: "",
    });
    setSuccessMsgClass("success_msg");
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    localStorage.setItem("storeList", JSON.stringify(storeList));
    storeTitle.current.focus();
  }, [storeList]);

  function handleFocus() {
    searchInput.current.select();
  }

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
              ????
            </button>
          </Typography>

          <div>
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
              label={<GpsFixed onClick={findMyLocation} />}
              placeholder="Address..."
              className="textfield"
              onChange={(event) => {
                setLocation(event.target.value);
                setSuccessMsgClass("hidden");
              }}
              inputProps={{
                ref: searchInput,
              }}
              onFocus={handleFocus}
              value={location}
            />
          </div>
          <div>
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
              label="Product Category 1"
              className="textfield"
              onChange={(event) => {
                setCatergory1(event.target.value);
                setSuccessMsgClass("hidden");
              }}
              value={catergory1}
            />
          </div>
          <div>
            <TextField
              id="standard-error"
              label="Product Category 2"
              className="textfield"
              onChange={(event) => {
                setCatergory2(event.target.value);
                setSuccessMsgClass("hidden");
              }}
              value={catergory2}
            />
            <TextField
              id="standard-error"
              label="Product Category 3"
              className="textfield"
              onChange={(event) => {
                setCatergory3(event.target.value);
                setSuccessMsgClass("hidden");
              }}
              value={catergory3}
            />
          </div>

          <div>
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
              label="Gallery Link 1"
              className="textfield"
              onChange={(event) => {
                setGalleryLink1(event.target.value);
                setSuccessMsgClass("hidden");
              }}
              value={galleryLink1}
            />
          </div>
          <div>
            <TextField
              id="standard-error"
              label="Gallery Link 2"
              className="textfield"
              onChange={(event) => {
                setGalleryLink2(event.target.value);
                setSuccessMsgClass("hidden");
              }}
              value={galleryLink2}
            />

            <TextField
              id="standard-error"
              label="Gallery Link 3"
              className="textfield"
              onChange={(event) => {
                setGalleryLink3(event.target.value);
                setSuccessMsgClass("hidden");
              }}
              value={galleryLink3}
            />
          </div>
          <div className="time_section">
            <div className="time_field">
              <span className="day_label">Monday</span>
              <label>
                From:{" "}
                <input
                  type="time"
                  onChange={(event) => {
                    setStoreHrsMon({
                      from: event.target.value,
                      to: storeHrsMon.to,
                    });
                    setSuccessMsgClass("hidden");
                  }}
                  value={storeHrsMon.from}
                />
              </label>
              <label>
                To:{" "}
                <input
                  type="time"
                  onChange={(event) => {

                      setStoreHrsMon({
                        from: storeHrsMon.from,
                        to: event.target.value,
                      });
              
                    setSuccessMsgClass("hidden");
                  }}
                  value={storeHrsMon.to}
                />
              </label>
            </div>
            <div className="time_field">
              <span className="day_label">Tuesday</span>
              <label>
                From:{" "}
                <input
                  type="time"
                  onChange={(event) => {
                    setStoreHrsTue({
                      from: event.target.value,
                      to: storeHrsTue.to,
                    });
                    setSuccessMsgClass("hidden");
                  }}
                  value={storeHrsTue.from}
                />
              </label>
              <label>
                To:{" "}
                <input
                  type="time"
                  onChange={(event) => {

                      setStoreHrsTue({
                        from: storeHrsTue.from,
                        to: event.target.value,
                      });
                    
                    setSuccessMsgClass("hidden");
                  }}
                  value={storeHrsTue.to}
                />
              </label>
            </div>

            <div className="time_field">
              <span className="day_label">Wednesday</span>
              <label>
                From:{" "}
                <input
                  type="time"
                  onChange={(event) => {
                    setStoreHrsWed({
                      from: event.target.value,
                      to: storeHrsWed.to,
                    });
                    setSuccessMsgClass("hidden");
                  }}
                  value={storeHrsWed.from}
                />
              </label>
              <label>
                To:{" "}
                <input
                  type="time"
                  onChange={(event) => {

                      setStoreHrsWed({
                        from: storeHrsWed.from,
                        to: event.target.value,
                      });
                    
                    setSuccessMsgClass("hidden");
                  }}
                  value={storeHrsWed.to}
                />
              </label>
            </div>

            <div className="time_field">
              <span className="day_label">Thursday</span>
              <label>
                From:{" "}
                <input
                  type="time"
                  onChange={(event) => {
                    setStoreHrsThu({
                      from: event.target.value,
                      to: storeHrsThu.to,
                    });
                    setSuccessMsgClass("hidden");
                  }}
                  value={storeHrsThu.from}
                />
              </label>
              <label>
                To:{" "}
                <input
                  type="time"
                  onChange={(event) => {
 
                      setStoreHrsThu({
                        from: storeHrsThu.from,
                        to: event.target.value,
                      });
                    
                    setSuccessMsgClass("hidden");
                  }}
                  value={storeHrsThu.to}
                />
              </label>
            </div>

            <div className="time_field">
              <span className="day_label">Friday</span>
              <label>
                From:{" "}
                <input
                  type="time"
                  onChange={(event) => {
                    setStoreHrsFri({
                      from: event.target.value,
                      to: storeHrsFri.to,
                    });
                    setSuccessMsgClass("hidden");
                  }}
                  value={storeHrsFri.from}
                />
              </label>
              <label>
                To:{" "}
                <input
                  type="time"
                  onChange={(event) => {
    
                      setStoreHrsFri({
                        from: storeHrsFri.from,
                        to: event.target.value,
                      });
                    
                    setSuccessMsgClass("hidden");
                  }}
                  value={storeHrsFri.to}
                />
              </label>
            </div>

            <div className="time_field">
              <span className="day_label">Saturday</span>
              <label>
                From:{" "}
                <input
                  type="time"
                  onChange={(event) => {
                    setStoreHrsSat({
                      from: event.target.value,
                      to: storeHrsSat.to,
                    });
                    setSuccessMsgClass("hidden");
                  }}
                  value={storeHrsSat.from}
                />
              </label>
              <label>
                To:{" "}
                <input
                  type="time"
                  onChange={(event) => {
                    if (storeHrsSat.from === "") {
                      alert("Please choose opening time first");
                    } else {
                      setStoreHrsSat({
                        from: storeHrsSat.from,
                        to: event.target.value,
                      });
                    }
                    setSuccessMsgClass("hidden");
                  }}
                  value={storeHrsSat.to}
                />
              </label>
            </div>

            <div className="time_field">
              <span className="day_label">Sunday</span>
              <label>
                From:{" "}
                <input
                  type="time"
                  onChange={(event) => {
                    setStoreHrsSun({
                      from: event.target.value,
                      to: storeHrsSun.to,
                    });
                    setSuccessMsgClass("hidden");
                  }}
                  value={storeHrsSun.from}
                />
              </label>
              <label>
                To:{" "}
                <input
                  type="time"
                  onChange={(event) => {
                    if (storeHrsSun.from === "") {
                      alert("Please choose opening time first");
                    } else {
                      setStoreHrsSun({
                        from: storeHrsSun.from,
                        to: event.target.value,
                      });
                    }
                    setSuccessMsgClass("hidden");
                  }}
                  value={storeHrsSun.to}
                />
              </label>
            </div>
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
