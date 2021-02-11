import { Card, CardContent, makeStyles, TextField, Typography } from "@material-ui/core";
import { Fragment, useState } from "react";
import { useStore } from "../../store/store";
import { QuestionControlButtons } from "./QuestionControlButtons";
import { QuestionHeader } from "./QuestionHeader";

const useStyles = makeStyles({
  textarea: {
    width: "100%",
  }
});

export const TextQuestion = ({
  question,
  user,
  submitAnswer,
  skipQuestion,
  previousQuestion,
}) => {
  const classes = useStyles();
  const [state, dispatch] = useStore();
  const ansFound = state.answers.find( ans => ans.questionId === question.id && ans.userId === user.id);
  const [textAnswer, setTextAnswer] = useState(ansFound !== undefined ? ansFound.answer : '');
  const [answer, setAnswer] = useState({});

  const updateAnswer = (event) => {
    let targetAnswer = event.target.value;

    let ans = {
      questionId: question.id,
      answer: targetAnswer,
      userId: user.id,
    };

    setTextAnswer(targetAnswer);
    setAnswer(ans);
  };

  return (
    <Fragment>
      <QuestionHeader label={question.label} user={user} />
      <Card>
        <CardContent>

          <TextField
            id="filled-multiline-flexible"
            className={classes.textarea}
            multiline
            rows={12}
            placeholder="Say Something"
            value={textAnswer}
            onChange={updateAnswer}
            variant="outlined"
          />
          <QuestionControlButtons
            active={textAnswer !== ""}
            answer={answer}
            submitAnswer={submitAnswer}
            required={question.required}
            previousQuestion={previousQuestion}
          />
        </CardContent>
      </Card>
    </Fragment>
  );
};
