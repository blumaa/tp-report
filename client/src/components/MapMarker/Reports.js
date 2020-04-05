import React, { useState, useEffect } from "react";
import axios from "axios";

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

const GET_REPORTS = gql`
  {
    place(googleId: "313402180f019f5e8518af2be02264af561f9328") {
      name
      googleId
      reports {
        itemName
        status
      }
    }
  }
`;

const Reports = ({ locationInfo }) => {
  console.log(locationInfo);
  const { data, loading, error } = useQuery(GET_REPORTS);
  const [dense, setDense] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  console.log(data)
  async function fetchReports() {
    try {
      console.log(locationInfo.marker.id);
      const requestBody = {
        query: `          
                {
                    place(googleId:"313402180f019f5e8518af2be02264af561f9328"){
                    name
                    googleId
                    reports{
                        itemName
                        status
                        }
                    }
                }
                    `,
      };

      const { data } = await axios.get(
        "http://localhost:5000/graphql",
        requestBody
      );
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <List dense={dense}>
      {/* this is where we map through reports and render them in a list*/}

      <ListItem>
        <ListItemIcon>
          <ShoppingCartIcon style={{ color: green[500] }} />
        </ListItemIcon>
        <ListItemText>In stock | report date and time</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <RemoveShoppingCartIcon style={{ color: red[500] }} />
        </ListItemIcon>
        <ListItemText>In stock | report date and time</ListItemText>
      </ListItem>
    </List>
  );
};

export default Reports;
