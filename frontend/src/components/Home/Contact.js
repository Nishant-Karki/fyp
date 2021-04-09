import {
  Typography,
  Box,
  Paper,
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ContactForm from "../common/ContactForm";
import CustomSnackbar from "../common/CustomSnackbar";

const useStyles = makeStyles({
  paper: {
    width: "40rem",
    padding: "2.5rem",
    height: "24rem",
  },
  box: {
    display: "flex",

    marginTop: "2rem",
  },
  submitBtn: {
    textAlign: "center",
    marginTop: "1.4rem",
  },
});

function Contact() {
  const classes = useStyles();

  const [response, setResponse] = useState();
  const [snackbar, setSnackbar] = useState(false);
  const [snackType, setSnackType] = useState();

  return (
    <>
      <div id="contact" style={{ marginBottom: "5rem" }}></div>
      {response && response.length > 0 && (
        <CustomSnackbar
          snackbarOpen={snackbar}
          setSnackbar={setSnackbar}
          snackType={snackType}
          snackContent={response}
        />
      )}
      {/* for smooth scrolling */}
      <div style={{ marginBottom: "5rem" }}></div>
      <Box>
        <Container className={classes.contactContainer}>
          <Typography variant="h4" align="center">
            GET IN TOUCH WITH US
          </Typography>
          <Box className={classes.box}>
            <Paper className={classes.paper}>
              <ContactForm
                subject="Feedback By"
                staff="false"
                setResponse={setResponse}
                setSnackType={setSnackType}
                setSnackbar={setSnackbar}
              />
            </Paper>
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1249.3886581548336!2d85.43926011041071!3d27.661511338019178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1617938896437!5m2!1sen!2snp"
              width="400"
              height="300"
              style={{
                border: 0,
                borderRadius: "10px",
                marginTop: "3rem",
                marginLeft: "4rem",
              }}
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Contact;
