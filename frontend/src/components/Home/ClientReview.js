import { Avatar } from "@material-ui/core";
import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import { Container } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  imgSize: {
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
  container: {
    marginTop: "10%",
    marginBottom: "10%",
  },
}));

const reviews = [
  {
    id: 1,
    name: "Saladaas",
    review:
      "Thank you so much for the wonderful work you do! I love my cut and color. And best of all, I know I can always depend on walking out of your salon feeling and looking my best!",
    image: "client1",
  },
  {
    id: 2,
    name: "No name",
    review:
      "Excellent service. They are so experienced for every individuals problems/ concerns and deal accordingly. The treatment is awesome, feel like heaven. Recommended to have all the treatments here",
    image: "client2",
  },
  {
    id: 3,
    name: "Name",
    review:
      "This was my first time and everything was great, the service was lovely.",
    image: "client3",
  },
];

const Client = ({ item }) => {
  const classes = useStyles();
  return (
    <div>
      <Box marginBottom="1rem">
        <Box display="flex" justifyContent="center">
          <Avatar
            className={classes.imgSize}
            src={require(`../../images/other/${item.image}.png`).default}
          ></Avatar>
        </Box>
        <Box textAlign="center" style={{ marginTop: "1rem" }}>
          <Typography variant="subtitle">{item.review}</Typography>
        </Box>
      </Box>
    </div>
  );
};

function ClientReview() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h4" align="center" style={{ marginBottom: "1rem" }}>
        WHAT CLIENTS SAY
      </Typography>
      <Grid container spacing={4} component="div" style={{ padding: "2rem" }}>
        {reviews.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Client item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ClientReview;
