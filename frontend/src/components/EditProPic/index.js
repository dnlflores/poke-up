import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/session';
import './EditProPic.css'

export default function EditProPic(props) {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleEditProPic = async event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("email", email);

        setImageLoading(true);

        const response = await fetch(`/api/users/${props.user.id}`, {
            method: "PATCH",
            body: formData,
        });
        if (response.ok) {
            const updatedUser = await response.json();
            dispatch(updateUser(updatedUser));
            setImageLoading(false);
            props.setTrigger(false);
        }else {
            setImageLoading(false);

            console.log("there was an error here is some info", response, response.formData, response.status);
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

    const updateImage = event => {
        setImage(event.target.files[0]);
    };

    const updateEmail = event => {
        setEmail(event.target.value);
    };

    const updateName = event => {
        setName(event.target.value);
    };

    return (
        <div className="create-post-background">
            <div className="create-post-div edit-post-div edit-pro-pic-div">
                <h2 className="create-post-title edit-pro-pic-title">Edit Profile Picture</h2>
                <form onSubmit={handleEditProPic} id="create-post-form">
                    <div className="create-form-div">
                        <div className="name-div edit">
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
                        <div className="name-div edit-email">
                            <label>email</label>
                            <input
                                type="text"
                                name="email"
                                className="name-input email-input"
                                onChange={updateEmail}
                                value={email}
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
                        <div className="fake-file-input edit-fake">
                            <span id="file-name">No picture chosen!</span>
                            <button className="button-default fake-file-button" type="button" onClick={handlePicture}>Choose a Picture!</button>
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button className="submit-list-button button-default" type="submit">Submit Edit</button>
                        <button className="cancel-button button-default" onClick={event => props.setTrigger(false)}>Cancel</button>
                    </div>
                    <img src="https://pokeup.s3.us-west-1.amazonaws.com/pngaaa.com-785576.png" alt="togepi" className="togepi-pic"></img>
                    <img src="https://pokeup.s3.us-west-1.amazonaws.com/toppng.com-anime-pokemon-transparent-background-transparent-background-pokemon-transparent-851x1248.png" alt="celebi" className="celebi-pic"></img>
                    {imageLoading && (
                        <img src="https://pokeup.s3.us-west-1.amazonaws.com/pokeball_PNG24.png" alt="pokeball-spinning" className="loading-logo"></img>
                    )}
                </form>
            </div>
        </div>
    )
}