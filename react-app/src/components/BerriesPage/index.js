import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getPosts, removePost } from '../../store/post';
import EditPost from '../EditPost';
import './BerriesPage.css';

const BerriesPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts));
    const user = useSelector(state => state.session.user);
    const [editButtonPopup, setEditButtonPopup] = useState(0);
    const berriesPosts = posts?.filter(post => +post.category_id === 6);

    useEffect(() => {
        dispatch(getPosts());
        (function () {document.documentElement.scrollTop = 0})();
        document.getElementById('create-post-button')?.removeAttribute('hidden');
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
            {berriesPosts.map(post => (
                <div>
                    <div className={`post-div ${post.id}`}>
                        <NavLink to={`/posts/${post.id}`} exact={true} activeClassName='active'>
                            <img src={post.image_url} alt="post" className={`image-post ${post.id}`}></img>
                        </NavLink>
                        <div className='image-info-div'>
                            <label className="post-title">{post.title} </label>
                            <label className="post-price">${post.price.toLocaleString("en-US")} </label>
                        </div>
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

export default BerriesPage;