import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/category";
import { createPost } from "../../store/post";
import './CreatePost.css'

const CreatePost = (props) => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('1')
    const [showErrors, setShowErrors] = useState(false);
    const user = useSelector(state => state.session.user);
    const { categories } = props;
    const [imageLoading, setImageLoading] = useState(false);

    useEffect(() => {
        let newErrors = [];

        if (!image) {
            newErrors.push("Please upload an image.");
        }
        if (!title) newErrors.push("Please enter a title.");
        if (!description) newErrors.push("Please enter a description of the item.");
        if (!price) newErrors.push("Please enter a price.");
        if (!quantity) newErrors.push("Please enter a quantity.");
        if (!category) newErrors.push("Please choose a category");
        if (title.length < 3) newErrors.push("Title must be longer than 3 characters!");
        if (title.length > 20) newErrors.push("Title must be less than 20 characters!");
        if (+quantity > 1000) newErrors.push("Quantity is too large. Must be lower than 1,000!");
        if (+quantity < 0) newErrors.push("Quantity must be greater than 0!");
        if (+price < 0) newErrors.push("Price must be greater than or equal to $0!");
        if (+price > 1000000000) newErrors.push("Price must be less than $1,000,000,000!");

        setErrors(newErrors);
        newErrors = [];


    }, [dispatch, image, title, description, price, quantity, category]);

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

        if (errors.length > 0) {
            setShowErrors(true);
            return;
        }

        // if(!errors.length) {
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
            const newPost = await response.json();
            dispatch(createPost(newPost));
            setImageLoading(false);
            props.setTrigger(false);
        } else {
            setImageLoading(false);

            console.log("there was an error here is some info", response, response.formData, response.status);
        }
        // }
    };

    const handlePicture = event => {
        const realBtn = document.getElementById('real-file-button');
        const fileName = document.getElementById('file-name');
        realBtn.click();

        realBtn.addEventListener('change', () => {

            if (realBtn.value) {
                const name = realBtn.value.split("\\")[2];
                fileName.innerHTML = name;
            }
            else fileName.innerHTML = 'No picture chosen!"'
        });
    };

    return (
        <div className="create-post-background" onClick={() => props.setTrigger(false)}>
            <div className="create-post-div">
                <h2 className="create-post-title">Create Post</h2>
                <form onSubmit={handleSubmit} className="create-post-form">
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
                            <textarea
                                name="description"
                                className="description-input"
                                onChange={updateDescription}
                                value={description}
                                placeholder="Description"
                            ></textarea>
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
                                placeholder="0"
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
                                placeholder="0"
                            ></input>
                        </div>
                    </div>
                    <div className="third-layer-form">
                        <div className="category-div">
                            <select className="categories" name="categories" form="create-post-form" onChange={updateCategory} defaultValue={"DEFAULT"}>
                                <option disabled value="DEFAULT">Category</option>
                                {categories?.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
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
                        <button className="cancel-post-button button-default-cancel" onClick={event => props.setTrigger(false)}>Cancel</button>
                    </div>
                    {imageLoading && (
                        <img src="https://pokeup.s3.us-west-1.amazonaws.com/pokeball_PNG24.png" alt="pokeball-spinning" className="loading-logo" />
                    )}
                </form>
                <img src="https://pokeup.s3.us-west-1.amazonaws.com/PngItem_5254081.png" alt="pikachu-and-ash" className="pikachu-and-ash-pic" />
            </div>
        </div>
    )
}

export default CreatePost;