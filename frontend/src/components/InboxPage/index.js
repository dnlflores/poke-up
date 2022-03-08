import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getChats } from '../../store/chat';
import { getPosts } from '../../store/post';
import { getCategories } from '../../store/category';
import './InboxPage.css';

const InboxPage = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const chats = useSelector(state => state.chats);
    const posts = useSelector(state => state.posts);
    const currentUser = useSelector(state => state.session.user);
    const [showBuying, setShowBuying] = useState(false);
    const [showSelling, setShowSelling] = useState(true);

    const sellingConvos = new Set();
    const buyingConvos = new Set();

    for(let chat in chats) {
        if(posts[chats[chat].post_id]) {
            if(chats[chat].buyer_id !== currentUser.id) {
                sellingConvos.add(posts[chats[chat].post_id]);
            } else {
                buyingConvos.add(posts[chats[chat].post_id]);
            }
        }
    }

    useEffect(() => {
        dispatch(getChats());
        dispatch(getPosts());
        dispatch(getCategories());
        (function () { document.documentElement.scrollTop = 0 })();
        if (window.location.href.split('/').length > 3) {
            if (window.location.href.split('/')[3] === 'chats') {
                document.getElementById('create-post-button').setAttribute('hidden', true);
            }
        }
        document.getElementById('about-links').setAttribute('style', 'display: none');
    }, [dispatch]);


    return (
        <div className="page-container">
            <h1 className="page-title">Inbox</h1>
            <div className="switch-buttons">
                <button id="selling-button" onClick={e => {
                    setShowSelling(true);
                    setShowBuying(false);
                    document.getElementById('selling-button').setAttribute('style', 'color: blue; font-size: 40px;');
                    document.getElementById('buying-button').setAttribute('style', 'color: black; font-size: 30px;');
                }}>Selling</button>
                <button id="buying-button" onClick={e => {
                    setShowSelling(false);
                    setShowBuying(true);
                    document.getElementById('buying-button').setAttribute('style', 'color: blue; font-size: 40px;');
                    document.getElementById('selling-button').setAttribute('style', 'color: black; font-size: 30px;');
                }}>Buying</button>
            </div>
            {showSelling && Array.from(sellingConvos).map(post => (
                <div className="inbox-container" key={post?.id}>
                    <div className="inbox-background" onClick={event => history.push(`/chats/${post?.id}`)} />
                    <img className="inbox-item-image" src={post?.image_url} alt="post" />
                    <h2 className="inbox-item-title">{post?.title}</h2>
                </div>
            ))}
            {showBuying && Array.from(buyingConvos).map(post => (
                <div className="inbox-container" key={post?.id}>
                    <div className="inbox-background" onClick={event => history.push(`/chats/${post?.id}`)} />
                    <img className="inbox-item-image" src={post?.image_url} alt="post" />
                    <h2 className="inbox-item-title">{post?.title}</h2>
                </div>
            ))}
        </div>
    );
}

export default InboxPage;