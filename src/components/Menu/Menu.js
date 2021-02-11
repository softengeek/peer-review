import {
  AppBar,
  Button,
  Grid,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  appbar: {
    backgroundColor: "#F2F3F4",
    color: "black",
  },
  toolbar: {
    display: "flex",
  },
  logo: {
    flex: "1",
    "& h4": {
      fontWeight: 700,
    },
  },
  menuList: {
    flex: "5",
    display: "flex",
    justifyContent: "space-evenly",
  },
  menuItem: {
    listStyleType: "none",
    cursor: "pointer",
    '& .active': {
        borderBottom: "2px solid #A752E3",
        paddingBottom: "10px",
    },
    "&:hover": {
      "& span": {
        borderBottom: "2px solid #A752E3",
        paddingBottom: "10px",
      },
    },
  },
});

export const Menu = () => {
  const classes = useStyles();
  const headers = [ {link: '/', text: "Share Feedback"}, {link: '/my-feedback', text: "My Feedback"}, {link: '/team-feedback', text:  "Team Feedback"}, {link: '/teams', text:  "Teams"}];

  const generateMenuButtons = () => {
    return headers.map((header, index) => (
      <li className={classes.menuItem} key={index}>
        <NavLink exact to={header.link}>
          <Typography variant="body1" component="span">
            {header.text}
          </Typography>
        </NavLink>
      </li>
    ));
  };

  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.logo}>
          <Typography variant="h4">Honesto</Typography>
        </div>
        <ul className={classes.menuList}>{generateMenuButtons()}</ul>
      </Toolbar>
    </AppBar>
  );
};
