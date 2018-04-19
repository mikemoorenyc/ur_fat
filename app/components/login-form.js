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
      login_noonce:null
    }
    this.submitForm = this.submitForm.bind(this);
  }
  componentDidMount() {
    let formdata = new FormData();
    formdata.set('noonce_key',"login_noonce");
    axios({
      method: 'post',
      url: window.location.pathname+'api/create-noonce.php',
      config: { headers: {'Content-Type': 'multipart/form-data' }},
      data: formdata
    })
    .then(function (response) {
      this.setState({login_noonce: response.data.login_noonce});
      return false;
    }.bind(this))
    .catch(function (error) {
      alert('Could not get a login noonce');
    })
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
    let disabled = false;
    if(!state.login_noonce) {
      disabled = true;
    }

    if(state.checking) {
      loadingScreen = (
        <div style={{backgroundColor: "white",position:"absolute", left: 0, top: 0, right: 0, bottom: 0}} >
          Loading
        </div>
      )
    }

		return (
			<form data-noonce={state.login_noonce} style={{position:"relative"}} onSubmit={this.submitForm}>
        <label>Email</label><br/>
        <input type="email" required value={state.email}
						onInput={linkState(this, 'email')} />
        <br/><br/>
        <label>Password</label><br/>
        <input type="password" required value={state.pass}
						onInput={linkState(this, 'pass')} />
        <br/><br/>
        <button disabled={disabled} type="submit">Submit</button>
        <div>{state.error}</div>
        {loadingScreen}
      </form>

		);
	}
}
