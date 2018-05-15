import {
    SEND_MESSAGE,
    FETCH_MY_MESSAGES,
    MARK_AS_READ
} from "../Actions/types";
import _ from "lodash";

const INITIAL_STATE = {
    message: "",
    messageObject: {},
    unread: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let { activityId } = action.payload;
            let newMessageObject = Object.assign({}, state.messageObject);
            if (newMessageObject[activityId]) {
                newMessageObject[activityId].unshift(action.payload);
            } else {
                newMessageObject[activityId] = [action.payload];
            }

            return { ...state, message: action.payload };
        case FETCH_MY_MESSAGES:
            if(action.payload.hasOwnProperty("warning")){
                return {
                     ...state,
                messageObject: action.payload,
                }
            }
            return {
                ...state,
                messageObject: action.payload.messageObject,
                unread: action.payload.unread
            };

        case MARK_AS_READ:
            let { num, fromWho, to, actId } = action.payload;
            let unreadNum = state.unread - num > 0 ? state.unread - num : 0;
            let updatedmessageObject = Object.assign({}, state.messageObject);
            let messages = updatedmessageObject[actId];
            for (let i = 0; i < messages.length; i++) {
                if (messages[i].from === fromWho && messages[i].to === to) {
                    messages[i].toHasRead = true;
                }
            }

            return {
                ...state,
                messageObject: updatedmessageObject,
                unread: unreadNum
            };
    }

    return state;
};