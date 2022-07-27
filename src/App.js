import "./App.css";
import ContactList from "./components/ContactList";
import PrimarySearchAppBar from "./components/PrimarySearchAppBar";
import AddButton from "./components/AddContact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewContactForm from "./components/NewContactForm";
import React, { useState } from "react";
import FavoriteContactList from "./components/FavoriteContactList";
import SearchList from "./components/SearchList";
import TrashList from "./components/TrashList";
import ViewContact from "./components/ViewContact";
import EditContactForm from "./components/EditContactForm";
import LoginForm from "./components/LoginForm";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Circles } from  'react-loader-spinner'

function App() {
  const [loginState, setLoginState] = useState("loggedOut");
  const [contactDetails, setContactDetails] = useState(
    JSON.parse(localStorage.getItem("contactDetails")) || {}
  );
  const [contactList, setContactList] = useState(
    JSON.parse(localStorage.getItem("contactList")) || [
      {
        id: 0,
        firstName: "Abhishek",
        lastName: "Aglave",
        phone: 8530080493,
        email: "abhishekaglave85@gmail.com",
        company: 'Newton School',
        title: 'Full Stack Developer',
        favorite: true,
        selected: false,
      },
      {
        id: 1,
        firstName: "Sample",
        lastName: "Contact",
        phone: 999999999,
        email: "email@example.com",
        favorite: false,
        selected: false,
      },
      {
        id: 2,
        firstName: "Sample",
        lastName: "Contact2",
        phone: 999999999,
        email: "email2@example.com",
        favorite: false,
        selected: false,
      },
    ]
  );
  const [trashList, setTrashList] = useState(
    JSON.parse(localStorage.getItem("trashList")) || []
  );
  const [searchKey, setSearchKey] = useState("");

  return (
    <BrowserRouter>
      {loginState === "loggingIn" ? <div className="loader"><Circles color="rgb(0, 110, 255)" height={80} width={80}/></div> : null}
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
                    <ContactList
                      contactList={contactList}
                      setContactList={setContactList}
                      trashList={trashList}
                      setTrashList={setTrashList}
                      setContactDetails={setContactDetails}
                    />
                    <AddButton />
                  </>
                }
              />
              <Route
                path="/Search"
                element={
                  <>
                    <SearchList
                      contactList={contactList}
                      setContactList={setContactList}
                      searchKey={searchKey}
                      trashList={trashList}
                      setTrashList={setTrashList}
                      setContactDetails={setContactDetails}
                    />
                    <AddButton />
                  </>
                }
              />
              <Route
                path="/ViewContact"
                element={
                  <>
                    <ViewContact contactDetails={contactDetails} />
                  </>
                }
              />
              <Route
                path="/EditContact"
                element={
                  <>
                    <EditContactForm
                      contactDetails={contactDetails}
                      contactList={contactList}
                      setContactList={setContactList}
                    />
                  </>
                }
              />
              <Route
                path="/Favorites"
                element={
                  <>
                    <FavoriteContactList
                      contactList={contactList}
                      setContactList={setContactList}
                      trashList={trashList}
                      setTrashList={setTrashList}
                      setContactDetails={setContactDetails}
                    />
                    <AddButton />
                  </>
                }
              />
              <Route
                path="/Trash"
                element={
                  <>
                    <TrashList
                      contactList={contactList}
                      setContactList={setContactList}
                      trashList={trashList}
                      setTrashList={setTrashList}
                      setContactDetails={setContactDetails}
                    />
                    <AddButton />
                  </>
                }
              />
              <Route
                path="/CreateNewContact"
                element={
                  <NewContactForm
                    contactList={contactList}
                    setContactList={setContactList}
                  />
                }
              />
            </Routes>
          </main>
        </div>
      ) : (
        <div className="loginForm">
          <LoginForm setLoginState={setLoginState} />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
