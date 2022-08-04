import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useNavigate } from "react-router-dom";

function ViewStore(props) {
  const [center, setCenter] = useState();
  const address = props.storeDetails.location;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatLng = () => {
      geocodeByAddress(address)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => setCenter(latLng))
        .catch((error) => console.error("Error", error));
    };
    fetchLatLng();
  }, [address]);
  console.log(center);

  let defaultProps = {
    center: center,
    zoom: 11,
  };

  return (
    <>
      <h1 className="store_title">
        <IconButton
          style={{ marginBottom: "4px" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        {props.storeDetails.title}
      </h1>
      <div className="store_details_container">
        <img
          className="cover_img"
          src={props.storeDetails.cover}
          alt="cover-img"
        />
        <div className="photo_gallery">
          <img src={props.storeDetails.galleryImg1} alt="img1" />
          <img src={props.storeDetails.galleryImg2} alt="img2" />
          <img src={props.storeDetails.galleryImg3} alt="img3" />
        </div>
        <div className="store_hours">
          <h4>Shope Hours</h4>
          <p>
            Monday: {props.storeDetails.storeHrsMon.from} -{" "}
            {props.storeDetails.storeHrsMon.to}
          </p>
          <p>
            Tuesday: {props.storeDetails.storeHrsTue.from} -{" "}
            {props.storeDetails.storeHrsTue.to}
          </p>
          <p>
            Wednesday: {props.storeDetails.storeHrsWed.from} -{" "}
            {props.storeDetails.storeHrsWed.to}
          </p>
          <p>
            Thursday: {props.storeDetails.storeHrsThu.from} -{" "}
            {props.storeDetails.storeHrsThu.to}
          </p>
          <p>
            Friday: {props.storeDetails.storeHrsFri.from} -{" "}
            {props.storeDetails.storeHrsFri.to}
          </p>
          <p>
            Saturday: {props.storeDetails.storeHrsSat.from} -{" "}
            {props.storeDetails.storeHrsSat.to}
          </p>
          <p>
            Sunday: {props.storeDetails.storeHrsSun.from} -{" "}
            {props.storeDetails.storeHrsSun.to}
          </p>
        </div>
        <div className="about_us">
          <h4>About Us</h4>
          <p>{props.storeDetails.about}</p>
        </div>
        <div className="store_location">
          <h4>Location</h4>
          <p>{props.storeDetails.location}</p>

          <div style={{ height: "300px", width: "100%" }}>
            {center ? (
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyC5XzGGfn_dVYsNOQPcRICvQ7m3yPTLTuQ",
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              ></GoogleMapReact>
            ) : null}
          </div>
        </div>
        <div className="product_range">
          <h4>Product Range</h4>
          <p>We provide products in the following categories</p>
          <ul>
            <li>{props.storeDetails.categories.category1}</li>
            <li>{props.storeDetails.categories.category2}</li>
            <li>{props.storeDetails.categories.category3}</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ViewStore;
