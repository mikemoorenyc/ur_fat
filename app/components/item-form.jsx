import { h, render, Component  } from 'preact';
import linkState from 'linkstate';


export default class ItemForm extends Component {
  constructor(props) {
    super();
    let endpoint = "add-item";
    if(props.editState === "UPDATE") {
      endpoint = 'update-item';
    }
    this.state = {
     id: props.item.id,
     title: props.item.post_title,
     amount: props.item.post_amount,
     date: props.item.post_date,
     method: props.editState,
     endpoint: endpoint,
     transState: ''
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
    if(!this.state.title) {
      return false;
    }
    
    let item = {
      id: this.state.id,
      post_title: this.state.title,
      post_amount: this.state.amount,
      post_date:this.state.date,
      noonce: this.state.noonce
    }
    global.emitter.emit(this.state.endpoint, item);
    this.resetForm(e);
  }
  resetForm(e) {
    e.preventDefault();
    this.setState({transState: 'translateX(100%)'});
    setTimeout(this.props.cancelForm,150)
  }
  componentDidMount() {
    this.setState({transState: 'translateX(0)'});
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
      <div class="item-form-overlay"></div>
      <div class="app item-form" style={{transform: state.transState}}>
        <header class="with-buttons">
          <div class="button-holder"><button type="reset" class="secondary" onClick={this.resetForm}>Cancel</button></div>
          <h1>MORE food?!</h1>
          <div class="button-holder"><button type="reset" disabled={disabled} onClick={this.submitForm}>{submitText}</button></div>
        </header>
        <main>
          <form onSubmit={this.submitForm} method="POST" action={this.state.endpoint}>
          <div class="form-row">
            <label>What did you eat?</label>
            <input ref={this.getFocus} type="text" value={state.title} onInput={linkState(this, 'title')} required class="input-text"/>
          </div>
          <div class="form-row">
            <label>How much did you eat?</label>
            <input type="text" value={state.amount} onInput={linkState(this, 'amount')}  class="input-text"/>
          </div>
            <button disabled={disabled} style={{display: "none"}} type="submit">{submitText}</button>
         </form>

        </main>
      </div>
     </div>

   )


  }




}
