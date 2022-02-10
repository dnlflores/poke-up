import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getPosts, removePost } from '../../store/post';
import EditPost from '../EditPost';

const TMPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts));
    const user = useSelector(state => state.session.user);
    const [editButtonPopup, setEditButtonPopup] = useState(0);
    const tmPosts = posts?.filter(post => +post.category_id === 4);

    useEffect(() => {
        dispatch(getPosts());
        (function () {document.documentElement.scrollTop = 0})();
        document.getElementById('create-post-button')?.removeAttribute('hidden');
        document.getElementById('root').setAttribute('style', 'position: relative');
        document.getElementById('about-links').setAttribute('style', 'display: flex');
    }, [dispatch]);

    const handleDelete = event => {
        event.preventDefault();

        const postId = event.target.className.split('-')[2].split(' ')[0];

        dispatch(removePost(postId));
    };

    const handleEdit = event => {
        event.preventDefault();
        
        const postId = event.target.className.split('-')[2].split(' ')[0];

        setEditButtonPopup(postId);
    };

    return (
        <div className='post-container-div'>
            {tmPosts?.map(post => (
                <div>
                    <div className={`post-div ${post.id}`}>
                        <NavLink to={`/posts/${post.id}`} exact={true} activeClassName='active'>
                            <img src={post.image_url} alt="post" className={`image-post ${post.id}`}></img>
                        </NavLink>
                        <div className='image-info-div'>
                            <label className="post-title">{post.title} </label>
                            <div className="price-control-container">
                                <label className="post-price">${post.price.toLocaleString("en-US")} </label>
                                {user?.id === post.user_id && (
                                    <div>
                                        <button onClick={handleDelete}><span className={`delete-post-${post.id} material-icons`}>delete_forever</span></button>
                                        <button onClick={handleEdit}><span className={`edit-post-${post.id} material-icons`}>edit</span></button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {+editButtonPopup === post.id && (
                        <EditPost post={post} trigger={editButtonPopup} setTrigger={setEditButtonPopup} />
                    )}
                </div>
            ))}
        </div>
    )
}

export default TMPage;