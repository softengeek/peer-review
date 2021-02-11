import { Fragment, useEffect, useState } from "react";
import { Container, makeStyles, Snackbar } from "@material-ui/core";
import { ScaleQuestion } from "../Questions/ScaleQuestion";
import { MultipleChoiceQuestion } from "../Questions/MultipleChoiceQuestion";
import { TextQuestion } from "../Questions/TextQuestion";
import { useStore } from "../../store/store";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { ADD_ANSWERS, ADD_QUESTIONS, ADD_REVIEWED } from "../../store/reducer";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
  container: {
    padding: "70px 0 40px",
  },
});

export const GiveFeedback = () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();

  const [state, dispatch] = useStore();
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  const questionsURl =
    "https://frontend-exercise-api.netlify.app/.netlify/functions/server/questions";

  useFetch(questionsURl, ADD_QUESTIONS, setOpen);

  useEffect(() => {
    state.questions.length > 0 && setQuestion(state.questions[questionIndex]);
    setUser(state.users.find((usr) => usr.id === id));
  }, [state, questionIndex]);

  const onQuestionChange = (answer) => {
    let newAnswers = [...state.answers];

    let ansFound = newAnswers.find(
      (ans) =>
        ans.userId === answer.userId && ans.questionId === answer.questionId
    );

    if (ansFound !== undefined && newAnswers.length > 0) {
      let ansIndex = newAnswers.indexOf(ansFound);

      if (answer === "SKIPPED") {
        newAnswers[ansIndex] = {
          questionId: question.id,
          answer: "SKIPPED",
          userId: user.id,
        };
      } else {
        newAnswers[ansIndex] = answer;
      }
    } else {
      if (answer === "SKIPPED") {
        newAnswers.push({
          questionId: question.id,
          answer: "SKIPPED",
          userId: user.id,
        });
      } else {
        newAnswers.push(answer);
      }
    }

    nextQuestion();

    dispatch({
      type: ADD_ANSWERS,
      payload: newAnswers,
    });
  };

  const nextQuestion = () => {
    if (questionIndex !== state.questions.length - 1) {
      setQuestionIndex((index) => index + 1);
    } else {
      const reviewed = [...state.reviewed, id];
      dispatch({
        type: ADD_REVIEWED,
        payload: reviewed,
      });
      history.push(`/thank-you/${id}`);
    }
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/");
  };

  const previousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex((index) => index - 1);
    }
  };

  const generateQuestion = () => {
    if (question !== undefined && Object.keys(question).length > 0) {
      switch (question.type) {
        case "scale":
          return (
            <ScaleQuestion
              key={question.id}
              question={question}
              user={user}
              index={questionIndex}
              submitAnswer={onQuestionChange}
              previousQuestion={previousQuestion}
            />
          );

        case "multipleChoice":
          return (
            <MultipleChoiceQuestion
              key={question.id}
              question={question}
              user={user}
              index={questionIndex}
              submitAnswer={onQuestionChange}
              previousQuestion={previousQuestion}
            />
          );

        case "text":
          return (
            <TextQuestion
              key={question.id}
              question={question}
              user={user}
              index={questionIndex}
              submitAnswer={onQuestionChange}
              previousQuestion={previousQuestion}
            />
          );

        default:
          console.log(question.type);
          break;
      }
    }
  };

  return state.users.length === 0 ? (
    <Redirect to="/" />
  ) : (
    <Container className={classes.container}>
      <Fragment>{generateQuestion()}</Fragment>
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
