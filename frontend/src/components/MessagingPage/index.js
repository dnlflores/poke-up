import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategories } from "../../store/category";
import { getMessages, sendMessage } from "../../store/chat";
import { getPosts } from "../../store/post";
import { io } from "socket.io-client";
import './MessagingPage.css';
let socket 
// = io.connect("http://localhost:3000");

const MessagingPage = props => {
    const footerRef = useRef();
    const dispatch = useDispatch();
    const { chatId, postId } = useParams();
    const messages = useSelector(state => state.chats[chatId]?.messages);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
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

        footerRef.current.scrollIntoView();

        if (window.location.href.split('/').length > 3) {
            if (window.location.href.split('/')[3] === 'chats') {
                document.getElementById('create-post-button').setAttribute('hidden', true);
            }
        }
        document.getElementById('about-links').setAttribute('style', 'display: none');
        document.getElementsByTagName('iframe')[0]?.setAttribute('style', 'display: none');
        // open socket connection
        // create websocket
        socket = io();
        socket.on("connect", () => {
            console.log("connected to server");
        });
        socket.on("message", data => {
            console.log("message received on frontend", data);
            dispatch(getMessages(chatId));
            footerRef.current.scrollIntoView();
        })
        // when component unmounts, disconnect
        return () => {
          socket.disconnect();
        };
    }, [dispatch, chatId]);

    const handleSubmit = event => {
        event.preventDefault();
        // footerRef.current.scrollIntoView();
        dispatch(sendMessage(chatId, message));
        socket.emit("message", message)
        setMessage("");
        footerRef.current.scrollIntoView();
    }

    const updateMessage = event => {
        setMessage(event.target.value);
    }

    return (
        <div className="page-container">
            <div className="message-page-post-container">
                <img src={post?.image_url} alt="post" className="message-page-post-image" />
                <h2>{post?.title}</h2>
            </div>
            {messagesArray.map(message => (
                <div className={message.user_id === currentUser.id ? "talk-bubble tri-right border round btm-right-in user-bubble" : "talk-bubble tri-right border round btm-left-in buyer-bubble"} key={message.id}>
                    <div className="talktext message-container">
                        <div className="top-message">
                            <img src={users.find(user => user.id === message.user_id)?.profile_pic_url} alt="profile" className="message-profile-pic" />
                            <h2 className="message-user-text">{users.find(user => user.id === message.user_id)?.username}</h2>
                        </div>
                        <p className="message-content">{message?.content}</p>
                        <p className="message-timestamp">{message?.timestamp}</p>
                    </div>
                </div>
            ))}
            <form className="message-form" onSubmit={handleSubmit}>
                <input ref={footerRef} type="text" className="message-input" name="content" value={message} onChange={updateMessage} placeholder="Type a message..." />
                <button className="message-send-button button-default" type="submit" onClick={e => footerRef.current.scrollIntoView()}>Send</button>
            </form>
        </div>
    )
}

export default MessagingPage;