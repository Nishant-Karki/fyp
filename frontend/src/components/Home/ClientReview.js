import { Avatar } from "@material-ui/core";
import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import { Container } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  imgSize: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  container: {
    marginTop: "10%",
    marginBottom: "10%",
  },
}));

const Client = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box display="flex" justifyContent="center">
        <Avatar
          className={classes.imgSize}
          src="https://images.unsplash.com/photo-1464863979621-258859e62245?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1866&q=80"
        ></Avatar>
      </Box>
      <Box textAlign="center" style={{ marginTop: "1rem" }}>
        <Typography variant="body1">
          Everthing about this place is simply great. I loved the atmosphere and
          friendly staff. Incredible job, I wish you luck.
        </Typography>
      </Box>
    </Grid>
  );
};

function ClientReview() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h4" align="center" style={{ marginBottom: "1rem" }}>
        WHAT CLIENTS SAY
      </Typography>
      <Grid container spacing={4} component="div" style={{ padding: "2rem" }}>
        <Client />
        <Client />
        <Client />
      </Grid>
    </Container>
  );
}

export default ClientReview;
