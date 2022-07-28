import React from 'react'

function NewStoreForm(props) {
  return (
    <>
      <form>
      <div className="store_details_container">
        <label>Enter Store Title : <input/></label>
        <label>Choose Cover Image:<input type='file' onChange={(event)=>{
          console.log(event.target.value)
        }}></input></label>
        <div className="photo_gallery">

        </div>
        <div className="store_hours">
          <h4>Shope Hours</h4>
        </div>
        <div className="about_us">
          <h4>About Us</h4>
        </div>
        <div className="store_location">
          <h4>Location</h4>

        </div>
        <div className="product_range">
          <h4>Product Range</h4>
        </div>
      </div>
      </form>
    </>
  )
}

export default NewStoreForm