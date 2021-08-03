import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import AccountCircle from "@material-ui/icons/AccountCircle";

import MoreIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";
import Forms from "./Form/Forms";
import { useHistory } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),

    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    marginTop: "50px",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  formLabel: {
    fontSize: "xxx-large",
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function Dashboard() {
  const { setInStorage } = window;
  let history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const [formTitle, setFormTitle] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const cancelAddForm = () => {
    handleClose();
    setFormTitle("");
    setFormDescription("");
  };

  const createForm = () => {
    if (!localStorage.createdId) {
      localStorage.createdId = "1";
    } else {
      let createdId = localStorage.createdId;
      createdId++;
      localStorage.createdId = createdId;
    }
    var data = {
      id: localStorage.createdId,
      name: formTitle,
      description: formDescription,
      questions: [],
      createdAt: Date.now(),
    };
    setInStorage(`formData${localStorage.createdId}`, data);
    history.push("/form/" + localStorage.createdId);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleClickOpen}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <AddIcon />
        </IconButton>
        <p>Create </p>
      </MenuItem>

      <MenuItem>
        <IconButton aria-label="account of current user" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ backgroundColor: "teal" }}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Forms
          </Typography>

          <div className={classes.grow} />

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Create Form</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Creating a new empty form, just add form name and description if
                you want.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Form Name"
                type="text"
                fullWidth
                value={formTitle}
                onChange={(e) => {
                  setFormTitle(e.target.value);
                }}
              />
              <br></br>
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Form description"
                type="text"
                fullWidth
                value={formDescription}
                onChange={(e) => {
                  setFormDescription(e.target.value);
                }}
              />
              <br></br>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelAddForm} color="primary">
                Cancel
              </Button>
              <Button onClick={createForm} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className={classes.sectionDesktop}>
          <FormLabel className={classes.formLabel}>Add Form</FormLabel>
          <IconButton
            aria-label="Create new form"
            color="inherit"
            onClick={handleClickOpen}
          >
            <AddIcon />
          </IconButton>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Forms />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
