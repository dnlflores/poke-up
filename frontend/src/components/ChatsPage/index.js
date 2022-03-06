import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getChats } from '../../store/chat';
import { getPosts } from '../../store/post';
import { getCategories } from '../../store/category';
import './ChatsPage.css';

const ChatsPage = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const chats = useSelector(state => Object.values(state.chats || {}));
    const posts = useSelector(state => state.posts);

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
        <div className="chats-page-container">
            <h2>Chats</h2>
            {chats.map(chat => (
                <div className="chat-container" key={chat.id}>
                <div className="chat-background" onClick={event => history.push(`/chats/${chat.id}/messages`)} />
                    <img className="chat-item-image" src={posts[chat.post_id]?.image_url} alt="post" />
                    <h2 className="chat-item-title">{posts[chat.post_id]?.title}</h2>
                </div>
            ))}
        </div>
    );
}

export default ChatsPage;