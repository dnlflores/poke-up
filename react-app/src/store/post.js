const LOAD_POSTS = 'posts/LOAD_POSTS';
const DELETE_POST = 'posts/DELETE_POST';

const loadPosts = posts => ({
  type: LOAD_POSTS,
  payload: posts  
});

const deletePost = post => ({
    type: DELETE_POST,
    payload: post
});

export const getPosts = posts => async dispatch => {
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
}

export default function postsReducer(state = {}, action) {
    switch(action.type){
        case LOAD_POSTS:
            const loadsState = {...state};
            action.payload.posts?.forEach(post => loadsState[post.id] = post);
            return loadsState;
        case DELETE_POST:
            const deleteState = {...state};
            delete deleteState[action.payload.id]
            return deleteState;
        default:
            return state;
    }
}