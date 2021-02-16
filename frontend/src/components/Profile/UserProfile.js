import React, { useState } from "react";
import {
  Container,
  makeStyles,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Toolbar,
} from "@material-ui/core";
import useCustomForm from "../common/useCustomForm";

import { AiFillDelete } from "react-icons/ai";
import { FaPenSquare } from "react-icons/fa";

import ProfilePic from "../common/ProfilePic";
import CustomToolbar from "../common/CustomToolbar";

import EditDetails from "./EditDetails";
import useSettings from "./useSettings";

import { withRouter, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  profileName: {
    marginTop: "0.7rem",
    marginLeft: "0.8rem",
  },
}));

function UserProfile() {
  const classes = useStyles();
  const { ChangePassword, DeleteAccount } = useSettings();

  const [DetailPopUp, setDetailPopUp] = useState(false);
  // const [passwordPopUp, setPasswordPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);

  const GridContent = ({ children, xs }) => {
    return (
      <Grid item xs={xs}>
        <Typography variant="body2" style={{ paddingBottom: "0.5rem" }}>
          {children}
        </Typography>
      </Grid>
    );
  };

  const FlexContent = ({ name, children, color = "inherit", onClick }) => {
    return (
      <Box
        display="flex"
        type="button"
        justifyContent="space-between"
        onClick={onClick}
      >
        <Typography
          color={color}
          variant="body2"
          style={{ paddingBottom: "0.7rem" }}
        >
          {name}
        </Typography>
        <Typography color={color}>{children}</Typography>
      </Box>
    );
  };

  return (
    <Container maxWidth="md">
      <ProfilePic />
      <Typography variant="h6" className={classes.profileName} align="center">
        Mizuhara Chizuru
      </Typography>

      <Grid container component="div" spacing={4} style={{ marginTop: "2rem" }}>
        <Grid item xs={12} sm={6}>
          <Paper>
            <CustomToolbar button="true" title="Personal Details">
              <Button onClick={() => setDetailPopUp(true)}>
                <FaPenSquare size={20} />
              </Button>
            </CustomToolbar>
            {/* to open popup */}
            <EditDetails
              detailPopUp={DetailPopUp}
              setDetailPopUp={setDetailPopUp}
            />

            <Box style={{ padding: "0.5rem 1.5rem 1rem 1.5rem" }}>
              <Grid container component="div">
                <GridContent xs={4}>Name</GridContent>
                <GridContent xs={6}>Kaizoku Nish</GridContent>
              </Grid>
              <Grid container component="div">
                <GridContent xs={4}>Email</GridContent>
                <GridContent xs={6}>karkinishant14@gmail.com</GridContent>
              </Grid>
              <Grid container component="div">
                <GridContent xs={4}>Birthday</GridContent>
                <GridContent xs={6}>August 3,2000</GridContent>
              </Grid>
              <Grid container component="div">
                <GridContent xs={4}>Contact</GridContent>
                <GridContent xs={6}>9840209779</GridContent>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        {/* settings */}
        <Grid item xs={12} sm={6}>
          <Paper>
            <CustomToolbar title="Account Settings" />
            <Box style={{ padding: "0.5rem 1.5rem 0.5rem 1.5rem" }}>
              {/* <FlexContent name="Change Password">
                <IoIosRepeat size={18} />
              </FlexContent> */}
              <FlexContent
                color="error"
                name="Delete Account"
                onClick={() => {
                  setDeletePopUp(true);
                  console.log(deletePopUp);
                }}
              >
                <AiFillDelete size={18} />
              </FlexContent>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <DeleteAccount
        deletePopUp={deletePopUp}
        setDeletePopUp={setDeletePopUp}
      />
      <Link to="/login">
        <Typography
          type="button"
          onClick={() => localStorage.removeItem("token")}
        >
          LOGOUT
        </Typography>
      </Link>
      {/* <PopUp
        openPopUp={deletePopUp}
        setOpenPopUp={setDeletePopUp}
        title="Alert"
      >
        <Box width="12rem">
          <Typography>
            Deleting your account will remove all the records from our database.
          </Typography>
          <Button>Proceed</Button>
          <Button>Abort</Button>
        </Box>
      </PopUp> */}

      {/* recent activities */}
      <Paper style={{ marginTop: "2rem" }}>
        <CustomToolbar title="Recent Activities" />
        <Toolbar>No Recent Activities</Toolbar>
      </Paper>
    </Container>
  );
}
export default withRouter(UserProfile);
