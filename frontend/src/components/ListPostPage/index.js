import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { getListPosts, removeListPost } from '../../store/post-list';
import { getLists } from '../../store/list';
import './ListPostPage.css'

const ListPostPage = props => {
    const { id: listId } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const posts = useSelector(state => Object.values(state.listPosts));
    const list = useSelector(state => Object.values(state.lists).find(list => list.id === +listId))

    const handleRemove = async event => {
        event.stopPropagation();

        const postId = event.target.className.split(' ')[2];

        await dispatch(removeListPost(listId, postId));
    }

    useEffect(() => {
        dispatch(getListPosts(listId));
        dispatch(getLists());
        (function () {document.documentElement.scrollTop = 0})();
        if(window.location.href.split('/').length > 3) {
          if (window.location.href.split('/')[3] === 'lists') {
            document.getElementById('create-post-button').setAttribute('hidden', true);
          }
        }
        document.getElementById('about-links').setAttribute('style', 'display: none');
    }, [dispatch, listId]);

    const navigateTo = (postId, e) => {
        e.stopPropagation();

        history.push(`/posts/${postId}`)
    };

    return (
        <div className="page-container">
            <h2 className='page-title'>{list?.name}</h2>
            <div className="list-post-container">
                {posts?.map(post => (
                    <div className='list-post-div' key={post.id} onClick={event => history.push(`/posts/${post?.id}`)}>
                        <div className="flx-ctr list-info">
                            <img src={`${post?.image_url}`} alt="post" className='list-post-image'></img>
                            <div className="flx-ctr flx-col post-info">
                                <h2 className='list-post-title' onClick={event => navigateTo(post?.id, event)}>{post?.title}</h2>
                                <label className='list-post-price'>${post?.price?.toLocaleString("en-US")}</label>
                                <button className={`button-default-cancel remove-list-post ${post?.id}`} onClick={handleRemove}>Remove</button>
                            </div>
                        </div>
                        <h2 onClick={e => navigateTo(post?.id, e)} className="arrow-link link-post"><span className="material-icons arrow-icon">arrow_forward_ios</span></h2>
                    </div>
                ))}
            </div>
            {posts?.length === 0 && (
                <div>
                    <h2 className="empty-page-text 1">No Posts yet!</h2>
                    <h2 className="empty-page-text 2">Try adding some!</h2>
                    <img src="https://pokeup.s3.us-west-1.amazonaws.com/toppng.com-okemon-characters-png-download-image-pokemon-pikachu-980x490.png" alt="starters-together" className="empty-page-pic" />
                </div>
            )}
        </div>
    )
};

export default ListPostPage;