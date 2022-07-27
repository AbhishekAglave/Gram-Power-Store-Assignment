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

function FavoriteListHeader(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sorted, setSorted] = useState(true);
  const contactList = props.contactList;
  const setContactList = props.setContactList;
  const selectionMode = props.selectionMode;
  const setSelectionMode = props.setSelectionMode;

  useEffect(() => {
    localStorage.setItem("contactList", JSON.stringify(contactList));
  }, [contactList]);

  const isMenuOpen = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const unfavoriteAllContacts = () => {
    const newContactList = contactList.map((contact) => {
      if (contact.favorite) {
        contact.favorite = false;
      }
      return contact;
    });
    setContactList(newContactList);
    setAnchorEl(null);
  };
  const unfavoriteSelectedContacts = ()=>{
    const newContactList = contactList.map((contact)=>{
      if(contact.selected){
        contact.favorite=false;
      }
      return contact;
    })
    setContactList(newContactList);
  }
  const unSelectAll = () => {
    const newContactList = contactList.map((contact) => {
      if (contact.selected) {
        contact.selected = false;
      }
      return contact;
    });
    setContactList(newContactList);
  };
  const sortContacts = () => {
    const newContactList = contactList.sort((a, b) => {
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
    setContactList(newContactList);
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
        <MenuItem onClick={unfavoriteSelectedContacts}>
          Unfavorite Selected
        </MenuItem>
      ) : (
        <MenuItem onClick={unfavoriteAllContacts}>Unfavorite All</MenuItem>
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

export default FavoriteListHeader;
