import './App.css';
import { BrowserRouter  ,Switch , Route, Redirect} from "react-router-dom";
import { GuestPage } from "./Components/GuestPage";
import { HomePage } from "./Components/HomePage";
import { AuthPage } from "./Components/AuthPage";
import { SignUpPage } from "./Components/SignUpPage";
import { Fragment, useEffect } from 'react';
import { AuthContext } from './Contexts/AuthContext';
import {useAuth} from "./Hooks/AuthHook";
import socketIOClient from 'socket.io-client';


function App() {

  const {token, login, logout} = useAuth();
  const isAuthenticated = !!token;
  

  return (
      <AuthContext.Provider value={{token, login, logout}}>
        <div className="application">
          <BrowserRouter>
            <Switch>
              { isAuthenticated && 
                <Fragment>
                  <Route exact path="/home" component={HomePage}/>
                  <Redirect to="/home"/>
                </Fragment>
              }
              { 
                !isAuthenticated && 
                <Fragment>
                  <Route exact path="/signup" component={SignUpPage}/>
                  <Route exact path="/auth" component={AuthPage}/>
                  <Route exact path="/guest" component={GuestPage}/>
                  <Redirect to="/guest"/>
                </Fragment>
              }        
            </Switch>
          </BrowserRouter>
        </div>
      </AuthContext.Provider>
  )
}

export default App;
