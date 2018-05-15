import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Dialog from "material-ui/Dialog";
import KeyboardArrowLeft from "material-ui-icons/KeyboardArrowLeft";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import Slide from "material-ui/transitions/Slide";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import * as actions from "../Actions";
import classNames from "classnames";
import PageHeader from "./PageHeader";
import MessageFlow from "./MessageFlow";
import Avatar from "material-ui/Avatar";
import config from "../config/config";
import defaultAvatar from "../Assets/Images/defaultAvatar.png";

const styles = {
    appBar: {
        position: "relative",
        backgroundColor: "#1976D2"
    },
    flex: {
        flex: 1,
        textAlign: "left"
    },
    messageLine: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        borderBottom: "1px solid grey",
        fontSize: 13,
        marginBottom: 5
    },
    unread: {
        fontWeight: "bold"
    },
    hasRead: {
        fontWeight: "regular",
        color: "grey",
    },
    avatar: {
        margin: "10px 10px 5px 10px",
        display: "inline-block"
    },
    theme: {
        fontSize: "1rem",
        fontWeight: "bold",
        margin: "10px 0"
    },

    yousaid: {
        color: "grey"
    }
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Message extends Component {
    state = {
        open: false,
        messageFlow: []
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    // componentDidMount() {
    //     this.props.fetchMyMessages();
    // }

    renderEachMessageFlowPopup(fromWho, to, messages) {
        let messageFlow = [];
        messages.forEach(message => {
            if (
                (message.from === fromWho && message.to === to) ||
                (message.from === to && message.to === fromWho)
            ) {
                messageFlow.push(message);
            }
        });

        this.setState({
            messageFlow
        });
    }

    markAsRead(fromWho, to, activityId) {
        console.log("markedAsRead function is called............");
        this.props.markAsRead(fromWho, to, activityId);
    }

    renderMessages(messages, index) {
        // console.log("messages By activityiD", index, messages);
        const { classes } = this.props;
        let senders = [];
        // messages has been sorted by time latest - oldest,
        // so the returned div must be the latest message that we need to show here.
        return messages.map(message => {
            if (message.from !== message.self) {
                if (senders.indexOf(message.from) === -1) {
                    senders.push(message.from);
                    return (
                        <div className={classes.messageLine} key={message.id}>
                            <Avatar
                                alt="message receiver"
                                src={
                                    message.imageurl ? (
                                        config.BUCKET_URL + message.imageurl
                                    ) : (
                                        defaultAvatar
                                    )
                                }
                                className={classes.avatar}
                            />

                            <div
                                className={
                                    !message.toHasRead ? (
                                        classes.unread
                                    ) : (
                                        classes.hasRead
                                    )
                                }
                                onClick={e => {
                                    this.handleClickOpen();
                                    this.renderEachMessageFlowPopup(
                                        message.from,
                                        message.to,
                                        messages
                                    );
                                    if (
                                        !e.target.className.includes("hasRead")
                                    ) {
                                        this.markAsRead(
                                            message.from,
                                            message.to,
                                            message.activityId
                                        );
                                    }
                                }}
                            >
                                {message.username}: {message.message}
                            </div>
                        </div>
                    );
                }
                // this block means the latest message is sent from yourself, so it does not need to call markAsRead function
            } else if (message.to !== message.self) {
                if (senders.indexOf(message.to) === -1) {
                    senders.push(message.to);
                    return (
                        <div className={classes.messageLine} key={message.id}>
                            <Avatar
                                alt="message receiver"
                                src={
                                    message.imageurl ? (
                                        config.BUCKET_URL + message.imageurl
                                    ) : (
                                        defaultAvatar
                                    )
                                }
                                className={classes.avatar}
                            />

                            <div
                                className={classes.hasRead}
                                onClick={() => {
                                    this.handleClickOpen();
                                    this.renderEachMessageFlowPopup(
                                        message.from,
                                        message.to,
                                        messages
                                    );
                                }}
                            >
                                {message.username}{" "}
                                <span className={classes.yousaid}>
                                    you said: {message.message}
                                </span>
                            </div>
                        </div>
                    );
                }
            }
        });
    }
    renderByActivityIds(messageObject) {
        const { classes } = this.props;
        if (messageObject && messageObject.hasOwnProperty("warning")) {
            return <div>{messageObject["warning"]}</div>;
        }
        if (messageObject && Object.keys(messageObject).length > 0) {
            return _.map(messageObject, (messages, index) => {
                return (
                    <div key={index}>
                        <div className={classes.theme}>
                            <Link
                                className="unlink"
                                to={`/activity/${index}/CH`}
                            >
                                {messages[0].activityTheme}
                            </Link>
                        </div>
                        <div>{this.renderMessages(messages, index)}</div>
                    </div>
                );
            });
        }
    }
    render() {
        const { messageObject, fullScreen, classes } = this.props;
        const { messageFlow } = this.state;
        return (
            <div className="wrapper">
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    transition={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                onClick={this.handleClose}
                                aria-label="Return"
                            >
                                <KeyboardArrowLeft />
                            </IconButton>
                            <Typography
                                color="inherit"
                                className={classes.flex}
                            >
                                返回消息中心首页
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <MessageFlow
                        messageFlow={messageFlow}
                        showLatestFlow={(fromWho, to, activityId) =>
                            this.renderEachMessageFlowPopup(
                                fromWho,
                                to,
                                messageObject[activityId]
                            )}
                    />
                </Dialog>
                <PageHeader hide title="我的消息中心" />
                {this.renderByActivityIds(messageObject)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    // console.log("messageObject", state.MessageReducer.messageObject);
    return {
        messageObject: state.MessageReducer.messageObject
    };
};
export default connect(mapStateToProps, actions)(withStyles(styles)(Message));