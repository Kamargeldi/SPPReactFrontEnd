import { useState, useCallback } from "react";
import { cookieParser } from 'set-cookie-parser'

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        setLoading(true);
        try{
            if (body){
                body = JSON.stringify(body);
                headers["Content-Type"] = "application/json";
            }


            const response = await fetch(url, {method: method, body: body, headers: headers, credentials: 'same-origin'});
            const jsonBody = await response.json();
            const status = response.status;     
            setLoading(false);
            return {jsonBody, status, response};
       } catch(e){
            setLoading(false);
            setError(e.message);
            throw e;
       }
    }, []);

    const clearError = () => setError(null);
    
    return {loading, request, error, clearError};
}