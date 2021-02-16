import { Button } from "@material-ui/core";
import { Grid, Box, Typography } from "@material-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import PopUp from "../common/PopUp";
import useCustomForm from "../common/useCustomForm";

export default function useSettings() {
  const { CustomTextField } = useCustomForm();

  const ChangePassword = () => {
    return (
      <Formik>
        {({ errors, touched, handleChange }) => (
          <Form>
            <Box width="10rem">
              <Grid container>
                <Grid item xs={12}>
                  <CustomTextField
                    variant="standard"
                    label="Name from db"
                    name="prevPassword"
                    type="text"
                    error={errors.prevPassword && touched.prevPassword}
                    onChange={handleChange}
                    errortext={errors.prevPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextField
                    variant="standard"
                    label="Name from db"
                    name="prevPassword"
                    type="text"
                    error={errors.prevPassword && touched.prevPassword}
                    onChange={handleChange}
                    errortext={errors.prevPassword}
                  />
                </Grid>{" "}
                <Grid item xs={12}>
                  <CustomTextField
                    variant="standard"
                    label="Name from db"
                    name="prevPassword"
                    type="text"
                    error={errors.prevPassword && touched.prevPassword}
                    onChange={handleChange}
                    errortext={errors.prevPassword}
                  />
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    );
  };

  const DeleteAccount = (props) => {
    const { deletePopUp, setDeletePopUp } = props;
    return (
      <PopUp
        title="Alert"
        openPopup={deletePopUp}
        setOpenPopup={setDeletePopUp}
      >
        <Box width="20rem">
          <Typography>
            Deleting your account will remove all the records from our database.
          </Typography>

          <Box style={{ marginTop: "1rem" }}>
            <Button>
              <Typography color="error">Proceed</Typography>
            </Button>
            <Button>
              <Typography onClick={() => setDeletePopUp(false)}>
                Abort
              </Typography>
            </Button>
          </Box>
        </Box>
      </PopUp>
    );
  };

  return { ChangePassword, DeleteAccount };
}
