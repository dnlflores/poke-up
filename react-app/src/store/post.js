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

export const removePost = post => async dispatch => {
    
}

export default function postsReducer(state = {}, action) {
    switch(action.type){
        case LOAD_POSTS:
            const loadsState = {...state};
            console.log("THIS IS THE ACTION PAYLOAD => ", action.payload);
            console.log("THIS IS THE STATE => ", loadsState);
            action.payload.posts?.forEach(post => loadsState[post.id] = post);
            return loadsState;
        default:
            return state;
    }
}