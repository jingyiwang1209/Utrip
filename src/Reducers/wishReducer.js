import { ADD_WISH_DATA, WISH_ERROR, FETCH_WISH_DATA, HANDLE_WISH_LIKES } from "../Actions/types";

// dummy initial state:
const INITIAL_STATE = { error:"", message:"", all:[]};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_WISH_DATA:
            return { ...state, message: action.payload };
        case FETCH_WISH_DATA:
            return { ...state, all: action.payload }
        case HANDLE_WISH_LIKES:
             const wishId = Object.keys(action.payload)[0];
             const numOfLikes = Object.values(action.payload)[0];
             const newAll = state.all.map((wish)=>{
                 if(wish.id == wishId){
                    wish.likes= numOfLikes;
                 }
                 return wish;
             })
             return { ...state, all:newAll }

        case WISH_ERROR:
            return { ...state, error:action.payload }
    }
    return state;
};