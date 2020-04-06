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
  // console.log(data);
    return data.reports.map((report) => {
      // console.log(report);
      return report.status === "inStock" ? (
        <ListItem key={report.id}>
          <ListItemIcon>
            <ShoppingCartIcon style={{ color: green[500] }} />
          </ListItemIcon>
          <ListItemText>In stock | {report.dateTime}</ListItemText>
        </ListItem>
      ) : (
        <ListItem key={report.id}>
          <ListItemIcon>
            <RemoveShoppingCartIcon style={{ color: red[500] }} />
          </ListItemIcon>
          <ListItemText>Out of stock | {report.dateTime}</ListItemText>
        </ListItem>
      );
    });
};

const Reports = ({ marker }) => {
  const [dense, setDense] = useState(false);
  const [reports, setReports] = useState(null);

  const GET_REPORTS = gql`
    {
      place(googleId: "${marker.id}") {
        name
        googleId
        reports {
          id
          itemName
          googleId
          status
          dateTime
        }
      }
    }
  `;
  
  const { loading, error, data } = useQuery(GET_REPORTS);

  // console.log(marker.id);
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error...</p>;
  // console.log("reports", data);
  return (
    <List dense={dense}>
      {data.place ? (
        renderReports(data.place)
      ) : (
        <ListItem>no reports yet </ListItem>
      )}{" "}
    </List>
  );
};

export default Reports;