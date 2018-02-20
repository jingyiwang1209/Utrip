import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import bg from "../Assets/Images/bg.jpg";
import AddActivity from "./AddActivity/AddActivity";
import AddWish from "./AddWish/AddWish";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        width: "95%"
    }
});

class ActivityWishPanel extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className="wrapper">
                <div className="flex-inner-wrapper fixed-height">
                    <img src={bg} alt="chengdu" className="image-wrapper" />
                </div>
                <div className="flex-inner-wrapper">
                    <Link to="/addActivity">
                        <Button
                            color="primary"
                            raised
                            className={classes.button}
                            id="btn"
                        >
                            发布新活动
                        </Button>
                    </Link>
                    <Link to="/addWish">
                        <Button
                            color="primary"
                            raised
                            className={classes.button}
                            id="btn"
                        >
                            发布新愿望
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ActivityWishPanel);