import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  feedback: {
    border: "1px solid #c7c7c7",
    padding: "40px 20px",
    marginTop: "50px"
  },
  button: {
    marginTop: "20px",
    width: "250px",
    height: "50px",
    backgroundColor: "#A752E3",
    color: "white",
    border: "1px solid #A752E3",
    "&:hover": {
      border: "1px solid #A752E3",
      color: "#A752E3",
      backgroundColor: "white",
    },
  },
});

export const NotFound = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container className={classes.feedback}>
      <Typography variant="h6">404</Typography>
      <Typography variant="h4">
        Sorry! The page you are looking for cannot be found. &#128546;
      </Typography>
      <Button  className={classes.button} onClick={ () => history.push('/')}>Back to Shared Feedback</Button>
    </Container>
  );
};
