import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
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
    const [users, setUsers] = useState([]);
    const { postId } = useParams();

    const post = posts[postId];

    const filteredChats = chats.filter(chat => chat.post_id === +postId);

    console.log("these are the chats", filteredChats);
    
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
            <h1>{post?.title}</h1>
            {filteredChats.map(chat => (
                <div key={chat.id}>
                    <div className="inbox-container" key={post.id}>
                        <div className="inbox-background" onClick={event => history.push(`/chats/${post.id}/messages/${users.find(user => user.id === chat.buyer_id)?.id}`)} />
                        <img className="inbox-item-image" src={users.find(user => user.id === chat.buyer_id)?.profile_pic_url} alt="post" />
                        <h2>{users.find(user => user.id === chat.buyer_id)?.username}</h2>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChatsPage;