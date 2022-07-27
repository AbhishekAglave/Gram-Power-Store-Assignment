import React, { useState } from "react";
import ContactItem from "./ContactItem";
import FavoriteListHeader from "./FavoriteListHeader";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import NoFavoriteContact from "./NoFavoriteContact";

function FavoriteContactList(props) {
  const contactList = props.contactList;
  const setContactList = props.setContactList;
  const trashList = props.trashList;
  const setTrashList = props.setTrashList;
  const setContactDetails = props.setContactDetails;
  const [selectionMode, setSelectionMode] = useState(false);
  let noFavsFound = true;
  return (
    <List>
      <FavoriteListHeader
        contactList={contactList}
        setContactList={setContactList}
        selectionMode={selectionMode}
        setSelectionMode={setSelectionMode}
        trashList={trashList}
        setTrashList={setTrashList}
      />
      <Divider />
      <div className="contact-list">
        {selectionMode
          ? contactList.map((contact) => {
            if (contact.favorite) {
              noFavsFound = false;
              return (
                <ContactItem
                  key={contact.id}
                  id={contact.id}
                  name={contact.firstName + " " + contact.lastName}
                  phone={contact.phone}
                  email={contact.email}
                  favorite={contact.favorite}
                  selected={contact.selected}
                  selectionMode={selectionMode}
                  contactList={contactList}
                  setContactList={setContactList}
                  trashList={trashList}
                  setTrashList={setTrashList}
                  setContactDetails={setContactDetails}
                />
              );
            }
            return false;
            })
          : contactList.map((contact) => {
              if (contact.favorite) {
                noFavsFound = false;
                return (
                  <ContactItem
                    key={contact.id}
                    id={contact.id}
                    name={contact.firstName + " " + contact.lastName}
                    phone={contact.phone}
                    email={contact.email}
                    favorite={contact.favorite}
                    contactList={contactList}
                    setContactList={setContactList}
                    trashList={trashList}
                    setTrashList={setTrashList}
                    setContactDetails={setContactDetails}
                  />
                );
              }
              return false;
            })}
        {noFavsFound ? <NoFavoriteContact /> : null}
      </div>
    </List>
  );
}

export default FavoriteContactList;
