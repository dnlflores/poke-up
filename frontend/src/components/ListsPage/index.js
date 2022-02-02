import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getLists, removeList } from '../../store/list';
import CreateList from '../CreateList';
import EditList from '../EditList';
import './ListsPage.css';


const ListsPage = props => {
    const dispatch = useDispatch();
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
        event.preventDefault();

        setListButtonPopup(!listButtonPopup);
    };

    const showEdit = event => {
        event.preventDefault();
        const listId = event.target.className.split(' ')[1];
        setEditButtonPopup(listId);
    }

    const handleDelete = event => {
        event.preventDefault();
        const listId = event.target.className.split(' ')[1];
        dispatch(removeList(listId));
    };

    return (
        <div>
            {listButtonPopup && (
                <CreateList trigger={listButtonPopup} setTrigger={setListButtonPopup} />
            )}
            <h2 className='list-page-title'>Lists</h2>
            <button className="create-button button-pokeball" id="create-list-button" onClick={showList}>Create List!</button>
            <div className="list-container">
                {lists?.map(list => (
                    <>
                        <div className="list-div">
                            <img src={list.image_url} alt="list-cover" className="list-cover-image"></img>
                            <div className="title-buttons-div">
                                <h2 className="list-title">{list.name}</h2>
                                <button className={`delete-list ${list.id} button-default-cancel`} onClick={handleDelete}>Delete</button>
                                <button className={`edit-list ${list.id} button-default`} onClick={showEdit}>Edit</button>
                                <NavLink to={`/lists/${list.id}`} exact={true} activeClassName="active" className="arrow-link"><span className="material-icons arrow-icon">arrow_forward_ios</span></NavLink>
                            </div>
                        </div>
                        {+editButtonPopup === list.id && (
                            <EditList trigger={editButtonPopup} setTrigger={setEditButtonPopup} list={list} />
                        )}
                    </>
                ))}
                {lists?.length === 0 && (
                    <div>
                        <h2 className="empty-page-text 1">No Lists yet!</h2>
                        <h2 className="empty-page-text 2">Try adding some!</h2>
                        <img src="https://pokeup.s3.us-west-1.amazonaws.com/toppng.com-okemon-characters-png-download-image-pokemon-pikachu-980x490.png" alt="starters-together" className="empty-page-pic"></img>
                    </div>
                )}
            </div>
        </div>
    )
};

export default ListsPage;