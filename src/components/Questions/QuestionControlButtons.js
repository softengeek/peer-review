import { Button, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '30px'
    },
    next: {
        width: '120px',
        border: '1px solid #ACB1B7',
        backgroundColor: '#ACB1B7',
        color: 'white',
        '&:hover:not(:disabled)': {
            backgroundColor: '#A752E3',
            borderColor: '#A752E3',
        }
    },
    button: {
        width: '120px',
        '&:hover:not(:disabled)': {
            color: '#A752E3',
            borderColor: '#A752E3',
            backgroundColor: 'white'
        }
    }
});

export const QuestionControlButtons = ({required, active, answer, submitAnswer, index, previousQuestion}) => {
    const classes = useStyles();
    const ans = {
        
      };

    return (
        <div className={classes.container}>
            <Button variant="outlined" size="large" className={classes.button} onClick={previousQuestion} disabled={index === 0}>
                Previous
            </Button>
            <Button variant="outlined" disabled={required} size="large" className={classes.button} onClick={(e) => { e.preventDefault(); submitAnswer("SKIPPED")}}>
                Skip
            </Button>
            <Button variant="contained" disabled={!active} className={classes.next} size="large" onClick={ (e) => { e.preventDefault(); submitAnswer(answer)}}>
                Next
            </Button>
        </div>
    )
}