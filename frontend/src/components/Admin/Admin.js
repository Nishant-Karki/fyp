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
  Button,
} from "@material-ui/core";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { Divider } from "@material-ui/core";

import ServiceTable from "./ServiceTable";
import ProductTable from "./ProductTable";
import axios from "axios";
import { useEffect } from "react";

function Admin() {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const drawerOpen = () => setOpen(true);
  const drawerClose = () => setOpen(false);
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="regular">
          <IconButton
            style={{ outline: "none" }}
            edge="start"
            onClick={drawerOpen}
          >
            <AiOutlineMenu />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={drawerClose}>
        <Box style={{ width: "16rem" }}>
          <Box>
            <IconButton
              onClick={drawerClose}
              style={{
                outline: "none",
                marginLeft: "0.7rem",
                marginTop: "0.2rem",
              }}
            >
              <AiOutlineMenu />
              <Typography
                style={{ marginLeft: "0.7rem" }}
                variant="h6"
                color="inherit"
              >
                Admin Dashboard
              </Typography>
            </IconButton>
          </Box>
          <Divider style={{ marginTop: "0.3rem" }} />
          <List component="nav">
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={() => setSelectedIndex(0)}
              style={{ height: "3.5rem" }}
            >
              <Typography variant="body1" color="initial">
                <GrProductHunt
                  size={18}
                  style={{ marginLeft: "0.5rem", marginRight: "0.7rem" }}
                />
                Services
              </Typography>
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 1}
              onClick={() => setSelectedIndex(1)}
              style={{ height: "3.5rem" }}
            >
              <Typography variant="body1" color="initial">
                <GrProductHunt
                  size={18}
                  style={{ marginLeft: "0.5rem", marginRight: "0.7rem" }}
                />
                Products
              </Typography>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <ServiceTable />
      <ProductTable />
    </div>
  );
}

export default Admin;
