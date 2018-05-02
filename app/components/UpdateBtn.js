import { h, render, Component  } from 'preact';


export default class UpdateBtn extends Component {
  constructor(props) {
    super();
    this.UpdateClick = this.UpdateClick.bind(this);
  }
  UpdateClick(e) {
    e.preventDefault();

    global.emitter.emit('list-item-open', null);
    global.emitter.emit('open-item-form',this.props.item, "UPDATE")
  }

  render(props,state) {
    return (
      <button alt="Edit" class="item-button edit" onClick={this.UpdateClick}>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit edit"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg></button>

    )
  }

}
