import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateList } from "../../store/list";
import "./EditList.css";

const EditList = (props) => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
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

        if(newErrors.length) setErrors(newErrors);
        else {
            const formData = new FormData();
            formData.append("image", image);

            // aws uploads can be a bit slow—displaying
            // some sort of loading message is a good idea
            setImageLoading(true);

            formData.append("name", name);
            formData.append("user_id", user.id);

            const response = await fetch(`/api/lists/${props.list.id}`, {
                method: "PATCH",
                body: formData,
            });
            if (response.ok) {
                const updatedList = await response.json();
                dispatch(updateList(updatedList));
                setImageLoading(false);
                props.setTrigger(0);
            }else {
                setImageLoading(false);

                console.log("there was an error here is some info", response, response.formData, response.status);
            }
        }
    }

    return (
        <div className="edit-background">
            <div className="edit-list-div">
                <h2 className="edit-list-title">Edit List</h2>
                <form onSubmit={handleSubmit} id="edit-list-form">
                    <ul>
                        {errors.length > 0 && errors.map(err => (
                            <li className="display-errors" key={err}>{err}</li>
                        ))}
                    </ul>
                    <div className="edit-form-div">
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
                        <button className="submit-button" type="submit">Submit Post</button>
                        <button onClick={event => props.setTrigger(0)}>Cancel</button>
                        {imageLoading && <p>Loading...</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditList;