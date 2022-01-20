import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../store/post';

function HomePage() {
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts));

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

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
                </div>
            ))}
        </div>
    )
}

export default HomePage;