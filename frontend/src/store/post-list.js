const LOAD_LIST_POSTS = 'lists/LOAD_LIST_POSTS';
const ADD_POST_LIST = 'lists/ADD_POST_LIST';
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

const addPostList = list => ({
    type: ADD_POST_LIST,
    payload: list
});

const deleteListPost = post => ({
    type: DELETE_LIST_POST,
    payload: post
});

export const getListPosts = listId => async dispatch => {
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

export const createListPost = (listId, postId) => async dispatch => {
    const response = await fetch(`/api/lists/${listId}/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if(response.ok) {
        const list = await response.json();
        dispatch(addPostList(list));
        return list;
    }
};

export const removeListPost = (listId, postId) => async dispatch => {
    const response = await fetch(`/api/lists/${listId}/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        }
    });

    if(response.ok) {
        const post = await response.json();
        dispatch(deleteListPost(post));
        return post;
    }
};

export default function listPostReducer(state = {}, action) {
    switch(action.type) {
        case LOAD_LIST_POSTS:
            const loadState = action.payload.posts;
            return loadState;
        case ADD_POST_LIST:
            const createState = {postLists: state.postLists};
            createState.postLists?.push(action.payload);
            return createState;
        case DELETE_LIST_POST:
            const deleteState = JSON.parse(JSON.stringify(state));
            for(let i = 0; i < deleteState?.length; i++ ){
                if(deleteState[i]?.id === action.payload.id) deleteState.splice(i, 1);
            }
            return deleteState;
        case LOAD_POST_LISTS:
            const loadsState = JSON.parse(JSON.stringify(state));
            loadsState['postLists'] = action.payload.lists;
            return loadsState;
        default:
            return state;
    }
}