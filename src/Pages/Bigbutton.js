import React from "react";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";

const styles = theme => ({
    button: {
        width: "95%"
    },
    fixedButton: {
        width: "50%",
        lineHeight: 0.6,
        height: 60,
        borderRadius: 0,
        fontSize: "1.5rem",
        color: "#fff"
    }
});

const Buttons = props => {
    const { classes, color, type, text, onClick, fixed } = props;
    return (
        <Button
            className={fixed ? classes.fixedButton : classes.button}
            style={{ background: color || "#1976D2" }}
            type={type || ""}
            raised
            id={fixed ? "" : "btn"}
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export default withStyles(styles)(Buttons);