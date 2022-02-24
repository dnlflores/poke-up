import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/session';
import './EditBio.css'

export default function EditBio(props) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState('');

    const handleEditBio = async event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("description", description);

        const response = await fetch(`/api/users/${props.user.id}`, {
            method: "PATCH",
            body: formData,
        });
        if (response.ok) {
            const updatedUser = await response.json();
            dispatch(updateUser(updatedUser));
            props.setTrigger(false);
        }else {
            console.log("there was an error here is some info", response, response.formData, response.status);
        }
    };

    const updateDescription = event => {
        setDescription(event.target.value);
    };

    return (
        <div className="create-post-background">
            <div className="create-post-div edit-post-div edit-bio-div">
                <h2 className="create-post-title">Edit Bio</h2>
                <form onSubmit={handleEditBio} id="create-post-form">
                    <ul>
                        {errors.length > 0 && errors.map(err => (
                            <li className="display-errors" key={err}>{err}</li>
                        ))}
                    </ul>
                    <div className="create-form-div edit-bio-form-div">
                        <div className="name-div edit-bio">
                            <label>Bio</label>
                            <textarea
                                name="bio"
                                className="bio-input"
                                onChange={updateDescription}
                                value={description}
                                placeholder="Bio"
                            ></textarea>
                        </div>
                        <div className="form-buttons bio-form-buttons">
                            <button className="submit-bio-button button-default" type="submit">Submit Edit</button>
                            <button className="cancel-button button-default" onClick={event => props.setTrigger(false)}>Cancel</button>
                        </div>
                    </div>
                </form>
                <img src="https://pokeup.s3.us-west-1.amazonaws.com/Daco_4212459.png" alt="dragonite" className="dragonite-pic"></img>
            </div>
        </div>
    )
}