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

    const handleRemove = event => {
        event.preventDefault();

        const postId = event.target.className.split(' ')[2];

        dispatch(removeListPost(listId, postId));
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
    }, [dispatch, listId])

    return (
        <div>
            <h2 className='list-post-page-title'>{list?.name}</h2>
            <div className="list-post-container">
                {posts?.map(post => (
                    <div className='list-post-div' key={post.id}>
                        <div className="list-post-background"  onClick={event => history.push(`/posts/${post?.id}`)}/>
                        <img src={`${post?.image_url}`} alt="post" className='list-post-image'></img>
                        <h2 className='list-post-title'>{post?.title}</h2>
                        <label className='list-post-price'>${post?.price?.toLocaleString("en-US")}</label>
                        <NavLink to={`/posts/${post?.id}`} exact={true} activeClassName="active" className="arrow-link link-post"><span className="material-icons arrow-icon">arrow_forward_ios</span></NavLink>
                        <button className={`button-default-cancel remove-list-post ${post?.id}`} onClick={handleRemove}>Remove</button>
                    </div>
                ))}
            </div>
            {posts?.length === 0 && (
                <div>
                    <h2 className="empty-page-text 1">No Posts yet!</h2>
                    <h2 className="empty-page-text 2">Try adding some!</h2>
                    <img src="https://pokeup.s3.us-west-1.amazonaws.com/toppng.com-okemon-characters-png-download-image-pokemon-pikachu-980x490.png" alt="starters-together" className="empty-page-pic"></img>
                </div>
            )}
        </div>
    )
};

export default ListPostPage;