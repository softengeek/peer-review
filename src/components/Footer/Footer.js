import { Container, makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles({
    footer: {
        backgroundColor: 'black',
        color: 'white',
       padding: '20px 0'
    },
    footerContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    copyright: {
        '& span': {
            fontWeight: 900
        }
    }
})
export const Footer = () => {
    const classes = useStyles();

    return(
        <div className={classes.footer}>
            <Container className={classes.footerContainer}>
                <Typography>
                    Theorem
                </Typography>
                <Typography className={classes.copyright}>
                    Copyright © 2018 <span>Theorem</span>, LLC. All Rights Reserved.
                </Typography>
            </Container>
        </div>
    )
}