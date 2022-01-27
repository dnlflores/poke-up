import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createList } from "../../store/list";
import './CreateList.css'

const CreateList = (props) => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [showErrors, setShowErrors] = useState(false);
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
        if (errors.length > 0) setShowErrors(true);
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
                <h2 className="create-post-title">Create List</h2>
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
                        <div className="name-div">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                className="name-input"
                                onChange={updateName}
                                value={name}
                                placeholder="Name"
                            ></input>
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
                        <button className="submit-list-button button-default" type="submit">Create List</button>
                        <button className="cancel-button button-default" onClick={event => props.setTrigger(false)}>Cancel</button>
                    </div>
                    {imageLoading && (
                        <img src="https://pokeup.s3.us-west-1.amazonaws.com/pokeball_PNG24.png" alt="pokeball-spinning" className="loading-logo"></img>
                    )}
                </form>
            </div>
            <img src="https://pokeup.s3.us-west-1.amazonaws.com/PngItem_23898.png" alt="pikachu" className="pikachu-pic"></img>
            <img src="https://pokeup.s3.us-west-1.amazonaws.com/Ash-Ketchum-Transparent-Background.png" alt="ash" className="ash-pic"></img>
        </div>
    )
}

export default CreateList;