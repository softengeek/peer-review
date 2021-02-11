import { makeStyles } from "@material-ui/core";
import { Fragment } from "react"
import { Footer } from "../Footer/Footer"
import { Menu } from "../Menu/Menu"

const useStyles = makeStyles({
      content: {
        minHeight: 'calc(100vh - 65px)'
      }
});

export const Layout = ({children}) => {
    const classes = useStyles();
    return (
        <Fragment>
            <div className={classes.content}>
            <Menu />
            {children}
            </div>
            <Footer className={classes.footer} />
        </Fragment>
    )
}