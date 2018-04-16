import { h, render, Component  } from 'preact';
import linkState from 'linkstate';
import axios from 'axios';


export default class ItemForm extends Component {
  constructor(props) {
    super();
    this.state = {
     opened: false,
     item: {},
     method: null
    }
    this.resetForm = this.resetForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {

    this.openItemListener = global.emitter.addListener('open-item-form',function(item, method){

      this.setState({
        title: item.post_title,
        amount: item.amount,
        notes: item.notes,
        method: method,
        id: item.id,
        opened: true,
        noonce: item.noonce
      });
    }.bind(this))

  }
  componentWillUnmount() {
   this.openItemListener.remove();
  }
  resetForm(e) {
  e.preventDefault();
   this.setState({
    title: '',
    amount: '',
    notes: '',
    id: null,
    method: null,
    opened: false,
    noonce: null
   });
  }
  submitForm(e) {
    e.preventDefault();
    let endpoint = "add-item";
    if(this.state.method === "UPDATE") {
      endpoint = 'update-item';
    }
    let item = {
      id: this.state.id,
      post_title: this.state.title,
      post_date: Date.now(),
      noonce: this.state.noonce
    }
    global.emitter.emit(endpoint, item);
    this.resetForm(e);

  }
  render(props,state) {

   if(!state.opened) {
    return null;
   }

   let submitText = "Add";
   if(state.method === "UPDATE") {
     submitText = "Save";
   }
   let disabled = false;
   if(state.title.length < 1) {
      disabled = true;
   }
   return (
     <form onSubmit={this.submitForm} style={{position:"absolute", background:"white", left: 0, right:0, bottom:0, top:0}}>
        <label>Title</label><br/>
        <input type="text" value={state.title} onInput={linkState(this, 'title')} required />


        <button type="reset" onClick={this.resetForm}>Cancel</button>
        <button disabled={disabled} type="submit">{submitText}</button>
     </form>
   )


  }




}
