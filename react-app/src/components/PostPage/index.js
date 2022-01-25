import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPosts } from '../../store/post';
import { getCategories } from '../../store/category';
import './PostPage.css';

const PostPage = props => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const posts = useSelector(state => Object.values(state.posts));
    const categories = useSelector(state => Object.values(state.categories));
    const [users, setUsers] = useState([]);
    
    const post = posts.find(post => post.id === +id);
    const category = categories.find(category => category.id === post?.category_id);
    const similarPosts = posts.filter(similarPost => {
        if(similarPost.category_id === category?.id){
            if(similarPost.id !== post.id) return similarPost;
        }
    });
    const seller = users.find(user => user.id === post?.user_id);
    const otherSellerPosts = posts.filter(sellerPost => {
        if(sellerPost.user_id === seller?.id){
            if(sellerPost.id !== post.id) return sellerPost;
        }
    });

    console.log("THIS IS THE SELLER => ", users.find(user => user.id === post.user_id));
    
    useEffect(() => {
        dispatch(getPosts());
        dispatch(getCategories());
        async function fetchData() {
          const response = await fetch('/api/users/');
          const responseData = await response.json();
          setUsers(responseData.users);
        }
        fetchData();
    }, [dispatch]);

    return (
        <div className="post-container">
            <div className="left-container">
                <img src={post?.image_url} alt="post"></img>
            </div>
            <div className="right-container">
                <h2>{post?.title}</h2>
                <h2>${post?.price}</h2>
                <label className="category-text">{category?.name}</label>
                <button className="button-default">Buy</button>
                <label className="quantity-text">Quantity: </label>
                <h2>{post?.quantity}</h2>
                <button>ADD TO LIST</button>
                <div className="seller-container">
                    <img src={seller?.profile_pic_url} alt="seller-profile"></img>
                    <h2>{seller?.username}</h2>
                </div>
            </div>
            <div className="description-container">
                <h2>Description</h2>
                <p className="description-text">{post?.description}</p>
            </div>
            <div classname="similar-posts-container">
                <h2>Similar Items</h2>
                <div className="similar-posts-container">
                    {similarPosts?.map(post => (
                        <div className="similar-post-div">
                            <img src={post.image_url} alt="similar-post"></img>
                            <h2 className="similar-post-title">{post.title}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div classname="more-posts-container">
                <h2>More Items From This PokéSeller</h2>
                <div className="more-posts-container">
                    {otherSellerPosts?.map(post => (
                        <div className="more-post-div">
                            <img src={post.image_url} alt="more-post"></img>
                            <h2 className="more-post-title">{post.title}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostPage;