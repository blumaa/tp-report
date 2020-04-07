import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";

import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { red, green } from "@material-ui/core/colors";
import Reports from './Reports'
import { createApolloFetch } from "apollo-fetch";


const client = createApolloFetch({
  uri: "http://localhost:5000/graphql",
});


function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          close
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const MapMarker = ({ marker, addReportToMarker }) => {
    // use useQuery here to fetch marker data based on search term
  // console.log("location info", marker);
  const [dense, setDense] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleInStock = (marker) => {
    console.log(marker)
    client({
      query: `mutation createReport($googleId: String!){
        addReport(itemName: "toilet paper", status: "inStock", googleId: $googleId){
          id
          itemName
          status
          placeId
          googleId
          dateTime
          place{
            name
            googleId
            reports{
              id
              itemName
              status
              placeId
              googleId
            }
          }
        }
      }`,
      variables: { googleId: `${marker.id}` },
    }).then((res) => {
      console.log('added a report', res)
      addReportToMarker(res)
    });
    // user clicks button
    // find or create place
    // if there is already a place, create report
    // if there is not a place, create place, create report
    // re-render reports
  };
  const handleOutOfStock = () => {};



  return (
    <div>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={handleClickOpen}
        transitioncompoonent={Transition}
      >
        {marker.name}
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {marker.name}
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" gutterBottom>
            Latest Reports
          </Typography>
          {/* Display report count?*/}
          <Reports marker={marker} />

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>handleInStock(marker)} color="primary">
            <ShoppingCartIcon style={{ color: green[500] }} />
            Report: This place has TP!
          </Button>
          <Button autoFocus onClick={handleOutOfStock} color="secondary">
            <RemoveShoppingCartIcon style={{ color: red[500] }} />
            Report: This place doesn't have TP!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MapMarker;

{
  /* <Box>
<div className="map-text">{marker.marker.name}</div>
<Button variant="contained" color="primary">
  Report TP in stock
</Button>
<Button variant="contained" color="secondary">
  Report TP out of stock
</Button>
</Box>
); */
}
