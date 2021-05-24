import "../Styles/AuthPageStyles.css";
import {useHttp} from "../Hooks/HttpHook"
import React, {useContext, useState} from 'react'
import { useHistory } from "react-router-dom";

export const SignUpPage = () => {
    const [form, setform] = useState({email: '', password: '', confirm: ''});
    const [validationMessage, setValidationMessage] = useState('');
    const {loading, request, error} = useHttp();
    const history = useHistory();
    
    const registerOnclick = (event) => {
        event.preventDefault();
        request("/register", "POST", {...form})
        .then((result) => {
            if (result.status !== 201)
            {
                setValidationMessage(result.jsonBody.message);
            }
            else
            {
                setValidationMessage('Success..');
                setTimeout(() => {
                    history.push("/auth");
                }, 1000);
            }
        });
    }

    const emailOnchange = (event) =>{
        setform({...form, ['email']: event.target.value});
    }

    const passwordOnchange = (event) => {
        setform({...form, ['password']: event.target.value});
    }
    

    const confirmOnchange = (event) => {
        setform({...form, ['confirm']: event.target.value});
    }

    return (
        <div>
            <div className="headerText">
                <h1>Storage Server.</h1>
            </div>
            <div className="form">
                <div className="container">
                    <label><b className="errorMessage">{validationMessage}</b></label><br/>
                    <label htmlFor="email"><b>Email</b></label>
                    <input onChange={emailOnchange} name="email" type="text" placeholder="Enter Email" required/>

                    <label htmlFor="password"><b>Password</b></label>
                    <input onChange={passwordOnchange} type="password" placeholder="Enter Password" name="password" required/>

                    <label htmlFor="confirm"><b>Password</b></label>
                    <input onChange={confirmOnchange} type="password" placeholder="Repeat Password" name="confirm" required/>

                    <button disabled={loading} type="submit" onClick={registerOnclick}>Register</button>
                </div>
            </div>
        </div>)
}