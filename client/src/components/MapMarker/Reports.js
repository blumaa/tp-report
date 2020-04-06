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
import { Query } from "react-apollo";

import gql from "graphql-tag";

const renderReports = (data) => {
  console.log(data);
    return data.reports.map((report) => {
      console.log(report);
      return report.status === "inStock" ? (
        <ListItem key={report.id}>
          <ListItemIcon>
            <ShoppingCartIcon style={{ color: green[500] }} />
          </ListItemIcon>
          <ListItemText>In stock | report date and time</ListItemText>
        </ListItem>
      ) : (
        <ListItem key={report.id}>
          <ListItemIcon>
            <RemoveShoppingCartIcon style={{ color: red[500] }} />
          </ListItemIcon>
          <ListItemText>In stock | report date and time</ListItemText>
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
          status
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

// console.log(marker);
// const { data, loading, error } = useQuery(GET_REPORTS);
// const [dense, setDense] = useState(false);

// if (loading) return <p>Loading...</p>;
// if (error) {
//   console.log('erroororroorororo', error)

// }
// if (error) return <p>ERROR</p>;
// if (!data) return <p>Not found</p>;

// console.log('reports', data)

// return (
//   <List dense={dense}>
//     {/* this is where we map through reports and render them in a list*/}
//     {data && data.place && renderReports(data)}
//   </List>
// );