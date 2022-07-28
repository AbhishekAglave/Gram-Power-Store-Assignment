import React from "react";

function ViewStore(props) {
  return (
    <>
      <h1>{props.storeDetails.title}</h1>
      {/* <h1>{props.storeDetails.cover}</h1> */}
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
            Monday: {props.storeDetails.storeHrs.from} -{" "}
            {props.storeDetails.storeHrs.to}
          </p>
          <p>
            Tuesday: {props.storeDetails.storeHrs.from} -{" "}
            {props.storeDetails.storeHrs.to}
          </p>
          <p>
            Wednesday: {props.storeDetails.storeHrs.from} -{" "}
            {props.storeDetails.storeHrs.to}
          </p>
          <p>
            Thursday: {props.storeDetails.storeHrs.from} -{" "}
            {props.storeDetails.storeHrs.to}
          </p>
          <p>
            Friday: {props.storeDetails.storeHrs.from} -{" "}
            {props.storeDetails.storeHrs.to}
          </p>
          <p>
            Saturday: {props.storeDetails.storeHrs.from} -{" "}
            {props.storeDetails.storeHrs.to}
          </p>
          <p>
            Sunday: {props.storeDetails.storeHrs.from} -{" "}
            {props.storeDetails.storeHrs.to}
          </p>
        </div>
        <div className="about_us">
          <h4>About Us</h4>
          <p>{props.storeDetails.about}</p>
        </div>
        <div className="store_location">
          <h4>Location</h4>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448181.16374162206!2d76.81306442366603!3d28.64727993557043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1658946170277!5m2!1sen!2sin"
            width="400"
            height="400"
            title="map"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="product_range">
          <h4>Product Range</h4>
          <p>{props.storeDetails.categories.category1}</p>
          <p>{props.storeDetails.categories.category2}</p>
          <p>{props.storeDetails.categories.category3}</p>
          <p>{props.storeDetails.categories.category4}</p>
        </div>
      </div>
    </>
  );
}

export default ViewStore;
