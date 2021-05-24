import { useCallback, useEffect, useState } from "react"


export const useAuth = () => {
    const [token, setToken] = useState(null);


    const login = useCallback((jwtToken) =>{
        setToken(jwtToken);
        localStorage.setItem("Authorization", jwtToken);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        localStorage.removeItem("Authorization");
    }, []);


    useEffect(() => {
        const jwtToken = localStorage.getItem("Authorization");
        if (jwtToken)
            login(jwtToken);
    }, [login]);

    
    return {login, logout, token}
}