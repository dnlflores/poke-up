import { useParams, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../store/post';
import './ProfilePage.css'
import EditBio from '../EditBio';
import EditProPic from '../EditProPic';
import { updateUser } from '../../store/session';

export default function ProfilePage(props) {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const [users, setUsers] = useState([]);
    const [showBioEditButton, setShowBioEditButton] = useState(false);
    const [showPicEditButton, setShowPicEditButton] = useState(false);
    const [editBioButtonPopup, setEditBioButtonPopup] = useState(false);
    const [editProPicButtonPopup, setEditProPicButtonPopup] = useState(false);
    const posts = useSelector(state => Object.values(state.posts));
    const currentUser = useSelector(state => state.session.user);
    const profileUserPosts = posts.filter(post => post.user_id === +userId);
    const profileUser = Object.values(users).find(user => user.id === +userId);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }

        fetchData();
        dispatch(getPosts());
        dispatch(updateUser(currentUser));
        (function () { document.documentElement.scrollTop = 0 })();

        if (window.location.href.split('/').length === 5) {
            if (window.location.href.split('/')[3] === 'users') {
                document.getElementById('create-post-button')?.setAttribute('hidden', true);
            }
        }

    }, [dispatch, currentUser]);

    return (
        <div className="profile-page-container">
            <div className="upper-profile-container">
                <div className="pro-pic-name-div" onMouseEnter={event => setShowPicEditButton(true)} onMouseLeave={event => setShowPicEditButton(false)}>
                    <img src={profileUser?.profile_pic_url} alt="user-profile" className="pro-pic"></img>
                    <h1 className="profile-username">{profileUser?.username}</h1>
                    {profileUser?.id === currentUser?.id && showPicEditButton && (
                        <button className='button-default edit-pro-pic-button' onClick={event => setEditProPicButtonPopup(true)}>Edit</button>
                    )}
                </div>
                <div className="bio-div" onMouseEnter={event => setShowBioEditButton(true)} onMouseLeave={event => setShowBioEditButton(false)}>
                    <h2 className="bio-text">Bio</h2>
                    <p className="profile-bio-text">{profileUser?.description}</p>
                    {profileUser?.id === currentUser?.id && showBioEditButton && (
                        <button className='button-default edit-bio-button' onClick={event => setEditBioButtonPopup(true)}>Edit</button>
                    )}
                </div>
            </div>
            <div className="similar-posts-container profile-posts-container">
                <h2 className="profile-posts-title">Items From This PokéSeller</h2>
                <div className="similar-posts-div-container">
                    {profileUserPosts?.map(post => (
                        <div className="similar-post-div" key={post.id}>
                            <NavLink to={`/posts/${post.id}`} exact={true} activeClassName='active' onClick={function () { document.documentElement.scrollTop = 0 }}>
                                <img src={post.image_url} alt="similar-post" className={`image-post ${post.id}`}></img>
                            </NavLink>
                            <h3 className="similar-post-title">{post.title}</h3>
                            <label className="similar-post-price">${post.price.toLocaleString("en-US")}</label>
                        </div>
                    ))}
                </div>
            </div>
            {editBioButtonPopup && (
                <EditBio user={currentUser} trigger={editBioButtonPopup} setTrigger={setEditBioButtonPopup} />
            )}
            {editProPicButtonPopup && (
                <EditProPic user={currentUser} trigger={editProPicButtonPopup} setTrigger={setEditProPicButtonPopup} />
            )}
        </div>
    )
}