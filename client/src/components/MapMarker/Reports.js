import React, { useState } from "react";

import { red, green } from "@material-ui/core/colors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { useQuery } from "@apollo/react-hooks";

import gql from "graphql-tag";

const renderReports = (data) => {
  // console.log(data);

  const sortedReports = data.sort(function compare(a, b) {
    var dateA = new Date(a.dateTime);
    var dateB = new Date(b.dateTime);
    return dateB - dateA;
  });
  
    return sortedReports.map((report) => {
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
    // console.log(ports)
};

const Reports = ({ marker }) => {
  const [dense] = useState(false);

  // const GET_REPORTS = gql`
  //   {
  //     place(googleId: "${marker.id}") {
  //       name
  //       googleId
  //       reports {
  //         id
  //         itemName
  //         googleId
  //         status
  //         dateTime
  //       }
  //     }
  //   }
  // `;
  
  // const { loading, error, data } = useQuery(GET_REPORTS);

  // console.log('this b the mark', marker);
  // if (loading) return <p>Loading ...</p>;
  // if (error) return <p>Error...</p>;
  // console.log("reports", data);
  return (
    <List dense={dense}>
      {marker && marker.reports && marker.reports.length > 0 ? (
        renderReports(marker.reports)
      ) : (
        <ListItem>no reports yet </ListItem>
      )}{" "}
    </List>
  );
};

export default Reports;