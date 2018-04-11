

import Cookies from 'js-cookie';
import { h, render, Component  } from 'preact';

import axios from "axios";

var {EventEmitter} = require('fbemitter');
global.emitter = new EventEmitter();


import LoginForm from './components/login-form';
import AddItemForm from './components/add-item-form';


class App extends Component {
  constructor(props) {
      super();

      this.state = {
        logged_in : false,
        user: null,
        checked_login: false,
        login_noonce: null,
        day: 0
      }

  }
  componentDidMount() {
    axios.get(window.location.pathname+'api/check-login.php')
    .then(function (response) {

      this.setState({
        checked_login: true,
        logged_in: response.data.logged_in,
        login_noonce: response.data.login_noonce
      });
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });

    this.loginListen = global.emitter.addListener('login-status',function(status, user){
      if(status) {
        this.setState({logged_in: true});
      }
      if(user) {
        this.setState({user:user});
      }
    }.bind(this))

  }
  componentWillUnmount() {
   this.loginListen.remove();

  }

  render(props, state) {
    let status = 'logged in';
    if( !state.checked_login) {
      return (<div>Loggin you in</div>);
    }
    if(!state.logged_in ) {
      return (<LoginForm login_noonce={this.state.login_noonce}/>);
    }
    return (
      <div>
        <AddItemForm /> 
      </div>
    )

  }
}

render(<App dog={"house"} />, document.getElementById('app'));
