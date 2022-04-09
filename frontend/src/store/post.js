const LOAD_POSTS = 'posts/LOAD_POSTS';
const DELETE_POST = 'posts/DELETE_POST';
const UPDATE_POST = 'posts/UPDATE_POST';
const ADD_POST = 'posts/ADD_POST';
const LOAD_POST = 'posts/LOAD_POST';

const loadPosts = posts => ({
  type: LOAD_POSTS,
  payload: posts  
});

const deletePost = post => ({
    type: DELETE_POST,
    payload: post
});

const updatePost = post => ({
    type: UPDATE_POST,
    payload: post
});

const addPost = post => ({
    type: ADD_POST,
    payload: post
});

const loadPost = post => ({
    type: LOAD_POST,
    payload: post
});

export const getPosts = () => async dispatch => {
    const response = await fetch('/api/posts/');

    if(response.ok) {
        const posts = await response.json();
        dispatch(loadPosts(posts));
        return posts;
    }
};

export const removePost = postId => async dispatch => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if(response.ok) {
        const post = await response.json();
        dispatch(deletePost(post));
        return post;
    }
};

export const editPost = post => async dispatch => {
    dispatch(updatePost(post));
};

export const createPost = post => async dispatch => {
    dispatch(addPost(post))
};

export const getPost = id => async dispatch => {
    const response = await fetch(`api/posts/${id}`);

    if(response.ok) {
        const post = await response.json();
        dispatch(loadPost(post));
        return post;
    }
};

export default function postsReducer(state = {}, action) {
    switch(action.type){
        case LOAD_POSTS:
            const loadsState = {...state};
            action.payload.posts?.forEach(post => loadsState[post.id] = post);
            return loadsState;
        case LOAD_POST:
            const loadState = {...state};
            loadState[action.payload.id] = action.payload;
            return loadState;
        case UPDATE_POST:
            const updateState = {...state};
            updateState[action.payload.id] = action.payload;
            return updateState;
        case ADD_POST:
            const addState = {...state};
            addState[action.payload.id] = action.payload;
            return addState;
        case DELETE_POST:
            const deleteState = {...state};
            delete deleteState[action.payload.id]
            return deleteState;
        default:
            return state;
    }
}