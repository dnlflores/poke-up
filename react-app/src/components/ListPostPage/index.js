import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './ListPostPage.css'
import { getListPosts } from '../../store/post-list';
import { useParams, NavLink } from 'react-router-dom';

const ListPostPage = props => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.listPosts));

    useEffect(() => {
        dispatch(getListPosts(id))
        if(window.location.href.split('/').length > 3) {
          if (window.location.href.split('/')[3] === 'lists') {
            document.getElementById('create-post-button').setAttribute('hidden', true);
          }
        } 
    }, [dispatch, id])

    return (
        <div className="list-post-container">
            {posts?.map(post => (
                <div className='list-post-div'>
                    <img src={`${post.image_url}`} alt="post" className='list-post-image'></img>
                    <h2 className='list-post-title'>{post.title}</h2>
                    <label className='list-post-price'>${post.price?.toLocaleString("en-US")}</label>
                    <NavLink to={`/posts/${post.id}`} exact={true} activeClassName="active" className="arrow-link link-post"><span className="material-icons arrow-icon">arrow_forward_ios</span></NavLink>
                    <button className='button-default-cancel remove-list-post'>Remove</button>
                </div>
            ))}
        </div>
    )
};

export default ListPostPage;