import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  Grid,
  Typography,
  Button,
  Divider,
  Avatar,
  withStyles,
  Box,
} from "@material-ui/core";

export default function MenuDropdown({ anchorEl, setAnchorEl }) {
  const StyledMenu = withStyles({
    paper: {
      marginTop: "2rem",
      marginLeft: "1rem",
      float: "right",
    },
  })((props) => <Menu elevation={0} getContentAnchorEl={null} {...props} />);
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box display="flex" width="10rem" flexDirection="column">
          <MenuItem>
            <Avatar />
            <Typography variant="body2">Email</Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <Typography variant="body2">Logout</Typography>
          </MenuItem>
        </Box>
      </StyledMenu>
    </div>
  );
}
