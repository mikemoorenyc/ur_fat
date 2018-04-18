import { h, render, Component  } from 'preact';
import linkState from 'linkstate';
import axios from 'axios';


export default class LoginForm extends Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      pass: '',
      error: null,
      checking: false,
      login_noonce:props.login_noonce
    }
    this.submitForm = this.submitForm.bind(this);
  }
  submitForm(e) {
    e.preventDefault();
    if(!this.state.email || !this.state.pass) {
      this.setState({error: 'You need to fill out both.'});
      return false;
    }

    this.setState({checking: true});

    let formdata = new FormData();
    formdata.set('login_noonce',this.state.login_noonce);
    formdata.set('email',this.state.email);
    formdata.set('pass',this.state.pass);

    axios({
      method: 'post',
      url: window.location.pathname+'api/login-user.php',
      config: { headers: {'Content-Type': 'multipart/form-data' }},
      data: formdata
    })
    .then(function (response) {

      console.log(response);
      if(response.data.logged_in) {
        global.emitter.emit('login-status', true, response.data.user);
      }
      return false;
    }.bind(this))
    .catch(function (error) {
      console.log(error);
      this.setState({
        checking: false,
        error: error.response.data.error_msg,
        login_noonce: error.response.data.login_noonce
      })
    }.bind(this));

    return false;
  }

	render(props, state) {
    let loadingScreen = null;

    if(state.checking) {
      loadingScreen = (
        <div style={{backgroundColor: "white",position:"absolute", left: 0, top: 0, right: 0, bottom: 0}} >
          Loading
        </div>
      )
    }

		return (
			<form style={{position:"relative"}} onSubmit={this.submitForm}>
        <label>Email</label><br/>
        <input type="email" required value={state.email}
						onInput={linkState(this, 'email')} />
        <br/><br/>
        <label>Password</label><br/>
        <input type="password" required value={state.pass}
						onInput={linkState(this, 'pass')} />
        <br/><br/>
        <button type="submit">Submit</button>
        <div>{state.error}</div>
        {loadingScreen}
      </form>

		);
	}
}
