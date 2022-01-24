import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCategories } from "../../store/category";
import './CreatePost.css'

const CreatePost = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('1')
    const user = useSelector(state => state.session.user);
    const categories = useSelector(state => Object.values(state.categories))

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
        setCategory(event.target.value)
    }

    const handleSubmit = async event => {
        event.preventDefault();

        const newErrors = [];

        if(!image) newErrors.push("Please upload an image.");
        if(!title) newErrors.push("Please enter a title.");
        if(!description) newErrors.push("Please enter a description of the item.");
        if(!price) newErrors.push("Please enter a price.");
        if(!quantity) newErrors.push("Please enter a quantity.");
        if(!category) newErrors.push("Please choose a category");

        if(newErrors.length) setErrors(newErrors);
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
            formData.append("category_id", category)

            const response = await fetch("/api/posts/", {
                method: "POST",
                body: formData,
            });
            
            if (response.ok) {
                await response.json();
                setImageLoading(false);
                history.push("/");
            }else {
                setImageLoading(false);

                console.log("there was an error here is some info", response, response.formData, response.status);
            }
        }
    }

    return (
        <div className="create-post-background">
            <div className="create-post-div">
                <h2 className="create-post-title">Create Post</h2>
                <form onSubmit={handleSubmit} id="create-post-form">
                    <ul>
                        {errors.length > 0 && errors.map(err => (
                            <li className="display-errors" key={err}>{err}</li>
                        ))}
                    </ul>
                    <div className="create-form-div">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            className="title-input"
                            onChange={updateTitle}
                            value={title}
                        ></input>
                        <label>Category</label>
                        <select name="categories" form="create-post-form" onChange={updateCategory}>
                            {categories?.map(category => (
                                <option value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            className="description-input"
                            onChange={updateDescription}
                            value={description}
                        ></input>
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            className="price-input"
                            onChange={updatePrice}
                            value={price}
                        ></input>
                        <label>Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            className="quantity-input"
                            onChange={updateQuantity}
                            value={quantity}
                        ></input>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={updateImage}
                        />
                        <button className="submit-button" type="submit">Submit Post</button>
                        <button className="cancel-button" onClick={event => props.setTrigger(false)}>Cancel</button>
                        {imageLoading && <p>Loading...</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost;