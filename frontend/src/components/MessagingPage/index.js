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
                        <h1>{users.find(user => user.id === message.user_id)?.username}</h1>
                        <h2>{message.content}</h2>
                        <p>{message.timestamp}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MessagingPage;