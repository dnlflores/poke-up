import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createList } from "../../store/list";
import './CreateList.css'

const CreateList = (props) => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const user = useSelector(state => state.session.user);

    const [imageLoading, setImageLoading] = useState(false);

    const updateName = event => {
        setName(event.target.value);
    };

    const updateImage = event => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const newErrors = [];

        if(!name) newErrors.push("Please enter a name for this list.");

        if(newErrors.length) setErrors(newErrors);
        else {
            const formData = new FormData();
            formData.append("image", image);

            // aws uploads can be a bit slow—displaying
            // some sort of loading message is a good idea
            setImageLoading(true);

            formData.append("name", name);
            formData.append("user_id", user.id);

            const response = await fetch("/api/lists/", {
                method: "POST",
                body: formData,
            });
            
            if (response.ok) {
                const newList = await response.json();
                dispatch(createList(newList));
                setImageLoading(false);
                props.setTrigger(false);
            }else {
                setImageLoading(false);

                console.log("there was an error here is some info", response, response.formData, response.status);
            }
        }
    }

    return (
        <div className="create-list-background">
            <div className="create-list-div">
                <h2 className="create-list-title">Create List</h2>
                <form onSubmit={handleSubmit} id="create-list-form">
                    <ul>
                        {errors.length > 0 && errors.map(err => (
                            <li className="display-errors" key={err}>{err}</li>
                        ))}
                    </ul>
                    <div className="create-list-form-div">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            className="name-input"
                            onChange={updateName}
                            value={name}
                        ></input>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={updateImage}
                        />
                        <button className="submit-button" type="submit">Create List!</button>
                        <button className="cancel-button" onClick={event => props.setTrigger(false)}>Cancel</button>
                        {imageLoading && <p>Loading...</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateList;