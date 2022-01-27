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
        const posts = await response.json();
        console.log('posts againnnnnn => ', posts);
        dispatch(loadPostLists({ ...posts }));
        return posts;
    }
};

export const createPostList = list => async dispatch => {
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

export default function listPostReducer(state = {}, action) {
    switch(action.type) {
        case LOAD_POST_LISTS:
            const loadState = JSON.parse(JSON.stringify(state));;
            console.log('THIS IS THE LOAD STATE => ', loadState);
            console.log("THIS IS THE ACTION PAYLOAD => ", action.payload.posts);
            action.payload.posts?.forEach(post => loadState[post.id] = post);
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