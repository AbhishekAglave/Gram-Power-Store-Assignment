import React, { useState } from "react";
import DeletedContactItem from "./DeletedContactItem";
import TrashListHeader from "./TrashListHeader";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import NoTrashContact from "./NoTrashContact";

function TrashList(props) {
  const contactList = props.contactList;
  const setContactList = props.setContactList;
  const trashList = props.trashList;
  const setTrashList = props.setTrashList;
  const setContactDetails = props.setContactDetails;
  const [selectionMode, setSelectionMode] = useState(false);
  return (
    <List>
      <TrashListHeader
        selectionMode={selectionMode}
        setSelectionMode={setSelectionMode}
        contactList={contactList}
        setContactList={setContactList}
        trashList={trashList}
        setTrashList={setTrashList}
      />
      <Divider />
      <div className="contact-list">
        {trashList.length === 0 ? <NoTrashContact /> : null}
        {selectionMode
          ? trashList.map((contact) => {
              return (
                <DeletedContactItem
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
            })
          : trashList.map((contact) => {
              return (
                <DeletedContactItem
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
            })}
      </div>
    </List>
  );
}

export default TrashList;
