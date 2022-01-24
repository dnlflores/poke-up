import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts, removePost } from '../../store/post';
import EditPost from '../EditPost';
import './HomePage.css';

function HomePage() {
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts));
    const user = useSelector(state => state.session.user);
    const [editButtonPopup, setEditButtonPopup] = useState(0);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const handleDelete = event => {
        event.preventDefault();

        const postId = event.target.className.split('-')[2];

        dispatch(removePost(postId));
    };

    const handleEdit = event => {
        event.preventDefault();
        
        const postId = event.target.className.split('-')[2];

        setEditButtonPopup(postId);
    };

    return (
        <div className='post-container-div'>
            {posts.map(post => (
                <div>
                    <div className={`post-div ${post.id}`}>
                        <img src={post.image_url} alt="post" className={`image ${post.id}`}></img>
                        {/* <label>Post ID: {post.id} </label> */}
                        <label>Title: {post.title} </label>
                        {/* <label>User ID: {post.user_id} </label> */}
                        {/* <label>Category ID: {post.category_id} </label> */}
                        {/* <label>Description: {post.description} </label> */}
                        <label>Price: {post.price} </label>
                        {/* <label>Quantity: {post.quantity} </label> */}
                        {user?.id === post.user_id && (
                            <div>
                                <button onClick={handleDelete} className={`delete-post-${post.id}`}>Delete</button>
                                <button onClick={handleEdit} className={`edit-post-${post.id}`}>Edit</button>
                            </div>
                        )}
                    </div>
                    {+editButtonPopup === post.id && (
                        <EditPost post={post} trigger={editButtonPopup} setTrigger={setEditButtonPopup} />
                    )}
                </div>
            ))}
        </div>
    )
}

export default HomePage;