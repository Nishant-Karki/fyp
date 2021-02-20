import React from "react";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

export default function CustomSnackbar(props) {
  const { setSnackbar, snackbarOpen, snackContent, snackType } = props;
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={() => setSnackbar(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert
        variant="filled"
        onClose={() => setSnackbar(false)}
        severity={snackType}
      >
        {snackContent}
      </Alert>
    </Snackbar>
  );
}
