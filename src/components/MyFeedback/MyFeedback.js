import {
  Box,
  Card,
  CardContent,
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
import { Alert } from "@material-ui/lab";
import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { ADD_USERS } from "../../store/reducer";
import { useStore } from "../../store/store";

const useStyles = makeStyles({
  container: {
    padding: "70px 0 40px",
  },
  heading: {
    paddingBottom: "15px",
  },
  view: {
    display: "flex",
  },
  leftView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "400px",
    border: "1px solid #c7c7c7",
  },
  rightView: {
    flex: 3,
    "&.inactive": {
      border: "0",
      visibility: "hidden",
    },
    display: "grid",
    gridTemplateColumns: "50% 50%",
    "& > *": {
      borderTop: "1px solid #c7c7c7",
      padding: "20px 10px",
    },
    "& > *:nth-last-child(-n+2) ": {
      borderBottom: "1px solid #c7c7c7",
      padding: "20px 10px",
    },
    "& > *:nth-child(odd)": {
      borderLeft: "1px solid #c7c7c7",
      padding: "20px 10px",
    },
    "& > *:nth-child(even)": {
      borderRight: "1px solid #c7c7c7",
      padding: "20px 10px",
    },
  },
  labelHeading: {
    padding: "10px 5px",
    color: "#999797",
  },
  boxContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  box: {
    width: "9%",
    height: "40px",
    backgroundColor: "#F2F2F4",
    "&.fill-red": {
      backgroundColor: "#DC521D",
    },
    "&.fill-orange": {
      backgroundColor: "#FF8B23",
    },
    "&.fill-green": {
      backgroundColor: "#2BBF68",
    },
  },
  boxMultiple: {
    width: "32%",
    height: "40px",
  },
  avatar: {
    width: "60px",
    borderRadius: "50%",
  },
  label: {
    width: "inherit",
    height: "100px",
  },
  feedback: {
    border: "1px solid #c7c7c7",
    padding: "40px 20px",
  },
  input: {
    display: "none",
    "&:checked ~div": {
      backgroundColor: "#F2F3F3",
    },
    "&:hover ~div": {
      backgroundColor: "#FBF7FD",
    },
    "& ~div": {
      width: "inherit",
      height: "inherit",
      cursor: "pointer",
      borderTop: "1px solid #c7c7c7",
      borderBottom: "1px solid #c7c7c7",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& img": {
        padding: "0 10px 0 25px",
      },
    },
  },
});

export const MyFeedback = () => {
  const classes = useStyles();
  const history = useHistory();

  const url =
    "https://frontend-exercise-api.netlify.app/.netlify/functions/server/users";

  const [state, dispatch] = useStore();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [reviewedUsers, setReviewedUsers] = useState([]);
  const [open, setOpen] = useState(false);

  useFetch(url, ADD_USERS, setOpen);

  useEffect(() => {
    const users = state.users.filter((usr) => state.reviewed.includes(usr.id));
    setReviewedUsers(users);
  }, []);

  const generateUsers = () => {
    return reviewedUsers.map((user) => (
      <label key={user.id} htmlFor={user.id} className={classes.label}>
        <input
          type="radio"
          className={classes.input}
          id={user.id}
          name="multiple-choice"
          value={user.id}
          onChange={() => updateRightView(user.id)}
        />

        <div>
          <img
            src={user.avatar}
            alt="Employees Avatar"
            className={classes.avatar}
          />
          <Typography
            variant="body1"
            component="span"
            className={classes.bottomP}
          >
            {user.firstName} {user.lastName}
          </Typography>
        </div>
      </label>
    ));
  };

  const updateRightView = (userId) => {
    const answers = state.answers.filter((usr) => usr.userId === userId);
    setSelectedAnswers(answers);
    setSelectedUser(state.users.find((usr) => usr.id === userId));
  };

  const generateColour = (total, ans) => {
    if (ans <= total / 3) {
      return "red";
    } else if (ans <= (total * 2) / 3 && ans >= total / 3) {
      return "orange";
    } else {
      return "green";
    }
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/");
  };

  return (
    <Container className={classes.container}>
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
      {state.answers.length === 0 ? (
        <div className={classes.feedback}>
          <Typography variant="h4">No Feedback to display &#128302;</Typography>
          <Typography variant="body1">
            There is no feedback to display at this time - check back in a bit!
          </Typography>
        </div>
      ) : (
        <Fragment>
          <div className={classes.heading}>
            <Typography variant="h4">My Feedback</Typography>
          </div>
          <div className={classes.view}>
            <Box className={classes.leftView}>
              <label className={classes.labelHeading}>FEEDBACK RECEIVED</label>
              {generateUsers()}
            </Box>
            <Box
              className={`${classes.rightView}  ${
                Object.keys(selectedAnswers).length === 0 && "inactive"
              }`}
            >
              {Object.keys(selectedAnswers).length !== 0 && (
                <label className={classes.labelHeading}>
                  {selectedUser.firstName} {selectedUser.lastName}'s Feedback
                </label>
              )}
              <span></span>
              {Object.keys(selectedAnswers).length !== 0
                ? Object.keys(selectedAnswers).map((ans) => {
                    let question = state.questions.find(
                      (ques) => ques.id === selectedAnswers[ans].questionId
                    );
                    return (
                      <Fragment>
                        <Typography variant="body1">
                          {question.label}
                        </Typography>
                        <div className={classes.boxContainer}>
                          {question.type === "scale" &&
                            [...Array(10)].map((value, index) => (
                              <div
                                key={index}
                                className={`${
                                  index <= selectedAnswers[ans].answer - 1
                                    ? "fill"
                                    : ""
                                }-${generateColour(
                                  10,
                                  selectedAnswers[ans].answer
                                )}  ${classes.box}`}
                              ></div>
                            ))}

                          {question.type === "multipleChoice" &&
                            [...Array(3)].map((value, index) => (
                              <div
                                key={index}
                                className={`${
                                  index <= selectedAnswers[ans].answer - 1
                                    ? "fill"
                                    : ""
                                }-${generateColour(
                                  3,
                                  selectedAnswers[ans].answer
                                )}  ${classes.boxMultiple} ${classes.box}`}
                              ></div>
                            ))}
                          {question.type === "text" &&
                            selectedAnswers[ans].answer}
                        </div>
                      </Fragment>
                    );
                  })
                : ""}
            </Box>
          </div>
        </Fragment>
      )}
    </Container>
  );
};
