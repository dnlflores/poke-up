import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getCategories } from "../../store/category";
import { getMessages } from "../../store/chat";
import { getPosts } from "../../store/post";
import './MessagingPage.css';

const MessagingPage = props => {
    const dispatch = useDispatch();
    const { chatId, postId } = useParams()
    const history = useHistory();
    const messages = useSelector(state => state.chats[chatId]?.messages);
    const [users, setUsers] = useState([]);
    const messagesArray = Object.values(messages || {});
    const currentUser = useSelector(state => state.session.user);
    const posts = useSelector(state => state.posts);
    const post = posts[postId];

    window.scrollTo(0, document.querySelector(".page-container")?.scrollHeight);

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getMessages(chatId));
        dispatch(getPosts());

        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();

        window.scrollTo(0, document.querySelector(".page-container").scrollHeight);

        if (window.location.href.split('/').length > 3) {
            if (window.location.href.split('/')[3] === 'chats') {
                document.getElementById('create-post-button').setAttribute('hidden', true);
            }
        }
        document.getElementById('about-links').setAttribute('style', 'display: none');
    }, [dispatch, chatId]);

    return (
        <div className="page-container">
            <div className="message-page-post-container">
                <img src={post?.image_url} alt="post" className="message-page-post-image" />
                <h2>{post?.title}</h2>
            </div>
            {messagesArray.map(message => (
                <div className={message.user_id === currentUser.id ? "talk-bubble tri-right border round btm-right-in user-bubble" : "talk-bubble tri-right border round btm-left-in buyer-bubble"} key={message.id}>
                    <div className="talktext">
                        <div className="top-message">
                            <img src={users.find(user => user.id === message.user_id)?.profile_pic_url} alt="profile" className="message-profile-pic" />
                            <h2 className="message-user-text">{users.find(user => user.id === message.user_id)?.username}</h2>
                        </div>
                        <p className="message-content">{message.content}</p>
                        <p className="message-timestamp">{message.timestamp}</p>
                    </div>
                </div>
            ))}
            <form className="message-form">
                <input type="text" className="message-input" placeholder="Type a message..." />
                <button className="message-send-button button-default" type="submit">Send</button>
            </form>
        </div>
    )
}

export default MessagingPage;