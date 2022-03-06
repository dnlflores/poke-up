import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import ChatsPage from '../ChatsPage';
import { getChats } from '../../store/chat';
import { getPosts } from '../../store/post';
import { getCategories } from '../../store/category';
import './InboxPage.css';

const InboxPage = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const chats = useSelector(state => state.chats);
    const posts = useSelector(state => state.posts);
    const chatsArr = Object.values(chats || {});

    const convos = new Set();

    for(let chat in chats) {
        if(posts[chats[chat].post_id]) convos.add(posts[chats[chat].post_id]);
    }

    console.log("these are the chats", chats);
    console.log("these are the convos", convos);

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
        <div className="inbox-page-container">
            <h2>Inbox</h2>
            {Array.from(convos).map(post => (
                <div className="inbox-container" key={post.id}>
                    <div className="inbox-background" onClick={event => history.push(`/chats/${post.id}`)} />
                    <img className="inbox-item-image" src={post?.image_url} alt="post" />
                    <h2 className="inbox-item-title">{post?.title}</h2>
                </div>
            ))}
        </div>
    );
}

export default InboxPage;