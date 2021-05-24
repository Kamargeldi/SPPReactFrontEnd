import '../Styles/GuestPageStyles.css'
import React from 'react';
import { useHistory } from "react-router-dom";


export const GuestPage = () => {
    const history = useHistory();

    const loginOnclick = (event) => {
        event.preventDefault();
        history.push("/auth");
    }

    const registerOnclik = (event) => {
        event.preventDefault();
        history.push("/signup");
    }

    
    return (
        <div>
        <div className="headerText">
            <h1>Storage Server.</h1>
        </div>
        <div className="form">
            <div className="container">
                <button type="submit" onClick={loginOnclick}>Log in</button>
                <button type="submit" onClick={registerOnclik}>Sign up</button>
            </div>
        </div>
    </div>
    )
}