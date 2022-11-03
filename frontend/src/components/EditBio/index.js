import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/session';
import './EditBio.css'

export default function EditBio(props) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState(props.user.description);
    const [showErrors, setShowErrors] = useState(false);

    const handleEditBio = async event => {
        event.preventDefault();

        if (errors.length > 0) {
            setShowErrors(true);
            return;
        }

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
        } else {
            console.log("there was an error here is some info", response, response.formData, response.status);
        }
    };

    const updateDescription = event => {
        setDescription(event.target.value);
    };

    useEffect(() => {
        let newErrors = [];
        if (description.length > 200) newErrors.push('Description must be less than 200 characters');
        setErrors(newErrors);
    }, [description]);

    return (
        <div className="create-post-background" onClick={() => props.setTrigger(false)}>
            <div className="create-post-div edit-post-div edit-bio-div" onClick={e => e.stopPropagation()}>
                <h2 className="create-post-title">Edit Bio</h2>
                <form onSubmit={handleEditBio} className="create-post-form">
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
                        <button className="button-default-cancel" onClick={event => props.setTrigger(false)}>Cancel</button>
                    </div>
                </form>
                <img src="https://pokeup.s3.us-west-1.amazonaws.com/Daco_4212459.png" alt="dragonite" className="dragonite-pic"></img>
            </div>
        </div>
    )
}