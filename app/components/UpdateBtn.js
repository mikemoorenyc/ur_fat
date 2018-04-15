import { h, render, Component  } from 'preact';


export default class UpdateBtn extends Component {
  constructor(props) {
    super();
    this.UpdateClick = this.UpdateClick.bind(this);
  }
  UpdateClick(e) {
    e.preventDefault();

    global.emitter.emit('update-item', this.props.id, this.props.noonce);
  }

  render(props,state) {
    return (
      <button onClick={this.UpdateClick}>Update {props.id}</button>

    )
  }

}
