import {
  Button,
    Container,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useStore } from "../../store/store";

const useStyles = makeStyles({
    container: {
        padding: '70px 0 40px'
    },
    button: {
        backgroundColor: '#A752E3',
        color: 'white',
        border: '1px solid #A752E3',
        '&:hover': {
            border: '1px solid #A752E3',
            color: '#A752E3',
            backgroundColor: 'white'
        }
    },
    typography: {
        fontWeight: 900
    },
    avatar: {
      borderRadius: '50%',
      width: '70px'
    },
    table: {
      border: '1px solid rgba(224,224, 224, 1)',
      marginBottom: '40px'
    }
});

export const ThankYouPage = () => {
  const classes = useStyles();
  const [state, dispatch] = useStore();
  const [user, setUser] = useState();
  const history = useHistory();
  const { id } = useParams();

  const notReviewedUsers = state.users.filter(
    (usr) => !state.reviewed.includes(usr.id)
  );

  useEffect(() => {
    setUser(state.users.find((usr) => usr.id === id));
  }, []);

  const goToFeedback = (user) => {
    history.push(`/give-feedback/${user.id}`);
  };

  return (
    <Container>
      <div className={classes.container}>
          <Typography variant="h5" className={classes.typography}>
            Thank you for sharing your feedback!
          </Typography>
          <Typography variant="body1" className={classes.subtitle}>
            Continue to give feedback to other team members.
          </Typography>
      </div>
      <TableContainer>
        <Table className={classes.table}>
          <TableBody>
            {notReviewedUsers.map((row) => (
              <TableRow key={row.id}>
                <TableCell width="3%">
                  <img
                    src={row.avatar}
                    alt="Employees Avatar"
                    className={classes.avatar}
                  />
                </TableCell>
                <TableCell width="20%">
                  {row.firstName} {row.lastName}
                </TableCell>
                <TableCell width="10%">
                  <Button
                    variant="contained"
                    className={classes.button}
                    size="large"
                    onClick={() => goToFeedback(row)}
                  >
                    Fill Out
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
