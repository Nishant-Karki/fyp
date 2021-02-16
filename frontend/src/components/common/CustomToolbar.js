import React from "react";
import { Toolbar, Divider, Typography } from "@material-ui/core";

export default function CustomToolbar({ button = false, children, title }) {
  return (
    <>
      <Toolbar
        variant="dense"
        style={
          button ? { display: "flex", justifyContent: "space-between" } : null
        }
      >
        <Typography variant="body1">{title}</Typography>
        {button ? <>{children}</> : null}
      </Toolbar>
      <Divider />
    </>
  );
}
