import { h, render, Component  } from 'preact';
import linkState from 'linkstate';
import axios from 'axios';


export default class ItemForm extends Component {
  constructor(props) {
    super();
    this.state = {
     item: props.item,
     method: props.editState
    }
    this.resetForm = this.resetForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  
  componentWillUnmount() {

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
        <input type="text" value={state.title} onInput={linkState(this, 'title')} required />


           <button disabled={disabled} style={{display: "none"}} type="submit">{submitText}</button>
        
        </form>
         
       </main>
     </div>
     
   )


  }




}
