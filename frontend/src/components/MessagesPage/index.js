import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getCategories } from "../../store/category";
import { getChats, getMessages } from "../../store/chat";
import './MessagesPage.css';

const MessagesPage = props => {
    const dispatch = useDispatch();
    const { chatId } = useParams()
    const history = useHistory();
    const chats = useSelector(state => state.chats);
    const [users, setUsers] = useState([]);

    const messages = chats?.[chatId]?.messages;
    const messagesArray = Object.values(messages || {});

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getMessages(chatId));

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
    }, [dispatch, chatId]);

    console.log("these are the messages => ", messages);
    console.log("this is the first message timestamp => ", messages?.[0]?.timestamp);

    return (
        <div className="message-container">
            {messagesArray.map(message => (
                <div>
                    <h1>{users.find(user => user.id === message.user_id)?.username}</h1>
                    <h2>{message.content}</h2>
                    <h3>{message.timestamp}</h3>
                </div>

            ))}
        </div>
    )
}

export default MessagesPage;