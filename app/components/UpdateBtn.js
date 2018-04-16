import { h, render, Component  } from 'preact';


export default class UpdateBtn extends Component {
  constructor(props) {
    super();
    this.UpdateClick = this.UpdateClick.bind(this);
  }
  UpdateClick(e) {
    e.preventDefault();

  
    global.emitter.emit('open-item-form',this.props.item, "UPDATE")
  }

  render(props,state) {
    return (
      <button onClick={this.UpdateClick}>Update {props.item.id}</button>

    )
  }

}
