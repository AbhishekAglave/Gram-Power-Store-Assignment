import "./App.css";
import PrimarySearchAppBar from "./components/PrimarySearchAppBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, createContext } from "react";
import LoginForm from "./components/LoginForm";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Circles } from "react-loader-spinner";
import StoreList from "./components/StoreList";
import ViewStore from "./components/ViewStore";
import AddButton from "./components/AddStore";
import NewStoreForm from "./components/NewStoreForm";
import SearchList from "./components/SearchList";

const StoreListContext = createContext();
const SetStoreListContext = createContext();
const SearchKey = createContext();
const SetSearchKey = createContext();

function App() {
  const [loginState, setLoginState] = useState("loggedOut");
  const [storeDetails, setStoreDetails] = useState(
    JSON.parse(localStorage.getItem("storeDetails")) || {}
  );
  const [storeList, setStoreList] = useState(
    JSON.parse(localStorage.getItem("storeList")) || [
      {
        id: 0,
        title: "Sample Store 1",
        storeHrs: {
          from: "11:30",
          to: "12:00",
        },
        location: 'Jaipur, Jaipur, Jaipur - 444666',
        about:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor similique sit ullam cumque, commodi tempore consequatur facilis velit aspernatur! Laborum, sint nesciunt. Dolorum, saepe eaque dolor quisquam at aperiam repellat.",
        cover:
          "https://img.freepik.com/premium-psd/summer-fashion-sale-social-media-web-banner-flyer-facebook-cover-design-template_220443-387.jpg?w=2000",
        galleryImg1: "https://previews.123rf.com/images/kho/kho1305/kho130500329/19758746-beautiful-happy-teen-girls-with-colored-shopping-sale-bags-over-white.jpg",
        galleryImg2: "https://image.shutterstock.com/image-photo/picture-shocked-young-brunette-woman-260nw-641814016.jpg",
        galleryImg3: "https://media.istockphoto.com/photos/beautiful-asian-woman-carrying-colorful-bags-shopping-online-with-picture-id1193750118?k=20&m=1193750118&s=612x612&w=0&h=w46Bjw0TuNVSKHOWtMyVIRfvzZ2JSRP4w7Zm02oqCFE=",
        categories: {
          category1: "category1",
          category2: "category2",
          category3: "category3",
        },
      },
      {
        id: 1,
        title: "Sample Store 2",
        storeHrs: {
          from: "11:30",
          to: "12:00",
        },
        location: 'Jaipur, Jaipur, Jaipur - 444666',
        about:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor similique sit ullam cumque, commodi tempore consequatur facilis velit aspernatur! Laborum, sint nesciunt. Dolorum, saepe eaque dolor quisquam at aperiam repellat.",
        cover:
          "https://img.freepik.com/premium-psd/summer-fashion-sale-social-media-web-banner-flyer-facebook-cover-design-template_220443-387.jpg?w=2000",
        galleryImg1: "https://previews.123rf.com/images/kho/kho1305/kho130500329/19758746-beautiful-happy-teen-girls-with-colored-shopping-sale-bags-over-white.jpg",
        galleryImg2: "https://image.shutterstock.com/image-photo/picture-shocked-young-brunette-woman-260nw-641814016.jpg",
        galleryImg3: "https://media.istockphoto.com/photos/beautiful-asian-woman-carrying-colorful-bags-shopping-online-with-picture-id1193750118?k=20&m=1193750118&s=612x612&w=0&h=w46Bjw0TuNVSKHOWtMyVIRfvzZ2JSRP4w7Zm02oqCFE=",
        categories: {
          category1: "category1",
          category2: "category2",
          category3: "category3",
        },
      },
      {
        id: 2,
        title: "Sample Store 3",
        storeHrs: {
          from: "11:30",
          to: "12:00",
        },
        location: 'Jaipur, Jaipur, Jaipur - 444666',
        about:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor similique sit ullam cumque, commodi tempore consequatur facilis velit aspernatur! Laborum, sint nesciunt. Dolorum, saepe eaque dolor quisquam at aperiam repellat.",
        cover:
          "https://img.freepik.com/premium-psd/summer-fashion-sale-social-media-web-banner-flyer-facebook-cover-design-template_220443-387.jpg?w=2000",
        galleryImg1: "https://previews.123rf.com/images/kho/kho1305/kho130500329/19758746-beautiful-happy-teen-girls-with-colored-shopping-sale-bags-over-white.jpg",
        galleryImg2: "https://image.shutterstock.com/image-photo/picture-shocked-young-brunette-woman-260nw-641814016.jpg",
        galleryImg3: "https://media.istockphoto.com/photos/beautiful-asian-woman-carrying-colorful-bags-shopping-online-with-picture-id1193750118?k=20&m=1193750118&s=612x612&w=0&h=w46Bjw0TuNVSKHOWtMyVIRfvzZ2JSRP4w7Zm02oqCFE=",
        categories: {
          category1: "category1",
          category2: "category2",
          category3: "category3",
        },
      },
    ]
  );
  const [searchKey, setSearchKey] = useState("");
  return (
    <BrowserRouter>
      <StoreListContext.Provider value={storeList}>
        <SetStoreListContext.Provider value={setStoreList}>
        <SearchKey.Provider value={searchKey}>
        <SetSearchKey.Provider value={setSearchKey}>
          {loginState === "loggingIn" ? (
            <div className="loader">
              <Circles color="rgb(0, 110, 255)" height={80} width={80} />
            </div>
          ) : null}
          {loginState === "loggedIn" ? (
            <div className="App">
              <header className="App-header">
                <nav className="navbar">
                  <PrimarySearchAppBar
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    setLoginState={setLoginState}
                  />
                </nav>
              </header>
              <main className="main-content">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <StoreList setStoreDetails={setStoreDetails} />
                        <AddButton />
                      </>
                    }
                  />
                  <Route
                    path="/Search"
                    element={
                      <>
                        <SearchList setStoreDetails={setStoreDetails} />
                        <AddButton />
                      </>
                    }
                  />
                  <Route
                    path="/ViewStore"
                    element={
                      <>
                        <ViewStore storeDetails={storeDetails} />
                        <AddButton />
                      </>
                    }
                  />
                  <Route path="/AddNewStore" element={<NewStoreForm />} />
                </Routes>
              </main>
            </div>
          ) : (
            <div className="loginForm">
              <LoginForm setLoginState={setLoginState} />
            </div>
          )}
        </SetSearchKey.Provider>
        </SearchKey.Provider>
        </SetStoreListContext.Provider>
      </StoreListContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { StoreListContext };
export { SetStoreListContext };
export { SearchKey };
export { SetSearchKey };
