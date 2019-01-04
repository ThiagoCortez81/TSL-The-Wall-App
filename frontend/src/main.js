//Importing React Lib
import React, {Component} from 'react';

//Importing Home component
import Home from './components/home/home';

//Importing Auth component
import Auth from './components/auth/auth';

//Importing Profile component
import Profile from './components/profile/profile';

//Importing components from Bootstrap Lib
import { Button } from 'react-bootstrap'

//Importing DOM router
import { Switch, Route } from 'react-router-dom'

class Main extends Component {
     render() {
         return (
             <main>
                 <Switch>
                     <Route exact path='/' component={Home}/>
                     <Route path='/auth' component={Auth}/>
                     <Route path='/profile' component={Profile}/>
                 </Switch>
                 <div className="container">
                 </div>
             </main>
         )
     };
}

export default Main;