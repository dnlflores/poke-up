import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getChats, deleteChat } from '../../store/chat';
import { getPosts } from '../../store/post';
import { getCategories } from '../../store/category';
import './ChatsPage.css';

const ChatsPage = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const chats = useSelector(state => Object.values(state.chats || {}));
    const posts = useSelector(state => state.posts);
    const currentUser = useSelector(state => state.session.user);
    const [users, setUsers] = useState([]);
    const { postId } = useParams();

    const post = posts[postId];

    const filteredChats = chats.filter(chat => chat.post_id === +postId);
    
    useEffect(() => {
        dispatch(getChats());
        dispatch(getCategories());
        dispatch(getPosts());
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
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
            <h2 className="page-title">{post?.title}</h2>
            {filteredChats.map(chat => (
                <div className="chats-container inbox-container" key={chat?.id}>
                    <div className="chats-background inbox-background" onClick={event => history.push(`/chats/${post?.id}/messages/${chat?.id}`)} />
                    <img className="chats-item-image inbox-item-image" src={chat?.buyer_id !== currentUser.id ? users.find(user => user?.id === chat?.buyer_id)?.profile_pic_url : users.find(user => user?.id === post?.user_id)?.profile_pic_url} alt="post" />
                    <h2 className="inbox-item-title">{chat?.buyer_id !== currentUser.id ? users.find(user => user?.id === chat?.buyer_id)?.username : users.find(user => user?.id === post?.user_id)?.username}</h2>
                    <button className="button-default-cancel delete-chat-button" onClick={() => {
                        dispatch(deleteChat(chat.id));
                        dispatch(getChats());
                        if(filteredChats.length === 1) history.push('/chats');
                    }}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default ChatsPage;