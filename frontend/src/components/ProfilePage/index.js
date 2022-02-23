import { useParams, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../store/post';
import './ProfilePage.css'

export default function ProfilePage(props) {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const [users, setUsers] = useState([]);
    const posts = useSelector(state => Object.values(state.posts));
    const userPosts = posts.filter(post => post.user_id === +userId);

    useEffect(() => {
        async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
        }
        fetchData();
        dispatch(getPosts());
        (function () {document.documentElement.scrollTop = 0})();
    }, [dispatch]);

    const user = Object.values(users).find(user => user.id === +userId);

    // console.log("USERS => ", users);
    // console.log("USER ID => ", userId);
    // console.log("USER => ", Object.values(users).find(user => user.id === +userId));

    return (
        <div className="profile-page-container">
            <div className="upper-profile-container">
                <div className="pro-pic-name-div">
                    <img src={user?.profile_pic_url} alt="user-profile" className="pro-pic"></img>
                    <h1 className="profile-username">{user?.username}</h1>
                </div>
                <div className="bio-div">
                    <h2 className="bio-text">Bio</h2>
                    <p className="profile-bio-text">{user?.description}</p>
                </div>
            </div>
            <div className="similar-posts-container profile-posts-container">
                <h2>Items From This PokéSeller</h2>
                <div className="similar-posts-div-container">
                    {userPosts?.map(post => (
                        <div className="similar-post-div" key={post.id}>
                            <NavLink to={`/posts/${post.id}`} exact={true} activeClassName='active' onClick={function () {document.documentElement.scrollTop = 0}}>
                                <img src={post.image_url} alt="similar-post" className={`image-post ${post.id}`}></img>
                            </NavLink>
                            <h3 className="similar-post-title">{post.title}</h3>
                            <label className="similar-post-price">${post.price.toLocaleString("en-US")}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}