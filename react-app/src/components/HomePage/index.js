import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, removePost } from '../../store/post';

function HomePage() {
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts));
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const handleDelete = event => {
        event.preventDefault();
        const postId = event.target.className.split('-')[2];

        dispatch(removePost(postId));
    };

    return (
        <div>
            {posts.map(post => (
                <div>
                    <label>Post ID: {post.id} </label>
                    <label>Title: {post.title} </label>
                    <label>User ID: {post.user_id} </label>
                    <label>Category ID: {post.category_id} </label>
                    <label>Description: {post.description} </label>
                    <label>Price: {post.price} </label>
                    <label>Quantity: {post.quantity} </label>
                    <img src={post.image_url} alt="post"></img>
                    {user.id === post.user_id && (
                        <button onClick={handleDelete} className={`delete-post-${post.id}`}>Delete</button>
                    )}
                </div>
            ))}
        </div>
    )
}

export default HomePage;