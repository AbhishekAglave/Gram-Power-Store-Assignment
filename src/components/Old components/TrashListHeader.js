import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SortIcon from "@material-ui/icons/Sort";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

function ListHeader(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sorted, setSorted] = useState(true);
  const contactList = props.contactList;
  const setContactList = props.setContactList;
  const selectionMode = props.selectionMode;
  const setSelectionMode = props.setSelectionMode;
  const trashList = props.trashList;
  const setTrashList = props.setTrashList;

  useEffect(() => {
    localStorage.setItem("trashList", JSON.stringify(trashList));
  }, [trashList]);

  useEffect(() => {
    localStorage.setItem("contactList", JSON.stringify(contactList));
  }, [contactList]);

  useEffect(() => {
    if (trashList.length === 0 && contactList.length === 0) {
      localStorage.removeItem("lastContactId");
    }
  }, [contactList, trashList]);

  const isMenuOpen = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const deleteAllContacts = () => {
    setTrashList([]);
    setAnchorEl(null);
  };
  const restoreAllContacts = () => {
    setContactList([...contactList, ...trashList]);
    setTrashList([]);
    setAnchorEl(null);
  };
  const deleteSelectedContacts = () => {
    const newContactList = trashList.filter((contact) => {
      if (contact.selected) {
        return false;
      }
      return contact;
    });
    setTrashList(newContactList);
    setSelectionMode(false);
    setAnchorEl(null);
  };
  const restoreSelectedContacts = () => {
    const restoreList = [];
    const newContactList = trashList.filter((contact) => {
      if (contact.selected) {
        restoreList.push(contact);
        return false;
      }
      return contact;
    });
    setContactList([...contactList, ...restoreList]);
    setTrashList(newContactList);
    setSelectionMode(false);
    setAnchorEl(null);
  };
  const unSelectAll = () => {
    const newContactList = trashList.map((contact) => {
      if (contact.selected) {
        contact.selected = false;
      }
      return contact;
    });
    setTrashList(newContactList);
  };

  const sortContacts = () => {
    const newContactList = trashList.sort((a, b) => {
      if (sorted) {
        if (a.firstName > b.firstName) {
          return 1;
        } else {
          return -1;
        }
      } else {
        if (a.firstName < b.firstName) {
          return 1;
        } else {
          return -1;
        }
      }
    });
    setTrashList(newContactList);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {selectionMode ? (
        <MenuItem onClick={deleteSelectedContacts}>Delete Selected</MenuItem>
      ) : (
        <MenuItem onClick={deleteAllContacts}>Delete All</MenuItem>
      )}
      {selectionMode ? (
        <MenuItem onClick={restoreSelectedContacts}>Restore Selected</MenuItem>
      ) : (
        <MenuItem onClick={restoreAllContacts}>Restore All</MenuItem>
      )}
    </Menu>
  );

  return (
    <ListItem className="list_header">
      <ListItemIcon>
        <IconButton>
          {selectionMode ? (
            <CheckBoxOutlinedIcon
              onClick={() => {
                setSelectionMode(false);
                unSelectAll();
              }}
            />
          ) : (
            <CheckBoxOutlineBlankIcon
              onClick={() => {
                setSelectionMode(true);
                unSelectAll();
              }}
            />
          )}
        </IconButton>
      </ListItemIcon>
      <div className="name-div">
        <ListItemText primary="Name" />
      </div>
      <div className="phone-div">
        <ListItemText primary="Phone" />
      </div>
      <div className="email-div">
        <ListItemText primary="Email" />
      </div>
      <div className="itembuttons-div">
        <IconButton
          onClick={() => {
            sortContacts();
            setSelectionMode(false);
            unSelectAll();
            if (sorted) {
              setSorted(false);
            } else {
              setSorted(true);
            }
          }}
        >
          <SortIcon />
        </IconButton>
        <IconButton aria-haspopup="true" onClick={handleMenuOpen}>
          <MoreVertOutlinedIcon />
        </IconButton>
      </div>
      {renderMenu}
    </ListItem>
  );
}

export default ListHeader;
