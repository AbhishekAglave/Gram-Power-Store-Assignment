import React, { useContext } from "react";
import { StoreListContext } from "../App";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import StoreItem from "./StoreItem";

function StoreList(props) {
  const storeList = useContext(StoreListContext);
  return (
    <List>
      {storeList.map((store) => {
        return (
          <React.Fragment key={store.id}>
            <StoreItem
            setStoreDetails={props.setStoreDetails}
            store={store} />
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
}

export default StoreList;
