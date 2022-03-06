const LOAD_CHATS = 'chats/LOAD_CHATS';
const LOAD_MESSAGES = 'messages/LOAD_MESSAGES';

const loadChats = chats => ({
    type: LOAD_CHATS,
    payload: chats
});

const loadMessages = (messages, chatId) => ({
    type: LOAD_MESSAGES,
    payload: messages,
    chatId
})

export const getChats = () => async dispatch => {
    const response = await fetch('/api/chats/');

    if(response.ok) {
        const chats = await response.json();
        dispatch(loadChats(chats));
    }
};

export const getMessages = chatId => async dispatch => {
    getChats();
    const response = await fetch(`/api/chats/${chatId}/messages`);

    if(response.ok) {
        const messages = await response.json();
        dispatch(loadMessages(messages, chatId));
        return messages;
    }
}

const chatsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_CHATS: {
            const newState = {};
            action.payload.chats.forEach((chat, i) => newState[chat.id] = action.payload.chats[i])
            return newState;
        }
        case LOAD_MESSAGES: {
            const newState = JSON.parse(JSON.stringify(state));

            for(let i = 0; i < action.payload.messages?.length; i++) {
                const message = action.payload.messages[i];
                if(!newState[action.chatId]?.messages) newState[action.chatId] = {...newState[action.chatId], messages: {}};
                newState[action.chatId].messages[message.id] = message;
            };
            
            return newState;
        }
        default:
            return state;
    }
}

export default chatsReducer;