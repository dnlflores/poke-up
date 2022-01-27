import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/category";
import { editPost } from "../../store/post";
import "./EditPost.css";

const EditPost = (props) => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState(1);
    const [showErrors, setShowErrors] = useState(false);
    const user = useSelector(state => state.session.user);
    const categories = useSelector(state => Object.values(state.categories));

    const [imageLoading, setImageLoading] = useState(false);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const updateTitle = event => {
        setTitle(event.target.value);
    };

    const updateDescription = event => {
        setDescription(event.target.value);
    };

    const updatePrice = event => {
        setPrice(event.target.value);
    };

    const updateQuantity = event => {
        setQuantity(event.target.value);
    };

    const updateImage = event => {
        setImage(event.target.files[0]);
    };

    const updateCategory = event => {
        setCategory(+event.target.value)
    }

    const handleSubmit = async event => {
        event.preventDefault();

        const newErrors = [];

        if(newErrors.length) {
            setErrors(newErrors);
            setShowErrors(true);
        }
        else {
            const formData = new FormData();
            formData.append("image", image);

            // aws uploads can be a bit slow—displaying
            // some sort of loading message is a good idea
            setImageLoading(true);

            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("quantity", quantity);
            formData.append("user_id", user.id);
            formData.append("category_id", category);

            const response = await fetch(`/api/posts/${props.post.id}`, {
                method: "PUT",
                body: formData,
            });
            if (response.ok) {
                const updatedPost = await response.json();
                dispatch(editPost(updatedPost));
                setImageLoading(false);
                props.setTrigger(0);
            }else {
                setImageLoading(false);

                console.log("there was an error here is some info", response, response.formData, response.status);
            }
        }
    };

    const handlePicture = event => {
        const realBtn = document.getElementById('real-file-button');
        const fileName = document.getElementById('file-name');
        realBtn.click();

        realBtn.addEventListener('change', () => {
            
            if(realBtn.value) {
                const name = realBtn.value.split("\\")[2];
                fileName.innerHTML = name;
            }
            else fileName.innerHTML = 'No picture chosen!"'
        });
    };

    return (
        <div className="create-post-background">
            <div className="create-post-div">
                <h2 className="create-post-title">Edit Post</h2>
                <form onSubmit={handleSubmit} id="create-post-form">
                    {showErrors > 0 && (
                        <div className="background-errors">
                            <div className="errors-container">
                                {errors.length > 0 && errors.map(err => (
                                    <label className="display-errors" key={err}>{err}</label>
                                ))}
                                <button className="button-default" onClick={event => setShowErrors(false)}>Ok!</button>
                            </div>
                        </div>
                    )}
                    <div className="create-form-div">
                        <div className="first-layer-form">
                            <div className="title-div">
                                <label>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="title-input"
                                    onChange={updateTitle}
                                    value={title}
                                    placeholder="Title"
                                ></input>
                            </div>
                            <div className="description-div">
                                <label>Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    className="description-input"
                                    onChange={updateDescription}
                                    value={description}
                                    placeholder="Description"
                                ></input>
                            </div>
                        </div>
                        <div className="second-layer-form">
                            <div className="price-div">
                                <label>Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="price-input"
                                    onChange={updatePrice}
                                    value={price}
                                ></input>
                            </div>
                            <div className="quantity-div">
                                <label>Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    className="quantity-input"
                                    onChange={updateQuantity}
                                    value={quantity}
                                ></input>
                            </div>
                        </div>
                        <div className="third-layer-form">
                            <div className="category-div">
                                <select className="categories" name="categories" form="create-post-form" onChange={updateCategory}>
                                    <option disabled selected>Category</option>
                                    {categories?.map(category => (
                                        <option value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={updateImage}
                                id="real-file-button"
                                hidden
                            />
                            <div className="fake-file-input">
                                <span id="file-name">No picture chosen!</span>
                                <button className="button-default fake-file-button" type="button" onClick={handlePicture}>Choose a Picture!</button>
                            </div>
                        </div>
                        <div className="form-buttons">
                            <button className="submit-post-button button-default" type="submit">Submit Post</button>
                            <button className="cancel-button button-default" onClick={event => props.setTrigger(false)}>Cancel</button>
                        </div>
                    </div>
                    {imageLoading && (
                        <img src="https://pokeup.s3.us-west-1.amazonaws.com/pokeball_PNG24.png" alt="pokeball-spinning" className="loading-logo"></img>
                    )}
                </form>
                <img src="https://pokeup.s3.us-west-1.amazonaws.com/PngItem_5254081.png" alt="pikachu-and-ash" className="pikachu-and-ash-pic"></img>
            </div>
        </div>
    )
}

export default EditPost;