import React, { useState, useEffect } from "react";

import { red, green } from "@material-ui/core/colors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";



const renderReports = (data) => { 
  console.log(data)
  return data.place.reports.map(report=>{
  return(
    report.status === "inStock" ? (
      <ListItem>
        <ListItemIcon>
          <ShoppingCartIcon style={{ color: green[500] }} />
        </ListItemIcon>
        <ListItemText>In stock | report date and time</ListItemText>
      </ListItem>
    ) : (
      <ListItem>
        <ListItemIcon>
          <RemoveShoppingCartIcon style={{ color: red[500] }} />
        </ListItemIcon>
        <ListItemText>In stock | report date and time</ListItemText>
      </ListItem>
    )
  )
})
}
const Reports = ({ locationInfo }) => {
  const GET_REPORTS = gql`
  {
    place(googleId:"${locationInfo.marker.id}"){
      name
      googleId
      reports {
        itemName
        status
      }
    }
  }
`;
  console.log(locationInfo);
  const { data, loading, error } = useQuery(GET_REPORTS);
  const [dense, setDense] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;


  


console.log('reports', data)


  return (
    <List dense={dense}>
      {/* this is where we map through reports and render them in a list*/}
      {!data.place ? <ListItem>No reports yet</ListItem> : renderReports(data)}
    </List>
  );
};

export default Reports;
