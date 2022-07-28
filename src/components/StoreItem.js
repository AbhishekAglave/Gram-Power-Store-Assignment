import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useNavigate } from "react-router-dom";
import StorefrontIcon from "@material-ui/icons/Storefront";

function StoreItem(props) {
  const navigate = useNavigate();
  const setStoreDetails = props.setStoreDetails;
  function viewStore() {
    setStoreDetails(props.store);
    localStorage.setItem("storeDetails", JSON.stringify(props.store));
    navigate("/ViewStore");
  }
  return (
    <ListItem button onClick={viewStore}>
      <ListItemIcon>
        <IconButton>
          <StorefrontIcon />
        </IconButton>
      </ListItemIcon>
      <div
        style={{ display: "flex", height: "inherit", alignItems: "center" }}
      >
        <div className="title_div">
          <ListItemText primary={props.store.title} />
        </div>
      </div>
    </ListItem>
  );
}

export default StoreItem;
