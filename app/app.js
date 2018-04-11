

import Cookies from 'js-cookie';
import { h, render, Component  } from 'preact';

import axios from "axios";

var {EventEmitter} = require('fbemitter');
global.emitter = new EventEmitter();


import LoginForm from './components/login-form';
import ItemForm from './components/item-form';


class App extends Component {
  constructor(props) {
      super();

      this.state = {
        logged_in : false,
        user: null,
        checked_login: false,
        login_noonce: null,
        day: 0,
        form_opened: false,
        add_item_noonce: null
      }
    this.newItem = this.newItem.bind(this);

  }
  componentDidMount() {
    axios.get(window.location.pathname+'api/check-login.php')
    .then(function (response) {

      this.setState({
        checked_login: true,
        logged_in: response.data.logged_in,
        login_noonce: response.data.login_noonce,
        add_item_noonce: response.data.add_item_noonce
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
  newItem(e) {
   e.preventDefault(); 
   let item = {
    id: null,
    title: '',
    amount: '',
    notes: ''
   }
   global.emitter.emit('open-item-form', item,true);
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
        <button onClick={this.newItem}>New Item</button>
        <ItemForm />
      </div>
    )

  }
}

render(<App dog={"house"} />, document.getElementById('app'));
