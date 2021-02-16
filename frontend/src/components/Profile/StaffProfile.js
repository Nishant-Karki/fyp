import React from "react";
import ProfilePic from "../common/ProfilePic";
import {
  Container,
  Grid,
  makeStyles,
  Typography,
  Paper,
} from "@material-ui/core";
import CustomToolbar from "../common/CustomToolbar";

const useStyles = makeStyles((theme) => ({}));

export default function StaffProfile() {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <ProfilePic />
      <Typography variant="h6" align="center">
        Mizuhara Chizuru
      </Typography>

      <Grid container spacing={2} style={{ marginTop: "1rem" }}>
        <Grid item sm={5}>
          <Paper>
            <Grid container>
              <Grid item xs={12}>
                <CustomToolbar title="Personal Details" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item sm={7}>
          <Paper>
            <Grid container>
              <Grid item xs={12}>
                <CustomToolbar title="Upcoming Bookings" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <CustomToolbar title="Time Available" />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
