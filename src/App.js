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

const StoreListContext = createContext();
const SetStoreListContext = createContext();

function App() {
  const [loginState, setLoginState] = useState("loggedIn");
  const [storeDetails, setStoreDetails] = useState(
    JSON.parse(localStorage.getItem("storeDetails")) || {}
  );
  const [storeList, setStoreList] = useState(
    JSON.parse(localStorage.getItem("storeList")) || [
      {
        id: 0,
        title: "Sample Store",
        storeHrs: {
          from: "11:30",
          to: "12:00",
        },
        about:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor similique sit ullam cumque, commodi tempore consequatur facilis velit aspernatur! Laborum, sint nesciunt. Dolorum, saepe eaque dolor quisquam at aperiam repellat.",
        cover:
          "https://i.pinimg.com/originals/b6/c2/a7/b6c2a7bd8e80a91ea9b8d7734f8f91ce.jpg",
        galleryImg1: "https://mapio.net/images-p/2387932.jpg",
        galleryImg2: "https://mapio.net/images-p/2387932.jpg",
        galleryImg3: "https://mapio.net/images-p/2387932.jpg",
        categories: {
          category1: "category1",
          category2: "category2",
          category3: "category3",
          category4: "category4",
        },
      },
      {
        id: 1,
        title: "Sample Store 2",
        storeHrs: {
          from: "11:30",
          to: "12:00",
        },
        about:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor similique sit ullam cumque, commodi tempore consequatur facilis velit aspernatur! Laborum, sint nesciunt. Dolorum, saepe eaque dolor quisquam at aperiam repellat.",
        cover:
          "https://image.shutterstock.com/image-vector/browser-window-sale-buyers-gadgets-260nw-1216923979.jpg",
        galleryImg1: "https://mapio.net/images-p/2387932.jpg",
        galleryImg2: "https://mapio.net/images-p/2387932.jpg",
        galleryImg3: "https://mapio.net/images-p/2387932.jpg",
        categories: {
          category1: "category1",
          category2: "category2",
          category3: "category3",
          category4: "category4",
        },
      },
    ]
  );
  const [searchKey, setSearchKey] = useState("");
  return (
    <BrowserRouter>
      <StoreListContext.Provider value={storeList}>
        <SetStoreListContext.Provider value={setStoreList}>
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
        </SetStoreListContext.Provider>
      </StoreListContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { StoreListContext };
export { SetStoreListContext };
