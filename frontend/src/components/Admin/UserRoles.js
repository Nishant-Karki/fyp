import {
  Typography,
  Button,
  Paper,
  Box,
  Container,
  InputAdornment,
  TextField,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  MenuItem,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import PopUp from "../common/PopUp";
import CustomSnackbar from "../common/CustomSnackbar";
import AdminDashboard from "./AdminDashboard";
import CustomToolbar from "../common/CustomToolbar";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { ListItem } from "@material-ui/core";
import {
  fetchStaffs,
  demoteStaff,
  fetchAdmin,
  demoteAdmin,
} from "../../redux/Booking/booking-actions";
import UserDataTable from "./UserDataTable";

export default function UserRoles() {
  //state for snackbar
  const [response, setResponse] = useState();
  const [snackbar, setSnackbar] = useState(false);
  const [snackType, setSnackType] = useState();

  //popup for demoting staff
  const [deletePopUp, setDeletePopUp] = useState(false);

  //for popup
  const [openPopUp, setOpenPopUp] = useState(false);

  //to store role
  const [role, setRole] = useState("C");

  //for search box value
  const [value, setValue] = useState("");

  //data from backend
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  // const [prevRole, setPrevRole] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdmin());
    dispatch(fetchStaffs());
  }, []);

  const staffsAvailable = useSelector((state) => state.booking.staffs);
  const adminsAvailable = useSelector((state) => state.booking.admins);

  const fetchUser = () => {
    axios.post("/userRole", { email: value }).then((res) => {
      setUserData(res.data.result);
      setSnackbar(true);
      setResponse(res.data.message);
      setSnackType(res.data.type);
    });
    setTimeout(() => {
      dispatch(fetchStaffs());
      dispatch(fetchAdmin());
    }, 1000);
  };

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
    setTimeout(() => {
      dispatch(fetchStaffs());
      dispatch(fetchAdmin());
    }, 1000);
  };
  const demoteAdmins = () => {
    setDeletePopUp(false);
    console.log(userId);
    dispatch(demoteAdmin(userId));
    setTimeout(() => {
      dispatch(fetchStaffs());
      dispatch(fetchAdmin());
    }, 1000);
  };

  const demoteStaffs = () => {
    dispatch(demoteStaff(userId));
    setDeletePopUp(false);
    // console.log(prevRole);
    // axios.post("/demoteStaff", { id: id }).then((res) => {
    setTimeout(() => {
      dispatch(fetchStaffs());
      dispatch(fetchAdmin());
    }, 1000);
    // setSnackbar(true);
    // setResponse(res.data.message);
    // setSnackType(res.data.type);
    // });
  };
  return (
    <AdminDashboard>
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
                  <Typography variant="body1">
                    {item.fname} {item.lname}
                  </Typography>
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
      <Grid container spacing={3} style={{ marginTop: "4rem" }}>
        <Grid item xs={12} md={6}>
          <Paper>
            <CustomToolbar variant="regular" title="Staffs Available" />
            {staffsAvailable && !staffsAvailable > 0 && (
              <ListItem>
                <Typography variant="body2" style={{ padding: "0.5rem" }}>
                  No Records Available
                </Typography>
              </ListItem>
            )}
            {staffsAvailable.map((staff) => (
              <ListItem
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="body2">
                  {staff.fname} {staff.lname}
                </Typography>
                <Typography
                  type="button"
                  variant="body2"
                  color="error"
                  onClick={() => {
                    setUserId(staff.user_id);
                    // setPrevRole(staff.role);
                    setDeletePopUp(true);
                  }}
                >
                  <AiFillDelete size="20" style={{ marginBottom: "0.4rem" }} />
                </Typography>
                <PopUp
                  title="Demote Staff"
                  openPopup={deletePopUp}
                  setOpenPopup={setDeletePopUp}
                >
                  <Typography color="error">
                    Note : Staff will be demoted to client and will be unable to
                    use features available for staffs.
                  </Typography>
                  <Box marginTop="1rem">
                    <Button onClick={() => demoteStaffs()}>Procceed</Button>
                    <Button onClick={() => setDeletePopUp(false)}>Abort</Button>
                  </Box>
                </PopUp>
              </ListItem>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper>
            {!adminsAvailable > 0 && (
              <ListItem>
                <Typography variant="body2" style={{ padding: "0.5rem" }}>
                  No Records Available
                </Typography>
              </ListItem>
            )}
            <CustomToolbar variant="regular" title="Admins" />
            {adminsAvailable?.map((admin) => (
              <ListItem
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="body2">
                  {admin.fname} {admin.lname}
                </Typography>
                <Typography
                  type="button"
                  variant="body2"
                  color="error"
                  onClick={() => {
                    setUserId(admin.user_id);
                    setDeletePopUp(true);
                  }}
                >
                  <AiFillDelete size="20" style={{ marginBottom: "0.4rem" }} />
                </Typography>
                <PopUp
                  title="Demote Admin"
                  openPopup={deletePopUp}
                  setOpenPopup={setDeletePopUp}
                >
                  <Typography color="error">
                    Note : Admin will be demoted to client and will be unable to
                    use features available for Admins.
                  </Typography>
                  <Box marginTop="1rem">
                    <Button onClick={() => demoteAdmins()}>Procceed</Button>
                    <Button onClick={() => setDeletePopUp(false)}>Abort</Button>
                  </Box>
                </PopUp>
              </ListItem>
            ))}
          </Paper>
        </Grid>
      </Grid>
      <Box marginTop="5rem">
        <UserDataTable />
      </Box>
    </AdminDashboard>
  );
}
