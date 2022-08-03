import React from "react";

function ViewStore(props) {
  return (
    <>
      <h1>{props.storeDetails.title}</h1>
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
            Monday: {props.storeDetails.storeHrsMon.from} -  {props.storeDetails.storeHrsMon.to}
          </p>
          <p>
            Tuesday: {props.storeDetails.storeHrsTue.from} - {props.storeDetails.storeHrsTue.to}
          </p>
          <p>
            Wednesday: {props.storeDetails.storeHrsWed.from} - {props.storeDetails.storeHrsWed.to}
          </p>
          <p>
            Thursday: {props.storeDetails.storeHrsThu.from} - {props.storeDetails.storeHrsThu.to}
          </p>
          <p>
            Friday: {props.storeDetails.storeHrsFri.from} - {props.storeDetails.storeHrsFri.to}
          </p>
          <p>
            Saturday: {props.storeDetails.storeHrsSat.from} - {props.storeDetails.storeHrsSat.to}
          </p>
          <p>
            Sunday: {props.storeDetails.storeHrsSun.from} - {props.storeDetails.storeHrsSun.to}
          </p>
        </div>
        <div className="about_us">
          <h4>About Us</h4>
          <p>{props.storeDetails.about}</p>
        </div>
        <div className="store_location">
          <h4>Location</h4>
          <p>{props.storeDetails.location}</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.99973450298!2d75.65047228361074!3d26.88514167956319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1659024492208!5m2!1sen!2sin"
            width="400"
            height="200"
            title="map"
          ></iframe>
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
