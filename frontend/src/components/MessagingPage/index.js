import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getCategories } from "../../store/category";
import { getChats, getMessages } from "../../store/chat";
import './MessagingPage.css';

const MessagingPage = props => {
    const dispatch = useDispatch();
    const { postId } = useParams()
    const history = useHistory();
    const chats = useSelector(state => state.chats);
    const [users, setUsers] = useState([]);

    

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getMessages());

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

    // return (
        // <div className="message-container">
        //     {messagesArray.map(message => (
        //         <div key={message.id}>
        //             <h1>{users.find(user => user.id === message.user_id)?.username}</h1>
        //             <h2>{message.content}</h2>
        //             <h3>{message.timestamp}</h3>
        //         </div>

        //     ))}
        // </div>
    // )
}

export default MessagingPage;