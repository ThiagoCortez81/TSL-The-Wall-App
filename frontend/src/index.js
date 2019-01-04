//Importing the ReactLib
import React from 'react';

//importing ReactDOM (inject <APP /> in the <div id="root"></div> on index.html)
import ReactDOM from 'react-dom'

//Importing App Component
import App from './App';

//Importing DOM router
import { BrowserRouter } from 'react-router-dom'

//Importing the stylesheet
import './index.css';

//Rendering the content <APP /> into #root
ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById("root"));