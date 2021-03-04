import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { AiFillShop, AiOutlineHome } from "react-icons/ai";
import { SiProducthunt, SiGooglecalendar } from "react-icons/si";
import { BsBag } from "react-icons/bs";
import {
  RiScissors2Fill,
  RiMapPinUserLine,
  RiCalendarCheckLine,
} from "react-icons/ri";
import { FaUserCircle, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "teal",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function AdminDashboard({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const ListItemWithLink = (props) => {
    const { title, children, path } = props;
    return (
      <Link to={path} style={{ textDecoration: "none", color: "inherit" }}>
        <ListItem button>
          <ListItemIcon style={{ marginLeft: "0.5rem" }}>
            {children}
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      </Link>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List style={{ display: "flex", flexDirection: "column" }}>
          <ListItemWithLink path="/admin" title="Dashboard">
            <AiOutlineHome size={20} />
          </ListItemWithLink>

          <ListItemWithLink path="/admin/userRole" title="User Role">
            <RiMapPinUserLine size={20} />
          </ListItemWithLink>
        </List>

        <Divider />
        <List style={{ display: "flex", flexDirection: "column" }}>
          <ListItemWithLink path="/admin/product" title="Services">
            <RiScissors2Fill size={20} />
          </ListItemWithLink>
          <ListItemWithLink path="/admin/service" title="Products">
            <BsBag size={20} />
          </ListItemWithLink>
        </List>
        <Divider />
        <List style={{ display: "flex", flexDirection: "column" }}>
          <ListItemWithLink path="/admin/appointment" title="Appointments">
            <RiCalendarCheckLine size={20} />
          </ListItemWithLink>
          <ListItemWithLink path="/admin/ecommerce" title="Ecommerce">
            <GiShoppingCart size={20} />
          </ListItemWithLink>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
