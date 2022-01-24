const LOAD_LISTS = 'lists/LOAD_LISTS';
const ADD_LIST = 'lists/ADD_LIST';
const DELETE_LIST = 'lists/DELETE_LIST';

const loadLists = lists => ({
    type: LOAD_LISTS,
    payload: lists
});

const addList = list => ({
    type: ADD_LIST,
    payload: list
});

const deleteList = list => ({
    type: DELETE_LIST,
    payload: list
})

export const getLists = () => async dispatch => {
    const response = await fetch("/api/lists/");

    if(response.ok) {
        const lists = await response.json();
        dispatch(loadLists(lists));
        return lists;
    }
};

export const createList = list => async dispatch => {
    dispatch(addList(list))
};

export const removeList = listId => async dispatch => {
    const response = await fetch(`/api/lists/${listId}`, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        }
    });

    if(response.ok) {
        const list = await response.json();
        dispatch(deleteList(list));
        return list;
    }
};

export default function listReducer(state = {}, action) {
    switch(action.type) {
        case LOAD_LISTS:
            const loadState = {...state};
            action.payload.lists?.forEach(list => loadState[list.id] = list);
            return loadState;
        case ADD_LIST:
            const createState = {...state};
            createState[action.payload.id] = action.payload;
            return createState;
        case DELETE_LIST:
            const deleteState = {...state};
            delete deleteState[action.payload.id];
            return deleteState;
        default:
            return state;
    }
}