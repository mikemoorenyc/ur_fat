import { h, render, Component  } from 'preact';
import linkState from 'linkstate';

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: ''
    }
  }
  submitForm(e) {
   e.preventDefault();
   
  }

	render(props, state) {

		return (
			<form onSubmit={this.submitForm}>
        <label>Email</label><br/>
        <input type="email" value={state.email}
						onInput={linkState(this, 'email')} />
        <br/><br/>
        <label>Password</label><br/>
        <input type="password"value={state.pass}
						onInput={linkState(this, 'pass')} />
        <br/><br/>
        <button type="submit">Submit</button>
      </form>
		);
	}
}
