

import Cookies from 'js-cookie';
import { h, render, Component  } from 'preact';

import axios from "axios"; 

var {EventEmitter} = require('fbemitter');
global.emitter = new EventEmitter();


import LoginForm from './components/login-form';


class App extends Component {
  constructor(props) {
      super();

      this.state = {
        logged_in : false,
        user: null,
        checked: false
      }

  }
  componentDidMount() {
    axios.get('/api/check-login.php')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    this.loginListen = global.emitter.addListener('login-status',function(status,user){
      if(status === 'logged_in') {
        this.setState({
          logged_in: true,
          user: user
        });
        return null;
      } 
      this.setState({
        logged_in: false,
        user: null
      });
    }.bind(this));
    
  }
  componentWillUnmount() {
   this.loginListen.remove(); 
    
  }

  render(props, state) {
    let status = 'logged in';

    if(!state.logged_in && state.checked) {
      return (<LoginForm />);
    }
    return(
      <div>
      {status}
      </div>
    )
  }
}

render(<App dog={"house"} />, document.getElementById('app'));
