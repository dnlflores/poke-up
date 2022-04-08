import { NavLink } from 'react-router-dom';
import './SideBar.css';

export default function SideBar(props) {

    return (
        <>
            <div className="mobile-sidebar-background" onClick={() => props.setTrigger(false)} style={props.trigger ? { transform: 'translateX(100vw)' } : {}}></div>
            <div className="mobile-sidebar" style={props.trigger ? { transform: 'translateX(100vw)' } : {}}>
                {props.user && (
                    <div className="mobile-sidebar-user">
                        <NavLink to='/login' exact={true} onClick={() => props.setTrigger(false)}>
                            Login!
                        </NavLink>
                        <NavLink to='/sign-up' exact={true} onClick={() => props.setTrigger(false)}>
                            Sign Up!
                        </NavLink>
                    </div>
                )}
                <NavLink to='/' exact={true} onClick={() => props.setTrigger(false)} className="category-text">
                    Home
                </NavLink>
                <NavLink to='/potions' exact={true} onClick={() => props.setTrigger(false)} className="category-text">
                    Potions
                </NavLink>
                <NavLink to='/pokémon' exact={true} onClick={() => props.setTrigger(false)} className="category-text">
                    Pokémon
                </NavLink>
                <NavLink to='/clothing' exact={true} onClick={() => props.setTrigger(false)} className="category-text">
                    Clothing
                </NavLink>
                <NavLink to='/tm' exact={true} onClick={() => props.setTrigger(false)} className="category-text">
                    TM
                </NavLink>
                <NavLink to='/pokéballs' exact={true} onClick={() => props.setTrigger(false)} className="category-text">
                    Pokéballs
                </NavLink>
                <NavLink to='/berries' exact={true} onClick={() => props.setTrigger(false)} className="category-text">
                    Berries
                </NavLink>
            </div>
        </>
    );
}