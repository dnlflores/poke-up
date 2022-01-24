import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
        dispatch(getLists())
    }, [dispatch]);

    const showList = event => {
        event.preventDefault();

        setListButtonPopup(!listButtonPopup);
    };

    const showEdit = event => {
        event.preventDefault();
        const listId = event.target.className.split('-')[2];
        setEditButtonPopup(listId);
    }

    const handleDelete = event => {
        event.preventDefault();
        const listId = event.target.className.split('-')[2];
        dispatch(removeList(listId));
    };

    return (
        <div>
            {listButtonPopup && (
                <CreateList trigger={listButtonPopup} setTrigger={setListButtonPopup} />
            )}
            <div className="list-container">
                <button className="create-list-button" onClick={showList}>Create List</button>
                {lists?.map(list => (
                    <>
                        <div className="list-div">
                            <img src={list.image_url} alt="list-cover"></img>
                            <h2 className="list-title">{list.name}</h2>
                            <button className={`delete-list-${list.id}`} onClick={handleDelete}>Delete</button>
                            <button className={`edit-list-${list.id}`} onClick={showEdit}>Edit</button>
                        </div>
                        {+editButtonPopup === list.id && (
                            <EditList trigger={editButtonPopup} setTrigger={setEditButtonPopup} list={list} />
                        )}
                    </>
                ))}
            </div>
        </div>
    )
};

export default ListsPage;