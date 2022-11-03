import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import EditPost from '../EditPost';
import { getPosts, removePost, getPost } from '../../store/post';
import { getCategories } from '../../store/category';
import { getLists } from '../../store/list';
import { getPostLists, createListPost } from '../../store/post-list';
import { createOffer, getChats, sendMessage } from '../../store/chat';
import './PostPage.css';

const PostPage = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id: postId } = useParams();
    const posts = useSelector(state => Object.values(state.posts));
    const post = useSelector(state => state.posts[postId]);
    const categories = useSelector(state => Object.values(state.categories));
    const postLists = useSelector(state => state.listPosts?.postLists);
    const myLists = useSelector(state => Object.values(state.lists));
    const chats = useSelector(state => state.chats);
    const [users, setUsers] = useState([]);
    const [showListsToAdd, setShowListsToAdd] = useState(false);
    const [showOfferModal, setShowOfferModal] = useState(false);
    const [editButtonPopup, setEditButtonPopup] = useState(false);
    const user = useSelector(state => state.session.user);
    const [offer, setOffer] = useState(post?.price);
    const category = categories.find(category => category.id === post?.category_id);
    const similarPosts = posts.filter(similarPost => {
        if (similarPost.category_id === category?.id) {
            if (similarPost.id !== post.id) return similarPost;
        }
        return null;
    });
    const seller = users?.find(user => user.id === post?.user_id);
    const otherSellerPosts = posts.filter(sellerPost => {
        if (sellerPost.user_id === seller?.id) {
            if (sellerPost.id !== post.id) return sellerPost;
        }
        return null;
    });
    const listsToAdd = new Set();
    const postListsSet = new Set();
    let existingChat = null;

    for (let i = 0; i < postLists?.length; i++) {
        postListsSet.add(postLists[i].id);
    }

    for (let i = 0; i < myLists.length; i++) {
        if (!postListsSet.has(myLists[i].id)) listsToAdd.add(myLists[i]);
    }

    for (let key in chats) {
        if (chats[key].post_id === post.id) {
            existingChat = chats[key];
        }
    }

    useEffect(() => {
        dispatch(getPosts());
        dispatch(getPost(postId));
        dispatch(getCategories());
        dispatch(getLists());
        dispatch(getPostLists(postId));
        dispatch(getChats());

        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();

        (function () { document.documentElement.scrollTop = 0 })();

        if (window.location.href.split('/').length === 5) {
            if (window.location.href.split('/')[3] === 'posts') {
                document.getElementById('create-post-button')?.setAttribute('hidden', true);
            }
        }

        document.getElementById('about-links').setAttribute('style', 'display: none');
    }, [dispatch, postId]);

    const makeOffer = event => {
        event.preventDefault();
        setShowOfferModal(false);
        if (!existingChat) dispatch(createOffer(offer.toLocaleString("en-US"), post));
        else dispatch(sendMessage(existingChat.id, `Hi there! I'm interested in your ${post?.title}. Would you take $${offer.toLocaleString("en-US")}?`));
    }

    const handleAddList = event => {
        event.preventDefault();

        const listId = event.target.className.split(' ')[0].split('-')[1];

        dispatch(createListPost(listId, postId))
        setShowListsToAdd(false);
    };

    const handleDelete = event => {
        event.preventDefault();

        dispatch(removePost(postId));
        history.push('/');
    }

    return (
        <div className="post-container">
            <div className="upper-container">
                <div className="left-container top-container-mobile flx-ctr">
                    <img src={post?.image_url} alt="post" className="post-page-image"></img>
                </div>
                <div className="right-container bottom-container-mobile">
                    <div className="flx-ctr flx-col" style={{ justifyContent: 'flex-start' }}>
                        <h2 className="post-page-title">{post?.title}</h2>
                        <h2 className="post-page-price">${post?.price.toLocaleString("en-US")}</h2>
                        <div className="quantity-category-container">
                            <label className="category-page-text">{category?.name}</label>
                            {/* <label className="quantity-text">Quantity: </label>
                            <h2 className="quantity-number">{post?.quantity}</h2> */}
                        </div>
                        {user && (
                            <div className="post-buttons">
                                {user.id !== post?.user_id && (
                                    <>
                                        <button className="button-default" onClick={event => setShowOfferModal(true)}>Offer</button>
                                        <button className="add-to-list-button" onClick={event => setShowListsToAdd(true)}>ADD TO LIST<span className="material-icons list-icon">lists</span></button>
                                    </>
                                )}
                                {user.id === post?.user_id && window.innerWidth < 600 && (
                                    <>
                                        <button className="button-default" onClick={() => setEditButtonPopup(true)}>Edit</button>
                                        <button className="button-default-cancel" onClick={handleDelete}>Delete</button>
                                    </>
                                )}
                            </div>
                        )}
                        {!user && (
                            <div className="post-buttons" />
                        )}
                        <div className="seller-container">
                            <div className="line-div-2"></div>
                            <div className="line-div-3"></div>
                            <NavLink to={`/users/${seller?.id}`}>
                                <img src={seller?.profile_pic_url} alt="seller-profile" className="seller-profile-pic" onClick={event => document.getElementById("about-links").setAttribute("style", "display: flex")}></img>
                            </NavLink>
                            <h2 className='seller-username' onClick={event => document.getElementById("about-links").setAttribute("style", "display: flex")}>
                                <NavLink to={`/users/${seller?.id}`}>{seller?.username}</NavLink>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="line-div-container">
                <div className="line-div-4" />
            </div>
            <div className="bottom-container">
                <div className="description-container">
                    <h2 className="description-title">Description</h2>
                    <p className="description-text">{post?.description}</p>
                </div>
                <div className="similar-posts-container">
                    <h2 className="similar-title">Similar Items</h2>
                    <div className="similar-posts-div-container">
                        {similarPosts?.map(post => (
                            <div className="similar-post-div" key={post.id}>
                                <NavLink to={`/posts/${post.id}`} exact={true} activeClassName='active' onClick={function () { document.documentElement.scrollTop = 0 }}>
                                    <img src={post.image_url} alt="similar-post" className={`image-post ${post.id}`}></img>
                                </NavLink>
                                <h3 className="similar-post-title">{post.title}</h3>
                                <label className="similar-post-price">${post.price.toLocaleString("en-US")}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="more-posts-container">
                    <h2 className="more-title">More Items From This PokéSeller</h2>
                    <div className="more-posts-div-container">
                        {otherSellerPosts?.map(post => (
                            <div className="more-post-div" key={post.id}>
                                <NavLink to={`/posts/${post.id}`} exact={true} activeClassName='active' onClick={function () { document.documentElement.scrollTop = 0 }}>
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
                <div>
                    <div className="background-modal" onClick={() => setShowListsToAdd(false)} />
                    <div className="add-list-post-container">
                        <h2>Your Lists!</h2>
                        <div className="list-buttons-container">
                            {Array.from(listsToAdd)?.map(list => (
                                <button className={`list-${list.id}-button button-default`} onClick={handleAddList}>{list.name}</button>
                            ))}
                        </div>
                        <button className='button-default-cancel' onClick={event => setShowListsToAdd(false)}>Cancel</button>
                    </div>
                </div>
            )}
            {showOfferModal && (
                <div>
                    <div className="background-modal" onClick={e => setShowOfferModal(false)} />
                    <div className="offer-post-container add-list-post-container">
                        <h2>Offer</h2>
                        <div>
                            <label style={{ fontFamily: "'Fredoka One', cursive" }}>$</label>
                            <input required type="number" className="offer-input" placeholder={post?.price} onChange={event => setOffer(event.target.value)} defaultValue={post?.price} value={offer}></input>
                        </div>
                        <button className="button-default" onClick={makeOffer}>Offer</button>
                        <button className="button-default-cancel" onClick={e => setShowOfferModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
            {editButtonPopup && (
                <EditPost post={post} trigger={editButtonPopup} setTrigger={setEditButtonPopup} />
            )}
        </div>
    )
}

export default PostPage;