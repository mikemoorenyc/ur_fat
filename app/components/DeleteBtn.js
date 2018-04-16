import { h, render, Component  } from 'preact';


export default class DeleteBtn extends Component {
  constructor(props) {
    super();
    this.deleteClick = this.deleteClick.bind(this);
  }
  deleteClick(e) {
    e.preventDefault();

    global.emitter.emit('delete-item', this.props.id);
  }

  render(props,state) {
    return (
      <button onClick={this.deleteClick}>Delete {props.id}</button>

    )
  }

}
