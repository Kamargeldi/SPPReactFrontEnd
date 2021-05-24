import "../Styles/AuthPageStyles.css";
import {useHttp} from "../Hooks/HttpHook"
import React, {useContext, useState} from 'react'
import {AuthContext} from "../Contexts/AuthContext"

export const AuthPage = () => {
    const [form, setform] = useState({email: '', password: ''});
    const [validationMessage, setValidationMessage] = useState('');
    const {loading, request, error} = useHttp();
    const auth = useContext(AuthContext);

    const loginOnclick = (event) => {
        event.preventDefault();
        request("/login", "POST", {...form})
        .then((result) => {
            if (result.status !== 200)
            {
                setValidationMessage(result.jsonBody.message);
            }
            else
            {
                setValidationMessage('Success..');
                setTimeout(() => {
                    auth.login(result.response.headers.get("Authorization"));
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

                    <button disabled={loading} type="submit" onClick={loginOnclick}>Login</button>
                </div>
            </div>
        </div>)
}