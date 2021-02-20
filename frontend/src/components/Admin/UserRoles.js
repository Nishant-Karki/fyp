import {
  Typography,
  Button,
  Paper,
  Box,
  Container,
  InputAdornment,
  TextField,
  Grid,
} from "@material-ui/core";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import PopUp from "../common/PopUp";
import { RadioGroup } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import CustomSnackbar from "../common/CustomSnackbar";

export default function UserRoles() {
  //state for snackbar
  const [response, setResponse] = useState();
  const [snackbar, setSnackbar] = useState(false);
  const [snackType, setSnackType] = useState();

  //for popup
  const [openPopUp, setOpenPopUp] = useState(false);

  //to store role
  const [role, setRole] = useState("C");

  //for search box value
  const [value, setValue] = useState("");

  //data from backend
  const [userData, setUserData] = useState(null);

  const fetchUser = () => {
    axios.post("/userRole", { email: value }).then((res) => {
      setUserData(res.data.result);
      setSnackbar(true);
      setResponse(res.data.message);
      setSnackType(res.data.type);
    });
  };

  console.log(response);
  const updateUser = (id) => {
    axios.post("/updateRole", { id: id, role: role }).then((res) => {
      setSnackbar(true);
      setResponse(res.data.message);
      setSnackType(res.data.type);
      axios
        .post("/userRole", { email: value })
        .then((res) => setUserData(res.data.result));
    });
    setOpenPopUp(false);
  };
  return (
    <Container maxWidth="md" style={{ marginTop: "10rem" }}>
      {response && response.length > 0 && (
        <CustomSnackbar
          snackbarOpen={snackbar}
          setSnackbar={setSnackbar}
          snackType={snackType}
          snackContent={response}
        />
      )}
      <Typography variant="h6">User Roles</Typography>
      <Grid container justify="center">
        <Grid item xs={4}>
          <TextField
            label="Search User"
            variant="outlined"
            value={value}
            type="text"
            placeholder="Email Address"
            onChange={(e) => setValue(e.target.value)}
            size="small"
            color="secondary"
            fullWidth
            inputProps={{
              maxLength: 50,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BsSearch />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={() => fetchUser()}
            style={{
              marginLeft: "2rem",
              width: "8rem",
              backgroundColor: "teal",
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      {userData &&
        userData.length > 0 &&
        userData.map((item) => (
          <Box
            key={item.user_id}
            marginTop="2rem"
            display="flex"
            justifyContent="center"
          >
            <Paper style={{ padding: "1.5rem", width: "29.2rem" }}>
              <Typography
                align="center"
                variant="h6"
                style={{ paddingBottom: "1rem" }}
              >
                USER DETAIL
              </Typography>
              <Grid container justify="center" style={{ paddingLeft: "4rem" }}>
                <Grid item xs={5}>
                  <Typography variant="body1">Username</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body1">{item.name}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">Email id</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body1">{item.email}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1">Role</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body1">
                    {item.role === "A" ? (
                      <span>Admin</span>
                    ) : item.role === "S" ? (
                      <span>Staff</span>
                    ) : (
                      <span>Client</span>
                    )}
                  </Typography>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="center" marginTop="1.2rem">
                <Button
                  style={{ backgroundColor: "teal", width: "12rem" }}
                  onClick={() => setOpenPopUp(true)}
                >
                  <Typography>Change Role</Typography>
                </Button>
              </Box>
            </Paper>
            <PopUp
              title="Choose User Role"
              openPopup={openPopUp}
              setOpenPopup={setOpenPopUp}
            >
              <Box width="20rem">
                <RadioGroup
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <FormControlLabel
                    value="C"
                    control={<Radio />}
                    label="Client"
                  />
                  <FormControlLabel
                    value="A"
                    control={<Radio />}
                    label="Admin"
                  />
                  <FormControlLabel
                    value="S"
                    control={<Radio />}
                    label="Staff"
                  />
                </RadioGroup>

                <Box style={{ marginTop: "1rem" }}>
                  <Button onClick={() => updateUser(item.user_id)}>
                    <Typography>Proceed</Typography>
                  </Button>
                  <Button onClick={() => setOpenPopUp(false)}>
                    <Typography>Abort</Typography>
                  </Button>
                </Box>
              </Box>
            </PopUp>
          </Box>
        ))}
    </Container>
  );
}
