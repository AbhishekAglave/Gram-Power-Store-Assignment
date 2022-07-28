import React, { useContext } from "react";
import { StoreListContext } from "../App";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import StoreItem from "./StoreItem";
import { SearchKey } from "../App";

function SearchList(props) {
const searchKey = useContext(SearchKey);
  const storeList = useContext(StoreListContext);
  return (
    <List>
      {storeList.map((store) => {
        if(store.title.toLowerCase().includes(searchKey.toLowerCase())){
        return (
          <React.Fragment key={store.id}>
            <StoreItem
            setStoreDetails={props.setStoreDetails}
            store={store} />
            <Divider />
          </React.Fragment>
        );}
        else{
            return null;
        }
      })}
    </List>
  );
}

export default SearchList;