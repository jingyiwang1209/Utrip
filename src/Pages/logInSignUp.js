import React from "react";
import { Link } from "react-router-dom";
import bg from "../Assets/Images/bg.jpg";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        width: "95%",
        padding: 20,
        fontSize: 16
    },

    wrapper: {
        width: "90%",
        margin: "auto",
        marginBottom: 98,
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center"
    },

    imageWrapper: {
        width: "100%",
        maxWidth: "100%",
        filter: "grayscale(40%)"
    },

    paddingUpper: {
        padding: "50px 20% 0 0"
    },

    paddingLower: {
        padding: "0 0 50px 20%"
    },

    buttonWrapper: {
        width: "80%",
        marginBottom: 20
    },

    button: {
        width: "100%",
        padding: 20,
        fontSize: 16
    }
});

const loginSignUp = props => {
    const { classes } = props;
    return (
        <div className={classes.wrapper}>
            <img src={bg} alt="chengdu" className={classes.imageWrapper} />

            <h2 className={classes.paddingUpper}>带你深入体验</h2>
            <h2 className={classes.paddingLower}>当地风土人情</h2>

            <Link to="/login" className={classes.buttonWrapper}>
                <Button
                    type="submit"
                    color="primary"
                    raised
                    className={classes.button}
                >
                    登陆已有账户
                </Button>
            </Link>

            <Link to="/signup" className={classes.buttonWrapper}>
                <Button
                    type="submit"
                    color="primary"
                    raised
                    className={classes.button}
                >
                    创建新账户
                </Button>
            </Link>

            <footer style={{ paddingLeft: 10 }}>
                注册代表已经同意<a>服务条款</a>，<a>隐私政策</a>，<a>免责声明</a>，<a>保障计划条款</a>，<a>使用政策须知</a>
            </footer>
        </div>
    );
};

export default withStyles(styles)(loginSignUp);