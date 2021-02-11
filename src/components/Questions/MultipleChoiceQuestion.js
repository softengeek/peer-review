import {
  Card,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Fragment, useState } from "react";
import { useStore } from "../../store/store";
import { QuestionControlButtons } from "./QuestionControlButtons";
import { QuestionHeader } from "./QuestionHeader";

const useStyles = makeStyles({
  bottomP: {
    marginBottom: "10px",
    padding: "0 20px 20px",
  },
  input: {
    display: "none",
    "& ~p": {
      backgroundColor: "#F2F3F3",
      color: "black",
      cursor: "pointer",
    },
    "& ~p:not(:last-child)": {
      padding: "20px 20px 0",
    },
    "&:checked ~ p": {
      backgroundColor: "#59636E",
      color: "white",
    },
    "&:hover ~ p": {
      backgroundColor: "#59636E",
      color: "white",
    },
  }
});

export const MultipleChoiceQuestion = ({ question, user, submitAnswer, skipQuestion, previousQuestion }) => {
  const classes = useStyles();
  const [state, dispatch] = useStore();
  const [answer, setAnswer] = useState({});
  const ansFound = state.answers.find( ans => ans.questionId === question.id && ans.userId === user.id);
  const [selectedOption, setSelectedOption] = useState(ansFound !== undefined ? ansFound.answer : 0);

  const generateOptions = () => {
    const optionHeadings = [
      "Please Improve",
      "You Were Good",
      "You Were Great",
    ];
    return question.options.map((option) => (
      <label
        key={option.value}
        htmlFor={option.value}
        className={classes.label}
      >
        <input
          type="radio"
          className={classes.input}
          id={option.value}
          name="multiple-choice"
          value={option.value}
          checked={selectedOption === option.value}
          onChange={() => updateAnswer(option.value)}
        />
        <Typography variant="body1">
          {optionHeadings[option.value - 1]}
        </Typography>
        <Typography variant="body1" className={classes.bottomP}>
          {option.label}
        </Typography>
      </label>
    ));
  };

  const updateAnswer = (optionAnswer) => {
    let ans = {
      questionId: question.id,
      answer: optionAnswer,
      userId: user.id,
    };

    setSelectedOption(optionAnswer);
    setAnswer(ans);
  };

  return (
    <Fragment>
      <QuestionHeader label={question.label} user={user} />
      <Card>
        <CardContent>
          <div>{generateOptions()}</div>

          <QuestionControlButtons
            active={selectedOption !== 0}
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
