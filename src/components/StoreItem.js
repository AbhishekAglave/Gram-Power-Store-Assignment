import React, {useContext, useEffect} from "react";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useNavigate } from "react-router-dom";
import StorefrontIcon from "@material-ui/icons/Storefront";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { StoreListContext } from "../App";
import { SetStoreListContext } from "../App";

function StoreItem(props) {
  const navigate = useNavigate();
  const setStoreDetails = props.setStoreDetails;
  const storeList = useContext(StoreListContext);
  const setStoreList = useContext(SetStoreListContext);
  function viewStore() {
    setStoreDetails(props.store);
    localStorage.setItem("storeDetails", JSON.stringify(props.store));
    navigate("/ViewStore");
  }

  function deleteStore(){
    const storeId = props.store.id;
    const newStoreList = storeList.filter((store)=>{
      return store.id!==storeId;
    })
    setStoreList(newStoreList);
  }
  useEffect(() => {
    localStorage.setItem("storeList", JSON.stringify(storeList));
  }, [storeList]);
  return (
    <ListItem button>
      <ListItemIcon onClick={viewStore}>
        <IconButton>
          <StorefrontIcon />
        </IconButton>
      </ListItemIcon>
      <div onClick={viewStore}
        style={{ display: "flex", height: "inherit", alignItems: "center" }}
      >
        <div className="title_div">
          <ListItemText primary={props.store.title} />
        </div>
      </div>
      <ListItemIcon onClick={deleteStore}>
        <IconButton>
          <DeleteOutlinedIcon/>
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
}

export default StoreItem;
