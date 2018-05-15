import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import _ from "lodash";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Icon from "material-ui/Icon";
import * as actions from "../Actions";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Avatar from "material-ui/Avatar";
import config from "../config/config";
import defaultAvatar from "../Assets/Images/defaultAvatar.png";
import TagFaces from "material-ui-icons/TagFaces";

const styles = theme => ({
    container: {
        position: "relative",
        width: "95%",
        height: 500,
        maxWidth: 600,
        margin: "20px auto"
    },
    msgFlowWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 55,
        border: "1px solid #1976D2",
        padding: 10,
        borderRadius: "10px 10px 0 0",
        overflowX: "hidden",
        overflowY: "scroll"
    },
    msgInputZone: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 55,
        border: "1px solid #1976D2",
        borderTop:"none",
        borderRadius: " 0 0 10px 10px",
        padding:10
    },

    textField: {
        width: "80%",
        padding:5,
        fontSize:14,
        outline:"none"
    },
    msgRow: {
        marginBottom: 15
    },

    user: {
        color: "#1976D2",
        fontSize: 12
    },

    avatar: {
        display: "inline-block",
        width: 20,
        height: 20,
        verticalAlign: -5,
        marginRight: 5
    },
    message: {
        fontSize: 12,
        marginTop: 5,
        marginBottom: 3
    },
    sentTime: {
        float: "right",
        fontSize: 8,
        clear: "both"
    },
    icon: {
        width: 25,
        height: 25,
        verticalAlign: -10,
        color: "#757575",
        marginLeft: 2
    },
    rightIcon: {
        color: "#1976D2"
    }
});

// Yourself input message
class MessageFlow extends Component {
    state = {
        message: "",
        showEmoji: false
    };

    async sendMessage() {
        const messageToSent = this.state.message;
        const { messageFlow } = this.props;
        console.log(messageToSent);
        let to =
            messageFlow[0].from === messageFlow[0].self
                ? messageFlow[0].to
                : messageFlow[0].from;
        // console.log(to, messageToSent, messageFlow[0].activityId)
        let { activityId } = messageFlow[0];
        await this.props.sendMessage(to, messageToSent, activityId);
        // need to call the renderEachMessageFlowPopup again in Message to set the latest state of messageFlow to reflect your input
        this.props.showLatestFlow(messageFlow[0].self, to, activityId);
    }
    changeMessage(message) {
        this.setState({
            message
        });
    }
    renderImage(message) {
        if (message.from === message.self) {
            if (message.yourselfimageurl !== null) {
                return config.BUCKET_URL + message.yourselfimageurl;
            }
        } else {
            if (message.imageurl !== null) {
                return config.BUCKET_URL + message.imageurl;
            }
        }
        return defaultAvatar;
    }
    renderMessageFlow(classes, messageFlow) {
        messageFlow.sort(
            (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
        );
        return messageFlow.map(message => {
            return (
                <div className={classes.msgRow} key={message.id}>
                    <Avatar
                        alt="message receiver"
                        src={this.renderImage(message)}
                        className={classes.avatar}
                    />
                    <span className={classes.user}>
                        {message.from === message.self ? "我" : message.username}
                    </span>

                    <div className={classes.message}>{message.message}</div>
                    <div className={classes.sentTime}>{message.createdAt}</div>
                </div>
            );
        });
    }
    addEmoji(emoji) {
        console.log(emoji);
    }
    render() {
        const { classes, messageFlow } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.msgFlowWrapper}>
                    {this.renderMessageFlow(classes, messageFlow)}
                </div>
                <div className={classes.msgInputZone}>
                    <input
                        onChange={e => {
                            this.changeMessage(e.target.value);
                        }}
                        rows="4"
                        value={this.state.message}
                        label="输入消息"
                        type="text"
                        className={classes.textField}
                    />

                    <span
                        style={{marginRight:10}}
                        onClick={() =>
                            this.setState({
                                showEmoji: true
                            })}
                    >
                        <TagFaces className={classes.icon} />
                    </span>
                    {this.state.showEmoji ? (
                        <Picker title="选择你的emoji…" onSelect={this.addEmoji} />
                    ) : (
                        ""
                    )}
                    {this.state.message ? (
                        <Icon
                            onClick={() => {
                                this.sendMessage();
                                this.setState({
                                    message: ""
                                });
                            }}
                            className={classes.icon}
                        >
                            send
                        </Icon>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(withStyles(styles)(MessageFlow));