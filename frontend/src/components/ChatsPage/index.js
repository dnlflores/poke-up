import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getChats } from '../../store/chat';

const ChatsPage = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const chats = useSelector(state => Object.values(state.chats || {}));

    useEffect(() => {
        dispatch(getChats());
        (function () { document.documentElement.scrollTop = 0 })();
        if (window.location.href.split('/').length > 3) {
            if (window.location.href.split('/')[3] === 'chats') {
                document.getElementById('create-post-button').setAttribute('hidden', true);
            }
        }
        document.getElementById('about-links').setAttribute('style', 'display: none');
    }, [dispatch]);

    return (
        <div>
            <h2>testing the chats component</h2>
        </div>
    );
}

export default ChatsPage;