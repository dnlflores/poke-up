import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLists, removeList } from '../../store/list';
import CreateList from '../CreateList';
import './ListsPage.css';


const ListsPage = props => {
    const dispatch = useDispatch();
    const lists = useSelector(state => Object.values(state.lists));
    const [listButtonPopup, setListButtonPopup] = useState(false);

    useEffect(() => {
        dispatch(getLists())
    }, [dispatch]);

    const handleList = event => {
        event.preventDefault();

        setListButtonPopup(!listButtonPopup);
    };

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
                <button className="create-list-button" onClick={handleList}>Create List</button>
                {lists?.map(list => (
                    <div className="list-div">
                        <img src={list.image_url} alt="list-cover"></img>
                        <h2 className="list-title">{list.name}</h2>
                        <button className={`delete-list-${list.id}`} onClick={handleDelete}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default ListsPage;