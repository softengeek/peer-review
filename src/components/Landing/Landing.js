import {
  Button,
  Container,
  makeStyles,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useStore } from "../../store/store";
import { ADD_USERS } from "../../store/reducer";
import { Alert, Skeleton } from "@material-ui/lab";

const useStyles = makeStyles({
  container: {
    padding: "70px 0 40px",
  },
  heading: {
    paddingBottom: "20px",
  },
  table: {
    border: "1px solid rgba(224,224, 224, 1)",
  },
  avatar: {
    borderRadius: "50%",
    width: "70px",
  },
  button: {
    width: "200px",
    height: "50px",

    "&:hover": {
      border: "1px solid #A752E3",
      color: "#A752E3",
      backgroundColor: "white",
    },
    "&.fill": {
      backgroundColor: "#A752E3",
      color: "white",
      border: "1px solid #A752E3",
    },
    "&.submission": {
      backgroundColor: "white",
      color: "#A752E3",
      border: "1px solid #A752E3",
    },
  },
});

export const Landing = () => {
  const classes = useStyles();
  const history = useHistory();
  const url =
    "https://frontend-exercise-api.netlify.app/.netlify/functions/server/users";

  const [state, dispatch] = useStore();
  const [open, setOpen] = useState(false);

  useFetch(url, ADD_USERS, setOpen);

  const goToFeedback = (user) => {
    history.push(`/give-feedback/${user.id}`);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  return (
    <Container className={classes.container}>
      <div className={classes.heading}>
        <Typography variant="h4">
          {state.users.length == 0 ? <Skeleton /> : "Share Feedback"}
        </Typography>
      </div>
      <TableContainer>
        <Table className={classes.table}>
          <TableBody>
            {state.users.map((row) => {
              let user = state.reviewed.find((id) => id === row.id);
              return (
                <TableRow key={row.id}>
                  <TableCell width="3%">
                    <img
                      src={row.avatar}
                      alt="Employees Avatar"
                      className={classes.avatar}
                    />
                  </TableCell>
                  <TableCell width="30%">
                    {row.firstName} {row.lastName}
                  </TableCell>
                  <TableCell width="10%">
                    <Button
                      variant="contained"
                      className={`${classes.button} ${
                        user !== undefined ? "submission" : "fill"
                      } `}
                      size="large"
                      onClick={() => goToFeedback(row)}
                    >
                      {user === undefined ? "Fill Out" : "View Submission"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" onClose={handleClose}>
          Oops! Something went wrong, please try again in a bit
        </Alert>
      </Snackbar>
    </Container>
  );
};
