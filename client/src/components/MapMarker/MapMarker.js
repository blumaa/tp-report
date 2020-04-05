import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FolderIcon from "@material-ui/icons/Folder";
import ListItemText from "@material-ui/core/ListItemText";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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

const MapMarker = ({ locationInfo }) => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={handleClickOpen}
        transitioncompoonent={Transition}
      >
        {locationInfo.marker.name}
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {locationInfo.marker.name}
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" gutterBottom>
            Latest Reports
          </Typography>
          <List dense={dense}>
              <ListItem>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText
                >In stock | report date and time</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <RemoveShoppingCartIcon />
                </ListItemIcon>
                <ListItemText
                >In stock | report date and time</ListItemText>
              </ListItem>
            
          </List>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Report In Stock
          </Button>
          <Button autoFocus onClick={handleClose} color="secondary">
            Report Out Of Stock
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MapMarker;

{
  /* <Box>
<div className="map-text">{locationInfo.marker.name}</div>
<Button variant="contained" color="primary">
  Report TP in stock
</Button>
<Button variant="contained" color="secondary">
  Report TP out of stock
</Button>
</Box>
); */
}
