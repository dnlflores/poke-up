const LOAD_LIST_POSTS = 'lists/LOAD_LIST_POSTS';
const ADD_LIST_POST = 'lists/ADD_LIST_POST';
const DELETE_LIST_POST = 'lists/DELETE_LIST_POST';
const LOAD_POST_LISTS = 'posts/LOAD_POST_LIST'

const loadListPosts = posts => ({
    type: LOAD_LIST_POSTS,
    payload: posts
});

const loadPostLists = lists => ({
    type: LOAD_POST_LISTS,
    payload: lists
})

const addListPost = post => ({
    type: ADD_LIST_POST,
    payload: post
});

const deleteListPost = post => ({
    type: DELETE_LIST_POST,
    payload: post
});

export const getListPosts = listId => async dispatch => {
    if(listId === 0) {
        dispatch(loadListPosts({ posts: [] }));
        return { posts: [] }
    }

    const response = await fetch(`/api/lists/${listId}`);

    if(response.ok) {
        const posts = await response.json();
        dispatch(loadListPosts({ ...posts }));
        return posts;
    }
};

export const getPostLists = postId => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/lists`);

    if(response.ok) {
        const lists = await response.json();
        dispatch(loadPostLists({ ...lists }));
        return lists;
    }
};

export const createListPost = list => async dispatch => {
    dispatch(addListPost(list))
};

export const removeListPost = listId => async dispatch => {
    const response = await fetch(`/api/lists/${listId}`, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        }
    });

    if(response.ok) {
        const list = await response.json();
        dispatch(deleteListPost(list));
        return list;
    }
};

export default function listPostReducer(state = {}, action) {
    switch(action.type) {
        case LOAD_LIST_POSTS:
            const loadState = JSON.parse(JSON.stringify(state));
            // loadState.listPosts = action.payload.posts;
            return loadState;
        case ADD_LIST_POST:
            const createState = {...state};
            createState[action.payload.id] = action.payload;
            return createState;
        case DELETE_LIST_POST:
            const deleteState = {...state};
            delete deleteState[action.payload.id];
            return deleteState;
        case LOAD_POST_LISTS:
            const loadsState = JSON.parse(JSON.stringify(state));
            loadsState['postLists'] = action.payload.lists;
            return loadsState;
        default:
            return state;
    }
}