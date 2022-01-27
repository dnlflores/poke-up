const LOAD_POST_LISTS = 'lists/LOAD_LISTS';
const ADD_POST_LIST = 'lists/ADD_LIST';
const DELETE_POST_LIST = 'lists/DELETE_LIST';

const loadPostLists = lists => ({
    type: LOAD_POST_LISTS,
    payload: lists
});

const addPostList = list => ({
    type: ADD_POST_LIST,
    payload: list
});

const deletePostList = list => ({
    type: DELETE_POST_LIST,
    payload: list
});

export const getPostLists = listId => async dispatch => {
    const response = await fetch(`/api/lists/${listId}`);

    if(response.ok) {
        const lists = await response.json();
        dispatch(loadPostLists(lists));
        return lists;
    }
};

export const createList = list => async dispatch => {
    dispatch(addPostList(list))
};

export const removePostList = listId => async dispatch => {
    const response = await fetch(`/api/lists/${listId}`, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        }
    });

    if(response.ok) {
        const list = await response.json();
        dispatch(deletePostList(list));
        return list;
    }
};

export default function listReducer(state = {}, action) {
    switch(action.type) {
        case LOAD_POST_LISTS:
            const loadState = {...state};
            action.payload.lists?.forEach(list => loadState[list.id] = list);
            return loadState;
        case ADD_POST_LIST:
            const createState = {...state};
            createState[action.payload.id] = action.payload;
            return createState;
        case DELETE_POST_LIST:
            const deleteState = {...state};
            delete deleteState[action.payload.id];
            return deleteState;
        default:
            return state;
    }
}