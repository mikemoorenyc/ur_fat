import Cookies from 'js-cookie';
import { h, render, Component  } from 'preact';

import LoginForm from './components/login-form';


class App extends Component {
  constructor(props) {
      super();

      this.state = {
        logged_in : false,
        dog: props.dog
      }

  }


  render(props, state) {
    let status = 'logged in';

    if(!state.logged_in) {
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
