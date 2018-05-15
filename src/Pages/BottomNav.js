import React from "react";
import { withStyles } from "material-ui/styles";
import BottomNavigation, {
    BottomNavigationButton
} from "material-ui/BottomNavigation";
import Button from "material-ui/Button";
import UserFavorite from "material-ui-icons/Favorite";
import Report from "material-ui-icons/Report";

const styles = theme => ({
    root: {
        width: "100%",
        bottom: 0,
        inlineHeight: 1,
        position: "fixed",
        zIndex: 1000
        // border:"1px solid red",
    },
    bottomIcon: {
        display: "block"
    },
    broot: {
        minWidth: 60
    },

    bottomBtn: {
        position: "fixed",
        bottom: 0,
        right: 0,
        height: 58,
        // border: "1px solid red",
        borderRadius: 0,
        color: "#fff",
        width: "50%",
        marginRight: 0,
        fontSize: "1.2rem",
        letterSpacing: 2
    },

    bottomNavContainer: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        color: "#fff"
    }
});
const BottomNav = props => {
    const { classes, sub_value, onChange, onClick } = props;
    return (
        <span>
            <BottomNavigation
                value={sub_value}
                onChange={onChange}
                showLabels
                className={classes.bottomNavContainer}
            >
                <BottomNavigationButton
                    classes={{
                        icon: classes.bottomIcon,
                        root: classes.broot
                    }}
                    label="我的收藏"
                    icon={<UserFavorite />}
                    style={{ position: "fixed", bottom: 0, left: 0 }}
                />

                <BottomNavigationButton
                    classes={{
                        icon: classes.bottomIcon,
                        root: classes.broot
                    }}
                    style={{ position: "fixed", bottom: 0, left: 80 }}
                    label="举报该活动"
                    icon={<Report />}
                />
            </BottomNavigation>
            <Button
                style={{ backgroundColor: "#1976D2" }}
                raised
                className={classes.bottomBtn}
                onClick={onClick}
            >
                我有兴趣
            </Button>
        </span>
    );
};
export default withStyles(styles)(BottomNav);