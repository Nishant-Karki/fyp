import { Button, Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Container } from "@material-ui/core";
import React from "react";
import useCustomForm from "../common/useCustomForm";

export default function UserRoles() {
  const { CustomTextField } = useCustomForm();
  return (
    <Container maxWidth="md">
      <Typography variant="h6">User Roles</Typography>
      <Grid container>
        <CustomTextField placeholder="Username" />
        <Button>Submit</Button>
      </Grid>
      <Paper>
        <Box padding="1.5rem">email-id name contact ROle</Box>
      </Paper>
    </Container>
  );
}
