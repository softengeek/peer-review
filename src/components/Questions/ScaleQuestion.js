import {
  Box,
  Card,
  CardContent,
  makeStyles,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { Fragment, useState } from "react";
import { QuestionControlButtons } from "./QuestionControlButtons";
import { QuestionHeader } from "./QuestionHeader";
import { useStore } from "../../store/store";

const StyledRating = withStyles({
  iconFilled: {
    color: "#A752E3",
  },
  iconHover: {
    color: "#A752E3",
  },
})(Rating);

const useStyles = makeStyles({
  box: {
    position: "relative",
    paddingTop: "20px",
  },
  icon: {
    width: "100%",
    height: "100px",
    backgroundColor: "#F1F2F4",
    marginRight: "10px",
  },
  rating: {
    width: "100%",
  },
  subtitle: {
    color: "#ACAEB0",
    paddingBottom: "20px",
  },
  total: {
    textAlign: "right",
  }
});

export const ScaleQuestion = ({
  question,
  user,
  index,
  submitAnswer,
  skipQuestion,
  previousQuestion,
}) => {
  const classes = useStyles();
  const [state, dispatch] = useStore();
  const ansFound = state.answers.find(
    (ans) => ans.questionId === question.id && ans.userId === user.id
  );

  const [rating, setRating] = useState(
    ansFound !== undefined ? ansFound.answer : 0
  );
  const [answer, setAnswer] = useState({});


  const updateAnswer = (answerRating) => {
    if (answerRating !== null) {
      let ans = {
        questionId: question.id,
        answer: answerRating,
        userId: user.id,
      };

      setRating(answerRating);
      setAnswer(ans);
    } else {
      setRating(0);
    }
  };

  return (
    <Fragment>
      <QuestionHeader label={question.label} user={user} />
      <Card>
        <CardContent>

          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            efficitur eget sapien a efficitur. Ut eu nibh interdum, dignissim mi
            a, facilisis metus. Integer ac placerat magna. Suspendisse orci
            risus, sodales id lacus id, pulvinar convallis tortor. Ut massa
            massa, placerat lobortis odio et, semper cursus leo. Sed ac eleifend
            velit, ac dictum purus. Suspendisse luctus justo ultrices pulvinar
            elementum. Etiam congue dignissim erat eget mattis.
          </Typography>
          <Box className={classes.box}>
            <StyledRating
              name="customized-color"
              max={10}
              value={rating}
              spacing={0}
              defaultValue={0}
              className={classes.rating}
              onChange={(event, value) => updateAnswer(value)}
              precision={1}
              className={classes.rating}
              icon={<Box className={classes.icon} fontSize="inherit" />}
            />
          </Box>
          <Typography variant="body1" className={classes.total}>
            {`${rating}/10`}
          </Typography>
          <QuestionControlButtons
            active={rating !== 0}
            index={index}
            answer={answer}
            submitAnswer={submitAnswer}
            previousQuestion={previousQuestion}
            required={question.required}
          />
        </CardContent>
      </Card>
    </Fragment>
  );
};
