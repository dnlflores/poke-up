const LOAD_CHATS = 'chats/LOAD_CHATS';
const LOAD_MESSAGES = 'messages/LOAD_MESSAGES';
const CREATE_MESSAGE = 'messages/CREATE_MESSAGE';
const REMOVE_CHAT = 'chats/REMOVE_CHAT';
const CREATE_CHAT = 'chats/CREATE_CHAT';

const loadChats = chats => ({
    type: LOAD_CHATS,
    payload: chats
});

const removeChat = chatId => ({
    type: REMOVE_CHAT,
    payload: chatId
});

const loadMessages = (messages, chatId) => ({
    type: LOAD_MESSAGES,
    payload: messages,
    chatId
});

const createMessage = (chatId, message) => ({
    type: CREATE_MESSAGE,
    payload: { ...message },
    chatId
});

const createChat = chat => ({
    type: CREATE_CHAT,
    payload: chat
});

export const getChats = () => async dispatch => {
    const response = await fetch('/api/chats/');

    if (response.ok) {
        const chats = await response.json();
        dispatch(loadChats(chats));
    }
};

export const deleteChat = chatId => async dispatch => {
    const response = await fetch(`/api/chats/${chatId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeChat(chatId));
    }
}

export const getMessages = chatId => async dispatch => {
    getChats();
    const response = await fetch(`/api/chats/${chatId}/messages`);

    if (response.ok) {
        const messages = await response.json();
        dispatch(loadMessages(messages, chatId));
        return messages;
    }
}

export const sendMessage = (chatId, message) => async dispatch => {
    const response = await fetch(`/api/chats/${chatId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: message
        })
    });

    if (response.ok) {
        const newMessage = await response.json();
        dispatch(createMessage(chatId, newMessage));
        return newMessage;
    }
}

export const createOffer = (offer, post) => async dispatch => {
    const response = await fetch(`/api/chats/${post.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const newChat = await response.json();
        dispatch(createChat(newChat));
        const second = await fetch(`/api/chats/${newChat.chat.id}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: `Hi there! I'm interested in your ${post.title}. Would you take $${offer}?`
            })
        });

        if(second.ok) {
            const newMessage = await second.json();
            console.log("this is the new chat => ", newChat.chat.id);
            dispatch(createMessage(newChat.chat.id, newMessage));
        }
        return newChat;
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

            for (let i = 0; i < action.payload.messages?.length; i++) {
                const message = action.payload.messages[i];
                if (!newState[action.chatId]?.messages) newState[action.chatId] = { ...newState[action.chatId], messages: {} };
                newState[action.chatId].messages[message.id] = message;
            };

            return newState;
        }
        case CREATE_MESSAGE: {
            const newState = JSON.parse(JSON.stringify(state));
            if (!newState[action.chatId]?.messages) newState[action.chatId].messages = { [action.payload.message.id]: action.payload.message };
            else newState[action.chatId].messages[action.payload.message.id] = action.payload.message;
            return newState;
        }
        case REMOVE_CHAT: {
            const newState = JSON.parse(JSON.stringify(state));
            delete newState[action.payload];
            return newState;
        }
        case CREATE_CHAT: {
            const newState = JSON.parse(JSON.stringify(state));
            newState[action.payload.chat.id] = action.payload.chat;
            return newState;
        }
        default:
            return state;
    }
}

export default chatsReducer;