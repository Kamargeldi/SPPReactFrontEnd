import '../Styles/HomePageStyles.css'
import React, { useContext, useState, useEffect } from 'react';
import {AuthContext} from '../Contexts/AuthContext'
import httpHook, { useHttp } from '../Hooks/HttpHook'
import {useHistory} from 'react-router-dom'
import {FileItem} from '../Components/FileItem.js'
import Axios from 'axios';

export const HomePage = () => {
    const auth = useContext(AuthContext);
    const http = useHttp();
    const [list, setList] = useState(null);
    const [currentTime, setCurrentTime] = useState('');
    var fileDialog = React.createRef();

    const logoutClick = (event) =>{
        event.preventDefault();
        auth.logout();
    }

    const uploadClick = (event) =>{
        fileDialog.click();
    }

    const fileDialogChange = (event) =>{
        var file = event.target.files[0];
        var fName = file.name.replaceAll("^[a-zA-Z]:", "");
        let headers = {};
        headers['Authorization'] = auth.token;
        http.request('/file/exists', "POST", {filePath: fName}, headers)
        .then((response) => {
            if (response.status == 200)
            {
                alert("File with that name already exists :)");
            }

            if (response.status == 401)
            {
                alert("Authorization needed :)")
                auth.logout();
                return;
            }
            
            if (response.status == 404)
            {
                let headers = {};
                var formData = new FormData();
                formData.append('file', file);
                formData.append('fileName', fName);
                headers['Authorization'] = auth.token;
                
                Axios.post('/file/create', formData, {headers: headers})
                .then(res => {
                    alert("File successfully uploaded :)");
                    updateList();
                });
            
            }
        });
    }


    function updateList()
    {
        let headers = {};
        headers["Authorization"] = auth.token;
        http.request("/file/list", "GET", null, headers)
        .then((response) => {
            let array = [];
            if (response.status == 401)
            {
                auth.logout();
                return;
            } 

            for (let i = 0; i < Object.keys(response.jsonBody).length; i++)
            {
                let f = response.jsonBody[i];
                array.push(
                    <FileItem rerenderParent={() => {updateList()}} name={f.filename} type={f.type} size={f.size}/>
                )
            }
            if (array == null || array.length == 0)
            {
                array.push("You don't have any file :)");
            }
            setList(array);
        });
    
    }

    useEffect(() => {
        updateList();
        var clientSocket = require('socket.io-client')('http://localhost:3000');
        const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        clientSocket.on('currentTime', (event) => {
            const formattedDate = new Date(event).toGMTString(DATE_OPTIONS);
            setCurrentTime(formattedDate);
        });
    }, []);    
    

    return (
        <div>
            <div className="headerPanel">
                <div>
                    <button className="logoutButton" onClick={logoutClick}>Log out</button>
                    <h3>File storage home page.</h3>
                </div>
                <div>
                    <h2>{currentTime}</h2>
                </div>
            </div>
            <div>
                <div className='uploadButtonContainer'>
                    <h4>File List:</h4>
                    <div onClick={uploadClick} className='uploadButton'>
                        <span>Upload File</span>
                        <input onChange={fileDialogChange} type='file' ref={input => fileDialog = input} style={{display:'none'}}></input>
                    </div>
                </div>
                <div className='fileItemContainer'>
                    {list == null ? <h4>Loading...</h4> : list}
                </div>
            </div>
        </div>
    )
}