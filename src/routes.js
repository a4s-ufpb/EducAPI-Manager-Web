import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import LoginPage from './pages/login/index'
import RegisterPage from './pages/register/index'
import Home from './pages/home/index'
import CreateContext from './pages/createcontext/index'
import CreateChallenge from './pages/createchallenge/index'
import Gallery from './pages/Gallery/index'
import EditContext from './pages/editcontext/index'
import EditChallenge from './pages/editchallenge/index'
import erro404 from './pages/404/'

export default function Routes(){
    return (
        <Router>
                <Switch>
                    
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/" exact={true} component={Home}/>
                    <Route path="/createcontext"  component={CreateContext}/>
                    <Route path="/createchallenge"  component={CreateChallenge}/>
                    <Route path="/register" component={RegisterPage}/>
                    <Route path="/gallery" component={Gallery}/>
                    <Route path="/editcontext" component={EditContext}></Route>
                    <Route path="/editchallenge" component={EditChallenge}></Route>
                    <Route path="*" component={erro404}></Route>
                </Switch>
        </Router>
    );
}