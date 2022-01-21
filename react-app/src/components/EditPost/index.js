import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCategories } from "../../store/category";
import { editPost } from "../../store/post";

const EditPost = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState(1)
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
        setCategory(+event.target.value)
    }

    const handleSubmit = async event => {
        event.preventDefault();

        const newErrors = [];

        if(newErrors.length) setErrors(newErrors);
        else {
            const formData = new FormData();
            console.log("THIS IS THE CATEGORY => ", category);
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
                history.push('/')
            }else {
                setImageLoading(false);

                console.log("there was an error here is some info", response, response.formData, response.status);
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} id="edit-post-form">
                <ul>
                    {errors.length > 0 && errors.map(err => (
                        <li className="display-errors" key={err}>{err}</li>
                    ))}
                </ul>
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={updateImage}
                    />
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        className="title-input"
                        onChange={updateTitle}
                        value={title}
                    ></input>
                    <label>Category</label>
                    <select name="categories" form="edit-post-form" onChange={updateCategory}>
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
                    <button className="submit-button" type="submit">Submit Post</button>
                    <button onClick={event => props.setTrigger(0)}>Cancel</button>
                    {imageLoading && <p>Loading...</p>}
                </div>
            </form>
        </div>
    )
}

export default EditPost;