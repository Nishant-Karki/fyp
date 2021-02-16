import {
  DialogContent,
  Box,
  Typography,
  DialogTitle,
  makeStyles,
  Dialog,
} from "@material-ui/core";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
  },
}));

export default function PopUp(props) {
  const classes = useStyles();
  const { title, children, openPopup, setOpenPopup } = props;
  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle style={{ marginTop: "-1.2rem" }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">{title}</Typography>

          <Typography variant="h6" type="button" component="span">
            <AiOutlineClose size={20} onClick={() => setOpenPopup(false)} />
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
