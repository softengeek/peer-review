import { makeStyles, Typography } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
  typography: {
    flex: 5,
    maxWidth: '90%',
    marginRight: '20px',
    "& h5": {
      fontWeight: 900,
    },

  },
  subtitle: {
    color: "#ACAEB0",
    padding: "10px 0 20px",
  },
  avatar: {
    height: "50px",
    flex: 1,
    "& img": {
      borderRadius: "50%",
      width: "30%",
    },
  },
  back: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
});

export const QuestionHeader = ({ label, user }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <div>
        <Link to="/" className={classes.back}>
          <ChevronLeft fontSize="large" />
          <Typography variant="h5" component="span">
            Back
          </Typography>
        </Link>
      </div>
      <div className={classes.container}>
      
      <div className={classes.typography}>
        <Typography variant="h5">{label}</Typography>
        <Typography variant="body1" className={classes.subtitle}>
          SHARE YOUR FEEDBACK FOR{" "}
          {user != null &&
            `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`}
        </Typography>
      </div>
      <div className={classes.avatar}>
        <img src={user.avatar} alt="Employees Avatar" />
      </div>
    </div>
    </Fragment>
    
  );
};
