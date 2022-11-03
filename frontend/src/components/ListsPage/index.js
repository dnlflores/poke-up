import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getLists, removeList } from '../../store/list';
import CreateList from '../CreateList';
import EditList from '../EditList';
import './ListsPage.css';


const ListsPage = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const lists = useSelector(state => Object.values(state.lists));
    const [listButtonPopup, setListButtonPopup] = useState(false);
    const [editButtonPopup, setEditButtonPopup] = useState(0)

    useEffect(() => {
        dispatch(getLists());
        (function () {document.documentElement.scrollTop = 0})();
        if(window.location.href.split('/').length > 3) {
          if (window.location.href.split('/')[3] === 'lists') {
            document.getElementById('create-post-button').setAttribute('hidden', true);
          }
        } 
        document.getElementById('about-links').setAttribute('style', 'display: none');
    }, [dispatch]);

    const showList = event => {
        event.stopPropagation();

        setListButtonPopup(!listButtonPopup);
    };

    const showEdit = event => {
        event.stopPropagation();
        const listId = event.target.className.split(' ')[1];
        setEditButtonPopup(listId);
    }

    const handleDelete = event => {
        event.stopPropagation();
        const listId = event.target.className.split(' ')[1];
        dispatch(removeList(listId));
    };

    const navigateToList = (listId, e) => {
        e.stopPropagation();
        history.push(`/lists/${listId}`)
    };

    return (
        <div className="page-container">
            {listButtonPopup && (
                <CreateList trigger={listButtonPopup} setTrigger={setListButtonPopup} />
            )}
            <button className="create-button button-pokeball" id="create-list-button" onClick={showList}>Create List!</button>
            <h2 className='page-title'>Your Lists</h2>
            <div className="list-container">
                {lists?.map(list => (
                    <div className="flx-ctr" key={list.id}>
                        <div className="list-div" onClick={() => history.push(`/lists/${list.id}`)}>
                            <div className="flx-ctr">
                                <img src={list.image_url} alt="list-cover" className="list-cover-image"></img>
                                <div className="title-buttons-div">
                                    <h2 className="list-title" onClick={event => history.push(`/lists/${list.id}`)}>{list.name}</h2>
                                    <button className={`delete-list ${list.id} button-default-cancel`} onClick={handleDelete}><span className={`material-icons ${list.id} delete-list-text`}>delete_forever</span></button>
                                    <button className={`edit-list button-default`} onClick={showEdit}><span className={`material-icons ${list.id} edit-list-text`}>edit</span></button>
                                </div>
                            </div>
                            <h2 onClick={e => navigateToList(list.id, e)} className="arrow-link"><span className="material-icons arrow-icon">arrow_forward_ios</span></h2>
                        </div>
                        {+editButtonPopup === list.id && (
                            <EditList trigger={editButtonPopup} setTrigger={setEditButtonPopup} list={list} />
                        )}
                    </div>
                ))}
            </div>
            {lists?.length === 0 && (
                <div>
                    <h2 className="empty-page-text 1">No Lists yet!</h2>
                    <h2 className="empty-page-text 2">Try adding some!</h2>
                    <img src="https://pokeup.s3.us-west-1.amazonaws.com/toppng.com-okemon-characters-png-download-image-pokemon-pikachu-980x490.png" alt="starters-together" className="empty-page-pic"></img>
                </div>
            )}
        </div>
    )
};

export default ListsPage;