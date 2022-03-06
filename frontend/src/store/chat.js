const LOAD_CHATS = 'chats/LOAD_CHATS';

const loadChats = chats => ({
    type: LOAD_CHATS,
    payload: chats
});

export const getChats = () => async dispatch => {
    const response = await fetch('/api/chats/');

    if(response.ok) {
        const chats = await response.json();
        console.log("this is the chats from the thunk", chats)
        dispatch(loadChats(chats));
    }
};

const chatsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_CHATS: {
            const newState = {};
            action.payload.chats.forEach((chat, i) => newState[chat.id] = action.payload.chats[i])
            return newState;
        }
        default:
            return state;
    }
}

export default chatsReducer;