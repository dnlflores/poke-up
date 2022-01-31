import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getPosts } from '../../store/post';
import { getCategories } from '../../store/category';
import { getLists } from '../../store/list';
import './PostPage.css';
import { getPostLists, createListPost } from '../../store/post-list';

const PostPage = props => {
    const dispatch = useDispatch();
    const { id: postId } = useParams();
    const posts = useSelector(state => Object.values(state.posts));
    const categories = useSelector(state => Object.values(state.categories));
    const postLists = useSelector(state => state.listPosts?.postLists);
    const myLists = useSelector(state => Object.values(state.lists));
    const [users, setUsers] = useState([]);
    const [showListsToAdd, setShowListsToAdd] = useState(false);
    const user = useSelector(state => state.session.user);
    
    const post = posts.find(post => post.id === +postId);
    const category = categories.find(category => category.id === post?.category_id);
    const similarPosts = posts.filter(similarPost => {
        if(similarPost.category_id === category?.id){
            if(similarPost.id !== post.id) return similarPost;
        }
    });
    const seller = users?.find(user => user.id === post?.user_id);
    const otherSellerPosts = posts.filter(sellerPost => {
        if(sellerPost.user_id === seller?.id){
            if(sellerPost.id !== post.id) return sellerPost;
        }
    });

    const handleAddList = event => {
        event.preventDefault();

        const listId = event.target.className.split(' ')[0].split('-')[1];

        dispatch(createListPost(listId, postId))
        setShowListsToAdd(false);
    };

    let listsToAdd = [];
    myLists?.forEach( myList => {
        if(postLists?.length === 0) listsToAdd = myLists;
        postLists?.forEach(list => {
            if(list.id !== myList.id) listsToAdd.push(myList);

        })
    });
    
    useEffect(() => {
        dispatch(getPosts());
        dispatch(getCategories());
        dispatch(getLists());
        dispatch(getPostLists(postId));
        async function fetchData() {
          const response = await fetch('/api/users/');
          const responseData = await response.json();
          setUsers(responseData.users);
        }
        fetchData();
        (function () {document.documentElement.scrollTop = 0})();
        if(window.location.href.split('/').length === 5) {
          if (window.location.href.split('/')[3] === 'posts') {
            document.getElementById('create-post-button')?.setAttribute('hidden', true);
          }
        }
        document.getElementById('about-links').setAttribute('style', 'display: none');
    }, [dispatch, postId]);

    return (
        <div className="post-container">
            <div className="upper-container">
                <div className="left-container">
                    <div className="line-div-1"></div>
                    <img src={post?.image_url} alt="post" className="post-page-image"></img>
                </div>
                <div className="right-container">
                    <h2>{post?.title}</h2>
                    <h2>${post?.price.toLocaleString("en-US")}</h2>
                    <div className="quantity-category-container">
                        <label className="category-text">{category?.name}</label>
                        <label className="quantity-text">Quantity: </label>
                        <h2 className="quantity-number">{post?.quantity}</h2>
                    </div>
                    {user && (
                        <div className="post-buttons">
                            <button className="button-default">Buy</button>
                            <button className="add-to-list-button" onClick={event => setShowListsToAdd(true)}>ADD TO LIST<span className="material-icons list-icon">lists</span></button>
                        </div>
                    )}
                    {!user && (
                        <div className="post-buttons" />
                    )}
                    <div className="seller-container">
                        <div className="line-div-2"></div>
                        <div className="line-div-3"></div>
                        <img src={seller?.profile_pic_url} alt="seller-profile" className="seller-profile-pic"></img>
                        <h2 className='seller-username'>{seller?.username}</h2>
                    </div>
                </div>
            </div>
            <div className="bottom-container">
                <div className="description-container">
                    <div className="line-div-4"></div>
                    <h2>Description</h2>
                    <p className="description-text">{post?.description}</p>
                </div>
                <div className="similar-posts-container">
                    <h2>Similar Items</h2>
                    <div className="similar-posts-div-container">
                        {similarPosts?.map(post => (
                            <div className="similar-post-div">
                                <NavLink to={`/posts/${post.id}`} exact={true} activeClassName='active' onClick={function () {document.documentElement.scrollTop = 0}}>
                                    <img src={post.image_url} alt="similar-post" className={`image-post ${post.id}`}></img>
                                </NavLink>
                                <h3 className="similar-post-title">{post.title}</h3>
                                <label className="similar-post-price">${post.price.toLocaleString("en-US")}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="more-posts-container">
                    <h2>More Items From This PokéSeller</h2>
                    <div className="more-posts-div-container">
                        {otherSellerPosts?.map(post => (
                            <div className="more-post-div">
                                <NavLink to={`/posts/${post.id}`} exact={true} activeClassName='active' onClick={function () {document.documentElement.scrollTop = 0}}>
                                    <img src={post.image_url} alt="more-post" className={`image-post ${post.id}`}></img>
                                </NavLink>
                                <h3 className="more-post-title">{post.title}</h3>
                                <label className="more-post-price">${post.price.toLocaleString("en-US")}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showListsToAdd && (
                <div className="background-modal">
                    <div className="add-list-post-container">
                        <h2>Your Lists!</h2>
                        {listsToAdd?.map(list => (
                            <button className={`list-${list.id}-button button-default`} onClick={handleAddList}>{list.name}</button>
                        ))}
                        <button className='button-default-cancel' onClick={event => setShowListsToAdd(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostPage;