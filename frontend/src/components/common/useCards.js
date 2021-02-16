import React from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  makeStyles,
} from "@material-ui/core";

import { FaFacebook, FaInstagram } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";

import "../scss/sliderCard.scss";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    "&:hover": {
      boxShaow: "5px 5px #808080",
    },
  },
});

export default function useCards() {
  const classes = useStyles();

  const ServiceCard = (props) => {
    const { title, description, btnTitle, image } = props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia component="img" height="150" image={image} />
          <CardContent>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small">{btnTitle}</Button>
        </CardActions>
      </Card>
    );
  };

  const SliderCard = (props) => {
    const { name, position, description, insta, fb, twitter } = props;
    return (
      <div className="team-container">
        <div className="member-info-container">
          <div className="member-info">
            <Typography variant="h5">{name}</Typography>
            <Typography>{position}</Typography>
            <Typography>{description}</Typography>
            <ul className="social-media-team">
              <li>
                <Link to={insta} className="icon">
                  <FaInstagram />
                </Link>
              </li>
              <li>
                <Link to={fb} className="icon">
                  <FaFacebook />
                </Link>
              </li>
              <li>
                <Link to={twitter} className="icon">
                  <AiFillTwitterCircle />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return { SliderCard, ServiceCard };
}
