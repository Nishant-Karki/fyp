import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { GrProductHunt } from "react-icons/gr";
import {
  Toolbar,
  Typography,
  Drawer,
  IconButton,
  AppBar,
  Box,
  Container,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import DashboardI from "./DashboardI";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingTop: "1rem",
    paddingBottom: "0.5rem",
  },
  smTitle: {
    paddingTop: "1rem",
    paddingBottom: "0.5rem",
  },
  largeBox: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inherit",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  smallBox: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      display: "inherit",
    },
  },
  sidebar: {
    width: "25%",
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      width: "3.2rem",
    },
    [theme.breakpoints.down("xs")]: {
      width: "0%",
    },
  },
  hide: {
    width: "3.2rem",
    height: "100vh",
    [theme.breakpoints.down("sm")]: {
      width: "3.2rem",
    },
    [theme.breakpoints.down("xs")]: {
      width: "0%",
    },
  },
  font: {
    marginLeft: "0.5rem",
    marginRight: "0.7rem",
    size: "18px",
  },
  smFont: {
    marginRight: "0.7rem",
    size: "18px",
  },
  listItem: {
    height: "3.5rem",
  },
  noDisplay: {
    display: "none",
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const drawerOpen = () => setOpen(true);
  const drawerClose = () => setOpen(false);
  return (
    <div>
      <Paper className={!open ? classes.sidebar : classes.hide}>
        <Box className={!open ? classes.largeBox : classes.smallBox}>
          <Typography
            variant="h6"
            type="button"
            className={classes.title}
            align="center"
            onClick={open ? drawerClose : drawerOpen}
          >
            Admin Dashboard
          </Typography>

          <Divider />

          <List component="nav">
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={() => setSelectedIndex(0)}
              className={classes.listItem}
            >
              <Typography variant="body1" component="div">
                <GrProductHunt className={classes.font} />
                Services
              </Typography>
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 1}
              onClick={() => setSelectedIndex(1)}
              className={classes.listItem}
            >
              <Typography variant="body1" component="div">
                <GrProductHunt className={classes.font} />
                Products
              </Typography>
            </ListItem>
          </List>
        </Box>
        <Box className={open ? classes.smallBox : classes.largeBox}>
          <Typography
            variant="h6"
            align="center"
            type="button"
            className={classes.smTitle}
            onClick={open ? drawerOpen : drawerClose}
          >
            -
          </Typography>
          <Divider />

          <List component="nav">
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={() => setSelectedIndex(0)}
              className={classes.listItem}
            >
              <Typography variant="body1" align="center" component="div">
                <GrProductHunt className={classes.smFont} />
              </Typography>
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 1}
              onClick={() => setSelectedIndex(1)}
              className={classes.listItem}
            >
              <Typography variant="body1" align="center" component="div">
                <GrProductHunt className={classes.smFont} />
              </Typography>
            </ListItem>
          </List>
        </Box>
      </Paper>
    </div>
  );
}
