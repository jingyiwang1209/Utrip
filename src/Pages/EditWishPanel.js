import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { reduxForm, Field } from "redux-form";
import { withStyles } from "material-ui/styles";
import { withRouter } from "react-router";
import * as actions from "../Actions";
import PageHeader from "./PageHeader";
import validate from "../Utility/validate";
import popupSearchDateField from "../Components/container/popupSearchDateField";
import popupSearchMultiServices from "../Components/container/popupSearchMultiServices";
import AutocompleteField from "../Components/container/AutocompleteField";
import { TextField } from "redux-form-material-ui";
import Dialog from "material-ui/Dialog";
import services from "../Data/services";
import ConfirmDelete from "./ConfirmDelete";
import RegisterDialog from "./RegisterDialog";
import Bigbutton from "./Bigbutton";
import moment from "moment";
import "moment/locale/zh-cn.js";

moment.locale("zh-cn");

const styles = theme => ({
    root: {
        width: 500
    },

    btnGroup: {
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
        // border:"1px solid green"
    },

    textField: {
        padding: "8px 0"
        // border: "1px solid blue"
    }
});

class EditWishPanel extends Component {
    state = {
        open: false
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    componentWillMount() {
        const { wishId } = this.props.match.params;
        this.props.fetchOneUserWishForEditting(wishId);
    }

    //  need userId to push back to this user's wish list
    deleteWish(userId) {
        const { wishId } = this.props.match.params;
        const { history } = this.props;
        this.props.deleteUserWish(wishId, history, userId);
    }

    submitForm(values) {
        const keys = [
            "location",
            "budget",
            "numberOfPeople",
            "departdate",
            "finishdate",
            "services",
            "note"
        ];
        const { edit, history } = this.props;
        const { wishId } = this.props.match.params;
        let edittedValues = {};
        keys.forEach(key => {
            if (key === "services") {
                if (_.isEqual(edit[key], values[key]) === false) {
                    edittedValues[key] = values[key];
                }
            } else {
                if (edit[key] !== values[key]) {
                    edittedValues[key] = values[key];
                }
            }
        });
        // console.log(edittedValues);
       // TEMP VERSION CH FOR AVOIDING MISTAKE!
        if (Object.keys(edittedValues).length === 0) {
            history.push(`/wish/${wishId}/CH`);
            return null;
        }

        this.props.updateUserWish(wishId, edittedValues, history);
    }

    renderEditPanel(classes) {
        if (this.props.error) {
            return <div>{this.props.error}</div>;
        }
        if (!localStorage["jwtToken"]) {
            return null;
        }

        const { edit, msg } = this.props;
        // receive { warning:"xxx"} from backend. edit initial value is {}, so still use obj to pass warning msg here
        if (Object.keys(edit).length === 0) {
            return null;
        } else if (edit.hasOwnProperty("warning")) {
            return <div style={{ textAlign: "center" }}>{edit.warning}</div>;
        }

        return (
            <div style={{ marginBottom: 60 }}>
                <div className="form-group" key="basic">
                    <h4 className="category-title">愿望基本信息</h4>
                    <Field
                        fullWidth
                        key="location"
                        name="location"
                        type="text"
                        component={AutocompleteField}
                        className="text-field"
                        label="愿望所在的国家和城市"
                        props={this.props}
                        defaultValue={edit.location}
                        marker="loc"
                    />

                    <Field
                        fullWidth
                        key="budget"
                        name="budget"
                        type="text"
                        component={TextField}
                        className={classes.textField}
                    />
                    <Field
                        fullWidth
                        key="numberOfPeople"
                        name="numberOfPeople"
                        type="text"
                        component={TextField}
                        className={classes.textField}
                    />
                </div>

                <div key="date" className="form-group">
                    <h4 className="category-title">行程时间</h4>
                    <Field
                        key="dapartdate"
                        name="departdate"
                        type="text"
                        component={popupSearchDateField}
                        placeholder="愿望出发时间"
                        defaultValue={new Date(edit.departdate)}
                    />

                    <Field
                        key="finishdate"
                        name="finishdate"
                        type="text"
                        component={popupSearchDateField}
                        placeholder="愿望结束时间"
                        defaultValue={new Date(edit.finishdate)}
                    />
                </div>

                <div className="form-group">
                    <h4 className="category-title">需要的向导服务</h4>
                    <Field
                        key="services"
                        name="services"
                        component={popupSearchMultiServices}
                        data={services}
                    />
                </div>
                <div className="form-group">
                    <h4 className="category-title">额外说明</h4>
                    <Field
                        fullWidth
                        key="note"
                        name="note"
                        component={TextField}
                        id="multiline-flexible"
                        multiline
                        rowsMax="4"
                        placeholder="我对本地向导或者旅行体验的要求等等"
                        className={classes.textField}
                    />
                </div>
                <div className="input-success">{msg}</div>
                <div className={classes.btnGroup}>
                    <Bigbutton text="修改" type="submit" fixed/>
                    <Bigbutton
                        text="删除"
                        color="#D32F2F"
                        onClick={() => {
                            this.setState({
                                open: true
                            });
                        }}
                        fixed
                    />
                </div>
            </div>
        );
    }

    render() {
        const { classes, handleSubmit, fullScreen, edit } = this.props;
        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <div>
                        <ConfirmDelete
                            edit={edit}
                            onClick={this.handleClose}
                            onDelete={() => {
                                this.deleteWish(this.props.edit.userId);
                            }}
                        />
                    </div>
                </Dialog>
                <form
                    style={{ marginBottom: 0 }}
                    className="wrapper"
                    onSubmit={handleSubmit(this.submitForm.bind(this))}
                >
                    <PageHeader history={this.props.history} title="修改愿望" />
                    {this.renderEditPanel(classes)}
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        location,
        budget,
        numberOfPeople,
        note,
        departdate,
        finishdate,
        services
    } = state.WishReducer.edit;
    return {
        edit: state.WishReducer.edit,
        error: state.WishReducer.error,
        msg: state.WishReducer.message,
        initialValues: {
            location,
            budget,
            numberOfPeople,
            note,
            departdate,
            finishdate,
            services
        }
    };
};

EditWishPanel = reduxForm({
    form: "UpdateUserWish",
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
    enableReinitialize: true
})(withStyles(styles, { withTheme: true })(EditWishPanel));

export default (EditWishPanel = connect(mapStateToProps, actions)(
    EditWishPanel
));