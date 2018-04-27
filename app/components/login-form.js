import { h, render, Component  } from 'preact';
import linkState from 'linkstate';
import axios from 'axios';



function LoadingScreen(props) {
  let statement = "Logging you in";
  let icon = <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="loader"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>;
  if(props.login_verified) {
    icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check"><polyline points="20 6 9 17 4 12"></polyline></svg>;
    statement = "All Set";
  }
  return (
    <div class="login-loader">
      <div class="content">
        {icon}
        <span>{statement}</span>
      </div>

    </div>
  )
}


export default class LoginForm extends Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      pass: '',
      error: null,
      checking: false,
      login_noonce:null,
      login_verified: false
    }
    this.submitForm = this.submitForm.bind(this);
    this.autoFocus = null;
    this.getFocus = function(element) {
      this.autoFocus = element;
    }.bind(this);

  }
  componentDidMount() {

    if(this.autoFocus) {
      this.autoFocus.focus();
    }
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
        this.setState({login_verified:true});
        setTimeout(function(){
          global.emitter.emit('login-status', true, response.data.user);
        },1500)

      }
      return false;
    }.bind(this))
    .catch(function (error) {

      this.setState({
        checking: false,
        error: error.response.data.error_msg,
        login_noonce: error.response.data.login_noonce,
        email: '',
        pass: ''
      })
    }.bind(this));

    return false;
  }

	render(props, state) {
    let loadingScreen = null;
    let disabled = false;
    if(!state.login_noonce || !state.email || !state.pass) {
      disabled = true;
    }

    let error = null;
    if(state.error) {
      error = <div class="error-form">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle stroke-width="1" cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>
      <span> {state.error}</span>
    </div>
    }

    if(state.checking) {
      return <div id="login-form"><LoadingScreen login_verified={state.login_verified} /></div>
    }

		return (
			<form id="login-form" style={{position:"relative"}} onSubmit={this.submitForm}>
        <h1>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-anchor"><circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path></svg>Login to ur fat</h1>

        {error}

        <input ref={this.getFocus} placeholder="email address" type="email" required value={state.email}
						onInput={linkState(this, 'email')} />

        <input placeholder="password" type="password" required value={state.pass}
						onInput={linkState(this, 'pass')} />

        <button disabled={disabled} type="submit">Login</button>


      </form>

		);
	}
}
