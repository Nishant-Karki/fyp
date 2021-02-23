import React from "react";
import ProfilePic from "../common/ProfilePic";
import {
  Container,
  Grid,
  Box,
  makeStyles,
  Typography,
  Paper,
} from "@material-ui/core";
import CustomToolbar from "../common/CustomToolbar";
import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";

const useStyles = makeStyles((theme) => ({}));

export default function StaffProfile() {
  const classes = useStyles();

  const userData = useSelector((state) => state.login.userData);
  const GridContent = ({ children, xs }) => {
    return (
      <Grid item xs={xs}>
        <Typography variant="body2" style={{ paddingBottom: "0.5rem" }}>
          {children}
        </Typography>
      </Grid>
    );
  };
  return (
    <Container maxWidth="md">
      <UserProfile />
      {userData.map((item) => (
        <div key={item.user_id}>
          <ProfilePic source={item.image} userId={item.user_id} />
          <Typography variant="h6" align="center">
            {item.name}
          </Typography>

          <Grid container spacing={2} style={{ marginTop: "1rem" }}>
            <Grid item sm={5}>
              <Paper>
                <Grid container>
                  <Grid item xs={12}>
                    <CustomToolbar title="Personal Details" />
                    <Box
                      style={{
                        padding: "0.5rem 1.5rem 1rem 1.5rem",
                        overflow: "hidden",
                      }}
                    >
                      <Grid container component="div">
                        <GridContent xs={4}>Name</GridContent>
                        <GridContent xs={6}>
                          {item.fname} {item.lname}
                        </GridContent>
                      </Grid>
                      <Grid container component="div">
                        <GridContent xs={4}>Email</GridContent>
                        <GridContent xs={6}>{item.email}</GridContent>
                      </Grid>
                      <Grid container component="div">
                        <GridContent xs={4}>Birthday</GridContent>
                        <GridContent xs={6}>
                          {item.dob ? item.dob : <>-</>}
                        </GridContent>
                      </Grid>
                      <Grid container component="div">
                        <GridContent xs={4}>Contact</GridContent>
                        <GridContent xs={6}>
                          {item.phone ? item.phone : <>-</>}
                        </GridContent>
                      </Grid>
                    </Box>
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
        </div>
      ))}
    </Container>
  );
}
