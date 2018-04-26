import { h, render, Component  } from 'preact';
import linkState from 'linkstate';
import axios from 'axios';


export default class ItemForm extends Component {
  constructor(props) {
    super();
    this.state = {
     id: props.item.id,
     title: props.item.post_title,
     amount: props.item.post_amount,
     date: props.item.post_date,
     method: props.editState
    }
    this.resetForm = this.resetForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.autoFocus = null;
    this.getFocus = function(element) {
      this.autoFocus = element;
    }.bind(this);
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
      post_amount: this.state.amount,
      post_date:this.state.date,
      noonce: this.state.noonce
    }
    global.emitter.emit(endpoint, item);

  }
  componentDidMount() {
    if(this.autoFocus && this.state.method == "ADD") {
      this.autoFocus.focus();
     }
  }
  render(props,state) {

   let submitText = "Add";
   if(state.method === "UPDATE") {
     submitText = "Save";
   }
   let disabled = false;
   if(state.title.length < 1) {
      disabled = true;
   }
   return (
     <div>
       <header>
         <button type="reset" onClick={this.resetForm}>Cancel</button>
         <h2>MORE food?!</h2>
         <button disabled={disabled} onClick={this.submitForm} type="submit">{submitText}</button>
       </header>
       <main>
         <form onSubmit={this.submitForm}>
        <label>What did you eat?</label><br/>
        <input ref={this.getFocus} type="text" value={state.title} onInput={linkState(this, 'title')} required />
         <label>How much did you eat?</label><br/>
        <input type="text" value={state.amount} onInput={linkState(this, 'amount')}  />

           <button disabled={disabled} style={{display: "none"}} type="submit">{submitText}</button>
        
        </form>
         
       </main>
     </div>
     
   )


  }




}
