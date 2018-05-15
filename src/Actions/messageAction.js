import axios from "axios";
import { SEND_MESSAGE, FETCH_MY_MESSAGES, MARK_AS_READ } from "./types";
import config from "../config/config";
const ROOT_URL = config["ROOT_URL"];

export const sendMessage = (to, message, activityId) => async dispatch => {
    const res = await axios.post(
        `${ROOT_URL}/api/sendMessage`,
        {
            to,
            message,
            activityId
        },
        {
            headers: {
                authorization: localStorage.getItem("jwtToken")
            }
        }
    );
    dispatch({
        type: SEND_MESSAGE,
        payload: res.data
    });
};

export const fetchMyMessages = () => async dispatch => {
    const res = await axios.get(`${ROOT_URL}/api/fetchMyMessages`, {
        headers: {
            authorization: localStorage.getItem("jwtToken")
        }
    });

    dispatch({
        type: FETCH_MY_MESSAGES,
        payload: res.data
    });
};

export const markAsRead = (fromWho, to, activityId) => async dispatch => {
    const res = await axios.post(
        `${ROOT_URL}/api/markAsRead`,
        {
            from: fromWho,
            to,
            activityId
        },
        {
            headers: {
                authorization: localStorage.getItem("jwtToken")
            }
        }
    );
    dispatch({
        type: MARK_AS_READ,
        payload: res.data
    });
};