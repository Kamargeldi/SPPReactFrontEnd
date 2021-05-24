import '../Styles/FileItemStyles.css';
import Axios from 'axios';
import React from 'react';
import {AuthContext} from '../Contexts/AuthContext'
import { useContext, useState, useEffect } from 'react';
import FileDownload from 'js-file-download';
import { useHttp } from '../Hooks/HttpHook';


export const FileItem = (props) => {
    
    const auth = useContext(AuthContext);
    const http = useHttp();

    function downloadClick()
    {
        let headers = {};     
        let fName = props.name;   
        let body = {filePath: fName};
        headers['Authorization'] = auth.token;        
        Axios.post('/file/get', body, {headers : headers, responseType: 'arraybuffer'})
        .then((response) => {
            console.log(response.data);
            FileDownload(response.data, props.name);
        });
    }

    function deleteClick()
    {
        let headers = {};     
        let fName = props.name;   
        let body = {filePath: fName};
        headers['Authorization'] = auth.token;        
        Axios.post('/file/delete', body, {headers : headers})
        .then((response) => {
            alert('File successfully deleted :)');
            props.rerenderParent();            
        });
    }

    return (
        <div className = 'fileItem'>
            <div className='fileInfoContainer'>
                <h5>{'FileName:  ' + props.name}</h5>
                <h5>{'Type:      ' + props.type}</h5>
                <h5>{'Size:      ' + props.size}</h5>
            </div>
            <div className='buttonsContainer'>
                <div onClick={downloadClick} className='downloadButton'>
                    <span>Download File</span>
                </div>
                <div onClick={deleteClick} className='deleteButton'>
                    <span>Delete File</span>
                </div>
            </div>
        </div>
    )
}