//Importing React Lib
import React, {Component} from 'react';

//Importing Head Component
import Header from './components/header/header';

//Importing Main Component
import Main from './main';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayed_form: '',
            logged_in: localStorage.getItem('token') ? true : false,
            username: '',
            first_name: '',
            last_name: ''
        };
    }

    componentDidMount() {
        if (this.state.logged_in) {
            fetch('http://localhost:8000/core/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        username: json.username,
                        first_name: json.first_name,
                        last_name: json.last_name
                    });
                    localStorage.setItem('first_name', json.first_name);
                    localStorage.setItem('last_name', json.last_name);
                });
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <Main/>
            </div>
        );
    }
}

export default App;