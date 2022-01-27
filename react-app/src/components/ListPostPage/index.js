import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './ListPostPage.css'
import { getPostLists } from '../../store/post-list';
import { useParams, NavLink } from 'react-router-dom';

const ListPostPage = props => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.listPosts));

    console.log('THESE ARE THE POSTS => ', posts[0]);

    useEffect(() => {
        dispatch(getPostLists(id))
    }, [dispatch, id])
    return (
        <div className="list-post-container">
            {posts?.map(post => (
                <div className='list-post-div'>
                    <img src={`${post.image_url}`} alt="post"></img>
                    <h2 className='list-post-title'>{post.title}</h2>
                    <label className='list-post-price'>{post.price}</label>
                    <NavLink to={`/posts/${post.id}`} exact={true} activeClassName="active" className="arrow-link"><span className="material-icons arrow-icon">arrow_forward_ios</span></NavLink>
                </div>
            ))}
        </div>
    )
};

export default ListPostPage;