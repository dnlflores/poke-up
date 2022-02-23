import './PageNotFound.css';

export default function PageNotFound() {
    return (
        <div className="page-not-found-container">
            <h2 id="page-not-found-title">You seem lost my friend...?</h2>
            <img src="https://pokeup.s3.us-west-1.amazonaws.com/you_caught_a_pikachu__by_seviyummy_d9sjcsg-fullview.png" alt="pikachu-confused" id="pikachu-confused-img"></img>
            <img src="https://pokeup.s3.us-west-1.amazonaws.com/psyduck.png" alt="psyduck-confused" id="psyduck-confused-img"></img>
        </div>
    )
}