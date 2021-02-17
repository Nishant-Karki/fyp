import React, { useState } from "react";

import { Avatar, makeStyles, Badge, Box } from "@material-ui/core";

import { AiFillCamera } from "react-icons/ai";
import useCustomForm from "../common/useCustomForm";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  imgSize: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  box: {
    marginTop: theme.spacing(10),
  },
  //change image icon
  changeImg: {
    backgroundColor: "green",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "2rem",
    height: "2rem",
    borderRadius: "1rem",
    overflow: "hidden",
    "&:hover": {
      width: "3.8rem",
      height: "2rem",
    },
  },
  profileName: {
    marginTop: "0.7rem",
    marginLeft: "0.8rem",
  },
}));

export default function ProfilePic({ source }) {
  const classes = useStyles();

  const { ImageInput } = useCustomForm();

  const [icon, setIcon] = useState(<AiFillCamera size={18} />);
  const [image, setImage] = useState(source);

  const BadgeComponent = () => {
    const addImage = (e) => {
      const target = e.target.files[0];
      const url = URL.createObjectURL(target);
      setImage(url);
      setIcon(<AiFillCamera size={18} />);
    };
    return (
      <Box
        type="button"
        className={classes.changeImg}
        onMouseEnter={() => {
          setIcon(
            <ImageInput
              styling={{ marginTop: "0.5rem" }}
              onChange={(e) => addImage(e)}
            >
              <Typography variant="caption" style={{ padding: "1rem" }}>
                Change
              </Typography>
            </ImageInput>
          );
        }}
        onMouseLeave={() => {
          setIcon(<AiFillCamera size={18} />);
        }}
      >
        {icon}
      </Box>
    );
  };
  return (
    <div>
      <Box className={classes.box} display="flex" justifyContent="center">
        <Badge
          overlap="circle"
          badgeContent={<BadgeComponent />}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Avatar alt="profile" src={image} className={classes.imgSize} />
        </Badge>
      </Box>
    </div>
  );
}
